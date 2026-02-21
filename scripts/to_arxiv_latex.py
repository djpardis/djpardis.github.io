#!/usr/bin/env python3
"""
Convert the evolution blog post (Jekyll markdown + HTML) to a single LaTeX file
suitable for arXiv submission. Output: _drafts/evolution-arxiv.tex
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
POST_PATH = REPO_ROOT / "_posts/2026-02-20-evolution-software-engineering-fortran-llms.md"
OUT_PATH = REPO_ROOT / "_drafts/evolution-arxiv.tex"


def extract_refs(text: str) -> tuple[dict, str]:
    """Extract ref-item blocks into a dict keyed by cite key; remove blocks from text."""
    refs = {}
    # Match <div class="ref-item"><a id="ref-KEY" href="...">[LABEL]</a> REST</div>
    pattern = re.compile(
        r'<div class="ref-item"><a id="(ref-[^"]+)" href="[^"]*">\[([^\]]*)\]\s*</a>\s*(.*?)</div>',
        re.DOTALL,
    )

    def repl(m):
        ref_id, label, rest = m.group(1), m.group(2), m.group(3)
        key = ref_id.replace("ref-", "")  # ref-Bac57 -> Bac57
        rest = html_to_latex_inline(rest.strip())
        refs[key] = (label, rest)
        return ""

    new_text = pattern.sub(repl, text)
    # Remove the section-references wrapper divs
    new_text = re.sub(r'<div class="section-references">\s*<strong>References</strong>\s*', "", new_text)
    new_text = re.sub(r"\s*</div>\s*(?=\s*<div class=\"section-references\">|\s*##|\s*###|\s*<h2)", "", new_text)
    new_text = re.sub(r"</div>\s*</div>", "", new_text)  # leftover from ref block
    return refs, new_text


def html_to_latex_inline(s: str) -> str:
    """Convert inline HTML to LaTeX (em, links)."""
    s = re.sub(r"<em>", r"\\emph{", s)
    s = re.sub(r"</em>", "}", s)
    # <a href="URL" target="_blank">TEXT</a> or <a href="URL">TEXT</a>
    def link_repl(m):
        url, text = m.group(1), m.group(2)
        url = url.replace("\\", "/").replace("_", "\\_")
        if not text or text.strip() == url or "available at" in s.lower()[:m.start()]:
            return f"\\url{{{url}}}"
        text = text.replace("&", "\\&").replace("_", "\\_").replace("#", "\\#").replace("%", "\\%")
        return f"\\href{{{url}}}{{{text}}}"
    s = re.sub(r'<a href="([^"]*)"[^>]*>([^<]*)</a>', link_repl, s)
    s = s.replace("&", "\\&")
    return s


def cite_repl(m):
    """Replace internal citation link with \\cite{key}."""
    ref_id = m.group(1)
    key = ref_id.replace("ref-", "")
    return f"\\cite{{{key}}}"


def convert_body(text: str) -> str:
    """Convert main body: sections, paragraphs, citations, code blocks, etc."""
    # Strip content before Introduction (TOC, hero image, etc.)
    intro_match = re.search(r"##\s*\[Introduction\].*?(?=\n\n|$)", text, re.DOTALL)
    if intro_match:
        start = text.find(intro_match.group(0))
        text = text[start:]

    # Remove internal links from section headers: ## [Title](#toc) {#id} -> \section{Title}
    text = re.sub(
        r"^##\s*\[([^\]]+)\]\([^)]*\)\s*\{#[^}]*\}\s*$",
        r"\\section{\1}",
        text,
        flags=re.MULTILINE,
    )
    # Fix section headers that got concatenated with previous paragraph (no newline before ##)
    # Match both escaped \#\# and plain ## (before paragraph escaping)
    text = re.sub(
        r"\.(\\#\\#|##)\s*\[([^\]]+)\]\([^)]*\)\s*\{\#?[^}]*\}",
        r".\n\n\\section{\2}",
        text,
    )
    # Era headings: <h2 id="..." class="era-heading">...</h2> -> \section*{...}
    text = re.sub(
        r'<h2 id="[^"]*" class="era-heading"><a href="[^"]*">([^<]*)</a></h2>',
        r"\\section*{\1}",
        text,
    )
    # ### Subsection
    text = re.sub(
        r"^###\s+([^\n]+)\s*\{#[^}]*\}\s*$",
        r"\\subsection{\1}",
        text,
        flags=re.MULTILINE,
    )
    text = re.sub(r"^###\s+([^\n]+)\s*$", r"\\subsection{\1}", text, flags=re.MULTILINE)

    # Inline citations: <a href="#ref-X" id="...">[Y]</a> -> \cite{X}
    text = re.sub(
        r'<a href="#(ref-[^"]+)"[^>]*>\[[^\]]*\]</a>',
        cite_repl,
        text,
    )

    # External links in prose (keep \url or \href)
    text = re.sub(
        r'<a href="(https?://[^"]*)"[^>]*>([^<]*)</a>',
        lambda m: f"\\href{{{m.group(1)}}}{{{m.group(2)}}}" if m.group(2).strip() else f"\\url{{{m.group(1)}}}",
        text,
    )
    text = re.sub(r'<a href="([^"]*)"[^>]*>([^<]*)</a>', lambda m: f"\\href{{{m.group(1)}}}{{{m.group(2)}}}", text)

    # **Problem.** and **Solution.** -> \paragraph{}
    text = re.sub(r"\*\*Problem\.\*\*", r"\\paragraph{Problem.}", text)
    text = re.sub(r"\*\*Solution\.\*\*", r"\\paragraph{Solution.}", text)
    text = re.sub(r"\*\*Solution\*\*", r"\\paragraph{Solution.}", text)

    # <em>...</em>
    text = re.sub(r"<em>", r"\\emph{", text)
    text = re.sub(r"</em>", "}", text)

    # Code blocks: ```lang\n...\n``` (no escaping _ in verbatim)
    def code_block(m):
        lang, code = m.group(1), m.group(2)
        code = code.replace("\\", "\\textbackslash{}").replace("{", "\\{").replace("}", "\\}").replace("&", "\\&").replace("%", "\\%")
        return "\\begin{verbatim}\n" + code.strip() + "\n\\end{verbatim}\n"
    text = re.sub(r"```(\w*)\n(.*?)```", code_block, text, flags=re.DOTALL)

    # Blockquote: > line
    lines = text.split("\n")
    out_lines = []
    in_quote = False
    for line in lines:
        if line.strip().startswith(">"):
            if not in_quote:
                out_lines.append("\\begin{quote}")
                in_quote = True
            out_lines.append(line.strip().lstrip(">").strip())
        else:
            if in_quote:
                out_lines.append("\\end{quote}")
                in_quote = False
            out_lines.append(line)
    if in_quote:
        out_lines.append("\\end{quote}")
    text = "\n".join(out_lines)

    # Remove remaining HTML
    text = re.sub(r"<figure[^>]*>.*?</figure>", "", text, flags=re.DOTALL)
    text = re.sub(r"<p class=\"image-caption\">.*?</p>", "", text, flags=re.DOTALL)
    text = re.sub(r"<div class=\"link-cards\"[^>]*>.*?</div>", "", text, flags=re.DOTALL)
    text = re.sub(r"<p class=\"image-caption\">.*?", "", text, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", "", text)  # strip any remaining tags
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)

    # Escape LaTeX specials in plain text (but not inside $...$ or $$...$$)
    def protect_math(s):
        parts = []
        rest = s
        while rest:
            d = rest.find("$$")
            sng = rest.find("$")
            if d >= 0 and (sng < 0 or d < sng):
                # display math
                idx = rest.find("$$", d + 2)
                if idx < 0:
                    break
                parts.append(("text", rest[:d]))
                parts.append(("math", rest[d + 2:idx].replace("\\_", "_")))
                rest = rest[idx + 2:]
            elif sng >= 0:
                idx = rest.find("$", sng + 1)
                if idx < 0:
                    break
                parts.append(("text", rest[:sng]))
                parts.append(("math", rest[sng + 1:idx].replace("\\_", "_")))
                rest = rest[idx + 1:]
            else:
                parts.append(("text", rest))
                break
        if rest and not parts:
            parts.append(("text", rest))
        elif rest:
            parts.append(("text", rest))
        result = []
        for kind, seg in parts:
            if kind == "text":
                for c in ["\\", "&", "%", "#", "_", "{", "}"]:
                    seg = seg.replace(c, "\\" + c) if c != "\\" else seg.replace("\\", "\\textbackslash{}")
                result.append(seg)
            else:
                result.append("$" + seg + "$")
        return "".join(result)

    # Apply only to paragraphs that look like prose (have no section/paragraph commands)
    def escape_paragraph(m):
        content = m.group(1)
        if "\\section" in content or "\\paragraph" in content or "\\begin{" in content:
            return m.group(0)
        return "\\paragraph{}" not in content and "\\section" not in content and "$" in content
    # Simpler: just escape backslash and then unescape inside math
    text = re.sub(r"\\\\", "\\\\textbackslash{}", text)  # avoid double escape

    # Remove note-container and crosspost
    text = re.sub(r"<div class=\"note-container[^\"]*\"[^>]*>.*?</div>", "", text, flags=re.DOTALL)
    text = re.sub(r"<div class=\"crosspost-container[^\"]*\"[^>]*>.*?</div>", "", text, flags=re.DOTALL)

    return text


def build_bibliography(refs: dict) -> str:
    """Build thebibliography environment. Use first occurrence order for keys."""
    seen = []
    bib_lines = []
    for key, (label, bibtext) in refs.items():
        if key in seen:
            continue
        seen.append(key)
        bib_lines.append(f"\\bibitem[{label}]{{{key}}}\n{bibtext}")
    return "\n\n".join(bib_lines)


def main():
    src = POST_PATH.read_text(encoding="utf-8")
    refs, body = extract_refs(src)
    body = convert_body(body)

    # Split into lines and convert each paragraph to LaTeX (wrap in \par or leave as section)
    lines = body.split("\n")
    out = []
    for line in lines:
        line = line.strip()
        if not line:
            out.append("")
            continue
        if line.startswith("\\section") or line.startswith("\\subsection") or line.startswith("\\paragraph"):
            out.append(line)
            continue
        if line.startswith("\\begin{") or line.startswith("\\end{"):
            out.append(line)
            continue
        # Plain paragraph: escape _ and & etc. but not in math
        if "$" in line:
            # Leave math as-is; escape only outside math
            segs = re.split(r"(\$[^$]*\$|\$\$[^$]*\$\$)", line)
            new_segs = []
            for i, seg in enumerate(segs):
                if seg.startswith("$") and (seg.endswith("$")):
                    seg = seg.replace("\\_", "_")
                    new_segs.append(seg)
                else:
                    seg = seg.replace("&", "\\&").replace("_", "\\_").replace("#", "\\#").replace("%", "\\%")
                    seg = seg.replace("\\textbackslash{}", "\\textbackslash{}")
                    new_segs.append(seg)
            line = "".join(new_segs)
        else:
            line = line.replace("&", "\\&").replace("_", "\\_").replace("#", "\\#").replace("%", "\\%")
        out.append(line)

    body = "\n".join(out)

    # Final cleanup: fix section headers that ended up concatenated (escaped as \#\# or plain ##)
    body = re.sub(
        r"\.(\\#\\#|##)\s*\[([^\]]+)\]\([^)]*\)\s*\{\#?[^}]*\}",
        r".\n\n\\section{\2}",
        body,
    )
    # Standalone escaped section headers (full line)
    body = re.sub(
        r"^(\\#\\#|##)\s*\[([^\]]+)\]\([^)]*\)\s*\{\#?[^}]*\}\s*$",
        r"\\section{\2}",
        body,
        flags=re.MULTILINE,
    )

    bib = build_bibliography(refs)

    preamble = r"""\documentclass[11pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{amsmath,amssymb}
\usepackage{hyperref}
\usepackage{url}
\usepackage{parskip}
\setlength{\parindent}{0pt}

\title{The Evolution of Software Engineering from FORTRAN to LLMs}
\author{}
\date{}

\begin{document}
\maketitle

\begin{abstract}
This article examines seven decades of software engineering evolution, from FORTRAN to LLMs. We trace major milestones in four eras (foundations, Internet and Web, cloud and infrastructure, AI coding) and use this history to analyze where today's AI coding tools fit. We discuss what changed when new paradigms arrived, what stayed the same, and what economic patterns of previous breakthroughs imply for AI-assisted development. The article includes an in-depth look at AI coding milestones: transformers, in-context learning, Copilot and Codex, RLHF, RAG, agentic interfaces, extended reasoning, and code benchmarks.
\end{abstract}

"""

    end = r"""
\begin{thebibliography}{99}
""" + bib + r"""
\end{thebibliography}

\end{document}
"""

    OUT_PATH.write_text(preamble + body + end, encoding="utf-8")
    print(f"Wrote {OUT_PATH}", file=sys.stderr)
    print(f"References: {len(refs)}", file=sys.stderr)


if __name__ == "__main__":
    main()

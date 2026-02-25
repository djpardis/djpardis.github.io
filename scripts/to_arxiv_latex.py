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
CONFIG_PATH = REPO_ROOT / "_config.yml"
AUTHOR_COMPANY = "General Folders"
AUTHOR_EMAIL = "pardis@generalfolders.com"


def _get_author_from_config() -> tuple[str, str]:
    """Read author name from _config.yml and pair with the paper email.

    Returns (name, email_for_paper).
    """
    name = "Pardis Noorzad"
    email = AUTHOR_EMAIL
    if not CONFIG_PATH.exists():
        return name, email
    in_author = False
    for line in CONFIG_PATH.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if stripped.startswith("author:"):
            in_author = True
            continue
        if in_author and stripped.startswith("name:"):
            name = stripped.split(":", 1)[1].strip().strip('"\'')
            continue
        if in_author and stripped and not line.startswith(" "):
            break
    return name, email


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

    # Code blocks: ```lang\n...\n``` in CLRS style (listings: line numbers, frame, monospace)
    # Display name for code block caption (CLRS-style language label)
    def _lang_caption(lang):
        if not lang:
            return "Code"
        m = {"fortran": "FORTRAN", "sql": "SQL", "sh": "Shell", "bash": "Bash", "c": "C", "python": "Python", "text": "Text"}
        return m.get(lang.lower(), lang)

    def code_block(m):
        lang, code = m.group(1), m.group(2)
        code = code.strip()
        # For listings, escape \ { } % so they print correctly
        code = code.replace("\\", "\\\\").replace("{", "\\{").replace("}", "\\}").replace("%", "\\%")
        caption = _lang_caption(lang) if lang else "Code"
        opts = f"[caption={{{caption}}}"
        # Use listings language when we have a known one (optional syntax highlight)
        if lang:
            opts += f", language={lang}"
        opts += "]"
        return "\\begin{lstlisting}" + opts + "\n" + code + "\n\\end{lstlisting}\n"
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

    # Inline code wrapped in backticks: render as \texttt{...} (CLRS-style inline code).
    # Escape only \ and #; _ & % { } are escaped later at line level to avoid double-escape.
    def inline_code_breaks(m):
        code = m.group(1)
        code = code.replace("\\", r"\textbackslash{}").replace("#", r"\#")
        return r"\texttt{" + code + "}"

    text = re.sub(r"`([^`]+)`", inline_code_breaks, text)

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
        # Section and subsection lines: keep together with following text to avoid bad page breaks
        if line.startswith("\\section") or line.startswith("\\subsection"):
            out.append(line + "\n\\nopagebreak[4]")
            continue
        # Paragraph headings like "\paragraph{Problem.} Text with C# and A&B" need escaping
        if line.startswith("\\paragraph"):
            closing = line.find("}")
            if closing != -1:
                head = line[: closing + 1]
                tail = line[closing + 1 :]
                if "$" in tail:
                    segs = re.split(r"(\$[^$]*\$|\$\$[^$]*\$\$)", tail)
                    new_segs = []
                    for seg in segs:
                        if seg.startswith("$") and seg.endswith("$"):
                            seg = seg.replace("\\_", "_")
                            new_segs.append(seg)
                        else:
                            seg = (
                                seg.replace("&", "\\&")
                                .replace("_", "\\_")
                                .replace("#", "\\#")
                                .replace("%", "\\%")
                            )
                            seg = seg.replace("\\textbackslash{}", "\\textbackslash{}")
                            new_segs.append(seg)
                    tail = "".join(new_segs)
                else:
                    tail = (
                        tail.replace("&", "\\&")
                        .replace("_", "\\_")
                        .replace("#", "\\#")
                        .replace("%", "\\%")
                    )
                line = head + tail
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

    # Collapse 3+ consecutive newlines to 2 (at most one blank line between blocks)
    body = re.sub(r"\n{3,}", "\n\n", body)

    # Wrap paragraphs with multiple \texttt{ (long inline code) in \raggedright to avoid underfull \hbox
    def wrap_ragged_paragraphs(s: str) -> str:
        parts = re.split(r"(\n\n+)", s)
        result = []
        for i, part in enumerate(parts):
            if i % 2 == 1:
                result.append(part)
                continue
            strip = part.strip()
            if strip.count(r"\texttt{") >= 2 and not strip.startswith("\\"):
                result.append("{\\raggedright " + part.rstrip() + "\\par}\n")
            else:
                result.append(part)
        return "".join(result)

    body = wrap_ragged_paragraphs(body)

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

    author_name, author_email = _get_author_from_config()
    email_tex = author_email.replace("_", r"\_")
    author_latex = (
        author_name + r"\\" + "\n  " + AUTHOR_COMPANY + r"\\" + "\n  " + r"\texttt{" + email_tex + "}"
    )

    preamble = r"""\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{mathpazo}
\usepackage{xurl}
\usepackage[margin=1in]{geometry}
\usepackage{amsmath,amssymb}
\usepackage[svgnames,dvipsnames]{xcolor}
\colorlet{mylinkcolor}{Purple}
\colorlet{mycitecolor}{MediumPurple}
\colorlet{myurlcolor}{SteelBlue}
\usepackage{listings}
\lstset{
  numbers=left,
  numberstyle=\small\ttfamily\color{gray},
  numbersep=10pt,
  numberfirstline=true,
  frame=single,
  framesep=6pt,
  xleftmargin=0pt,
  basicstyle=\ttfamily\small,
  breaklines=true,
  keepspaces=true,
  showstringspaces=false,
  captionpos=t,
  abovecaptionskip=4pt,
  belowcaptionskip=4pt
}
\usepackage[colorlinks=true,linkcolor=mylinkcolor,citecolor=mycitecolor,urlcolor=myurlcolor]{hyperref}
\usepackage{url}
\let\CheckCommand\providecommand
\usepackage{microtype}
\usepackage{parskip}
\setlength{\emergencystretch}{5em}
\setlength{\parindent}{0pt}
\clubpenalty=10000
\widowpenalty=10000
\setcounter{secnumdepth}{0}

\title{The Evolution of Software Engineering\\ from FORTRAN to LLMs}
\author{""" + author_latex + r"""}
\date{}

\begin{document}
\maketitle

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

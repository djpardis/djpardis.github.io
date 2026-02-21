#!/usr/bin/env python3
"""Replace the AI section in evolution-for-medium.html with no-formula prose from the md."""
import re
from pathlib import Path

BASE = Path(__file__).parent.parent
MD = BASE / "_drafts" / "evolution-for-medium.md"
HTML = BASE / "_drafts" / "evolution-for-medium.html"


def md_link_to_html(text):
    def repl(m):
        url = m.group(2).replace("&", "&amp;")
        label = m.group(1).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        return f'<a href="{url}" target="_blank" rel="noopener">{label}</a>'
    return re.sub(r"\[([^\]]+)\]\((https://[^)]+)\)", repl, text)


def escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    md_text = MD.read_text(encoding="utf-8")
    # Extract from "## AI coding" to "## Discussion" (exclusive)
    start = md_text.find("\n## AI coding\n")
    end = md_text.find("\n## Discussion\n")
    if start == -1 or end == -1:
        raise SystemExit("Could not find AI section boundaries in md")
    section = md_text[start : end + 1].strip()

    # Map ## heading to id and full title for toc link
    h2_map = [
        ("## AI coding", "ai-coding", "AI coding", True),  # era-heading
        ("## 2017. Transformers replace recurrence with self-attention", "ai-transformers-2017", "2017. Transformers replace recurrence with self-attention", False),
        ("## 2020. Large language models demonstrate in-context learning", "ai-llm-2020", "2020. Large language models demonstrate in-context learning", False),
        ("## 2021. Copilot and Codex bring AI code generation to mainstream development", "ai-copilot-2021", "2021. Copilot and Codex bring AI code generation to mainstream development", False),
        ("## 2022. RLHF aligns code models to programmer intent", "ai-rlhf-2022", "2022. RLHF aligns code models to programmer intent", False),
        ("## 2023. RAG grounds code generation in the codebase", "ai-rag-2022", "2023. RAG grounds code generation in the codebase", False),
        ("## 2023–2024. Long-context and agentic interfaces expand scope", "ai-agentic-2023", "2023–2024. Long-context and agentic interfaces expand scope", False),
        ("## 2024. Extended reasoning and enterprise fine-tuning complete the AI coding assistant stack", "ai-reasoning-2024", "2024. Extended reasoning and enterprise fine-tuning complete the AI coding assistant stack", False),
        ("## 2024. Code evals established comparable benchmarks and revealed the gap to real-world tasks.", "ai-benchmarks-2024", "2024. Code evals established comparable benchmarks and revealed the gap to real-world tasks.", False),
    ]

    out = []
    rest = section
    for md_h, id_, title, era in h2_map:
        if not rest.startswith(md_h):
            # Might have newlines before
            idx = rest.find(md_h)
            if idx == -1:
                continue
            # Emit any content before this heading as paragraphs
            before = rest[:idx].strip()
            if before:
                for para in before.split("\n\n"):
                    para = para.strip()
                    if not para:
                        continue
                    if para.startswith("**Problem.**"):
                        body = md_link_to_html(escape(para[12:].strip()))
                        out.append(f"<p><strong>Problem.</strong> {body}</p>")
                    elif para.startswith("**Solution.**"):
                        body = md_link_to_html(escape(para[12:].strip()))
                        out.append(f"<p><strong>Solution.</strong> {body}</p>")
                    elif para.startswith("(1) "):
                        body = md_link_to_html(escape(para))
                        out.append(f"<p>{body}</p>")
                    elif para.startswith("(2) "):
                        body = md_link_to_html(escape(para))
                        out.append(f"<p>{body}</p>")
                    elif para.startswith('"') or para.startswith("First,") or para.startswith("Second,") or para.startswith("In ") or para.startswith("A single request"):
                        body = md_link_to_html(escape(para))
                        out.append(f"<p>{body}</p>")
                    else:
                        body = md_link_to_html(escape(para))
                        out.append(f"<p>{body}</p>")
            rest = rest[idx:]
        cls = ' class="era-heading"' if era else ""
        out.append(f'<h2 id="{id_}"{cls}><a href="#table-of-contents">{escape(title)}</a></h2>')
        rest = rest[len(md_h):].strip()
        # Content until next ##
        next_h = re.search(r"\n## ", rest)
        block = rest[: next_h.start()].strip() if next_h else rest.strip()
        rest = rest[next_h.end():] if next_h else ""
        for para in block.split("\n\n"):
            para = para.strip()
            if not para:
                continue
            if para.startswith("**Problem.**"):
                body = md_link_to_html(para[12:].strip())
                out.append(f"<p><strong>Problem.</strong> {body}</p>")
            elif para.startswith("**Solution.**"):
                body = md_link_to_html(para[12:].strip())
                out.append(f"<p><strong>Solution.</strong> {body}</p>")
            elif para.startswith("(1) "):
                body = md_link_to_html(para)
                out.append(f"<p>{body}</p>")
            elif para.startswith("(2) "):
                body = md_link_to_html(para)
                out.append(f"<p>{body}</p>")
            elif para.startswith('"Hello'):
                # Translation example
                lines = para.replace('"', "&quot;").split("\n")
                out.append("<p>" + "<br>\n".join(lines) + "</p>")
            else:
                body = md_link_to_html(para)
                out.append(f"<p>{body}</p>")

    new_ai_html = "\n\n".join(out)

    html_lines = HTML.read_text(encoding="utf-8").splitlines(keepends=True)
    # Find start: line with <h2 id="ai-coding"
    # Find end: line with <h2 id="discussion"
    start_i = end_i = None
    for i, line in enumerate(html_lines):
        if '<h2 id="ai-coding"' in line:
            start_i = i
        if start_i is not None and '<h2 id="discussion"' in line:
            end_i = i
            break
    if start_i is None or end_i is None:
        raise SystemExit("Could not find AI section in HTML")
    new_content = "".join(html_lines[:start_i]) + new_ai_html + "\n\n" + "".join(html_lines[end_i:])
    HTML.write_text(new_content, encoding="utf-8")
    print("Patched", HTML, file=__import__("sys").stderr)


if __name__ == "__main__":
    main()

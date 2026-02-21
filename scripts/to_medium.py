#!/usr/bin/env python3
"""
Convert the FORTRAN-to-LLMs Jekyll post to a Medium-friendly Markdown file.
- Strips front matter and Jekyll-specific HTML.
- Converts in-text refs to [Tag](url) using URLs from ref-item blocks.
- Removes section-reference blocks (citations become inline links).
- Converts LaTeX math to plain text/Unicode where possible.
- Simplifies TOC to a short contents list (no anchor links).
- Uses full URL for hero image.
"""
import re
import sys
from pathlib import Path

# Base URL for images (user can change if they use custom domain)
BASE_URL = "https://djpardis.github.io"

def main():
    post_path = Path(__file__).parent.parent / "_posts" / "2026-02-10-evolution-software-engineering-fortran-llms.md"
    out_path = Path(__file__).parent.parent / "_drafts" / "evolution-for-medium.md"
    text = post_path.read_text(encoding="utf-8")

    # 1. Strip front matter
    if text.startswith("---"):
        end = text.index("---", 3) + 3
        text = text[end:].lstrip("\n")

    # 2. Build ref map: ref id (base) -> first external URL in that ref-item
    def ref_id_base(s):
        return re.sub(r"-back(-\d+)?$", "", s)

    ref_to_url = {}
    for ref_block in re.finditer(
        r'<div class="ref-item">(.*?)</div>', text, re.DOTALL
    ):
        block = ref_block.group(1)
        id_m = re.search(r'id="(ref-[^"]+)"', block)
        url_m = re.search(r'href="(https://[^"]+)"', block)
        if id_m and url_m:
            base = ref_id_base(id_m.group(1))
            ref_to_url[base] = url_m.group(1)

    # 3. Replace in-text ref links: <a href="#ref-XXX" ...>[Tag]</a> -> [Tag](url)
    def replace_ref(m):
        href = m.group(1)  # e.g. #ref-Met59
        tag = m.group(2)    # e.g. [Met59]
        ref_key = href.lstrip("#")  # ref-Met59
        base = ref_id_base(ref_key)
        url = ref_to_url.get(base) or ref_to_url.get(ref_key)
        if url:
            return f"{tag}({url})"
        return tag
    text = re.sub(
        r'<a href="#(ref-[^"]+)"[^>]*>(\[[^\]]+\])</a>',
        replace_ref,
        text,
    )

    # 4. Remove ref-item divs first (they live inside section-references)
    text = re.sub(r'<div class="ref-item">.*?</div>\s*', "\n", text, flags=re.DOTALL)
    # Remove section-references wrapper
    text = re.sub(
        r'<div class="section-references">\s*<strong>References</strong>\s*</div>\s*',
        "\n\n",
        text,
        flags=re.DOTALL,
    )
    # Remove orphan </div> left from section-references
    text = re.sub(r"\n</div>\s*\n(?=## )", "\n\n", text)

    # 5. Remove HTML comments
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)

    # 6. Simplify TOC: replace the big toc-container with a short list (no links)
    toc_simple = """## Table of contents

- Introduction
- Foundations (1957–1980s)
- Internet and Web (1983–2002)
- Cloud and infrastructure (2004–2016)
- AI coding (2017–2024)
- Discussion
- Conclusion

"""
    text = re.sub(
        r'<div class="toc-container post-container">.*?</div>\s*',
        toc_simple,
        text,
        count=1,
        flags=re.DOTALL,
    )

    # 7. Hero image: full URL
    text = text.replace(
        'src="/files/',
        f'src="{BASE_URL}/files/',
    )
    text = re.sub(
        r'<div class="post-hero-image">\s*<img ([^>]+)>\s*</div>',
        r'![\1](Camera obscura)',
        text,
        count=1,
    )
    # Fix the replacement: we want markdown image. Revert to img with full URL.
    text = re.sub(
        r'!\[([^\]]+)\]\(Camera obscura\)',
        f'<img src="{BASE_URL}/files/pics/blog/2026/camera%20obscura.jpg" alt="Camera obscura">',
        text,
        count=1,
    )

    # 8. Headings: remove [link](#anchor) and {#id}, keep title only
    text = re.sub(
        r'## \[([^\]]+)\]\(#table-of-contents\)\s*\{#[^}]+\}',
        r"## \1",
        text,
    )
    text = re.sub(
        r'<h2 id="[^"]*" class="era-heading"><a href="#table-of-contents">([^<]+)</a></h2>',
        r"## \1",
        text,
    )

    # 9. Link cards: replace with simple markdown link (keep URL and title)
    def simplify_link_card(m):
        inner = m.group(0)
        href_m = re.search(r'href="(https://[^"]+)"', inner)
        title_m = re.search(r'link-card-title">([^<]+)</span>', inner)
        if href_m and title_m:
            return f"[{title_m.group(1)}]({href_m.group(1)})"
        return ""
    text = re.sub(
        r'<div class="link-cards"[^>]*>.*?<span class="link-card-title">[^<]+</span>.*?</a>\s*</div>',
        simplify_link_card,
        text,
        flags=re.DOTALL,
    )
    # If that left caption, keep it
    text = re.sub(
        r'<p class="image-caption">([^<]+(?:<a [^>]+>[^<]*</a>)*[^<]*)</p>',
        r"*\1*",
        text,
    )

    # 10. Figure and image-caption
    text = re.sub(r'<figure[^>]*>', "", text)
    text = re.sub(r"</figure>", "", text)
    text = re.sub(r'<p class="image-caption">', "\n*", text)
    text = re.sub(r"</p>", "*\n", text)

    # 11. Math: simple substitutions for Medium (no LaTeX)
    # Inline: $x$ -> x, $\theta$ -> θ, $h_t$ -> h_t, $\pi_\theta$ -> π_θ
    text = re.sub(r"\$\\theta\$", "θ", text)
    text = re.sub(r"\$\\pi_\\theta\$", "π_θ", text)
    text = re.sub(r"\$\\mathbb\{R\}\$", "R", text)
    text = re.sub(r"\$([a-zA-Z_][a-zA-Z0-9_]*)\$", r"\1", text)  # single symbol
    # Display math: replace with short description in parentheses
    text = re.sub(
        r"\$\$[\s\S]*?\$\$",
        " *(see original post for equation)* ",
        text,
    )
    text = re.sub(
        r"\$\$[^$]+\$\$",
        " *(equation)* ",
        text,
    )
    # Remaining $...$ (multi-token)
    text = re.sub(r"\$[^$]+\$", r" *(formula)* ", text)

    # 12. Video container: keep iframe for YouTube (Medium supports embed)
    # No change needed for iframe.

    # 13. Note and crosspost containers at end
    text = re.sub(
        r'<div class="note-container post-container">[\s\S]*?</div>\s*',
        "",
        text,
    )
    text = re.sub(
        r'<div class="crosspost-container post-container">[\s\S]*?</div>\s*',
        "\n\n*Originally published at [djpardis.com](https://djpardis.com).*\n",
        text,
    )

    # 14. Clean up redundant blank lines
    text = re.sub(r"\n{4,}", "\n\n\n", text)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(text, encoding="utf-8")
    print(f"Wrote {out_path}", file=sys.stderr)


if __name__ == "__main__":
    main()

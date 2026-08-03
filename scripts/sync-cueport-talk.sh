#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="${CUEPORT_TALK_DIST:-"$ROOT/../talk1/dist"}"
DEST="$ROOT/talks/cueport"

if [[ ! -d "$SOURCE" ]]; then
  echo "Cueport talk export not found: $SOURCE" >&2
  echo "Build the Slidev talk in /Users/djpardis/Documents/talk1 first." >&2
  exit 1
fi

mkdir -p "$ROOT/talks"
rsync -a --delete --exclude ".DS_Store" "$SOURCE/" "$DEST/"

python3 - "$DEST" <<'PY'
from pathlib import Path
import re
import sys

dest = Path(sys.argv[1])

for name in ("index.html", "404.html"):
    path = dest / name
    text = path.read_text()
    text = text.replace(
        '<link rel="icon" href="https://cdn.jsdelivr.net/gh/slidevjs/slidev/assets/favicon.png">',
        '<link rel="icon" type="image/svg+xml" href="/talks/cueport/cueport-logo.svg">',
    )
    path.write_text(text)

index_files = list((dest / "assets").glob("index-*.js"))
if len(index_files) != 1:
    raise SystemExit(f"Expected one Slidev index bundle, found {len(index_files)}")

bundle = index_files[0]
text = bundle.read_text()
text = text.replace("history:Ne(`./`)", "history:Ne(`/talks/cueport/`)")
bundle.write_text(text)

css_files = list((dest / "assets").glob("index-*.css"))
if len(css_files) != 1:
    raise SystemExit(f"Expected one Slidev CSS bundle, found {len(css_files)}")

css = css_files[0]
marker = "/* Cueport website video overrides. */"
overrides = f"""

{marker}
.slidev-page-6 .slidev-layout,
.slidev-page-7 .slidev-layout {{
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  background: #000 !important;
}}

.slidev-page-6 .slidev-layout:before,
.slidev-page-7 .slidev-layout:before {{
  display: none !important;
  content: none !important;
}}

.slidev-slide-content:has(.slidev-page-6:not([style*="display: none"])) > .talk-footer-right,
.slidev-slide-content:has(.slidev-page-7:not([style*="display: none"])) > .talk-footer-right {{
  display: none !important;
}}

.demo-video {{
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  margin: 0 auto !important;
  max-height: none !important;
}}

.demo-video--desktop {{
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  position: absolute !important;
}}

.demo-video--phone {{
  width: auto !important;
  height: 100% !important;
  max-width: 100% !important;
  object-fit: contain !important;
}}
"""

css_text = css.read_text()
if marker in css_text:
    css_text = css_text[:css_text.index(marker)].rstrip()
css.write_text(css_text.rstrip() + overrides)

root_index = (dest / "index.html").read_text()
nested_index = root_index.replace('href="./', 'href="../').replace('src="./', 'src="../')
match = re.search(r"P=Array\\((\\d+)\\)", text)
slide_count = int(match.group(1)) if match else 20

for number in range(1, slide_count + 1):
    route_dir = dest / str(number)
    route_dir.mkdir(exist_ok=True)
    (route_dir / "index.html").write_text(nested_index)
PY

echo "Synced Cueport talk from $SOURCE to $DEST"

#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="${ATPROTO_VANCOUVER_TALK_DIST:-"$ROOT/../talk1/dist"}"
DEST="$ROOT/talks/cueport-atproto-vancouver-2026"
TALK_BASE="/talks/cueport-atproto-vancouver-2026"

if [[ ! -d "$SOURCE" ]]; then
  echo "ATProto Vancouver talk export not found: $SOURCE" >&2
  echo "Build the Slidev talk in /Users/djpardis/Documents/talk1 first." >&2
  exit 1
fi

mkdir -p "$ROOT/talks"
rsync -a --delete --exclude ".DS_Store" "$SOURCE/" "$DEST/"

python3 - "$DEST" "$TALK_BASE" <<'PY'
from pathlib import Path
import re
import sys

dest = Path(sys.argv[1])
talk_base = sys.argv[2]

for name in ("index.html", "404.html"):
    path = dest / name
    text = path.read_text()
    text = text.replace(
        '<link rel="icon" href="https://cdn.jsdelivr.net/gh/slidevjs/slidev/assets/favicon.png">',
        f'<link rel="icon" type="image/svg+xml" href="{talk_base}/cueport-logo.svg">',
    )
    path.write_text(text)

index_files = list((dest / "assets").glob("index-*.js"))
if len(index_files) != 1:
    raise SystemExit(f"Expected one Slidev index bundle, found {len(index_files)}")

bundle = index_files[0]
text = bundle.read_text()
text = text.replace("history:Ne(`./`)", f"history:Ne(`{talk_base}/`)")
bundle.write_text(text)

asset_paths = {
    "./cueport-logo.svg": f"{talk_base}/cueport-logo.svg",
    "./dj-booth-wide.jpg": f"{talk_base}/dj-booth-wide.jpg",
    "./dj-booth-closeup.jpg": f"{talk_base}/dj-booth-closeup.jpg",
    "./qr-usecueport.svg": f"{talk_base}/qr-usecueport.svg",
    "./videos/final-final.mp4": f"{talk_base}/videos/final-final.mp4",
    "./videos/final-final-mobile.mp4": f"{talk_base}/videos/final-final-mobile.mp4",
}

for js in (dest / "assets").glob("*.js"):
    js_text = js.read_text()
    for old, new in asset_paths.items():
        js_text = js_text.replace(old, new)
    js.write_text(js_text)

root_index = (dest / "index.html").read_text()
nested_index = root_index.replace('href="./', 'href="../').replace('src="./', 'src="../')
match = re.search(r"P=Array\\((\\d+)\\)", text)
slide_count = int(match.group(1)) if match else 20

for number in range(1, slide_count + 1):
    route_dir = dest / str(number)
    route_dir.mkdir(exist_ok=True)
    (route_dir / "index.html").write_text(nested_index)
PY

echo "Synced ATProto Vancouver talk from $SOURCE to $DEST"

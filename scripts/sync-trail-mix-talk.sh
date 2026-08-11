#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="${TRAIL_MIX_TALK_DIST:-"$ROOT/../talk2/dist"}"
DEST="$ROOT/talks/trail-mix-fossy-2026"
ASSET_BASE="/talks/trail-mix-fossy-2026/assets/"

if [[ ! -d "$SOURCE" ]]; then
  echo "trail mix talk export not found: $SOURCE" >&2
  echo "Build the Reveal.js talk in /Users/djpardis/Documents/talk2 first." >&2
  exit 1
fi

mkdir -p "$ROOT/talks"
rsync -a --delete --exclude ".DS_Store" "$SOURCE/" "$DEST/"

python3 - "$DEST" "$ASSET_BASE" <<'PY'
from pathlib import Path
import sys

dest = Path(sys.argv[1])
asset_base = sys.argv[2]

for path in dest.rglob("*"):
    if path.suffix not in {".html", ".css", ".js"}:
        continue
    text = path.read_text()
    text = text.replace("/assets/", asset_base)
    path.write_text(text)
PY

echo "Synced trail mix talk from $SOURCE to $DEST"

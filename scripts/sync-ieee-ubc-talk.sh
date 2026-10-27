#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="${IEEE_UBC_TALK_DIST:-"$ROOT/../talk2/talks/ieee-lunch-learn/dist"}"
DEST="$ROOT/talks/trail-mix-ieee-ubc-2026"
ASSET_BASE="/talks/trail-mix-ieee-ubc-2026/assets/"

if [[ ! -d "$SOURCE" ]]; then
  echo "IEEE at UBC talk export not found: $SOURCE" >&2
  echo "Build the Reveal.js talk in /Users/djpardis/Documents/talk2/talks/ieee-lunch-learn first." >&2
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

echo "Synced IEEE at UBC talk from $SOURCE to $DEST"

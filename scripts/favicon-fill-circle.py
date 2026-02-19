#!/usr/bin/env python3
"""Add full-bleed #FFFF99 background to public/favicon/favicon.png so Google's circle crop fills.
Run from repo root. Requires: pip install Pillow"""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install Pillow: pip install Pillow")

path = Path(__file__).resolve().parent.parent / "public" / "favicon" / "favicon.png"
if not path.exists():
    raise SystemExit(f"Missing {path}")

img = Image.open(path).convert("RGBA")
w, h = img.size
bg = Image.new("RGBA", (w, h), (255, 255, 153, 255))  # #FFFF99
bg.paste(img, (0, 0), img)
out = path.with_suffix(".png")
bg.convert("RGB").save(out)
print(f"Updated {out} with full-bleed #FFFF99 background.")

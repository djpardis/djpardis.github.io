# Favicon and Google search circle

Google shows favicons inside a **circle**. If the icon is a small square on a transparent or white canvas, the circle will have empty space around it.

**To fix the favicon so it fills Google's circle:**

- **Script (from repo root):** `python3 scripts/favicon-fill-circle.py` (requires `pip install Pillow`). This composites the current icon onto a full-bleed #FFFF99 background and overwrites `favicon.png`.

- **Manual:**
1. Open `favicon.png` in an image editor (e.g. Figma, Photoshop, GIMP).
2. Add a **full-bleed background** that covers the entire canvas:
   - Use the site theme color `#FFFF99` (or white `#FFFFFF`) so the circle is filled.
   - The background layer should extend to all edges (no transparent corners).
3. Keep your logo/grid **centered** on that background. Size it so it sits comfortably in the middle (e.g. within the inner 80% “safe” area).
4. Export as PNG (e.g. 192×192 or 512×512) and replace this folder’s `favicon.png`. Update or regenerate `favicon.ico` in the site root if you use it.

Result: when Google (or any platform) applies a circular crop, the circle will be filled with your background color and the logo will stay centered.

**Sizes:** Google recommends at least 48×48px; 48×48, 96×96, and 192×192 are all good. The site already references the PNG in the manifest and in `<head>`.

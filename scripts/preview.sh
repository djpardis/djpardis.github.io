#!/usr/bin/env bash
# Build and serve _site with clean URLs.
# Usage: scripts/preview.sh [port]   (default port 4000)
set -euo pipefail

PORT="${1:-4000}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE="$ROOT/_site"

"$ROOT/scripts/build.sh"

# Keep preview CSS and JS in sync if they change after the build.
rsync -a "$ROOT/public/" "$SITE/public/" 2>/dev/null || cp -R "$ROOT/public/." "$SITE/public/"

# Free the port if a previous preview is still holding it.
PIDS="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null || true)"
if [ -n "$PIDS" ]; then
  kill $PIDS 2>/dev/null || true
  for _ in 1 2 3 4 5; do
    if ! lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

echo "Serving $SITE at:"
echo "  http://127.0.0.1:$PORT/"
echo "  http://127.0.0.1:$PORT/research/"
cd "$SITE"
exec python3 -m http.server "$PORT" --bind 127.0.0.1

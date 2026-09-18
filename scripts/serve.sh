#!/usr/bin/env bash
set -euo pipefail
# Canonical local preview entry point.
#
# Use this script when checking normal post URLs and generated print URLs.
# Jekyll's server resolves extensionless paths such as /print to print.html,
# while a static Python server does not.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-4000}"

cd "$ROOT"

export RBENV_VERSION="${RBENV_VERSION:-$(tr -d '[:space:]' < .ruby-version)}"
unset BUNDLE_PATH

bundle config set --local path ".bundle/vendor" >/dev/null

if ! bundle check >/dev/null 2>&1; then
  bundle install
fi

# Free the port if a previous local preview is still holding it.
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

echo "Serving site at:"
echo "  http://127.0.0.1:$PORT/"
echo
echo "For a post, use:"
echo "  http://127.0.0.1:$PORT/blog/YYYY/MM/DD/post-slug/"
echo "  http://127.0.0.1:$PORT/blog/YYYY/MM/DD/post-slug/print"
echo "  http://127.0.0.1:$PORT/blog/YYYY/MM/DD/post-slug/print-no-images"
echo

exec bundle exec jekyll serve --host 127.0.0.1 --port "$PORT" --livereload
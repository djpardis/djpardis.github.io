#!/usr/bin/env bash
set -euo pipefail
# Canonical local preview entry point.
#
# Use this script when checking normal post URLs and generated print URLs.
# Jekyll's server resolves extensionless paths such as /print to print.html,
# while a static Python server does not.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-4000}"
HOST="${HOST:-127.0.0.1}"
URL="http://127.0.0.1:$PORT/"
LOG_FILE="${TMPDIR:-/tmp}/djpardis-jekyll-serve-$PORT.log"

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
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if ! lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done

  PIDS="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null || true)"
  if [ -n "$PIDS" ]; then
    kill -9 $PIDS 2>/dev/null || true
  fi

  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if ! lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "Port $PORT is still in use after cleanup."
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN
  exit 1
fi

: > "$LOG_FILE"

bundle exec ruby -r "$ROOT/scripts/webrick-no-sendfile.rb" -S jekyll serve \
  --host "$HOST" --port "$PORT" --livereload \
  > "$LOG_FILE" 2>&1 &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}

trap cleanup INT TERM

for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "Jekyll server exited before it was ready. Log follows."
    cat "$LOG_FILE"
    exit 1
  fi

  if curl -fsSI "$URL" >/dev/null 2>&1; then
    if ! kill -0 "$SERVER_PID" 2>/dev/null; then
      echo "Jekyll server exited during readiness check. Log follows."
      cat "$LOG_FILE"
      exit 1
    fi

    echo "Serving site at:"
    echo "  $URL"
    echo
    echo "For a post, use:"
    echo "  http://127.0.0.1:$PORT/blog/YYYY/MM/DD/post-slug/"
    echo "  http://127.0.0.1:$PORT/blog/YYYY/MM/DD/post-slug/print"
    echo "  http://127.0.0.1:$PORT/blog/YYYY/MM/DD/post-slug/print-no-images"
    echo
    echo "Jekyll log:"
    echo "  $LOG_FILE"
    echo
    wait "$SERVER_PID"
    exit $?
  fi

  sleep 0.5
done

echo "Jekyll server did not become ready at $URL. Log follows."
cat "$LOG_FILE"
kill "$SERVER_PID" 2>/dev/null || true
exit 1

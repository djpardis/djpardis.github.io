#!/usr/bin/env bash
set -euo pipefail
# Local preview entry point.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

exec "$ROOT/scripts/preview.sh" "${1:-4000}"
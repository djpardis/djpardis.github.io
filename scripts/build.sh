#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export RBENV_VERSION="${RBENV_VERSION:-$(tr -d '[:space:]' < .ruby-version)}"
unset BUNDLE_PATH

bundle config set --local path ".bundle/vendor" >/dev/null

if ! bundle check >/dev/null 2>&1; then
  bundle install
fi

echo "Building Jekyll site with Ruby $RBENV_VERSION..."
bundle exec jekyll build "$@"
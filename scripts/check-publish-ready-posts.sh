#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ "${ALLOW_PUBLISH_POSTS:-}" = "1" ]; then
  exit 0
fi

if [ "$#" -eq 2 ]; then
  changed_posts="$(git diff --name-status --diff-filter=ACR "$1" "$2" -- _posts/*.md 2>/dev/null | awk '{print $NF}')"
elif git rev-parse --verify HEAD >/dev/null 2>&1; then
  changed_posts="$(git diff --cached --name-status --diff-filter=ACR HEAD -- _posts/*.md 2>/dev/null | awk '{print $NF}')"
else
  changed_posts="$(git diff --cached --name-status --diff-filter=ACR -- _posts/*.md 2>/dev/null | awk '{print $NF}')"
fi

if [ -z "$changed_posts" ]; then
  exit 0
fi

missing_marker=0

while IFS= read -r post; do
  [ -z "$post" ] && continue
  [ -f "$post" ] || continue

  if ! awk '
    NR == 1 && $0 == "---" { in_front_matter = 1; next }
    in_front_matter && $0 == "---" { exit found ? 0 : 1 }
    in_front_matter && $0 ~ /^publish_ready:[[:space:]]*true[[:space:]]*$/ { found = 1 }
    END {
      if (in_front_matter && found) {
        exit 0
      }
      exit 1
    }
  ' "$post"; then
    echo "New published post is missing publish_ready: true in front matter: $post" >&2
    missing_marker=1
  fi
done <<< "$changed_posts"

if [ "$missing_marker" -ne 0 ]; then
  cat >&2 <<'MSG'

This repository treats _posts/ as published content.

Put unfinished work in _drafts/. To publish intentionally, add this front matter
to each newly staged post:

publish_ready: true

For an emergency override, set ALLOW_PUBLISH_POSTS=1 for that commit.
MSG
  exit 1
fi

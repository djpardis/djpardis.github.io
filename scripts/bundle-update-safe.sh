#!/bin/bash
# Run bundle update and keep Gemfile.lock valid for GitHub Pages (Linux).
# Use this instead of plain "bundle update" so the site still builds on push.
set -e
bundle update "$@"
bundle lock --add-platform ruby --add-platform x86_64-linux
echo "Gemfile.lock updated with ruby + x86_64-linux (safe for GitHub Pages)."

#!/bin/bash
# Jekyll development server script
# Fixes gem version conflicts by using bundle exec

echo "Starting Jekyll development server..."
echo "Note: If you see gem version conflicts, this script uses bundle exec to fix them"

# Kill any existing Jekyll processes first
pkill -f jekyll 2>/dev/null

# Start Jekyll with bundle exec to avoid gem conflicts
bundle exec jekyll serve --port 4000 --livereload --drafts
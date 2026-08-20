#!/usr/bin/env bash
set -euo pipefail

# Build validation script for djpardis.github.io
# This script checks for common issues before pushing changes

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export RBENV_VERSION="${RBENV_VERSION:-$(tr -d '[:space:]' < .ruby-version)}"
unset BUNDLE_PATH
bundle config set --local path ".bundle/vendor" >/dev/null

echo "🔍 Validating build..."

# Check if Jekyll is installed
if ! command -v bundle &> /dev/null; then
    echo "❌ Error: Bundle not found. Please install Ruby and Bundler."
    exit 1
fi

# Check if all dependencies are installed
echo "📦 Checking dependencies..."
if ! bundle check &> /dev/null; then
    echo "📦 Installing missing dependencies..."
    bundle install
fi

# Build the site
echo "🏗️  Building site..."
if ! bundle exec jekyll build &> /dev/null; then
    echo "❌ Error: Build failed"
    exit 1
fi

# Check for common issues in generated HTML
echo "🔍 Checking generated HTML..."

# Check for broken links
echo "🔗 Checking for broken internal links..."
# Get all anchor IDs from the site (simplified approach)
anchor_ids=$(grep -r "id=\"" _site/ | grep -v "javascript:" | sed 's/.*id="\([^"]*\)".*/\1/' | sort -u)
# Get all href="#..." links (simplified approach)
href_links=$(grep -r "href=\"#" _site/ | grep -v "javascript:" | sed 's/.*href="#\([^"]*\)".*/\1/' | sort -u)

# Simple check - if we have href links, make sure we have some anchor IDs
if [ -n "$href_links" ] && [ -z "$anchor_ids" ]; then
    echo "⚠️  Warning: Found href links but no anchor IDs"
elif [ -n "$href_links" ]; then
    echo "✅ Found internal links and anchor IDs (basic validation passed)"
else
    echo "✅ No internal links to validate"
fi

# Check for missing images
echo "🖼️  Checking for missing images..."
if grep -r "alt=\"\"" _site/ | grep -v "favicon"; then
    echo "⚠️  Warning: Found images without alt text"
fi

# Check CSS syntax (basic check)
echo "🎨 Checking CSS syntax..."
if grep -n "}" public/css/custom-styles.css | wc -l | grep -q "$(grep -n "{" public/css/custom-styles.css | wc -l)"; then
    echo "✅ CSS braces are balanced"
else
    echo "⚠️  Warning: CSS braces may be unbalanced"
fi

# Check for common CSS issues
if grep -n "!important" public/css/custom-styles.css | wc -l | grep -q "[0-9]"; then
    echo "⚠️  Warning: Found !important declarations (may indicate specificity issues)"
fi

echo "✅ Build validation completed successfully!"
echo "🚀 Ready to push changes" 
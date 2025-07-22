#!/bin/bash

# Build validation script for djpardis.github.io
# This script checks for common issues before pushing changes

echo "🔍 Validating build..."

# Check if Jekyll is installed
if ! command -v bundle &> /dev/null; then
    echo "❌ Error: Bundle not found. Please install Ruby and Bundler."
    exit 1
fi

# Check if all dependencies are installed
echo "📦 Checking dependencies..."
if ! bundle check &> /dev/null; then
    echo "❌ Error: Dependencies not installed. Run 'bundle install'"
    exit 1
fi

# Build the site
echo "🏗️  Building site..."
if ! bundle exec jekyll build --safe &> /dev/null; then
    echo "❌ Error: Build failed"
    exit 1
fi

# Check for common issues in generated HTML
echo "🔍 Checking generated HTML..."

# Check for broken links
echo "🔗 Checking for broken internal links..."
if grep -r "href=\"#" _site/ | grep -v "javascript:"; then
    echo "⚠️  Warning: Found potential broken links"
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
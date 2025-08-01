# Pardis Noorzad's Personal Website

This repository contains the source code for [djpardis.com](https://djpardis.com), a personal website and blog built with Jekyll.

## Technology

Built with:
- Jekyll static site generator
- Markdown for content
- SASS/SCSS for styling
- Hosted on GitHub Pages

## Development

### Build Validation

This project includes automated build validation to prevent deployment issues:

- **Pre-commit hook**: Automatically validates builds before commits
- **Validation script**: `./scripts/validate-build.sh` checks for common issues
- **Manual validation**: Run `./scripts/validate-build.sh` anytime

The validation checks:
- ✅ Jekyll build success
- ✅ CSS syntax validation
- ✅ Broken link detection
- ✅ Missing image alt text
- ⚠️ Common CSS issues (like excessive `!important` usage)

### Local Development

```bash
# Install dependencies
bundle install

# Start local server (recommended - uses convenience script)
./scripts/serve.sh

# Or start manually with bundle exec
bundle exec jekyll serve --port 4000 --livereload --drafts

# Build site
./scripts/build.sh

# Or build manually
bundle exec jekyll build

# Validate build
./scripts/validate-build.sh
```

**Note**: Always use `bundle exec` with Jekyll commands to avoid gem version conflicts. The convenience scripts in `./scripts/` handle this automatically.

### Troubleshooting

If you encounter gem version conflicts like:
```
You have already activated jekyll-sass-converter 3.1.0, but your Gemfile requires jekyll-sass-converter 2.2.0
```

**Solution**: Use `bundle exec` before Jekyll commands or run the convenience scripts:
- `./scripts/serve.sh` for development
- `./scripts/build.sh` for building

## Mobile Testing

To test mobile responsiveness (images, captions, layout):

1. **Start Jekyll**: `./scripts/serve.sh`
2. **Open**: http://127.0.0.1:4000/107wins (or any page)
3. **Dev Tools**: 
   - **Chrome/Edge**: Press `F12` → Click the **tablet/phone icon** (📱) in toolbar
   - **Firefox**: Press `F12` → Click **Responsive Design Mode** button
   - **Safari**: Enable Developer menu → Click **Responsive Design Mode**
4. **Select Device**: iPhone 12 Pro, Pixel 5, etc.
5. **Test**: Images should auto-resize to 100% width, captions stay centered

**No custom preview tools needed** - browser dev tools are the standard.

## Contact

For more information, visit [djpardis.com](https://djpardis.com) or connect via [LinkedIn](https://www.linkedin.com/in/djpardis) or [GitHub](https://github.com/djpardis).

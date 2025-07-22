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

# Start local server
bundle exec jekyll serve

# Validate build
./scripts/validate-build.sh
```

## Contact

For more information, visit [djpardis.com](https://djpardis.com) or connect via [LinkedIn](https://www.linkedin.com/in/djpardis) or [GitHub](https://github.com/djpardis).

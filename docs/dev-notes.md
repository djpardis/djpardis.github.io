# Local dev notes

Jekyll site for djpardis.com. Notes for local development and builds.

## Build and run

```bash
./scripts/serve.sh
./scripts/build.sh
```

Use `./scripts/serve.sh` for local post review. It installs missing gems into
the ignored local bundle path, frees the requested port, and runs Jekyll's
development server so clean post URLs and generated print URLs work the same
way they do on the deployed site.

The default port is `4000`. To use another port, pass it as the first argument.

```bash
./scripts/serve.sh 4001
```

## Updating dependencies

Site builds on Linux (GitHub Actions). After any `bundle update` or Gemfile change, run:

```bash
./scripts/bundle-update-safe.sh
# or: bundle lock --add-platform ruby --add-platform x86_64-linux
```

Otherwise the Actions build can fail with dependency or platform errors.

## Validation

```bash
./scripts/validate-build.sh
```

Checks include Jekyll build, CSS, broken links, and image alt text.

## Hero and list pages

- Hero block: `_includes/hero-with-text.html` (used by `about.md`). Pass `image`, `alt`, `content`.
- Spacing and layout: `public/css/custom-styles.css` (`.hero-container`, `.page > .hero-container`, `.collapsible-section`).

## Deploy

Push to `master`. GitHub Actions builds and deploys to Pages (repository Settings → Pages → source GitHub Actions).

## Related

- [Print-friendly blog URLs](print-friendly-blog-posts.md)

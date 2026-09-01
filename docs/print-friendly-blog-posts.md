# Print-friendly blog posts

This site serves a **minimal print and PDF view** for every published post. The layout strips the sidebar, hero image, subscribe block, and related posts while keeping the table of contents at the beginning of the article.

For local builds and deploy, see **[dev-notes.md](dev-notes.md)**.

## How it works

- **`_plugins/print_article_generator.rb`**  
  At build time, adds **two** pages per post. No per-post Markdown files are required.

- **`_layouts/print-article.html`**  
  Renders a full HTML page from the post body. It finds the post using `print_source_path`, which the generator sets automatically.

- **`sitemap.xml`**  
  Omits pages with `sitemap: false` in front matter. Generated print pages set `sitemap: false`, so print URLs are not listed.

- **Search engines**  
  Each print page sends **`noindex, nofollow`** and a **`rel="canonical"`** link to the normal post URL so Google and others should not surface print URLs in results and should attribute signals to the article. Do not add **`Disallow`** in `robots.txt` for those paths, or crawlers might not fetch the page and would not reliably see `noindex`.

## URLs for a post

Posts use this permalink pattern from `_config.yml`.

`/blog/:year/:month/:day/:title/`

**Full print** (figures, video embeds, link-card thumbnails, image rows). Append **`print`** to that path. Jekyll writes **`print.html`** next to the post `index.html`, so the path is like `/blog/YYYY/MM/DD/your-slug/print.html`.

**Print without photos** keeps SVG figures and MathJax while omitting raster
images, video and iframe embeds, `.image-row` blocks, and `.link-card-image`
panels. Append **`print-no-images`** the same way, e.g.
`/blog/YYYY/MM/DD/your-slug/print-no-images.html`.

Each page links to the other in the footer. MathJax is unchanged on the
photo-free URL when the post has **`math: true`**.

## Opt out

To skip generating **both** print pages for one post, add this to that post front matter.

```yaml
print_page: false
```

## Link from a post

Use the real year, month, day, and slug for that file.

```markdown
A [print-friendly page](/blog/YYYY/MM/DD/your-post-slug/print.html) is available.
A [print version without photos](/blog/YYYY/MM/DD/your-post-slug/print-no-images.html) keeps SVG figures while producing a smaller PDF.
```

From inside a post you can use Liquid, for example `{{ page.url }}print-no-images.html` as the href. Or build once and copy the exact paths from `_site`.

## Build and check

```bash
bundle exec jekyll build
```

Open the generated files under `_site` or run `bundle exec jekyll serve` and visit the URLs in the browser, then print or save as PDF.

Drafts only appear when you pass **`--drafts`**. Print pages are generated only for posts that exist in that build, same as normal post URLs.

## Customizing the print layout

Edit **`_layouts/print-article.html`**. The stylesheet keeps `.toc-container`
visible near the beginning of the post body and hides `.post-hero-image` on
every print page. The **`print-no-media`** class controls what is hidden on
the photo-free variant.

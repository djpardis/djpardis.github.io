# Blog page (`/blog`) “Posts” list

The **Posts** section in `blog.md` is not hand-maintained. It loops over Jekyll’s `site.posts`, which is **reverse chronological by post date** (newest first). Adding a normal dated file under `_posts/` is enough for it to appear in the right place.

To **omit** a post from that list while keeping it published (for example a post linked only from **#tbt**), set in the post’s front matter:

```yaml
blog_index_exclude: true
```

See `_posts/2015-05-23-hourly-mentions-of-a-word-on-twitter.md` for an example.

Link text is built from `title` and optional `subtitle` in front matter.

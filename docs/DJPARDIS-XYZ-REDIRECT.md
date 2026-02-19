# Redirecting djpardis.xyz to djpardis.com/dj-gigs

To send visitors from **djpardis.xyz** to **https://djpardis.com/dj-gigs/**, set up a redirect at your DNS or registrar.

## Option 1. URL redirect at your registrar (simplest)

If you use a registrar that offers URL forwarding (e.g. Namecheap, GoDaddy, Google Domains, Cloudflare):

1. Go to your DNS or domain settings for **djpardis.xyz**.
2. Find **URL Redirect**, **Forwarding**, or **301 Redirect**.
3. Create a redirect:
   - **From:** `djpardis.xyz` (and optionally `www.djpardis.xyz`)
   - **To:** `https://djpardis.com/dj-gigs/`
   - **Type:** 301 (permanent)

## Option 2. Separate GitHub Pages site

If djpardis.xyz is on its own GitHub Pages repo:

1. Create a minimal repo with a single `index.html` that redirects:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta http-equiv="refresh" content="0; url=https://djpardis.com/dj-gigs/">
     <link rel="canonical" href="https://djpardis.com/dj-gigs/">
   </head>
   <body>Redirecting to <a href="https://djpardis.com/dj-gigs/">dj-gigs</a>...</body>
   </html>
   ```
2. In repo Settings → Pages, set the custom domain to **djpardis.xyz**.

## Option 3. Cloudflare

If djpardis.xyz uses Cloudflare:

1. **Rules** → **Redirect Rules** → **Create rule**.
2. **When:** `(http.host eq "djpardis.xyz") or (http.host eq "www.djpardis.xyz")`
3. **Then:** Dynamic redirect → `https://djpardis.com/dj-gigs/` with status 301.

## De-indexing old URLs in Google

To ask Google to remove `/gigs.html` and `/djpardis-request.html` from search results:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your property if needed (djpardis.com).
3. **Removals** → **New request**.
4. Add `https://djpardis.com/gigs.html` and `https://djpardis.com/djpardis-request.html` for temporary removal.
5. Or let them drop naturally once they 404 (can take weeks).

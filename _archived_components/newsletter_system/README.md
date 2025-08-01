# Newsletter System Archive

This folder contains all components for the newsletter subscription system that was temporarily removed from the website.

## Components Included

### Main Files
- `NEWSLETTER_SETUP.md` - Complete setup instructions for Buttondown integration
- `newsletter-error.md` - Error page for subscription failures
- `thank-you.md` - Thank you page after successful subscription
- `unsubscribed.md` - Unsubscribe confirmation page

### Code Components
- `_includes/newsletter-signup.html` - Newsletter signup form HTML
- `public/js/newsletter.js` - JavaScript for form validation and submission

## To Restore Newsletter Functionality

1. Copy files back to their original locations:
   ```bash
   cp newsletter-error.md thank-you.md unsubscribed.md ../../../
   cp _includes/newsletter-signup.html ../../../_includes/
   cp public/js/newsletter.js ../../../public/js/
   ```

2. Add newsletter include back to `_layouts/default.html`:
   ```html
   {% include newsletter-signup.html %}
   ```

3. Follow setup instructions in `NEWSLETTER_SETUP.md`

## CSS Styles

Newsletter styles are preserved in `public/css/custom-styles.css` (search for `.newsletter-signup`).

## Removal Date
Archived on: $(date)
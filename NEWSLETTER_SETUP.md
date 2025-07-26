# Newsletter Subscription Setup Instructions

## Overview
A newsletter signup form has been added to the footer of your site. It's currently set up with placeholder functionality. Follow these steps to connect it to Mailchimp.

## Step 1: Create Mailchimp Account
1. Go to [mailchimp.com](https://mailchimp.com) and sign up for a free account
2. Verify your email and complete the setup process
3. Create your first audience/list

## Step 2: Get Your Mailchimp Form Action URL
1. In Mailchimp, go to **Audience** → **Signup forms** → **Embedded forms**
2. Choose **Classic** form style
3. Copy the `action` URL from the generated form code
   - It will look like: `https://[your-domain].us1.list-manage.com/subscribe/post?u=...&id=...`

## Step 3: Update Your Newsletter Form
1. Open `_includes/newsletter-signup.html`
2. Replace `action="#"` with your Mailchimp action URL:
   ```html
   <form action="YOUR_MAILCHIMP_ACTION_URL" method="post" class="newsletter-form" id="newsletter-form">
   ```

## Step 4: Update Email Field Name
1. In the same file, change the email input `name` attribute to match Mailchimp's required format:
   ```html
   <input 
     type="email" 
     name="EMAIL"  <!-- Change this from "email" to "EMAIL" -->
     id="newsletter-email" 
     placeholder="Enter your email address" 
     required
     class="newsletter-input"
   >
   ```

## Step 5: Optional - Enhanced Integration
If you want real form submission (instead of the current demo), update the JavaScript:

1. Open `public/js/newsletter.js`
2. Replace the `setTimeout` simulation with the `submitToMailchimp` function call
3. Uncomment and customize the `submitToMailchimp` function

## Current Features
- ✅ Email validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Mobile responsive design
- ✅ Site-consistent styling
- ✅ Accessible form elements

## Testing
1. Test the form locally with `jekyll serve`
2. Try submitting with invalid emails (should show error)
3. Try submitting with valid emails (should show success message)
4. Once connected to Mailchimp, verify emails appear in your audience

## Styling
The form uses your site's existing color scheme:
- Purple accent color (`#7d78b5`)
- Consistent typography and spacing
- Matches your container styling patterns

## Questions?
The form is ready to go! Just follow the Mailchimp setup steps above and you'll be collecting email subscribers. 
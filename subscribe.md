---
layout: page
title: Subscribe
description: Get notified about new posts and podcast episodes from Pardis Noorzad. Insights on data science, startups, and building in public.
keywords: newsletter, subscription, data science, startups, podcast, pardis noorzad
canonical_url: https://djpardis.com/subscribe
permalink: /subscribe/
robots: noindex, follow
---

<h1 class="post-title">Never miss an update</h1>

Get notified about new posts and podcast episodes every couple of weeks. 
<!-- I share insights on data science, startups, and the journey of building [General Folders](https://generalfolders.com) and [The Data Room App](https://thedataroom.app). -->

### What you'll get

- **🎯 Quality over quantity**: Updates every couple of weeks, not daily spam
- **📝 Behind-the-scenes insights**: Posts about the real stories behind building products
- **🎙️ Podcast episodes**: Deep dives into data, startups, and new tech from [107 Wins](https://107wins.club)
- **⚾️ Baseball fun**: Posts about sabermetrics or pure baseball facts
- **🎶 Playlists**: Annual top 20 playlists with brief song reviews

<br>
<!-- MailerLite Form -->
<form class="newsletter-form" id="newsletter-subscribe-page-form" action="https://assets.mailerlite.com/jsonp/1709436/forms/161652905296791207/subscribe" method="post" target="_blank" data-last-submit="0">
  <!-- Honeypot field (invisible to humans, catches bots) -->
  <div class="hp" style="position: absolute; left: -5000px;" aria-hidden="true">
    <input type="text" name="website" tabindex="-1" value="" autocomplete="nope">
  </div>
  
  <div class="form-group">
    <input 
      type="email" 
      name="fields[email]" 
      id="newsletter-subscribe-page-email" 
      placeholder="Enter your email address" 
      required
      class="newsletter-input"
      aria-label="Email address"
      autocomplete="email"
    >
    <button type="submit" class="newsletter-button">Subscribe</button>
  </div>
  <!-- Hidden fields for MailerLite -->
  <input type="hidden" name="ml-submit" value="1">
  <input type="hidden" name="anticsrf" value="true">
  <input type="hidden" name="hp-check" value="">
  <!-- Message container -->
  <div id="newsletter-subscribe-page-message" class="newsletter-message"></div>
</form>

<!-- Success Message (hidden by default) -->
<div id="newsletter-subscribe-page-success" class="newsletter-message success" style="display: none;">
  Thank you! You have successfully joined our subscriber list.
</div>

<div style="text-align: center; margin: 1rem 0;">
  <p style="color: #757575; font-size: 0.9rem;">No spam, ever. Unsubscribe anytime.</p>
</div>


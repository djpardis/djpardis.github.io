---
layout: page
title: Book us for your event
parent: Gigs
description: Book DJ Pardis for your next event. Fill out our booking form to request a show for corporate events, private parties, and special occasions.
keywords: DJ Pardis, book DJ, DJ booking, event DJ, wedding DJ, corporate DJ, private party DJ, San Francisco DJ
canonical_url: https://djpardis.com/requests
permalink: /requests/
---

# {{ page.title }}
{: .post-title}

Fill out the form below and I'll get back to you within 24-48 hours.

<form action="https://formspree.io/f/xldnywyl" method="POST">
  <input type="hidden" name="_subject" value="DJ Pardis Booking Request">
  
  <h3>Contact information</h3>
  
  <div class="form-field">
    <label for="first_name">First name *</label>
    <input type="text" id="first_name" name="first_name" placeholder="Enter your first name" required>
  </div>
  
  <div class="form-field">
    <label for="last_name">Last name *</label>
    <input type="text" id="last_name" name="last_name" placeholder="Enter your last name" required>
  </div>
  
  <div class="form-field">
    <label for="company_venue">Company / Venue *</label>
    <input type="text" id="company_venue" name="company_venue" placeholder="Company or venue name" required>
  </div>
  
  <h3>Event details</h3>
  
  <div class="form-field">
    <label for="event_date">Event date *</label>
    <input type="date" id="event_date" name="event_date" required>
  </div>
  
  <div class="form-field">
    <label for="event_location">Event location *</label>
    <input type="text" id="event_location" name="event_location" placeholder="City, neighborhood, or full address" required>
  </div>
  
  <div class="form-field">
    <label for="event_website">Event website</label>
    <input type="url" id="event_website" name="event_website" placeholder="https://example.com">
  </div>
  
  <h3>Additional information</h3>
  
  <div class="form-field">
    <label for="additional_comments">Tell us about your event</label>
    <textarea id="additional_comments" name="additional_comments" placeholder="Music preferences, special requests, event details, etc." rows="4"></textarea>
  </div>
  
  <button type="submit" class="newsletter-button">Submit</button>
</form>

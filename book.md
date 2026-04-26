---
layout: post-shell
hide_footer_promos: true
plain_title: true
title: Book us for your event
subtitle: Company events, conferences, gallery openings, etc.
description: Request DJ Pardis for company events, gallery openings, and special occasions. Submit a booking inquiry through the form on this page.
keywords: DJ Pardis, book DJ, event DJ, company DJ, private party DJ, Bay Area DJ
canonical_url: https://djpardis.com/book/
permalink: /book/
robots: noindex, follow
sitemap: false
---

<p>Please fill the form below to book <a href="{{ site.baseurl }}/gigs/">DJ Pardis</a>. We will get back to you within 48 hours.</p>

<form id="dj-booking-form" action="https://formspree.io/f/xldnywyl" method="POST">
  <input type="hidden" name="_subject" value="DJ Pardis Booking Request">

  <h3>Contact information</h3>

  <div class="form-row form-row-cols-2">
    <div class="form-field">
      <label for="first_name">First name <span class="required">*</span></label>
      <input type="text" id="first_name" name="first_name" placeholder="Enter your first name" required>
    </div>

    <div class="form-field">
      <label for="last_name">Last name <span class="required">*</span></label>
      <input type="text" id="last_name" name="last_name" placeholder="Enter your last name" required>
    </div>
  </div>

  <div class="form-field">
    <label for="company_venue">Company / Venue <span class="required">*</span></label>
    <input type="text" id="company_venue" name="company_venue" placeholder="Company or venue name" required>
  </div>

  <h3>Event details</h3>

  <div class="form-field">
    <label for="event_date">Event date <span class="required">*</span></label>
    <input type="date" id="event_date" name="event_date" required>
  </div>

  <div class="form-field">
    <label for="event_location">Event location <span class="required">*</span></label>
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

  <div class="form-actions">
    <button type="submit" class="button">Submit</button>
  </div>
</form>

<script>
(function () {
  function todayIsoLocal() {
    var t = new Date();
    t.setHours(0, 0, 0, 0);
    var y = t.getFullYear();
    var m = String(t.getMonth() + 1).padStart(2, '0');
    var d = String(t.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }
  var form = document.getElementById('dj-booking-form');
  var el = document.getElementById('event_date');
  if (!el || !form) return;
  function applyMin() {
    var min = todayIsoLocal();
    el.min = min;
    el.setAttribute('min', min);
  }
  applyMin();
  el.addEventListener('input', function () {
    el.setCustomValidity('');
  });
  form.addEventListener('submit', function (e) {
    var min = todayIsoLocal();
    var v = el.value;
    if (v && v < min) {
      e.preventDefault();
      el.setCustomValidity('Choose today or a future date.');
      el.reportValidity();
    }
  });
})();
</script>

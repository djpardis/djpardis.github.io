---
layout: page
title: "Guest Request"
css: 107wins-shared
---

{% include 107wins-header.html %}

<div class="section">
  <p><a href="/107wins.html">← Back to 107 Wins</a></p>
</div>

<div class="section">
  <h2>Request to be a guest</h2>
  <p>Interested in being a guest on the 107 Wins podcast? Fill out this form and we'll get back to you soon!</p>
</div>

<form action="https://formspree.io/f/xldnywyl" method="POST">
  <input type="hidden" name="_subject" value="107 Wins Guest Request">
  
  <div class="form-field">
    <label for="name">Full name</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-field">
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-field">
    <label for="company">Company or organization</label>
    <input type="text" id="company" name="company">
  </div>
  
  <div class="form-field">
    <label for="title">Job title or role</label>
    <input type="text" id="title" name="title">
  </div>
  
  <div class="form-field">
    <label for="background">Brief background and experience</label>
    <textarea id="background" name="background" required></textarea>
  </div>
  
  <div class="form-field">
    <label for="topics">Topics you'd like to discuss</label>
    <textarea id="topics" name="topics" required></textarea>
  </div>
  
  <div class="form-field">
    <label for="why">Why you'd like to be a guest</label>
    <textarea id="why" name="why" required></textarea>
  </div>
  
  <div class="form-field">
    <label for="availability">General availability</label>
    <input type="text" id="availability" name="availability" placeholder="e.g., Weekdays after 5pm PT, weekends">
  </div>
  
  <button type="submit">Submit guest request</button>
</form>

{% include 107wins-footer.html %}

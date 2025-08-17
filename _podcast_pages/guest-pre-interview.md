---
layout: page
title: "Guest Pre-Interview"
css: 107wins-shared
---

{% include 107wins-header.html %}

<div class="section">
  <p><a href="/107wins.html">← Back to 107 Wins</a></p>
</div>

<div class="section">
  <h2>Pre-interview information</h2>
  <p>Please fill out this form to help us prepare for our conversation. This information will help us ask better questions and make the most of our time together.</p>
</div>

<form action="https://formspree.io/f/xldnywyl" method="POST">
  <input type="hidden" name="_subject" value="107 Wins Guest Pre-Interview">
  
  <div class="form-field">
    <label for="name">Full name</label>
    <input type="text" id="name" name="name" required>
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
    <label for="topics">Key topics you'd like to discuss</label>
    <textarea id="topics" name="topics" required></textarea>
  </div>
  
  <div class="form-field">
    <label for="insights">Main insights or lessons you want to share</label>
    <textarea id="insights" name="insights" required></textarea>
  </div>
  
  <div class="form-field">
    <label for="questions">Questions you have for us</label>
    <textarea id="questions" name="questions"></textarea>
  </div>
  
  <div class="form-field">
    <label for="contact">Best way to reach you</label>
    <input type="text" id="contact" name="contact" placeholder="Email, phone, or preferred method">
  </div>
  
  <button type="submit">Submit pre-interview info</button>
</form>

{% include 107wins-footer.html %}
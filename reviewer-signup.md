---
layout: page
title: Reviewer signup
description: Sign up to review the preprint of "The evolution of software engineering."
permalink: /reviewer-signup/
robots: noindex, follow
---

<h1 class="post-title">Review the preprint</h1>

<p>We’re planning a published edition of <em><a href="{{ site.baseurl }}{% post_url 2026-02-20-evolution-software-engineering-fortran-llms %}">The evolution of software engineering</a></em> and would be grateful for your help. If you’d like to review the preprint, please fill out the form below.</p>

<form id="reviewer-signup-form" action="https://formspree.io/f/xldnywyl" method="POST">
  <input type="hidden" name="_subject" value="Preprint reviewer signup">
  
  <div class="form-field">
    <label for="reviewer-name">Name <span class="required">*</span></label>
    <input type="text" id="reviewer-name" name="name" required>
  </div>
  
  <div class="form-field">
    <label for="reviewer-email">Email <span class="required">*</span></label>
    <input type="email" id="reviewer-email" name="email" required>
  </div>
  
  <div class="form-field">
    <label for="reviewer-note">Areas where you can help (e.g. technical review, copyediting, specific topics)</label>
    <textarea id="reviewer-note" name="note" rows="4"></textarea>
  </div>
  
  <button type="submit" class="button">Sign up</button>
</form>

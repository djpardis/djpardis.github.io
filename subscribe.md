---
layout: page
title: Subscribe
description: Get notified about new posts and podcast episodes from Pardis Noorzad. Insights on data science, startups, and building in public.
keywords: newsletter, subscription, data science, startups, podcast, pardis noorzad
canonical_url: https://djpardis.com/subscribe
permalink: /subscribe/
---

## 📧 Never miss an update

Get notified about new posts and podcast episodes every couple of weeks. I share insights on data science, startups, and the journey of building [General Folders](https://generalfolders.com) and [The Data Room App](https://thedataroom.app).

### What you'll get:

- **🎯 Quality over quantity**: Updates every couple of weeks, not daily spam
- **📝 Behind-the-scenes insights**: The real stories behind building data science products
- **🎙️ Podcast episodes**: Deep dives into data science, entrepreneurship, and tech
- **💡 Lessons learned**: Practical insights from working at Twitter, Carbon Health, and building startups

<!-- MailerLite Form -->
<form class="newsletter-form" id="subscribe-page-form" action="https://assets.mailerlite.com/jsonp/1709436/forms/161652905296791207/subscribe" method="post" target="_blank" data-last-submit="0">
  <!-- Honeypot field (invisible to humans, catches bots) -->
  <div class="hp" style="position: absolute; left: -5000px;" aria-hidden="true">
    <input type="text" name="website" tabindex="-1" value="" autocomplete="nope">
  </div>
  
  <div class="form-group">
    <input 
      type="email" 
      name="fields[email]" 
      id="subscribe-page-email" 
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
  <div id="subscribe-page-message" class="newsletter-message"></div>
</form>

<!-- Success Message (hidden by default) -->
<div id="subscribe-page-success" class="newsletter-message success" style="display: none;">
  Thank you! You have successfully joined our subscriber list.
</div>

<div style="text-align: center; margin: 1rem 0;">
  <p style="color: #757575; font-size: 0.9rem;">No spam, ever. Unsubscribe anytime.</p>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribe-page-form');
    if (!form) return;
    
    // Initialize form state
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('subscribe-page-message');
    const successMessage = document.getElementById('subscribe-page-success');
    const emailInput = document.getElementById('subscribe-page-email');
    const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds between submissions
    
    // Validate email format
    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
    
    // Show error message
    function showError(message) {
      messageDiv.textContent = message;
      messageDiv.className = 'newsletter-message error';
      messageDiv.style.display = 'block';
      submitButton.disabled = false;
      submitButton.textContent = 'Subscribe';
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const email = formData.get('fields[email]');
      const now = Date.now();
      const lastSubmit = parseInt(form.dataset.lastSubmit || '0', 10);
      
      // Reset messages
      messageDiv.style.display = 'none';
      messageDiv.className = 'newsletter-message';
      
      // Validate honeypot (if filled, it's likely a bot)
      if (formData.get('website')) {
        console.log('Bot detected via honeypot');
        showError('Invalid submission detected.');
        return;
      }
      
      // Validate email
      if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
      }
      
      // Check rate limiting
      if (now - lastSubmit < MIN_SUBMIT_INTERVAL) {
        showError('Please wait before submitting again.');
        return;
      }
      
      // Update last submit time
      form.dataset.lastSubmit = now.toString();
      
      // Update UI
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Add honeypot check
      formData.set('hp-check', '1');
      
      // Submit to MailerLite
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Show success message
          form.style.display = 'none';
          if (successMessage) {
            successMessage.style.display = 'block';
          }
        } else {
          // Show error from server
          showError(data.message || 'Subscription failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Subscription error:', error);
        showError('An error occurred. Please try again later.');
      });
    });
    
    // Add input validation on blur
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
          this.setCustomValidity('Please enter a valid email address');
        } else {
          this.setCustomValidity('');
        }
      });
    }
  });
</script>
// Newsletter form functionality - handles all MailerLite forms
document.addEventListener('DOMContentLoaded', function() {
  // Handle multiple newsletter form IDs  
  const formIds = [
    'newsletter-footer-form',           // Footer newsletter widget
    'newsletter-subscribe-page-form',   // Dedicated subscribe page
    'newsletter-page-cta-form'          // Page-level call-to-action
  ];
  
  formIds.forEach(function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
  
    // Initialize form state  
    const submitButton = form.querySelector('button[type="submit"]');
    // Find message containers using descriptive naming pattern
    const baseId = formId.replace('-form', '');
    const messageDiv = document.getElementById(baseId + '-message') || form.querySelector('.newsletter-message');
    const successMessage = document.getElementById(baseId + '-success');
    const emailInput = form.querySelector('input[type="email"]');
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
  }); // End forEach
});
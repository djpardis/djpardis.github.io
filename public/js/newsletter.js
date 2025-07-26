/**
 * Newsletter signup functionality
 * This script handles the newsletter subscription form
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const messageDiv = document.getElementById('newsletter-message');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('.newsletter-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        // TODO: Replace this with actual Mailchimp integration
        // For now, simulate a successful subscription
        setTimeout(() => {
            showMessage('Thank you for subscribing! You\'ll receive an email confirmation shortly.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);

        // REAL IMPLEMENTATION: Send to Mailchimp
        // When you set up Mailchimp, replace the setTimeout above with:
        // submitToMailchimp(email, submitButton, originalText);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Function to integrate with Mailchimp (to be implemented)
    function submitToMailchimp(email, button, originalText) {
        // This will be implemented once Mailchimp is set up
        // fetch(mailchimpEndpoint, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     body: `email=${encodeURIComponent(email)}`
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         showMessage('Thank you for subscribing!', 'success');
        //         form.reset();
        //     } else {
        //         showMessage('Something went wrong. Please try again.', 'error');
        //     }
        // })
        // .catch(() => {
        //     showMessage('Something went wrong. Please try again.', 'error');
        // })
        // .finally(() => {
        //     button.textContent = originalText;
        //     button.disabled = false;
        // });
    }
}); 
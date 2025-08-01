/**
 * Newsletter signup functionality
 * This script provides basic email validation before standard form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const messageDiv = document.getElementById('newsletter-message');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            e.preventDefault(); // Only prevent submission for invalid emails
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state for valid submissions
        const submitButton = form.querySelector('.newsletter-button');
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        // Clear any previous messages
        hideMessage();
        
        // Form will submit normally to Buttondown
        // This actually works and subscribes people
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(text, type) {
        messageDiv.innerHTML = text;
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
    
    function hideMessage() {
        messageDiv.style.display = 'none';
    }
}); 
document.addEventListener('DOMContentLoaded', function() {
    // Get all links that are not internal page anchors
    var links = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    
    links.forEach(function(link) {
        // Skip if it's an internal link
        if (link.hostname === window.location.hostname) {
            return;
        }
        
        // Add target="_blank" and rel="noopener" for security
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
    });
}); 
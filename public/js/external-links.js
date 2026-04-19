document.addEventListener('DOMContentLoaded', function() {
    // Get all links that are not internal page anchors
    var links = document.querySelectorAll('a[href^="http"], a[href^="https"]');

    var siteHosts = {
        'djpardis.com': true,
        'www.djpardis.com': true,
        'djpardis.github.io': true
    };

    function isSiteHost(hostname) {
        return siteHosts.hasOwnProperty(hostname);
    }

    links.forEach(function(link) {
        // Skip if it's an internal link (same tab as current origin)
        if (link.hostname === window.location.hostname) {
            return;
        }

        // Same site, different hostname (for example GitHub Pages preview vs canonical domain)
        if (isSiteHost(link.hostname) && (isSiteHost(window.location.hostname) || window.location.hostname === 'localhost')) {
            return;
        }

        // Add target="_blank" and rel="noopener" for security
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
    });
}); 
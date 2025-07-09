// Simple image optimization script
document.addEventListener('DOMContentLoaded', function() {
  // Add loading="lazy" to all images that don't already have it
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
    
    // Only add decoding="async" if it doesn't interfere with critical images
    if (!img.closest('.masthead') && !img.classList.contains('critical')) {
      img.setAttribute('decoding', 'async');
    }
  });
});

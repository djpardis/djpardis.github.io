/**
 * Reference Back-links
 * 
 * This script automatically adds back-reference functionality to references in posts.
 * It finds all reference links at the bottom of posts and ensures they can navigate
 * back to where they were cited in the text.
 */
document.addEventListener('DOMContentLoaded', function() {
  // Process references in reverse order (longer IDs first) to avoid substring conflicts
  // e.g., process 'ref1b' before 'ref1' to prevent 'ref1' matching 'ref1b' citations
  const refLinks = Array.from(document.querySelectorAll('a[id^="ref"]'));
  refLinks.sort((a, b) => b.id.length - a.id.length);
  
  // Track which elements have already been assigned IDs to avoid conflicts
  const processedElements = new Set();
  
  refLinks.forEach(function(refLink) {
    const refId = refLink.getAttribute('id');
    const backLinkId = refId + '-back';
    
    // Find all links that point EXACTLY to this reference (using attribute selector)
    // This ensures we don't match 'ref1' in a link meant for 'ref1b'
    const linksToRef = Array.from(document.querySelectorAll('a'))
      .filter(link => link.getAttribute('href') === `#${refId}`);
    
    // If no links were found pointing to this reference, make sure the reference
    // doesn't have a broken back-link
    if (linksToRef.length === 0) {
      refLink.setAttribute('href', '#');
      return; // Skip to next reference
    }
    
    // For the first occurrence, update the main reference link
    const firstLink = linksToRef[0];
    if (!processedElements.has(firstLink)) {
      // Create an ID for the back-link directly on the link element itself
      firstLink.setAttribute('id', backLinkId);
      processedElements.add(firstLink);
      
      // Update the reference to point back to this location
      refLink.setAttribute('href', `#${backLinkId}`);
    }
    
    // For additional occurrences (if any), create additional back-links
    if (linksToRef.length > 1) {
      for (let i = 1; i < linksToRef.length; i++) {
        const additionalLink = linksToRef[i];
        if (!processedElements.has(additionalLink)) {
          const uniqueBackLinkId = `${backLinkId}-${i}`;
          
          // Add unique ID to this link
          additionalLink.setAttribute('id', uniqueBackLinkId);
          processedElements.add(additionalLink);
          
          // Create a new back-link next to the main reference
          const backLinkSpan = document.createElement('span');
          backLinkSpan.innerHTML = ` <a href="#${uniqueBackLinkId}" class="footnote-backref" aria-label="Back to reference ${i + 1}">${i + 1}</a>`;
          refLink.parentNode.insertBefore(backLinkSpan, refLink.nextSibling);
        }
      }
    }
  });
  
  // Add a small CSS rule to make back-references more visible if clicked
  const style = document.createElement('style');
  style.textContent = `
    :target {
      background-color: rgba(255, 255, 0, 0.2);
      scroll-margin-top: 2em;
    }
  `;
  document.head.appendChild(style);
});

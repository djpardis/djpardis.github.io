/**
 * Reference Navigation System for djpardis.github.io
 * 
 * CENTRALIZED REFERENCE MANAGEMENT
 * 
 * This script provides consistent bidirectional navigation for all references across the site.
 * It automatically handles multiple formats and ensures proper linking between citations and references.
 * 
 * STANDARD FORMAT (defined in REFERENCE_GUIDELINES.md):
 * - Citation: [<sup>1</sup>](#ref1)
 * - Reference: <a id="ref1" href="#ref1-back"><sup>1</sup></a> Content...
 * 
 * FEATURES:
 * - Bidirectional navigation (citation ↔ reference)
 * - Automatic ID assignment for backward compatibility
 * - Visual feedback with smooth scrolling
 * - Support for multiple legacy formats
 * - Sequential numbering validation
 * 
 * SUPPORTED FORMATS:
 * 1. Standard: [<sup>1</sup>](#ref1) → <a id="ref1" href="#ref1-back"><sup>1</sup></a>
 * 2. Legacy: [[1]](#references) (auto-converted)
 * 3. Complex: {:target="_blank"}<a id="ref7-back" href="#ref7"><sup>7</sup></a>
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize reference system
  initializeReferenceSystem();
});

function initializeReferenceSystem() {
  // First, process all references and set up proper bidirectional linking
  setupReferenceNavigation();
  
  // Add visual feedback for targeted elements
  addTargetHighlighting();
  
  // Validate reference integrity (development mode only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    validateReferenceIntegrity();
  }
}

function setupReferenceNavigation() {
  // Find all reference anchors (both formats)
  const referenceElements = Array.from(document.querySelectorAll('a[id^="ref"]'));
  
  // Process in reverse order by ID length to avoid substring conflicts
  referenceElements.sort((a, b) => b.id.length - a.id.length);
  
  const processedPairs = new Set();
  
  referenceElements.forEach(function(refElement) {
    const refId = refElement.getAttribute('id');
    
    // Skip if we've already processed this reference
    if (processedPairs.has(refId)) return;
    
    // Determine if this is a citation in text or a reference in the reference list
    const isInReferenceList = isReferenceListElement(refElement);
    
    if (isInReferenceList) {
      setupReferenceListElement(refElement, processedPairs);
    } else {
      setupCitationElement(refElement, processedPairs);
    }
  });
  
  // Handle simple format citations that don't have back-link IDs yet
  setupSimpleFormatCitations();
}

function isReferenceListElement(element) {
  // Reference list elements are typically at the bottom of posts
  // and contain full reference information (longer text content)
  const text = element.textContent || '';
  const hasSupTag = element.querySelector('sup');
  
  // If it has a sup tag and is short, it's likely a citation
  if (hasSupTag && text.length < 10) {
    return false;
  }
  
  // If it's in a paragraph with reference-like content, it's in the reference list
  const parentText = element.closest('p')?.textContent || '';
  return parentText.includes('http') || parentText.length > 50;
}

function setupReferenceListElement(refElement, processedPairs) {
  const refId = refElement.getAttribute('id');
  let backLinkId;
  
  // Check if this follows the complex format (ref1-back) or simple format (ref1)
  if (refId.endsWith('-back')) {
    // Complex format: ref1-back -> ref1
    const baseRefId = refId.replace('-back', '');
    backLinkId = baseRefId;
  } else {
    // Simple format: ref1 -> ref1-back
    backLinkId = refId + '-back';
  }
  
  // Find the corresponding citation
  const citationElement = document.getElementById(backLinkId) || 
                          document.querySelector(`a[href="#${refId}"]`);
  
  if (citationElement) {
    // Ensure the citation has the proper back-link ID
    if (!citationElement.id) {
      citationElement.setAttribute('id', backLinkId);
    }
    
    // Ensure the reference points back to the citation
    refElement.setAttribute('href', `#${backLinkId}`);
    
    processedPairs.add(refId);
    processedPairs.add(backLinkId);
  }
}

function setupCitationElement(refElement, processedPairs) {
  const refId = refElement.getAttribute('id');
  let targetRefId;
  
  // Determine the corresponding reference list element ID
  if (refId.endsWith('-back')) {
    // Complex format: ref1-back -> ref1
    targetRefId = refId.replace('-back', '');
  } else {
    // Simple format: ref1 -> ref1 (citation points to reference with same ID)
    const href = refElement.getAttribute('href');
    if (href && href.startsWith('#')) {
      targetRefId = href.substring(1);
    }
  }
  
  if (targetRefId) {
    const referenceElement = document.getElementById(targetRefId);
    if (referenceElement) {
      // Ensure proper linking
      refElement.setAttribute('href', `#${targetRefId}`);
      referenceElement.setAttribute('href', `#${refId}`);
      
      processedPairs.add(refId);
      processedPairs.add(targetRefId);
    }
  }
}

function setupSimpleFormatCitations() {
  // Find all links that point to references but don't have back-link IDs
  const citationLinks = Array.from(document.querySelectorAll('a[href^="#ref"]'));
  
  citationLinks.forEach(function(citationLink) {
    if (citationLink.id) return; // Already has an ID
    
    const href = citationLink.getAttribute('href');
    const refId = href.substring(1); // Remove the '#'
    const backLinkId = refId + '-back';
    
    // Check if there's a corresponding reference element
    const referenceElement = document.getElementById(refId);
    if (referenceElement) {
      // Set up the back-link ID on the citation
      citationLink.setAttribute('id', backLinkId);
      
      // Ensure the reference points back to this citation
      referenceElement.setAttribute('href', `#${backLinkId}`);
    }
  });
}

function addTargetHighlighting() {
  // Enhanced CSS for better target highlighting
  const style = document.createElement('style');
  style.textContent = `
    :target {
      background-color: rgba(255, 255, 0, 0.3);
      scroll-margin-top: 2em;
      padding: 2px 4px;
      border-radius: 3px;
      transition: background-color 0.3s ease;
    }
    
    /* Special highlighting for reference numbers */
    a[id^="ref"]:target sup {
      background-color: rgba(255, 255, 0, 0.5);
      border-radius: 2px;
    }
    
    /* Smooth scrolling for better UX */
    html {
      scroll-behavior: smooth;
    }
  `;
  document.head.appendChild(style);
}

function validateReferenceIntegrity() {
  console.log('🔍 Validating reference system...');
  
  const citations = Array.from(document.querySelectorAll('a[href^="#ref"]'));
  const references = Array.from(document.querySelectorAll('a[id^="ref"]'));
  
  const issues = [];
  
  // Check for orphaned citations (citations without corresponding references)
  citations.forEach(citation => {
    const href = citation.getAttribute('href');
    const refId = href.substring(1); // Remove #
    const correspondingRef = document.getElementById(refId);
    
    if (!correspondingRef) {
      issues.push(`❌ Orphaned citation: ${href} (no corresponding reference found)`);
    }
  });
  
  // Check for orphaned references (references without corresponding citations)
  references.forEach(reference => {
    const refId = reference.getAttribute('id');
    const backLinkId = refId.endsWith('-back') ? refId.replace('-back', '') : refId + '-back';
    const correspondingCitation = document.getElementById(backLinkId) || 
                                 document.querySelector(`a[href="#${refId}"]`);
    
    if (!correspondingCitation && !refId.endsWith('-back')) {
      issues.push(`❌ Orphaned reference: #${refId} (no corresponding citation found)`);
    }
  });
  
  // Check for sequential numbering
  const refNumbers = references
    .map(ref => {
      const match = ref.id.match(/ref(\d+)/);
      return match ? parseInt(match[1]) : null;
    })
    .filter(num => num !== null)
    .sort((a, b) => a - b);
  
  for (let i = 0; i < refNumbers.length; i++) {
    if (refNumbers[i] !== i + 1) {
      issues.push(`⚠️  Reference numbering gap: Expected ref${i + 1}, found ref${refNumbers[i]}`);
      break;
    }
  }
  
  // Report results
  if (issues.length === 0) {
    console.log('✅ Reference system validation passed!');
    console.log(`📊 Found ${citations.length} citations and ${references.length} references`);
  } else {
    console.warn('⚠️  Reference system validation issues:');
    issues.forEach(issue => console.warn(issue));
    console.log('📋 See REFERENCE_GUIDELINES.md for proper format');
  }
}

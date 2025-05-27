/**
 * Code Copy Functionality for djpardis.github.io
 * Created: May 27, 2025
 * Adds copy buttons to code blocks and handles the copy functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks with the 'highlight' class
  const codeBlocks = document.querySelectorAll('.highlight');
  
  // Add the syntax-highlight class to differentiate from text highlighting
  codeBlocks.forEach(function(block) {
    block.classList.add('syntax-highlight');
  });
  
  // Process each code block
  codeBlocks.forEach(function(codeBlock, index) {
    // Get the pre and code elements
    const pre = codeBlock.querySelector('pre');
    if (!pre) return;
    
    const code = pre.querySelector('code');
    if (!code) return;
    
    // Try to determine the language from the class
    let language = 'code';
    if (code.className) {
      const langMatch = code.className.match(/language-(\w+)/);
      if (langMatch && langMatch[1]) {
        language = langMatch[1];
      }
    }
    
    // Create the header element
    const header = document.createElement('div');
    header.className = 'highlight-header';
    
    // Add language label
    const langLabel = document.createElement('span');
    langLabel.className = 'language-label';
    langLabel.textContent = language;
    header.appendChild(langLabel);
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    
    // Add click event to copy button
    copyButton.addEventListener('click', function() {
      const textToCopy = code.textContent;
      
      // Use the Clipboard API if available
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
          .then(function() {
            showCopiedFeedback(copyButton);
          })
          .catch(function(err) {
            console.error('Failed to copy text: ', err);
            fallbackCopyTextToClipboard(textToCopy, copyButton);
          });
      } else {
        fallbackCopyTextToClipboard(textToCopy, copyButton);
      }
    });
    
    header.appendChild(copyButton);
    
    // Insert the header before the pre element
    codeBlock.insertBefore(header, pre);
  });
  
  // Fallback copy method for older browsers
  function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopiedFeedback(button);
      } else {
        console.error('Failed to copy text with execCommand');
      }
    } catch (err) {
      console.error('Error during execCommand copy', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  // Show feedback when code is copied
  function showCopiedFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    button.classList.add('copied');
    
    // Reset after 2 seconds
    setTimeout(function() {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  }
});

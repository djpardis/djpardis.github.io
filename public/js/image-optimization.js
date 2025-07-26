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

  // Add lightbox functionality to content images
  addImageLightbox();
  
  // Process markdown links in image captions
  processMarkdownLinksInCaptions();
});

function addImageLightbox() {
  // Select images throughout the site, excluding small icons and buttons
  const allImages = document.querySelectorAll('img');
  const clickableImages = [];
  
  // Process images in DOM order to maintain proper carousel sequence
  allImages.forEach(img => {
    // Skip small images (likely icons), images in navigation, and other UI elements
    const skipSelectors = [
      '.masthead', '.sidebar', '.nav', '.social-icons', '.podcast-social-icon',
      '.copy-button', '.pagination', '.highlight-header'
    ];
    
    if (skipSelectors.some(selector => img.closest(selector))) return;
    
    // Check if image should be clickable (either loaded or assume it's large enough)
    const shouldMakeClickable = () => {
      // If loaded, check dimensions
      if (img.complete && img.naturalWidth > 0) {
        return img.naturalWidth >= 150 && img.naturalHeight >= 150;
      }
      // If not loaded yet, assume it's clickable (will be filtered out if too small on load)
      return true;
    };
    
    if (shouldMakeClickable()) {
      // Add to clickable images array in DOM order
      clickableImages.push(img);
      
      // Make image clickable
      img.style.cursor = 'pointer';
      img.setAttribute('title', 'Click to enlarge');
      
      img.addEventListener('click', function() {
        const imageIndex = clickableImages.indexOf(this);
        showLightbox(this, imageIndex, clickableImages);
      });
    }
  });
  
  // Store clickable images globally for carousel functionality
  window.clickableImages = clickableImages;
}



function showLightbox(img, currentIndex = 0, imagesArray = []) {
  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `;
  
  // Create container for image and navigation
  const container = document.createElement('div');
  container.style.cssText = `
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Create enlarged image
  const enlargedImg = document.createElement('img');
  enlargedImg.src = img.src;
  enlargedImg.alt = img.alt;
  enlargedImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    user-select: none;
  `;
  
  // Prevent image click from closing lightbox
  enlargedImg.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  container.appendChild(enlargedImg);
  
  // Create counter variable for navigation (even if no multiple images)
  let counter = null;
  
  // Add navigation buttons if there are multiple images
  if (imagesArray.length > 1) {
    // Image counter
    counter = document.createElement('div');
    
    // Previous button
    const prevBtn = createNavButton('‹', 'left', () => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : imagesArray.length - 1;
      updateLightboxImage(imagesArray[newIndex], newIndex, imagesArray, enlargedImg, counter);
      currentIndex = newIndex;
    });
    
    // Next button
    const nextBtn = createNavButton('›', 'right', () => {
      const newIndex = currentIndex < imagesArray.length - 1 ? currentIndex + 1 : 0;
      updateLightboxImage(imagesArray[newIndex], newIndex, imagesArray, enlargedImg, counter);
      currentIndex = newIndex;
    });
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    
    // Configure counter styling
    counter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
    counter.style.cssText = `
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 4px 8px;
      border-radius: 4px;
    `;
    container.appendChild(counter);
  }
  
  // Add close functionality
  lightbox.addEventListener('click', function() {
    closeLightbox();
  });
  
  // Add keyboard navigation
  function handleKeyPress(e) {
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        if (imagesArray.length > 1) {
          const newIndex = currentIndex > 0 ? currentIndex - 1 : imagesArray.length - 1;
          updateLightboxImage(imagesArray[newIndex], newIndex, imagesArray, enlargedImg, counter);
          currentIndex = newIndex;
        }
        break;
      case 'ArrowRight':
        if (imagesArray.length > 1) {
          const newIndex = currentIndex < imagesArray.length - 1 ? currentIndex + 1 : 0;
          updateLightboxImage(imagesArray[newIndex], newIndex, imagesArray, enlargedImg, counter);
          currentIndex = newIndex;
        }
        break;
    }
  }
  
  function closeLightbox() {
    const existingLightbox = document.querySelector('.lightbox-overlay');
    if (existingLightbox) {
      document.body.removeChild(existingLightbox);
    }
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyPress);
  }
  
  document.addEventListener('keydown', handleKeyPress);
  
  // Remove any existing lightbox before adding new one
  const existingLightbox = document.querySelector('.lightbox-overlay');
  if (existingLightbox) {
    document.body.removeChild(existingLightbox);
  }
  
  lightbox.appendChild(container);
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
}

function createNavButton(text, side, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  
  // Check if mobile for positioning
  const isMobile = window.innerWidth <= 768;
  const sidePosition = isMobile ? '10px' : '-60px';
  
  button.style.cssText = `
    position: absolute;
    top: 50%;
    ${side}: ${sidePosition};
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: ${isMobile ? '44px' : '50px'};
    height: ${isMobile ? '44px' : '50px'};
    font-size: ${isMobile ? '20px' : '24px'};
    font-weight: bold;
    cursor: pointer;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    user-select: none;
    z-index: 10001;
  `;
  
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'white';
    button.style.transform = `translateY(-50%) scale(${isMobile ? '1.05' : '1.1'})`;
  });
  
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    button.style.transform = 'translateY(-50%) scale(1)';
  });
  
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    clickHandler();
  });
  
  return button;
}

function processMarkdownLinksInCaptions() {
  // Find all elements with image-caption class
  const captions = document.querySelectorAll('.image-caption');
  
  captions.forEach(caption => {
    // Process markdown-style links [text](url)
    let html = caption.innerHTML;
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    caption.innerHTML = html;
  });
}

function updateLightboxImage(img, newIndex, imagesArray, enlargedImg, counter) {
  // Update the image source and alt text
  enlargedImg.src = img.src;
  enlargedImg.alt = img.alt;
  
  // Update the counter if it exists
  if (counter && imagesArray.length > 1) {
    counter.textContent = `${newIndex + 1} / ${imagesArray.length}`;
  }
}

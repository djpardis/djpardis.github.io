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
  
  allImages.forEach(img => {
    // Skip small images (likely icons), images in navigation, and other UI elements
    const skipSelectors = [
      '.masthead', '.sidebar', '.nav', '.social-icons', '.podcast-social-icon',
      '.copy-button', '.pagination', '.highlight-header'
    ];
    
    if (skipSelectors.some(selector => img.closest(selector))) return;
    
    // Wait for image to load to check dimensions
    if (img.complete) {
      checkAndMakeClickable(img, clickableImages);
    } else {
      img.addEventListener('load', () => checkAndMakeClickable(img, clickableImages));
    }
  });
  
  // Store clickable images globally for carousel functionality
  window.clickableImages = clickableImages;
}

function checkAndMakeClickable(img, clickableImages) {
  // Skip very small images (likely icons)
  if (img.naturalWidth < 150 || img.naturalHeight < 150) return;
  
  // Make image clickable
  img.style.cursor = 'pointer';
  img.setAttribute('title', 'Click to enlarge');
  
  // Add to clickable images array
  clickableImages.push(img);
  
  img.addEventListener('click', function() {
    const imageIndex = clickableImages.indexOf(this);
    showLightbox(this, imageIndex, clickableImages);
  });
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
    max-width: 80%;
    max-height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Create enlarged image
  const enlargedImg = document.createElement('img');
  enlargedImg.src = img.src;
  enlargedImg.alt = img.alt;
  enlargedImg.style.cssText = `
    max-width: 100%;
    max-height: 100%;
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
  
  // Add navigation buttons if there are multiple images
  if (imagesArray.length > 1) {
    // Previous button
    const prevBtn = createNavButton('‹', 'left', () => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : imagesArray.length - 1;
      showLightbox(imagesArray[newIndex], newIndex, imagesArray);
    });
    
    // Next button
    const nextBtn = createNavButton('›', 'right', () => {
      const newIndex = currentIndex < imagesArray.length - 1 ? currentIndex + 1 : 0;
      showLightbox(imagesArray[newIndex], newIndex, imagesArray);
    });
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    
    // Image counter
    const counter = document.createElement('div');
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
          showLightbox(imagesArray[newIndex], newIndex, imagesArray);
        }
        break;
      case 'ArrowRight':
        if (imagesArray.length > 1) {
          const newIndex = currentIndex < imagesArray.length - 1 ? currentIndex + 1 : 0;
          showLightbox(imagesArray[newIndex], newIndex, imagesArray);
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
  button.style.cssText = `
    position: absolute;
    top: 50%;
    ${side}: -60px;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    user-select: none;
  `;
  
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'white';
    button.style.transform = 'translateY(-50%) scale(1.1)';
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

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
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image preview');
  
  // Create container for image and navigation
  const container = document.createElement('div');
  container.className = 'lightbox-container';
  
  // Create enlarged image
  const enlargedImg = document.createElement('img');
  enlargedImg.className = 'lightbox-image';
  enlargedImg.src = img.src;
  enlargedImg.alt = img.alt;
  
  // Prevent image click from closing lightbox
  enlargedImg.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  container.appendChild(enlargedImg);

  const closeBtn = document.createElement('button');
  closeBtn.className =
    'carousel-control lightbox-control lightbox-control--close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close image preview');
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });
  container.appendChild(closeBtn);
  
  // Create counter variable for navigation (even if no multiple images)
  let counter = null;

  function moveImage(offset) {
    currentIndex =
      (currentIndex + offset + imagesArray.length) % imagesArray.length;
    updateLightboxImage(
      imagesArray[currentIndex],
      currentIndex,
      imagesArray,
      enlargedImg,
      counter
    );
  }
  
  // Add navigation buttons if there are multiple images
  if (imagesArray.length > 1) {
    // Image counter
    counter = document.createElement('div');
    
    // Previous button
    const prevBtn = createNavButton('‹', 'left', () => moveImage(-1));
    
    // Next button
    const nextBtn = createNavButton('›', 'right', () => moveImage(1));
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    
    // Configure counter styling
    counter.className = 'lightbox-counter';
    counter.setAttribute('aria-live', 'polite');
    counter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
    container.appendChild(counter);

    let touchStartX = null;
    container.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });
    container.addEventListener('touchend', function(e) {
      if (touchStartX === null || e.changedTouches.length !== 1) return;
      const distance = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 50) return;
      moveImage(distance > 0 ? -1 : 1);
    }, { passive: true });
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
          moveImage(-1);
        }
        break;
      case 'ArrowRight':
        if (imagesArray.length > 1) {
          moveImage(1);
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
  closeBtn.focus();
}

function createNavButton(text, side, clickHandler) {
  const button = document.createElement('button');
  const direction = side === 'left' ? 'previous' : 'next';
  button.className =
    `carousel-control lightbox-control lightbox-control--${direction}`;
  button.type = 'button';
  button.setAttribute(
    'aria-label',
    direction === 'previous' ? 'Previous image' : 'Next image'
  );
  button.textContent = text;
  
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
  enlargedImg.src = img.src;
  enlargedImg.alt = img.alt;
  if (counter && imagesArray.length > 1) {
    counter.textContent = `${newIndex + 1} / ${imagesArray.length}`;
  }
}

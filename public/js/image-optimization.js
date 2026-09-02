document.addEventListener('DOMContentLoaded', function () {
  var images = document.querySelectorAll('img:not([loading])');
  images.forEach(function (img) {
    img.setAttribute('loading', 'lazy');
    if (!img.closest('.masthead') && !img.classList.contains('critical')) {
      img.setAttribute('decoding', 'async');
    }
  });

  setTimeout(function () {
    addUnifiedGallery();
    processMarkdownLinksInCaptions();
  }, 0);
});

function shouldIncludeImage(img) {
  if (img.src && img.src.toLowerCase().endsWith('.svg')) return true;
  if (img.complete && img.naturalWidth > 0) {
    return img.naturalWidth >= 150 && img.naturalHeight >= 150;
  }
  return true;
}

function addUnifiedGallery() {
  var items = [];
  var skipSelectors = [
    '.masthead', '.sidebar', '.nav', '.social-icons', '.podcast-social-icon',
    '.copy-button', '.pagination', '.highlight-header'
  ];

  document.querySelectorAll('img').forEach(function (img) {
    if (skipSelectors.some(function (s) { return img.closest(s); })) return;
    if (shouldIncludeImage(img)) {
      items.push({ type: 'image', el: img });
    }
  });

  document.querySelectorAll('.post table:not([data-no-expand])').forEach(function (table) {
    items.push({ type: 'table', el: table });
  });

  items.sort(function (a, b) {
    var pos = a.el.compareDocumentPosition(b.el);
    return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  items.forEach(function (item, idx) {
    if (item.type === 'image') {
      item.el.style.cursor = 'pointer';
      item.el.setAttribute('title', 'Click to enlarge');
      item.el.addEventListener('click', function () {
        openGallery(idx, items);
      });
    }
    if (item.type === 'table') {
      var btn = item.el.querySelector('.table-expand-button');
      if (btn) {
        var fresh = btn.cloneNode(true);
        btn.parentNode.replaceChild(fresh, btn);
        fresh.addEventListener('click', function (e) {
          e.stopPropagation();
          openGallery(idx, items);
        });
      }
    }
  });

  window.galleryItems = items;
}

function createGalleryContent(item) {
  if (item.type === 'image') {
    var img = document.createElement('img');
    img.className = 'lightbox-image';
    img.src = item.el.src;
    img.alt = item.el.alt;
    img.addEventListener('click', function (e) { e.stopPropagation(); });
    return img;
  }
  var wrapper = document.createElement('div');
  wrapper.className = 'post lightbox-table-wrapper';
  var clone = item.el.cloneNode(true);
  var expandBtn = clone.querySelector('.table-expand-button');
  if (expandBtn) expandBtn.remove();
  wrapper.appendChild(clone);
  if (clone.classList.contains('sortable') && window.wireSortableTable) {
    window.wireSortableTable(clone);
  }
  wrapper.addEventListener('click', function (e) { e.stopPropagation(); });
  return wrapper;
}

function openGallery(startIndex, items) {
  var currentIndex = startIndex;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Gallery');

  var container = document.createElement('div');
  container.className = 'lightbox-container';

  var content = createGalleryContent(items[currentIndex]);
  container.appendChild(content);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-control lightbox-control--close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '\u00d7';
  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    close();
  });
  container.appendChild(closeBtn);

  var counter = null;

  function navigate(offset) {
    currentIndex =
      (currentIndex + offset + items.length) % items.length;
    var old = container.querySelector('.lightbox-image, .lightbox-table-wrapper');
    if (old) old.remove();
    container.insertBefore(
      createGalleryContent(items[currentIndex]),
      container.firstChild
    );
    if (counter) {
      counter.textContent = (currentIndex + 1) + ' / ' + items.length;
    }
  }

  if (items.length > 1) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-control lightbox-control--previous';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.textContent = '\u2039';
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      navigate(-1);
    });

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-control lightbox-control--next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.textContent = '\u203a';
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      navigate(1);
    });

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);

    counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    counter.setAttribute('aria-live', 'polite');
    counter.textContent = (currentIndex + 1) + ' / ' + items.length;
    container.appendChild(counter);

    var touchStartX = null;
    container.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', function (e) {
      if (touchStartX === null || e.changedTouches.length !== 1) return;
      var dist = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(dist) < 50) return;
      navigate(dist > 0 ? -1 : 1);
    }, { passive: true });
  }

  overlay.addEventListener('click', close);

  function onKey(e) {
    switch (e.key) {
      case 'Escape': close(); break;
      case 'ArrowLeft': if (items.length > 1) navigate(-1); break;
      case 'ArrowRight': if (items.length > 1) navigate(1); break;
    }
  }
  document.addEventListener('keydown', onKey);

  function close() {
    var el = document.querySelector('.lightbox-overlay');
    if (el) document.body.removeChild(el);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }

  var existing = document.querySelector('.lightbox-overlay');
  if (existing) document.body.removeChild(existing);

  overlay.appendChild(container);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function processMarkdownLinksInCaptions() {
  document.querySelectorAll('.image-caption').forEach(function (caption) {
    var html = caption.innerHTML;
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    caption.innerHTML = html;
  });
}

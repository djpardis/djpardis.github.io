/**
 * TOC collapse: clicking the era name toggles expand/collapse instead of navigating.
 * Navigate via the sub-items.
 *
 * Only apply this behavior on devices with a fine pointer (desktops, laptops).
 * On touch devices, rely on the browser's native <details>/<summary> behavior
 * so that the TOC works consistently on mobile.
 */
(function () {
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  document.querySelectorAll('.toc-era details summary a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var details = link.closest('details');
      if (details) {
        details.open = !details.open;
      }
    }, true);
  });
})();

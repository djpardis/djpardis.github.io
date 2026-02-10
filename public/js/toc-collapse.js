/**
 * TOC collapse: clicking the era name toggles expand/collapse instead of navigating.
 * Navigate via the sub-items.
 */
(function () {
  document.querySelectorAll('.toc-era details summary a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var details = link.closest('details');
      details.open = !details.open;
    }, true);
  });
})();

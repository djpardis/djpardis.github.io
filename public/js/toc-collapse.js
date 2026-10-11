(function () {
  var postEl = document.querySelector('.post');
  if (!postEl || !window.TocModel) return;

  window.TocModel.getEntries(postEl);

  document.querySelectorAll('.toc-era details').forEach(function (details) {
    details.open = false;
  });

  document.querySelectorAll('.toc-era details summary a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var details = link.closest('details');
      if (details) {
        details.open = !details.open;
      }
    }, true);
  });
})();

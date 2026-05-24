(function () {
  var postEl = document.querySelector('.post');
  if (!postEl) return;

  var inlineTocUl = document.querySelector('.toc-container > ul');
  if (!inlineTocUl) return;

  // Build nav
  var nav = document.createElement('nav');
  nav.id = 'sticky-toc';
  nav.setAttribute('aria-label', 'Table of contents');

  var titleEl = document.createElement('div');
  titleEl.className = 'sticky-toc-title';
  titleEl.textContent = 'Table of contents';
  nav.appendChild(titleEl);

  // allLinks: [{el, href, parentLi}]
  // parentLi is the top-level <li> that owns a .sticky-toc-sub (so we can expand it)
  var allLinks = [];

  function makeLink(href, text) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    return a;
  }

  var ul = document.createElement('ul');

  Array.from(inlineTocUl.children).forEach(function (sourceLi) {
    var li = document.createElement('li');

    if (sourceLi.classList.contains('toc-era')) {
      // Era group: <details><summary><a>label</a></summary><ul>...</ul></details>
      var summaryA = sourceLi.querySelector('summary a');
      var sourceSubUl = sourceLi.querySelector('ul');
      if (!summaryA) return;

      // Era label links to the first sub-item target
      var firstSubA = sourceSubUl ? sourceSubUl.querySelector('a') : null;
      var labelHref = firstSubA ? firstSubA.getAttribute('href') : summaryA.getAttribute('href');
      var labelA = makeLink(labelHref, summaryA.textContent.trim());
      labelA.className = 'stoc-era-label';
      li.appendChild(labelA);

      if (sourceSubUl && sourceSubUl.children.length > 0) {
        var subUl = document.createElement('ul');
        subUl.className = 'sticky-toc-sub';
        Array.from(sourceSubUl.children).forEach(function (subSourceLi) {
          var subA = subSourceLi.querySelector('a');
          if (!subA) return;
          var subLi = document.createElement('li');
          var a = makeLink(subA.getAttribute('href'), subA.textContent.trim());
          subLi.appendChild(a);
          subUl.appendChild(subLi);
          allLinks.push({ el: a, href: a.getAttribute('href'), parentLi: li });
        });
        li.appendChild(subUl);
        // Also let the era label open its group
        allLinks.push({ el: labelA, href: labelHref, parentLi: li, isGroupLabel: true });
      }

    } else {
      // Regular item — may have nested <ul> (e.g. Moneyball h3s)
      var sourceA = sourceLi.querySelector('a');
      if (!sourceA) return;
      var a = makeLink(sourceA.getAttribute('href'), sourceA.textContent.trim());
      li.appendChild(a);

      var sourceSubUl = sourceLi.querySelector('ul');
      if (sourceSubUl && sourceSubUl.children.length > 0) {
        var subUl = document.createElement('ul');
        subUl.className = 'sticky-toc-sub';
        Array.from(sourceSubUl.children).forEach(function (subSourceLi) {
          var subA = subSourceLi.querySelector('a');
          if (!subA) return;
          var subLi = document.createElement('li');
          var subANew = makeLink(subA.getAttribute('href'), subA.textContent.trim());
          subLi.appendChild(subANew);
          subUl.appendChild(subLi);
          allLinks.push({ el: subANew, href: subANew.getAttribute('href'), parentLi: li });
        });
        li.appendChild(subUl);
        allLinks.push({ el: a, href: a.getAttribute('href'), parentLi: li, isGroupLabel: true });
      } else {
        allLinks.push({ el: a, href: a.getAttribute('href'), parentLi: null });
      }
    }

    ul.appendChild(li);
  });

  nav.appendChild(ul);
  document.body.appendChild(nav);

  // Position: start at post top, slide up as user scrolls
  var contentEl = document.querySelector('.container.content');
  var postTopOffset = contentEl ? contentEl.getBoundingClientRect().top + window.scrollY : 80;
  var minTop = 24;
  function positionToc() {
    nav.style.top = Math.max(minTop, postTopOffset - window.scrollY) + 'px';
  }
  window.addEventListener('scroll', positionToc, { passive: true });
  positionToc();

  // Build id → element map for all tracked hrefs
  var idToEl = {};
  allLinks.forEach(function (entry) {
    var id = entry.href.replace(/^#/, '');
    if (!idToEl[id]) {
      idToEl[id] = document.getElementById(id);
    }
  });

  // Ordered list of tracked headings for scrollspy (in DOM order)
  var orderedLinks = allLinks.slice().sort(function (a, b) {
    var elA = idToEl[a.href.replace(/^#/, '')];
    var elB = idToEl[b.href.replace(/^#/, '')];
    if (!elA || !elB) return 0;
    return elA.compareDocumentPosition(elB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  var lastActiveLi = null;

  function updateActive() {
    var offset = 90;
    var active = null;
    for (var i = 0; i < orderedLinks.length; i++) {
      var entry = orderedLinks[i];
      var el = idToEl[entry.href.replace(/^#/, '')];
      if (el && el.getBoundingClientRect().top <= offset) {
        active = entry;
      }
    }

    // Clear all active states
    allLinks.forEach(function (e) { e.el.classList.remove('active'); });

    if (!active) return;

    // Highlight the active link (skip era/group labels — highlight their sub-item instead)
    if (!active.isGroupLabel) {
      active.el.classList.add('active');
    }

    // Expand the right sub-ul, collapse others
    var activeLi = active.parentLi;
    if (activeLi !== lastActiveLi) {
      lastActiveLi = activeLi;
      nav.querySelectorAll('.sticky-toc-sub').forEach(function (sub) {
        sub.classList.toggle('open', sub.parentElement === activeLi);
      });
    }

    // Keep active link visible in the scrollable TOC
    var activeEl = active.el;
    var linkTop = activeEl.offsetTop;
    var navHeight = nav.clientHeight;
    if (linkTop < nav.scrollTop + 32 || linkTop > nav.scrollTop + navHeight - 48) {
      nav.scrollTop = linkTop - navHeight / 2;
    }
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

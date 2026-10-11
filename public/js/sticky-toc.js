(function () {
  var postEl = document.querySelector('.post');
  if (!postEl || !window.TocModel) return;

  var entries = window.TocModel.getEntries(postEl);
  if (entries.length < 2) return;

  // ── Build sticky TOC nav ─────────────────────────────────────────────────
  var nav = document.createElement('nav');
  nav.id = 'sticky-toc';
  nav.setAttribute('aria-label', 'Table of contents');

  var titleEl = document.createElement('a');
  titleEl.className = 'sticky-toc-title';
  titleEl.href = '#top';
  titleEl.textContent = 'Table of contents';
  titleEl.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
  nav.appendChild(titleEl);
  nav.addEventListener('click', function (e) {
    if (!e.target.closest('.sticky-toc-title')) return;
    e.preventDefault();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  // allLinks: [{el, href, parentLi}]
  var allLinks = [];

  function makeLink(href, text) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    return a;
  }

  function appendStickyEntry(list, entry, ancestors) {
    var li = document.createElement('li');
    var a = makeLink(entry.href, entry.label);
    li.appendChild(a);
    var nextAncestors = ancestors.concat(li);

    if (entry.children.length) {
      li.className = 'sticky-toc-section';
      var subUl = document.createElement('ul');
      subUl.className = 'sticky-toc-sub';
      entry.children.forEach(function (child) {
        appendStickyEntry(subUl, child, nextAncestors);
      });
      li.appendChild(subUl);
      a.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        subUl.classList.toggle('open');
      });

      if (entry.labelIsHeading) {
        allLinks.push({ el: a, href: entry.href, ancestors: nextAncestors });
      }
    } else {
      allLinks.push({ el: a, href: entry.href, ancestors: nextAncestors });
    }

    list.appendChild(li);
  }

  var ul = document.createElement('ul');
  entries.forEach(function (entry) {
    appendStickyEntry(ul, entry, []);
  });
  nav.appendChild(ul);
  document.body.appendChild(nav);

  // ── Position: start at post top, slide up as user scrolls ───────────────
  var contentEl = document.querySelector('.container.content');
  var postTopOffset = contentEl ? contentEl.getBoundingClientRect().top + window.scrollY : 80;
  function positionToc() {
    nav.style.top = Math.max(24, postTopOffset - window.scrollY) + 'px';
  }
  window.addEventListener('scroll', positionToc, { passive: true });
  positionToc();

  // ── Scrollspy ────────────────────────────────────────────────────────────
  var idToEl = {};
  allLinks.forEach(function (entry) {
    var id = entry.href.replace(/^#/, '');
    if (!idToEl[id]) idToEl[id] = document.getElementById(id);
  });

  // Sort links in DOM order, deduplicated by id (keep first occurrence)
  var seen = {};
  var orderedLinks = allLinks.slice().sort(function (a, b) {
    var elA = idToEl[a.href.replace(/^#/, '')];
    var elB = idToEl[b.href.replace(/^#/, '')];
    if (!elA || !elB) return 0;
    return elA.compareDocumentPosition(elB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  }).filter(function (entry) {
    var id = entry.href.replace(/^#/, '');
    if (seen[id]) return false;
    seen[id] = true;
    return true;
  });

  function updateActive() {
    var active = null;
    for (var i = 0; i < orderedLinks.length; i++) {
      var entry = orderedLinks[i];
      var el = idToEl[entry.href.replace(/^#/, '')];
      if (el && el.getBoundingClientRect().top <= 90) active = entry;
    }

    allLinks.forEach(function (e) { e.el.classList.remove('active'); });
    if (!active) return;

    active.el.classList.add('active');

    var linkTop = active.el.offsetTop;
    var navHeight = nav.clientHeight;
    if (linkTop < nav.scrollTop + 32 || linkTop > nav.scrollTop + navHeight - 48) {
      nav.scrollTop = linkTop - navHeight / 2;
    }
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

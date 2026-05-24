(function () {
  var postEl = document.querySelector('.post');
  if (!postEl) return;

  var inlineTocUl = document.querySelector('.toc-container > ul');

  // ── Build TOC entries from inline TOC or from headings ──────────────────
  // Entry shape: { label, href, children: [{label, href}], isGroup }

  var entries = [];

  if (inlineTocUl) {
    // Mirror the hand-authored inline TOC structure
    Array.from(inlineTocUl.children).forEach(function (sourceLi) {
      if (sourceLi.classList.contains('toc-era')) {
        var summaryA = sourceLi.querySelector('summary a');
        var sourceSubUl = sourceLi.querySelector('ul');
        if (!summaryA) return;
        var children = [];
        if (sourceSubUl) {
          Array.from(sourceSubUl.children).forEach(function (subLi) {
            var a = subLi.querySelector('a');
            if (a) children.push({ label: a.textContent.trim(), href: a.getAttribute('href') });
          });
        }
        var firstHref = children.length ? children[0].href : summaryA.getAttribute('href');
        entries.push({ label: summaryA.textContent.trim(), href: firstHref, children: children, isGroup: true });
      } else {
        var sourceA = sourceLi.querySelector('a');
        if (!sourceA) return;
        var children = [];
        var nestedUl = sourceLi.querySelector('ul');
        if (nestedUl) {
          Array.from(nestedUl.children).forEach(function (subLi) {
            var a = subLi.querySelector('a');
            if (a) children.push({ label: a.textContent.trim(), href: a.getAttribute('href') });
          });
        }
        entries.push({ label: sourceA.textContent.trim(), href: sourceA.getAttribute('href'), children: children, isGroup: false });
      }
    });
  } else {
    // Fallback: scan h2[id] headings (and nested h3s) from the post
    var allH = Array.from(postEl.querySelectorAll('h2[id], h3[id]')).filter(function (h) {
      return !h.classList.contains('post-subtitle');
    });
    var h2s = allH.filter(function (h) { return h.tagName === 'H2'; });
    if (h2s.length < 2) return;

    h2s.forEach(function (h2, i) {
      var nextH2 = h2s[i + 1];
      var h3s = allH.filter(function (h) {
        if (h.tagName !== 'H3') return false;
        if (!(h2.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING)) return false;
        if (nextH2 && !(nextH2.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING)) return false;
        return true;
      });
      entries.push({
        label: h2.textContent.trim(),
        href: '#' + h2.id,
        children: h3s.map(function (h3) { return { label: h3.textContent.trim(), href: '#' + h3.id }; }),
        isGroup: false
      });
    });

    // Inject inline TOC for mobile (hidden on desktop via CSS)
    injectInlineToc(entries);
  }

  if (entries.length < 2) return;

  // ── Inject inline TOC for posts that don't have one ─────────────────────
  function injectInlineToc(entries) {
    var wrap = document.createElement('div');
    wrap.className = 'toc-container post-container';

    var h2 = document.createElement('h2');
    h2.id = 'table-of-contents';
    h2.textContent = 'Table of contents';
    wrap.appendChild(h2);

    var ul = document.createElement('ul');
    entries.forEach(function (entry) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = entry.href;
      a.textContent = entry.label;
      li.appendChild(a);
      if (entry.children.length) {
        var subUl = document.createElement('ul');
        entry.children.forEach(function (child) {
          var subLi = document.createElement('li');
          var subA = document.createElement('a');
          subA.href = child.href;
          subA.textContent = child.label;
          subLi.appendChild(subA);
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }
      ul.appendChild(li);
    });
    wrap.appendChild(ul);

    // Insert before the first h2 in the post
    var firstH2 = postEl.querySelector('h2');
    if (firstH2) {
      postEl.insertBefore(wrap, firstH2);
    } else {
      postEl.prepend(wrap);
    }
  }

  // ── Build sticky TOC nav ─────────────────────────────────────────────────
  var nav = document.createElement('nav');
  nav.id = 'sticky-toc';
  nav.setAttribute('aria-label', 'Table of contents');

  var titleEl = document.createElement('div');
  titleEl.className = 'sticky-toc-title';
  titleEl.textContent = 'Table of contents';
  nav.appendChild(titleEl);

  // allLinks: [{el, href, parentLi, isGroupLabel}]
  var allLinks = [];

  function makeLink(href, text) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    return a;
  }

  var ul = document.createElement('ul');
  entries.forEach(function (entry) {
    var li = document.createElement('li');
    var a = makeLink(entry.href, entry.label);
    if (entry.isGroup) a.className = 'stoc-era-label';
    li.appendChild(a);

    if (entry.children.length) {
      var subUl = document.createElement('ul');
      subUl.className = 'sticky-toc-sub';
      entry.children.forEach(function (child) {
        var subLi = document.createElement('li');
        var subA = makeLink(child.href, child.label);
        subLi.appendChild(subA);
        subUl.appendChild(subLi);
        allLinks.push({ el: subA, href: child.href, parentLi: li });
      });
      li.appendChild(subUl);
      allLinks.push({ el: a, href: entry.href, parentLi: li, isGroupLabel: true });
    } else {
      allLinks.push({ el: a, href: entry.href, parentLi: null });
    }

    ul.appendChild(li);
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

  var orderedLinks = allLinks.slice().sort(function (a, b) {
    var elA = idToEl[a.href.replace(/^#/, '')];
    var elB = idToEl[b.href.replace(/^#/, '')];
    if (!elA || !elB) return 0;
    return elA.compareDocumentPosition(elB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  var lastActiveLi = null;

  function updateActive() {
    var active = null;
    for (var i = 0; i < orderedLinks.length; i++) {
      var entry = orderedLinks[i];
      var el = idToEl[entry.href.replace(/^#/, '')];
      if (el && el.getBoundingClientRect().top <= 90) active = entry;
    }

    allLinks.forEach(function (e) { e.el.classList.remove('active'); });
    if (!active) return;

    if (!active.isGroupLabel) active.el.classList.add('active');

    var activeLi = active.parentLi;
    if (activeLi !== lastActiveLi) {
      lastActiveLi = activeLi;
      nav.querySelectorAll('.sticky-toc-sub').forEach(function (sub) {
        sub.classList.toggle('open', sub.parentElement === activeLi);
      });
    }

    var linkTop = active.el.offsetTop;
    var navHeight = nav.clientHeight;
    if (linkTop < nav.scrollTop + 32 || linkTop > nav.scrollTop + navHeight - 48) {
      nav.scrollTop = linkTop - navHeight / 2;
    }
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

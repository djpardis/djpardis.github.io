(function () {
  var cachedEntries = null;

  function readList(list) {
    return Array.from(list.children).map(readItem).filter(Boolean);
  }

  function readItem(li) {
    var details = li.querySelector(':scope > details');
    var link = details
      ? details.querySelector(':scope > summary a')
      : li.querySelector(':scope > a');
    var childList = details
      ? details.querySelector(':scope > ul')
      : li.querySelector(':scope > ul');
    if (!link) return null;

    var href = link.getAttribute('href') || '';
    var children = childList ? readList(childList) : [];
    var target = href.charAt(0) === '#'
      ? document.getElementById(href.replace(/^#/, ''))
      : null;

    return {
      label: link.textContent.trim(),
      href: target ? href : (children.length ? children[0].href : href),
      labelIsHeading: !!target,
      children: children
    };
  }

  function entriesFromContainer(container) {
    return Array.from(container.querySelectorAll(':scope > ul')).reduce(function (entries, list) {
      return entries.concat(readList(list));
    }, []);
  }

  function entriesFromHeadings(postEl) {
    var headings = Array.from(postEl.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]')).filter(function (h) {
      return h.id !== 'table-of-contents' && !h.classList.contains('post-subtitle');
    });
    if (headings.length < 2) return [];

    var root = [];
    var stack = [{ level: 1, children: root }];

    headings.forEach(function (heading) {
      var level = Number(heading.tagName.slice(1));
      var entry = {
        label: heading.textContent.trim(),
        href: '#' + heading.id,
        labelIsHeading: true,
        children: [],
        level: level
      };

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(entry);
      stack.push(entry);
    });

    return root;
  }

  function renderInlineList(entries) {
    var ul = document.createElement('ul');
    entries.forEach(function (entry) {
      appendInlineEntry(ul, entry);
    });
    return ul;
  }

  function appendInlineEntry(list, entry) {
    var li = document.createElement('li');

    if (entry.children.length) {
      li.className = 'toc-era';
      var details = document.createElement('details');
      details.className = 'collapsible-section';

      var summary = document.createElement('summary');
      var summaryLink = document.createElement('a');
      summaryLink.href = entry.href;
      summaryLink.textContent = entry.label;
      summary.appendChild(summaryLink);
      details.appendChild(summary);

      details.appendChild(renderInlineList(entry.children));
      li.appendChild(details);
    } else {
      var link = document.createElement('a');
      link.href = entry.href;
      link.textContent = entry.label;
      li.appendChild(link);
    }

    list.appendChild(li);
  }

  function normalizeContainer(container, entries) {
    Array.from(container.querySelectorAll(':scope > ul')).forEach(function (list) {
      list.parentNode.removeChild(list);
    });
    container.appendChild(renderInlineList(entries));
  }

  function injectContainer(postEl, entries) {
    var wrap = document.createElement('div');
    wrap.className = 'toc-container post-container';

    var h2 = document.createElement('h2');
    h2.id = 'table-of-contents';
    h2.textContent = 'Table of contents';
    wrap.appendChild(h2);
    wrap.appendChild(renderInlineList(entries));

    var postDate = postEl.querySelector('.post-date');
    if (postDate && postDate.nextSibling) {
      postEl.insertBefore(wrap, postDate.nextSibling);
    } else if (postDate) {
      postDate.parentNode.appendChild(wrap);
    } else {
      postEl.prepend(wrap);
    }

    return wrap;
  }

  function getEntries(postEl) {
    if (cachedEntries) return cachedEntries;

    var container = postEl.querySelector('.toc-container');
    var entries = container ? entriesFromContainer(container) : entriesFromHeadings(postEl);

    if (!entries.length) {
      cachedEntries = [];
      return cachedEntries;
    }

    if (container) {
      normalizeContainer(container, entries);
    } else {
      injectContainer(postEl, entries);
    }

    cachedEntries = entries;
    return cachedEntries;
  }

  window.TocModel = {
    getEntries: getEntries
  };
})();

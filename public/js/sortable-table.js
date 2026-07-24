/**
 * Sortable data tables: click column headers to sort. Opt in with class "sortable"
 * on the table. Use data-sort-type="text"|"number" on each <th>. Optional
 * data-sort-default-col (1-based) and data-sort-default-dir (asc|desc).
 */
(function () {
  var expandableData = [];

  function parseNumeric(text) {
    var s = String(text).trim().replace(/\u2212/g, '-');
    // Strip currency symbols, thousands separators, and unit letters (e.g. "$108M").
    s = s.replace(/[^0-9.\-]/g, '');
    if (!s.length) return NaN;
    if (s.charAt(0) === '.') s = '0' + s;
    var n = parseFloat(s);
    return n;
  }

  function getSortType(th) {
    var t = (th.getAttribute('data-sort-type') || 'text').toLowerCase();
    return t === 'number' ? 'number' : 'text';
  }

  function tbodyRows(tbody) {
    return Array.prototype.slice.call(tbody.querySelectorAll('tr')).filter(function (tr) {
      return tr.cells && tr.cells.length > 0;
    });
  }

  function compare(a, b, type, dir) {
    var neg = dir === 'desc' ? -1 : 1;
    if (type === 'number') {
      if (isNaN(a.val) && isNaN(b.val)) return 0;
      if (isNaN(a.val)) return 1;
      if (isNaN(b.val)) return -1;
      if (a.val < b.val) return -1 * neg;
      if (a.val > b.val) return 1 * neg;
      return 0;
    }
    var cmp = String(a.val).localeCompare(String(b.val), undefined, { sensitivity: 'base' });
    return cmp * neg;
  }

  function sortTable(table, colIndex, type, dir) {
    var tbody = table.querySelector('tbody');
    if (!tbody) return;
    var rows = tbodyRows(tbody);
    var data = rows.map(function (tr) {
      var cell = tr.cells[colIndex];
      var sortValue = cell ? cell.getAttribute('data-sort-value') : null;
      var raw = sortValue !== null ? sortValue : (cell ? cell.textContent.trim() : '');
      var val = type === 'number' ? parseNumeric(raw) : raw.toLowerCase();
      return { tr: tr, val: val };
    });
    data.sort(function (x, y) {
      return compare(x, y, type, dir);
    });
    data.forEach(function (d) {
      tbody.appendChild(d.tr);
    });
  }

  function setHeaderState(table, activeCol, dir) {
    var ths = table.querySelectorAll('thead tr th');
    ths.forEach(function (th, i) {
      var btn = th.querySelector('.sort-table__btn');
      var icon = btn && btn.querySelector('.sort-table__sort-icon');
      th.removeAttribute('aria-sort');
      if (btn) btn.setAttribute('aria-pressed', i === activeCol ? 'true' : 'false');
      if (icon) {
        icon.classList.remove('is-asc', 'is-desc');
        if (i === activeCol) {
          th.setAttribute('aria-sort', dir === 'desc' ? 'descending' : 'ascending');
          icon.textContent = dir === 'desc' ? '\u2193' : '\u2191';
          icon.classList.add(dir === 'desc' ? 'is-desc' : 'is-asc');
        } else {
          icon.textContent = '';
        }
      }
    });
  }

  function wire(table) {
    var tbody = table.querySelector('tbody');
    var thList = table.querySelectorAll('thead tr th');
    var ncols = thList.length;
    if (!tbody || ncols === 0) return;

    var defaultCol = parseInt(table.getAttribute('data-sort-default-col') || '2', 10);
    var defaultDir = (table.getAttribute('data-sort-default-dir') || 'desc').toLowerCase();
    if (defaultDir !== 'asc' && defaultDir !== 'desc') defaultDir = 'desc';

    var types = [];
    thList.forEach(function (th, colIndex) {
      types[colIndex] = getSortType(th);
      var btn = th.querySelector('.sort-table__btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var curSort = table.getAttribute('data-current-sort-col');
        var curDir = table.getAttribute('data-current-sort-dir');
        var nextDir;
        if (String(colIndex) === curSort) {
          nextDir = curDir === 'desc' ? 'asc' : 'desc';
        } else {
          nextDir = types[colIndex] === 'number' ? 'desc' : 'asc';
        }
        sortTable(table, colIndex, types[colIndex], nextDir);
        setHeaderState(table, colIndex, nextDir);
        table.setAttribute('data-current-sort-col', String(colIndex));
        table.setAttribute('data-current-sort-dir', nextDir);
      });
    });

    var initCol = Math.min(Math.max(defaultCol - 1, 0), ncols - 1);
    sortTable(table, initCol, types[initCol], defaultDir);
    setHeaderState(table, initCol, defaultDir);
    table.setAttribute('data-current-sort-col', String(initCol));
    table.setAttribute('data-current-sort-dir', defaultDir);
  }

  function openExpandedData(target, expandButton, labelText, currentIndex) {
    var post = target.closest('.post');
    if (!post || document.querySelector('.table-expand-dialog[open]')) return;

    var dialog = document.createElement('dialog');
    var closeButton = document.createElement('button');
    var previousButton = document.createElement('button');
    var nextButton = document.createElement('button');
    var content = document.createElement('div');
    var previousOverflow = document.body.style.overflow;
    var placeholder = null;
    var originalStyle = null;
    var currentTarget = null;
    var currentExpandButton = expandButton;

    dialog.className = 'table-expand-dialog';

    closeButton.type = 'button';
    closeButton.className = 'table-expand-dialog__close';
    closeButton.setAttribute('aria-label', 'Close expanded data');
    closeButton.textContent = '\u00d7';

    function configureNavigationButton(button, className, label, text, offset) {
      button.type = 'button';
      button.className = 'table-expand-dialog__nav ' + className;
      button.setAttribute('aria-label', label);
      button.textContent = text;
      button.addEventListener('click', function () {
        var nextIndex =
          (currentIndex + offset + expandableData.length) % expandableData.length;
        showItem(nextIndex);
        button.focus();
      });
    }

    configureNavigationButton(
      previousButton,
      'table-expand-dialog__nav--previous',
      'Previous data',
      '\u2039',
      -1
    );
    configureNavigationButton(
      nextButton,
      'table-expand-dialog__nav--next',
      'Next data',
      '\u203a',
      1
    );

    dialog.addEventListener('keydown', function (event) {
      if (expandableData.length < 2) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousButton.click();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextButton.click();
      }
    });

    content.className = 'table-expand-dialog__content';
    content.setAttribute('aria-live', 'polite');

    dialog.appendChild(closeButton);
    if (expandableData.length > 1) {
      dialog.appendChild(previousButton);
      dialog.appendChild(nextButton);
    }
    dialog.appendChild(content);
    post.appendChild(dialog);

    function restoreCurrentTarget() {
      if (!currentTarget || !placeholder) return;
      if (placeholder.parentNode) {
        placeholder.parentNode.replaceChild(currentTarget, placeholder);
      }
      currentTarget.classList.remove('data-expand-target');
      currentTarget.style.width = originalStyle.width;
      currentTarget.style.margin = originalStyle.margin;
      currentTarget.style.transform = originalStyle.transform;
      currentTarget.style.transformOrigin = originalStyle.transformOrigin;
      currentTarget = null;
      placeholder = null;
    }

    function showItem(nextIndex) {
      restoreCurrentTarget();

      currentIndex = nextIndex;
      var item = expandableData[currentIndex];
      currentTarget = item.target;
      currentExpandButton = item.button;

      var rect = currentTarget.getBoundingClientRect();
      var computedStyle = window.getComputedStyle(currentTarget);
      var availableWidth = Math.max(window.innerWidth - 64, rect.width);
      var availableHeight = Math.max(window.innerHeight - 96, rect.height);
      var scale = Math.min(
        1.75,
        availableWidth / rect.width,
        availableHeight / rect.height
      );

      originalStyle = {
        width: currentTarget.style.width,
        margin: currentTarget.style.margin,
        transform: currentTarget.style.transform,
        transformOrigin: currentTarget.style.transformOrigin
      };

      placeholder = document.createElement('div');
      placeholder.className = 'data-expand-placeholder';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.style.width = rect.width + 'px';
      placeholder.style.height = rect.height + 'px';
      placeholder.style.margin = computedStyle.margin;
      placeholder.style.flex = computedStyle.flex;

      currentTarget.parentNode.insertBefore(placeholder, currentTarget);
      currentTarget.classList.add('data-expand-target');
      currentTarget.style.width = rect.width + 'px';
      currentTarget.style.margin = '0';
      currentTarget.style.transform = 'scale(' + scale + ')';
      currentTarget.style.transformOrigin = 'top left';

      content.style.width = rect.width * scale + 'px';
      content.style.height = rect.height * scale + 'px';
      content.appendChild(currentTarget);
      dialog.setAttribute(
        'aria-label',
        item.label ? 'Expanded data. ' + item.label : 'Expanded data'
      );
    }

    function restoreData() {
      restoreCurrentTarget();
      dialog.remove();
      document.body.style.overflow = previousOverflow;
      currentExpandButton.focus();
    }

    closeButton.addEventListener('click', function () {
      dialog.close();
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', restoreData, { once: true });

    showItem(currentIndex);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function createExpandButton(label) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'table-expand-button';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />' +
      '</svg>';
    return button;
  }

  function addTableExpandControls() {
    document.querySelectorAll('.post table:not([data-no-expand])').forEach(function (table) {
      if (table.getAttribute('data-expand-ready') === 'true') return;

      var caption = table.querySelector('caption');
      if (!caption) {
        caption = table.createCaption();
        caption.classList.add('table-expand-caption--actions-only');
      }

      var captionText = caption.textContent.trim();
      var button = createExpandButton('Expand table');
      var item = {
        target: table,
        button: button,
        label: captionText
      };

      button.addEventListener('click', function () {
        openExpandedData(table, button, captionText, expandableData.indexOf(item));
      });

      caption.appendChild(button);
      table.setAttribute('data-expand-ready', 'true');
      expandableData.push(item);
    });
  }

  function addListExpandControls() {
    document.querySelectorAll('.post .data-list-caption').forEach(function (caption) {
      if (caption.getAttribute('data-expand-ready') === 'true') return;

      var list = caption.nextElementSibling;
      if (!list || !list.classList.contains('data-list')) return;

      var block = document.createElement('div');
      var captionText = caption.textContent.trim();
      var button = createExpandButton('Expand list');
      var item = {
        target: block,
        button: button,
        label: captionText
      };

      block.className = 'data-list-block';
      caption.parentNode.insertBefore(block, caption);
      block.appendChild(caption);
      block.appendChild(list);

      button.addEventListener('click', function () {
        openExpandedData(block, button, captionText, expandableData.indexOf(item));
      });

      caption.appendChild(button);
      caption.setAttribute('data-expand-ready', 'true');
      expandableData.push(item);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('table.sortable').forEach(wire);
    addTableExpandControls();
    addListExpandControls();
    expandableData.sort(function (a, b) {
      return a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1;
    });
  });
})();

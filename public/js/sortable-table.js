/**
 * Sortable data tables: click column headers to sort. Opt in with class "sortable"
 * on the table. Use data-sort-type="text"|"number" on each <th>. Optional
 * data-sort-default-col (1-based) and data-sort-default-dir (asc|desc).
 */
(function () {
  function parseNumeric(text) {
    var s = String(text).trim().replace(/\u2212/g, '-');
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
      var raw = cell ? cell.textContent.trim() : '';
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

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('table.sortable').forEach(wire);
  });
})();

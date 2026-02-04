document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.highlight').forEach(function(block) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var code = pre.querySelector('code');
    if (!code) return;

    /* Language from Jekyll: on parent div (language-sql highlighter-rouge), not on pre/code */
    var lang = 'plaintext';
    var classStr = (block.parentElement && block.parentElement.className) || '';
    var m = classStr.match(/\blanguage-([a-zA-Z0-9+-]+)/);
    if (m) lang = m[1];

    /* Header: language left, copy button right */
    var header = document.createElement('div');
    header.className = 'highlight-header';
    header.textContent = lang;

    var btn = document.createElement('button');
    btn.className = 'highlight-copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    var textToCopy = (code.textContent || '').replace(/\n+$/, '');
    btn.onclick = function() {
      var text = textToCopy;
      var done = function() {
        btn.classList.add('copied');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(function() {
          btn.classList.remove('copied');
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    };
    header.appendChild(btn);

    block.insertBefore(header, block.firstChild);

    var html = code.innerHTML.replace(/\n+$/, '');
    var lineHtmls = html.split('\n');
    if (lineHtmls.length === 1 && !lineHtmls[0]) lineHtmls = [''];

    var linesWrap = document.createElement('div');
    linesWrap.className = 'highlight-lines';
    lineHtmls.forEach(function(lineHtml, i) {
      var row = document.createElement('div');
      row.className = 'highlight-line';
      var num = document.createElement('span');
      num.className = 'highlight-ln';
      num.textContent = i + 1;
      var content = document.createElement('span');
      content.className = 'highlight-line-content';
      content.innerHTML = lineHtml || ' ';
      row.appendChild(num);
      row.appendChild(content);
      linesWrap.appendChild(row);
    });

    pre.innerHTML = '';
    pre.appendChild(linesWrap);

    var inner = document.createElement('div');
    inner.className = 'highlight-inner';
    inner.appendChild(pre);
    block.appendChild(inner);
  });
});

(function () {
  'use strict';

  var data = TIMELINE_DATA;
  if (!data) return;

  var REFERENCE_URLS = {"Bac57":"https://dl.acm.org/doi/10.1145/1455567.1455599","Met59":"https://ieeexplore.ieee.org/document/4640758","Dij68":"https://dl.acm.org/doi/10.1145/362929.362947","Flo67":"https://people.eecs.berkeley.edu/~necula/Papers/FloydMeaning.pdf","Hoa69":"https://dl.acm.org/doi/10.1145/363235.363259","NR69":"https://eprints.ncl.ac.uk/158767","Wir71":"https://link.springer.com/article/10.1007/BF00264291","Cha74":"https://dl.acm.org/doi/10.1145/800296.811515","Cod70":"https://dl.acm.org/doi/10.1145/362384.362685","HR83":"https://dl.acm.org/doi/10.1145/289.291","RT74":"https://dl.acm.org/doi/10.1145/361011.361061","Rit93":"https://dl.acm.org/doi/10.1145/155360.155580","CK74":"https://ieeexplore.ieee.org/document/1092259","Pos81":"https://www.rfc-editor.org/rfc/rfc801","AB93":"https://www.emerald.com/insight/content/doi/10.1108/10662249410798803/full/html","BL89":"https://www.w3.org/History/1989/proposal.html","CERN93":"https://home.cern/science/computing/birth-web/licensing-web","Gar05":"https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf","Pyt91":"https://www.python.org/doc/essays/blurb/","Step94":"https://www.stepanovpapers.com/Stepanov-The_Standard_Template_Library-1994.pdf","Gos96":"https://docs.oracle.com/javase/specs/","Jun18":"https://dl.acm.org/doi/10.1145/3158154","Lie83":"https://dl.acm.org/doi/10.1145/358141.358147","McC60":"https://dl.acm.org/doi/10.1145/367177.367199","MSRC19":"https://msrc-blog.microsoft.com/2019/07/16/a-proactive-approach-to-more-secure-code/","OSI98":"https://opensource.org/history","Fie00":"https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm","Ecl01":"https://www.eclipse.org/","Fow99":"https://martinfowler.com/books/refactoring.html","Jet01":"https://www.jetbrains.com/idea/","Jun97":"https://junit.org","Joh02":"https://www.wiley.com/en-us/Expert+One+on+One+J2EE+Design+and+Development-p-9780764543852","Spr03":"https://spring.io","Car15":"https://arxiv.org/abs/1506.08603","DG04":"https://www.usenix.org/legacy/publications/library/proceedings/osdi04/tech/full_papers/dean/dean_html/","GGL03":"https://research.google/pubs/the-google-file-system/","KNR11":"https://engineering.linkedin.com/27/project-kafka-distributed-publish-subscribe-messaging-system-reaches-v06","Zah10":"https://www.usenix.org/legacy/events/hotcloud10/tech/full_papers/Zaharia.pdf","Dab12":"https://dl.acm.org/doi/10.1145/2145204.2145396","AWS06":"https://aws.amazon.com/about-aws/whats-new/2006/08/24/announcing-amazon-elastic-compute-cloud-amazon-ec2---beta/","App08":"https://www.apple.com/newsroom/2008/03/06Apple-Announces-iPhone-2-0-Software-Beta/","And08":"https://source.android.com","Mar14":"https://martinfowler.com/microservices/","Net12":"https://netflixtechblog.com/netflix-shares-cloud-load-balancing-and-failover-tool-eureka-c10647ef95e5","Vog22":"https://www.allthingsdistributed.com/2022/11/amazon-1998-distributed-computing-manifesto.html","Bre00":"https://www.researchgate.net/publication/221343719_Towards_robust_distributed_systems","CDG06":"https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/","DHJ07":"https://dl.acm.org/doi/10.1145/1294261.1294281","LM10":"https://dl.acm.org/doi/10.1145/1773912.1773922","Ban10":"https://www.elastic.co/guide/en/elasticsearch/guide/current/intro.html","Mon09":"https://www.oreilly.com/library/view/mongodb-the-definitive/9781449381578/","Dah09":"https://nodejs.org/en/about","Eri12":"https://twitter.github.io/effectivescala/","Fac13":"https://react.dev","Mic12":"https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/","Ora14":"https://docs.oracle.com/javase/8/docs/technotes/guides/whats-new/java-se-8.html","Mer14":"https://www.linuxjournal.com/content/docker-lightweight-linux-containers-consistent-development-and-deployment","Bur16":"https://dl.acm.org/doi/10.1145/2898442.2898444","AWS14":"https://aws.amazon.com/blogs/aws/run-code-cloud/","Aba15":"https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi","Pas17":"https://arxiv.org/abs/1912.01703","CKB21":"https://arxiv.org/abs/2107.03374","VSP17":"https://arxiv.org/abs/1706.03762","BMR20":"https://arxiv.org/abs/2005.14165","Fen20":"https://arxiv.org/abs/2002.08155","Git21":"https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/","Git22":"https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/","Ouy22":"https://arxiv.org/abs/2203.02155","Lew20":"https://arxiv.org/abs/2005.11401","Ant24cu":"https://www.anthropic.com/news/3-5-models-and-computer-use","Git24":"https://github.blog/news-insights/product-news/fine-tuned-models-are-now-in-limited-public-beta-for-github-copilot-enterprise","Ope24":"https://openai.com/o1/","Ant24":"https://www.anthropic.com/claude/sonnet","Ant25":"https://www.anthropic.com/news/claude-4","JYW24":"https://arxiv.org/abs/2310.06770","BB13":"https://ieeexplore.ieee.org/document/6606617/","Mey25":"https://csmeyer.substack.com/p/english-isnt-a-programming-language","BK04":"https://link.springer.com/chapter/10.1007/978-1-4615-0465-8_2","Sim95":"https://www.microsoft.com/en-us/research/publication/the-death-of-computer-languages-the-birth-of-intentional-programming/","HBB24":"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5007084","YMO24":"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4684662","MR13":"https://dl.acm.org/doi/10.1145/2509136.2509515","Gu25":"https://arxiv.org/abs/2509.23261","Twist25":"https://arxiv.org/abs/2503.17181","NS25":"https://thenewstack.io/web-development-in-2025-ais-react-bias-vs-native-web/","Gen24":"https://arxiv.org/abs/2411.04525","Met24":"https://arxiv.org/abs/2407.02524","Fet23":"https://arxiv.org/abs/2304.07941"};

  var scrollContainer = document.getElementById('timeline-scroll');
  var modalOverlay = document.getElementById('modal-overlay');
  var modalBody = document.getElementById('modal-body');
  var modalTitle = document.getElementById('modal-title');
  var modalYearBadge = document.getElementById('modal-year-badge');
  var modalEraName = document.getElementById('modal-era-name');
  var modalMeta = document.getElementById('modal-meta');
  var modalClose = document.getElementById('modal-close');
  var eraNavScroll = document.getElementById('era-nav-scroll');
  var eraNav = document.getElementById('era-nav');
  var activeEraIds = [data.eras[0].id];

  function updateNavArrows() {
    var el = eraNavScroll;
    if (!el) return;
    var canLeft = el.scrollLeft > 4;
    var canRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
    var existingLeft = eraNav.querySelector('.nav-fade-left');
    var existingRight = eraNav.querySelector('.nav-fade-right');
    var existingArrowL = eraNav.querySelector('.nav-arrow-left');
    var existingArrowR = eraNav.querySelector('.nav-arrow-right');
    if (canLeft) {
      if (!existingLeft) {
        var fade = document.createElement('div');
        fade.className = 'nav-fade-left';
        eraNav.appendChild(fade);
        var arrow = document.createElement('button');
        arrow.className = 'nav-arrow nav-arrow-left';
        arrow.setAttribute('aria-label', 'Scroll eras left');
        arrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
        arrow.addEventListener('click', function () { eraNavScroll.scrollBy({ left: -200, behavior: 'smooth' }); });
        eraNav.appendChild(arrow);
      }
    } else {
      if (existingLeft) existingLeft.remove();
      if (existingArrowL) existingArrowL.remove();
    }
    if (canRight) {
      if (!existingRight) {
        var fade = document.createElement('div');
        fade.className = 'nav-fade-right';
        eraNav.appendChild(fade);
        var arrow = document.createElement('button');
        arrow.className = 'nav-arrow nav-arrow-right';
        arrow.setAttribute('aria-label', 'Scroll eras right');
        arrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
        arrow.addEventListener('click', function () { eraNavScroll.scrollBy({ left: 200, behavior: 'smooth' }); });
        eraNav.appendChild(arrow);
      }
    } else {
      if (existingRight) existingRight.remove();
      if (existingArrowR) existingArrowR.remove();
    }
  }

  eraNavScroll.addEventListener('scroll', updateNavArrows, { passive: true });
  window.addEventListener('resize', updateNavArrows);
  setTimeout(updateNavArrows, 100);

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function extractSnippet(content) {
    var idx = content.indexOf('**Problem.**');
    if (idx === -1) return content.split('\n\n')[0];
    var after = content.slice(idx + '**Problem.**'.length).trim();
    var solIdx = after.indexOf('**Solution.**');
    var problem = solIdx > -1 ? after.slice(0, solIdx).trim() : after;
    return problem.split('\n\n')[0];
  }

  function stripMarkdown(text) {
    return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([A-Za-z0-9+\u00C0-\u017F']+\d{2,4}[a-z]*(?:cu)?)\]/g, '');
  }

  function renderKatex(latex, displayMode) {
    if (typeof katex !== 'undefined') {
      try {
        return katex.renderToString(latex, { displayMode: displayMode, throwOnError: false, trust: true });
      } catch (e) {
        return esc(latex);
      }
    }
    return esc(latex);
  }

  function isCodeBlock(lines) {
    if (lines.length < 3) return false;
    var indented = 0;
    for (var j = 0; j < lines.length; j++) {
      if (lines[j] !== '' && /^\s{2,}/.test(lines[j])) indented++;
    }
    var codeKeywords = /^(INTEGER|REAL|READ|PRINT|DO |CONTINUE|WRITE|CALL |SELECT |FROM |WHERE |CREATE |INSERT |DROP |def |import |class |function |const |let |var |return |for |while )/;
    var hasKeywords = false;
    for (var j = 0; j < lines.length; j++) {
      if (codeKeywords.test(lines[j].trim())) { hasKeywords = true; break; }
    }
    return (indented >= lines.length * 0.5) || hasKeywords;
  }

  function isMathBlock(text) {
    return /\\\[/.test(text) && /\\\]/.test(text);
  }

  function isQuoteBlock(lines) {
    if (lines.length < 3) return false;
    var sentenceLike = 0;
    for (var j = 0; j < lines.length; j++) {
      if (lines[j].length > 10 && /[a-z]/.test(lines[j]) && !/[{}=;()]/.test(lines[j])) sentenceLike++;
    }
    var hasDeepIndent = false;
    for (var j = 0; j < lines.length; j++) {
      if (/^\s{4,}/.test(lines[j])) { hasDeepIndent = true; break; }
    }
    return sentenceLike >= lines.length * 0.8 && !hasDeepIndent;
  }

  function isExampleBlock(lines) {
    for (var j = 0; j < lines.length; j++) {
      if (lines[j].indexOf('\u2192') > -1 || lines[j].indexOf('->') > -1) return true;
    }
    return false;
  }

  function extractDisplayMath(text) {
    var match = text.match(/\\\[([\s\S]*?)\\\]/);
    if (!match) return text;
    var latex = match[1].trim();
    latex = latex.replace(/\\\\\\\\/g, '\\\\');
    return latex;
  }

  function lookupRefUrl(tag) {
    if (!tag) return null;
    if (REFERENCE_URLS[tag]) return REFERENCE_URLS[tag];
    var normalized = tag.replace(/\+/g, '');
    if (REFERENCE_URLS[normalized]) return REFERENCE_URLS[normalized];
    return null;
  }

  function renderInlineFormatting(text, refUrl) {
    var regex = /(\$[^$]+\$)|(\*\*[^*]+\*\*)|(`[^`]+`)|(((?:https?:\/\/)?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:org|com|io|edu|net|gov|ch|uk|de)(?:\/[^\s),]*)?))|(\[[A-Za-z0-9+\u00C0-\u017F']+\d{2,4}[a-z]*(?:cu)?\])/g;
    var result = '';
    var lastIndex = 0;
    var match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result += esc(text.slice(lastIndex, match.index));
      }
      var m = match[0];
      if (m.startsWith('$') && m.endsWith('$') && !m.startsWith('$$')) {
        result += renderKatex(m.slice(1, -1), false);
      } else if (m.startsWith('**') && m.endsWith('**')) {
        result += '<strong>' + esc(m.slice(2, -2)) + '</strong>';
      } else if (m.startsWith('`') && m.endsWith('`')) {
        result += '<code class="inline-code">' + esc(m.slice(1, -1)) + '</code>';
      } else if (m.startsWith('[')) {
        result += '<span class="citation-tag">' + esc(m) + '</span>';
      } else if (m.match(/(?:^https?:\/\/|[a-zA-Z0-9].*\.(?:org|com|io|edu|net|gov|ch|uk|de))/)) {
        var href = refUrl || (m.startsWith('http') ? m : 'https://' + m);
        result += '<a class="ref-link" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(m) + '</a>';
      }
      lastIndex = match.index + m.length;
    }

    if (lastIndex < text.length) {
      result += esc(text.slice(lastIndex));
    }
    return result;
  }

  function renderContent(content) {
    var blocks = content.split('\n\n');
    var html = '';

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];

      if (block === '**References**' || block.startsWith('**References**')) {
        html += '<div class="ref-header"><h3>References</h3></div>';
        continue;
      }

      if (block.startsWith('[') && /^\[[A-Za-z0-9+]+\d{2}/.test(block)) {
        var tagMatch = block.match(/^\[([A-Za-z0-9+'+]+\d{2,4}[a-z]*(?:cu)?)\]/);
        var refTag = tagMatch ? tagMatch[1] : null;
        var refUrl = lookupRefUrl(refTag);
        html += '<p class="ref-entry">' + renderInlineFormatting(block, refUrl) + '</p>';
        continue;
      }

      var lines = block.split('\n');

      if (isMathBlock(block)) {
        var latex = extractDisplayMath(block);
        html += '<div class="katex-display">' + renderKatex(latex, true) + '</div>';
        continue;
      }

      if (lines.length > 1 && isCodeBlock(lines)) {
        html += '<pre><code>' + esc(block) + '</code></pre>';
        continue;
      }

      if (lines.length >= 3 && isExampleBlock(lines)) {
        html += '<div class="example-block">';
        for (var j = 0; j < lines.length; j++) {
          html += '<div>' + esc(lines[j]) + '</div>';
        }
        html += '</div>';
        continue;
      }

      if (lines.length >= 4 && isQuoteBlock(lines)) {
        html += '<blockquote>';
        for (var j = 0; j < lines.length; j++) {
          html += '<p>' + esc(lines[j]) + '</p>';
        }
        html += '</blockquote>';
        continue;
      }

      if (block.startsWith('**') && block.indexOf('.**') > -1) {
        var boldEnd = block.indexOf('.**') + 3;
        var boldText = block.slice(2, boldEnd - 3);
        var rest = block.slice(boldEnd);
        html += '<p><strong>' + esc(boldText) + '.</strong>' + renderInlineFormatting(rest) + '</p>';
        continue;
      }

      if (block.startsWith('**Rule') || block.startsWith('**Codd')) {
        html += '<p class="rule-line">' + renderInlineFormatting(block) + '</p>';
        continue;
      }

      if (/^`[^`]+`$/.test(block.trim())) {
        var code = block.trim().slice(1, -1);
        html += '<pre><code>' + esc(code) + '</code></pre>';
        continue;
      }

      if (lines.length >= 2 && lines.length <= 4 && lines[0].startsWith('  ') && lines.some(function(l) { return l.trim().startsWith('\u2014'); })) {
        var quoteLines = lines.filter(function(l) { return !l.trim().startsWith('\u2014'); });
        var attrLine = lines.find(function(l) { return l.trim().startsWith('\u2014'); });
        html += '<blockquote>';
        for (var j = 0; j < quoteLines.length; j++) {
          html += '<p>' + esc(quoteLines[j].trim()) + '</p>';
        }
        if (attrLine) {
          html += '<p class="attribution">' + esc(attrLine.trim()) + '</p>';
        }
        html += '</blockquote>';
        continue;
      }

      html += '<p>' + renderInlineFormatting(block) + '</p>';
    }

    return html;
  }

  function buildTimeline() {
    var track = document.getElementById('timeline-track');
    var navScroll = document.getElementById('era-nav-scroll');

    data.eras.forEach(function (era) {
      var btn = document.createElement('button');
      btn.className = 'era-btn';
      btn.setAttribute('data-era-id', era.id);
      btn.style.backgroundColor = era.color + '18';
      btn.style.borderColor = era.color + '40';
      btn.style.color = 'var(--fg)';
      btn.innerHTML = esc(era.name) + ' <span class="year-range">' + esc(era.yearRange) + '</span>';
      btn.addEventListener('click', function () {
        var section = document.getElementById('era-' + era.id);
        if (section && scrollContainer) {
          var containerRect = scrollContainer.getBoundingClientRect();
          var sectionRect = section.getBoundingClientRect();
          var scrollLeft = scrollContainer.scrollLeft + sectionRect.left - containerRect.left - 48;
          scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      });
      navScroll.appendChild(btn);

      var section = document.createElement('div');
      section.className = 'era-section';
      section.id = 'era-' + era.id;

      var header = document.createElement('div');
      header.className = 'era-header';
      header.innerHTML =
        '<div class="era-accent-bar" style="background-color:' + era.color + '"></div>' +
        '<div><h2>' + esc(era.name) + '</h2><p class="era-years">' + esc(era.yearRange) + '</p></div>';
      section.appendChild(header);

      var row = document.createElement('div');
      row.className = 'milestone-row';

      era.milestones.forEach(function (ms, index) {
        var card = document.createElement('button');
        card.className = 'milestone-card';
        var snippetText = stripMarkdown(extractSnippet(ms.content));
        card.innerHTML =
          '<span class="year-badge" style="background-color:' + era.color + '">' + esc(ms.year) + '</span>' +
          '<h3>' + esc(ms.shortTitle) + '</h3>' +
          '<p class="snippet">' + esc(snippetText) + '</p>' +
          '<div class="read-more">Read more &rarr;</div>';
        card.addEventListener('click', function () { openMilestone(ms, era); });
        row.appendChild(card);

        if (index < era.milestones.length - 1) {
          var connector = document.createElement('div');
          connector.className = 'milestone-connector';
          connector.innerHTML = '<div class="milestone-connector-line" style="background-color:' + era.color + '"></div>';
          row.appendChild(connector);
        }
      });

      var eraEnd = document.createElement('div');
      eraEnd.className = 'era-connector';
      eraEnd.innerHTML = '<div class="era-connector-line"></div>';
      row.appendChild(eraEnd);

      section.appendChild(row);
      track.appendChild(section);
    });

    var divider = document.createElement('div');
    divider.className = 'nav-divider';
    navScroll.appendChild(divider);

    var discNavBtn = document.createElement('button');
    discNavBtn.className = 'discussion-nav-btn';
    discNavBtn.textContent = 'Discussion';
    discNavBtn.addEventListener('click', openDiscussion);
    navScroll.appendChild(discNavBtn);

    var endCard = document.createElement('button');
    endCard.className = 'discussion-end-card';
    endCard.innerHTML = '<span>Discussion</span>';
    endCard.addEventListener('click', openDiscussion);
    track.appendChild(endCard);
  }

  function updateActiveEras() {
    if (!scrollContainer) return;
    var containerRect = scrollContainer.getBoundingClientRect();
    var visible = [];

    data.eras.forEach(function (era) {
      var el = document.getElementById('era-' + era.id);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var overlapLeft = Math.max(rect.left, containerRect.left);
      var overlapRight = Math.min(rect.right, containerRect.right);
      if (overlapRight - overlapLeft > 80) {
        visible.push(era.id);
      }
    });

    if (visible.length === 0 && data.eras.length > 0) {
      visible = [data.eras[0].id];
    }

    activeEraIds = visible;

    var navBtns = eraNavScroll.querySelectorAll('.era-btn');
    navBtns.forEach(function (btn) {
      var eraId = btn.getAttribute('data-era-id');
      var era = data.eras.find(function (e) { return e.id === eraId; });
      if (!era) return;
      var isActive = activeEraIds.indexOf(eraId) > -1;
      if (isActive) {
        btn.classList.add('active');
        btn.style.backgroundColor = era.color;
        btn.style.borderColor = 'transparent';
        btn.style.color = 'white';
      } else {
        btn.classList.remove('active');
        btn.style.backgroundColor = era.color + '18';
        btn.style.borderColor = era.color + '40';
        btn.style.color = 'var(--fg)';
      }
    });
  }

  function openMilestone(milestone, era) {
    modalMeta.style.display = 'flex';
    modalYearBadge.style.display = 'inline-block';
    modalYearBadge.style.backgroundColor = era.color;
    modalYearBadge.textContent = milestone.year;
    modalEraName.textContent = era.name;
    modalTitle.textContent = milestone.title;
    modalBody.innerHTML = '<div class="content">' + renderContent(milestone.content) + '</div>';
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function openDiscussion() {
    modalMeta.style.display = 'none';
    modalTitle.textContent = 'Discussion';
    var html = '<div class="content discussion-section">';
    data.discussionTopics.forEach(function (topic) {
      html += '<div class="topic-group">';
      html += '<button class="topic-header" data-topic-id="' + esc(topic.id) + '">';
      html += '<span>' + esc(topic.title) + '</span>';
      html += '<span class="topic-toggle">+</span>';
      html += '</button>';
      html += '<div class="topic-body" id="topic-body-' + esc(topic.id) + '">';
      html += renderContent(topic.content);
      html += '</div>';
      html += '</div>';
    });
    if (data.conclusion) {
      html += '<div class="topic-group">';
      html += '<button class="topic-header" data-topic-id="conclusion">';
      html += '<span>' + esc(data.conclusion.title) + '</span>';
      html += '<span class="topic-toggle">+</span>';
      html += '</button>';
      html += '<div class="topic-body" id="topic-body-conclusion">';
      html += renderContent(data.conclusion.content);
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
    modalBody.innerHTML = html;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalClose.focus();

    modalBody.querySelectorAll('.topic-header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var topicId = btn.getAttribute('data-topic-id');
        var body = document.getElementById('topic-body-' + topicId);
        var toggle = btn.querySelector('.topic-toggle');
        if (!body) return;
        var isExpanded = body.classList.contains('expanded');
        modalBody.querySelectorAll('.topic-body').forEach(function (b) { b.classList.remove('expanded'); });
        modalBody.querySelectorAll('.topic-toggle').forEach(function (t) { t.textContent = '+'; });
        if (!isExpanded) {
          body.classList.add('expanded');
          toggle.textContent = '\u2212';
        }
      });
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay || e.target.classList.contains('modal-backdrop')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
      return;
    }
    if (!modalOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') scrollTimeline('left');
      if (e.key === 'ArrowRight') scrollTimeline('right');
    }
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
      var dialog = modalOverlay.querySelector('.modal-dialog');
      if (!dialog) return;
      var focusable = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  function scrollTimeline(direction) {
    if (!scrollContainer) return;
    var amount = scrollContainer.clientWidth * 0.6;
    scrollContainer.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  }

  var scrollLeftBtn = document.getElementById('scroll-left');
  var scrollRightBtn = document.getElementById('scroll-right');
  if (scrollLeftBtn) scrollLeftBtn.addEventListener('click', function () { scrollTimeline('left'); });
  if (scrollRightBtn) scrollRightBtn.addEventListener('click', function () { scrollTimeline('right'); });

  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateActiveEras, { passive: true });
  }

  buildTimeline();
  updateActiveEras();
})();

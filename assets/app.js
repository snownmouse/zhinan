/* ============================================================
   民间指南
   app.js —— 侧边导航、哈希路由、站内搜索、封面渲染
   ============================================================ */

(function () {
  'use strict';

  var GROUPS = window.GUIDE_GROUPS || [];

  /* ---------- 拍平数据 ---------- */
  var PAGES = [];
  GROUPS.forEach(function (g) {
    (g.items || []).forEach(function (it) {
      PAGES.push({
        id: it.id,
        title: it.title,
        summary: it.summary || '',
        tags: it.tags || [],
        html: it.html || '',
        group: g.group,
        icon: g.icon || '📄',
        desc: g.desc || ''
      });
    });
  });

  var INDEX = {};
  PAGES.forEach(function (p) { INDEX[p.id] = p; });

  /* ---------- 工具 ---------- */
  function el(id) { return document.getElementById(id); }

  function plainText(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function highlight(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    try {
      return safe.replace(new RegExp(escapeReg(escapeHtml(q)), 'gi'), function (m) {
        return '<mark>' + m + '</mark>';
      });
    } catch (e) { return safe; }
  }

  function snippet(text, q, len) {
    len = len || 110;
    if (!q) return text.slice(0, len) + (text.length > len ? '…' : '');
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text.slice(0, len) + (text.length > len ? '…' : '');
    var start = Math.max(0, i - 30);
    var s = (start > 0 ? '…' : '') + text.slice(start, start + len);
    if (start + len < text.length) s += '…';
    return s;
  }

  /* 品牌名：名字上方的小引号（引号不作为正文字符，只做装饰） */
  function qName(name) {
    return '<span class="q-name">' + escapeHtml(name) + '</span>';
  }

  /* ---------- 侧边栏 ---------- */
  function renderSidebar(activeId) {
    var html = '';
    html += navItem('', '🏠', '首页', activeId === '');
    html += navItem('__all__', '📖', '全部目录', activeId === '__all__');

    GROUPS.forEach(function (g) {
      html += '<div class="nav-group">';
      html += '<div class="nav-group-title"><span class="g-ico">' + (g.icon || '📄') + '</span>' +
        '<span class="g-name">' + escapeHtml(g.group) + '</span></div>';
      (g.items || []).forEach(function (it) {
        html += navItem(it.id, null, it.title, activeId === it.id);
      });
      html += '</div>';
    });

    el('sidebarNav').innerHTML = html;

    Array.prototype.forEach.call(el('sidebarNav').querySelectorAll('.nav-item'), function (node) {
      node.addEventListener('click', function (e) {
        e.preventDefault();
        var id = node.getAttribute('data-id');
        location.hash = id === '' ? '#/' : (id === '__all__' ? '#/all' : '#/p/' + id);
        closeSidebar();
      });
    });
  }

  function navItem(id, icon, label, active) {
    var href = id === '' ? '#/' : (id === '__all__' ? '#/all' : '#/p/' + id);
    var lead = icon
      ? '<span class="nav-ico">' + icon + '</span>'
      : '<span class="dot"></span>';
    return '<a class="nav-item' + (active ? ' active' : '') + '" data-id="' + id + '" href="' + href + '" title="' + escapeHtml(label) + '">' +
      lead + '<span class="nav-label">' + escapeHtml(label) + '</span></a>';
  }

  /* ---------- 目录收起 / 展开 ---------- */
  var COLLAPSE_KEY = 'zhinan.sidebar.collapsed';

  function readCollapsed() {
    try { return localStorage.getItem(COLLAPSE_KEY) === '1'; } catch (e) { return false; }
  }

  function applyCollapsed(collapsed) {
    var layout = document.querySelector('.layout');
    var btn = el('collapseBtn');
    if (layout) layout.classList.toggle('collapsed', collapsed);
    if (btn) {
      btn.textContent = collapsed ? '›' : '‹';
      btn.setAttribute('aria-label', collapsed ? '展开目录' : '收起目录');
      btn.setAttribute('title', collapsed ? '展开目录' : '收起目录');
    }
  }

  function toggleCollapsed() {
    var collapsed = !readCollapsed();
    try { localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0'); } catch (e) { /* ignore */ }
    applyCollapsed(collapsed);
  }

  /* ---------- 封面：莲花池底图 ---------- */
  var POND_SVG =
    '<svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" focusable="false">' +
      '<defs>' +
        '<linearGradient id="znWater" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#DCF2EC" stop-opacity="0"/>' +
          '<stop offset="0.45" stop-color="#C7E9E0" stop-opacity="0.42"/>' +
          '<stop offset="1" stop-color="#A9DACD" stop-opacity="0.72"/>' +
        '</linearGradient>' +
        '<linearGradient id="znLeaf" x1="0" y1="0" x2="0.25" y2="1">' +
          '<stop offset="0" stop-color="#9BD3B3"/>' +
          '<stop offset="1" stop-color="#4E9C7D"/>' +
        '</linearGradient>' +
        '<linearGradient id="znLeafDeep" x1="0" y1="0" x2="0.25" y2="1">' +
          '<stop offset="0" stop-color="#7CC19C"/>' +
          '<stop offset="1" stop-color="#32805F"/>' +
        '</linearGradient>' +
        '<linearGradient id="znPetal" x1="0" y1="1" x2="0" y2="0">' +
          '<stop offset="0" stop-color="#EFA8B9"/>' +
          '<stop offset="1" stop-color="#FDEAEE"/>' +
        '</linearGradient>' +
      '</defs>' +

      '<rect x="0" y="0" width="1200" height="340" fill="url(#znWater)"/>' +

      /* 远岸荷叶（淡，做纵深） */
      '<ellipse cx="230" cy="238" rx="215" ry="46" fill="url(#znLeaf)" opacity="0.22"/>' +
      '<ellipse cx="1010" cy="246" rx="235" ry="50" fill="url(#znLeaf)" opacity="0.2"/>' +
      '<ellipse cx="640" cy="228" rx="250" ry="44" fill="url(#znLeaf)" opacity="0.16"/>' +

      /* 涟漪 */
      '<ellipse cx="640" cy="300" rx="300" ry="34" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.3"/>' +
      '<ellipse cx="640" cy="300" rx="206" ry="23" fill="none" stroke="#FFFFFF" stroke-opacity="0.48" stroke-width="1.6"/>' +
      '<ellipse cx="278" cy="288" rx="126" ry="16" fill="none" stroke="#FFFFFF" stroke-opacity="0.42" stroke-width="1.5"/>' +
      '<ellipse cx="992" cy="292" rx="138" ry="17" fill="none" stroke="#FFFFFF" stroke-opacity="0.38" stroke-width="1.5"/>' +

      /* 中景荷叶 */
      '<g opacity="0.66">' +
        '<ellipse cx="416" cy="262" rx="134" ry="39" fill="url(#znLeafDeep)"/>' +
        '<path d="M416,262 L416,222 M416,262 L371,234 M416,262 L461,234 M416,262 L352,250 M416,262 L480,250" stroke="#FFFFFF" stroke-opacity="0.24" stroke-width="1.1" fill="none"/>' +
      '</g>' +
      '<g opacity="0.56">' +
        '<ellipse cx="884" cy="248" rx="114" ry="33" fill="url(#znLeaf)"/>' +
        '<path d="M884,248 L884,214 M884,248 L847,226 M884,248 L921,226" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="1" fill="none"/>' +
      '</g>' +

      /* 主荷花 */
      '<g transform="translate(636,252)">' +
        '<path d="M0,0 L0,60" stroke="#7BB79B" stroke-width="2.6" stroke-opacity="0.42" fill="none"/>' +
        '<path d="M-5,2 C-46,-15 -64,-39 -64,-62 C-39,-45 -17,-23 -5,2 Z" fill="url(#znPetal)" opacity="0.78"/>' +
        '<path d="M5,2 C46,-15 64,-39 64,-62 C39,-45 17,-23 5,2 Z" fill="url(#znPetal)" opacity="0.78"/>' +
        '<path d="M-3,1 C-29,-30 -39,-62 -35,-86 C-16,-62 -3,-32 -3,1 Z" fill="url(#znPetal)" opacity="0.92"/>' +
        '<path d="M3,1 C29,-30 39,-62 35,-86 C16,-62 3,-32 3,1 Z" fill="url(#znPetal)" opacity="0.92"/>' +
        '<path d="M0,0 C-7,-38 -5,-74 0,-96 C5,-74 7,-38 0,0 Z" fill="url(#znPetal)"/>' +
        '<ellipse cx="0" cy="-11" rx="8.5" ry="6.5" fill="#FBEBC4" opacity="0.92"/>' +
      '</g>' +

      /* 侧荷花（小） */
      '<g transform="translate(924,272) scale(0.66)">' +
        '<path d="M0,0 L0,58" stroke="#7BB79B" stroke-width="3" stroke-opacity="0.38" fill="none"/>' +
        '<path d="M-5,2 C-46,-15 -64,-39 -64,-62 C-39,-45 -17,-23 -5,2 Z" fill="url(#znPetal)" opacity="0.72"/>' +
        '<path d="M5,2 C46,-15 64,-39 64,-62 C39,-45 17,-23 5,2 Z" fill="url(#znPetal)" opacity="0.72"/>' +
        '<path d="M-3,1 C-29,-30 -39,-62 -35,-86 C-16,-62 -3,-32 -3,1 Z" fill="url(#znPetal)" opacity="0.88"/>' +
        '<path d="M3,1 C29,-30 39,-62 35,-86 C16,-62 3,-32 3,1 Z" fill="url(#znPetal)" opacity="0.88"/>' +
        '<path d="M0,0 C-7,-38 -5,-74 0,-96 C5,-74 7,-38 0,0 Z" fill="url(#znPetal)"/>' +
        '<ellipse cx="0" cy="-11" rx="8.5" ry="6.5" fill="#FBEBC4" opacity="0.9"/>' +
      '</g>' +

      /* 花苞 */
      '<g transform="translate(322,266)">' +
        '<path d="M0,0 L0,48" stroke="#7BB79B" stroke-width="2.2" stroke-opacity="0.38" fill="none"/>' +
        '<path d="M0,-2 C-19,-20 -24,-43 -19,-58 C-8,-39 0,-20 0,-2 Z" fill="#EAA4B4" opacity="0.6"/>' +
        '<path d="M0,-2 C19,-20 24,-43 19,-58 C8,-39 0,-20 0,-2 Z" fill="#EAA4B4" opacity="0.52"/>' +
        '<path d="M0,0 C-11,-27 -10,-54 0,-70 C11,-54 10,-27 0,0 Z" fill="url(#znPetal)" opacity="0.9"/>' +
      '</g>' +

      /* 前景荷叶（撑住画面下缘） */
      '<g opacity="0.88">' +
        '<ellipse cx="556" cy="340" rx="336" ry="66" fill="url(#znLeafDeep)"/>' +
        '<path d="M556,340 L556,282 M556,340 L448,300 M556,340 L664,300 M556,340 L356,326 M556,340 L756,326" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1.4" fill="none"/>' +
      '</g>' +
      '<ellipse cx="128" cy="332" rx="224" ry="58" fill="url(#znLeaf)" opacity="0.55"/>' +
      '<ellipse cx="1092" cy="334" rx="196" ry="54" fill="url(#znLeafDeep)" opacity="0.44"/>' +

      /* 水面反光 */
      '<rect x="180" y="292" width="300" height="4" rx="2" fill="#FFFFFF" opacity="0.3"/>' +
      '<rect x="600" y="308" width="210" height="3" rx="1.5" fill="#FFFFFF" opacity="0.26"/>' +
      '<rect x="840" y="286" width="170" height="3" rx="1.5" fill="#FFFFFF" opacity="0.22"/>' +
    '</svg>';

  /* ---------- 封面：日历卡（按当前月份实时渲染） ---------- */
  function renderCalendar() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth();
    var today = now.getDate();

    var startDow = (new Date(y, m, 1).getDay() + 6) % 7;   // 0 = 周一
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var prevDays = new Date(y, m, 0).getDate();

    var cells = '';
    var i;
    for (i = 0; i < startDow; i++) {
      cells += '<span class="dim">' + (prevDays - startDow + 1 + i) + '</span>';
    }
    for (i = 1; i <= daysInMonth; i++) {
      cells += '<span' + (i === today ? ' class="today"' : '') + '>' + i + '</span>';
    }
    var rest = (7 - ((startDow + daysInMonth) % 7)) % 7;
    for (i = 1; i <= rest; i++) cells += '<span class="dim">' + i + '</span>';

    return '<div class="cal-card">' +
      '<div class="cal-head">' +
        '<div class="cal-title">' + y + '年' + (m + 1) + '月</div>' +
        '<span class="cal-chip">本月</span>' +
      '</div>' +
      '<div class="cal-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>' +
      '<div class="cal-days">' + cells + '</div>' +
      '<div class="cal-div"></div>' +
      '<div class="cal-cap">今日 ' + (m + 1) + '/' + today + ' · 校历与活动安排以学校通知为准</div>' +
    '</div>';
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    var cards = GROUPS.map(function (g) {
      var first = (g.items || [])[0];
      if (!first) return '';
      return '<a class="cat-card" href="#/p/' + first.id + '">' +
        '<div class="cc-top"><span class="cc-ico">' + (g.icon || '📄') + '</span><h3>' + escapeHtml(g.group) + '</h3></div>' +
        '<p>' + escapeHtml(g.desc || '') + '</p>' +
        '</a>';
    }).join('');

    var total = PAGES.length;

    el('view').innerHTML =
      '<section class="cover">' +
        '<div class="cover-pond" aria-hidden="true">' + POND_SVG + '</div>' +
        '<div class="cover-inner">' +
          '<div class="cover-panel">' +
            '<span class="cover-eyebrow">中南民族大学 · 校园生活手册</span>' +
            '<h1 class="cover-title">' + qName('民间指南') + '</h1>' +
            '<p class="cover-lead">从校园网怎么充、打印店在哪，到选课、综测、保研、考研、就医报销——把新生最容易踩的坑，一次性讲清楚。</p>' +
            '<div class="cover-actions">' +
              '<a class="cover-btn" href="#/all">浏览全部目录</a>' +
              '<a class="cover-btn ghost" href="#/p/print">先看：打印点在哪</a>' +
            '</div>' +
            '<div class="cover-reserved">预留位置 · 我到时候留了我再加内容</div>' +
          '</div>' +
          renderCalendar() +
        '</div>' +
      '</section>' +

      '<div class="section-head"><h2>按栏目浏览</h2><span>共 ' + total + ' 个条目</span></div>' +
      '<div class="card-grid">' + cards + '</div>' +

      '<div class="section-head"><h2>新生最常问</h2><span>点开直接看</span></div>' +
      '<div class="list-cards">' +
        quickCard('campus-network', '校园网怎么计费？', '月租 15 元，企业微信缴费') +
        quickCard('exam-system', '教务系统能干什么？', '选课 / 成绩 / 评教 / 教室借用') +
        quickCard('zongce', '综测怎么算？', 'A1×10% + A2×70% + A3×20%') +
        quickCard('graduation', '毕业要满足哪些学分？', '课程学分 + 劳动教育 + 双创 + 美育') +
        quickCard('hospital', '校医院怎么看？', '位置、时间、挂号、取药全流程') +
        quickCard('baoyan', '保研要什么条件？', 'GPA 2.5 以上 + 专业前 20%') +
      '</div>';
  }

  function quickCard(id, title, desc) {
    if (!INDEX[id]) return '';
    return '<a class="mini-card" href="#/p/' + id + '" style="text-decoration:none;color:inherit;display:block">' +
      '<div class="mc-title">' + escapeHtml(title) + '</div>' +
      '<div class="mc-desc">' + escapeHtml(desc) + '</div></a>';
  }

  /* ---------- 全部目录 ---------- */
  function renderAll() {
    var html = '<nav class="breadcrumb"><a href="#/">首页</a><span class="sep">/</span><span>全部目录</span></nav>' +
      '<h1 class="page-title">全部目录</h1>' +
      '<p class="page-summary">共 ' + GROUPS.length + ' 个栏目 · ' + PAGES.length + ' 个条目</p>' +
      '<div style="height:18px"></div>';

    GROUPS.forEach(function (g) {
      html += '<div class="toc-block">' +
        '<div class="tb-head">' + (g.icon || '📄') + ' ' + escapeHtml(g.group) + '</div>' +
        '<div class="toc-links">' +
        (g.items || []).map(function (it) {
          return '<a href="#/p/' + it.id + '">' + escapeHtml(it.title) + '</a>';
        }).join('') +
        '</div></div>';
    });

    el('view').innerHTML = html;
  }

  /* ---------- 内容页 ---------- */
  function renderPage(id) {
    var p = INDEX[id];
    if (!p) {
      el('view').innerHTML = '<h1 class="page-title">页面不存在</h1>' +
        '<p class="page-summary">没有找到这个条目，<a href="#/all">回到全部目录</a>。</p>';
      return;
    }

    var i = PAGES.indexOf(p);
    var prev = i > 0 ? PAGES[i - 1] : null;
    var next = i < PAGES.length - 1 ? PAGES[i + 1] : null;

    var pager = '';
    if (prev || next) {
      pager = '<div class="pager">' +
        (prev ? '<a href="#/p/' + prev.id + '"><span class="p-label">← 上一个</span><span class="p-title">' + escapeHtml(prev.title) + '</span></a>' : '<span></span>') +
        (next ? '<a class="next" href="#/p/' + next.id + '"><span class="p-label">下一个 →</span><span class="p-title">' + escapeHtml(next.title) + '</span></a>' : '<span></span>') +
        '</div>';
    }

    el('view').innerHTML =
      '<nav class="breadcrumb"><a href="#/">首页</a><span class="sep">/</span>' +
        '<a href="#/all">' + escapeHtml(p.group) + '</a><span class="sep">/</span><span>' + escapeHtml(p.title) + '</span></nav>' +
      '<h1 class="page-title">' + escapeHtml(p.title) + '</h1>' +
      (p.summary ? '<p class="page-summary">' + escapeHtml(p.summary) + '</p>' : '') +
      (p.tags.length ? '<div class="page-meta">' + p.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('') + '</div>' : '<div style="height:8px"></div>') +
      '<article class="content">' + p.html + '</article>' +
      pager;
    window.__compInit && window.__compInit();
  }

  /* ---------- 搜索 ---------- */
  function renderSearch(q) {
    var query = q.trim();
    var results = [];

    PAGES.forEach(function (p) {
      var text = plainText(p.html);
      var hay = (p.title + ' ' + p.summary + ' ' + p.tags.join(' ') + ' ' + text).toLowerCase();
      var lq = query.toLowerCase();
      if (hay.indexOf(lq) < 0) return;
      var score = 0;
      if (p.title.toLowerCase().indexOf(lq) >= 0) score += 100;
      if (p.summary.toLowerCase().indexOf(lq) >= 0) score += 30;
      if (p.tags.join(' ').toLowerCase().indexOf(lq) >= 0) score += 20;
      score += Math.max(0, 20 - text.toLowerCase().indexOf(lq) / 60);
      results.push({ p: p, text: text, score: score });
    });

    results.sort(function (a, b) { return b.score - a.score; });

    var head = '<nav class="breadcrumb"><a href="#/">首页</a><span class="sep">/</span><span>搜索</span></nav>' +
      '<h1 class="page-title">搜索「' + escapeHtml(query) + '」</h1>' +
      '<p class="page-summary">找到 ' + results.length + ' 个相关条目</p><div style="height:14px"></div>';

    if (!results.length) {
      el('view').innerHTML = head +
        '<div class="callout info"><p>没有找到相关内容。可以换个关键词，或者到 <a href="#/all">全部目录</a> 里翻一翻。</p></div>';
      return;
    }

    el('view').innerHTML = head + results.map(function (r) {
      return '<a class="result-item" href="#/p/' + r.p.id + '">' +
        '<div class="r-group">' + escapeHtml(r.p.group) + '</div>' +
        '<div class="r-title">' + highlight(r.p.title, query) + '</div>' +
        '<div class="r-snip">' + highlight(snippet(r.text, query), query) + '</div>' +
        '</a>';
    }).join('');
  }

  /* ---------- 路由 ---------- */
  function route() {
    var hash = location.hash || '#/';
    var m;

    if (hash === '#/' || hash === '#') {
      renderHome();
      renderSidebar('');
    } else if (hash === '#/all') {
      renderAll();
      renderSidebar('__all__');
    } else if ((m = hash.match(/^#\/p\/(.+)$/))) {
      renderPage(decodeURIComponent(m[1]));
      renderSidebar(decodeURIComponent(m[1]));
    } else {
      renderHome();
      renderSidebar('');
    }

    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
    window.__afterRender && window.__afterRender();
  }

  /* ---------- 侧边栏开合（移动端） ---------- */
  function openSidebar() {
    el('sidebar').classList.add('open');
    el('scrim').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    el('sidebar').classList.remove('open');
    el('scrim').hidden = true;
    document.body.style.overflow = '';
  }

  /* ---------- 初始化 ---------- */
  function init() {
    if (!GROUPS.length) {
      el('view').innerHTML = '<div class="callout warn"><p>内容数据未加载。请确认 assets/data/*.js 已正确引入。</p></div>';
      return;
    }

    el('menuBtn').addEventListener('click', openSidebar);
    el('scrim').addEventListener('click', closeSidebar);

    var collapseBtn = el('collapseBtn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', toggleCollapsed);
      applyCollapsed(readCollapsed());
    }

    var input = el('searchInput');
    var clear = el('searchClear');
    var timer = null;

    function doSearch() {
      var q = input.value;
      clear.hidden = !q;
      if (q.trim().length >= 1) {
        renderSearch(q);
        el('sidebar').classList.remove('open');
        el('scrim').hidden = true;
        document.body.style.overflow = '';
      } else {
        route();
      }
    }

    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(doSearch, 160);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; doSearch(); }
    });
    clear.addEventListener('click', function () {
      input.value = ''; doSearch(); input.focus();
    });

    window.addEventListener('hashchange', function () {
      if (input.value.trim()) { input.value = ''; clear.hidden = true; }
      route();
    });

    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

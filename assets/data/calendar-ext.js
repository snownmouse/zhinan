/*
 * 日历扩展：封面月历（含悬停弹窗）+ 专门日历页 + 近期提醒
 * 依赖 window.EVENTS（见 assets/data/events.js）
 * 由 app.js 的 route() 末尾调用 window.__afterRender() 触发
 *
 * 布局约定（2026-09-11 第三次调整）：
 *   首页   ：左块（指南文案）与右侧日历卡【等高拉伸】；近期提醒独立成块，
 *            铺在这两块下方的全部宽度（自适应多列网格，最多 8 条）
 *   日历页 ：整月大日历在上（全宽），全部提醒在下（自适应多列网格，等高整齐）
 *   翻月控件（‹ 今天 ›）与图例都收在日历卡片框内部；
 *   首页不再显示"查看完整日历"入口（日历页从侧边栏「校园日历」进入）。
 */
(function () {
  'use strict';

  var SEEN = 'compguide_evt_seen_';
  var CAL = {};   // 封面月历当前视图
  (function () { var n = new Date(); CAL.y = n.getFullYear(); CAL.m = n.getMonth(); })();
  var FCAL = {};  // 专门日历页当前视图
  (function () { var n = new Date(); FCAL.y = n.getFullYear(); FCAL.m = n.getMonth(); })();
  var bound = false, pinned = false;

  function evMeta(t) {
    return ({
      exam:   { cls: 'evt-exam',    label: '考试' },
      signup: { cls: 'evt-signup',  label: '报名' },
      notice: { cls: 'evt-notice',  label: '通知' }
    })[t] || { cls: 'evt-notice', label: '通知' };
  }

  // 取某天事件
  function evOn(y, m, d) {
    var E = window.EVENTS || [], out = [];
    for (var i = 0; i < E.length; i++) {
      var p = (E[i].date || '').split('-');
      if (p.length < 3) continue;
      if (+p[0] === y && (+p[1] - 1) === m && +p[2] === d) out.push(E[i]);
    }
    return out;
  }

  function isSeen(id) { try { return localStorage.getItem(SEEN + id) === '1'; } catch (e) { return false; } }
  function setSeen(id) { try { localStorage.setItem(SEEN + id, '1'); } catch (e) {} }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtMD(s) { return s.slice(5).replace('-', '/'); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ---------- 月历格子（封面 / 专门页 共用） ---------- */
  function monthCells(y, m) {
    var today = new Date();
    var ty = today.getFullYear(), tm = today.getMonth(), td = today.getDate();
    var startDow = (new Date(y, m, 1).getDay() + 6) % 7;
    var dim = new Date(y, m + 1, 0).getDate();
    var prev = new Date(y, m, 0).getDate();
    var cells = '', i, k;
    for (i = 0; i < startDow; i++) cells += '<span class="dim">' + (prev - startDow + 1 + i) + '</span>';
    for (i = 1; i <= dim; i++) {
      var evs = evOn(y, m, i);
      var cl = [];
      if (i === td && y === ty && m === tm) cl.push('today');
      for (k = 0; k < evs.length; k++) cl.push(evMeta(evs[k].type).cls);
      var dd = y + '-' + pad(m + 1) + '-' + pad(i);
      if (evs.length) {
        cl.push('has-evt');
        cells += '<span class="' + cl.join(' ') + '" data-date="' + dd + '">' + i + '<i class="evt-dot"></i></span>';
      } else {
        cells += '<span' + (cl.length ? ' class="' + cl.join(' ') + '"' : '') + '>' + i + '</span>';
      }
    }
    var rest = (7 - ((startDow + dim) % 7)) % 7;
    for (i = 1; i <= rest; i++) cells += '<span class="dim">' + i + '</span>';
    return cells;
  }

  var LEGEND_HTML = '<div class="cal-legend">' +
    '<span><i class="lg lg-exam"></i>考试</span>' +
    '<span><i class="lg lg-signup"></i>报名/确认</span>' +
    '<span><i class="lg lg-notice"></i>通知/假期</span></div>';

  function calShell(y, m, cells, opts) {
    opts = opts || {};
    var now = new Date();
    var isCur = (y === now.getFullYear() && m === now.getMonth());
    var nav = opts.nav !== false;
    return '<div class="' + (opts.large ? 'fc-card' : 'cal-card') + '" data-y="' + y + '" data-m="' + m + '">' +
      '<div class="cal-head">' +
        '<div class="cal-title">' + y + '年' + (m + 1) + '月</div>' +
        (isCur ? '<span class="cal-chip">本月</span>' : '<span class="cal-chip ghost">浏览</span>') +
        (nav ? '<span class="cal-nav">' +
                '<button class="cal-prev" aria-label="上个月" type="button">‹</button>' +
                '<button class="cal-today" type="button">今天</button>' +
                '<button class="cal-next" aria-label="下个月" type="button">›</button>' +
              '</span>' : '') +
      '</div>' +
      '<div class="cal-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>' +
      '<div class="cal-days' + (opts.large ? ' large' : '') + '">' + cells + '</div>' +
      (opts.cap !== false ? '<div class="cal-div"></div><div class="cal-cap">今日 ' + (now.getMonth() + 1) + '/' + now.getDate() + ' · 校历安排以学校通知为准</div>' : '') +
      (opts.legend ? '<div class="cal-div"></div>' + LEGEND_HTML : '') +
    '</div>';
  }

  /* ---------- 统一的小卡片（网格用，首页 / 日历页共用） ---------- */
  function evtCard(x, withBtn) {
    var e = x.e, mm = evMeta(e.type), seen = isSeen(e.id);
    var when = x.days < 0 ? '已结束' : (x.days === 0 ? '就是今天' : (x.days + ' 天后'));
    var name = e.url
      ? '<a class="ec-name" href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.title) + ' ↗</a>'
      : '<div class="ec-name">' + esc(e.title) + '</div>';
    var meta = fmtMD(e.date) + (e.conf === false ? ' · 参考' : ' · 已确认');
    return '<li class="evt-card ' + mm.cls + (seen ? ' seen' : '') + '">' +
      '<div class="ec-top">' +
        '<span class="evt-tag ' + mm.cls + '">' + mm.label + '</span>' +
        '<span class="ec-when">' + when + '</span>' +
        (withBtn ? '<button class="ec-x" data-id="' + esc(e.id) + '" title="知道了">×</button>' : '') +
      '</div>' +
      name +
      '<div class="ec-meta">' + esc(meta) + (e.note ? ' · ' + esc(e.note) : '') + '</div>' +
    '</li>';
  }

  /* ---------- 取未来事件（按天数升序） ---------- */
  function upcoming(maxDays) {
    var E = window.EVENTS || [], now = new Date(); now.setHours(0, 0, 0, 0);
    var arr = [];
    for (var i = 0; i < E.length; i++) {
      var p = (E[i].date || '').split('-'); if (p.length < 3) continue;
      var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setHours(0, 0, 0, 0);
      var days = Math.round((d - now) / 86400000);
      if (days >= 0 && days <= maxDays) arr.push({ e: E[i], days: days });
    }
    arr.sort(function (a, b) { return a.days - b.days; });
    return arr;
  }

  /* ---------- 封面月历（右上，与左块等高） + 近期提醒（整块下方，全宽铺满） ---------- */
  function renderCover() {
    var card = document.querySelector('.cal-card');
    if (!card) return;
    var column = card.closest('.cal-col');
    if (!column) {
      var wrap = document.createElement('div'); wrap.className = 'cal-col';
      card.parentNode.insertBefore(wrap, card); wrap.appendChild(card);
      column = wrap;
    }
    // 卡片下方不再挂"查看完整日历"入口（翻月控件已在卡片头部内）
    card.outerHTML = calShell(CAL.y, CAL.m, monthCells(CAL.y, CAL.m), {});

    // 提醒区移到整张封面之下，占满左右两块下方的全部宽度
    var cover = document.querySelector('.cover');
    if (!cover) return;
    var olds = document.querySelectorAll('.remind-card.home-full');
    for (var i = 0; i < olds.length; i++) {
      if (olds[i].parentNode) olds[i].parentNode.removeChild(olds[i]);
    }
    cover.insertAdjacentHTML('afterend', renderRemind(120));
  }

  function renderRemind(limitDays) {
    var arr = upcoming(limitDays);
    var picks = [], i;
    for (i = 0; i < arr.length && picks.length < 8; i++) {
      if (!isSeen(arr[i].e.id)) picks.push(arr[i]);
    }
    var body;
    if (!picks.length) {
      body = '<div class="remind-foot">' + (arr.length ? '近期的都已标记，去日历页看全部 →' : '暂无近期安排') + '</div>';
    } else {
      body = '<ul class="remind-list grid-full">' + picks.map(function (x) { return evtCard(x, true); }).join('') + '</ul>';
    }
    var more = arr.length > picks.length
      ? '<a class="remind-more" href="#/p/calendar">查看全部 ' + arr.length + ' 条 →</a>' : '';
    return '<div class="remind-card home-full">' +
      '<div class="remind-head"><span class="remind-ico">🔔</span>' +
        '<div><div class="remind-title">近期提醒</div>' +
        '<div class="remind-sub">近 ' + limitDays + ' 天 · 考试 / 报名 / 通知</div></div>' +
        more +
      '</div>' +
      body +
    '</div>';
  }

  /* ---------- 专门日历页：大日历（上） + 全部提醒网格（下） ---------- */
  function renderFull() {
    var host = document.getElementById('fullCal');
    if (!host) return;
    // 翻月 +"今天"+ 图例 全部收在日历卡片框内
    var cal = calShell(FCAL.y, FCAL.m, monthCells(FCAL.y, FCAL.m), { large: true, cap: false, legend: true });
    host.innerHTML =
      '<div class="fc-layout">' +
        '<div class="fc-main">' + cal + '</div>' +
        '<div class="fc-below">' +
          '<div class="remind-head"><span class="remind-ico">🔔</span><div><div class="remind-title">全部提醒</div>' +
            '<div class="remind-sub">按时间排序 · 含考试 / 报名 / 通知</div></div></div>' +
          '<div id="fcList"></div>' +
        '</div>' +
      '</div>';
    renderFullList(host);
  }

  function renderFullList(host) {
    var box = host.querySelector('#fcList');
    if (!box) return;
    var E = window.EVENTS || [], now = new Date(); now.setHours(0, 0, 0, 0);
    var arr = [];
    for (var i = 0; i < E.length; i++) {
      var p = (E[i].date || '').split('-'); if (p.length < 3) continue;
      var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setHours(0, 0, 0, 0);
      var days = Math.round((d - now) / 86400000);
      if (days >= -1) arr.push({ e: E[i], days: days });
    }
    arr.sort(function (a, b) { return a.days - b.days; });
    if (!arr.length) { box.innerHTML = '<div class="remind-foot">暂无安排</div>'; return; }
    box.innerHTML = '<ul class="remind-list grid-auto">' +
      arr.map(function (x) { return evtCard(x, true); }).join('') + '</ul>' +
      '<div class="remind-foot">"知道了"仅记录在本机浏览器；参考日期以学校 / 官网当年通知为准</div>';
  }

  /* ---------- 悬停 / 点击 弹窗 ---------- */
  function tipEl() {
    var t = document.getElementById('calTip');
    if (!t) { t = document.createElement('div'); t.id = 'calTip'; t.className = 'cal-tip'; document.body.appendChild(t); }
    return t;
  }
  function showTip(cell) {
    var dd = cell.getAttribute('data-date'); if (!dd) return;
    var p = dd.split('-'); var evs = evOn(+p[0], +p[1] - 1, +p[2]);
    if (!evs.length) { hideTip(); return; }
    var html = '<div class="tip-date">' + dd + '</div>';
    html += evs.map(function (e) {
      var mm = evMeta(e.type);
      var name = e.url ? '<a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.title) + ' ↗</a>' : esc(e.title);
      return '<div class="tip-row"><span class="evt-tag ' + mm.cls + '">' + mm.label + '</span>' +
        '<div class="tip-body"><div class="tip-name">' + name + '</div>' +
        (e.note ? '<div class="tip-note">' + esc(e.note) + '</div>' : '') +
        (e.conf === false ? '<div class="tip-note">参考日期·以官方为准</div>' : '') + '</div></div>';
    }).join('');
    var t = tipEl();
    t.innerHTML = html;
    t.classList.toggle('pinned', pinned);
    t.style.display = 'block';
    var r = cell.getBoundingClientRect();
    var tw = t.offsetWidth, th = t.offsetHeight;
    var left = r.left + r.width / 2 - 12;
    if (left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 8;
    if (left < 8) left = 8;
    var top = r.bottom + 8;
    if (top + th > window.innerHeight - 8) top = r.top - th - 8;
    t.style.left = left + 'px'; t.style.top = top + 'px';
  }
  function hideTip() { var t = document.getElementById('calTip'); if (t) t.style.display = 'none'; }

  /* ---------- 事件绑定（只绑一次） ---------- */
  function bind() {
    if (bound) return; bound = true;
    document.addEventListener('click', function (ev) {
      var t = ev.target;
      var btn = t && t.closest ? t.closest('.ec-x,.evt-dismiss') : null;
      if (btn) {
        var id = btn.getAttribute('data-id'); setSeen(id);
        var li = btn.closest ? btn.closest('.evt-item,.evt-card') : null;
        if (li) { li.classList.add('seen'); btn.textContent = '✓'; }
        return;
      }
      var nav = t && t.closest ? t.closest('.cal-prev,.cal-next') : null;
      if (nav) {
        var card = nav.closest('.cal-card'); if (!card) return;
        var large = card.classList.contains('fc-card');
        var dir = nav.classList.contains('cal-prev') ? -1 : 1;
        var st = large ? FCAL : CAL;
        st.m += dir; if (st.m < 0) { st.m = 11; st.y--; } if (st.m > 11) { st.m = 0; st.y++; }
        if (large) renderFull(); else renderCover();
        return;
      }
      var todayBtn = t && t.closest ? t.closest('.cal-today') : null;
      if (todayBtn) {
        var c2 = todayBtn.closest('.cal-card'); if (!c2) return;
        var n = new Date();
        if (c2.classList.contains('fc-card')) { FCAL.y = n.getFullYear(); FCAL.m = n.getMonth(); renderFull(); }
        else { CAL.y = n.getFullYear(); CAL.m = n.getMonth(); renderCover(); }
        return;
      }
      var cell = t && t.closest ? t.closest('.cal-days span.has-evt') : null;
      if (cell) { pinned = true; showTip(cell); return; }
      if (!t.closest || !t.closest('.cal-tip')) { pinned = false; hideTip(); }
    });
    document.addEventListener('mouseover', function (ev) {
      if (pinned) return;
      var cell = ev.target.closest && ev.target.closest('.cal-days span.has-evt');
      if (cell) showTip(cell);
    });
    document.addEventListener('mouseout', function (ev) {
      if (pinned) return;
      var cell = ev.target.closest && ev.target.closest('.cal-days span.has-evt');
      if (cell) {
        var to = ev.relatedTarget;
        if (to && to.closest && (to.closest('.cal-tip') || to.closest('.cal-days span.has-evt'))) return;
        hideTip();
      }
    });
    window.addEventListener('scroll', function () { if (!pinned) hideTip(); }, true);
  }

  /* ---------- 接入 SPA（每次路由渲染后调用） ---------- */
  window.__afterRender = function () {
    renderCover();
    renderFull();
    bind();
  };

  /* ---------- 注册"校园日历"专门页（侧边栏自动出现） ---------- */
  window.GUIDE_GROUPS = window.GUIDE_GROUPS || [];
  window.GUIDE_GROUPS.push({
    group: '校园日历', icon: '📅',
    items: [{
      id: 'calendar', title: '校园日历', summary: '考试、报名与校园通知一览',
      tags: ['日历', '提醒', '考试'],
      html: '<div class="page-cal"><div id="fullCal"></div></div>'
    }]
  });
})();

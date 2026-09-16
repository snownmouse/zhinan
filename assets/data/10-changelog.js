/*
 * 项目日志（更新记录）
 * ------------------------------------------------------------
 * 挂到侧边栏「安全与关于」分组下（与「关于本手册」并列），
 * 同时在顶栏右下角有「项目日志」入口。
 *
 * 维护：往 LOG 数组最前面加一条即可（最新在最上面）。
 *   v    : 版本号（可留空）
 *   d    : 日期 'YYYY-MM-DD'
 *   kind : '新增' | '优化' | '数据' | '站点' | '修复'
 *   title: 一句话标题
 *   body : 数组，每行一条明细
 */
(function () {
  'use strict';

  var LOG = [
    {
      v: '', d: '2026-09-15', kind: '修复',
      title: '全站问题修复与官方快链改版',
      body: [
        '修复首页「新生最常问」里指向已删除条目 campus-network 的死链卡片，改为「校园卡·校园网」。',
        '平安校园补全消防 / 紧急求助内容；新增「防诈骗专题」「心理健康与咨询」两个条目；友校 wiki 表中清华、东北大学死链标注「链接待补充」，上海交大接入 sjtudb.net。',
        '竞赛一览 6 条官网失效的赛事（4C 大赛、信息通信、全运会、学青会、ASC 超算、CCF CSP）改为「⚠ 暂无官网·待核」。',
        '新增「官方链接」快链条：推免名额、奖助、教务、图书馆、校医院、出行等条目顶部展示官方入口，部分带网页预览。',
        '移除 3 条已过期考试提醒（2026 上半年四六级、下半年教资笔试、四六级报名）；修「学科竞赛与加分」断链指向「实践教学与学科竞赛」。'
      ]
    },
    {
      v: 'v0.6', d: '2026-09-11', kind: '新增',
      title: '本科生学科竞赛一览',
      body: [
        '整理 <b>163 条</b>本科生学科竞赛项目，含等次（A/B/C）、报名时间、开赛时间与比赛官网。',
        '14 条暂未找到专属官网的赛事标注 <b>⚠ 暂无官网·待核</b>，其余均带官网链接。',
        '表格支持左右滑动（窄屏可横向滚动）。'
      ]
    },
    {
      v: '', d: '2026-09-11', kind: '新增',
      title: '校园日历与近期提醒',
      body: [
        '封面月历升级为<b>事件日历</b>：考试 / 报名 / 通知三类分别标注，鼠标悬停（或点击）可看当天安排。',
        '新增「<b>校园日历</b>」专门页：放大月历 + 图例 + 全部提醒，可翻月、可一键回到今天。',
        '首页新增「近期提醒」：显示未来 120 天内的节点与倒计时，可点「知道了」在本机标记。'
      ]
    },
    {
      v: '', d: '2026-09-11', kind: '数据',
      title: '考试与放假时间更新',
      body: [
        '接入<b>湖北省 2026 下半年四/六级报名</b>：9/14 10:00 开放，9/23 17:00 截止（缴费截止 9/24 17:00）；口试 11/21–22，笔试 12/12。',
        '新增<b>中秋假期</b> 9/25（周五）— 9/27（周日），共 3 天。',
        '移除期末考试、寒假开始、普通话水平测试等各校自定、无法统一的时间。'
      ]
    },
    {
      v: '', d: '2026-09-11', kind: '优化',
      title: '首页排版与日历页布局',
      body: [
        '首页：左侧指南文案与右侧日历<b>等高对齐</b>，「近期提醒」独立成块铺满下方全部宽度。',
        '日历页：由「左日历 + 右窄栏」改为<b>上下堆叠</b>，翻月控件与图例收进日历卡片内部。'
      ]
    },
    {
      v: '', d: '2026-09-11', kind: '站点',
      title: '访问方式简化',
      body: [
        '放通 80 端口，现在直接访问 <b>http://101.43.18.176/</b> 即可，无需再加 <code>:1951</code>。',
        '修复顶栏「关于本手册」点了会跳回首页的问题（原链接缺少 <code>/p/</code> 前缀）。'
      ]
    }
  ];

  var KIND_CLS = { '新增': 'k-new', '优化': 'k-opt', '数据': 'k-data', '站点': 'k-site', '修复': 'k-fix' };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var html = '<div class="changelog">' +
    '<div class="callout info"><p>这里记录手册的更新轨迹，最新在最上面。' +
      '本日志从 <b>2026-09</b> 开始记录，更早的建设历史待补录。</p></div>';

  for (var i = 0; i < LOG.length; i++) {
    var e = LOG[i];
    var lis = '';
    for (var j = 0; j < e.body.length; j++) lis += '<li>' + e.body[j] + '</li>';
    html += '<div class="log-item ' + (KIND_CLS[e.kind] || 'k-opt') + '">' +
      '<div class="log-head">' +
        '<span class="log-date">' + esc(e.d) + '</span>' +
        (e.v ? '<span class="log-ver">' + esc(e.v) + '</span>' : '') +
        '<span class="log-kind">' + esc(e.kind) + '</span>' +
      '</div>' +
      '<div class="log-title">' + esc(e.title) + '</div>' +
      '<ul class="log-body">' + lis + '</ul>' +
    '</div>';
  }

  html += '<h3>接下来可能做</h3><ul>' +
    '<li>报名 / 考试临近 3 天时，倒计时与圆点转为红色强提醒</li>' +
    '<li>日历页加筛选：全部 / 考试 / 报名 / 通知</li>' +
    '<li>每条提醒支持导出 .ics，一键导入手机系统日历</li>' +
    '<li>把校历、选课、放假等校内通知统一收进日历数据源</li>' +
  '</ul></div>';

  window.GUIDE_GROUPS = window.GUIDE_GROUPS || [];

  var item = {
    id: 'changelog',
    title: '项目日志',
    summary: '手册的更新记录：新增了什么、改了什么、接下来想做什么。',
    tags: ['日志', '更新', '关于', 'changelog'],
    html: html
  };

  // 优先挂到「安全与关于」组（与「关于本手册」并列），找不到就单独建组
  var placed = false;
  for (var k = 0; k < window.GUIDE_GROUPS.length; k++) {
    if (window.GUIDE_GROUPS[k].group === '安全与关于') {
      window.GUIDE_GROUPS[k].items = window.GUIDE_GROUPS[k].items || [];
      window.GUIDE_GROUPS[k].items.push(item);
      placed = true;
      break;
    }
  }
  if (!placed) {
    window.GUIDE_GROUPS.push({
      group: '安全与关于', icon: '🛡️', desc: '关于本手册与更新记录',
      items: [item]
    });
  }
})();

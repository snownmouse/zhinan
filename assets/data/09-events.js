/*
 * 考试与报名提醒 —— 数据源（2026 学年）
 * ------------------------------------------------------------
 * 字段说明：
 *   id    : 唯一标识（"知道了"本地记忆用，勿重复）
 *   title : 显示名称
 *   type  : 'exam' 考试 | 'signup' 报名/确认 | 'notice' 通知/假期
 *   date  : 'YYYY-MM-DD'
 *   note  : 补充说明
 *   url   : 官方链接（无则 ''）
 *   recur : 每年固定规律（一句话，方便以后直接套用）
 *   conf  : true=已查到 2026 官方日期；false=参考推算（以当年通知为准）
 *
 * 维护：只改这个文件。要加新节点往 EVENTS 里加一条即可；
 *       想加"通知/假期"就写 type:'notice'，会自动进日历与提醒。
 *
 * 2026-09-11 整理：
 *   + 新增：湖北省教育考试院《2026年下半年全国大学英语四、六级考试（湖北考区）报名须知》
 *           报名 9/14 10:00 — 9/23 17:00，缴费截止 9/24 17:00
 *           口试 11/21（四级）· 11/22（六级）；笔试 12/12（上午四级、下午六级）
 *   + 新增：中秋假期 9/25—9/27（国办发明电〔2025〕7号）
 *   - 移除：期末考试、寒假开始、普通话水平测试（各校自定）
 */
window.EVENTS = [
  /* —— 官方日期已确认（2026 下半年） —— */
  { id: 'cet-signup-dl-2026',  title: '四/六级报名截止（湖北考区）',      type: 'signup', date: '2026-09-23', note: '17:00 截止；缴费截止 9/24 17:00',    url: 'http://cet-bm.neea.edu.cn',  recur: '报名约10天',             conf: true },
  { id: 'ncre-2026-09',        title: '全国计算机等级考试（NCRE）',       type: 'exam',   date: '2026-09-19', note: '下半年场次（9/19-21 机考）',          url: 'https://ncre.neea.edu.cn',   recur: '每年3月底、9月中下旬',   conf: true },
  { id: 'midautumn-2026',      title: '中秋假期',                        type: 'notice', date: '2026-09-25', note: '9/25（周五）—9/27（周日）放假，共3天', url: '',                          recur: '农历八月十五',           conf: true },
  { id: 'national-day-2026',   title: '国庆假期',                        type: 'notice', date: '2026-10-01', note: '10/1—10/7 放假调休，共7天；9/20、10/10 上班', url: '',                  recur: '每年10月1日',            conf: true },
  { id: 'cet-set-2026-11',     title: '四/六级口试（CET-SET）',          type: 'exam',   date: '2026-11-21', note: '11/21 四级口试、11/22 六级口试',      url: 'https://cet.neea.edu.cn',    recur: '每年5月、11月',          conf: true },
  { id: 'cet-2026-12',         title: '大学英语四/六级（下半年）笔试',    type: 'exam',   date: '2026-12-12', note: '上午四级、下午六级；准考证 12/1 起打印', url: 'https://cet.neea.edu.cn',   recur: '每年12月第2个周六',      conf: true },
  { id: 'kaoyan-2027',         title: '2027 考研初试',                   type: 'exam',   date: '2026-12-19', note: '12/19-21；正式报名10月、确认11月',    url: 'https://yz.chsi.com.cn',     recur: '每年12月倒数第2个周末',  conf: true },
  { id: 'newyear-2027',        title: '元旦假期',                        type: 'notice', date: '2027-01-01', note: '新年假期',                            url: '',                          recur: '每年1月1日',             conf: true },

  /* —— 参考推算（年度规律明确，具体日期以当年通知为准） —— */
  { id: 'kaoyan-2027-pre',     title: '2027 考研预报名',                 type: 'signup', date: '2026-09-24', note: '参考：9月下旬，应届生优先',           url: 'https://yz.chsi.com.cn',     recur: '每年9月下旬',            conf: false },
  { id: 'kaoyan-2027-signup',  title: '2027 考研正式报名',               type: 'signup', date: '2026-10-10', note: '参考：10月上旬—10月底',               url: 'https://yz.chsi.com.cn',     recur: '每年10月',               conf: false },
  { id: 'kaoyan-2027-confirm', title: '2027 考研网上确认',               type: 'signup', date: '2026-11-05', note: '参考：11月上旬',                       url: 'https://yz.chsi.com.cn',     recur: '每年11月上旬',           conf: false },
  { id: 'ntce-2026-12',        title: '中小学教师资格考试（下半年）面试', type: 'exam',  date: '2026-12-05', note: '参考：12月上旬',                       url: 'https://ntce.neea.edu.cn',   recur: '每年5月、12月各一次',    conf: false },
  { id: 'ntce-2027-03',        title: '中小学教师资格考试（上半年）笔试', type: 'exam',  date: '2027-03-13', note: '参考：3月上旬',                       url: 'https://ntce.neea.edu.cn',   recur: '每年3月、9月各一次',     conf: false },
  { id: 'cet-2027-06',         title: '大学英语四/六级（上半年）笔试',    type: 'exam',   date: '2027-06-12', note: '参考：6月第2个周六',                  url: 'https://cet.neea.edu.cn',    recur: '每年6月、12月第2个周六', conf: false }
];

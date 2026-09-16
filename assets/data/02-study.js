/* 内容数据：学业修读 */
(window.GUIDE_GROUPS = window.GUIDE_GROUPS || []).push({
  group: '学业修读',
  icon: '📚',
  desc: '学分怎么算、课怎么选、绩点怎么刷、综测怎么拿分——把规则先搞明白。',
  items: [

    {
      id: 'credit-system',
      title: '学分制与培养方案',
      summary: '完全学分制、毕业学分、培养方案怎么查、课程类别怎么分。',
      tags: ['新生必看', '学业'],
      html: `
<h3>学校实行完全学分制</h3>
<p>学分制是选课制的核心，以教师指导为辅助，<strong>通过绩点和学分衡量学生学习的质与量</strong>。我校采取完全学分制：学分衡量学习量，绩点衡量学习质量。</p>
<div class="callout">
  <p>打个比方：<strong>学分是通关的关卡数，绩点是你每关拿到的星星</strong>。关卡够了（学分修满）就满足毕业要求；但星星（绩点）决定你能不能拿奖学金、能不能保研。</p>
</div>

<h3>培养方案是什么</h3>
<p>专业培养方案是学校对本专业人才培养的总体设计，是制定培养计划、组织教学和进行教学质量监控的依据。培养计划则是它的具体实施，也就是你本科阶段的具体课程安排。</p>
<p>培养方案中明确了各专业的<strong>「总学分及分配」</strong>，对各类课程学分做了明确要求，这是<strong>毕业资格审查的依据</strong>——说白了，就是你能不能毕业的判定标准。</p>

<h4>课程按类别分为</h4>
<ul>
  <li>通识必修课程</li>
  <li>通识选修课程</li>
  <li>学科基础课程平台</li>
  <li>专业课程平台</li>
  <li>集中性实践课程</li>
  <li>素质拓展平台</li>
</ul>

<p>随着年级递增，修读重点逐步转移：<strong>低年级以「通识必修」为主 → 随后以「学科基础课程平台」为主 → 再到「专业课程平台」</strong>。课程比重的先后次序涉及知识衔接，是否提前修读需要慎重考虑。</p>
<p>「通识选修课程」从第一学期就可以开始选，毕业前修满要求的学分即可。</p>

<h4>按性质分为</h4>
<ul>
  <li><strong>必修课程</strong>：必须修读完成。</li>
  <li><strong>选修课程</strong>：必须达到各类别要求的最低学分。</li>
</ul>

<h3>怎么查培养方案</h3>
<ol class="steps">
  <li><strong>学院官网</strong>各学院网站一般会发布本专业培养方案。</li>
  <li><strong>教务系统</strong>登录教务系统，在「公共查询 → 培养方案查询」中查看对应专业的培养方案。</li>
</ol>

<div class="callout warn">
  <p>每个年级的培养计划都会依据当年实际情况微调。<strong>务必以你自己毕业年级对应的培养计划为准</strong>，不要照抄学长学姐的课表。</p>
</div>
`
    },

    {
      id: 'exam-system',
      title: '教务系统能干什么',
      summary: '选课、考试、成绩、教材、免修、教室借用、学生评教。',
      tags: ['新生必看', '工具'],
      links: [{ label: '教务管理系统（需 WebVPN）', url: 'https://ssfw.webvpn.scuec.edu.cn/ssfw/index.do' }],
      html: `
<p>教务系统是本科四年用得最多的系统，<strong>先把它摸熟，能省掉大量跑腿</strong>。</p>
<p>入口：<a href="https://ssfw.webvpn.scuec.edu.cn/ssfw/index.do" target="_blank" rel="noopener">中南民族大学教务管理系统</a>（校外访问需先连 WebVPN）。</p>

<h3>主要功能</h3>
<table>
  <thead><tr><th>功能</th><th>用来做什么</th></tr></thead>
  <tbody>
    <tr><td>选课信息</td><td>查看可选课程、选课结果（注意：这不是选课系统本身）</td></tr>
    <tr><td>考试信息</td><td>查询考试时间与考场安排</td></tr>
    <tr><td>成绩信息</td><td>查询各科成绩与学分绩点</td></tr>
    <tr><td>教材信息</td><td>查看课程指定教材</td></tr>
    <tr><td>免修申请</td><td>提交免修申请（计算机、英语类课程常见）</td></tr>
    <tr><td>教室借用</td><td>申请借用教室用于活动或自习</td></tr>
    <tr><td>学生评教</td><td>学期末对任课教师评价，<em>不完成可能影响查成绩</em></td></tr>
  </tbody>
</table>

<div class="callout info">
  <p>参考推文：《【以心迎新】新手指南 · 教务系统篇丨通关大学学业新手村》。</p>
</div>
`
    },

    {
      id: 'course-selection',
      title: '选课与修课规则',
      summary: '选课制说明、修课六条硬规则、免听怎么申请。',
      tags: ['学业', '重要规则'],
      html: `
<h3>选课制</h3>
<p>选课制即「选课」，学生按培养方案要求和个人规划选择课程。具体操作说明可参考《学生选课系统操作说明》。</p>

<h3>修课：六条必须知道的规则</h3>
<ol class="steps">
  <li><strong>不参与学习和考核 = 0 分</strong>教务系统中没有选课的，<strong>不能参与该课程考核</strong>；不按网上选课班级参与考核者，成绩无效。不参与已选课程的学习和考核，该课程记 0 分。</li>
  <li><strong>免听</strong>自学能达到课程教学要求的，可在选课成功后申请免听。但<strong>每学期申请免听的课程不超过三门</strong>，且以下课程<strong>不得免听</strong>：通识选修课、思想政治课程、实践性教学课、体育课。须在规定时间内申请，经老师和所在学院教学院长审批同意后，可直接参与考核，<strong>以期末成绩作为总评成绩</strong>。常见的免听课程是计算机类、英语类。</li>
  <li><strong>体育课转保健课</strong>因身体原因不适于常规体育项目的，持校医院证明、经体育学院同意，可转修保健课。保健课及格可获得公共体育课相应学习成绩和学分。</li>
  <li><strong>不及格要重修</strong>按本专业人才培养方案选修课程不及格的，需按规定重修或改修其他课程。已及格课程在教学资源允许且符合相关规定条件下，可在规定时间内选课辅修。</li>
  <li><strong>可申请降级学习</strong>因学习难度较大无法跟原年级学习的，可申请到下一年级学习。审批手续应在<strong>每学年开学前两周内</strong>办理完毕。</li>
  <li><strong>每学年一次学分清理</strong>达到下列条件之一，予以退学处理（见下）。</li>
</ol>

<h3>学分清退的红线</h3>
<table>
  <thead><tr><th>时间节点</th><th>累计所获学分要求</th></tr></thead>
  <tbody>
    <tr><td>第一学年末</td><td>不低于 <strong>15</strong> 学分</td></tr>
    <tr><td>第二学年末</td><td>不低于 <strong>50</strong> 学分</td></tr>
    <tr><td>第三学年末</td><td>不低于 <strong>75</strong> 学分</td></tr>
    <tr><td>五年制专业第四学年末</td><td>不低于 <strong>100</strong> 学分</td></tr>
    <tr><td>最长学习年限内</td><td>累计获得学分低于专业毕业学分要求 <strong>10 学分以上</strong>的</td></tr>
  </tbody>
</table>
<p class="muted">休学学生的学分限定视休学时间确定。</p>

<div class="callout warn">
  <p><strong>挂科不是小事。</strong>不只有清退风险，综测评优、奖学金、保研资格都会受影响。第一学期就要打起精神。</p>
</div>
`
    },

    {
      id: 'minor-micro',
      title: '辅修与微专业',
      summary: '主辅修制度、辅修学士学位、微专业报名与规则。',
      tags: ['学业', '跨专业'],
      html: `
<h3>辅修</h3>
<p>学校采取主辅修制度。鼓励学生在学好本专业的基础上，<strong>跨专业、跨学科、跨学校（与本校有合作办学协议的学校）</strong>修读课程或跨专业大类参与辅修。</p>
<ul>
  <li>在校期间<strong>未受任何纪律处分</strong>，且<strong>主修专业课程不及格数不超过 2 门</strong>。</li>
  <li>辅修学士学位在主修学士学位证书中予以注明，<strong>不单独发放学位证书</strong>。</li>
</ul>

<h3>微专业</h3>
<table>
  <thead><tr><th>项目</th><th>规定</th></tr></thead>
  <tbody>
    <tr><td>面向对象</td><td>全校在籍在校本科生（不含第二学士学位、延迟毕业学生）</td></tr>
    <tr><td>管理制度</td><td>学年学分制</td></tr>
    <tr><td>学制</td><td>2 个学期</td></tr>
    <tr><td>学分</td><td>建议 10–15 学分（1 学分对应 16 学时）</td></tr>
    <tr><td>学费</td><td>按学校相关标准收取</td></tr>
    <tr><td>开班条件</td><td>原则上 20 人以上方可开班</td></tr>
    <tr><td>上课时间</td><td>拟安排在周末和假期，采用单独编班</td></tr>
  </tbody>
</table>

<div class="callout warn">
  <p>学生<strong>不得同时申请辅修和微专业</strong>。微专业学分原则上不能与主修专业进行学分互认，微专业课程成绩<strong>不纳入主修专业绩点计算</strong>。</p>
</div>

<p>参考推文：《开放报名！首批微专业开始招生啦！》</p>
`
    },

    {
      id: 'grading',
      title: '英语 · 数学分级教学',
      summary: '新生分级考试与分级教学安排。',
      tags: ['新生必看', '学业'],
      links: [{ label: '教务处（分级教学相关通知）', url: 'https://www.scuec.edu.cn/jwc/' }],
      html: `
<p>学校对英语和数学实行<strong>分级教学</strong>：入学后根据分级考试成绩将学生分入不同层级的班级，教学内容与进度有所区别。</p>

<h3>要注意什么</h3>
<ul>
  <li><strong>分级考试要认真考</strong>：层级会影响你后续的课程难度、修读时间和四级备考节奏。</li>
  <li><strong>层级不同，课程代码不同</strong>：选课时注意看清自己对应的课程班级，选错班级成绩无效。</li>
  <li><strong>与免修、免听相关</strong>：英语、计算机类课程是申请免听最常见的科目。</li>
</ul>

<div class="callout info">
  <p>参考推文：《2026 级新生必看｜英语 + 数学分级教学全解读》。具体分级方案、考试时间以当年教务处通知为准。</p>
</div>
`
    },

    {
      id: 'change-major',
      title: '转专业管理办法',
      summary: '申请年级、次数、流程与注意点。',
      tags: ['学业', '重要规则'],
      html: `
<p>学校有明确的转专业管理办法，<strong>申请资格、次数和流程都有硬性规定</strong>，不是想转就能转，但也不是没有机会。</p>

<h3>准备转专业的正确顺序</h3>
<ol class="steps">
  <li><strong>先读原文</strong>通读《中南民族大学转专业管理办法》，确认自己是否符合申请年级与次数要求。</li>
  <li><strong>看目标专业的接收条件</strong>各学院会公布接收名额与考核方式（笔试 / 面试 / 成绩要求）。</li>
  <li><strong>盯时间节点</strong>转专业申请窗口通常很短，错过就要等下一年。</li>
  <li><strong>准备材料</strong>成绩单、申请理由、相关证明，按要求提交到学院。</li>
  <li><strong>关注录取结果与学分认定</strong>转专业后原有课程学分如何认定，要提前问清楚。</li>
</ol>

<div class="callout warn">
  <p>转专业往往对<strong>已修课程成绩、是否有不及格、是否有违纪</strong>有要求。如果有转专业的想法，大一就要把成绩守住。</p>
</div>

<p>参考推文：《官方版｜中南民大转专业管理办法全文解读！申请年级、次数、流程一次性理清》。</p>
`
    },

    {
      id: 'exemption',
      title: '免修申请与线上成绩单',
      summary: '免修（计算机 / 英语）怎么申请，成绩单怎么在线下载。',
      tags: ['学业', '办事流程'],
      html: `
<h3>免修申请</h3>
<p>对计算机、英语等课程，符合条件的学生可以申请免修（即不修读课程但通过考核取得学分）。</p>
<ul>
  <li><strong>申请入口</strong>：教务系统「免修申请」。</li>
  <li><strong>时间要求</strong>：每学期有固定申报窗口，需按通知在规定时间内提交。</li>
  <li><strong>常见科目</strong>：计算机类、英语类课程。</li>
</ul>
<div class="callout info">
  <p>免修与免听不同：<strong>免听</strong>是不上课但要考试；<strong>免修</strong>是通过认定直接取得学分。申请前先确认自己符合哪一种。</p>
</div>

<h3>线上成绩单下载</h3>
<p>学校已上线<strong>线上成绩单下载服务</strong>，不需要再频繁跑教务处排队盖章。</p>
<ul>
  <li>适用场景：保研、考研复试、求职、出国申请等需要成绩证明的场合。</li>
  <li>下载后注意核对<strong>是否带有电子签章 / 验证码</strong>，部分接收方要求验证真伪。</li>
</ul>

<p>参考推文：《告别频繁跑腿、排队盖章！！线上成绩单下载服务上线啦！》《关于组织开展 2025-2026 学年第一学期免修申请工作的通知》。</p>
`
    },

    {
      id: 'zongce',
      title: '综合素质测评（综测）',
      summary: 'A1 德育 + A2 智育 + A3 发展素质，怎么算、怎么拿分、怎么扣分。',
      tags: ['重点', '奖学金', '学分'],
      html: `
<p>综测是奖学金评定的核心依据之一，也是很多评优的门槛。<strong>先搞清公式，再谈拿分。</strong></p>

<h3>总公式</h3>
<div class="callout">
  <p style="font-size:15px"><strong>总成绩 = A1（德育）× 10% + A2（智育）× 70% + A3（发展素质）× 20%</strong></p>
</div>
<p>依据：《中南民族大学 2024-2025 学年大学生综合素质测评实施细则》（民大学〔2025〕47 号）。</p>

<h3>A2 智育测评（占 70%，最要紧）</h3>
<p>主要考查学生<strong>初修课程</strong>学习绩效，<strong>不含重修、复修、辅修及公选</strong>，总分 100 分。</p>
<div class="callout info">
  <p><strong>A2 = ∑（课程成绩 × 课程学分）÷ ∑（课程学分）</strong></p>
</div>
<p>举个例子（数据为虚构）：同学 A 大一学了微积分（3 学分，90 分）、线性代数（2 学分，80 分）、概率论（2.5 学分，70 分），那么</p>
<p style="padding-left:14px"><code>A2 = (90×3 + 80×2 + 70×2.5) ÷ (3 + 2 + 2.5)</code></p>
<div class="callout warn">
  <p><strong>学分高的课一定要考高一点</strong>，它对 A2 的加权影响更大。可以在「比特工场」公众号的考试与成绩功能里查自己的绩点。</p>
</div>

<h3>A3 发展素质测评（占 20%）</h3>
<p>考查科技创造、体育竞赛、文艺活动、志愿服务及社会实践等方面的表现，分为五项，<strong>每项满分 20 分</strong>：</p>
<ul>
  <li><strong>资格证书测评</strong>：四六级等证书。</li>
  <li><strong>专业类荣誉测评</strong>：专业竞赛获奖，也可通过论文、专利、在权威媒体发表作品获得。</li>
  <li><strong>特长类荣誉测评</strong>：文体特长类荣誉。</li>
  <li><strong>学生服务测评</strong>：学生会、社团、班委等学生工作。</li>
  <li><strong>参与活动测评</strong>：参加校院组织的各类活动。</li>
</ul>

<h4>学生服务测评的规则细节</h4>
<ul>
  <li>需<strong>任职满 1 学年（或连续 2 学期）</strong>，并经主管部门考核合格及以上；考核不合格不予加分。</li>
  <li>每人最多申请 <strong>2 个不同类型</strong>的岗位加分。</li>
  <li>按考核等级<strong>取最高分值岗位</strong>加分，第二岗位最高按合格计算。</li>
  <li>兼任多个同类型岗位时，只取最高分值的 1 个岗位加分。<strong>校 / 院学生会、社团任职属于同类型岗位。</strong></li>
</ul>
<div class="callout warn">
  <p><strong>学生工作不是越多越好。</strong>与其铺一堆头衔，不如在一个岗位上做满一年并拿到「优秀」考核。</p>
</div>

<h4>参与活动测评</h4>
<ul>
  <li>校院组织的啦啦队、观众、打卡等，每次计分，<strong>每学年上限 5 分</strong>。</li>
  <li>不同学院对活动的评判标准可能存在差异，以本学院细则为准。</li>
  <li>团体类项目成员排序会影响分数，报名前先确认规则。</li>
</ul>

<h3>A1 德育测评（占 10%）</h3>
<p>初始基础分 <strong>60 分</strong>，总分 100 分。考查思想政治表现、道德品质修养、身心健康素质、组织纪律观念及宿舍行为表现，采取基准分上加分、减分的方式，由日常管理记录和测评小组评议得出。</p>
<ul>
  <li><strong>常见扣分项</strong>：旷课、逃早签等。</li>
  <li><strong>常见加分项</strong>：早签（晨跑）。</li>
</ul>

<h4>早签（晨跑）规则</h4>
<ul>
  <li>缺勤扣分：按次累计（如 5 次缺勤扣 2.5 分，10 次扣 5 分）。</li>
  <li>全勤加分：每月全勤固定加 2 分，可逐月累计（如 8 个月全勤共加 16 分）。</li>
</ul>

<h3>没有参评资格的情况</h3>
<div class="callout warn">
  <p>有下列情况之一，<strong>无当学年度奖学金参评资格</strong>：</p>
  <ol>
    <li>上学年因违反校纪校规受到纪律处分。</li>
    <li>因违反校纪校规受到纪律处分未解除。</li>
    <li>上学年大学生体质健康测试成绩未达到良好以上（免试学生除外）。</li>
    <li>未按规定缴纳学费及有关费用。</li>
    <li>上学年存在课程不及格。</li>
    <li>上学年休学、保留学籍。</li>
  </ol>
  <p>一句话：<strong>不挂科、不违规违纪、体测良好</strong>（一般切线 70 分，各学院可能不同）。</p>
</div>

<p class="muted">参考：关于组织开展 2024-2025 学年本科生综合素质测评工作的通知、2024-2025 学年大学生综合素质测评加减分标准。</p>
`
    },

    {
      id: 'academic',
      title: '论文查询攻略',
      summary: '知网怎么用、为什么下不了论文、机构登录怎么走。',
      tags: ['学术', '新生必看'],
      html: `
<p>提到论文查询，大家第一反应通常是知网。下面以知网为例，讲清检索与下载的完整路径。</p>

<h3>基本检索流程</h3>
<ol class="steps">
  <li><strong>打开知网官网</strong>在检索框内输入关键词进行搜索，找到目标文献。</li>
  <li><strong>先选检索字段</strong>检索栏下方默认显示「主题」。把鼠标靠近「主题」会看到很多分类，<strong>做检索之前应先根据需求选择字段</strong>，而不是一律用主题。</li>
  <li><strong>下载文献</strong>进入文献详情页下载。</li>
</ol>

<h3>下不了论文怎么办</h3>
<div class="callout warn">
  <p>「打不开／无法下载」通常是没有登录或权限不足。解决办法是<strong>使用机构登录</strong>。</p>
</div>
<ol class="steps">
  <li>注意首页右上角的登录方式，分为<strong>机构登录</strong>和<strong>个人登录</strong>两种。</li>
  <li>选择「机构登录」，搜索学校并选择。</li>
  <li>跳转到学校登录官网，<strong>用个人学校账号登录</strong>。</li>
</ol>

<h3>更多学术资源</h3>
<p>通过<strong>图书馆官网</strong>可以获得更丰富的学术内容。图书馆的「数据库导航」中收录了大量数据库，可以逐个了解。（详见「图书馆使用」）</p>

<p class="muted">整理自《中南民指南（寒假修订版）》「学术篇」。</p>
`
    },

    {
      id: 'research-basics',
      title: '学术基本知识',
      summary: 'DOI、分区、影响因子、SCI/SSCI/EI、OA 期刊……10 个必懂名词。',
      tags: ['学术', '科普'],
      html: `
<p>做论文查询之前，先把这几个词搞懂，看文献会顺畅很多。</p>

<h3>1. DOI</h3>
<p>可以理解为一篇论文的<strong>身份证</strong>，通过它就能定位到这篇文章。</p>

<h3>2. 分区</h3>
<p>常见的有<strong>中科院分区</strong>和 <strong>JCR 分区</strong>：前者是国内的划分方法，后者是国外的划分方法，主要根据<strong>期刊影响因子排名</strong>划分。</p>

<h3>3. 文章种类</h3>
<ul>
  <li><strong>学位论文</strong>：攻读学士、硕士、博士等学位时，为满足毕业要求而写的论文。</li>
  <li><strong>期刊论文</strong>：发表在学术期刊上的论文。</li>
  <li><strong>会议论文</strong>：发表在会议论文集上的论文。</li>
</ul>

<h3>4. 影响因子（IF）</h3>
<p>指某一期刊的文章在特定年份或时期被引用的频率，代表期刊质量。<strong>通常影响因子越高越好。</strong></p>

<h3>5. 英文期刊数据库：SCI、SSCI、EI</h3>
<p>数据库就是储存文章的文件检索库，你可以在里面查文章。</p>
<table>
  <thead><tr><th>缩写</th><th>全称</th><th>领域</th></tr></thead>
  <tbody>
    <tr><td>SCI</td><td>Science Citation Index</td><td>科学文献索引</td></tr>
    <tr><td>SSCI</td><td>Social Sciences Citation Index</td><td>社会科学文献索引</td></tr>
    <tr><td>EI</td><td>Engineering Index</td><td>工程索引</td></tr>
  </tbody>
</table>
<p>SCIE（Science Citation Index Expanded，科学引文索引）是 Web of Science 数据库中的一个核心子库，收录全球自然科学、工程技术、临床医学等领域 178 个学科的 9,500 多种高质量学术期刊。</p>
<p>检索入口：<a href="https://webofscience.clarivate.cn/" target="_blank" rel="noopener">webofscience.clarivate.cn</a></p>

<h3>6. 中文数据库</h3>
<ul>
  <li><strong>CSSCI</strong>：中文社会科学引文索引</li>
  <li><strong>北大核心</strong>：中文核心期刊</li>
  <li><strong>南大核心 / CSCD</strong>：中国科学引文数据库</li>
  <li><strong>科技核心</strong>：中国科技论文统计源期刊</li>
</ul>

<h3>7. 出版社</h3>
<p>数据库下有出版社，常见的两个是 <strong>Elsevier</strong> 和 <strong>Springer</strong>。</p>

<h3>8. CNS</h3>
<p>即《Cell》《Nature》《Science》，三个期刊分别代表<strong>生命科学、自然科学和综合科学</strong>领域的最高水平。其中 Cell 由 Elsevier 旗下出版社发行，Nature 由 Springer 旗下出版。</p>

<h3>9. OA 期刊</h3>
<p>开放获取期刊，<strong>可以直接下载</strong>。模式是「作者付费，读者免费」。</p>

<h3>10. 非 OA 期刊</h3>
<p>即订阅期刊，「作者免费发表，只有通过订阅才能阅读」。</p>

<h3>好用的插件</h3>
<div class="list-cards">
  <div class="mini-card"><div class="mc-title">easyScholar</div><div class="mc-desc">用于显示期刊等级、期刊分区、影响因子。装上后检索结果后面会直接跟上分区和 IF 信息。</div></div>
  <div class="mini-card"><div class="mc-title">Zotero</div><div class="mc-desc">文献管理软件，可通过插件扩展功能，把文献条目集中管理起来。</div></div>
</div>
`
    },

    {
      id: 'practice',
      title: '实践教学与学科竞赛',
      summary: '实践教学为什么不能挂，竞赛级别目录怎么查。',
      tags: ['学业', '竞赛'],
      html: `
<h3>实践教学</h3>
<p>实践教学是培养方案中「集中性实践课程」等环节，<strong>有学分要求，且与毕业直接挂钩</strong>。常见的实践教学环节包括专业实习、课程设计、毕业论文（设计）等。</p>
<div class="callout warn">
  <p>实践教学环节不及格同样影响毕业，不是「水一水就过」的课。具体考核方式与时间安排请咨询所在学院教学办。</p>
</div>
<p>参考推文：《实习挂科 = 毕不了业？中南民大实践教学规则，这篇讲透了》。</p>

<h3>学科竞赛级别等次</h3>
<p>竞赛加分不是「参加了就算」。学校有官方的<strong>《中南民族大学学科竞赛级别等次划分目录》</strong>，只有目录内认定的竞赛、且取得对应等次的成绩，才能获得综测 / 双创学分加分。</p>
<ul>
  <li>竞赛按 A 类、B 类等分级，级别越高加分越重。</li>
  <li>集体项目通常对排名有要求（例如部分政策要求排名第一）。</li>
  <li>目录每年可能有调整，<strong>报名前先查最新版目录</strong>。</li>
</ul>
<div class="callout">
  <p>可查阅：《2024 年中南民族大学学科竞赛级别等次划分目录》《2023 年中南民族大学学科竞赛级别等次划分目录》——但请以<b>最新一版</b>为准。</p>
</div>
`
    }
,
    {
      id: 'scholarship',
      title: '奖助学金',
      summary: '国家奖助贷、勤工助学、绿色通道与校内奖学金',
      tags: ['资助','学业'],
      links: [{ label: '学生处 · 学生资助政策', url: 'https://www.scuec.edu.cn/stu/info/1577/8002.htm' }, { label: '资助中心 · 资助资金管理办法', url: 'https://www.scuec.edu.cn/xszz/info/1012/2542.htm' }],
      preview: true,
      html: `<h3>七位一体资助体系</h3>
<p>学校建立了「奖、贷、助、勤、减、免、补」七位一体资助体系，确保不让一名学生因家庭经济困难而失学。</p><h3>国家级资助</h3>
<ul>
  <li><strong>国家奖学金</strong>：8000 元/年（奖励特别优秀的全日制本专科生）</li>
  <li><strong>国家励志奖学金</strong>：5000 元/年（品学兼优的家庭经济困难学生）</li>
  <li><strong>国家助学金</strong>：平均资助标准 3300 元/年，由高校在 2000–4500 元/年范围内分 2–3 档确定</li>
  <li><strong>国家助学贷款</strong>：本预科生每年最高 20000 元、研究生最高 25000 元；在校期间利息由国家承担；分「生源地信用助学贷款」和「校园地国家助学贷款」两类，同一年度只能选其一</li>
  <li>服兵役 / 基层就业国家资助、退役士兵资助等专项</li>
</ul><h3>校内与社会资助</h3>
<ul>
  <li><strong>勤工助学</strong>：固定岗 360 元/月、临时岗 280 元/月，全校每年近 2000 个岗位</li>
  <li><strong>绿色通道</strong>：家庭经济困难新生可先办理入学手续，学费和住宿费通过申请国家助学贷款解决</li>
  <li><strong>校内奖学金</strong>：吴泽霖教授奖学金（4000/3000/2000 元）、优秀学生奖学金（1400/1000/600 元）、学生标兵（1500 元）、三好学生（800 元）、优秀学生干部（500 元）等</li>
  <li>学费减免、无息借款（每学年不超 2000 元）、临时困难补助（200–500 元）、新生爱心礼包等</li>
</ul><p><strong>官方来源：</strong><a href="https://www.scuec.edu.cn/stu/info/1577/8002.htm">学生处·学生资助政策</a> · <a href="https://www.scuec.edu.cn/xszz/info/1012/2542.htm">资助中心·资助资金管理办法</a></p>`
    }

  ]
});

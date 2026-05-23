import type { Deck, SpeakingTemplate } from '../types'

export const seedDecks: Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'locked'>[] = [
  {
    title: '万能动词升级',
    description: '口语基础动词 → 高级替换，避免全篇 like / think / want',
    cards: [
      { id: '', front: 'like / love', back: { meaning: '喜欢（升级表达）', example: "I'm a big fan of reading. / I'm really into photography.", alternative: 'be a big fan of / be really into / be fond of / be keen on', tag: 'Part1' } },
      { id: '', front: 'think', back: { meaning: '认为（升级表达）', example: "Personally speaking, it's really important. / From my perspective, it's vital.", alternative: 'Personally speaking / From my perspective / In my view / As for me', tag: 'Part1' } },
      { id: '', front: 'want (to do)', back: { meaning: '想要做（升级表达）', example: "I feel like doing something creative. / I hope to pursue a career in law.", alternative: 'feel like doing / hope to pursue / plan to do', tag: 'Part1' } },
      { id: '', front: 'have time', back: { meaning: '有时间（升级表达）', example: "I'm free to read every evening. / I have some spare time on my hands.", alternative: "be free to / have spare time / on one's leisure time", tag: 'Part1' } },
      { id: '', front: 'help', back: { meaning: '帮助（升级表达）', example: 'This method really benefits me. / It does good to my progress.', alternative: 'benefit / do good to / be helpful for', tag: 'Part2' } },
      { id: '', front: 'make me feel...', back: { meaning: '让我感到（升级表达）', example: 'It brings me a strong sense of fulfillment. / It gives me a feeling of peace.', alternative: 'bring me a sense of / give me a feeling of / offer me a sense of', tag: 'Part2' } },
      { id: '', front: 'I have many friends', back: { meaning: '我有很多朋友（升级表达）', example: "I hang out with quite a few friends. / I'm surrounded by a large circle of friends.", alternative: 'hang out with / be surrounded by / have a large circle of', tag: 'Part1' } },
      { id: '', front: 'I study hard', back: { meaning: '我努力学习（升级表达）', example: 'I stick to my daily study routine. / I dedicate myself to studying regularly.', alternative: 'stick to a routine / dedicate myself to / maintain a consistent schedule', tag: 'Part1' } },
      { id: '', front: 'I very like...', back: { meaning: '我非常喜欢（中式纠正）', example: "I'm really keen on... / I have a real passion for...", alternative: "be really keen on / have a passion for / be crazy about", tag: 'Part1' } },
      { id: '', front: 'let / make (使役)', back: { meaning: '避免过度使用 let/make', example: 'give me a feeling of → upset me → exhilarate me → this happens out of...', alternative: 'upset / exhilarate / delight / annoy — 直接用动词，不用 let/make', tag: 'Part3' } },
    ],
  },
  {
    title: '高频形容词进阶',
    description: '常见形容词 → 高级替换，丰富词汇多样性',
    cards: [
      { id: '', front: 'good', back: { meaning: '好的（升级）', example: 'a rewarding experience / a beneficial habit / an appealing idea', alternative: 'rewarding / beneficial / appealing / fulfilling / favorable', tag: 'Part1' } },
      { id: '', front: 'nice', back: { meaning: '不错的（升级）', example: 'a delightful evening / a pleasant conversation / a lovely view', alternative: 'delightful / pleasant / lovely / charming / enjoyable', tag: 'Part1' } },
      { id: '', front: 'interesting', back: { meaning: '有趣的（升级）', example: 'a fascinating story / an engaging discussion / a thought-provoking question', alternative: 'fascinating / engaging / thought-provoking / captivating / intriguing', tag: 'Part2' } },
      { id: '', front: 'important', back: { meaning: '重要的（升级）', example: 'This is a meaningful job. / Education is essential for growth.', alternative: 'meaningful / essential / vital / significant / crucial', tag: 'Part2' } },
      { id: '', front: 'busy', back: { meaning: '忙碌的（升级）', example: 'I have a hectic schedule. / My day is fully scheduled.', alternative: 'occupied / hectic / fully scheduled / tied up / packed', tag: 'Part1' } },
      { id: '', front: 'happy', back: { meaning: '开心的（升级）', example: 'I feel quite content with life. / He looked cheerful all day.', alternative: 'content / fulfilled / cheerful / delighted / joyful', tag: 'Part1' } },
      { id: '', front: 'relaxed', back: { meaning: '放松的（升级）', example: 'I feel refreshed after a walk. / The atmosphere is calm and peaceful.', alternative: 'refreshed / calm / peaceful / stress-free / at ease', tag: 'Part2' } },
      { id: '', front: 'bad', back: { meaning: '不好的（升级）', example: 'a troublesome issue / inconvenient timing / an exhausting day', alternative: 'troublesome / inconvenient / exhausting / overwhelming / unpleasant', tag: 'Part2' } },
      { id: '', front: 'kind', back: { meaning: '善良的（升级）', example: 'a considerate person / a warm-hearted neighbor', alternative: 'considerate / warm-hearted / thoughtful / caring / generous', tag: 'Part1' } },
      { id: '', front: 'easy-going', back: { meaning: '随和的（升级）', example: 'a laid-back attitude / an approachable teacher', alternative: 'laid-back / approachable / relaxed / chill / easy to get along with', tag: 'Part1' } },
      { id: '', front: 'hard-working', back: { meaning: '努力的（升级）', example: 'a diligent student / a motivated employee', alternative: 'diligent / motivated / dedicated / committed / driven', tag: 'Part2' } },
      { id: '', front: 'beautiful', back: { meaning: '美丽的（升级）', example: 'a stunning sunset / a scenic mountain road / a vibrant city', alternative: 'stunning / scenic / serene / vibrant / breathtaking / gorgeous', tag: 'Part2' } },
      { id: '', front: 'useful', back: { meaning: '有用的（升级）', example: 'a practical skill / a versatile tool / an effective method', alternative: 'practical / solid / versatile / effective / handy / valuable', tag: 'Part3' } },
      { id: '', front: 'many', back: { meaning: '很多的（升级）', example: 'There are numerous options. / I have plenty of ideas / a wide range of topics.', alternative: 'numerous / plenty of / a wide range of / countless / various', tag: 'Part1' } },
      { id: '', front: 'hard / difficult', back: { meaning: '困难的（升级）', example: 'a demanding task / a challenging exam / a tricky question', alternative: 'demanding / challenging / tricky / tough / daunting', tag: 'Part2' } },
      { id: '', front: 'confident', back: { meaning: '自信的（升级）', example: 'a self-assured speaker / a bold decision', alternative: 'self-assured / bold / assertive / poised / fearless', tag: 'Part2' } },
    ],
  },
  {
    title: '中式句型改写',
    description: '常见 Chinglish → Native 自然表达',
    cards: [
      { id: '', front: 'I very like reading book.', back: { meaning: '我非常喜欢读书', example: 'I love picking up books whenever I have spare time.', alternative: 'pick up books / whenever I have spare time → 替代 very like + 时间状语升级', tag: 'Part1' } },
      { id: '', front: 'My hobby is read novel every day.', back: { meaning: '我的爱好是每天看小说', example: 'I like going through novels on a daily basis.', alternative: 'go through novels / on a daily basis → 替代 hobby is read + every day', tag: 'Part1' } },
      { id: '', front: 'When I free, I always sit down and see book.', back: { meaning: '我有空就坐下来看书', example: "Whenever I'm not busy, I'll settle down and do some reading quietly.", alternative: "Whenever I'm not busy / settle down / do some reading → 替代 When I free + see book", tag: 'Part1' } },
      { id: '', front: 'Reading can let me know many knowledge.', back: { meaning: '读书能让我学到很多知识', example: 'I can learn new things and pick up fresh ideas from reading.', alternative: 'learn new things / pick up fresh ideas → 替代 let me know + knowledge', tag: 'Part2' } },
      { id: '', front: 'make my brain become more smart', back: { meaning: '让我变聪明', example: 'It helps me stay sharp and think more clearly every day.', alternative: 'stay sharp / think more clearly → 替代 make brain smart', tag: 'Part2' } },
      { id: '', front: 'I think reading very good.', back: { meaning: '我觉得读书很好', example: 'Reading fits my daily lifestyle really well.', alternative: 'fits my lifestyle well → 替代 I think + very good', tag: 'Part1' } },
      { id: '', front: 'I will keep read all my life.', back: { meaning: '我这一生都会读书', example: 'I plan to stick with this habit for a really long time.', alternative: 'stick with this habit / for a really long time → 替代 keep read + all my life', tag: 'Part2' } },
      { id: '', front: 'I love my family (抽象)', back: { meaning: '把抽象概念转成具体行动', example: 'My family means everything to me.', alternative: 'means everything to me → 替代 I love my family', tag: 'Part1' } },
      { id: '', front: 'I love playing with my phone (抽象)', back: { meaning: '把抽象概念转成具体行动', example: "I can't get away from doom-scrolling.", alternative: "can't get away from / doom-scrolling → 替代 love playing with phone", tag: 'Part2' } },
      { id: '', front: '因为下雨，所以我没出门', back: { meaning: '中文先因后果→英文先果后因', example: "I didn't go out because it rained.", alternative: "先果后因：I didn't go out → because it rained （结果在前，原因在后）", tag: 'Part3' } },
      { id: '', front: '因为很有趣，所以我喜欢', back: { meaning: '中文先因后果→英文先果后因', example: "I like it because it's fun.", alternative: "先果后因：I like it → because it's fun （结果在前，原因在后）", tag: 'Part3' } },
      { id: '', front: 'My phone helps me a lot (抽象)', back: { meaning: '把抽象概念转成具体行动', example: 'My phone is almost like an extension part of my arm.', alternative: 'like an extension part of my arm → 替代 helps me a lot', tag: 'Part2' } },
    ],
  },
  {
    title: '连接词升级',
    description: '告别单调的连接词，让表达更流畅自然',
    cards: [
      { id: '', front: 'and', back: { meaning: '并列递进', example: 'I like reading. Besides, I also enjoy writing. On top of that, I paint.', alternative: 'besides / on top of that / plus / likewise / in addition', tag: 'Part1' } },
      { id: '', front: 'because', back: { meaning: '因果关系', example: 'I chose this major since it offers great prospects. The main reason is that I love law.', alternative: 'since / as / the main reason is that / due to the fact that', tag: 'Part2' } },
      { id: '', front: 'so', back: { meaning: '所以', example: "I was tired, therefore I went to bed early. As a result, I felt refreshed the next day.", alternative: "therefore / as a result / that's why / consequently / thus", tag: 'Part2' } },
      { id: '', front: 'but', back: { meaning: '转折对比', example: 'I like the city. However, the noise bothers me. Conversely, some people love the energy.', alternative: 'however / yet / conversely / on the contrary / nevertheless', tag: 'Part3' } },
      { id: '', front: 'for example', back: { meaning: '举例补充', example: 'I enjoy outdoor activities. For instance, I go hiking every weekend. Such as climbing and camping.', alternative: 'for instance / such as / to give you an example / take... as an example', tag: 'Part2' } },
      { id: '', front: 'in a word', back: { meaning: '总结收尾', example: 'Overall, this experience was rewarding. Generally speaking, I benefited a lot from it.', alternative: 'overall / generally speaking / all in all / to sum up / in conclusion', tag: 'Part3' } },
      { id: '', front: 'although', back: { meaning: '表达让步', example: 'Despite the difficulties, I kept trying. Even though it rained, we still went out.', alternative: 'despite / in spite of / even though / regardless of', tag: 'Part3' } },
      { id: '', front: 'then', back: { meaning: '时间顺序', example: 'I finished my homework. Afterwards, I watched TV. Eventually, I went to sleep.', alternative: 'later on / afterwards / eventually / subsequently / after that', tag: 'Part2' } },
      { id: '', front: 'first', back: { meaning: '首先', example: 'To start with, let me talk about the benefits. Initially, I was nervous but then I relaxed.', alternative: 'to start with / initially / first of all / to begin with / in the first place', tag: 'Part2' } },
      { id: '', front: 'I think (换角度)', back: { meaning: '表达观点（换角度说）', example: "From my perspective, it's a good idea. As far as I'm concerned, education is the key.", alternative: "from my perspective / personally speaking / in my view / as far as I'm concerned / from where I stand", tag: 'Part1' } },
      { id: '', front: 'very', back: { meaning: '强调语气', example: "This is particularly important. I'm extremely grateful for the help. It's fairly common now.", alternative: 'particularly / especially / extremely / highly / fairly / remarkably', tag: 'Part1' } },
      { id: '', front: 'if', back: { meaning: '条件衔接', example: 'Provided that you study hard, you will succeed. As long as you try, anything is possible.', alternative: 'provided that / suppose that / assuming that / as long as / on condition that', tag: 'Part3' } },
    ],
  },
  {
    title: '感受类万能短语',
    description: '表达感受、成就、放松等场景的高级短语',
    cards: [
      { id: '', front: '成就感', back: { meaning: 'a sense of fulfillment / achievement', example: 'Volunteering gives me a deep sense of satisfaction. I felt a profound sense of accomplishment after the project.', alternative: 'a sense of satisfaction / a sense of achievement / a feeling of accomplishment / a profound sense of pride', tag: 'Part2' } },
      { id: '', front: '放松休息', back: { meaning: 'wind down / unwind / chill out', example: 'After a long day, I need to wind down and relax. On weekends, I just wanna chill out at home.', alternative: 'wind down / unwind / chill out / take it easy / ease off / release pressure', tag: 'Part2' } },
      { id: '', front: '开阔眼界', back: { meaning: 'broaden my horizons / expand my vision', example: 'Traveling really broadens my horizons. Reading widens my outlook on life and enriches my experience.', alternative: 'broaden horizons / expand vision / widen outlook / enrich experience / open my mind', tag: 'Part3' } },
      { id: '', front: '丰富生活', back: { meaning: 'enrich my daily life / add color to life', example: 'Music enriches my daily life. Hobbies add color to my routine and make my life more fulfilling.', alternative: 'enrich my life / add color to life / make life fulfilling / diversify my routine / spice up my life', tag: 'Part2' } },
      { id: '', front: '情绪愉悦', back: { meaning: 'cheerful / content / delighted', example: 'I feel quite content with my current life. The good news exhilarated me all day.', alternative: 'cheerful / content / delighted / exhilarated / over the moon', tag: 'Part1' } },
      { id: '', front: '压力释放', back: { meaning: 'release pressure / ease off', example: 'Exercise helps me release pressure. Sometimes you just need to take it easy and let go.', alternative: 'release pressure / ease off / take it easy / let go / blow off steam', tag: 'Part2' } },
    ],
  },
  {
    title: '口语语气词 & 过渡',
    description: '避免en/额等中式语气词，使用自然的英语过渡',
    cards: [
      { id: '', front: '推荐语气词', back: { meaning: '自然过渡的填充词', example: 'Well, you know, actually, it depends on the situation. Umm, basically, I think...', alternative: 'you know / umm / actually / basically / well / I mean / like', tag: 'Part1' } },
      { id: '', front: '卡壳时用', back: { meaning: '卡住时自然过渡', example: '用 you know / umm / actually / basically 来填节奏，保持流利感。千万不要用"en"（太中式）', alternative: 'you know / umm / actually / basically / well — 替代 en / 额 / 嗯', tag: 'Part1' } },
      { id: '', front: '拖延技巧', back: { meaning: '遇到刁钻问题如何拖延', example: "Well, to be honest, that's a pretty tough question and I've never thought about it before, but if I have to say...", alternative: "That's a tough question / I've never thought about it / but if I have to say...", tag: 'Part3' } },
      { id: '', front: '转化技巧', back: { meaning: '把抽象问题转到自身经历', example: "I have no idea about others' thoughts, but as for me, I would say definitely there are some differences.", alternative: "I have no idea about others / but as for me / personally — 从抽象转到具体自身", tag: 'Part3' } },
      { id: '', front: '别叫考官teacher/examiner', back: { meaning: '考场上正确称呼', example: '用 sir / madam，或直接省略称呼开始回答。不会不礼貌，反而节约时间避免尴尬。', alternative: 'sir / madam / 省略称呼直接回答 → 替代 teacher / examiner', tag: 'Part1' } },
    ],
  },
  {
    title: 'Part 2 延展技巧',
    description: 'Cue Card回答中的Extension核心技巧',
    cards: [
      { id: '', front: 'Extension = 两句拓延', back: { meaning: '围绕特殊疑问句核心，用两句话补充细节', example: "基础：It's an ice lolly. → 延展：So, it's just a chocolate ice lolly I bought from the nearest store.", alternative: 'chocolate / from the nearest store → 颜色+地点细节补充', tag: 'Part2' } },
      { id: '', front: '最后一句 = 最重要', back: { meaning: '最后一问（原因/感受）是重点', example: '问原因→给两个原因（since... plus...）；问感受→给两种情绪（I feel... and also...）', alternative: '两个原因 / 两种情绪 → 必须详细展开，各2-3句', tag: 'Part2' } },
      { id: '', front: '前3题各1-2句', back: { meaning: '前三问简洁回答+细节即可', example: 'What → 说出是什么 + 细节描述（形状/颜色/品牌）。How much → 金额 + 对比评价。', alternative: '一句话回答基础 + 一句话补充细节 → 两句话搞定', tag: 'Part2' } },
      { id: '', front: '避免审讯式问答', back: { meaning: '追求陈述感、演讲感、自然对话', example: '不要重复问题 → 直接给出陈述式回答 → 用自然的衔接词串联每个问题', alternative: '陈述感 / 演讲感 / 自然对话 → 替代一问一答的机械感', tag: 'Part2' } },
    ],
  },
  {
    title: 'Part 3 辩证表达',
    description: 'Part 3 深度讨论中的站队、让步、回扣技巧',
    cards: [
      { id: '', front: '中庸型站队结构', back: { meaning: 'O → 让步(让步对方观点) → 支撑(自己的理由) → 回扣(O)', example: 'I agree that phones are useful. Though they can be distracting, they help us stay connected. So overall, I support their use.', alternative: 'Though... → But... → So in conclusion — 先让步再反驳，显得客观', tag: 'Part3' } },
      { id: '', front: '单向型站队结构', back: { meaning: 'O → 支撑1(充分展开) → 支撑2(充分展开) → 回扣(O)', example: "I believe technology benefits us. Firstly, it makes life convenient — I can order food, book tickets instantly. Plus, it connects people — I video call my family abroad every week. So yes, it's a blessing.", alternative: 'Firstly / Plus / So yes — 去掉让步，两个支撑都充分展开', tag: 'Part3' } },
      { id: '', front: '特殊疑问类', back: { meaning: '开放性问题直接走 O-R-E-D', example: '简单问题给2个原因（Firstly... Secondly...），困难问题给1个原因但充分展开。问"方式"可跳过R直接ED。', alternative: '简单→2原因 / 困难→1原因 / 问方式→跳过R直接用ED', tag: 'Part3' } },
      { id: '', front: '二元对立类', back: { meaning: '总起(O) → A方(ED) → B方(ED)', example: 'As for us youngsters, we use phones for social media and study apps. But for senior citizens, they mainly use phones for basic calls and messages.', alternative: 'As for A... / But for B... — 两个群体分别叙述，不做优劣判断', tag: 'Part3' } },
    ],
  },
]

export const seedTemplates: Omit<SpeakingTemplate, 'id' | 'createdAt' | 'updatedAt' | 'locked'>[] = [
  {
    topic: 'Part 1 ORED 答题框架 (3句话 · 20秒)',
    sections: [
      {
        id: '',
        title: 'O - Opinion 观点 (第1句)',
        points: [
          '二元对立问题：直接站队 Yes/No/Definitely/Not really',
          '模糊回答也允许：I wouldn\'t say... / That\'s hard to say, but...',
          '转化技巧：问抽象问题→转化到自身 "I have no idea about others, but as for me..."',
          '拖延技巧：遇到刁钻问题 "Well, to be honest, that\'s a pretty tough question, but if I have to say..."',
          '核心原则：怎么想就怎么答，敢表达就完事儿了',
        ],
      },
      {
        id: '',
        title: 'R - Reason 原因 (第2句)',
        points: [
          '主观意愿问题 → 必须回答原因（like/prefer/enjoy类）',
          '客观身份问题 → 跳过R，直接进入E/D补充',
          '原因融入例子，不一定要单独说 "because..."',
          '一个理由就够，P1不需要两个原因',
        ],
      },
      {
        id: '',
        title: 'E/D - Example / Detail (第3句)',
        points: [
          '用自身例子，不要背名人例子（5.5-6.5分段特别要注意）',
          '旅游经历、工作生活、日常习惯 → 真实才自然',
          '不能说原因也不能举例时 → 补充细节（I\'m a freshman at XX university）',
          '保证三句话说完就停，不要拖',
        ],
      },
    ],
  },
  {
    topic: 'Part 2 Cue Card 答题框架 (2分钟)',
    sections: [
      {
        id: '',
        title: '准备阶段 (1分钟)',
        points: [
          '快速阅读4个问题，确定话题内容',
          '重点标记最后一个问题（原因/感受类），这是主力输出',
          '纸笔只记关键词，不要写完整句子',
          '按顺序回答，自然衔接',
        ],
      },
      {
        id: '',
        title: '回答阶段：前3题',
        points: [
          '每题1-2句，根据特殊疑问词确定主题',
          '一句话回答基础 + 一句话补充细节',
          'What → 说出是什么 + 颜色/味道/地点等细节',
          'How much → 说出金额 + 贵还是便宜的对比感受',
          'Why → 一句话说原因 + 场景补充',
          '追求陈述感，不要重复问题',
        ],
      },
      {
        id: '',
        title: '回答阶段：最后一题（重点）',
        points: [
          '问原因 → 给出两个原因，每个原因2-3句展开',
          '问感受 → 给出两种情绪，每种附带具体事例',
          '用Extension技巧：围绕核心，两句话拓延',
          '避免跑题——每次补充细节后自检是否扣题',
          '两个原因之间用 Plus / Besides / On top of that 自然过渡',
        ],
      },
    ],
  },
  {
    topic: 'Part 3 辩证回答框架 (40-60秒)',
    sections: [
      {
        id: '',
        title: '一般疑问类 — 选择/二元对立',
        points: [
          '必须站队：支持/反对/模糊（模糊只是缓冲，最终必须选一边）',
          '中庸型（推荐新手）：站队→让步(承认对方合理性)→支撑(自己观点)→回扣',
          '单向型（适合有把握时）：站队→支撑1(充分展开)→支撑2(充分展开)→回扣',
          '每方面原因只需一个，但要用E+D充分展开',
        ],
      },
      {
        id: '',
        title: '二元对立类 — 对比分析',
        points: [
          '总起：承认差异存在 "There are various differences between..."',
          'A方叙述：用自身或典型例子展开（如年轻人→社交媒体/多任务）',
          'B方叙述：对应展开（如老年人→基础功能/单一用途）',
          '不做优劣判断，只陈述差异即可',
          '可用 As for..., But for... 清晰切分两个群体',
        ],
      },
      {
        id: '',
        title: '特殊疑问类 — 开放性',
        points: [
          '正面回答→走O-R-E-D，不需要选择站队',
          '体现辩证性：充分理由 + 贴切例子（而非站队）',
          '简单问题给2个原因，困难问题给1个原因',
          '问"方式"而非"原因"时可以跳过R，直接用E+D',
          '时长控制：2个原因≈40-50秒，1个原因≈30-40秒',
        ],
      },
    ],
  },
  {
    topic: '内容表达核心原则',
    sections: [
      {
        id: '',
        title: '三大思维转换',
        points: [
          '少用 let/make → give me a feeling of / upset me / exhilarate me / this happens out of...',
          '中文先因后果→英文先果后因：I didn\'t go out because it rained. I like it because it\'s fun.',
          '抽象概念→实际行动：I love my family → My family means everything to me',
          '口语核心 = 结构 + 内容 + 语言（结构骨架、内容血肉、语言外表）',
          '5.5→6.5 关键：结构清晰 + 内容充实 > 堆砌高级词汇',
        ],
      },
      {
        id: '',
        title: '考场上不要做的事',
        points: [
          '不要叫考官 teacher / examiner → 叫 sir/madam 或省略称呼',
          '不要背"高级替换词" → 现场想不起来反而卡壳',
          '不要背预制 Sample Answers → 风马牛不相及的语料硬套=直接炸刚',
          '不要用 en（太中式）→ 用 you know / umm / actually / basically 过渡',
          '不要把答案变成审讯 → 追求陈述感，不要一问一答的机械感',
        ],
      },
      {
        id: '',
        title: '评分真相',
        points: [
          '7分：表达流利，偶尔犹豫重复；词汇灵活讨论一系列话题；语法结构通常准确',
          '6分：表达较流利，频繁犹豫重复；词汇有一定多样性偶有不当；结合简单与复杂句偶有错误',
          '关键洞察：词汇多样≠用花哨词汇显摆；让对方听懂 > 炫耀词汇量',
          '结构清晰 + 内容充实 = 永恒底层逻辑，具备这两样才能真正流利',
          'Part 1=干脆20秒3句话；Part 2=延展1.5分钟；Part 3=辩证40-60秒',
        ],
      },
    ],
  },
]

/* ========================================
   肌タイプ診断 – トラフィックストッパー
   ======================================== */

/* ----------------------------------------
   1. コンフィグ・データ定義
   ---------------------------------------- */
const CONFIG = {
  event: {
    name:     '@cosme FD EVENT',
    date:     '2026.6.XX',
    product:  'FOUNDATION',
  },

  questions: [
    {
      id: 1,
      text: '今日なりたい印象は？',
      options: [
        { label: 'A', icon: '✨', text: 'もっとキラキラ輝きたい' },
        { label: 'B', icon: '💎', text: 'スッキリ・上品に整えたい' },
      ],
    },
    {
      id: 2,
      text: '気になる肌悩みは？',
      options: [
        { label: 'A', icon: '💧', text: 'くすみ・乾燥・暗さが気になる' },
        { label: 'B', icon: '🌿', text: 'テカリ・毛穴・崩れが気になる' },
      ],
    },
    {
      id: 3,
      text: '好きな仕上がりイメージは？',
      options: [
        { label: 'A', icon: '🌟', text: 'みずみずしい光沢感' },
        { label: 'B', icon: '🌸', text: 'さらっとパウダー感' },
      ],
    },
    {
      id: 4,
      text: '今日の気分は？',
      options: [
        { label: 'A', icon: '💄', text: '華やかにキメたい' },
        { label: 'B', icon: '🍃', text: '自然体が一番' },
      ],
    },
    {
      id: 5,
      text: 'メイクで大切にしたいのは？',
      options: [
        { label: 'A', icon: '🔆', text: 'ツヤ・光感・透明感' },
        { label: 'B', icon: '🛡️', text: '崩れにくさ・均一な仕上がり' },
      ],
    },
  ],

  /* 各回答に対する6タイプへのスコア加算 */
  scores: {
    /* [Q index][option index] → { type: score } */
    /* Q1 */
    '0-0': { bakamote_glow: 3, toumei_glow: 1, tafuku_glow: 2, moreka_smooth: 0, motokara_smooth: 0, seiketsu_smooth: 0 },
    '0-1': { bakamote_glow: 0, toumei_glow: 0, tafuku_glow: 0, moreka_smooth: 2, motokara_smooth: 1, seiketsu_smooth: 3 },
    /* Q2 */
    '1-0': { bakamote_glow: 1, toumei_glow: 3, tafuku_glow: 1, moreka_smooth: 0, motokara_smooth: 1, seiketsu_smooth: 0 },
    '1-1': { bakamote_glow: 0, toumei_glow: 0, tafuku_glow: 0, moreka_smooth: 3, motokara_smooth: 1, seiketsu_smooth: 2 },
    /* Q3 */
    '2-0': { bakamote_glow: 2, toumei_glow: 2, tafuku_glow: 3, moreka_smooth: 0, motokara_smooth: 0, seiketsu_smooth: 0 },
    '2-1': { bakamote_glow: 0, toumei_glow: 0, tafuku_glow: 0, moreka_smooth: 2, motokara_smooth: 3, seiketsu_smooth: 2 },
    /* Q4 */
    '3-0': { bakamote_glow: 3, toumei_glow: 0, tafuku_glow: 2, moreka_smooth: 2, motokara_smooth: 0, seiketsu_smooth: 1 },
    '3-1': { bakamote_glow: 0, toumei_glow: 2, tafuku_glow: 1, moreka_smooth: 1, motokara_smooth: 3, seiketsu_smooth: 2 },
    /* Q5 */
    '4-0': { bakamote_glow: 2, toumei_glow: 3, tafuku_glow: 2, moreka_smooth: 0, motokara_smooth: 0, seiketsu_smooth: 0 },
    '4-1': { bakamote_glow: 0, toumei_glow: 0, tafuku_glow: 0, moreka_smooth: 2, motokara_smooth: 2, seiketsu_smooth: 3 },
  },

  results: {
    bakamote_glow: {
      key:      'bakamote_glow',
      category: 'GLOW',
      name:     '爆モテGLOW',
      tagline:  '輝きで人を惹きつける、存在感MAX！',
      color1:   '#ffd700',
      color2:   '#ff85a1',
      desc:     '光をまとうようなツヤ感で、どんな場所でも視線を集める存在に。あなたの魅力を最大限に引き出すGLOW仕上げが、今日の主役にしてくれます。',
      tips: [
        { icon: '✨', title: 'ハイライトで骨格を際立てる', body: '頬骨・鼻筋・眉山にハイライトを重ねると、立体感がUPして"爆モテ顔"に近づきます。' },
        { icon: '💧', title: '保湿でツヤの土台をつくる', body: 'ツヤ仕上がりは土台の保湿が命。化粧水→美容液→乳液の3ステップを丁寧に。' },
        { icon: '💄', title: 'リップはグロスで仕上げて', body: 'リップにグロスをプラスすることで、全体の印象が"艶やか美人"にまとまります。' },
      ],
      receiptLines: [
        '【診断結果】爆モテGLOW',
        'あなたにおすすめ: ツヤ系ファンデ',
        '輝きで魅了する、存在感あふれる',
        'GLOW仕上がりがぴったりです。',
      ],
    },

    toumei_glow: {
      key:      'toumei_glow',
      category: 'GLOW',
      name:     '透明感覚醒GLOW',
      tagline:  '肌の奥からにじむ、澄んだ輝き',
      color1:   '#7ecfd6',
      color2:   '#f2a7c3',
      desc:     '雑味のない、透き通るような光感が魅力。くすみゼロの肌で、素肌が完璧に整ったような自然な輝きを放てます。',
      tips: [
        { icon: '🍋', title: 'ビタミンCで透明感をキープ', body: '朝のスキンケアにビタミンC誘導体をプラスして、くすみの元になるメラニンをケア。' },
        { icon: '💦', title: '下地は薄づきで透明感を邪魔しない', body: '色付き下地は薄く均一に伸ばすのがコツ。重ねすぎると透明感が失われます。' },
        { icon: '✨', title: 'パールハイライトで奥行きを', body: '目頭や眉下にパール系ハイライトをさりげなく仕込むと、立体的な透明感が生まれます。' },
      ],
      receiptLines: [
        '【診断結果】透明感覚醒GLOW',
        'あなたにおすすめ: クリア系ツヤファンデ',
        '澄んだ輝きで素肌美人に。',
        'くすみゼロの透明肌を叶えます。',
      ],
    },

    tafuku_glow: {
      key:      'tafuku_glow',
      category: 'GLOW',
      name:     '多幸感GLOW',
      tagline:  '幸せオーラが溢れ出す、ハッピーな輝き',
      color1:   '#ffb347',
      color2:   '#ff85a1',
      desc:     'ふんわりとした光感と、自然な血色感が合わさったような幸せオーラが魅力。見ているだけで元気をもらえる、ポジティブな輝きがあなたの個性です。',
      tips: [
        { icon: '🌸', title: 'チークを高めに入れて幸せ顔に', body: '頬の高い位置に淡いピンクのチークを入れると、ふんわり幸せそうな顔立ちになります。' },
        { icon: '🌟', title: 'ファンデは保湿系タイプを選んで', body: '乾燥すると幸せオーラが半減。保湿成分が豊富なツヤ系ファンデが相性◎。' },
        { icon: '💛', title: '暖色系メイクで統一感を', body: 'ピンク・コーラル・オレンジでメイクを統一すると、自然と多幸感が増します。' },
      ],
      receiptLines: [
        '【診断結果】多幸感GLOW',
        'あなたにおすすめ: 保湿ツヤ系ファンデ',
        '幸せオーラが溢れる血色感ある',
        'GLOW仕上がりがベストマッチ！',
      ],
    },

    moreka_smooth: {
      key:      'moreka_smooth',
      category: 'SMOOTH',
      name:     '盛れ確SMOOTH',
      tagline:  '完璧カバーで、最高の自分に',
      color1:   '#a8c8d8',
      color2:   '#c8b89a',
      desc:     'カバー力と仕上がりの美しさを両立。毛穴・シミ・色ムラをしっかりカバーしながら、やりすぎ感のないスムース仕上がりで"盛れ確定"の肌を演出します。',
      tips: [
        { icon: '🛡️', title: '崩れ防止下地でカバーを長持ちさせる', body: '皮脂コントロール系の下地を使うことで、ファンデのカバー力を一日中キープ。' },
        { icon: '🪄', title: 'コンシーラーで部分カバーを強化', body: '気になる部分だけコンシーラーを重ねると、カバー力が上がりつつ自然な仕上がりに。' },
        { icon: '💎', title: 'セッティングパウダーは必須', body: '仕上げのパウダーをはたくと崩れにくさが格段にUP。Tゾーンは特に念入りに。' },
      ],
      receiptLines: [
        '【診断結果】盛れ確SMOOTH',
        'あなたにおすすめ: カバー系スムースファンデ',
        '完璧なカバーで最高の自分に。',
        '崩れ知らずのスムース肌を実現！',
      ],
    },

    motokara_smooth: {
      key:      'motokara_smooth',
      category: 'SMOOTH',
      name:     '元から美肌SMOOTH',
      tagline:  'すっぴん以上の、ナチュラル美肌',
      color1:   '#d4b8e8',
      color2:   '#c8b89a',
      desc:     '素肌感を残しながらキレイに整えたような、ナチュラルビューティーが光ります。「そのまま？」と言われる無敵の素肌仕上がりを実現。',
      tips: [
        { icon: '🫧', title: '洗顔はぬるま湯でやさしく', body: 'バリア機能を守ることが素肌美の基本。熱いお湯・ゴシゴシは禁物です。' },
        { icon: '🌿', title: '下地は薄く・均一に', body: '素肌感を出すには量を少なめに。スポンジで押さえるように伸ばすと自然な仕上がりに。' },
        { icon: '✨', title: '引き算でナチュラル感を演出', body: '全体でカバーよりも、コンシーラーで気になる部分だけ補正する"引き算メイク"が正解。' },
      ],
      receiptLines: [
        '【診断結果】元から美肌SMOOTH',
        'あなたにおすすめ: 素肌感スムースファンデ',
        '素肌以上の自然な美肌感に。',
        'ナチュラルなスムース仕上がりが◎！',
      ],
    },

    seiketsu_smooth: {
      key:      'seiketsu_smooth',
      category: 'SMOOTH',
      name:     '清潔感無双SMOOTH',
      tagline:  'クリーンで凛とした、完璧な印象',
      color1:   '#5a7a8f',
      color2:   '#a8c8d8',
      desc:     'テカりゼロのマット肌で、どんな場面でも清潔感あふれる印象を作れます。時間が経っても崩れにくく、凛とした美しさが続きます。',
      tips: [
        { icon: '🌬️', title: 'Tゾーンはあぶらとり紙で管理', body: '午後のテカりはあぶらとり紙で対応。押さえるだけでサラサラが復活します。' },
        { icon: '💎', title: 'フィニッシングパウダーで仕上げる', body: 'ファンデの上から薄くはたくだけで、皮脂によるテカりを長時間ブロック。' },
        { icon: '🚿', title: '夜のクレンジングを丁寧に', body: '翌朝の清潔感は前夜のクレンジング次第。毛穴の汚れをしっかり落とすことが大切。' },
      ],
      receiptLines: [
        '【診断結果】清潔感無双SMOOTH',
        'あなたにおすすめ: マット系スムースファンデ',
        'テカりゼロで凛とした清潔感。',
        '崩れにくいマット仕上がりが最適！',
      ],
    },
  },
};

/* ----------------------------------------
   2. 状態管理
   ---------------------------------------- */
const state = {
  answers:    [],   // [optionIndex, optionIndex, ...]  各問の回答インデックス
  currentQ:  0,
  resultKey: null,
};

/* ----------------------------------------
   3. 画面切り替え
   ---------------------------------------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
}

/* ----------------------------------------
   4. クイズ
   ---------------------------------------- */
function startQuiz() {
  state.answers   = [];
  state.currentQ  = 0;
  state.resultKey = null;
  renderQuestion(0);
  showScreen('screen-quiz');
}

function renderQuestion(index) {
  const q       = CONFIG.questions[index];
  const total   = CONFIG.questions.length;
  const pct     = ((index) / total) * 100;

  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-progress-label').textContent = `${index + 1} / ${total}`;

  const body = document.getElementById('quiz-body');
  body.innerHTML = `
    <div class="quiz-qnum">Q${q.id}</div>
    <h2 class="quiz-question">${q.text}</h2>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" onclick="answerQuestion(${index}, ${i})">
          <span class="opt-icon">${opt.icon}</span>
          <span class="opt-label">${opt.label}</span>
          <span class="opt-text">${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function answerQuestion(qIndex, optIndex) {
  state.answers[qIndex] = optIndex;

  if (qIndex + 1 < CONFIG.questions.length) {
    state.currentQ = qIndex + 1;
    renderQuestion(qIndex + 1);
  } else {
    // 全問完了 → スキャン演出
    startScan();
  }
}

/* ----------------------------------------
   5. スキャン演出
   ---------------------------------------- */
function startScan() {
  showScreen('screen-scan');
  const fill   = document.getElementById('scan-progress-fill');
  const status = document.getElementById('scan-status');

  const messages = [
    { pct: 20, text: '皮脂バランスをチェック中...' },
    { pct: 45, text: '水分量を測定中...' },
    { pct: 68, text: 'テクスチャー適性を解析中...' },
    { pct: 88, text: 'あなたのタイプを特定中...' },
    { pct: 100, text: '解析完了！' },
  ];

  let step = 0;
  fill.style.width = '0%';

  function next() {
    if (step >= messages.length) {
      // 結果へ
      setTimeout(() => {
        calcResult();
        renderResult();
        showScreen('screen-result');
      }, 600);
      return;
    }
    const m = messages[step++];
    fill.style.width   = m.pct + '%';
    status.textContent = m.text;
    setTimeout(next, 480);
  }
  setTimeout(next, 300);
}

/* ----------------------------------------
   6. 診断スコア計算
   ---------------------------------------- */
function calcResult() {
  const scores = {
    bakamote_glow:   0,
    toumei_glow:     0,
    tafuku_glow:     0,
    moreka_smooth:   0,
    motokara_smooth: 0,
    seiketsu_smooth: 0,
  };

  state.answers.forEach((optIndex, qIndex) => {
    const key    = `${qIndex}-${optIndex}`;
    const bonus  = CONFIG.scores[key];
    if (bonus) {
      Object.keys(bonus).forEach(type => { scores[type] += bonus[type]; });
    }
  });

  // 最高スコアのタイプを結果に
  state.resultKey = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
}

/* ----------------------------------------
   7. 結果画面レンダリング
   ---------------------------------------- */
function renderResult() {
  const r = CONFIG.results[state.resultKey];

  document.getElementById('result-cat-badge').textContent  = r.category;
  document.getElementById('result-cat-badge').className    = `result-cat-badge cat-${r.category.toLowerCase()}`;
  document.getElementById('result-name').textContent       = r.name;
  document.getElementById('result-tagline').textContent    = r.tagline;

  const header = document.getElementById('result-header');
  header.style.background = `linear-gradient(135deg, ${r.color1}33, ${r.color2}44)`;
  header.style.borderBottom = `3px solid ${r.color1}`;

  const tipsHTML = r.tips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div>
        <p class="tip-title">${tip.title}</p>
        <p class="tip-body">${tip.body}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('result-body').innerHTML = `
    <div class="result-desc-card">
      <p class="result-desc">${r.desc}</p>
    </div>
    <div class="result-tips">
      <p class="tips-heading">✦ お手入れのポイント</p>
      ${tipsHTML}
    </div>
  `;
}

/* ----------------------------------------
   8. レシート画面
   ---------------------------------------- */
function goToReceipt() {
  const r   = CONFIG.results[state.resultKey];
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

  const lines = r.receiptLines.map(l => `<div class="rc-line">${l}</div>`).join('');
  const tips  = r.tips.map(t => `<div class="rc-tip">・${t.title}</div>`).join('');

  document.getElementById('receipt-content').innerHTML = `
    <div class="rc-header">
      <div class="rc-logo">${CONFIG.event.name}</div>
      <div class="rc-dash">--------------------------------</div>
      <div class="rc-date">${dateStr}</div>
      <div class="rc-dash">--------------------------------</div>
    </div>
    <div class="rc-result">
      ${lines}
    </div>
    <div class="rc-dash">--------------------------------</div>
    <div class="rc-section-title">お手入れポイント</div>
    <div class="rc-tips">${tips}</div>
    <div class="rc-dash">--------------------------------</div>
    <div class="rc-footer">
      <div>ご来場ありがとうございます</div>
      <div>スタッフにお声がけください</div>
      <div class="rc-dash">--------------------------------</div>
      <div>${CONFIG.event.product}</div>
    </div>
  `;

  showScreen('screen-receipt');
}

function goToTop() {
  state.answers   = [];
  state.currentQ  = 0;
  state.resultKey = null;
  showScreen('screen-top');
}

/* ----------------------------------------
   9. 初期化
   ---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-top');
});

/* ========================================
   肌タイプ診断 – トラフィックストッパー
   ======================================== */

/* ========================================
   1. resultMap
   5問の回答を "AAAAB" のような文字列キーに変換し
   6種の結果IDに対応させる。
   後からExcelの32パターン表をここに反映する。
   ======================================== */
const resultMap = {
  'AAAAA': 'bakamote_glow',
  'AAAAB': 'bakamote_glow',
  'AAABA': 'toumei_glow',
  'AAABB': 'toumei_glow',
  'AABAA': 'tafuku_glow',
  'AABAB': 'tafuku_glow',
  'AABBA': 'tafuku_glow',
  'AABBB': 'motokara_smooth',
  'ABAAA': 'bakamote_glow',
  'ABAAB': 'bakamote_glow',
  'ABABA': 'toumei_glow',
  'ABABB': 'tafuku_glow',
  'ABBAA': 'moreka_smooth',
  'ABBAB': 'moreka_smooth',
  'ABBBA': 'motokara_smooth',
  'ABBBB': 'seiketsu_smooth',
  'BAAAA': 'tafuku_glow',
  'BAAAB': 'tafuku_glow',
  'BAABA': 'toumei_glow',
  'BAABB': 'motokara_smooth',
  'BABAA': 'moreka_smooth',
  'BABAB': 'moreka_smooth',
  'BABBA': 'motokara_smooth',
  'BABBB': 'seiketsu_smooth',
  'BBAAA': 'moreka_smooth',
  'BBAAB': 'moreka_smooth',
  'BBABA': 'motokara_smooth',
  'BBABB': 'seiketsu_smooth',
  'BBBAA': 'motokara_smooth',
  'BBBAB': 'seiketsu_smooth',
  'BBBBA': 'seiketsu_smooth',
  'BBBBB': 'seiketsu_smooth',
};

/* ========================================
   2. 診断結果データ
   各フィールドを後から差し替えやすいようにまとめる。
   imgPath: 差し替え用のキャラクター画像パス
   luck: 3運勢（★で表示）
   luckyItem: ラッキーアイテム
   messages: randomMessages の候補（表示時に1つランダム選択）
   ======================================== */
const results = {

  bakamote_glow: {
    key:       'bakamote_glow',
    category:  'GLOW',
    name:      '爆モテGLOW',
    subCopy:   '輝きで人を惹きつける、存在感MAX！',
    desc:      '光をまとうようなツヤ感で、どんな場所でも視線を集める存在に。あなたの魅力を最大限に引き出すGLOW仕上げが、今日の主役にしてくれます。',
    color1:    '#ffd700',
    color2:    '#ff85a1',
    imgPath:     '../assets/images/chara01.png',
    imgPathMono: '../assets/images/chara01_mono.png',
    luck: {
      work:    '★★★★★',
      love:    '★★★★★',
      money:   '★★★★☆',
    },
    luckyItem: 'ゴールドアクセサリー',
    messages: [
      '今日のあなたは誰よりも輝いています。自信を持って！',
      'その笑顔が最強のコスメ。ツヤ感で更に磨きをかけて。',
      '存在感あふれる今日のあなたから、目が離せません。',
    ],
    tips: [
      { icon: '✨', title: 'ハイライトで骨格を際立てる', body: '頬骨・鼻筋・眉山にハイライトを重ねると、立体感がUPして"爆モテ顔"に近づきます。' },
      { icon: '💧', title: '保湿でツヤの土台をつくる', body: 'ツヤ仕上がりは土台の保湿が命。化粧水→美容液→乳液の3ステップを丁寧に。' },
      { icon: '💄', title: 'リップはグロスで仕上げて', body: 'リップにグロスをプラスすることで、全体の印象が"艶やか美人"にまとまります。' },
    ],
  },

  toumei_glow: {
    key:       'toumei_glow',
    category:  'GLOW',
    name:      '透明感覚醒GLOW',
    subCopy:   '肌の奥からにじむ、澄んだ輝き',
    desc:      '雑味のない、透き通るような光感が魅力。くすみゼロの肌で、素肌が完璧に整ったような自然な輝きを放てます。',
    color1:    '#7ecfd6',
    color2:    '#f2a7c3',
    imgPath:     '../assets/images/chara02.png',
    imgPathMono: '../assets/images/chara02_mono.png',
    luck: {
      work:    '★★★★☆',
      love:    '★★★★★',
      money:   '★★★☆☆',
    },
    luckyItem: 'パールアクセサリー',
    messages: [
      '透き通るような澄んだ肌が、あなたの魅力を引き立てます。',
      '光を集める透明感で、今日は誰より美しく輝いて。',
      '肌の透明感が、あなたの内側の美しさを映し出しています。',
    ],
    tips: [
      { icon: '🍋', title: 'ビタミンCで透明感をキープ', body: '朝のスキンケアにビタミンC誘導体をプラスして、くすみの元になるメラニンをケア。' },
      { icon: '💦', title: '下地は薄づきで透明感を邪魔しない', body: '色付き下地は薄く均一に伸ばすのがコツ。重ねすぎると透明感が失われます。' },
      { icon: '✨', title: 'パールハイライトで奥行きを', body: '目頭や眉下にパール系ハイライトをさりげなく仕込むと、立体的な透明感が生まれます。' },
    ],
  },

  tafuku_glow: {
    key:       'tafuku_glow',
    category:  'GLOW',
    name:      '多幸感GLOW',
    subCopy:   '幸せオーラが溢れ出す、ハッピーな輝き',
    desc:      'ふんわりとした光感と、自然な血色感が合わさったような幸せオーラが魅力。見ているだけで元気をもらえる、ポジティブな輝きがあなたの個性です。',
    color1:    '#ffb347',
    color2:    '#ff85a1',
    imgPath:     '../assets/images/chara03.png',
    imgPathMono: '../assets/images/chara03_mono.png',
    luck: {
      work:    '★★★☆☆',
      love:    '★★★★★',
      money:   '★★★★☆',
    },
    luckyItem: 'コーラルリップ',
    messages: [
      '幸せオーラが全開の今日は、素敵な出会いが待っているかも。',
      'あなたの笑顔が、周りの人を幸せにしています。',
      'ハッピーな気持ちがそのまま肌に出ています。今日もキラキラ！',
    ],
    tips: [
      { icon: '🌸', title: 'チークを高めに入れて幸せ顔に', body: '頬の高い位置に淡いピンクのチークを入れると、ふんわり幸せそうな顔立ちになります。' },
      { icon: '🌟', title: 'ファンデは保湿系タイプを選んで', body: '乾燥すると幸せオーラが半減。保湿成分が豊富なツヤ系ファンデが相性◎。' },
      { icon: '💛', title: '暖色系メイクで統一感を', body: 'ピンク・コーラル・オレンジでメイクを統一すると、自然と多幸感が増します。' },
    ],
  },

  moreka_smooth: {
    key:       'moreka_smooth',
    category:  'SMOOTH',
    name:      '盛れ確SMOOTH',
    subCopy:   '完璧カバーで、最高の自分に',
    desc:      'カバー力と仕上がりの美しさを両立。毛穴・シミ・色ムラをしっかりカバーしながら、やりすぎ感のないスムース仕上がりで"盛れ確定"の肌を演出します。',
    color1:    '#a8c8d8',
    color2:    '#c8b89a',
    imgPath:     '../assets/images/chara04.png',
    imgPathMono: '../assets/images/chara04_mono.png',
    luck: {
      work:    '★★★★★',
      love:    '★★★★☆',
      money:   '★★★★☆',
    },
    luckyItem: 'ベージュ系アイシャドウ',
    messages: [
      '今日は最高にキマっています。その自信が最強のコスメ！',
      '完璧な仕上がりが、あなたのポテンシャルをさらに引き上げます。',
      '盛れてる日は、何をやっても上手くいく予感。',
    ],
    tips: [
      { icon: '🛡️', title: '崩れ防止下地でカバーを長持ちさせる', body: '皮脂コントロール系の下地を使うことで、ファンデのカバー力を一日中キープ。' },
      { icon: '🪄', title: 'コンシーラーで部分カバーを強化', body: '気になる部分だけコンシーラーを重ねると、カバー力が上がりつつ自然な仕上がりに。' },
      { icon: '💎', title: 'セッティングパウダーは必須', body: '仕上げのパウダーをはたくと崩れにくさが格段にUP。Tゾーンは特に念入りに。' },
    ],
  },

  motokara_smooth: {
    key:       'motokara_smooth',
    category:  'SMOOTH',
    name:      '元から美肌SMOOTH',
    subCopy:   'すっぴん以上の、ナチュラル美肌',
    desc:      '素肌感を残しながらキレイに整えたような、ナチュラルビューティーが光ります。「そのまま？」と言われる無敵の素肌仕上がりを実現。',
    color1:    '#d4b8e8',
    color2:    '#c8b89a',
    imgPath:     '../assets/images/chara05.png',
    imgPathMono: '../assets/images/chara05_mono.png',
    luck: {
      work:    '★★★☆☆',
      love:    '★★★★☆',
      money:   '★★★★★',
    },
    luckyItem: 'ナチュラルピンクリップ',
    messages: [
      '素肌のような仕上がりが、あなたの自然な美しさを引き出します。',
      '「何もしてないのに綺麗」と言われる今日がやってきます。',
      'ナチュラルな自信がオーラになっています。',
    ],
    tips: [
      { icon: '🫧', title: '洗顔はぬるま湯でやさしく', body: 'バリア機能を守ることが素肌美の基本。熱いお湯・ゴシゴシは禁物です。' },
      { icon: '🌿', title: '下地は薄く・均一に', body: '素肌感を出すには量を少なめに。スポンジで押さえるように伸ばすと自然な仕上がりに。' },
      { icon: '✨', title: '引き算でナチュラル感を演出', body: '全体でカバーよりも、コンシーラーで気になる部分だけ補正する"引き算メイク"が正解。' },
    ],
  },

  seiketsu_smooth: {
    key:       'seiketsu_smooth',
    category:  'SMOOTH',
    name:      '清潔感無双SMOOTH',
    subCopy:   'クリーンで凛とした、完璧な印象',
    desc:      'テカりゼロのマット肌で、どんな場面でも清潔感あふれる印象を作れます。時間が経っても崩れにくく、凛とした美しさが続きます。',
    color1:    '#5a7a8f',
    color2:    '#a8c8d8',
    imgPath:     '../assets/images/chara06.png',
    imgPathMono: '../assets/images/chara06_mono.png',
    luck: {
      work:    '★★★★★',
      love:    '★★★☆☆',
      money:   '★★★★☆',
    },
    luckyItem: 'ネイビーorグレーの小物',
    messages: [
      '清潔感あふれる今日のあなたは、どんな場面でも信頼されます。',
      '凛とした佇まいが、あなたの強さを際立てています。',
      'クリーンな印象が、周りに好印象を与えています。',
    ],
    tips: [
      { icon: '🌬️', title: 'Tゾーンはあぶらとり紙で管理', body: '午後のテカりはあぶらとり紙で対応。押さえるだけでサラサラが復活します。' },
      { icon: '💎', title: 'フィニッシングパウダーで仕上げる', body: 'ファンデの上から薄くはたくだけで、皮脂によるテカりを長時間ブロック。' },
      { icon: '🚿', title: '夜のクレンジングを丁寧に', body: '翌朝の清潔感は前夜のクレンジング次第。毛穴の汚れをしっかり落とすことが大切。' },
    ],
  },

};

/* ========================================
   3. 質問データ
   ======================================== */
const questions = [
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
];

/* ========================================
   4. イベント設定
   ======================================== */
const eventConfig = {
  name:    '@cosme FD EVENT',
  date:    '2026.6.XX',
  product: 'FOUNDATION',
};

/* ========================================
   5. 状態管理
   ======================================== */
const state = {
  answers:   [],   // 各問の回答インデックス (0=A / 1=B)
  resultKey: null, // 確定した結果ID
  message:   '',   // ランダム選択されたメッセージ
};

/* ========================================
   6. ユーティリティ
   ======================================== */

/** 回答インデックス配列 → "AAAAB" 形式の文字列キー */
function toAnswerKey(answers) {
  return answers.map(i => i === 0 ? 'A' : 'B').join('');
}

/** messages 配列からランダムに1つ選ぶ */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** ★文字列を視覚的に表示するHTML */
function renderStars(str) {
  return str
    .replace(/★/g, '<span class="star-on">★</span>')
    .replace(/☆/g, '<span class="star-off">☆</span>');
}

/* ========================================
   7. 画面切り替え
   ======================================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
}

/* ========================================
   8. クイズ
   ======================================== */
function startQuiz() {
  state.answers   = [];
  state.resultKey = null;
  state.message   = '';
  renderQuestion(0);
  showScreen('screen-quiz');
}

function renderQuestion(index) {
  const q     = questions[index];
  const total = questions.length;

  document.getElementById('quiz-progress-fill').style.width   = (index / total * 100) + '%';
  document.getElementById('quiz-progress-label').textContent  = `${index + 1} / ${total}`;

  document.getElementById('quiz-body').innerHTML = `
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

  if (qIndex + 1 < questions.length) {
    renderQuestion(qIndex + 1);
  } else {
    startScan();
  }
}

/* ========================================
   9. スキャン演出
   ======================================== */
function startScan() {
  showScreen('screen-scan');

  const fill   = document.getElementById('scan-progress-fill');
  const status = document.getElementById('scan-status');
  const steps  = [
    { pct: 20,  text: '皮脂バランスをチェック中...' },
    { pct: 45,  text: '水分量を測定中...' },
    { pct: 68,  text: 'テクスチャー適性を解析中...' },
    { pct: 88,  text: 'あなたのタイプを特定中...' },
    { pct: 100, text: '解析完了！' },
  ];

  fill.style.width = '0%';
  let i = 0;

  (function next() {
    if (i >= steps.length) {
      setTimeout(() => {
        calcResult();
        renderResult();
        showScreen('screen-result');
      }, 600);
      return;
    }
    const s = steps[i++];
    fill.style.width   = s.pct + '%';
    status.textContent = s.text;
    setTimeout(next, 480);
  })();
}

/* ========================================
   10. 診断結果計算
   回答キー → resultMap → results
   ======================================== */
function calcResult() {
  const key       = toAnswerKey(state.answers);
  const resultId  = resultMap[key] || 'tafuku_glow'; // フォールバック
  const r         = results[resultId];

  state.resultKey = resultId;
  state.message   = pickRandom(r.messages);
}

/* ========================================
   11. 結果画面レンダリング
   ======================================== */
function renderResult() {
  const r = results[state.resultKey];

  // ヘッダー
  document.getElementById('result-cat-badge').textContent = r.category;
  document.getElementById('result-cat-badge').className   = `result-cat-badge cat-${r.category.toLowerCase()}`;
  document.getElementById('result-name').textContent      = r.name;
  document.getElementById('result-tagline').textContent   = r.subCopy;

  const header = document.getElementById('result-header');
  header.style.background   = `linear-gradient(135deg, ${r.color1}33, ${r.color2}44)`;
  header.style.borderBottom  = `3px solid ${r.color1}`;

  // キャラ画像（画像なければ非表示）
  const imgTag = r.imgPath
    ? `<img class="result-chara-img" src="${r.imgPath}" alt="${r.name}" onerror="this.style.display='none'">`
    : '';

  // ランダムメッセージ
  const msgTag = `<p class="result-random-msg">&ldquo;${state.message}&rdquo;</p>`;

  // 運勢
  const luckTag = `
    <div class="result-luck-card">
      <p class="luck-heading">✦ 今日の運勢</p>
      <div class="luck-grid">
        <div class="luck-row"><span class="luck-label">仕事運</span><span class="luck-stars">${renderStars(r.luck.work)}</span></div>
        <div class="luck-row"><span class="luck-label">恋愛運</span><span class="luck-stars">${renderStars(r.luck.love)}</span></div>
        <div class="luck-row"><span class="luck-label">金　運</span><span class="luck-stars">${renderStars(r.luck.money)}</span></div>
      </div>
      <p class="luck-item">🍀 ラッキーアイテム: <strong>${r.luckyItem}</strong></p>
    </div>
  `;

  // Tipsカード
  const tipsTag = r.tips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div>
        <p class="tip-title">${tip.title}</p>
        <p class="tip-body">${tip.body}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('result-body').innerHTML = `
    ${imgTag}
    <div class="result-desc-card">
      ${msgTag}
      <p class="result-desc">${r.desc}</p>
    </div>
    ${luckTag}
    <div class="result-tips">
      <p class="tips-heading">✦ お手入れのポイント</p>
      ${tipsTag}
    </div>
  `;
}

/* ========================================
   12. レシート画面
   results と同じデータを使って生成
   ======================================== */
function goToReceipt() {
  const r   = results[state.resultKey];
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

  const monoImg  = r.imgPathMono
    ? `<img class="rc-chara-img" src="${r.imgPathMono}" alt="${r.name}">`
    : '';
  const tipsLines = r.tips.map(t => `<div class="rc-tip">・${t.title}</div>`).join('');
  const luckLines = `
    <div class="rc-luck">仕事運 ${r.luck.work}</div>
    <div class="rc-luck">恋愛運 ${r.luck.love}</div>
    <div class="rc-luck">金　運 ${r.luck.money}</div>
  `;

  document.getElementById('receipt-content').innerHTML = `
    <div class="rc-logo">${eventConfig.name}</div>
    ${monoImg}
    <div class="rc-dash">--------------------------------</div>
    <div class="rc-date">${dateStr}</div>
    <div class="rc-dash">--------------------------------</div>
    <div class="rc-result-block">
      <div class="rc-category">[${r.category}]</div>
      <div class="rc-name">${r.name}</div>
      <div class="rc-subcopy">${r.subCopy}</div>
    </div>
    <div class="rc-dash">- - - - - - - - - - - - - - - -</div>
    <div class="rc-msg">"${state.message}"</div>
    <div class="rc-dash">- - - - - - - - - - - - - - - -</div>
    <div class="rc-section-title">今日の運勢</div>
    ${luckLines}
    <div class="rc-item">ラッキー: ${r.luckyItem}</div>
    <div class="rc-dash">- - - - - - - - - - - - - - - -</div>
    <div class="rc-section-title">お手入れポイント</div>
    ${tipsLines}
    <div class="rc-dash">--------------------------------</div>
    <div class="rc-footer">ご来場ありがとうございます</div>
    <div class="rc-footer">スタッフにお声がけください</div>
    <div class="rc-dash">--------------------------------</div>
    <div class="rc-footer">${eventConfig.product} / ${eventConfig.name}</div>
  `;

  showScreen('screen-receipt');
}

/* ========================================
   13. TOP に戻る
   ======================================== */
function goToTop() {
  state.answers   = [];
  state.resultKey = null;
  state.message   = '';
  showScreen('screen-top');
}

/* ========================================
   14. 初期化
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-top');
});

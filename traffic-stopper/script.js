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
    recommend: 'GLOWシリーズ ツヤ感ファンデーション',
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
    recommend: 'GLOWシリーズ 透明感ファンデーション',
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
    recommend: 'GLOWシリーズ 血色感ファンデーション',
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
    recommend: 'SMOOTHシリーズ カバーファンデーション',
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
    recommend: 'SMOOTHシリーズ ナチュラルファンデーション',
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
    recommend: 'SMOOTHシリーズ マットファンデーション',
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
    text: '朝の理想の過ごし方は？',
    options: [
      { label: 'A', icon: '🌅', text: 'ゆっくり\n自分のペースで準備する' },
      { label: 'B', icon: '😴', text: 'ギリギリまで\n寝ていたい' },
    ],
  },
  {
    id: 2,
    text: '休日の過ごし方といえば？',
    options: [
      { label: 'A', icon: '🌿', text: '外に出て\nアクティブに動く' },
      { label: 'B', icon: '🛋️', text: '家でのんびり\nリラックス' },
    ],
  },
  {
    id: 3,
    text: 'スキンケアのポイントは？',
    options: [
      { label: 'A', icon: '💧', text: '保湿をしっかり\nうるおいキープ' },
      { label: 'B', icon: '⚡', text: '時短で\nシンプルケア' },
    ],
  },
  {
    id: 4,
    text: '気分転換の方法は？',
    options: [
      { label: 'A', icon: '💬', text: '友達と話して\n気持ちを発散' },
      { label: 'B', icon: '🌙', text: 'ひとりで\n静かに過ごす' },
    ],
  },
  {
    id: 5,
    text: '今の自分に近いのは？',
    options: [
      { label: 'A', icon: '☀️', text: '明るく\nポジティブ' },
      { label: 'B', icon: '🍃', text: '落ち着いて\nマイペース' },
    ],
  },
];

/* ========================================
   4. イベント設定
   ======================================== */
const eventConfig = {
  name:    '@cosme FD EVENT',
  date:    '2026.6.XX',
  product: {
    name:           'FOUNDATION',
    lineup:         'GLOW / SMOOTH',
    url:            'https://www.cosme.net/',  // 差し替え用
    qrPlaceholder:  '[QR]',                    // 実運用時は QR コード画像に差し替え
  },
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
  document.getElementById('bg2').classList.remove('hidden');
  document.body.classList.remove('result-mode');
  state.answers   = [];
  state.resultKey = null;
  state.message   = '';
  renderQuestion(0);
  showScreen('screen-quiz');
}

function renderQuestion(index) {
  const q     = questions[index];
  const total = questions.length;

  const dotsHTML = questions.map((_, i) => {
    let cls = '';
    if (i < index)      cls = 'done';
    else if (i === index) cls = 'current';
    return `<div class="progress-dot ${cls}"></div>`;
  }).join('');

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-content-wrapper">
      <div class="quiz-header">
        <div class="quiz-header-text">
          <h1>今日のあなたは<br>どんなキャラクター？</h1>
          <p>5つの質問と手の甲スキャンで<br>今日のキャラクターが決まる！</p>
        </div>
        <div class="icon-wrap">
          <div class="icon-circle"></div>
          <div class="icon-silhouette">
            <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" fill="#ab886a">
              <circle cx="100" cy="48" r="40"/>
              <path d="M70 88 Q60 110 50 160 Q40 200 45 260 L155 260 Q160 200 150 160 Q140 110 130 88 Z"/>
              <path d="M68 100 Q40 130 28 180 Q24 195 35 198 Q46 200 52 185 Q62 145 78 118 Z"/>
              <path d="M132 100 Q160 130 172 180 Q176 195 165 198 Q154 200 148 185 Q138 145 122 118 Z"/>
              <path d="M70 255 Q62 290 58 340 Q56 355 70 356 Q84 357 86 342 Q88 310 92 278 Z"/>
              <path d="M130 255 Q138 290 142 340 Q144 355 130 356 Q116 357 114 342 Q112 310 108 278 Z"/>
            </svg>
          </div>
          <span class="icon-q">?</span>
        </div>
      </div>

      <div class="quiz-question-section">
        <div class="question-label-row">
          <span class="q-number">Q${q.id}</span>
          <span class="q-text">${q.text}</span>
        </div>
        <div class="quiz-choices">
          ${q.options.map((opt, i) => `
            <div class="choice-card" onclick="answerQuestion(${index}, ${i})">
              <span class="choice-letter">${opt.label}</span>
              <div class="choice-text-wrap">
                <div class="choice-text">
                  <p>${opt.text.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="progress-dots">${dotsHTML}</div>
      </div>
    </div>
  `;
}

function answerQuestion(qIndex, optIndex) {
  const cards = document.querySelectorAll('.choice-card');
  if (cards[optIndex]) cards[optIndex].classList.add('selected');

  state.answers[qIndex] = optIndex;

  setTimeout(() => {
    if (qIndex + 1 < questions.length) {
      renderQuestion(qIndex + 1);
    } else {
      startScan();
    }
  }, 300);
}

/* ========================================
   9. スキャン演出
   ======================================== */
function startScan() {
  document.getElementById('bg2').classList.add('hidden');
  showScreen('screen-scan');
}

function confirmScan() {
  calcResult();
  renderResult();
  showScreen('screen-result');
  document.body.classList.add('result-mode');
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
  document.getElementById('result-name').textContent    = r.name;
  document.getElementById('result-tagline').textContent = r.subCopy;

  // キャラ画像
  const imgTag = r.imgPath
    ? `<img class="result-chara-img" src="${r.imgPath}" alt="${r.name}">`
    : '';

  // 運勢
  const luckTag = `
    <div class="result-luck-card">
      <div class="luck-grid">
        <div class="luck-row"><span class="luck-label">仕事運</span><span class="luck-stars">${renderStars(r.luck.work)}</span></div>
        <div class="luck-row"><span class="luck-label">恋愛運</span><span class="luck-stars">${renderStars(r.luck.love)}</span></div>
        <div class="luck-row"><span class="luck-label">金　運</span><span class="luck-stars">${renderStars(r.luck.money)}</span></div>
      </div>
      <p class="luck-item">ラッキーアイテム: <strong>${r.luckyItem}</strong></p>
    </div>
  `;

  document.getElementById('result-body').innerHTML = `
    ${imgTag}
    ${luckTag}
  `;
}

/* ========================================
   12. レシート画面
   ======================================== */

/**
 * レシートDOM生成
 * #receipt-content (iPad プレビュー) と
 * #receipt-print-target (印刷専用) の両方に同じ HTML を挿入する。
 */
function buildReceiptDOM() {
  const r   = results[state.resultKey];
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const monoImg = r.imgPathMono
    ? `<img class="rc-chara-img" src="${r.imgPathMono}" alt="${r.name}">`
    : '';

  const html = `
    <div class="rc-event-name">${eventConfig.name}</div>
    <div class="rc-hr"></div>
    <div class="rc-date">${dateStr}</div>
    <div class="rc-hr-dot"></div>
    <div class="rc-result-section">
      ${monoImg}
      <div class="rc-category">[${r.category}]</div>
      <div class="rc-name">${r.name}</div>
      <div class="rc-subcopy">${r.subCopy}</div>
    </div>
    <div class="rc-hr-dot"></div>
    <div class="rc-msg">&ldquo;${state.message}&rdquo;</div>
    <div class="rc-hr-dot"></div>
    <div class="rc-section-title">今日の運勢</div>
    <div class="rc-luck-table">
      <div class="rc-luck-row"><span class="rc-luck-label">仕事運</span><span class="rc-luck-stars">${r.luck.work}</span></div>
      <div class="rc-luck-row"><span class="rc-luck-label">恋愛運</span><span class="rc-luck-stars">${r.luck.love}</span></div>
      <div class="rc-luck-row"><span class="rc-luck-label">金　運</span><span class="rc-luck-stars">${r.luck.money}</span></div>
    </div>
    <div class="rc-lucky-item">🍀 ラッキーアイテム: ${r.luckyItem}</div>
    <div class="rc-hr-dot"></div>
    <div class="rc-product-section">
      <div class="rc-section-title">おすすめアイテム</div>
      <div class="rc-recommend">${r.recommend}</div>
      <div class="rc-product-name">${eventConfig.product.name} ${eventConfig.product.lineup}</div>
    </div>
    <div class="rc-qr-section">
      <div class="rc-qr-box">${eventConfig.product.qrPlaceholder}</div>
      <div class="rc-qr-label">詳細はこちら</div>
    </div>
    <div class="rc-hr"></div>
    <div class="rc-footer">ご来場ありがとうございます</div>
    <div class="rc-footer">スタッフにお声がけください</div>
    <div class="rc-hr"></div>
    <div class="rc-footer-small">${eventConfig.name} / ${eventConfig.date}</div>
  `;

  document.getElementById('receipt-content').innerHTML      = html;
  document.getElementById('receipt-print-target').innerHTML = html;
}

/** レシート画面へ遷移 */
function goToReceipt() {
  buildReceiptDOM();
  showScreen('screen-receipt');
}

/** 印刷エントリーポイント */
function printReceipt() {
  buildReceiptDOM(); // 最新状態で再生成してから印刷
  // printByWebPRNT(); // Star webPRNT Browser 使用時はこちらをアンコメント
  printByBrowser();
}

/** window.print() による印刷（@media print で receipt-print-target のみ表示） */
function printByBrowser() {
  window.print();
}

/*
  ──────────────────────────────────────────────
  printByWebPRNT() — Star webPRNT Browser SDK 実装スタブ
  ──────────────────────────────────────────────
  対象機種: Star mC-Print3 MCP31LB BK JP (Bluetooth / iPad)
  SDK:      Star WebPRNT Browser (http://192.168.x.x/StarWebPRNT/SendMessage)
            ※ iPad の Star webPRNT Browser アプリ内で動作させること

  実装手順:
  1. Star webPRNT SDK JS を読み込む
       <script src="StarWebPRNTBuilder.js"></script>
  2. StarWebPrintBuilder でコマンドを組み立てる
  3. StarWebPrintTrader.sendMessage() で送信する

  実装例 (コメントアウト):

  function printByWebPRNT() {
    const builder = new StarWebPrintBuilder();
    const request = builder.createInitializationElement();

    // 文字コード設定 (UTF-8)
    request += builder.createCodePageElement({ codepage: 'UTF-8' });

    // センタリング
    request += builder.createAlignmentElement({ position: 'center' });

    // イベント名 (大文字・太字)
    request += builder.createTextElement({ emphasis: true, data: eventConfig.name + '\n' });
    request += builder.createTextElement({ emphasis: false, data: '--------------------------------\n' });

    // 診断結果
    const r = results[state.resultKey];
    request += builder.createTextElement({ data: '[' + r.category + '] ' + r.name + '\n' });
    request += builder.createTextElement({ data: r.subCopy + '\n' });
    request += builder.createTextElement({ data: '--------------------------------\n' });

    // 運勢
    request += builder.createTextElement({ data: '仕事運 ' + r.luck.work + '\n' });
    request += builder.createTextElement({ data: '恋愛運 ' + r.luck.love + '\n' });
    request += builder.createTextElement({ data: '金  運 ' + r.luck.money + '\n' });

    // カット
    request += builder.createCutPaperElement({ feed: true });

    const trader = new StarWebPrintTrader({ url: 'http://localhost:8008/StarWebPRNT/SendMessage' });
    trader.onReceive = function(response) {
      if (trader.isTimeoutError(response))   console.warn('webPRNT: timeout');
      else if (trader.isInvalidResponse(response)) console.warn('webPRNT: invalid response');
      else console.log('webPRNT: 印刷完了');
    };
    trader.onError = function(xhr, errorThrown) {
      console.error('webPRNT: 通信エラー', errorThrown);
      // フォールバック: ブラウザ印刷
      printByBrowser();
    };
    trader.sendMessage({ request });
  }
*/

/* ========================================
   13. TOP に戻る
   ======================================== */
function goToTop() {
  startQuiz();
}

/* ========================================
   14. 初期化
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  startQuiz();
});

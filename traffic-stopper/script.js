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
  'AAAAA': 'toumei_glow',
  'AAAAB': 'seiketsu_smooth',
  'AAABA': 'toumei_glow',
  'AAABB': 'motokara_smooth',
  'AABAA': 'tafuku_glow',
  'AABAB': 'seiketsu_smooth',
  'AABBA': 'tafuku_glow',
  'AABBB': 'moreka_smooth',
  'ABAAA': 'toumei_glow',
  'ABAAB': 'seiketsu_smooth',
  'ABABA': 'toumei_glow',
  'ABABB': 'motokara_smooth',
  'ABBAA': 'tafuku_glow',
  'ABBAB': 'seiketsu_smooth',
  'ABBBA': 'toumei_glow',
  'ABBBB': 'motokara_smooth',
  'BAAAA': 'bakamote_glow',
  'BAAAB': 'seiketsu_smooth',
  'BAABA': 'tafuku_glow',
  'BAABB': 'moreka_smooth',
  'BABAA': 'bakamote_glow',
  'BABAB': 'moreka_smooth',
  'BABBA': 'bakamote_glow',
  'BABBB': 'moreka_smooth',
  'BBAAA': 'tafuku_glow',
  'BBAAB': 'seiketsu_smooth',
  'BBABA': 'toumei_glow',
  'BBABB': 'motokara_smooth',
  'BBBAA': 'bakamote_glow',
  'BBBAB': 'moreka_smooth',
  'BBBBA': 'bakamote_glow',
  'BBBBB': 'motokara_smooth',
};

/* ========================================
   1b. パターン別メッセージ
   ======================================== */
const messageMap = {
  'AAAAA': { sub: 'あなたらしいが輝く日',         msg: 'あなたらしい輝きを楽しんで♡' },
  'AAAAB': { sub: '「なんか素敵」が止まらない日',   msg: 'ハッピーがたくさん舞い込みますように♡' },
  'AAABA': { sub: 'あなたらしいが輝く日',         msg: 'あなたの笑顔が輝きますように♡' },
  'AAABB': { sub: 'ナチュラルなのに目を引く日',     msg: '素敵の連鎖が続きますように♡' },
  'AABAA': { sub: 'その笑顔がいつも以上に輝く日',   msg: '素敵な日になりますように♡' },
  'AABAB': { sub: '「なんか素敵」が止まらない日',   msg: '今日はあなたが主役♡' },
  'AABBA': { sub: 'その笑顔がいつも以上に輝く日',   msg: 'あなたは思っているよりずっと素敵♡' },
  'AABBB': { sub: '加工アプリいらずの日',         msg: 'あなたには、あなたにしかない良さがある♡' },
  'ABAAA': { sub: 'あなたらしいが輝く日',         msg: '今日という日を思いっきり楽しんでね♡' },
  'ABAAB': { sub: '「なんか素敵」が止まらない日',   msg: 'あなたらしく輝ける一日を♡' },
  'ABABA': { sub: 'あなたらしいが輝く日',         msg: 'たくさんの幸せが訪れますように♡' },
  'ABABB': { sub: 'ナチュラルなのに目を引く日',     msg: '何気ない瞬間まで特別になりますように♡' },
  'ABBAA': { sub: 'その笑顔がいつも以上に輝く日',   msg: 'あなたが笑顔でいられますように♡' },
  'ABBAB': { sub: '「なんか素敵」が止まらない日',   msg: '笑顔であふれる1日になりますように♡' },
  'ABBBA': { sub: 'あなたらしいが輝く日',         msg: 'なんだか今日はいつも以上にリラックスして過ごせそう♡' },
  'ABBBB': { sub: 'ナチュラルなのに目を引く日',     msg: '心がふわっと軽くなりますように♡' },
  'BAAAA': { sub: '今日は何故か視線を集める日',    msg: 'ときめく一日になりますように♡' },
  'BAAAB': { sub: '「なんか素敵」が止まらない日',   msg: '今日もとびきり輝いてね♡' },
  'BAABA': { sub: 'その笑顔がいつも以上に輝く日',   msg: '今日もキラキラ笑顔で♡' },
  'BAABB': { sub: '加工アプリいらずの日',         msg: 'ハッピーをまとって過ごそう♡' },
  'BABAA': { sub: '今日は何故か視線を集める日',    msg: 'きっと素敵なことが待っているよ♡' },
  'BABAB': { sub: '加工アプリいらずの日',         msg: 'そのままのあなたが一番素敵♡' },
  'BABBA': { sub: '今日は何故か視線を集める日',    msg: '自分がもっと好きになる♡' },
  'BABBB': { sub: '加工アプリいらずの日',         msg: '笑顔が一番のアクセサリー♡' },
  'BBAAA': { sub: 'その笑顔がいつも以上に輝く日',   msg: '心がほっとする一日になりますように♡' },
  'BBAAB': { sub: '「なんか素敵」が止まらない日',   msg: 'きらめく瞬間に出会えますように♡' },
  'BBABA': { sub: 'あなたらしいが輝く日',         msg: '今日はどんな幸せを見つける？♡' },
  'BBABB': { sub: 'ナチュラルなのに目を引く日',     msg: '心躍る瞬間に出会えますように♡' },
  'BBBAA': { sub: '今日は何故か視線を集める日',    msg: '今日もイケてる♡' },
  'BBBAB': { sub: '加工アプリいらずの日',         msg: 'あなたの魅力がもっと輝きますように♡' },
  'BBBBA': { sub: '今日は何故か視線を集める日',    msg: '今日のあなたは一段と素敵♡' },
  'BBBBB': { sub: 'ナチュラルなのに目を引く日',     msg: 'ときめきを忘れずに♡' },
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
    receiptDesc: 'GLOWタイプのファンデーションがおすすめ♡\n輝く肌で今日も最高の自分に！',
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
    receiptDesc: 'GLOWタイプのファンデーションがおすすめ♡\n透明感あふれる肌を手に入れて！',
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
    receiptDesc: 'GLOWタイプのファンデーションがおすすめ♡\n幸せオーラをさらにアップ！',
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
    imgPath:     '../assets/images/chara06.png',
    imgPathMono: '../assets/images/chara06_mono.png',
    luck: {
      work:    '★★★★★',
      love:    '★★★★☆',
      money:   '★★★★☆',
    },
    luckyItem: 'ベージュ系アイシャドウ',
    receiptDesc: 'SMOOTHタイプのファンデーションがおすすめ♡\nGLOWと比較して使ってみて！',
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
    name:      'ひとめぼれSMOOTH',
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
    receiptDesc: 'SMOOTHタイプのファンデーションがおすすめ♡\n素肌感を活かしたナチュラルな仕上がりに！',
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
    name:      '清楚感SMOOTH',
    subCopy:   'クリーンで凛とした、完璧な印象',
    recommend: 'SMOOTHシリーズ マットファンデーション',
    desc:      'テカりゼロのマット肌で、どんな場面でも清潔感あふれる印象を作れます。時間が経っても崩れにくく、凛とした美しさが続きます。',
    color1:    '#5a7a8f',
    color2:    '#a8c8d8',
    imgPath:     '../assets/images/chara04.png',
    imgPathMono: '../assets/images/chara04_mono.png',
    luck: {
      work:    '★★★★★',
      love:    '★★★☆☆',
      money:   '★★★★☆',
    },
    luckyItem: 'ネイビーorグレーの小物',
    receiptDesc: 'SMOOTHタイプのファンデーションがおすすめ♡\nGLOWと比較して使ってみて！',
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
    text: '魔法が使えるならどっち？',
    options: [
      { label: 'A', icon: '🌅', text: '人の心を読む' },
      { label: 'B', icon: '😴', text: '瞬間移動' },
    ],
  },
  {
    id: 2,
    text: 'テンションの上がる音はどっち？',
    options: [
      { label: 'A', icon: '🌿', text: 'アップテンポな曲' },
      { label: 'B', icon: '🛋️', text: 'チルな曲' },
    ],
  },
  {
    id: 3,
    text: '朝の過ごし方はどっち？',
    options: [
      { label: 'A', icon: '💧', text: 'ゆっくり準備' },
      { label: 'B', icon: '⚡', text: 'ギリギリまで\n寝る' },
    ],
  },
  {
    id: 4,
    text: '休日の過ごし方はどっち？',
    options: [
      { label: 'A', icon: '💬', text: 'カフェや\nショッピング\nなど外出派' },
      { label: 'B', icon: '🌙', text: '家で映画や\n動画を楽しむ\nおうち派' },
    ],
  },
  {
    id: 5,
    text: 'あなたが目指したい肌はどっち？',
    options: [
      { label: 'A', icon: '☀️', text: 'つやっと\nうるおい美肌' },
      { label: 'B', icon: '🍃', text: '肌ノイズのないなめらか美肌' },
    ],
  },
];

/* ========================================
   4. イベント設定
   ======================================== */
const eventConfig = {
  name: '@cosme FD EVENT',
  date: '2026.6.XX',
  products: {
    GLOW: {
      brand: 'SHISEIDO',
      name:  'エッセンス スキングロウ\nファンデーション',
      desc:  '圧巻のつや肌。満たされる一日。\n素肌から美しい仕上がり。\n美容液レベルの肌体験',
    },
    SMOOTH: {
      brand: 'SHISEIDO',
      name:  'エッセンス スキンスムース\nファンデーション',
      desc:  'なめらかに、理想の素肌美へ。\n使うたびノイズレスな仕上がり。\n新体験のファンデ美容液',
    },
  },
  product: {
    url:           'https://www.cosme.net/',  // 差し替え用
    qrPlaceholder: '[QR]',
  },
};

/* ========================================
   5. 状態管理
   ======================================== */
const state = {
  answers:    [],   // 各問の回答インデックス (0=A / 1=B)
  resultKey:  null, // 確定した結果ID
  subMessage: '',   // パターン別サブメッセージ
  message:    '',   // パターン別メッセージ
  luck: { work: '', love: '', money: '' }, // ランダム運勢
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

/** 1〜5のランダムな星文字列を生成（min〜5の範囲） */
function randomStars(min = 2) {
  const n = Math.floor(Math.random() * (5 - min + 1)) + min;
  return '★'.repeat(n) + '☆'.repeat(5 - n);
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
  stopSparkles();
  const btn       = document.querySelector('#screen-top .btn-top-start');
  const titleArea = document.querySelector('#screen-top .top-title-area');
  const stageWrap = document.querySelector('#screen-top .top-stage-wrap');

  // ボタン色変更・タイトルフェード・台座+キャラスライド
  btn.classList.add('is-pressed');
  titleArea.classList.add('anim-fade-out');
  stageWrap.classList.add('anim-slide-left');

  setTimeout(() => {
    document.body.classList.remove('result-mode');
    state.answers   = [];
    state.resultKey = null;
    state.message   = '';
    renderQuestion(0);
    showScreen('screen-quiz');
    // TOPに戻ったときのためリセット
    btn.classList.remove('is-pressed');
    titleArea.classList.remove('anim-fade-out');
    stageWrap.classList.remove('anim-slide-left');
  }, 750);
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
    <div class="quiz-inner">
      <div class="quiz-q-backdrop">Q${q.id}</div>
      <div class="quiz-top-section">
        <div class="quiz-question-wrap">
          <p class="quiz-question-main">${q.text}</p>
        </div>
      </div>
      <div class="quiz-choices-v2">
        ${q.options.map((opt, i) => `
          <div class="cv2-card" onclick="answerQuestion(${index}, ${i})">
            <div class="cv2-badge cv2-badge-${opt.label.toLowerCase()}">${opt.label}</div>
            <p class="cv2-text cv2-text-${opt.label.toLowerCase()}">${opt.text.replace(/\n/g, '<br>')}</p>
          </div>
        `).join('')}
      </div>
      <div class="quiz-bottom-nav">
        ${index > 0
          ? `<button class="qnav-btn" onclick="renderQuestion(${index - 1})">← back</button>`
          : `<span class="qnav-placeholder qnav-btn">← back</span>`}
        <span class="qnav-btn qnav-placeholder">next →</span>
      </div>
    </div>
  `;
}

function answerQuestion(qIndex, optIndex) {
  const cards = document.querySelectorAll('.cv2-card');
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
  showScreen('screen-scan');
}

function confirmScan() {
  calcResult();
  renderResult();
  showScreen('screen-result');
  document.body.classList.add('result-mode');
  setTimeout(launchConfetti, 2000); // キャラフェードイン完了後に紙吹雪
}

/**
 * 紙吹雪エフェクト
 * canvas を body に重ねて約4秒間アニメーションし自動削除する
 */
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:820px;height:1180px;pointer-events:none;z-index:100;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width  = 820;
  canvas.height = 1180;

  const COLORS = ['#ab886a','#f5e0c8','#e8c9a8','#ffffff','#d4a87a','#f9c8d4','#fce4b0','#e8b8c8'];
  const COUNT  = 140;
  const pieces = Array.from({ length: COUNT }, () => ({
    x:     Math.random() * 820,
    y:     Math.random() * -400 - 10,
    w:     Math.random() * 8  + 4,
    h:     Math.random() * 14 + 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: Math.random() * Math.PI * 2,
    spin:  (Math.random() - 0.5) * 0.18,
    vx:    (Math.random() - 0.5) * 2.5,
    vy:    Math.random() * 3.5 + 1.8,
  }));

  const DURATION  = 4200;
  const FADE_TIME = 900;
  let   startTime = null;

  function draw(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const alpha = elapsed < DURATION - FADE_TIME
      ? 1
      : Math.max(0, 1 - (elapsed - (DURATION - FADE_TIME)) / FADE_TIME);

    ctx.clearRect(0, 0, 820, 1180);

    for (const p of pieces) {
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      if (p.y > 1200) { p.y = -20; p.x = Math.random() * 820; }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (elapsed < DURATION) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}

/* ========================================
   10. 診断結果計算
   回答キー → resultMap → results
   ======================================== */
function calcResult() {
  const key      = toAnswerKey(state.answers);
  const resultId = resultMap[key] || 'tafuku_glow';
  const r        = results[resultId];
  const m        = messageMap[key] || { sub: r.subCopy, msg: pickRandom(r.messages) };

  state.resultKey   = resultId;
  state.subMessage  = m.sub;
  state.message     = m.msg;
  state.luck        = { work: randomStars(3), love: randomStars(3), money: randomStars(3) };
}

/* ========================================
   11. 結果画面レンダリング
   ======================================== */
function renderResult() {
  const r = results[state.resultKey];

  // ヘッダー
  document.getElementById('result-name').textContent    = r.name;
  document.getElementById('result-tagline').textContent = state.subMessage;

  // キャラ画像
  const imgTag = r.imgPath
    ? `<img class="result-chara-img" src="${r.imgPath}" alt="${r.name}">`
    : '';

  document.getElementById('result-body').innerHTML = imgTag;
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
  const r = results[state.resultKey];

  const monoImg = r.imgPathMono
    ? `<img class="rc-chara-img" src="${r.imgPathMono}" alt="${r.name}">`
    : `<div class="rc-chara-placeholder">キャラクター入る</div>`;

  const productImg = r.category === 'GLOW'
    ? '../assets/receipt/レシートglow.png'
    : '../assets/receipt/レシートsmooth.png';

  const qrLeftImg = r.category === 'GLOW'
    ? '../assets/receipt/@cosme_glow.png'
    : '../assets/receipt/@cosme_smooth.png';

  const qrRightImg = r.category === 'GLOW'
    ? '../assets/receipt/qr_x_glow.png'
    : '../assets/receipt/qr_x_smooth.png';

  const xHashtags = r.category === 'GLOW'
    ? `#SHISEIDO<br>#２つのファンデ美容液体験<br>#アットコスメナゴヤ<br>#エッセンススキングロウファンデーション`
    : `#SHISEIDO<br>#２つのファンデ美容液体験<br>#アットコスメナゴヤ　#エッセンススキンスムースファンデーション`;

  const prod = eventConfig.products[r.category];

  const html = `
    <div class="rc-event-header">@cosme NAGOYA　SHISEIDO POPUP EVENT</div>

    <div class="rc-main-title">肌運命を導く<br>素肌美キャラ占い</div>

    <hr class="rc-hr-dot">

    <div class="rc-result-label">診　断　結　果</div>
    <div class="rc-name">${r.name}</div>
    <div class="rc-subcopy">${r.subCopy}</div>

    <div class="rc-chara-area">${monoImg}</div>

    <hr class="rc-hr-dot">

    <div class="rc-luck-table">
      <div class="rc-luck-row">
        <span class="rc-luck-label">仕事運</span>
        <span class="rc-luck-stars">${state.luck.work}</span>
      </div>
      <div class="rc-luck-row">
        <span class="rc-luck-label">恋愛運</span>
        <span class="rc-luck-stars">${state.luck.love}</span>
      </div>
      <div class="rc-luck-row">
        <span class="rc-luck-label">金　運</span>
        <span class="rc-luck-stars">${state.luck.money}</span>
      </div>
    </div>

    <hr class="rc-hr-dot">

    <div class="rc-recommend-intro">あなたにおすすめなのは・・・</div>

    <div class="rc-product-row">
      <img class="rc-product-thumb" src="${productImg}" alt="">
      <div class="rc-product-info">
        <div class="rc-product-brand">${prod.brand}</div>
        <div class="rc-product-name">${prod.name.replace(/\n/g, '<br>')}</div>
        <div class="rc-product-desc">${prod.desc.replace(/\n/g, '<br>')}</div>
      </div>
    </div>

    <hr class="rc-hr-dot">

    <div class="rc-cosme-qr-section">
      <div class="rc-qr-label">商品詳細はこちら！</div>
      <img class="rc-qr-img" src="${qrLeftImg}" alt="QR @cosme">
    </div>

    <hr class="rc-hr-dot">

    <div class="rc-x-qr-section">
      <div class="rc-qr-label">診断結果をシェアしてね！</div>
      <img class="rc-qr-img" src="${qrRightImg}" alt="QR X">
      <div class="rc-hashtags">${xHashtags}</div>
    </div>

    <hr class="rc-hr-solid">

    <div class="rc-message-footer">${state.message}</div>

    <img class="rc-logo-img" src="../assets/receipt/SHISEIDOGINZATOKYO.webp" alt="SHISEIDO GINZA TOKYO">

    <hr class="rc-hr-dot">

    <div class="rc-stamp-area">
      <div class="rc-stamp-label">パウチサンプル進呈</div>
      <div class="rc-stamp-box"></div>
    </div>
  `;

  document.getElementById('receipt-content').innerHTML      = html;
  document.getElementById('receipt-print-target').innerHTML = html;
}

/** レシート画面へ遷移 */
function goToReceipt() {
  buildReceiptDOM();
  showScreen('screen-receipt');
}

/** 印刷エントリーポイント — WebPRNT SDK があればそちらを優先、なければブラウザ印刷 */
function printReceipt(btn) {
  if (btn) btn.disabled = true;

  buildReceiptDOM();
  if (typeof StarWebPrintBuilder !== 'undefined' && typeof StarWebPrintTrader !== 'undefined') {
    printByWebPRNT();
  } else {
    printByBrowser();
  }
}

/** window.print() による印刷（@media print で receipt-print-target のみ表示） */
function printByBrowser() {
  window.print();
}

/** 画像を canvas に描画して返す（失敗時は null） */
function _loadImageCanvas(src, targetWidth) {
  return new Promise(function (resolve) {
    const img = new Image();
    img.onload = function () {
      const w = targetWidth;
      const h = Math.round(img.naturalHeight * (w / img.naturalWidth));
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve({ ctx, w, h });
    };
    img.onerror = function () { resolve(null); };
    img.src = src;
  });
}

/** キャンバス画像の上下白余白を除去して返す */
function _trimCanvasVertical(imgData) {
  if (!imgData) return null;
  const { ctx, w, h } = imgData;
  const pixels = ctx.getImageData(0, 0, w, h).data;
  let top = 0, bottom = h - 1;
  outer: for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (pixels[i] < 250 || pixels[i + 1] < 250 || pixels[i + 2] < 250) { top = y; break outer; }
    }
  }
  outer: for (let y = h - 1; y >= 0; y--) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (pixels[i] < 250 || pixels[i + 1] < 250 || pixels[i + 2] < 250) { bottom = y; break outer; }
    }
  }
  const croppedH = bottom - top + 1;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = croppedH;
  const newCtx = canvas.getContext('2d');
  newCtx.fillStyle = '#fff';
  newCtx.fillRect(0, 0, w, croppedH);
  newCtx.drawImage(ctx.canvas, 0, top, w, croppedH, 0, 0, w, croppedH);
  return { ctx: newCtx, w, h: croppedH };
}

/** Star WebPRNT Browser 経由で mC-Print3 に送信
 *  キャラ画像・商品イラストを並行ロードしてからコマンドを組み立てる */
function printByWebPRNT() {
  const r = results[state.resultKey];

  const useNewApi = navigator.userAgent.indexOf('webPRNTSupportMessageHandler') !== -1;
  const printerUrl = useNewApi
    ? 'http://localhost:8001/StarWebPRNT/SendMessage'
    : 'http://localhost:8008/StarWebPRNT/SendMessage';

  const productImgPath = r.category === 'GLOW'
    ? '../assets/receipt/レシートglow.png'
    : '../assets/receipt/レシートsmooth.png';
  const cosmeQrPath = r.category === 'GLOW'
    ? '../assets/receipt/@cosme_glow.png'
    : '../assets/receipt/@cosme_smooth.png';
  const xQrPath = r.category === 'GLOW'
    ? '../assets/receipt/qr_x_glow.png'
    : '../assets/receipt/qr_x_smooth.png';

  Promise.all([
    _loadImageCanvas(r.imgPathMono, 375),
    _loadImageCanvas(productImgPath, 100),
    _loadImageCanvas(cosmeQrPath, 160),
    _loadImageCanvas(xQrPath, 300),
    _loadImageCanvas('../assets/receipt/SHISEIDOGINZATOKYO.webp', 400),
  ]).then(function (images) {
    const charaImg       = _trimCanvasVertical(images[0]);
    const productRowCanvas = _buildProductRowCanvas(r, images[1]);
    _sendWebPRNTRequest(r, printerUrl, charaImg, productRowCanvas, images[2], images[3], images[4]);
  });
}

/**
 * 商品セクション合成キャンバス（左: 商品画像 / 右: ブランド名・商品名・説明）
 * サーマルプリンタはCSS非対応のためキャンバスで合成してビットイメージ印刷する。
 */
function _buildProductRowCanvas(r, productImgData) {
  const prod   = eventConfig.products[r.category];
  const totalW = 560;
  const leftPad = 60;
  const imgW   = 100;
  const gap    = 14;
  const textX  = leftPad + imgW + gap;
  const textW  = totalW - textX - 4;

  const brandSize = 22;
  const nameSize  = 24;
  const descSize  = 22;

  function wrapText(ctx, text, maxW) {
    const result = [];
    for (const para of text.split('\n')) {
      let line = '';
      for (const ch of para) {
        if (ctx.measureText(line + ch).width > maxW && line) {
          result.push(line);
          line = ch;
        } else {
          line += ch;
        }
      }
      if (line) result.push(line);
    }
    return result;
  }

  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = totalW; tmpCanvas.height = 10;
  const tmpCtx = tmpCanvas.getContext('2d');

  tmpCtx.font = descSize + 'px "Noto Sans JP", sans-serif';
  const descLines = wrapText(tmpCtx, prod.desc, textW);

  const nameLines = prod.name.split('\n');
  const textH = brandSize * 1.4
              + nameLines.length * nameSize * 1.4
              + 6
              + descLines.length * descSize * 1.5;

  const imgH = productImgData
    ? Math.round(productImgData.h * (imgW / productImgData.w))
    : 0;
  const totalH = Math.max(imgH, Math.ceil(textH)) + 12;

  const canvas = document.createElement('canvas');
  canvas.width  = totalW;
  canvas.height = totalH;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, totalW, totalH);

  if (productImgData) {
    const dh = Math.round(productImgData.h * (imgW / productImgData.w));
    ctx.drawImage(productImgData.ctx.canvas, leftPad, 6, imgW, dh);
  }

  ctx.textBaseline = 'top';
  let y = 30;

  ctx.fillStyle = '#111';
  ctx.font = 'bold ' + brandSize + 'px "Noto Sans JP", sans-serif';
  ctx.fillText(prod.brand, textX, y);
  y += brandSize * 1.4;

  ctx.font = 'bold ' + nameSize + 'px "Noto Sans JP", sans-serif';
  for (const line of nameLines) {
    ctx.fillText(line, textX, y);
    y += nameSize * 1.4;
  }
  y += 6;

  ctx.fillStyle = '#444';
  ctx.font = descSize + 'px "Noto Sans JP", sans-serif';
  for (const line of descLines) {
    ctx.fillText(line, textX, y);
    y += descSize * 1.5;
  }

  return { ctx, w: totalW, h: totalH };
}

/** テキストをキャンバスにレンダリングしてビットマップ用データを返す */
function _buildTextCanvas(lines, fontSize, bold, align, fontFamily) {
  const w = 560;
  const pad = 8;
  const lineH = Math.ceil(fontSize * 1.5);
  const font = (bold ? 'bold ' : '') + fontSize + 'px ' + (fontFamily || '"Noto Sans JP", sans-serif');

  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = w; tmpCanvas.height = 10;
  const tmpCtx = tmpCanvas.getContext('2d');
  tmpCtx.font = font;

  const wrappedLines = [];
  for (const line of lines) {
    if (tmpCtx.measureText(line).width <= w - pad * 2) {
      wrappedLines.push(line);
    } else {
      let current = '';
      for (const ch of line) {
        if (tmpCtx.measureText(current + ch).width > w - pad * 2 && current) {
          wrappedLines.push(current);
          current = ch;
        } else {
          current += ch;
        }
      }
      if (current) wrappedLines.push(current);
    }
  }

  const h = wrappedLines.length * lineH + 8;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#111';
  ctx.textBaseline = 'top';
  ctx.textAlign = align || 'center';
  ctx.font = font;
  const x = align === 'left' ? pad : w / 2;
  wrappedLines.forEach((line, i) => { ctx.fillText(line, x, 4 + i * lineH); });
  return { ctx, w, h };
}

/**
 * パウチサンプル進呈スタンプ欄（点線の正方形）をキャンバスに描画
 * mC-Print3 は 203dpi（≒8dot/mm）のため、sizeMm * 8 でドット数に変換
 */
function _buildStampBoxCanvas(sizeMm) {
  const size = Math.round(sizeMm * 8);
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.strokeRect(1, 1, size - 2, size - 2);
  return { ctx, w: size, h: size };
}

/** コマンド組み立て & 送信 */
function _sendWebPRNTRequest(r, printerUrl, charaImg, productRowImg, cosmeQrImg, xQrImg, logoImg) {
  const builder = new StarWebPrintBuilder();
  let request = '';

  request += builder.createInitializationElement();
  request += builder.createAlignmentElement({ position: 'center' });

  // イベントヘッダー
  request += builder.createTextElement({ codepage: 'utf8', data: '@cosme NAGOYA\n' });
  request += builder.createTextElement({ codepage: 'utf8', data: 'SHISEIDO POPUP EVENT\n' });
  const titleCanvas = _buildTextCanvas(['肌運命を導く', '素肌美キャラ占い'], 44, true);
  request += builder.createBitImageElement({
    context: titleCanvas.ctx, x: 0, y: 0, width: titleCanvas.w, height: titleCanvas.h });

  // 診断結果タイトル
  request += builder.createTextElement({ codepage: 'utf8',
    data: '================================\n' });
  request += builder.createTextElement({ codepage: 'utf8', data: '診断結果\n' });
  request += builder.createTextElement({ codepage: 'utf8',
    data: '================================\n' });

  // 結果名（Noto Serif JP・ビットマップ）
  const resultNameCanvas = _buildTextCanvas([r.name], 52, true, 'center', '"Noto Sans JP", sans-serif');
  request += builder.createBitImageElement({
    context: resultNameCanvas.ctx, x: 0, y: 0, width: resultNameCanvas.w, height: resultNameCanvas.h });
  request += builder.createTextElement({ emphasis: false, width: 1, height: 1,
    codepage: 'utf8', data: state.subMessage + '\n' });

  // キャラクターイラスト（上下余白トリム済み）
  if (charaImg) {
    request += builder.createBitImageElement({
      context: charaImg.ctx, x: 0, y: 0, width: charaImg.w, height: charaImg.h });
  }

  request += builder.createTextElement({ codepage: 'utf8',
    data: '--------------------------------\n' });

  // 運勢
  request += builder.createTextElement({ codepage: 'utf8', data: '仕事運  ' + state.luck.work  + '\n' });
  request += builder.createTextElement({ codepage: 'utf8', data: '恋愛運  ' + state.luck.love  + '\n' });
  request += builder.createTextElement({ codepage: 'utf8', data: '金　運  ' + state.luck.money + '\n' });

  // おすすめ商品（合成キャンバス）
  request += builder.createTextElement({ codepage: 'utf8',
    data: '--------------------------------\n' });
  request += builder.createTextElement({ codepage: 'utf8', data: 'あなたにおすすめなのは・・・\n' });
  if (productRowImg) {
    request += builder.createBitImageElement({
      context: productRowImg.ctx, x: 0, y: 0, width: productRowImg.w, height: productRowImg.h });
  }

  // @cosme QRセクション
  request += builder.createTextElement({ codepage: 'utf8',
    data: '--------------------------------\n' });
  request += builder.createTextElement({ codepage: 'utf8',
    data: '商品詳細はこちら！\n' });
  if (cosmeQrImg) {
    request += builder.createBitImageElement({
      context: cosmeQrImg.ctx, x: 0, y: 0, width: cosmeQrImg.w, height: cosmeQrImg.h });
  }

  // X QRセクション（ハッシュタグ付き）
  request += builder.createTextElement({ codepage: 'utf8',
    data: '--------------------------------\n' });
  request += builder.createTextElement({ codepage: 'utf8',
    data: '診断結果をシェアしてね！\n' });
  if (xQrImg) {
    request += builder.createBitImageElement({
      context: xQrImg.ctx, x: 0, y: 0, width: xQrImg.w, height: xQrImg.h });
  }
  const xHashtags = r.category === 'GLOW'
    ? '#SHISEIDO\n#２つのファンデ美容液体験\n#アットコスメナゴヤ\n#エッセンススキングロウファンデーション\n'
    : '#SHISEIDO\n#２つのファンデ美容液体験\n#アットコスメナゴヤ\n#エッセンススキンスムースファンデーション\n';
  request += builder.createTextElement({ codepage: 'utf8', data: xHashtags });

  // フッター
  request += builder.createTextElement({ codepage: 'utf8',
    data: '================================\n' });
  const msgCanvas = _buildTextCanvas([state.message], 30, false);
  request += builder.createBitImageElement({
    context: msgCanvas.ctx, x: 0, y: 0, width: msgCanvas.w, height: msgCanvas.h });
  if (logoImg) {
    request += builder.createBitImageElement({
      context: logoImg.ctx, x: 0, y: 0, width: logoImg.w, height: logoImg.h });
  }

  // 本体レシートとの区切り罫線（物理カットはせず、他セクションと同じ罫線表現）
  request += builder.createTextElement({ codepage: 'utf8',
    data: '--------------------------------\n' });

  // パウチサンプル進呈スタンプ欄（実寸30mm×30mm）
  request += builder.createTextElement({ codepage: 'utf8', data: 'パウチサンプル進呈\n' });
  const stampCanvas = _buildStampBoxCanvas(30);
  request += builder.createBitImageElement({
    context: stampCanvas.ctx, x: 0, y: 0, width: stampCanvas.w, height: stampCanvas.h });

  request += builder.createFeedElement({ line: 2 });

  // カット
  request += builder.createCutPaperElement({ feed: true });

  const trader = new StarWebPrintTrader({ url: printerUrl });

  trader.onReceive = function (response) {
    if (response.traderSuccess !== 'true') {
      console.warn('webPRNT: 印刷失敗', response);
      printByBrowser();
    }
  };
  trader.onError   = function (response) { console.error('webPRNT: エラー', response); printByBrowser(); };
  trader.onTimeout = function ()          { console.warn('webPRNT: タイムアウト');      printByBrowser(); };

  trader.sendMessage({ request });
}

/* ========================================
   13. TOP に戻る
   ======================================== */
function goToTop() {
  document.querySelectorAll('#screen-result .btn-print').forEach(b => b.disabled = false);
  document.body.classList.remove('result-mode');
  showScreen('screen-top');
  startSparkles();
}

/* ========================================
   13.5 きらきらエフェクト
   ======================================== */
let _sparkleTimer = null;

function createSparkle() {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const size   = Math.random() * 22 + 10;          // 10〜32px
  const x      = Math.random() * 800;
  const y      = Math.random() * 1100;
  const dur    = (Math.random() * 0.6 + 0.7).toFixed(2); // 0.7〜1.3s
  const colors = ['#ffffff', '#ffe08a', '#ffd04a', '#fff4c2'];
  const color  = colors[Math.floor(Math.random() * colors.length)];

  const el = document.createElement('div');
  el.className = 'sparkle';
  el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;--dur:${dur}s;`;

  // 4点星形SVG
  el.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <path d="M50,0 C52,38 62,48 100,50 C62,52 52,62 50,100 C48,62 38,52 0,50 C38,48 48,38 50,0Z" fill="${color}" opacity="0.9"/>
  </svg>`;

  container.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

function startSparkles() {
  stopSparkles();
  // 最初にまとめて出現
  for (let i = 0; i < 10; i++) {
    setTimeout(createSparkle, i * 80);
  }
  // その後ランダム間隔で断続的に生成
  function scheduleNext() {
    const interval = Math.random() * 200 + 100; // 100〜300ms
    _sparkleTimer = setTimeout(() => {
      const count = Math.random() < 0.4 ? 3 : 2; // 40%の確率で3個、それ以外2個
      for (let i = 0; i < count; i++) createSparkle();
      scheduleNext();
    }, interval);
  }
  scheduleNext();
}

function stopSparkles() {
  clearTimeout(_sparkleTimer);
  _sparkleTimer = null;
  const container = document.getElementById('sparkle-container');
  if (container) container.innerHTML = '';
}

/* ========================================
   14. 初期化
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-top');
  startSparkles();
  preloadCharaImages();
});

function preloadCharaImages() {
  const paths = Object.values(results)
    .map(r => r.imgPath)
    .filter(Boolean);
  paths.forEach(src => { new Image().src = src; });
}

/* ========================================
   DEV: レシートプレビュー直行（本番では非表示）
   ======================================== */
function devJumpToReceipt(resultKey) {
  const r = results[resultKey];
  const matchingKeys = Object.keys(resultMap).filter(k => resultMap[k] === resultKey);
  const answerKey = pickRandom(matchingKeys);
  const m = messageMap[answerKey] || { sub: r.subCopy, msg: pickRandom(r.messages) };
  state.resultKey  = resultKey;
  state.subMessage = m.sub;
  state.message    = m.msg;
  state.luck       = { work: randomStars(2), love: randomStars(2), money: randomStars(2) };
  buildReceiptDOM();
  showScreen('screen-receipt');
}

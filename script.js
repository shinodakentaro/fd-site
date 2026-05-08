/* ========================================
   肌ムード診断 - メインスクリプト
   ========================================

   画面一覧:
     screen-top          : トップ画面
     screen-quiz         : 診断質問画面
     screen-result-seal  : 診断結果シール案内（タブレット用）
     screen-vote         : 体験後投票画面
     screen-result       : 診断結果画面
     screen-card         : 結果カード画面

   URLパラメータ:
     ?type=glow / clear / soft / refined / natural / mood
     パラメータなし → タブレット診断モード
     パラメータあり → 投票画面から開始
*/

/* ========================================
   1. 診断タイプ定義
   ======================================== */
const TYPES = {
  glow: {
    key:          'glow',
    name:         'Glow Veil 肌',
    copy:         '光をまとった、みずみずしい印象へ',
    recommend:    'ツヤ寄り',
    staffPoint:   '乾燥やくすみが気になる方には、光感と保湿感を中心にご説明ください。ツヤ仕上がりによる透明感向上の効果を実感いただけます。',
    staffTalk:    '「お肌にうるおいが加わると、くすみが飛んで明るく見えますよ。このツヤ感、いかがですか？」',
    finishText:   'みずみずしいツヤ仕上げで、明るくフレッシュな印象に。',
    moodText:     '今日の肌ムードは、光に満ちたみずみずしさ',
    summerTips: [
      { icon: '💧', title: '保湿を夏でも手抜きしない', body: 'エアコンの冷気で乾燥しやすいこの肌タイプ。軽めのジェル保湿剤を日中もプラスして、ツヤの土台を守りましょう。' },
      { icon: '☀️', title: '日焼け止めは潤い感のあるタイプを', body: '紫外線によるくすみを防ぎつつ、ツヤ感を損なわないSPF50の美容液系日焼け止めがおすすめ。顔全体に均一に伸ばして。' },
      { icon: '✨', title: 'ミスト化粧水で日中の乾燥をケア', body: '汗や冷房で失われたうるおいを、携帯ミストでこまめに補給。ツヤが復活して崩れにくくなります。' },
    ],
  },
  clear: {
    key:          'clear',
    name:         'Clear Fresh 肌',
    copy:         '明るく澄んだ、フレッシュな印象へ',
    recommend:    'ツヤ寄り',
    staffPoint:   '透明感や軽やかさを重視する方には、薄膜感と自然な明るさをお伝えください。重くなりすぎない素肌感が強みです。',
    staffTalk:    '「薄づきなのにしっかりカバーできるんです。素肌っぽいのに綺麗、という感じが人気なんですよ。」',
    finishText:   '薄膜のツヤ感で、素肌のような透明感を演出。',
    moodText:     '今日の肌ムードは、素肌が輝くクリアな透明感',
    summerTips: [
      { icon: '🍋', title: 'ビタミンC系スキンケアで透明感をキープ', body: '日焼けによるメラニン生成を防ぐために、朝のスキンケアにビタミンC誘導体の美容液を取り入れるのがおすすめ。' },
      { icon: '☀️', title: '軽いテクスチャーの日焼け止めを選ぶ', body: '重ためのSPFアイテムはせっかくの軽やかな仕上がりを損ないます。ウォータータイプやジェルタイプを選びましょう。' },
      { icon: '💦', title: '夏こそ「水洗いで落とせる」コスメを活用', body: 'クレンジングの摩擦が透明感の大敵。落としやすいタイプのファンデを選ぶと、洗顔後の肌が明るくキープされます。' },
    ],
  },
  soft: {
    key:          'soft',
    name:         'Soft Matte 肌',
    copy:         'ふんわり上品な、なめらか印象へ',
    recommend:    'マット寄り',
    staffPoint:   '毛穴や凹凸が気になる方には、なめらかさと均一感を中心にご説明ください。肌表面を整えるセミマット感が効果的です。',
    staffTalk:    '「肌の凹凸をなめらかに整えて、ふんわりした質感に仕上がります。素肌みたいな自然さが特徴です。」',
    finishText:   'ソフトマット仕上げで、なめらかで均一な肌へ。',
    moodText:     '今日の肌ムードは、ふんわりなめらかな上品さ',
    summerTips: [
      { icon: '🧴', title: '毛穴カバー下地を夏も活用', body: '皮脂で毛穴が開きやすい夏は、皮脂コントロール成分入りの下地が◎。ファンデの前に薄くなじませるだけで仕上がりが段違いに。' },
      { icon: '🌿', title: 'スキンケアを軽くして毛穴を詰まらせない', body: 'こってりした乳液は夏場に毛穴を詰まらせる原因に。軽めのジェルタイプに切り替え、スッキリとした肌を保ちましょう。' },
      { icon: '🪶', title: 'あぶらとりはやさしくそっと', body: '強くこすると毛穴まわりの肌を刺激してしまいます。あぶらとり紙は押さえるだけ。使いすぎも乾燥を招くので注意。' },
    ],
  },
  refined: {
    key:          'refined',
    name:         'Refined Matte 肌',
    copy:         '落ち着きのある、洗練された印象へ',
    recommend:    'マット寄り',
    staffPoint:   'テカリや崩れが気になる方には、さらっと感と持続感をお伝えください。長時間キープできるマット感が強みです。',
    staffTalk:    '「時間が経ってもテカりにくく、さらっとした仕上がりが続きます。大事な場面でも安心ですよ。」',
    finishText:   '崩れにくいマット仕上げで、凛とした洗練された印象に。',
    moodText:     '今日の肌ムードは、時間が経っても続く洗練の美しさ',
    summerTips: [
      { icon: '🛡️', title: 'セッティングパウダーで皮脂をブロック', body: 'ファンデの上から薄くフィニッシングパウダーをはたくと、皮脂によるテカりを長時間防止。夕方のよれを大幅に軽減します。' },
      { icon: '🌬️', title: 'Tゾーンはあぶらとり紙でピンポイントケア', body: 'べたつきが気になる額・鼻・あごは午後にあぶらとり紙を活用。押さえるだけでサラサラ感が復活し、マット感が続きます。' },
      { icon: '🚿', title: '夜のクレンジングをていねいに', body: '日中の皮脂や汚れをしっかり落とすことが翌朝のテカり防止につながります。ダブル洗顔で毛穴をすっきり清潔に保ちましょう。' },
    ],
  },
  natural: {
    key:          'natural',
    name:         'Natural Balance 肌',
    copy:         '素肌感を活かした、自然な印象へ',
    recommend:    'バランス型',
    staffPoint:   '厚塗り感が苦手な方には、自然なカバー感を中心にご説明ください。素肌感と程よいカバーのバランスが特徴です。',
    staffTalk:    '「素肌感を残しながら、気になる部分だけしっかりカバー。ナチュラルなのに肌が綺麗に見えるのが魅力です。」',
    finishText:   '素肌感を活かしたバランス仕上げで、自然な美しさに。',
    moodText:     '今日の肌ムードは、ありのままの素肌を活かした自然美',
    summerTips: [
      { icon: '🌸', title: '日焼け止め下地で工程を減らす', body: '厚塗りが苦手な方は、SPF機能付きの美容液下地を活用。スキンケア+日焼け止め+下地を一本でこなすことで、軽やかな素肌感をキープ。' },
      { icon: '🫧', title: '洗顔はぬるま湯でやさしく', body: '夏は汗や皮脂が多いからと、熱いお湯やゴシゴシ洗いは禁物。バリア機能を守ることが、ナチュラルな素肌の底上げになります。' },
      { icon: '🍃', title: 'コンシーラーで「引き算」補正', body: '全体にカバーするより、気になる部分にだけコンシーラーをプラス。素肌感を残したまま清潔感がアップするテクニックです。' },
    ],
  },
  mood: {
    key:          'mood',
    name:         'Mood Change 肌',
    copy:         '気分に合わせて質感を楽しむ印象へ',
    recommend:    '両方提案',
    staffPoint:   'ツヤ・マットどちらも気になる方には、シーン別の使い分けをご提案ください。気分や場面に合わせて楽しめる自由さが魅力です。',
    staffTalk:    '「朝はツヤで明るく、夜の集まりにはマットで落ち着いた雰囲気に。気分で変えられるのが楽しいですよ。」',
    finishText:   'ツヤとマットを気分でセレクト。自在に表情を変えるお肌へ。',
    summerTips: [
      { icon: '🔄', title: '朝はマット・夜はツヤの使い分けを習慣に', body: '汗ばむ日中はマット系で崩れにくく、夜の集まりや夕方のお出かけにはツヤ系で華やかに。気分に合わせた切り替えが夏の正解。' },
      { icon: '🌞', title: 'どちらのタイプにもSPFケアは必須', body: 'ツヤ・マット問わず、紫外線ダメージが積み重なると肌質が変わることも。日焼け止めだけは毎日しっかり取り入れましょう。' },
      { icon: '🎨', title: 'ベースを薄づきにしてメイクを楽しむ', body: '夏はベースを薄めにして、アイやリップで季節感を出すのがおすすめ。ファンデの量を減らすことで崩れにくく、素肌感もアップ。' },
    ],
    moodText:     '今日の肌ムードは、気分で楽しむ自由な質感チェンジ',
  },
};

/* ========================================
   2. 診断質問定義
   スコア設計: 各回答に6タイプのスコアを付与する
   ======================================== */
const QUESTIONS = [
  {
    text: 'Q1. 今日なりたい印象は？',
    options: [
      {
        label: 'A',
        text:  '明るくフレッシュ',
        scores: { glow: 2, clear: 2, soft: 0, refined: 0, natural: 1, mood: 0 },
      },
      {
        label: 'B',
        text:  '落ち着いて上品',
        scores: { glow: 0, clear: 0, soft: 2, refined: 2, natural: 0, mood: 1 },
      },
      {
        label: 'C',
        text:  '自然体で軽やか',
        scores: { glow: 1, clear: 1, soft: 0, refined: 0, natural: 2, mood: 2 },
      },
    ],
  },
  {
    text: 'Q2. 気になる肌悩みは？',
    options: [
      {
        label: 'A',
        text:  '乾燥・くすみ',
        scores: { glow: 2, clear: 1, soft: 0, refined: 0, natural: 1, mood: 1 },
      },
      {
        label: 'B',
        text:  'テカリ・毛穴',
        scores: { glow: 0, clear: 0, soft: 1, refined: 2, natural: 1, mood: 1 },
      },
      {
        label: 'C',
        text:  '毛穴・凹凸',
        scores: { glow: 0, clear: 0, soft: 2, refined: 1, natural: 1, mood: 1 },
      },
    ],
  },
  {
    text: 'Q3. 好きな仕上がりは？',
    options: [
      {
        label: 'A',
        text:  'みずみずしいツヤ',
        scores: { glow: 2, clear: 1, soft: 0, refined: 0, natural: 1, mood: 1 },
      },
      {
        label: 'B',
        text:  'さらっとマット',
        scores: { glow: 0, clear: 0, soft: 1, refined: 2, natural: 1, mood: 1 },
      },
      {
        label: 'C',
        text:  'どちらも気になる',
        scores: { glow: 1, clear: 1, soft: 1, refined: 1, natural: 1, mood: 3 },
      },
    ],
  },
  {
    text: 'Q4. メイクで重視したいことは？',
    options: [
      {
        label: 'A',
        text:  '透明感',
        scores: { glow: 1, clear: 2, soft: 0, refined: 0, natural: 1, mood: 1 },
      },
      {
        label: 'B',
        text:  '崩れにくさ',
        scores: { glow: 0, clear: 0, soft: 1, refined: 2, natural: 1, mood: 1 },
      },
      {
        label: 'C',
        text:  '自然なカバー感',
        scores: { glow: 1, clear: 0, soft: 1, refined: 0, natural: 2, mood: 1 },
      },
    ],
  },
];

/* ========================================
   3. 仮の投票結果データ（タイプ別・ツヤ/マット比率）
   ======================================== */
const VOTE_DATA = {
  glow:    { glow: 68, matte: 32 },
  clear:   { glow: 72, matte: 28 },
  soft:    { glow: 34, matte: 66 },
  refined: { glow: 24, matte: 76 },
  natural: { glow: 52, matte: 48 },
  mood:    { glow: 56, matte: 44 },
};

/* ========================================
   4. アプリ状態管理
   ======================================== */
const state = {
  resultType: null,   // 表示中の肌タイプキー
  voteChoice: null,   // 投票結果 'glow' or 'matte'
};

/* ========================================
   5. 初期化
   ======================================== */
function init() {
  const params    = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');

  if (typeParam && TYPES[typeParam]) {
    // URLパラメータあり → そのタイプで投票画面を開始
    state.resultType = typeParam;
    renderVoteScreen(typeParam);
  } else {
    // URLパラメータなし → デモ用タイプ選択バナーを表示してデフォルトタイプを描画
    renderDemoSelector();
    state.resultType = 'mood';   // デフォルト表示タイプ
    renderVoteScreen('mood');
  }
}

/* ========================================
   6. デモ用タイプ選択バナー
   （URLパラメータなし時にのみ表示）
   ======================================== */
function renderDemoSelector() {
  const banner = document.getElementById('demo-selector');
  const btns   = document.getElementById('demo-selector-btns');
  banner.style.display = 'block';

  btns.innerHTML = Object.values(TYPES).map(t => `
    <button class="demo-type-btn" onclick="switchDemoType('${t.key}')">
      ${t.name}
    </button>
  `).join('');
}

/* デモ用タイプ切り替え */
function switchDemoType(typeKey) {
  state.resultType = typeKey;
  state.voteChoice = null;
  renderVoteScreen(typeKey);
  // アクティブボタンをハイライト
  document.querySelectorAll('.demo-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === TYPES[typeKey].name);
  });
}

/* ========================================
   7. 画面切り替え
   ======================================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    target.scrollTop = 0;
  }
}

/* ========================================
   8. 投票画面レンダリング
   ======================================== */
function renderVoteScreen(typeKey) {
  const type = TYPES[typeKey];

  // 投票結果エリアをリセット・投票ボタンを再表示
  document.getElementById('vote-result').style.display = 'none';
  document.getElementById('vote-buttons').style.display = '';
  document.getElementById('bar-glow').style.width  = '0%';
  document.getElementById('bar-matte').style.width = '0%';
  document.getElementById('pct-glow').textContent  = '0%';
  document.getElementById('pct-matte').textContent = '0%';
}

/* ========================================
   14. 投票処理
   ======================================== */
function vote(choice) {
  state.voteChoice = choice;

  // 投票ボタンを非表示
  document.querySelector('.vote-buttons').style.display = 'none';

  // 仮の集計データを取得
  const data = VOTE_DATA[state.resultType] || { glow: 50, matte: 50 };

  // 結果エリアを表示してバーアニメーション
  const resultEl = document.getElementById('vote-result');
  resultEl.style.display = 'block';

  // アニメーション開始（少し遅延させてDOMが表示された後に）
  setTimeout(() => {
    document.getElementById('bar-glow').style.width  = data.glow  + '%';
    document.getElementById('bar-matte').style.width = data.matte + '%';
    document.getElementById('pct-glow').textContent  = data.glow  + '%';
    document.getElementById('pct-matte').textContent = data.matte + '%';
  }, 80);
}

/* ========================================
   15. 結果画面へ
   ======================================== */
function goToResultScreen() {
  const typeKey  = state.resultType;
  const vote     = state.voteChoice;
  const type     = TYPES[typeKey];

  // バッジ
  const badge = document.getElementById('result-badge');
  badge.style.cssText = ''; // リセット
  // type別の背景色
  const badgeColors = {
    glow:    'linear-gradient(135deg, #fde8d0, #f7c5a0)',
    clear:   'linear-gradient(135deg, #fce8f0, #f2a7c3)',
    soft:    'linear-gradient(135deg, #f0e8f8, #d4b8e8)',
    refined: 'linear-gradient(135deg, #e8eff8, #a8c0d8)',
    natural: 'linear-gradient(135deg, #f0f5e8, #c8d8a8)',
    mood:    'linear-gradient(135deg, #fde8d0, #f2a7c3)',
  };
  badge.style.background = badgeColors[typeKey] || badgeColors.natural;

  // タイトルとコメント
  document.getElementById('result-type-name').textContent = `あなたは ${type.name}`;

  // 投票結果に応じたコメント
  const voteLabel = vote === 'glow' ? 'ツヤ派' : 'マット派';
  const voteDesc  = vote === 'glow'
    ? 'みずみずしいツヤ感で、明るく生き生きとした印象に。'
    : 'さらっとしたマット感で、凛と整った印象に。';
  document.getElementById('result-comment').textContent =
    `体験後は${voteLabel}を選ばれました。${voteDesc}`;

  // 商品カードのハイライト
  document.getElementById('product-glow').classList.toggle('highlight',  vote === 'glow');
  document.getElementById('product-matte').classList.toggle('highlight', vote === 'matte');

  // 夏のお手入れtipsをレンダリング
  renderSummerTips(type);

  showScreen('screen-result');
}

/* ========================================
   15-1. 夏のお手入れtipsレンダリング
   ======================================== */
function renderSummerTips(type) {
  const section = document.getElementById('summer-tips-section');
  if (!type.summerTips || type.summerTips.length === 0) {
    section.innerHTML = '';
    return;
  }

  const tipsHTML = type.summerTips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div class="tip-body">
        <p class="tip-title">${tip.title}</p>
        <p class="tip-text">${tip.body}</p>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="tips-section">
      <div class="tips-section-header">
        <span class="tips-season-badge">&#9728; 夏のケア</span>
        <span class="tips-section-title">今の季節のお手入れポイント</span>
      </div>
      <div class="tips-list">
        ${tipsHTML}
      </div>
    </div>
  `;
}


/* ========================================
   17. 投票画面に戻る
   ======================================== */
function restartDiagnosis() {
  state.voteChoice = null;
  renderVoteScreen(state.resultType);
  showScreen('screen-vote');
}

/* ========================================
   18. エントリーポイント
   ======================================== */
document.addEventListener('DOMContentLoaded', init);

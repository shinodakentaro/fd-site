/* ========================================
   キャラクター定義
   ======================================== */
const CHARACTERS = {
  kirari: {
    key:    'kirari',
    name:   'キラリ',
    type:   'glow',
    catch:  'キラキラ輝く、元気の星！',
    desc:   'ポジティブオーラ全開！\nツヤ感で毎日をキラキラと輝かせる存在。',
    c1:     '#ff85a1',
    c2:     '#ffd700',
    sym:    '\u2726',   // ✦
  },
  urumin: {
    key:    'urumin',
    name:   'ウルミン',
    type:   'glow',
    catch:  'うるおいたっぷり、透明感の雫',
    desc:   'みずみずしさと透明感が武器。\n肌の奥からにじみ出る輝きを持つ。',
    c1:     '#7ecfd6',
    c2:     '#f2a7c3',
    sym:    '\u273f',   // ✿
  },
  sarasa: {
    key:    'sarasa',
    name:   'サラサ',
    type:   'matte',
    catch:  'クールに決める、凛の美学',
    desc:   'さらっとした洗練された仕上がりが信条。\n上品なマット感で存在感を放つ。',
    c1:     '#5a7a8f',
    c2:     '#c8b89a',
    sym:    '\u25c6',   // ◆
  },
  fuwamaru: {
    key:    'fuwamaru',
    name:   'フワマル',
    type:   'matte',
    catch:  'ふわっとやさしく、ほっこり派',
    desc:   'ふわふわのテクスチャーとやさしい雰囲気が魅力。\nマットでも柔らかな印象に仕上げる。',
    c1:     '#d4b8e8',
    c2:     '#f5e6d3',
    sym:    '\u25cf',   // ●
  },
  mood: {
    key:    'mood',
    name:   'ムードちゃん',
    type:   'neutral',
    catch:  '気分で変わる、自由な存在',
    desc:   'ツヤもマットも、気分次第。\nその日の自分に合わせて楽しむのが流儀。',
    c1:     '#f2a7c3',
    c2:     '#a8c0d8',
    sym:    '\u25d1',   // ◑
  },
};

/* ========================================
   LocalStorage
   ======================================== */
const STORAGE_KEY = 'skin-mood-battle-v1';

function getVoteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return { glow: 58, matte: 42, recent: [], lastUpdate: 0 };
}

function saveVoteData(data) {
  data.lastUpdate = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ========================================
   ルーティング
   ======================================== */
function init() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('screen') === 'monitor') {
    document.getElementById('screen-vote').style.display    = 'none';
    document.getElementById('screen-monitor').style.display = 'flex';
    initMonitor();
  } else {
    initVote(p.get('char'));
  }
}

/* ========================================
   投票画面
   ======================================== */
let currentChar = null;
let hasVoted    = false;

function initVote(charKey) {
  const char = CHARACTERS[charKey] || CHARACTERS.mood;
  currentChar = char;
  renderVoteStage(char);
}

function renderVoteStage(char) {
  const stage = document.getElementById('v-stage');
  stage.innerHTML = `
    <div class="char-av c-${char.key}">
      <div class="char-glow-ring"></div>
      <span class="char-sym">${char.sym}</span>
    </div>
    <div class="char-name">${char.name}</div>
    <p class="char-catch">${char.catch}</p>
    <p class="char-desc">${char.desc.replace(/\n/g, '<br>')}</p>
  `;
}

function castVote(voteType) {
  if (hasVoted) return;
  hasVoted = true;

  const data = getVoteData();
  data[voteType]++;
  data.recent.unshift({
    char:     currentChar.key,
    charName: currentChar.name,
    vote:     voteType,
    time:     Date.now(),
  });
  if (data.recent.length > 30) data.recent = data.recent.slice(0, 30);
  saveVoteData(data);

  showVoteComplete(voteType);
}

function showVoteComplete(voteType) {
  const isGlow  = voteType === 'glow';
  const label   = isGlow ? 'ツヤ派' : 'マット派';

  document.getElementById('v-action').style.display = 'none';

  const overlay = document.getElementById('v-complete');
  overlay.classList.add('active');

  document.getElementById('vc-title').textContent = label + 'で参加！';
  document.getElementById('vc-emoji').textContent = isGlow ? '✨' : '🌿';

  // Mini avatar in card
  const wrap = document.getElementById('vc-char-wrap');
  wrap.innerHTML = `
    <div class="char-av c-${currentChar.key}">
      <div class="char-glow-ring"></div>
      <span class="char-sym">${currentChar.sym}</span>
    </div>
  `;

  spawnBurst(isGlow);
}

function spawnBurst(isGlow) {
  const container = document.getElementById('vc-particles');
  const colors = isGlow
    ? ['#ffd700', '#ff85a1', '#fff', '#ffa07a', '#ffe066', '#f2a7c3']
    : ['#7a8fa6', '#c8b89a', '#fff', '#d4c8b8', '#a8b8c8', '#e8eff8'];

  for (let i = 0; i < 44; i++) {
    const p    = document.createElement('div');
    p.className = 'burst-p';
    const angle = (i / 44) * 360;
    const dist  = 60 + Math.random() * 130;
    const size  = 4 + Math.random() * 11;
    p.style.cssText = `
      --angle: ${angle}deg;
      --dist:  ${dist}px;
      width:   ${size}px;
      height:  ${size}px;
      background: ${colors[i % colors.length]};
      border-radius: ${Math.random() > 0.4 ? '50%' : '3px'};
      animation-delay:    ${Math.random() * 0.35}s;
      animation-duration: ${0.8 + Math.random() * 0.7}s;
    `;
    container.appendChild(p);
  }
}

/* ========================================
   モニター画面
   ======================================== */
let monData    = null;
let lastUpdate = 0;

function initMonitor() {
  monData    = getVoteData();
  lastUpdate = monData.lastUpdate || 0;

  updateDisplay(false);

  // 既存の投票データをゾーンに配置（最大12件）
  if (monData.recent && monData.recent.length > 0) {
    monData.recent.slice(0, 12).forEach((item, i) => {
      setTimeout(() => placeInZone(item.char, item.vote, false), i * 90);
    });
  }

  // 新しい投票をポーリング
  setInterval(pollUpdates, 1500);

  // デモ用自動投票シミュレーション（プロトタイプ向け）
  scheduleDemo();
}

function pollUpdates() {
  const fresh = getVoteData();
  if (fresh.lastUpdate > lastUpdate) {
    const newVotes = fresh.recent.filter(r => r.time > lastUpdate);
    lastUpdate = fresh.lastUpdate;
    monData    = fresh;

    newVotes.forEach((v, i) => {
      setTimeout(() => {
        flyCharacter(v.char, v.vote);
        setTimeout(() => updateDisplay(true), 950);
      }, i * 450);
    });

    if (newVotes.length === 0) {
      updateDisplay(false);
    }
  }
}

function updateDisplay(animated) {
  const { glow, matte } = monData;
  const total   = glow + matte;
  const glowPct = total > 0 ? Math.round((glow / total) * 100) : 50;
  const mattPct = 100 - glowPct;

  const animNum = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (animated && el.textContent !== String(val)) {
      el.style.animation = 'none';
      void el.offsetHeight; // reflow
      el.style.animation  = 'count-pop .35s ease-out';
    }
    el.textContent = val;
  };

  animNum('glow-num', glow);
  animNum('matte-num', matte);
  document.getElementById('m-total').textContent   = total + ' votes';
  document.getElementById('pct-glow').textContent  = glowPct + '%';
  document.getElementById('pct-matte').textContent = mattPct + '%';
  document.getElementById('bar-glow').style.width  = glowPct + '%';
  document.getElementById('bar-matte').style.width = mattPct + '%';

  renderRecent(monData.recent);
}

function renderRecent(recent) {
  const list = document.getElementById('recent-list');
  if (!recent || recent.length === 0) return;

  list.innerHTML = recent.slice(0, 10).map(item => {
    const char   = CHARACTERS[item.char] || CHARACTERS.mood;
    const isGlow = item.vote === 'glow';
    const tag    = isGlow ? 'ツヤ派' : 'マット派';
    const cls    = isGlow ? 'r-glow-tag' : 'r-matte-tag';
    const bg     = `linear-gradient(135deg, ${char.c1}, ${char.c2})`;
    return `
      <div class="r-chip">
        <div class="r-av" style="background:${bg}">${char.sym}</div>
        <span class="r-name">${char.name}</span>
        <span class="r-vote ${cls}">${tag}</span>
      </div>
    `;
  }).join('');
}

/* ---- Flying Character Animation ---- */
function flyCharacter(charKey, voteType) {
  const char  = CHARACTERS[charKey] || CHARACTERS.mood;
  const stage = document.getElementById('fly-stage');
  const el    = document.createElement('div');
  el.className = `fly-char to-${voteType}`;
  el.style.background = `linear-gradient(135deg, ${char.c1}, ${char.c2})`;
  el.innerHTML = `<span style="position:relative;z-index:1;">${char.sym}</span>`;
  stage.appendChild(el);

  el.addEventListener('animationend', () => {
    el.remove();
    placeInZone(charKey, voteType, true);
    spawnLandingParticles(voteType, char.c1);
  }, { once: true });
}

/* ---- Place Avatar in Zone ---- */
function placeInZone(charKey, voteType, animated) {
  const char   = CHARACTERS[charKey] || CHARACTERS.mood;
  const crowd  = document.getElementById(voteType === 'glow' ? 'glow-crowd' : 'matte-crowd');
  const el     = document.createElement('div');

  el.className = 'zone-av' + (animated ? ' arriving' : '');
  el.style.cssText = `
    left:       ${14 + Math.random() * 72}%;
    top:        ${14 + Math.random() * 68}%;
    background: linear-gradient(135deg, ${char.c1}, ${char.c2});
    --dur:      ${2.4 + Math.random() * 2.2}s;
    --delay:    -${Math.random() * 3}s;
  `;
  el.innerHTML = `<span>${char.sym}</span><small>${char.name}</small>`;
  crowd.appendChild(el);

  // 多すぎたら古いものを削除
  const all = crowd.querySelectorAll('.zone-av');
  if (all.length > 15) all[0].remove();
}

/* ---- Landing Particles ---- */
function spawnLandingParticles(voteType, baseColor) {
  const stage  = document.getElementById('ptcl-stage');
  const isGlow = voteType === 'glow';
  const baseX  = isGlow ? '22%' : '78%';
  const colors = isGlow
    ? [baseColor, '#ffd700', '#fff', '#ff85a1']
    : [baseColor, '#c8b89a', '#fff', '#a8c8d8'];

  for (let i = 0; i < 22; i++) {
    const p      = document.createElement('div');
    p.className  = 'ptcl';
    const angle  = Math.random() * Math.PI * 2;
    const speed  = 55 + Math.random() * 110;
    const size   = 4 + Math.random() * 8;
    p.style.cssText = `
      left:     ${baseX};
      top:      45%;
      width:    ${size}px;
      height:   ${size}px;
      background: ${colors[i % colors.length]};
      --pdx:    ${Math.cos(angle) * speed}px;
      --pdy:    ${Math.sin(angle) * speed - 50}px;
      animation-delay: ${Math.random() * 0.22}s;
    `;
    stage.appendChild(p);
    setTimeout(() => p.remove(), 1600);
  }
}

/* ========================================
   デモ: 自動投票シミュレーション
   プロトタイプ提案用。モニター画面のみで動作。
   ======================================== */
const DEMO_CHARS = ['kirari', 'urumin', 'sarasa', 'fuwamaru', 'mood'];

function scheduleDemo() {
  function next() {
    // 7〜18秒ごとにランダムで新しい投票をシミュレート
    const delay = 7000 + Math.random() * 11000;
    setTimeout(() => {
      const char = DEMO_CHARS[Math.floor(Math.random() * DEMO_CHARS.length)];
      const vote = Math.random() > 0.43 ? 'glow' : 'matte';

      const data = getVoteData();
      data[vote]++;
      data.recent.unshift({
        char,
        charName: CHARACTERS[char].name,
        vote,
        time: Date.now(),
      });
      if (data.recent.length > 30) data.recent = data.recent.slice(0, 30);
      saveVoteData(data);

      next();
    }, delay);
  }
  next();
}

/* ========================================
   エントリーポイント
   ======================================== */
document.addEventListener('DOMContentLoaded', init);

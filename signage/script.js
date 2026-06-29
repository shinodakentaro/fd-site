/* ========================================
   GLOW vs SMOOTH サイネージ
   ======================================== */

const W = 1920;
const H = 1080;

let prevData   = null;
let charaIndex = 0;
const CHARA_COUNT = 3;

// キャラごとの個別位置オフセット（top） index=0:chara1, 1:chara2, 2:chara3
const glowCharaTop = ['160px', '160px', '160px'];

// SMOOTHキャラの表示順（コメントindexに対してどのS_characterを表示するか）
const smoothCharaOrder = [3, 2, 1];

// 吹き出しごとの個別サイズ（width）— 1920px基準
const glowCommentWidths   = ['288px', '307px', '365px'];  // G1丸大文字, G2雲型, G3横長
const smoothCommentWidths = ['365px', '346px', '346px'];  // S1基準, S2横長, S3丸型

/* ── 1920×1080 固定キャンバスをビューポートに合わせてスケール ── */
function scaleToFit() {
  const s  = Math.min(window.innerWidth / W, window.innerHeight / H);
  const ml = (window.innerWidth  - W * s) / 2;
  const mt = (window.innerHeight - H * s) / 2;
  document.body.style.transform  = `scale(${s})`;
  document.body.style.marginLeft = ml + 'px';
  document.body.style.marginTop  = mt + 'px';
}

function applyCommentWidths(i) {
  const gComment = document.querySelector('.sg-comment-glow');
  const sComment = document.querySelector('.sg-comment-smooth');
  if (gComment) gComment.style.width = glowCommentWidths[i];
  if (sComment) sComment.style.width = smoothCommentWidths[i];
}

function cycleAssets() {
  charaIndex = (charaIndex + 1) % CHARA_COUNT;
  const idx = charaIndex + 1;

  const els = [
    document.querySelector('.sg-chara-glow'),
    document.querySelector('.sg-comment-glow'),
    document.querySelector('.sg-comment-smooth'),
    document.querySelector('.sg-chara-smooth'),
  ];

  els.forEach(el => { if (el) el.style.opacity = '0'; });

  setTimeout(() => {
    const [gChara, gComment, sComment, sChara] = els;
    if (gChara)   { gChara.src = `../assets/images/G_character${idx}.png`; gChara.style.top = glowCharaTop[charaIndex]; }
    if (gComment) gComment.src = `../assets/images/G_comment${idx}.png`;
    if (sComment) sComment.src = `../assets/images/S_comment${idx}.png`;
    if (sChara)   sChara.src   = `../assets/images/S_character${smoothCharaOrder[charaIndex]}.png`;
    applyCommentWidths(charaIndex);
    els.forEach(el => { if (el) el.style.opacity = '1'; });
  }, 500);
}

function init() {
  scaleToFit();
  window.addEventListener('resize', scaleToFit);

  applyCommentWidths(0);
  setInterval(cycleAssets, 30000);

  VoteStore.subscribe(data => {
    const { glow = 0, smooth = 0 } = data;
    const fmt = n => n.toLocaleString('ja-JP');

    if (prevData !== null) {
      if (glow   > prevData.glow)   { spawnConfetti('glow');   spawnParticles('glow'); }
      if (smooth > prevData.smooth) { spawnConfetti('smooth'); spawnParticles('smooth'); }
    }
    prevData = { glow, smooth };

    updateNum('glow-num',   fmt(glow),         'count-pop-glow');
    updateNum('smooth-num', fmt(smooth),        'count-pop-glow');
    updateNum('total-num',  fmt(glow + smooth), 'count-pop-glow');
  });
}

function updateNum(id, val, anim) {
  const el = document.getElementById(id);
  if (!el || el.textContent === val) return;
  el.style.animation = 'none';
  void el.offsetHeight;
  el.style.animation = `${anim} .5s ease-out`;
  el.textContent = val;
}

function spawnConfetti(type) {
  const isGlow = type === 'glow';
  const colors = ['#d42b2b', '#e05555', '#ff9999', '#ffcccc', '#ffffff', '#ffaaaa'];
  const xMin = isGlow ? W * 0.5 : 0;
  const xMax = isGlow ? W       : W * 0.5;

  for (let i = 0; i < 55; i++) {
    const el    = document.createElement('div');
    el.className = 'confetti';
    const w     = 6 + Math.random() * 10;
    const h     = Math.random() > 0.5 ? w * 0.4 : w;
    const x     = xMin + Math.random() * (xMax - xMin);
    const delay = Math.random() * 0.6;
    const dur   = 2.2 + Math.random() * 1.4;
    const drift = (Math.random() - 0.5) * 180;
    const rot   = Math.random() * 360;

    el.style.cssText = `
      left: ${x}px;
      width: ${w}px;
      height: ${h}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${h === w ? '50%' : '2px'};
      animation: confetti-fall ${dur}s ease-in ${delay}s forwards;
      --drift: ${drift}px;
      --rot: ${rot}deg;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (delay + dur + 0.2) * 1000);
  }
}

function spawnParticles(type) {
  const symbols = ['❤', '❤', '★', '★', '✦', '✧', '💕', '✨'];
  const isGlow  = type === 'glow';
  // 発生源: 1920×1080 座標系での票数位置
  const originX = isGlow ? W * 0.82 : W * 0.15;
  const originY = H * 0.80;

  for (let i = 0; i < 20; i++) {
    const el     = document.createElement('span');
    el.className = 'particle';
    const angle  = (Math.random() * 220 - 110) * (Math.PI / 180);
    const dist   = 120 + Math.random() * 260;
    const size   = 20 + Math.random() * 28;
    const dur    = 0.8 + Math.random() * 0.7;
    const delay  = Math.random() * 0.35;

    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = `
      left: ${originX + (Math.random() - 0.5) * 60}px;
      top:  ${originY + (Math.random() - 0.5) * 40}px;
      --size: ${size}px;
      --tx: ${Math.sin(angle) * dist}px;
      --ty: ${-Math.abs(Math.cos(angle)) * dist}px;
      --rot: ${(Math.random() - 0.5) * 60}deg;
      --dur: ${dur}s;
      --delay: ${delay}s;
      color: ${['#d42b2b','#ff6b6b','#ff9999','#ffffff'][Math.floor(Math.random() * 4)]};
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (delay + dur + 0.1) * 1000);
  }
}

document.addEventListener('DOMContentLoaded', init);

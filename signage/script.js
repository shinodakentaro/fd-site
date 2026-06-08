/* ========================================
   GLOW vs SMOOTH サイネージ
   ======================================== */

let monData    = null;
let lastUpdate = 0;
let voteCount  = 0; // 表示用連番

/* ----------------------------------------
   初期化
   ---------------------------------------- */
function init() {
  monData    = VoteStore.get();
  lastUpdate = monData.lastUpdate || 0;

  initCanvas();
  updateDisplay(false);

  // 既存データをゾーンへ配置
  if (monData.recent && monData.recent.length > 0) {
    monData.recent.slice(0, 14).forEach((item, i) => {
      setTimeout(() => placeInZone(item.type, false), i * 100);
    });
  }

  // ポーリング開始
  VoteStore.subscribe(onNewVotes, 1500);

  // デモ自動投票 (プロトタイプ用)
  scheduleDemo();
}

/* ----------------------------------------
   新規投票検出コールバック
   ---------------------------------------- */
function onNewVotes(data) {
  const prev     = monData;
  const newItems = data.recent.filter(r => r.time > lastUpdate);
  lastUpdate = data.lastUpdate;
  monData    = data;

  newItems.forEach((v, i) => {
    setTimeout(() => {
      spawnVoteBurst(v.type);
      setTimeout(() => {
        placeInZone(v.type, true);
        updateDisplay(true);
      }, 600);
    }, i * 500);
  });

  if (newItems.length === 0) updateDisplay(false);
}

/* ----------------------------------------
   表示更新
   ---------------------------------------- */
function updateDisplay(animated) {
  const { glow = 0, smooth = 0 } = monData;
  const total     = glow + smooth;
  const glowPct   = total > 0 ? Math.round((glow   / total) * 100) : 50;
  const smoothPct = 100 - glowPct;

  const animNum = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (animated && el.textContent !== String(val)) {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = 'count-pop .4s ease-out';
    }
    el.textContent = val;
  };

  animNum('glow-num', glow);
  animNum('smooth-num', smooth);
  document.getElementById('total-votes').textContent   = total + ' votes';
  document.getElementById('pct-glow').textContent      = glowPct   + '%';
  document.getElementById('pct-smooth').textContent    = smoothPct + '%';
  document.getElementById('bar-glow').style.width      = glowPct   + '%';
  document.getElementById('bar-smooth').style.width    = smoothPct + '%';

  renderRecent(monData.recent);
}

/* ----------------------------------------
   最近の参加者リスト
   ---------------------------------------- */
function renderRecent(recent) {
  if (!recent || recent.length === 0) return;
  const list = document.getElementById('recent-list');
  list.innerHTML = recent.slice(0, 5).map(item => {
    const isGlow = item.type === 'glow';
    const label  = isGlow ? 'GLOW' : 'SMOOTH';
    const cls    = isGlow ? 'r-glow-tag' : 'r-smooth-tag';
    const icon   = isGlow ? '✨' : '🌸';
    return `
      <div class="r-chip">
        <span>${icon}</span>
        <span>参加者</span>
        <span class="r-vote ${cls}">${label}</span>
      </div>
    `;
  }).join('');
}

/* ----------------------------------------
   ゾーンにチップを配置
   ---------------------------------------- */
function placeInZone(type, animated) {
  const crowd = document.getElementById(type === 'glow' ? 'glow-crowd' : 'smooth-crowd');
  const el    = document.createElement('div');
  voteCount++;

  el.className = 'z-chip' + (animated ? ' arriving' : '');
  el.style.cssText = `
    left:    ${10 + Math.random() * 75}%;
    top:     ${10 + Math.random() * 75}%;
    --dur:   ${2.5 + Math.random() * 2}s;
    --delay: -${Math.random() * 3}s;
  `;
  el.textContent = `#${voteCount}`;
  crowd.appendChild(el);

  // 多すぎたら古いものを削除
  const all = crowd.querySelectorAll('.z-chip');
  if (all.length > 18) all[0].remove();
}

/* ----------------------------------------
   新規投票バースト演出
   ---------------------------------------- */
function spawnVoteBurst(type) {
  const isGlow  = type === 'glow';
  const colors  = isGlow
    ? ['#ffd700', '#ffaa00', '#ffffff', '#ff85a1', '#ffe066']
    : ['#a8c8d8', '#c8b8e8', '#ffffff', '#7aaac0', '#d0e8f0'];

  // 画面中央から左右のゾーンへ向かう粒子
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const tx = isGlow ? -window.innerWidth * .28 : window.innerWidth * .28;

  for (let i = 0; i < 30; i++) {
    const p   = document.createElement('div');
    p.className = 'vote-burst';
    const size = 5 + Math.random() * 14;
    const spread = 120;
    p.style.cssText = `
      left: ${cx + (Math.random() - .5) * spread}px;
      top:  ${cy + (Math.random() - .5) * spread}px;
      width: ${size}px; height: ${size}px;
      background: ${colors[i % colors.length]};
      --tx: ${tx + (Math.random() - .5) * 100}px;
      --ty: ${(Math.random() - .5) * 200}px;
      animation-delay: ${Math.random() * .3}s;
      animation-duration: ${.6 + Math.random() * .5}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

/* ----------------------------------------
   Canvas パーティクル (常時演出)
   ---------------------------------------- */
function initCanvas() {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // パーティクル初期化
  const particles = [];
  const COUNT = 80;

  for (let i = 0; i < COUNT; i++) {
    particles.push(makeParticle(true));
  }

  function makeParticle(random) {
    const isGlow = Math.random() > .5;
    return {
      x:     random ? Math.random() * canvas.width : (isGlow ? Math.random() * canvas.width * .4 : canvas.width * .6 + Math.random() * canvas.width * .4),
      y:     random ? Math.random() * canvas.height : canvas.height + 20,
      vx:    (Math.random() - .5) * .4,
      vy:    -.4 - Math.random() * .6,
      size:  1.5 + Math.random() * 3,
      alpha: .1 + Math.random() * .4,
      isGlow,
      life:  Math.random(),
      decay: .0015 + Math.random() * .002,
    };
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0 || p.y < -20) {
        particles[i] = makeParticle(false);
        return;
      }

      const a = p.alpha * p.life;
      ctx.save();
      ctx.globalAlpha = a;

      if (p.isGlow) {
        // GLOW: 金色のキラキラ
        ctx.fillStyle   = '#ffd700';
        ctx.shadowColor = '#ffaa00';
        ctx.shadowBlur  = 6;
        // 星形 (cross)
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.size * 2);
        ctx.lineTo(p.x, p.y + p.size * 2);
        ctx.moveTo(p.x - p.size * 2, p.y);
        ctx.lineTo(p.x + p.size * 2, p.y);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth   = p.size * .7;
        ctx.stroke();
      } else {
        // SMOOTH: パウダー粒子 (ソフトな円)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, 'rgba(200,220,240,1)');
        grad.addColorStop(1, 'rgba(200,220,240,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    requestAnimationFrame(loop);
  }
  loop();
}

/* ----------------------------------------
   デモ自動投票 (モニターのみ動作)
   ---------------------------------------- */
function scheduleDemo() {
  function next() {
    const delay = 6000 + Math.random() * 10000;
    setTimeout(() => {
      const type = Math.random() > .45 ? 'glow' : 'smooth';
      VoteStore.cast(type);
      next();
    }, delay);
  }
  next();
}

document.addEventListener('DOMContentLoaded', init);

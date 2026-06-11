/* ========================================
   GLOW vs SMOOTH サイネージ
   ======================================== */

let monData     = { glow: 0, smooth: 0, updatedAt: 0 };
let isFirstLoad = true;

/* ----------------------------------------
   初期化
   ---------------------------------------- */
function init() {
  initCanvas();

  VoteStore.subscribe(data => {
    if (isFirstLoad) {
      // 初回: アニメーションなしで表示
      monData     = data;
      isFirstLoad = false;
      updateDisplay(false);
    } else {
      // 以降: 差分を見てバースト演出
      const type =
        data.glow   > (monData.glow   || 0) ? 'glow'   :
        data.smooth > (monData.smooth || 0) ? 'smooth' : null;
      monData = data;
      if (type) {
        spawnVoteBurst(type);
        setTimeout(() => updateDisplay(true), 600);
      } else {
        updateDisplay(false);
      }
    }
  });

}

/* ----------------------------------------
   表示更新
   ---------------------------------------- */
function updateDisplay(animated) {
  const { glow = 0, smooth = 0 } = monData;
  const total     = glow + smooth;
  const glowPct   = total > 0 ? Math.round((glow   / total) * 100) : 50;
  const smoothPct = 100 - glowPct;

  const fmt = n => n.toLocaleString('ja-JP');

  const animNum = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (animated && el.textContent !== fmt(val)) {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = 'count-pop .4s ease-out';
    }
    el.textContent = fmt(val);
  };

  animNum('glow-num',   glow);
  animNum('smooth-num', smooth);

  document.getElementById('pct-glow').textContent      = glowPct   + '%';
  document.getElementById('pct-smooth').textContent    = smoothPct + '%';
  document.getElementById('bar-glow').style.width      = glowPct   + '%';
  document.getElementById('bar-smooth').style.width    = smoothPct + '%';

  updateLead(glow, smooth, animated);
}

/* ----------------------------------------
   リード表示更新
   ---------------------------------------- */
function updateLead(glow, smooth, animated) {
  const leadEl = document.getElementById('sg-lead');
  if (!leadEl) return;

  leadEl.style.visibility = 'visible';

  if (glow === smooth) {
    leadEl.textContent = '現在同点！';
    return;
  }

  // 同点時に span が削除されている場合があるので、ここで再取得する
  const name       = glow > smooth ? 'ツヤ派' : 'なめらか派';
  const leadNameEl = document.getElementById('sg-lead-name');
  if (!leadNameEl || leadNameEl.textContent !== name) {
    leadEl.innerHTML = `現在は <span id="sg-lead-name">${name}</span> がリード中！`;
    if (animated) {
      leadEl.classList.remove('updated');
      void leadEl.offsetHeight;
      leadEl.classList.add('updated');
    }
  }
}

/* ----------------------------------------
   新規投票バースト演出
   ---------------------------------------- */
function spawnVoteBurst(type) {
  const colors = ['#ab886a', '#f5e0c8', '#e8c9a8', '#ffffff', '#d4a87a', '#f9c8d4'];
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const tx = type === 'glow' ? -window.innerWidth * .28 : window.innerWidth * .28;

  for (let i = 0; i < 30; i++) {
    const p    = document.createElement('div');
    p.className = 'vote-burst';
    const size = 5 + Math.random() * 14;
    p.style.cssText = `
      left: ${cx + (Math.random() - .5) * 120}px;
      top:  ${cy + (Math.random() - .5) * 120}px;
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
   Canvas パーティクル（常時演出）
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

  const particles = [];
  for (let i = 0; i < 80; i++) particles.push(makeParticle(true));

  function makeParticle(random) {
    return {
      x:     random ? Math.random() * canvas.width : Math.random() * canvas.width,
      y:     random ? Math.random() * canvas.height : canvas.height + 20,
      vx:    (Math.random() - .5) * .4,
      vy:    -.4 - Math.random() * .6,
      size:  1.5 + Math.random() * 3,
      alpha: .1 + Math.random() * .35,
      life:  Math.random(),
      decay: .0015 + Math.random() * .002,
    };
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (p.life <= 0 || p.y < -20) { particles[i] = makeParticle(false); return; }

      ctx.save();
      ctx.globalAlpha = p.alpha * p.life;
      ctx.fillStyle   = '#d4a87a';
      ctx.shadowColor = '#ab886a';
      ctx.shadowBlur  = 4;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size * 2);
      ctx.lineTo(p.x, p.y + p.size * 2);
      ctx.moveTo(p.x - p.size * 2, p.y);
      ctx.lineTo(p.x + p.size * 2, p.y);
      ctx.strokeStyle = '#d4a87a';
      ctx.lineWidth   = p.size * .6;
      ctx.stroke();
      ctx.restore();
    });
    requestAnimationFrame(loop);
  }
  loop();
}


document.addEventListener('DOMContentLoaded', init);

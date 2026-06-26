/* ========================================
   GLOW or SMOOTH 投票画面 (iPad)
   ======================================== */

let hasVoted   = false;
let resetTimer = null;
const AUTO_RESET_SEC = 10;

function castVote(type) {
  if (hasVoted) return;
  hasVoted = true;

  // 二重タップ防止：ボタンを即座に無効化
  document.querySelectorAll('.v-btn').forEach(btn => btn.disabled = true);

  VoteStore.cast(type);
  showDoneScreen(type);
}

function showDoneScreen(type) {
  const label = type === 'glow' ? 'GLOW派！' : 'SMOOTH派！';
  document.getElementById('done-title').textContent = label;

  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById('screen-done').classList.add('active');

  launchConfetti();
  startAutoReset();
}

function startAutoReset() {
  let remaining = AUTO_RESET_SEC;
  const timerEl = document.getElementById('done-timer');
  timerEl.textContent = `${remaining}秒後に自動でもどります`;

  resetTimer = setInterval(() => {
    remaining--;
    timerEl.textContent = `${remaining}秒後に自動でもどります`;
    if (remaining <= 0) resetVote();
  }, 1000);
}

function resetVote() {
  if (resetTimer) { clearInterval(resetTimer); resetTimer = null; }
  hasVoted = false;
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById('screen-vote').classList.add('active');
  document.querySelectorAll('.v-btn').forEach(btn => btn.disabled = false);
}

/* ── 紙吹雪エフェクト ── */
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:1180px;height:820px;pointer-events:none;z-index:100;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width  = 1180;
  canvas.height = 820;

  const COLORS = ['#ab886a', '#f5e0c8', '#e8c9a8', '#ffffff', '#d4a87a', '#f9c8d4', '#fce4b0', '#e8b8c8'];
  const COUNT  = 140;
  const pieces = Array.from({ length: COUNT }, () => ({
    x:     Math.random() * 1180,
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

    ctx.clearRect(0, 0, 1180, 820);
    for (const p of pieces) {
      p.x += p.vx; p.y += p.vy; p.angle += p.spin;
      if (p.y > 840) { p.y = -20; p.x = Math.random() * 1180; }
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (elapsed < DURATION) requestAnimationFrame(draw);
    else canvas.remove();
  }

  requestAnimationFrame(draw);
}

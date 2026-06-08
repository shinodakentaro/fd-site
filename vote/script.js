/* ========================================
   GLOW or SMOOTH 投票画面 (iPad)
   ======================================== */

let hasVoted = false;

function castVote(type) {
  if (hasVoted) return;
  hasVoted = true;

  VoteStore.cast(type);
  showDoneScreen(type);
}

function showDoneScreen(type) {
  const isGlow  = type === 'glow';
  const label   = isGlow ? 'GLOW' : 'SMOOTH';
  const emoji   = isGlow ? '✨' : '🌸';
  const bgClass = isGlow ? 'done-bg-glow' : 'done-bg-smooth';

  document.getElementById('done-title').textContent = label + '派で参加！';
  document.getElementById('done-emoji').textContent = emoji;
  document.getElementById('done-bg').className      = 'done-bg ' + bgClass;

  spawnParticles(type);

  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById('screen-done').classList.add('active');
}

function spawnParticles(type) {
  const container = document.getElementById('done-particles');
  container.innerHTML = '';

  const colors = type === 'glow'
    ? ['#ffd700', '#ff85a1', '#ffffff', '#ffa07a', '#ffe066', '#ffcf6b']
    : ['#a8c8d8', '#c8b89a', '#ffffff', '#d4b8e8', '#e8eff8', '#b0c8d8'];

  for (let i = 0; i < 50; i++) {
    const p     = document.createElement('div');
    p.className = 'dp';
    const angle = (i / 50) * 360;
    const dist  = 80 + Math.random() * 160;
    const size  = 5 + Math.random() * 12;
    p.style.cssText = `
      --a: ${angle}deg;
      --d: ${dist}px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[i % colors.length]};
      border-radius: ${Math.random() > .4 ? '50%' : '3px'};
      animation-delay: ${Math.random() * .4}s;
      animation-duration: ${.8 + Math.random() * .8}s;
    `;
    container.appendChild(p);
  }
}

function resetVote() {
  hasVoted = false;
  document.getElementById('done-particles').innerHTML = '';
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById('screen-vote').classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('screen-vote').classList.add('active');
});

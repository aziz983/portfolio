/* ═══════════════════════════════════════════
   AzizUllah Khan — Portfolio Scripts
   ═══════════════════════════════════════════ */
 
/* ─── STARFIELD ─── */
(function () {
  const c = document.getElementById('stars-canvas');
  const ctx = c.getContext('2d');
  let W, H, stars = [];
 
  function resize() {
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  }
 
  function makeStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      speed: Math.random() * 0.08 + 0.01,
    };
  }
 
  function init() {
    resize();
    stars = Array.from({ length: 220 }, makeStar);
  }
 
  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
 
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${s.a * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
 
  window.addEventListener('resize', resize);
  init();
  draw();
})();
 
/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => obs.observe(el));
 
/* ─── SKILL BAR ANIMATION ─── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-grid > div').forEach(el => skillObs.observe(el));

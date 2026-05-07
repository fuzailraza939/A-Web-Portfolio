gsap.registerPlugin(ScrollTrigger);

/* ===== PARTICLES ===== */
const cvs = document.getElementById('particles');
const ctx = cvs.getContext('2d');
let W, H, pts = [];

function rsz() {
  W = cvs.width = innerWidth;
  H = cvs.height = innerHeight;
}
rsz();
window.addEventListener('resize', rsz);

for (let i = 0; i < 80; i++) {
  pts.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .3,
    vy: (Math.random() - .5) * .3,
    r: Math.random() * 1.4 + .4,
    o: Math.random() * .4 + .1
  });
}

function drawP() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108,99,255,${p.o})`;
    ctx.fill();
  });
  pts.forEach((a, i) => {
    pts.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(108,99,255,${.1 * (1 - d / 130)})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawP);
}
drawP();

/* ===== LOADER ===== */
const chars = document.querySelectorAll('.loader-name span');
gsap.to('#lbar', { width: '100%', duration: 1.8, ease: 'power2.inOut' });
gsap.fromTo(chars,
  { y: '110%', opacity: 0 },
  { y: 0, opacity: 1, stagger: .07, duration: .65, ease: 'expo.out' }
);
gsap.to('#loader', {
  opacity: 0,
  pointerEvents: 'none',
  duration: .6,
  delay: 2,
  ease: 'power2.in',
  onComplete() {
    document.getElementById('loader').style.display = 'none';
    init();
  }
});

/* ===== INIT ===== */
function init() {
  gsap.to('#navbar', { y: 0, duration: .8, ease: 'expo.out' });
  gsap.to('.hname .w', { y: 0, opacity: 1, stagger: .2, duration: 1.1, ease: 'expo.out', delay: .1 });
  gsap.to('.h-badge', { y: 0, opacity: 1, duration: .8, ease: 'expo.out', delay: .05 });
  gsap.to('.hrole', { y: 0, opacity: 1, duration: .8, ease: 'expo.out', delay: .55 });
  gsap.to('.hint', { y: 0, opacity: 1, duration: .8, ease: 'expo.out', delay: .75 });
  gsap.to('.hcta', { y: 0, opacity: 1, duration: .8, ease: 'expo.out', delay: .95 });
  gsap.to('.pinitials', { scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.8)', delay: .35 });
  gsap.fromTo('.pf1', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: 'back.out(1.5)', delay: 1.1 });
  gsap.fromTo('.pf2', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: 'back.out(1.5)', delay: 1.3 });
  setTimeout(typeLoop, 1100);
}

/* ===== TYPEWRITER ===== */
const roles = ['& WordPress Dev', '| UI Enthusiast', '| Freelancer', '| Problem Solver'];
let ri = 0;

function typeLoop() {
  const el = document.getElementById('tw');
  const txt = roles[ri++ % roles.length];
  let i = 0;
  el.textContent = '';
  const t = setInterval(() => {
    el.textContent += txt[i++];
    if (i === txt.length) {
      clearInterval(t);
      setTimeout(() => erase(el, txt), 2200);
    }
  }, 65);
}

function erase(el, txt) {
  let i = txt.length;
  const t = setInterval(() => {
    el.textContent = txt.slice(0, --i);
    if (i === 0) {
      clearInterval(t);
      setTimeout(typeLoop, 350);
    }
  }, 32);
}

/* ===== CURSOR ===== */
const curEl = document.getElementById('cur');
const cur2El = document.getElementById('cur2');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  curEl.style.left = mx + 'px';
  curEl.style.top = my + 'px';
});

(function animCursor() {
  fx += (mx - fx) * .1;
  fy += (my - fy) * .1;
  cur2El.style.left = fx + 'px';
  cur2El.style.top = fy + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .pcard, .astat, .expcard, .ctcard').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur2El.style.width = '60px';
    cur2El.style.height = '60px';
    cur2El.style.borderColor = 'rgba(108,99,255,.3)';
  });
  el.addEventListener('mouseleave', () => {
    cur2El.style.width = '36px';
    cur2El.style.height = '36px';
    cur2El.style.borderColor = 'rgba(108,99,255,.5)';
  });
});

/* ===== SCROLL PROGRESS ===== */
const progBar = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = scrollY / (document.body.scrollHeight - innerHeight) * 100;
  progBar.style.width = pct + '%';
});

/* ===== SCROLL ANIMATIONS ===== */
function sa(sel, from, props) {
  document.querySelectorAll(sel).forEach(el => {
    const d = parseFloat(el.dataset.d || 0) || 0;
    gsap.fromTo(el, from, {
      ...props,
      delay: d,
      duration: .95,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}

sa('.au', { opacity: 0, y: 60 }, { opacity: 1, y: 0 });
sa('.al', { opacity: 0, x: -65 }, { opacity: 1, x: 0 });
sa('.ar', { opacity: 0, x: 65 }, { opacity: 1, x: 0 });
sa('.az', { opacity: 0, scale: .82 }, { opacity: 1, scale: 1 });
sa('.af', { opacity: 0, rotateX: -28, y: 35, transformPerspective: 700 }, { opacity: 1, rotateX: 0, y: 0 });

/* ===== SKILL BARS ===== */
document.querySelectorAll('.skfill').forEach(b => {
  ScrollTrigger.create({
    trigger: b,
    start: 'top 90%',
    onEnter: () => { b.style.width = b.dataset.p + '%'; }
  });
});

/* ===== COUNTERS ===== */
document.querySelectorAll('.astatn[data-target]').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter() {
      const target = parseInt(el.dataset.target);
      const suffix = target === 100 ? '%' : '+';
      gsap.fromTo({ v: 0 }, { v: target }, {
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.round(this.targets()[0].v) + suffix;
        }
      });
    }
  });
});

/* ===== 3D TILT ===== */
document.querySelectorAll('.pcard, .expcard, .astat, .flbox').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    gsap.to(c, { rotationY: x * 14, rotationX: -y * 12, transformPerspective: 900, duration: .4, ease: 'power2.out' });
  });
  c.addEventListener('mouseleave', () => {
    gsap.to(c, { rotationY: 0, rotationX: 0, duration: .7, ease: 'expo.out' });
  });
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.bta, .btb, .hirebtn, .flbtn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .3;
    const y = (e.clientY - r.top - r.height / 2) * .3;
    gsap.to(btn, { x, y, duration: .3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.6)' });
  });
});

/* ===== PARALLAX ===== */
gsap.to('.hbg', { y: -100, ease: 'none', scrollTrigger: { trigger: '#hero', scrub: 1.5 } });
gsap.to('.pouter', { y: -50, ease: 'none', scrollTrigger: { trigger: '#hero', scrub: 1 } });
gsap.to('.hero-grid', { y: -40, ease: 'none', scrollTrigger: { trigger: '#hero', scrub: 2 } });

/* ===== NAV SCROLL ===== */
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  nb.style.padding = scrollY > 60 ? '.75rem 6%' : '1.3rem 6%';
  const secs = document.querySelectorAll('section[id]');
  let current = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 200) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('act', a.getAttribute('href') === '#' + current);
  });
});

/* ===== HAMBURGER ===== */
const hamBtn = document.getElementById('ham');
const mobNav = document.getElementById('mobNav');

hamBtn.addEventListener('click', () => {
  const open = mobNav.classList.toggle('open');
  const spans = hamBtn.querySelectorAll('span');
  if (open) {
    gsap.to(spans[0], { rotate: 45, y: 6.5, duration: .3 });
    gsap.to(spans[1], { opacity: 0, duration: .2 });
    gsap.to(spans[2], { rotate: -45, y: -6.5, duration: .3 });
    gsap.fromTo(mobNav.querySelectorAll('a'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: .08, duration: .5, ease: 'expo.out' }
    );
  } else {
    gsap.to(spans, { rotate: 0, y: 0, opacity: 1, duration: .3 });
  }
});

mobNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobNav.classList.remove('open');
    gsap.to(hamBtn.querySelectorAll('span'), { rotate: 0, y: 0, opacity: 1, duration: .3 });
  });
});

/* ===== THEME TOGGLE ===== */
const themeBtn = document.getElementById('themeBtn');
let dark = true;

themeBtn.addEventListener('click', () => {
  dark = !dark;
  document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '🌙 Dark' : '☀️ Light';
});

/* ===== FAVICON ===== */
(function () {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const x = c.getContext('2d');
  const grad = x.createLinearGradient(0, 0, 64, 64);
  grad.addColorStop(0, '#6c63ff');
  grad.addColorStop(1, '#ff6b6b');
  x.fillStyle = grad;
  x.beginPath();
  x.roundRect(0, 0, 64, 64, 14);
  x.fill();
  x.fillStyle = '#ffffff';
  x.font = 'bold 22px "Arial Black", Arial';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText('FR.', 32, 33);
  document.getElementById('favicon').href = c.toDataURL('image/png');
})();

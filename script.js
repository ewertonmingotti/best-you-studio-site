// ═══ NAVBAR SCROLL ═══
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ═══ MENU MOBILE ═══
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

menuToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

// ═══ REVEAL ON SCROLL ═══
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

// ═══ COUNTER ANIMATION ═══
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══ PARALLAX HERO ═══
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scroll = window.scrollY;
    heroBg.style.transform = `translateY(${scroll * 0.3}px)`;
  }
});

// ═══ JORNADA TOGGLE ═══
function toggleStep(el) {
  const wasActive = el.classList.contains('active');
  document.querySelectorAll('.jornada-step').forEach(s => s.classList.remove('active'));
  if (!wasActive) el.classList.add('active');
}

// ═══ VIDEO MODAL ═══
function openVideo(src) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  video.src = src;
  modal.classList.add('active');
  video.play();
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  video.pause();
  video.src = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeVideo(); closeTrunfo(); }
});

// ═══ SUPER TRUNFO ═══
const trainerData = {
  // 9 de Julho
  kaue:     { name:'Kauê',      role:'Master Trainer', turno:'🌅 Matutino',  img:'trainer-kaue.png',      forca:9, humor:8, energia:10, tecnica:9, motivacao:10 },
  andre:    { name:'André',     role:'Master Trainer', turno:'🌙 Noturno',   img:'trainer-andre.png',     forca:8, humor:7, energia:9,  tecnica:10, motivacao:9 },
  luan:     { name:'Luan',      role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-luan.png',      forca:7, humor:9, energia:8,  tecnica:8, motivacao:9 },
  xuxa:     { name:'Xuxa',      role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-xuxa.png',      forca:8, humor:10, energia:9, tecnica:8, motivacao:9 },
  bruno:    { name:'Bruno',     role:'Best Trainer',   turno:'🌙 Noturno',   img:'trainer-bruno.png',     forca:9, humor:7, energia:8,  tecnica:9, motivacao:8 },
  dominique:{ name:'Dominique', role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-dominique.png', forca:7, humor:8, energia:9,  tecnica:8, motivacao:10 },
  vinicius: { name:'Vinícius',  role:'Best Trainer',   turno:'🌙 Noturno',   img:'trainer-vinicius.png',  forca:8, humor:8, energia:8,  tecnica:9, motivacao:8 },
  lucas9:   { name:'Lucas',     role:'Best Trainer',   turno:'⏰ Flexível',  img:'trainer-lucas.png',     forca:7, humor:9, energia:9,  tecnica:8, motivacao:9 },
  giovani:  { name:'Giovani',   role:'Best Fisio',     turno:'🌅 Matutino',  img:'trainer-giovani.png',   forca:6, humor:7, energia:7,  tecnica:10, motivacao:8 },
  hanna:    { name:'Hanna',     role:'Best Fisio',     turno:'🌅 Matutino',  img:'trainer-hanna.png',     forca:6, humor:8, energia:8,  tecnica:10, motivacao:9 },
  mayara:   { name:'Mayara',    role:'Massoterapeuta', turno:'⏰ Flexível',  img:'trainer-mayara-masso.png', forca:5, humor:9, energia:7, tecnica:10, motivacao:9 },
  // Malota
  rafael:   { name:'Rafael',    role:'Master Trainer', turno:'🌅 Matutino',  img:'trainer-levy.png',          forca:10, humor:7, energia:9,  tecnica:9, motivacao:10 },
  ewerton:  { name:'Ewerton',   role:'Master Trainer', turno:'⏰ Flexível',  img:'trainer-maiara.png',        forca:9, humor:8, energia:10, tecnica:9, motivacao:10 },
  rafa:     { name:'Rafa',      role:'Master Trainer', turno:'🌙 Noturno',   img:'trainer-raphael.png',       forca:9, humor:9, energia:8,  tecnica:9, motivacao:9 },
  giovanna: { name:'Giovanna',  role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-rafael-master.png', forca:7, humor:9, energia:9, tecnica:8, motivacao:9 },
  levy:     { name:'Levy',      role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-levy-real.png',     forca:8, humor:10, energia:10, tecnica:8, motivacao:9 },
  maiara:   { name:'Maiara',    role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-rafa.png',          forca:7, humor:8, energia:9,  tecnica:8, motivacao:10 },
  raphael:  { name:'Raphael',   role:'Best Trainer',   turno:'🌙 Noturno',   img:'trainer-giovanna.png',      forca:8, humor:9, energia:9,  tecnica:8, motivacao:9 },
  pedro:    { name:'Pedro',     role:'Best Trainer',   turno:'🌅 Matutino',  img:'trainer-pedro.png',         forca:8, humor:10, energia:9, tecnica:8, motivacao:9 },
  lucasf:   { name:'Lucas',     role:'Best Fisio',     turno:'⏰ Flexível',  img:'trainer-ewerton.png',       forca:6, humor:8, energia:8,  tecnica:10, motivacao:9 },
};

const statConfig = [
  { key:'forca',    icon:'💪', label:'Força' },
  { key:'humor',    icon:'😄', label:'Humor' },
  { key:'energia',  icon:'⚡', label:'Energia' },
  { key:'tecnica',  icon:'🎯', label:'Técnica' },
  { key:'motivacao',icon:'🔥', label:'Motivação' },
];

function openTrunfo(id) {
  const t = trainerData[id];
  if (!t) return;
  document.getElementById('trunfoPhoto').style.backgroundImage = `url(${t.img})`;
  document.getElementById('trunfoName').textContent = t.name;
  document.getElementById('trunfoRole').textContent = t.role;
  document.getElementById('trunfoBadge').textContent = t.role;
  document.getElementById('trunfoTurno').textContent = t.turno;

  const statsEl = document.getElementById('trunfoStats');
  statsEl.innerHTML = statConfig.map(s => `
    <div class="trunfo-stat">
      <span class="trunfo-stat-icon">${s.icon}</span>
      <span class="trunfo-stat-label">${s.label}</span>
      <div class="trunfo-stat-bar"><div class="trunfo-stat-fill" data-val="${t[s.key]}"></div></div>
      <span class="trunfo-stat-val">${t[s.key]}</span>
    </div>
  `).join('');

  document.getElementById('trunfoModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate bars
  setTimeout(() => {
    statsEl.querySelectorAll('.trunfo-stat-fill').forEach(bar => {
      bar.style.width = (bar.dataset.val * 10) + '%';
    });
  }, 100);
}

function closeTrunfo() {
  document.getElementById('trunfoModal').classList.remove('active');
  document.body.style.overflow = '';
}

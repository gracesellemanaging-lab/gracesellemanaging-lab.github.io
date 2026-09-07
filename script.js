/* ==========================================================================
   PORTFOLIO SCRIPT â€” all vanilla JS, organized by feature.
   Each feature is wrapped in its own function and initialized at the bottom.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
   initScrollProgress();
  initBgDecor();
  initNavbar();
  initCursorGlow();
  initTypingEffect();
  initReveal();
  initTilt();
  initMagnetic();
  initRipple();
  initParticles();
  initCounters();
  initSkillTabs();
  initSkillBars();
  initCertModal();
  initTestimonials();
  initContactForm();
  initBackToTop();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------- GIRLY BACKGROUND DECOR (soft blobs, rings, glitter) ---------- */
function initBgDecor(){
  const host = document.getElementById('bgDecor');
  if (!host) return;
  const frag = document.createDocumentFragment();
  const vw = window.innerWidth;

  // Soft floating gradient circles ("bubbles")
  const blobCount = vw < 620 ? 4 : 7;
  for (let i = 0; i < blobCount; i++){
    const el = document.createElement('div');
    el.className = 'bg-decor__blob';
    const size = Math.round(70 + Math.random() * 190);
    el.style.width = el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.setProperty('--blob-o', (0.12 + Math.random() * 0.18).toFixed(2));
    el.style.setProperty('--blob-dur', (16 + Math.random() * 14).toFixed(1) + 's');
    el.style.setProperty('--blob-delay', (Math.random() * -20).toFixed(1) + 's');
    el.style.setProperty('--blob-x', Math.round(-30 + Math.random() * 60) + 'px');
    el.style.setProperty('--blob-y', Math.round(-40 + Math.random() * 80) + 'px');
    frag.appendChild(el);
  }

  // Thin outlined rings for extra depth
  const ringCount = vw < 620 ? 2 : 4;
  for (let i = 0; i < ringCount; i++){
    const el = document.createElement('div');
    el.className = 'bg-decor__ring';
    const size = Math.round(40 + Math.random() * 90);
    el.style.width = el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.setProperty('--ring-o', (0.18 + Math.random() * 0.22).toFixed(2));
    el.style.setProperty('--blob-dur', (18 + Math.random() * 12).toFixed(1) + 's');
    el.style.setProperty('--blob-delay', (Math.random() * -20).toFixed(1) + 's');
    frag.appendChild(el);
  }

  // Glitter sparkles
  const sparkleCount = vw < 620 ? 24 : 46;
  for (let i = 0; i < sparkleCount; i++){
    const el = document.createElement('div');
    el.className = 'bg-decor__sparkle';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.setProperty('--spk-size', (2 + Math.random() * 2.5).toFixed(1) + 'px');
    el.style.setProperty('--spk-dur', (2.2 + Math.random() * 3).toFixed(1) + 's');
    el.style.setProperty('--spk-delay', (Math.random() * -6).toFixed(1) + 's');
    frag.appendChild(el);
  }

  host.appendChild(frag);
}

/* ---------- SPLASH / LOADER ---------- */
function initLoader(){
  const loader = document.getElementById('loader');
  if (!loader) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // lock scroll while splash is visible
  document.body.classList.add('is-loading');
  document.documentElement.style.scrollBehavior = 'auto';

  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    loader.classList.add('is-hidden');
    loader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-loading');
    document.documentElement.style.scrollBehavior = '';
    // keep loader in DOM for transition, then remove
    const removeDelay = prefersReduced ? 100 : 700;
    setTimeout(() => { if (loader.parentNode) loader.remove(); }, removeDelay);
  };

  // If user already visited in this session, show splash shorter
  const isRepeatView = sessionStorage.getItem('portfolio_splash_seen') === '1';
  const baseDelay = prefersReduced ? 400 : (isRepeatView ? 900 : 1800);
  const maxDelay = prefersReduced ? 900 : 3000;

  // Minimum visible time, then hide; also wait for window load if not yet loaded
  const start = performance.now();
  const tryHide = () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, baseDelay - elapsed);
    setTimeout(hide, wait);
  };

  if (document.readyState === 'complete') {
    tryHide();
  } else {
    window.addEventListener('load', tryHide, { once: true });
    // fallback max timeout even if load never fires (e.g. huge base64 images)
    setTimeout(hide, maxDelay);
  }

  // bfcache restore (back/forward navigation)
  window.addEventListener('pageshow', (e) => { if (e.persisted) hide(); });

  // mark seen for next navigation in same tab
  try { sessionStorage.setItem('portfolio_splash_seen', '1'); } catch(_){}

  // safety: if JS fails to hide, CSS fallback after 4s
  setTimeout(() => {
    if (loader.parentNode && !loader.classList.contains('is-hidden')) {
      loader.classList.add('loader--fallback-hide');
      hide();
    }
  }, 4000);
}

/* ---------- SCROLL PROGRESS BAR ---------- */
function initScrollProgress(){
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ---------- NAVBAR: scrollspy + hide-on-scroll + mobile toggle ---------- */
function initNavbar(){
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('main section[id]')];

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('is-scrolled', y > 30);

    // scrollspy
    let current = sections[0]?.id;
    for (const sec of sections){
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 140) current = sec.id;
    }
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
    });
  });
}

/* ---------- CURSOR GLOW (desktop only) ---------- */
function initCursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if (!glow || matchMedia('(hover: none)').matches) return;
  let x = 0, y = 0, tx = window.innerWidth / 2, ty = window.innerHeight / 3;
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  (function follow(){
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    requestAnimationFrame(follow);
  })();
}

/* ---------- TYPING EFFECT (hero titles) ---------- */
function initTypingEffect(){
  const el = document.getElementById('typed');
  if (!el) return;
  const phrases = ['Designing Interfaces', 'Prototyping Ideas', 'Learning Every Day'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const phrase = phrases[phraseIndex];
    if (!deleting){
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length){
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

/* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
function initReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

/* ---------- MOUSE TILT ON HERO PROFILE ---------- */
function initTilt(){
  const card = document.getElementById('tiltCard');
  if (!card || matchMedia('(hover: none)').matches) return;
  const wrapper = card.closest('.hero__media') || card.closest('.hero__visual') || card.parentElement;

  if (!wrapper) return;
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });
  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

/* ---------- MAGNETIC BUTTONS ---------- */
function initMagnetic(){
  if (matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- RIPPLE EFFECT ON BUTTONS ---------- */
function initRipple(){
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e){
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
}

/* ---------- LIGHTWEIGHT PARTICLE BACKGROUND (hero canvas) ---------- */
function initParticles(){
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function makeParticles(){
    const count = Math.min(60, Math.floor(w / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 201, 120, 0.55)';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  makeParticles();
  draw();
  window.addEventListener('resize', () => { resize(); makeParticles(); });
}

/* ---------- ANIMATED STAT COUNTERS ---------- */
function initCounters(){
  const counters = document.querySelectorAll('.stat__num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (!el.dataset.count){ observer.unobserve(el); return; }
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target){ current = target; clearInterval(timer); }
        el.textContent = current;
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ---------- SKILLS TABS (Edjae-style group switcher) ---------- */
function initSkillTabs(){
  const tabs = document.querySelectorAll('.skills__tab');
  const groups = document.querySelectorAll('.skills__group');
  if (!tabs.length || !groups.length) return;
  const map = {};
  groups.forEach(g => { map[g.dataset.skillGroup] = g; });
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const group = map[tab.dataset.skillTab];
      tabs.forEach(t => t.classList.remove('active'));
      groups.forEach(g => g.classList.remove('is-active'));
      tab.classList.add('active');
      if (group) group.classList.add('is-active');
      // ensure active group is visible on small screens
      if (window.innerWidth < 768 && group) {
        group.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/* ---------- SKILL PROGRESS BARS (animate width when visible) ---------- */
function initSkillBars(){
  const cards = document.querySelectorAll('.skill-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(c => observer.observe(c));
}

/* ---------- CERTIFICATE MODAL ---------- */
function initCertModal(){
  const modal = document.getElementById('certModal');
  const img = document.getElementById('modalImg');
  const title = document.getElementById('modalTitle');
  if (!modal) return;

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      img.src = card.dataset.cert;
      img.alt = card.dataset.title;
      title.textContent = card.dataset.title;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ---------- TESTIMONIAL CAROUSEL ---------- */
function initTestimonials(){
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const cards = [...track.children];
  const dotsWrap = document.getElementById('testDots');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  let index = 0;
  let autoTimer;

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function render(){
    cards.forEach((c, i) => c.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }
  function goTo(i){ index = (i + cards.length) % cards.length; render(); restartAuto(); }
  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }
  function restartAuto(){ clearInterval(autoTimer); autoTimer = setInterval(next, 6000); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  render();
  restartAuto();
}

/* ---------- CONTACT FORM VALIDATION ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  const validators = {
    cName: (v) => v.trim().length > 1,
    cEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    cSubject: (v) => v.trim().length > 1,
    cMessage: (v) => v.trim().length > 5,
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach(id => {
      const input = document.getElementById(id);
      const field = input.closest('.field');
      const ok = validators[id](input.value);
      field.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid){
      status.style.color = '#f87171';
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // No backend wired up yet â€” simulate a successful send.
    status.style.color = 'var(--success)';
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });

  // live re-validation while typing
  Object.keys(validators).forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      const field = input.closest('.field');
      if (validators[id](input.value)) field.classList.remove('is-invalid');
    });
  });
}

/* ---------- BACK TO TOP ---------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

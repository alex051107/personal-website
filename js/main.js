/* ═══════════════════════════════════════════════════
   V2 — Apple Fruit Edition JS
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // ── Lenis ─────────────────────────────────────────
  const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) lenis.scrollTo(t, { offset: -60 });
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  // ── Hero entrance ─────────────────────────────────
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0)
    .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.15)
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.5)
    .to('.hero-links', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.7);

  // Hero parallax
  gsap.to('.hero-content', {
    y: -60, opacity: 0.2,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // ── Statement word reveal (Apple style) ───────────
  const words = document.querySelectorAll('.st-word');
  words.forEach((word, i) => {
    ScrollTrigger.create({
      trigger: word,
      start: 'top 80%',
      end: 'top 40%',
      scrub: true,
      onUpdate: self => {
        if (self.progress > 0.1) {
          word.classList.add('lit');
        } else {
          word.classList.remove('lit');
        }
      }
    });
  });

  // ── Fade elements on scroll ───────────────────────
  document.querySelectorAll('.fade-el').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const siblings = el.parentElement.querySelectorAll('.fade-el');
        const idx = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${idx * 0.08}s`;
        el.classList.add('is-visible');
      }
    });
  });

  // ── Nav hide/show ─────────────────────────────────
  let lastY = 0;
  const nav = document.querySelector('.nav');
  lenis.on('scroll', ({ scroll }) => {
    if (scroll > 80) {
      nav.style.transform = scroll > lastY ? 'translateY(-100%)' : 'translateY(0)';
      nav.style.transition = 'transform 0.4s cubic-bezier(0.25,1,0.5,1)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastY = scroll;
  });

  // ── Section title parallax ────────────────────────
  document.querySelectorAll('.section-title').forEach(el => {
    gsap.to(el, {
      y: -15,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 30%', scrub: 1 }
    });
  });

});

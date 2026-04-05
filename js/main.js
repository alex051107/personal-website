/* ═══════════════════════════════════════════════════════════════════════════════
   ZHENPENG LIU — Animation Engine
   GSAP ScrollTrigger + Lenis Smooth Scroll + Custom Cursor + Magnetic Buttons
   ═══════════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Lenis Smooth Scroll ───────────────────────────────────────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) lenis.scrollTo(target, { offset: -80 });
    });
  });

  // ── Hero Entrance Animation ───────────────────────────────────────────────
  const heroTimeline = gsap.timeline({ delay: 0.3 });

  // Split hero name into characters
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const text = heroName.textContent;
    heroName.innerHTML = '';
    heroName.style.opacity = 1;
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 0.04}s`;
      heroName.appendChild(span);
    });

    // Trigger char animation
    setTimeout(() => {
      heroName.querySelectorAll('.char').forEach(c => c.classList.add('visible'));
    }, 400);
  }

  heroTimeline
    .to('.hero-eyebrow', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    }, 0.2)
    .to('.hero-subtitle', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    }, 0.8)
    .to('.hero-links', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    }, 1.0);

  // ── Scroll-Triggered Reveals ──────────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal-up');
  revealElements.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: el.closest('.honors-grid, .skills-grid, .projects-grid')
            ? (Array.from(el.parentNode.children).indexOf(el) % 4) * 0.1
            : 0
        });
      }
    });
  });

  // ── Section Heading Parallax ──────────────────────────────────────────────
  document.querySelectorAll('.section-heading').forEach(heading => {
    gsap.to(heading, {
      y: -20,
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      }
    });
  });

  // ── Research Image Parallax ───────────────────────────────────────────────
  document.querySelectorAll('.research-image img').forEach(img => {
    gsap.to(img, {
      y: -15,
      scrollTrigger: {
        trigger: img.closest('.research-item'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });

  // ── Nav Hide/Show on Scroll ───────────────────────────────────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  lenis.on('scroll', ({ scroll }) => {
    if (scroll > 100) {
      nav.classList.toggle('hidden', scroll > lastScroll);
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = scroll;
  });

  // ── Custom Cursor ─────────────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.innerWidth > 600) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover states
    const hoverTargets = document.querySelectorAll('a, button, .magnetic, .research-item, .project-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ── Magnetic Buttons ──────────────────────────────────────────────────────
  document.querySelectorAll('.magnetic').forEach(el => {
    const strength = parseFloat(el.dataset.strength) || 0.2;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });

  // ── Section Color Transitions ─────────────────────────────────────────────
  // Update nav style based on section background
  document.querySelectorAll('.section--light').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50px',
      end: 'bottom 50px',
      onEnter: () => {
        nav.style.background = 'rgba(245, 242, 237, 0.85)';
        nav.style.borderBottomColor = 'rgba(0,0,0,0.06)';
        nav.querySelectorAll('.nav-logo, .nav-link').forEach(el => {
          el.style.color = '';
        });
        nav.querySelector('.nav-logo').style.color = '#1a1a1a';
      },
      onLeave: () => {
        nav.style.background = '';
        nav.style.borderBottomColor = '';
        nav.querySelector('.nav-logo').style.color = '';
      },
      onEnterBack: () => {
        nav.style.background = 'rgba(245, 242, 237, 0.85)';
        nav.style.borderBottomColor = 'rgba(0,0,0,0.06)';
        nav.querySelector('.nav-logo').style.color = '#1a1a1a';
      },
      onLeaveBack: () => {
        nav.style.background = '';
        nav.style.borderBottomColor = '';
        nav.querySelector('.nav-logo').style.color = '';
      }
    });
  });

  // ── Hero Parallax on Scroll ───────────────────────────────────────────────
  gsap.to('.hero-inner', {
    y: -80,
    opacity: 0.3,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });

  // ── Project Card 3D Tilt ──────────────────────────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  });
});

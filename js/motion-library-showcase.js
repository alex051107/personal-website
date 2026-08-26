(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const gsapRuntime = window.gsap;
  const lottieRuntime = window.lottie;
  const ScrollMagicRuntime = window.ScrollMagic;
  const cleanupTasks = [];
  const lottieInstances = new Map();
  let scrollMagicController = null;
  let runtimeStarted = false;

  const effects = Object.freeze([
    { id: "sm-scene-toggle", library: "ScrollMagic", target: "section chapters" },
    { id: "sm-story-scrub", library: "ScrollMagic", target: "project story progress" },
    { id: "sm-hero-depth", library: "ScrollMagic", target: "Hero depth plate" },
    { id: "sm-matrix-scan", library: "ScrollMagic", target: "comparison matrix scan" },
    { id: "vue-fade-visible", library: "VueUse Motion", target: "section headings" },
    { id: "vue-roll-visible", library: "VueUse Motion", target: "project visual plates" },
    { id: "vue-pointer-parallax", library: "VueUse", target: "portrait and Hero frame" },
    { id: "vue-press-variant", library: "VueUse Motion", target: "interactive controls" },
    { id: "spring-basic-trail", library: "React Spring", target: "AI × Science chain" },
    { id: "spring-scrolling-wave", library: "React Spring", target: "project chapter headers" },
    { id: "spring-dock", library: "React Spring", target: "page index" },
    { id: "spring-active-node", library: "React Spring", target: "workflow nodes" },
    { id: "lottie-contract", library: "Lottie Web", target: "TaskPacket glyph" },
    { id: "lottie-agent", library: "Lottie Web", target: "Agent glyph" },
    { id: "lottie-gate", library: "Lottie Web", target: "gate scan glyph" },
    { id: "lottie-receipt", library: "Lottie Web", target: "result receipt glyph" },
    { id: "gsap-word-reveal", library: "GSAP", target: "opening and Hero titles" },
    { id: "gsap-stage-timeline", library: "GSAP", target: "Hero execution row" },
    { id: "gsap-state-transition", library: "GSAP", target: "Hero packet and result" },
    { id: "gsap-plate-reveal", library: "GSAP", target: "semantic workflow plates" },
  ]);

  window.__PORTFOLIO_MOTION_LEDGER__ = effects;
  root.dataset.motionEffectCount = String(effects.length);
  root.dataset.motionLibraryCount = "5";
  root.dataset.motionLibraries = [
    ScrollMagicRuntime ? "scrollmagic" : "scrollmagic-fallback",
    "vueuse-adapted",
    "react-spring-adapted",
    lottieRuntime ? "lottie-web" : "lottie-fallback",
    gsapRuntime ? "gsap" : "gsap-fallback",
  ].join(" ");

  const clamp = (value, minimum = 0, maximum = 1) =>
    Math.min(maximum, Math.max(minimum, value));

  const markEffect = (target, id) => {
    if (!target) return;
    const names = new Set((target.dataset.motionEffects || "").split(" ").filter(Boolean));
    names.add(id);
    target.dataset.motionEffects = Array.from(names).join(" ");
  };

  const on = (target, eventName, handler, options) => {
    target?.addEventListener(eventName, handler, options);
    cleanupTasks.push(() => target?.removeEventListener(eventName, handler, options));
  };

  const observeOnce = (targets, callback, options = {}) => {
    const filtered = Array.from(targets).filter(Boolean);
    if (!filtered.length) return null;
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      filtered.forEach((target, index) => callback(target, index));
      return null;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        callback(entry.target, filtered.indexOf(entry.target));
        observer.unobserve(entry.target);
      });
    }, { threshold: options.threshold ?? 0.18, rootMargin: options.rootMargin ?? "0px 0px -8% 0px" });
    filtered.forEach((target) => observer.observe(target));
    cleanupTasks.push(() => observer.disconnect());
    return observer;
  };

  const setupScrollMagic = () => {
    const sections = ["why", "map", "work", "research", "about"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const stories = Array.from(document.querySelectorAll("[data-project-story]"));
    const hero = document.querySelector("[data-hero-station]");
    const matrix = document.querySelector(".decision-matrix__frame");

    sections.forEach((section) => markEffect(section, "sm-scene-toggle"));
    stories.forEach((story) => markEffect(story, "sm-story-scrub"));
    markEffect(hero, "sm-hero-depth");
    markEffect(matrix, "sm-matrix-scan");

    if (!ScrollMagicRuntime || reducedMotion.matches) {
      sections.forEach((section) => section.classList.add("is-library-scene"));
      stories.forEach((story) => story.style.setProperty("--library-scroll-progress", story.style.getPropertyValue("--story-scroll-progress") || "0"));
      hero?.style.setProperty("--library-hero-depth", "1");
      matrix?.style.setProperty("--matrix-scan", "1");
      return;
    }

    scrollMagicController = new ScrollMagicRuntime.Controller({ refreshInterval: 120 });

    sections.forEach((section) => {
      new ScrollMagicRuntime.Scene({
        triggerElement: section,
        triggerHook: 0.82,
        duration: Math.max(1, section.offsetHeight * 0.18),
      })
        .setClassToggle(section, "is-library-scene")
        .addTo(scrollMagicController);
    });

    stories.forEach((story) => {
      new ScrollMagicRuntime.Scene({
        triggerElement: story,
        triggerHook: 0.72,
        duration: () => Math.max(window.innerHeight * 0.8, story.offsetHeight - window.innerHeight * 0.44),
      })
        .on("progress", (event) => {
          story.style.setProperty("--library-scroll-progress", event.progress.toFixed(4));
        })
        .addTo(scrollMagicController);
    });

    if (hero) {
      new ScrollMagicRuntime.Scene({
        triggerElement: hero,
        triggerHook: 0.9,
        duration: () => Math.max(1, window.innerHeight * 0.8),
      })
        .on("progress", (event) => {
          hero.style.setProperty("--library-hero-depth", event.progress.toFixed(4));
        })
        .addTo(scrollMagicController);
    }

    if (matrix) {
      new ScrollMagicRuntime.Scene({
        triggerElement: matrix,
        triggerHook: 0.84,
        duration: () => Math.max(1, matrix.offsetHeight * 0.72),
      })
        .on("progress", (event) => {
          matrix.style.setProperty("--matrix-scan", event.progress.toFixed(4));
        })
        .addTo(scrollMagicController);
    }

    cleanupTasks.push(() => {
      scrollMagicController?.destroy(true);
      scrollMagicController = null;
    });
  };

  const setupVueUsePatterns = () => {
    const fadeTargets = [
      ...document.querySelectorAll(".index-section-head"),
      ...document.querySelectorAll(".motion-source-map__header"),
    ];
    const rollTargets = Array.from(document.querySelectorAll(".project-story__visual"));
    const parallaxTargets = [
      document.querySelector(".index-opening__portrait-frame"),
      document.querySelector(".hero-station__frame"),
    ].filter(Boolean);
    const pressTargets = Array.from(document.querySelectorAll(
      ".hero-station button, .project-story button, .page-index a, .project-links a",
    ));

    fadeTargets.forEach((target) => markEffect(target, "vue-fade-visible"));
    rollTargets.forEach((target) => markEffect(target, "vue-roll-visible"));
    parallaxTargets.forEach((target) => markEffect(target, "vue-pointer-parallax"));
    pressTargets.forEach((target) => markEffect(target, "vue-press-variant"));

    observeOnce(fadeTargets, (target, index) => {
      target.classList.add("is-vue-fade-visible");
      if (!gsapRuntime || reducedMotion.matches) return;
      gsapRuntime.fromTo(target,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.62, delay: Math.min(index * 0.035, 0.18), ease: "power3.out", clearProps: "opacity,visibility,transform" },
      );
    });

    observeOnce(rollTargets, (target) => {
      target.classList.add("is-vue-roll-visible");
      if (!gsapRuntime || reducedMotion.matches) return;
      gsapRuntime.fromTo(target,
        { autoAlpha: 0.35, y: 42, rotateX: -7, transformOrigin: "50% 100%" },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.78, ease: "power3.out", clearProps: "opacity,visibility,transform,transformOrigin" },
      );
    }, { threshold: 0.12 });

    parallaxTargets.forEach((target, targetIndex) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const setX = gsapRuntime?.quickTo(target, "--pointer-x", { duration: 0.48, ease: "power3.out" });
      const setY = gsapRuntime?.quickTo(target, "--pointer-y", { duration: 0.48, ease: "power3.out" });
      const move = (event) => {
        const bounds = target.getBoundingClientRect();
        const x = clamp((event.clientX - bounds.left) / Math.max(1, bounds.width), 0, 1) - 0.5;
        const y = clamp((event.clientY - bounds.top) / Math.max(1, bounds.height), 0, 1) - 0.5;
        if (setX && setY) {
          setX(x);
          setY(y);
        } else {
          target.style.setProperty("--pointer-x", x.toFixed(4));
          target.style.setProperty("--pointer-y", y.toFixed(4));
        }
        target.dataset.pointerParallax = targetIndex === 0 ? "portrait" : "hero";
      };
      const leave = () => {
        if (setX && setY) {
          setX(0);
          setY(0);
        } else {
          target.style.setProperty("--pointer-x", "0");
          target.style.setProperty("--pointer-y", "0");
        }
        target.removeAttribute("data-pointer-parallax");
      };
      on(target, "pointermove", move, { passive: true });
      on(target, "pointerleave", leave);
      on(target, "pointercancel", leave);
    });

    pressTargets.forEach((target) => {
      if (reducedMotion.matches) return;
      const press = () => {
        target.dataset.motionPressed = "true";
        if (gsapRuntime) gsapRuntime.to(target, { scale: 0.975, duration: 0.12, ease: "power2.out" });
      };
      const release = () => {
        target.removeAttribute("data-motion-pressed");
        if (gsapRuntime) gsapRuntime.to(target, { scale: 1, duration: 0.28, ease: "back.out(1.7)", clearProps: "scale" });
      };
      on(target, "pointerdown", press);
      on(target, "pointerup", release);
      on(target, "pointercancel", release);
      on(target, "pointerleave", release);
      on(target, "blur", release);
    });
  };

  const setupReactSpringPatterns = () => {
    const trail = document.querySelector(".science-chain");
    const waveTargets = Array.from(document.querySelectorAll(".project-spread__header"));
    const dock = document.querySelector(".page-index");
    const nodes = Array.from(document.querySelectorAll("[data-story-node]"));

    markEffect(trail, "spring-basic-trail");
    waveTargets.forEach((target) => markEffect(target, "spring-scrolling-wave"));
    markEffect(dock, "spring-dock");
    nodes.forEach((node) => markEffect(node, "spring-active-node"));

    observeOnce([trail], (target) => target.classList.add("is-spring-trailed"), { threshold: 0.28 });

    if (!reducedMotion.matches) {
      let waveFrame = 0;
      const updateWave = () => {
        waveFrame = 0;
        waveTargets.forEach((target, index) => {
          const bounds = target.getBoundingClientRect();
          const center = bounds.top + bounds.height * 0.5;
          const distance = clamp((center - window.innerHeight * 0.5) / Math.max(1, window.innerHeight), -1, 1);
          target.style.setProperty("--spring-wave", (Math.sin((1 - Math.abs(distance)) * Math.PI + index * 0.42) * 1.0).toFixed(4));
        });
      };
      const queueWave = () => {
        if (!waveFrame) waveFrame = window.requestAnimationFrame(updateWave);
      };
      on(window, "scroll", queueWave, { passive: true });
      on(window, "resize", queueWave);
      cleanupTasks.push(() => {
        if (waveFrame) window.cancelAnimationFrame(waveFrame);
      });
      queueWave();
    }

    if (dock && finePointer.matches && !reducedMotion.matches) {
      const links = Array.from(dock.querySelectorAll("a"));
      const moveDock = (event) => {
        links.forEach((link) => {
          const bounds = link.getBoundingClientRect();
          const centerX = bounds.left + bounds.width * 0.5;
          const distance = Math.abs(event.clientX - centerX);
          const influence = clamp(1 - distance / 150);
          const scale = 1 + influence * 0.14;
          if (gsapRuntime) gsapRuntime.to(link, { scale, y: -influence * 4, duration: 0.22, ease: "power3.out" });
          else link.style.transform = `translateY(${-influence * 4}px) scale(${scale})`;
        });
      };
      const resetDock = () => links.forEach((link) => {
        if (gsapRuntime) gsapRuntime.to(link, { scale: 1, y: 0, duration: 0.42, ease: "elastic.out(1, 0.55)", clearProps: "transform" });
        else link.style.removeProperty("transform");
      });
      on(dock, "pointermove", moveDock, { passive: true });
      on(dock, "pointerleave", resetDock);
    }

    if (nodes.length && "MutationObserver" in window && !reducedMotion.matches) {
      const nodeObserver = new MutationObserver((records) => {
        records.forEach((record) => {
          const node = record.target;
          if (!(node instanceof HTMLElement) || !node.classList.contains("is-active")) return;
          if (gsapRuntime) {
            gsapRuntime.fromTo(node,
              { scale: 0.94, y: 7 },
              { scale: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.55)", clearProps: "scale,transform" },
            );
          }
        });
      });
      nodes.forEach((node) => nodeObserver.observe(node, { attributes: true, attributeFilter: ["class"] }));
      cleanupTasks.push(() => nodeObserver.disconnect());
    }
  };

  const linear = { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] } };
  const ease = { i: { x: [0.4], y: [1] }, o: { x: [0.2], y: [0] } };
  const color = [0.847, 0.698, 0.42, 1];
  const ink = [0.16, 0.15, 0.13, 1];

  const animatedNumber = (startFrame, endFrame, start, end, holdFrame = 90) => ({
    a: 1,
    k: [
      { t: startFrame, s: [start], e: [end], ...ease },
      { t: endFrame, s: [end] },
      { t: holdFrame, s: [end] },
    ],
  });

  const animatedVector = (startFrame, endFrame, start, end, holdFrame = 90) => ({
    a: 1,
    k: [
      { t: startFrame, s: start, e: end, ...ease },
      { t: endFrame, s: end },
      { t: holdFrame, s: end },
    ],
  });

  const transform = ({ position = [48, 48, 0], rotation = 0, scale = [100, 100, 100], opacity = 100 } = {}) => ({
    o: typeof opacity === "number" ? { a: 0, k: opacity } : opacity,
    r: typeof rotation === "number" ? { a: 0, k: rotation } : rotation,
    p: Array.isArray(position) ? { a: 0, k: position } : position,
    a: { a: 0, k: [0, 0, 0] },
    s: Array.isArray(scale) ? { a: 0, k: scale } : scale,
  });

  const pathShape = (vertices, stroke = color, width = 2.5, trim) => ({
    ty: "gr",
    it: [
      { ty: "sh", ks: { a: 0, k: { i: vertices.map(() => [0, 0]), o: vertices.map(() => [0, 0]), v: vertices, c: false } } },
      ...(trim ? [{ ty: "tm", s: { a: 0, k: 0 }, e: trim, o: { a: 0, k: 0 }, m: 1 }] : []),
      { ty: "st", c: { a: 0, k: stroke }, o: { a: 0, k: 100 }, w: { a: 0, k: width }, lc: 2, lj: 2, ml: 4 },
      { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
    ],
  });

  const ellipseShape = (size, position, fill = color) => ({
    ty: "gr",
    it: [
      { ty: "el", p: { a: 0, k: position }, s: { a: 0, k: size }, d: 1 },
      { ty: "fl", c: { a: 0, k: fill }, o: { a: 0, k: 100 }, r: 1 },
      { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
    ],
  });

  const shapeLayer = (name, shapes, ks = transform(), ip = 0, op = 90) => ({
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: name,
    sr: 1,
    ks,
    ao: 0,
    shapes,
    ip,
    op,
    st: 0,
    bm: 0,
  });

  const lottieData = (name, layers, frameCount = 90) => ({
    v: "5.13.0",
    fr: 60,
    ip: 0,
    op: frameCount,
    w: 96,
    h: 96,
    nm: name,
    ddd: 0,
    assets: [],
    layers: layers.map((layer, index) => ({ ...layer, ind: index + 1 })),
  });

  const makeContractAnimation = () => {
    const page = pathShape([[-18, -26], [18, -26], [18, 26], [-18, 26], [-18, -26]], ink, 2);
    const lines = [-12, -2, 8, 18].map((y, index) => pathShape(
      [[-11, y], [index === 3 ? 4 : 11, y]],
      color,
      2.4,
      animatedNumber(index * 9, 28 + index * 9, 0, 100),
    ));
    return lottieData("Contract written", [shapeLayer("document", [page, ...lines])]);
  };

  const makeAgentAnimation = () => {
    const dots = [
      ellipseShape([8, 8], [0, -24]),
      ellipseShape([6, 6], [21, 12]),
      ellipseShape([5, 5], [-19, 15]),
    ];
    const orbit = shapeLayer("agent orbit", dots, transform({
      rotation: {
        a: 1,
        k: [
          { t: 0, s: [0], e: [360], ...linear },
          { t: 90, s: [360] },
        ],
      },
    }));
    const core = shapeLayer("agent core", [ellipseShape([18, 18], [0, 0], ink)], transform({
      scale: animatedVector(0, 36, [82, 82, 100], [112, 112, 100], 60),
    }));
    return lottieData("Agent bounded orbit", [orbit, core]);
  };

  const makeGateAnimation = () => {
    const gates = Array.from({ length: 6 }, (_, index) => ellipseShape([7, 7], [-25 + index * 10, 0], index < 5 ? ink : color));
    const rail = pathShape([[-31, 0], [31, 0]], ink, 1.6);
    const scanner = shapeLayer("gate scanner", [pathShape([[-10, -18], [-10, 18]], color, 3)], transform({
      position: animatedVector(0, 52, [24, 48, 0], [72, 48, 0], 70),
    }));
    return lottieData("Six gate scan", [shapeLayer("gate rail", [rail, ...gates]), scanner]);
  };

  const makeReceiptAnimation = () => {
    const ring = {
      ty: "gr",
      it: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [54, 54] }, d: 1 },
        { ty: "st", c: { a: 0, k: color }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2, ml: 4 },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
      ],
    };
    const check = pathShape([[-13, 1], [-3, 11], [16, -12]], ink, 4, animatedNumber(16, 46, 0, 100));
    return lottieData("Receipt stamped", [shapeLayer("receipt", [ring, check], transform({
      scale: animatedVector(0, 28, [24, 24, 100], [100, 100, 100], 90),
      opacity: animatedNumber(0, 16, 0, 100),
    }))]);
  };

  const setupLottie = () => {
    const builders = {
      contract: makeContractAnimation,
      agent: makeAgentAnimation,
      gate: makeGateAnimation,
      receipt: makeReceiptAnimation,
    };
    const effectIds = {
      contract: "lottie-contract",
      agent: "lottie-agent",
      gate: "lottie-gate",
      receipt: "lottie-receipt",
    };

    document.querySelectorAll("[data-lottie-glyph]").forEach((container) => {
      const key = container.dataset.lottieGlyph;
      markEffect(container, effectIds[key]);
      if (!lottieRuntime || !builders[key]) {
        container.dataset.lottieState = "fallback";
        return;
      }
      const animation = lottieRuntime.loadAnimation({
        container,
        renderer: "svg",
        loop: key !== "receipt",
        autoplay: false,
        animationData: builders[key](),
        rendererSettings: { progressiveLoad: true, preserveAspectRatio: "xMidYMid meet" },
      });
      animation.setSpeed(key === "gate" ? 0.82 : 1);
      animation.goToAndStop(0, true);
      container.dataset.lottieState = "ready";
      lottieInstances.set(key, animation);
    });

    const station = document.querySelector("[data-hero-station]");
    const playForStage = () => {
      const stage = station?.dataset.workflowStage || "contract";
      const active = stage === "contract" ? "contract" : stage === "agent" || stage === "tool" ? "agent" : stage === "gate" ? "gate" : "receipt";
      lottieInstances.forEach((animation, key) => {
        const container = document.querySelector(`[data-lottie-glyph="${key}"]`);
        const selected = key === active;
        container?.classList.toggle("is-lottie-active", selected);
        if (reducedMotion.matches) {
          animation.goToAndStop(key === "receipt" ? 45 : 18, true);
        } else if (selected) {
          animation.goToAndPlay(0, true);
        } else {
          animation.goToAndStop(0, true);
        }
      });
    };
    playForStage();

    if (station && "MutationObserver" in window) {
      const observer = new MutationObserver(playForStage);
      observer.observe(station, { attributes: true, attributeFilter: ["data-workflow-stage", "data-station-state"] });
      cleanupTasks.push(() => observer.disconnect());
    }
    cleanupTasks.push(() => {
      lottieInstances.forEach((animation) => animation.destroy());
      lottieInstances.clear();
    });
  };

  const splitWords = (element) => {
    if (!element) return [];
    if (element.dataset.motionSplit === "true") {
      return Array.from(element.querySelectorAll(".motion-word"));
    }
    const label = element.textContent.trim();
    const words = label.split(/\s+/);
    element.textContent = "";
    element.setAttribute("aria-label", label);
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "motion-word";
      span.setAttribute("aria-hidden", "true");
      span.textContent = word;
      element.append(span);
      if (index < words.length - 1) element.append(document.createTextNode(" "));
    });
    element.dataset.motionSplit = "true";
    return Array.from(element.querySelectorAll(".motion-word"));
  };

  const setupGsap = () => {
    const titles = [
      document.querySelector(".index-opening h1"),
      document.querySelector(".hero-station__masthead h2"),
    ].filter(Boolean);
    const station = document.querySelector("[data-hero-station]");
    const executionRows = Array.from(document.querySelectorAll("[data-execution-step]"));
    const statePanels = [
      document.querySelector("[data-station-packet]"),
      document.querySelector("[data-station-execution]"),
      document.querySelector("[data-station-result]"),
    ].filter(Boolean);
    const plates = Array.from(document.querySelectorAll(".semantic-workflow"));

    titles.forEach((title) => markEffect(title, "gsap-word-reveal"));
    executionRows.forEach((row) => markEffect(row, "gsap-stage-timeline"));
    statePanels.forEach((panel) => markEffect(panel, "gsap-state-transition"));
    plates.forEach((plate) => markEffect(plate, "gsap-plate-reveal"));

    if (!gsapRuntime || reducedMotion.matches) {
      titles.forEach((title) => title.classList.add("is-gsap-ready"));
      plates.forEach((plate) => plate.classList.add("is-gsap-plate-ready"));
      return;
    }

    titles.forEach((title, titleIndex) => {
      const words = splitWords(title);
      title.classList.add("is-gsap-ready");
      gsapRuntime.fromTo(words,
        { yPercent: 110, rotateX: -22, autoAlpha: 0 },
        { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 0.74, delay: 0.12 + titleIndex * 0.16, stagger: 0.055, ease: "power4.out", clearProps: "opacity,visibility,transform" },
      );
    });

    const animateHeroState = () => {
      const stage = station?.dataset.workflowStage || "contract";
      const activeRow = executionRows.find((row) => row.dataset.executionStep === stage);
      if (activeRow) {
        gsapRuntime.fromTo(activeRow,
          { x: -13, autoAlpha: 0.45 },
          { x: 0, autoAlpha: 1, duration: 0.46, ease: "power3.out", clearProps: "opacity,visibility,transform" },
        );
        const lamps = activeRow.querySelectorAll(".hero-station__gate-lamps i");
        if (lamps.length) gsapRuntime.fromTo(lamps, { scale: 0.72 }, { scale: 1, duration: 0.34, stagger: 0.045, ease: "back.out(1.8)", clearProps: "scale" });
      }

      statePanels.forEach((panel) => {
        const visible = panel.getAttribute("aria-hidden") !== "true" && getComputedStyle(panel).opacity !== "0";
        if (!visible) return;
        gsapRuntime.fromTo(panel,
          { clipPath: "inset(0 100% 0 0)", y: 8 },
          { clipPath: "inset(0 0% 0 0)", y: 0, duration: 0.58, ease: "power3.out", clearProps: "clipPath,transform" },
        );
      });
    };
    animateHeroState();

    if (station && "MutationObserver" in window) {
      const observer = new MutationObserver(animateHeroState);
      observer.observe(station, { attributes: true, attributeFilter: ["data-workflow-stage", "data-station-state"] });
      cleanupTasks.push(() => observer.disconnect());
    }

    observeOnce(plates, (plate) => {
      plate.classList.add("is-gsap-plate-ready");
      gsapRuntime.fromTo(plate,
        { clipPath: "inset(7% 4% 7% 4%)", autoAlpha: 0.35, scale: 0.985 },
        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, scale: 1, duration: 0.84, ease: "power3.out", clearProps: "clipPath,opacity,visibility,scale" },
      );
    }, { threshold: 0.14 });

    cleanupTasks.push(() => {
      gsapRuntime.killTweensOf([...titles, ...executionRows, ...statePanels, ...plates]);
    });
  };

  const resetRuntime = () => {
    while (cleanupTasks.length) {
      const cleanup = cleanupTasks.pop();
      try {
        cleanup?.();
      } catch (error) {
        console.warn("Motion cleanup skipped one optional controller.", error);
      }
    }
    runtimeStarted = false;
    root.classList.remove("motion-library-runtime");
  };

  const startRuntime = () => {
    resetRuntime();
    runtimeStarted = true;
    root.classList.add("motion-library-runtime");
    root.classList.toggle("motion-library-reduced", reducedMotion.matches);
    setupScrollMagic();
    setupVueUsePatterns();
    setupReactSpringPatterns();
    setupLottie();
    setupGsap();
    document.dispatchEvent(new CustomEvent("portfolio:motion-ready", {
      detail: { effects: effects.length, reduced: reducedMotion.matches },
    }));
  };

  try {
    startRuntime();
    const change = () => startRuntime();
    if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", change);
    else reducedMotion.addListener(change);
  } catch (error) {
    resetRuntime();
    root.classList.add("motion-library-fallback");
    console.warn("Optional motion-library integration was disabled.", error);
  }
})();

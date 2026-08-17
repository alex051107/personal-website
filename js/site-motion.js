(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
  let revealObserver = null;
  let stopPointer = () => {};

  const revealEverything = () => {
    revealTargets.forEach((target) => target.classList.add("is-revealed"));
  };

  const stopRevealObserver = () => {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
  };

  const startReveals = () => {
    stopRevealObserver();

    revealTargets.forEach((target) => {
      const requestedDelay = Number.parseInt(target.dataset.revealDelay || "0", 10);
      const safeDelay = Number.isFinite(requestedDelay)
        ? Math.min(Math.max(requestedDelay, 0), 400)
        : 0;
      target.style.setProperty("--reveal-delay", `${safeDelay}ms`);
    });

    root.classList.add("motion-enabled");

    if (!("IntersectionObserver" in window)) {
      revealEverything();
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -12% 0px" },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  };

  const startPointerResponse = () => {
    const stage = document.querySelector("[data-portrait-stage]");
    if (!stage || !finePointer.matches) return () => {};

    let frame = 0;
    let latestEvent = null;

    const reset = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      latestEvent = null;
      stage.classList.remove("is-pointer-active");
      stage.style.setProperty("--tilt-x", "0deg");
      stage.style.setProperty("--tilt-y", "0deg");
      stage.style.setProperty("--shift-x", "0px");
      stage.style.setProperty("--shift-y", "0px");
    };

    const render = () => {
      frame = 0;
      if (!latestEvent) return;

      const rect = stage.getBoundingClientRect();
      const normalizedX = Math.max(-1, Math.min(1, ((latestEvent.clientX - rect.left) / rect.width) * 2 - 1));
      const normalizedY = Math.max(-1, Math.min(1, ((latestEvent.clientY - rect.top) / rect.height) * 2 - 1));

      stage.classList.add("is-pointer-active");
      stage.style.setProperty("--tilt-x", `${(normalizedX * 1.2).toFixed(2)}deg`);
      stage.style.setProperty("--tilt-y", `${(-normalizedY).toFixed(2)}deg`);
      stage.style.setProperty("--shift-x", `${(normalizedX * 3).toFixed(2)}px`);
      stage.style.setProperty("--shift-y", `${(normalizedY * 2).toFixed(2)}px`);
    };

    const queueRender = (event) => {
      latestEvent = event;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    stage.addEventListener("pointermove", queueRender, { passive: true });
    stage.addEventListener("pointerleave", reset);
    stage.addEventListener("pointercancel", reset);

    return () => {
      stage.removeEventListener("pointermove", queueRender);
      stage.removeEventListener("pointerleave", reset);
      stage.removeEventListener("pointercancel", reset);
      reset();
    };
  };

  const applyMotionPreference = () => {
    stopPointer();
    stopPointer = () => {};

    if (reducedMotion.matches) {
      stopRevealObserver();
      root.classList.remove("motion-enabled");
      revealEverything();
      return;
    }

    startReveals();
    stopPointer = startPointerResponse();
  };

  const navLinks = Array.from(document.querySelectorAll("[data-nav-target]"));
  const navSections = navLinks
    .map((link) => document.getElementById(link.dataset.navTarget))
    .filter(Boolean);

  const setActiveNavigation = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.navTarget === sectionId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window && navSections.length) {
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top))[0];
        if (activeEntry) setActiveNavigation(activeEntry.target.id);
      },
      { threshold: 0, rootMargin: "-38% 0px -52% 0px" },
    );
    navSections.forEach((section) => navigationObserver.observe(section));
  }

  try {
    applyMotionPreference();
    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", applyMotionPreference);
    } else if (typeof reducedMotion.addListener === "function") {
      reducedMotion.addListener(applyMotionPreference);
    }
  } catch (error) {
    stopRevealObserver();
    root.classList.remove("motion-enabled");
    revealEverything();
    stopPointer();
    console.warn("Optional portfolio motion was disabled.", error);
  }
})();

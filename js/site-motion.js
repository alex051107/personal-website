(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
  let revealObserver = null;

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

  const applyMotionPreference = () => {
    if (reducedMotion.matches) {
      stopRevealObserver();
      root.classList.remove("motion-enabled");
      revealEverything();
      return;
    }

    startReveals();
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
    console.warn("Optional portfolio motion was disabled.", error);
  }
})();

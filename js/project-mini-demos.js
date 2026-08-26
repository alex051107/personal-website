(() => {
  "use strict";

  const demos = Array.from(document.querySelectorAll("[data-project-mini-demo]"));
  if (!demos.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animeReady = Boolean(
    window.anime?.animate &&
      window.anime?.svg?.createDrawable &&
      window.anime?.svg?.createMotionPath,
  );

  const setupDemo = (root) => {
    const nodes = Array.from(root.querySelectorAll("[data-demo-node]"));
    const edges = Array.from(root.querySelectorAll("[data-demo-edge]"));
    const packet = root.querySelector("[data-demo-packet]");
    const toggle = root.querySelector("[data-demo-toggle]");
    const toggleLabel = root.querySelector("[data-demo-toggle-label]");
    const counter = root.querySelector("[data-demo-counter]");
    const status = root.querySelector("[data-demo-status]");
    const interval = Math.max(1300, Number(root.dataset.demoInterval) || 1800);
    let activeIndex = 0;
    let visible = !("IntersectionObserver" in window);
    let userPaused = false;
    let timer = 0;
    let activeAnimations = [];

    if (nodes.length < 2) return null;

    const cancelMotion = () => {
      if (timer) window.clearTimeout(timer);
      timer = 0;
      activeAnimations.forEach((animation) => animation?.cancel?.());
      activeAnimations = [];
      if (packet) {
        packet.style.opacity = "0";
        packet.style.removeProperty("transform");
      }
      edges.forEach((edge) => {
        edge.style.removeProperty("stroke-dasharray");
        edge.style.removeProperty("stroke-dashoffset");
        edge.removeAttribute("stroke-dasharray");
        edge.removeAttribute("stroke-dashoffset");
      });
    };

    const canRun = () =>
      !reducedMotion.matches && !userPaused && visible && !document.hidden;

    const writeState = () => {
      const total = String(nodes.length).padStart(2, "0");
      const current = String(activeIndex + 1).padStart(2, "0");
      root.dataset.demoPhase = String(activeIndex);
      root.dataset.demoState = reducedMotion.matches
        ? "reduced"
        : userPaused
          ? "paused"
          : visible && !document.hidden
            ? "playing"
            : "idle";
      if (counter) counter.textContent = `${current} / ${total}`;
      if (status) {
        status.textContent = reducedMotion.matches
          ? `Static overview · ${nodes[activeIndex].dataset.demoLabel || "workflow ready"}`
          : nodes[activeIndex].dataset.demoLabel || "Workflow stage selected";
      }
      if (toggle) {
        toggle.disabled = reducedMotion.matches;
        toggle.setAttribute("aria-pressed", String(!userPaused && !reducedMotion.matches));
      }
      if (toggleLabel) {
        toggleLabel.textContent = reducedMotion.matches
          ? "Static view"
          : userPaused
            ? "Resume loop"
            : "Pause loop";
      }
    };

    const animateEdge = (index) => {
      if (index < 1 || reducedMotion.matches || !animeReady || !packet) return;
      const edge = edges.find((candidate) => Number(candidate.dataset.demoEdge) === index);
      if (!edge) return;

      try {
        const drawable = window.anime.svg.createDrawable(edge)[0];
        const motionPath = window.anime.svg.createMotionPath(edge);
        packet.style.opacity = "1";
        activeAnimations = [
          window.anime.animate(drawable, {
            draw: ["0 0", "0 1"],
            duration: 760,
            ease: "inOutSine",
          }),
          window.anime.animate(packet, {
            ...motionPath,
            duration: 760,
            ease: "inOutSine",
            onComplete: () => {
              packet.style.opacity = "0";
            },
          }),
        ];
      } catch (error) {
        packet.style.opacity = "0";
        console.warn("Optional mini-demo route motion was disabled.", error);
      }
    };

    const activate = (index, options = {}) => {
      const nextIndex = Math.min(nodes.length - 1, Math.max(0, index));
      cancelMotion();
      activeIndex = nextIndex;

      nodes.forEach((node, nodeIndex) => {
        const active = nodeIndex === activeIndex;
        node.classList.toggle("is-active", active);
        node.classList.toggle("is-complete", nodeIndex < activeIndex);
        node.setAttribute("aria-pressed", String(active));
      });
      edges.forEach((edge) => {
        const edgeIndex = Number(edge.dataset.demoEdge);
        edge.classList.toggle("is-active", edgeIndex === activeIndex);
        edge.classList.toggle("is-complete", edgeIndex < activeIndex);
      });

      writeState();
      if (options.animate !== false) animateEdge(activeIndex);
    };

    const schedule = () => {
      if (timer) window.clearTimeout(timer);
      timer = 0;
      if (!canRun()) {
        writeState();
        return;
      }
      const hold = activeIndex === nodes.length - 1 ? interval + 900 : interval;
      timer = window.setTimeout(() => {
        activate((activeIndex + 1) % nodes.length);
        schedule();
      }, hold);
    };

    nodes.forEach((node, index) => {
      node.addEventListener("click", () => {
        userPaused = true;
        activate(index);
        writeState();
      });
    });

    toggle?.addEventListener("click", () => {
      userPaused = !userPaused;
      writeState();
      schedule();
    });

    activate(0, { animate: false });

    return {
      root,
      setVisible(nextVisible) {
        visible = nextVisible;
        writeState();
        schedule();
      },
      refresh() {
        cancelMotion();
        writeState();
        schedule();
      },
    };
  };

  const controllers = demos.map(setupDemo).filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const controller = controllers.find((candidate) => candidate.root === entry.target);
          controller?.setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.16);
        });
      },
      { threshold: [0, 0.16, 0.5], rootMargin: "8% 0px 8% 0px" },
    );
    controllers.forEach((controller) => observer.observe(controller.root));
  } else {
    controllers.forEach((controller) => controller.setVisible(true));
  }

  document.addEventListener("visibilitychange", () => {
    controllers.forEach((controller) => controller.refresh());
  });

  const refreshMotionPreference = () => {
    controllers.forEach((controller) => controller.refresh());
  };

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", refreshMotionPreference);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(refreshMotionPreference);
  }
})();

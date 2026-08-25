(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const pageProgress = document.querySelector(".page-progress");
  const heroExpand = document.querySelector("[data-scroll-expand]");
  const storyControllers = [];
  const spotlightControllers = [];
  const animeReady = Boolean(
    window.anime?.svg?.createDrawable &&
      window.anime?.svg?.createMotionPath &&
      window.anime?.animate,
  );
  let revealObserver = null;
  let scrollFrame = 0;

  root.dataset.motionRuntime = animeReady ? "anime" : "css";

  const clamp = (value, minimum = 0, maximum = 1) =>
    Math.min(maximum, Math.max(minimum, value));

  const setPageProgress = () => {
    if (!pageProgress || reducedMotion.matches) return;
    const scrollRoot = document.scrollingElement || document.documentElement;
    const scrollable = Math.max(1, scrollRoot.scrollHeight - window.innerHeight);
    pageProgress.style.transform = "scaleX(" + clamp(scrollRoot.scrollTop / scrollable).toFixed(4) + ")";
  };

  const prepareReveals = () => {
    const opening = document.querySelector(".index-opening");
    opening?.classList.add("motion-opening");
    const targets = [
      ...document.querySelectorAll("[data-reveal]"),
      opening,
      document.querySelector(".decision-matrix"),
      document.querySelector(".motion-source-map"),
      ...document.querySelectorAll(".project-spread__header"),
      ...document.querySelectorAll(".project-story__visual"),
    ].filter(Boolean);

    targets.forEach((target, index) => {
      target.classList.add("motion-target");
      target.style.setProperty("--motion-delay", Math.min(index * 18, 126) + "ms");
    });

    const revealAll = () => targets.forEach((target) => target.classList.add("is-revealed"));

    const start = () => {
      if (reducedMotion.matches) {
        root.classList.remove("motion-enabled");
        revealAll();
        return;
      }

      root.classList.add("motion-enabled");
      if (!("IntersectionObserver" in window)) {
        revealAll();
        return;
      }

      revealObserver?.disconnect();
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      targets.forEach((target) => {
        if (target.classList.contains("is-revealed")) return;
        revealObserver.observe(target);
      });
    };

    return {
      start,
      stop() {
        revealObserver?.disconnect();
        revealObserver = null;
        revealAll();
      },
    };
  };

  const revealController = prepareReveals();

  const setupSpotlight = (surface) => {
    let pointerFrame = 0;
    let latestEvent = null;

    const clear = () => {
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      latestEvent = null;
      surface.removeAttribute("data-spotlight-active");
      surface.style.removeProperty("--spotlight-x");
      surface.style.removeProperty("--spotlight-y");
    };

    const paint = () => {
      pointerFrame = 0;
      if (!latestEvent || reducedMotion.matches || !finePointer.matches) {
        clear();
        return;
      }
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty("--spotlight-x", latestEvent.clientX - bounds.left + "px");
      surface.style.setProperty("--spotlight-y", latestEvent.clientY - bounds.top + "px");
      surface.setAttribute("data-spotlight-active", "");
    };

    surface.addEventListener("pointermove", (event) => {
      if (reducedMotion.matches || !finePointer.matches) {
        clear();
        return;
      }
      latestEvent = event;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(paint);
    });
    surface.addEventListener("pointerleave", clear);
    surface.addEventListener("pointercancel", clear);

    return { disable: clear };
  };

  const setupProjectStory = (story) => {
    const nodes = Array.from(story.querySelectorAll("[data-story-node]"));
    const steps = Array.from(story.querySelectorAll("[data-story-step]"));
    const edges = Array.from(story.querySelectorAll("[data-edge-stage]"));
    const results = Array.from(story.querySelectorAll("[data-story-result]"));
    const packet = story.querySelector("[data-flow-packet]");
    const log = story.querySelector("[data-story-log]");
    const figure = story.querySelector(".semantic-workflow");
    const canvas = story.querySelector(".semantic-workflow__canvas");
    const focusLens = story.querySelector("[data-story-focus]");
    const statusTitle = story.querySelector("[data-story-status-title]");
    const statusIndex = story.querySelector("[data-story-status-index]");
    const statusState = story.querySelector("[data-story-status-state]");
    const statusRole = story.querySelector("[data-story-status-role]");
    const statusTrack = story.querySelector("[data-story-status-track]");
    const receiptState = story.querySelector("[data-story-receipt-state]");
    const transcriptRows = Array.from(story.querySelectorAll("[data-story-transcript] li"));
    const transcript = new Map(
      transcriptRows.map((row) => [row.dataset.storyLine || "", row]),
    );
    const nextButton = story.querySelector("[data-story-next]");
    const mobileStageIndex = story.querySelector("[data-mobile-stage-index]");
    const mobileStageTitle = story.querySelector("[data-mobile-stage-title]");
    const mobileStageFill = story.querySelector("[data-mobile-stage-fill]");
    const runtimeTargets = [statusTitle, statusState, receiptState, log].filter(Boolean);
    let activeIndex = -1;
    let activeAnimations = [];
    let manualLockUntil = 0;

    if (!nodes.length || nodes.length !== steps.length) return null;

    const cancelAnimations = () => {
      activeAnimations.forEach((animation) => {
        if (typeof animation?.cancel === "function") animation.cancel();
      });
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
      transcriptRows.forEach((row) => {
        row.style.removeProperty("opacity");
        row.style.removeProperty("transform");
        row.style.removeProperty("translate");
      });
      runtimeTargets.forEach((target) => {
        target.style.removeProperty("opacity");
        target.style.removeProperty("transform");
        target.style.removeProperty("translate");
      });
    };

    const animateCurrentStage = (index) => {
      cancelAnimations();
      if (reducedMotion.matches || !animeReady) return;

      const animeRuntime = window.anime;
      const animations = [];

      try {
        const eventRow = transcript.get("event");
        if (eventRow) {
          animations.push(animeRuntime.animate(eventRow, {
            opacity: [0, 1],
            y: [6, 0],
            duration: 360,
            ease: "out(3)",
          }));
        }

        if (runtimeTargets.length) {
          animations.push(animeRuntime.animate(runtimeTargets, {
            opacity: [0.55, 1],
            y: [5, 0],
            duration: 320,
            ease: "out(3)",
          }));
        }

        if (index >= 1 && packet) {
          const edge =
            edges.find(
              (candidate) =>
                Number(candidate.dataset.edgeStage) === index &&
                !candidate.classList.contains("workflow-edge--branch"),
            ) || edges.find((candidate) => Number(candidate.dataset.edgeStage) === index);
          if (edge) {
            const drawable = animeRuntime.svg.createDrawable(edge)[0];
            const motionPath = animeRuntime.svg.createMotionPath(edge);
            packet.style.opacity = "1";
            animations.push(animeRuntime.animate(drawable, {
              draw: ["0 0", "0 1"],
              duration: 680,
              ease: "inOut(3)",
            }));
            animations.push(animeRuntime.animate(packet, {
              ...motionPath,
              duration: 680,
              ease: "inOut(3)",
              onComplete: () => {
                packet.style.opacity = "0";
              },
            }));
          }
        }
        activeAnimations = animations;
      } catch (error) {
        if (packet) packet.style.opacity = "0";
        console.warn("Optional semantic path motion was disabled.", error);
      }
    };

    const setTranscriptValue = (key, value) => {
      const row = transcript.get(key);
      const valueNode = row?.querySelector("code, strong");
      if (valueNode) valueNode.textContent = value;
    };

    const writeRuntime = (index) => {
      const strong = steps[index]?.querySelector("strong")?.textContent?.trim() || "Stage selected.";
      const detail = steps[index]?.querySelector("small")?.textContent?.trim() || "";
      const stepLabel = steps[index]?.querySelector("span")?.textContent?.trim() || "Workflow stage";
      const nodeRole = nodes[index]?.querySelector("small")?.textContent?.trim() || stepLabel;
      const stageNumber = String(index + 1).padStart(2, "0");
      const stateLabel = steps[index]?.dataset.stageState || (index === nodes.length - 1 ? "RECORDED" : (index === 0 ? "READY" : "ACTIVE"));
      const ownerLabel = steps[index]?.dataset.stageOwner || nodeRole.split("·")[0].trim();
      const eventLabel = steps[index]?.dataset.stageEvent || strong;
      const outcomeLabel = steps[index]?.dataset.stageOutcome || detail || "Stage state recorded.";
      story.style.setProperty("--module-progress", ((index + 1) / nodes.length).toFixed(4));
      if (statusTitle) statusTitle.textContent = strong;
      if (statusIndex) statusIndex.textContent = `${stageNumber} / ${String(nodes.length).padStart(2, "0")}`;
      if (statusState) statusState.textContent = stateLabel;
      if (statusRole) statusRole.textContent = nodeRole;
      if (statusTrack) statusTrack.setAttribute("aria-valuenow", String(index + 1));
      if (receiptState) receiptState.textContent = stateLabel;
      setTranscriptValue("event", `${stageNumber} · ${eventLabel}`);
      setTranscriptValue("owner", ownerLabel);
      setTranscriptValue("outcome", outcomeLabel);
      if (log) log.textContent = `${stageNumber} · ${strong}${detail ? ` ${detail}` : ""}`;
      if (mobileStageIndex) mobileStageIndex.textContent = `${stageNumber} / ${String(nodes.length).padStart(2, "0")}`;
      if (mobileStageTitle) mobileStageTitle.textContent = strong;
      if (mobileStageFill) mobileStageFill.style.transform = `scaleX(${((index + 1) / nodes.length).toFixed(4)})`;
    };

    const updateSceneFocus = (index) => {
      const node = nodes[index];
      if (!figure || !canvas || !node) return;
      const canvasBounds = canvas.getBoundingClientRect();
      const nodeBounds = node.getBoundingClientRect();
      if (!canvasBounds.width || !canvasBounds.height) return;
      const x = clamp(
        (nodeBounds.left + nodeBounds.width / 2 - canvasBounds.left) / canvasBounds.width,
        0.08,
        0.92,
      );
      const y = clamp(
        (nodeBounds.top + nodeBounds.height / 2 - canvasBounds.top) / canvasBounds.height,
        0.1,
        0.9,
      );
      const role = node.querySelector("small")?.textContent?.trim() || "Workflow stage";
      const kind = role.split("·")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
      story.style.setProperty("--scene-focus-x", `${(x * 100).toFixed(2)}%`);
      story.style.setProperty("--scene-focus-y", `${(y * 100).toFixed(2)}%`);
      story.style.setProperty("--scene-focus-x-px", `${(x * canvasBounds.width).toFixed(2)}px`);
      story.style.setProperty("--scene-focus-y-px", `${(y * canvasBounds.height).toFixed(2)}px`);
      story.style.setProperty("--scene-stage-progress", (index / Math.max(1, nodes.length - 1)).toFixed(4));
      const stageBadge = `${String(index + 1).padStart(2, "0")} / ${String(nodes.length).padStart(2, "0")} · ${role}`;
      figure.dataset.stageBadge = stageBadge;
      canvas.dataset.stageBadge = stageBadge;
      figure.dataset.stageKind = kind;
      if (focusLens) focusLens.dataset.stageKind = kind;
    };

    const selectStage = (index, options = {}) => {
      const nextIndex = clamp(index, 0, nodes.length - 1);
      const changed = nextIndex !== activeIndex;
      if (options.manual) manualLockUntil = Date.now() + 2400;
      activeIndex = nextIndex;
      story.dataset.activeStage = String(nextIndex);
      story.style.setProperty("--story-progress", String(nextIndex / Math.max(1, nodes.length - 1)));

      nodes.forEach((node, nodeIndex) => {
        const active = nodeIndex === nextIndex;
        node.classList.toggle("is-active", active);
        node.classList.toggle("is-complete", nodeIndex < nextIndex);
        node.classList.toggle("is-pending", nodeIndex > nextIndex);
        node.setAttribute("aria-pressed", String(active));
      });

      steps.forEach((step, stepIndex) => {
        const active = stepIndex === nextIndex;
        step.classList.toggle("is-active", active);
        step.classList.toggle("is-complete", stepIndex < nextIndex);
        step.classList.toggle("is-pending", stepIndex > nextIndex);
        step.setAttribute("aria-pressed", String(active));
        step.setAttribute("aria-expanded", String(active));
        if (active) step.setAttribute("aria-current", "step");
        else step.removeAttribute("aria-current");
        step.dataset.planStatus = active ? "active" : (stepIndex < nextIndex ? "passed" : "pending");
      });

      edges.forEach((edge) => {
        const edgeStage = Number(edge.dataset.edgeStage);
        edge.classList.toggle("is-active", edgeStage === nextIndex);
        edge.classList.toggle("is-complete", edgeStage < nextIndex);
      });

      results.forEach((result) => {
        result.classList.toggle("is-active", Number(result.dataset.storyResult) === nextIndex);
      });

      writeRuntime(nextIndex);
      updateSceneFocus(nextIndex);
      if (changed && options.animate !== false) animateCurrentStage(nextIndex);
    };

    const focusStage = (index, source) => {
      selectStage(index, { manual: true });
      const target = source === "node" ? nodes[index] : steps[index];
      target?.focus({ preventScroll: true });
    };

    const handleStageKey = (event, index, source) => {
      let targetIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") targetIndex = index + 1;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") targetIndex = index - 1;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = nodes.length - 1;
      if (targetIndex === null) return;
      event.preventDefault();
      focusStage(clamp(targetIndex, 0, nodes.length - 1), source);
    };

    nodes.forEach((node, index) => {
      node.addEventListener("click", () => {
        selectStage(index, { manual: true });
        steps[index]?.scrollIntoView({
          behavior: reducedMotion.matches ? "auto" : "smooth",
          block: "center",
        });
      });
      node.addEventListener("keydown", (event) => handleStageKey(event, index, "node"));
    });

    steps.forEach((step, index) => {
      step.style.setProperty("--item-order", String(index));
      step.addEventListener("click", () => selectStage(index, { manual: true }));
      step.addEventListener("keydown", (event) => handleStageKey(event, index, "step"));
    });

    nextButton?.addEventListener("click", () => {
      const nextIndex = activeIndex >= nodes.length - 1 ? 0 : activeIndex + 1;
      selectStage(nextIndex, { manual: true });
      steps[nextIndex]?.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "center",
      });
    });

    if (figure) spotlightControllers.push(setupSpotlight(figure));
    selectStage(0, { animate: false });

    return {
      cancel: cancelAnimations,
      updateScrollProgress() {
        const bounds = story.getBoundingClientRect();
        const activationY = window.innerHeight * 0.44;
        const nearViewport = bounds.bottom >= -window.innerHeight * 0.3 && bounds.top <= window.innerHeight * 1.3;
        let stagePosition = bounds.top > activationY ? 0 : nodes.length - 1;

        if (nearViewport) {
          const centers = steps.map((step) => {
            const stepBounds = step.getBoundingClientRect();
            return stepBounds.top + stepBounds.height * 0.5;
          });

          if (activationY <= centers[0]) {
            stagePosition = 0;
          } else if (activationY >= centers[centers.length - 1]) {
            stagePosition = centers.length - 1;
          } else {
            for (let index = 0; index < centers.length - 1; index += 1) {
              if (activationY < centers[index] || activationY > centers[index + 1]) continue;
              const span = Math.max(1, centers[index + 1] - centers[index]);
              stagePosition = index + clamp((activationY - centers[index]) / span);
              break;
            }
          }

          if (Date.now() >= manualLockUntil) selectStage(Math.round(stagePosition));
        }

        const progress = clamp(stagePosition / Math.max(1, nodes.length - 1));
        story.style.setProperty("--story-scroll-progress", progress.toFixed(4));
        story.style.setProperty("--story-beam-offset", (1 - progress).toFixed(4));
        story.style.setProperty("--story-stage-position", stagePosition.toFixed(4));
        story.classList.toggle("is-story-ready", bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0);
      },
      reduceMotion() {
        cancelAnimations();
        story.classList.add("is-story-ready");
        const progress = clamp(Math.max(0, activeIndex) / Math.max(1, nodes.length - 1));
        story.style.setProperty("--story-scroll-progress", progress.toFixed(4));
        story.style.setProperty("--story-beam-offset", (1 - progress).toFixed(4));
      },
      destroy() {
        cancelAnimations();
      },
    };
  };

  document.querySelectorAll("[data-project-story]").forEach((story) => {
    const controller = setupProjectStory(story);
    if (controller) storyControllers.push(controller);
  });

  const updateHeroExpand = () => {
    if (!heroExpand) return;
    if (reducedMotion.matches) {
      heroExpand.style.setProperty("--hero-expand-scale", "1");
      heroExpand.style.setProperty("--hero-expand-clip", "0px");
      heroExpand.style.setProperty("--hero-expand-radius", "0px");
      heroExpand.style.setProperty("--hero-expand-title-opacity", "1");
      heroExpand.style.setProperty("--hero-expand-title-y", "0px");
      heroExpand.dataset.expandState = "expanded";
      return;
    }
    const bounds = heroExpand.getBoundingClientRect();
    const start = window.innerHeight * 0.92;
    const end = window.innerHeight * 0.26;
    const progress = clamp((start - bounds.top) / Math.max(1, start - end));
    heroExpand.style.setProperty("--hero-expand-scale", (0.965 + progress * 0.035).toFixed(4));
    heroExpand.style.setProperty("--hero-expand-clip", `${((1 - progress) * 1.6).toFixed(3)}%`);
    heroExpand.style.setProperty("--hero-expand-radius", `${((1 - progress) * 22).toFixed(2)}px`);
    heroExpand.style.setProperty("--hero-expand-title-opacity", (0.72 + progress * 0.28).toFixed(4));
    heroExpand.style.setProperty("--hero-expand-title-y", `${((1 - progress) * 8).toFixed(2)}px`);
    heroExpand.dataset.expandState = progress >= 0.985 ? "expanded" : "expanding";
  };

  const updateScrollState = () => {
    scrollFrame = 0;
    setPageProgress();
    updateHeroExpand();
    storyControllers.forEach((controller) => controller.updateScrollProgress());
  };

  const queueScrollState = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
  };

  window.addEventListener("scroll", queueScrollState, { passive: true });
  window.addEventListener("resize", queueScrollState);

  const navLinks = Array.from(document.querySelectorAll("[data-nav-target]"));
  const navSections = navLinks
    .map((link) => document.getElementById(link.dataset.navTarget))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top),
          )[0];
        if (!activeEntry) return;
        navLinks.forEach((link) => {
          const active = link.dataset.navTarget === activeEntry.target.id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { threshold: 0, rootMargin: "-38% 0px -52% 0px" },
    );
    navSections.forEach((section) => navigationObserver.observe(section));
  }

  const applyMotionPreference = () => {
    if (reducedMotion.matches) {
      revealController.stop();
      storyControllers.forEach((controller) => controller.reduceMotion());
      spotlightControllers.forEach((controller) => controller.disable());
      root.classList.remove("motion-enabled");
      if (pageProgress) pageProgress.style.transform = "scaleX(1)";
      updateHeroExpand();
      return;
    }

    revealController.start();
    queueScrollState();
  };

  try {
    applyMotionPreference();
    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", applyMotionPreference);
    } else if (typeof reducedMotion.addListener === "function") {
      reducedMotion.addListener(applyMotionPreference);
    }
    queueScrollState();
  } catch (error) {
    revealController.stop();
    storyControllers.forEach((controller) => controller.cancel());
    spotlightControllers.forEach((controller) => controller.disable());
    root.classList.remove("motion-enabled");
    console.warn("Optional portfolio motion was disabled.", error);
  }
})();

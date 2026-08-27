(() => {
  "use strict";

  const films = Array.from(document.querySelectorAll("[data-project-film]"));
  if (!films.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = Boolean(navigator.connection?.saveData);

  films.forEach((film) => {
    const video = film.querySelector("video");
    const toggle = film.querySelector("[data-film-toggle]");
    const toggleLabel = toggle?.querySelector("span");
    const progress = film.querySelector("[data-film-progress]");
    const status = film.querySelector("[data-film-status]");
    const chapters = Array.from(film.querySelectorAll("[data-film-seek]"));
    const declaredDuration = Number(film.dataset.filmDuration) || 0;

    if (!video) return;

    let isVisible = false;
    let userPaused = reducedMotion.matches || saveData;
    const filmName = (toggle?.getAttribute("aria-label") || "project film")
      .replace(/^(Pause|Play)\s+/i, "")
      .trim();

    const duration = () => (
      Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : declaredDuration
    );

    const setStatus = (message) => {
      if (status) status.textContent = message;
    };

    const renderControl = () => {
      const loopsEnabled = !userPaused;
      film.dataset.filmState = video.paused ? "paused" : "playing";
      if (!toggle) return;
      toggle.setAttribute("aria-pressed", String(loopsEnabled));
      toggle.setAttribute("aria-label", `${loopsEnabled ? "Pause" : "Play"} ${filmName}`);
      if (toggleLabel) toggleLabel.textContent = loopsEnabled ? "Pause motion" : "Play motion";
    };

    const renderTimeline = () => {
      const total = duration();
      const ratio = total > 0 ? Math.min(1, Math.max(0, video.currentTime / total)) : 0;
      if (progress) progress.style.width = `${ratio * 100}%`;

      let activeIndex = 0;
      chapters.forEach((chapter, index) => {
        if (video.currentTime >= Number(chapter.dataset.filmSeek || 0)) activeIndex = index;
      });
      chapters.forEach((chapter, index) => {
        const isActive = index === activeIndex;
        chapter.classList.toggle("is-active", isActive);
        if (isActive) chapter.setAttribute("aria-current", "true");
        else chapter.removeAttribute("aria-current");
      });
    };

    const play = async ({ announce = false } = {}) => {
      if (userPaused || document.visibilityState !== "visible") {
        video.pause();
        renderControl();
        return;
      }
      try {
        video.muted = true;
        await video.play();
        if (announce) setStatus("Motion playing. This film loops continuously while it is on screen.");
      } catch (error) {
        userPaused = true;
        if (announce) setStatus("Playback was blocked. Use Play motion to start the film.");
      }
      renderControl();
    };

    const pause = ({ announce = false, preserveIntent = true } = {}) => {
      if (!preserveIntent) userPaused = true;
      video.pause();
      renderControl();
      if (announce) setStatus("Motion paused. The poster and written workflow remain available.");
    };

    toggle?.addEventListener("click", () => {
      userPaused = !userPaused;
      if (userPaused) pause({ announce: true });
      else play({ announce: true });
    });

    chapters.forEach((chapter) => {
      chapter.addEventListener("click", () => {
        const target = Number(chapter.dataset.filmSeek || 0);
        userPaused = false;
        video.currentTime = Math.max(0, Math.min(target, duration() || target));
        renderTimeline();
        play({ announce: true });
      });
    });

    video.addEventListener("play", renderControl);
    video.addEventListener("pause", renderControl);
    video.addEventListener("timeupdate", renderTimeline);
    video.addEventListener("loadedmetadata", renderTimeline);
    video.addEventListener("error", () => {
      userPaused = true;
      renderControl();
      film.dataset.filmState = "error";
      setStatus("Film unavailable. The poster and written workflow remain visible.");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target !== film) return;
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        if (isVisible && !userPaused) play();
        else if (!isVisible) pause();
      });
    }, { threshold: [0, 0.25, 0.7] });

    observer.observe(film);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") pause();
      else if (isVisible && !userPaused) play();
    });

    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        userPaused = true;
        pause({ announce: true });
      }
    });

    if (userPaused) {
      setStatus(saveData
        ? "Motion is off because data saving is enabled. Use Play motion to start it."
        : "Motion is off because reduced motion is enabled. Use Play motion to start it.");
    }
    renderControl();
    renderTimeline();
  });
})();

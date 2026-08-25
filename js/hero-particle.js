(() => {
  "use strict";

  const specimens = Array.from(document.querySelectorAll("[data-particle-specimen]"));
  if (!specimens.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  const seededUnit = (x, y, salt = 0) => {
    let value = Math.imul(x + 1 + salt, 374761393) ^ Math.imul(y + 1, 668265263);
    value = (value ^ (value >>> 13)) >>> 0;
    return ((Math.imul(value, 1274126177) ^ (value >>> 16)) >>> 0) / 4294967295;
  };

  const setupSpecimen = (root) => {
    const viewport = root.querySelector("[data-particle-viewport]");
    const canvas = root.querySelector("[data-particle-canvas]");
    const source = root.querySelector("[data-particle-source]");
    const trigger = root.querySelector("[data-particle-pulse]");
    const triggerLabel = trigger?.querySelector("span");
    const status = root.querySelector("[data-particle-status]");
    const context = canvas?.getContext("2d", { alpha: true, desynchronized: true });

    if (!viewport || !canvas || !source || !trigger || !context) return null;

    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleContext) return null;

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      frame: 0,
      resizeFrame: 0,
      lastTime: 0,
      assemblyStartedAt: 0,
      stableFrames: 0,
      entered: false,
      prepared: false,
      inspecting: false,
      pointer: { active: false, x: 0, y: 0, radius: 72, impulse: 1 },
      particles: [],
      core: { x: 0, y: 0 },
      observer: null,
      resizeObserver: null,
    };

    const setStatus = (message) => {
      if (status) status.textContent = message;
    };

    const particlePalette = Object.freeze([
      "rgba(245, 240, 227, 0.98)",
      "rgba(222, 216, 201, 0.96)",
      "rgba(190, 184, 172, 0.94)",
      "rgba(139, 136, 130, 0.92)",
      "rgba(82, 82, 80, 0.92)",
    ]);

    const proteinColor = (luminance) => {
      if (luminance > 224) return particlePalette[0];
      if (luminance > 191) return particlePalette[1];
      if (luminance > 151) return particlePalette[2];
      if (luminance > 111) return particlePalette[3];
      return particlePalette[4];
    };

    const requestFrame = () => {
      if (!state.frame && !reducedMotion.matches) {
        state.frame = window.requestAnimationFrame(render);
      }
    };

    const drawParticle = (particle, inspectionAmount) => {
      const coreScale = particle.isLigand ? 1 + inspectionAmount * 0.72 : 1;
      const radius = particle.radius * coreScale;
      context.globalAlpha = clamp(particle.alpha, 0, 1);
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const render = (now = window.performance.now()) => {
      state.frame = 0;
      const elapsed = state.lastTime ? Math.min(2, (now - state.lastTime) / 16.667) : 1;
      state.lastTime = now;
      const assembling = root.dataset.particleState === "assembling";
      const inspectionAmount = state.inspecting ? 1 : 0;
      const coreRadius = Math.min(state.width, state.height) * 0.145;
      const pointerRadius = state.pointer.radius;
      let moving = false;
      let maxEnergy = 0;

      context.clearRect(0, 0, state.width, state.height);

      state.particles.forEach((particle) => {
        if (now < particle.birth) return;

        const coreX = particle.tx - state.core.x;
        const coreY = particle.ty - state.core.y;
        const coreDistance = Math.hypot(coreX, coreY) || 1;
        const opensForCore = state.inspecting && !particle.isLigand && coreDistance < coreRadius;
        const coreOffset = opensForCore
          ? (1 - coreDistance / coreRadius) * Math.min(state.width, state.height) * 0.052
          : 0;
        const targetX = particle.tx + (coreX / coreDistance) * coreOffset;
        const targetY = particle.ty + (coreY / coreDistance) * coreOffset;

        particle.vx += (targetX - particle.x) * 0.048 * elapsed;
        particle.vy += (targetY - particle.y) * 0.048 * elapsed;

        if (state.pointer.active) {
          const pointerX = particle.x - state.pointer.x;
          const pointerY = particle.y - state.pointer.y;
          const pointerDistance = Math.hypot(pointerX, pointerY) || 1;
          if (pointerDistance < pointerRadius) {
            const field = Math.pow(1 - pointerDistance / pointerRadius, 1.75);
            const force = field * 1.18 * state.pointer.impulse * elapsed;
            particle.vx += (pointerX / pointerDistance) * force;
            particle.vy += (pointerY / pointerDistance) * force;
          }
        }

        const damping = Math.pow(0.82, elapsed);
        particle.vx *= damping;
        particle.vy *= damping;
        particle.x += particle.vx * elapsed;
        particle.y += particle.vy * elapsed;
        particle.alpha += (1 - particle.alpha) * 0.11 * elapsed;

        const energy = Math.abs(particle.vx) + Math.abs(particle.vy)
          + Math.abs(targetX - particle.x) * 0.008
          + Math.abs(targetY - particle.y) * 0.008;
        maxEnergy = Math.max(maxEnergy, energy);
        if (energy > 0.035 || particle.alpha < 0.99) moving = true;

        drawParticle(particle, inspectionAmount);
      });

      context.globalAlpha = 1;

      if (assembling && now - state.assemblyStartedAt > 1120) {
        root.dataset.particleState = state.inspecting ? "inspecting" : "stable";
        setStatus("Representation stable · pointer field local");
      }

      if (!state.pointer.active && !assembling && maxEnergy < 0.035) state.stableFrames += 1;
      else state.stableFrames = 0;

      if (moving || state.pointer.active || state.stableFrames < 18) requestFrame();
    };

    const buildParticles = () => {
      if (!source.naturalWidth || !source.naturalHeight || !state.width || !state.height) return false;

      const mobile = state.width < 620;
      const sampleSize = mobile ? 276 : 360;
      const sampleStep = mobile ? 4 : 3;
      sampleCanvas.width = sampleSize;
      sampleCanvas.height = sampleSize;
      sampleContext.clearRect(0, 0, sampleSize, sampleSize);
      sampleContext.drawImage(source, 0, 0, sampleSize, sampleSize);

      let pixels;
      try {
        pixels = sampleContext.getImageData(0, 0, sampleSize, sampleSize).data;
      } catch (error) {
        root.dataset.particleState = "fallback";
        setStatus("Static representation");
        console.warn("The particle specimen kept its static fallback because the source image could not be sampled.", error);
        return false;
      }

      const visualSize = Math.min(
        state.height * (mobile ? 0.62 : 0.91),
        state.width * (mobile ? 0.76 : 0.70),
      );
      const scale = visualSize / sampleSize;
      const offsetX = (state.width - visualSize) / 2;
      const offsetY = mobile
        ? state.height * 0.53 - visualSize / 2
        : (state.height - visualSize) / 2;
      const nextParticles = [];
      let coreX = 0;
      let coreY = 0;
      let coreCount = 0;

      for (let y = 1; y < sampleSize - 1; y += sampleStep) {
        for (let x = 1; x < sampleSize - 1; x += sampleStep) {
          const index = (y * sampleSize + x) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
          const isLigand = red > 106
            && green > 70
            && blue < 104
            && red - blue > 38
            && x > sampleSize * 0.37
            && x < sampleSize * 0.62
            && y > sampleSize * 0.39
            && y < sampleSize * 0.65;

          if (alpha < 220 || (!isLigand && luminance < 78)) continue;

          const targetX = offsetX + x * scale;
          const targetY = offsetY + y * scale;
          const radiusNoise = seededUnit(x, y, 17);
          const particle = {
            tx: targetX,
            ty: targetY,
            x: targetX,
            y: targetY,
            vx: 0,
            vy: 0,
            birth: 0,
            alpha: 1,
            isLigand,
            radius: (mobile ? 0.78 : 0.86) + radiusNoise * (mobile ? 0.62 : 0.82),
            color: isLigand ? "rgba(180, 138, 68, 0.98)" : proteinColor(luminance),
          };
          nextParticles.push(particle);

          if (isLigand) {
            coreX += targetX;
            coreY += targetY;
            coreCount += 1;
          }
        }
      }

      state.particles = nextParticles;
      state.core.x = coreCount ? coreX / coreCount : state.width / 2;
      state.core.y = coreCount ? coreY / coreCount : state.height / 2;
      return nextParticles.length > 0;
    };

    const sizeCanvas = () => {
      state.resizeFrame = 0;
      const bounds = viewport.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      if (width === state.width && height === state.height && state.prepared) return;

      state.width = width;
      state.height = height;
      state.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * state.dpr);
      canvas.height = Math.round(height * state.dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      state.pointer.radius = Math.min(92, Math.max(54, Math.min(width, height) * 0.13));
      state.prepared = buildParticles();

      if (state.prepared && state.entered && !reducedMotion.matches) {
        root.dataset.particleState = state.inspecting ? "inspecting" : "stable";
        trigger.disabled = false;
        render();
      } else if (state.prepared && !reducedMotion.matches) {
        const rootBounds = root.getBoundingClientRect();
        const isVisible = rootBounds.top < window.innerHeight * 0.96 && rootBounds.bottom > 0;
        if (isVisible && scatterAndAssemble()) {
          state.observer?.disconnect();
          state.observer = null;
        }
      }
    };

    const queueResize = () => {
      if (!state.resizeFrame) state.resizeFrame = window.requestAnimationFrame(sizeCanvas);
    };

    const scatterAndAssemble = () => {
      if (!state.prepared || state.entered || reducedMotion.matches) return false;
      state.entered = true;
      state.assemblyStartedAt = window.performance.now();
      state.lastTime = 0;
      state.stableFrames = 0;

      state.particles.forEach((particle, index) => {
        const angle = seededUnit(index, Math.round(particle.tx), 31) * Math.PI * 2;
        const distance = 34 + seededUnit(index, Math.round(particle.ty), 53) * Math.min(178, state.width * 0.18);
        particle.x = particle.tx + Math.cos(angle) * distance;
        particle.y = particle.ty + Math.sin(angle) * distance;
        particle.vx = 0;
        particle.vy = 0;
        particle.alpha = 0;
        particle.birth = state.assemblyStartedAt
          + seededUnit(Math.round(particle.tx), Math.round(particle.ty), 71) * 280;
      });

      root.dataset.particleState = "assembling";
      setStatus("Assembling computable representation");
      trigger.disabled = false;
      requestFrame();
      return true;
    };

    const updatePointer = (event, impulse = 1) => {
      if (!state.entered || reducedMotion.matches) return;
      if (event.target instanceof Element && event.target.closest("button")) return;
      const bounds = viewport.getBoundingClientRect();
      state.pointer.x = clamp(event.clientX - bounds.left, 0, bounds.width);
      state.pointer.y = clamp(event.clientY - bounds.top, 0, bounds.height);
      state.pointer.active = true;
      state.pointer.impulse = impulse;
      state.stableFrames = 0;
      requestFrame();
    };

    viewport.addEventListener("pointermove", (event) => {
      if (finePointer.matches) updatePointer(event, 1);
    });
    viewport.addEventListener("pointerdown", (event) => updatePointer(event, 2.25));
    viewport.addEventListener("pointerup", () => {
      if (!finePointer.matches) state.pointer.active = false;
      state.pointer.impulse = 1;
      requestFrame();
    });
    viewport.addEventListener("pointercancel", () => {
      state.pointer.active = false;
      state.pointer.impulse = 1;
      requestFrame();
    });
    viewport.addEventListener("pointerleave", () => {
      state.pointer.active = false;
      state.pointer.impulse = 1;
      requestFrame();
    });

    trigger.addEventListener("click", () => {
      if (!state.entered || reducedMotion.matches) return;
      state.inspecting = !state.inspecting;
      trigger.setAttribute("aria-pressed", String(state.inspecting));
      if (triggerLabel) triggerLabel.textContent = state.inspecting ? "Return specimen" : "Inspect ligand core";
      root.dataset.particleState = state.inspecting ? "inspecting" : "stable";
      setStatus(state.inspecting
        ? "Ligand core isolated · protein field displaced"
        : "Representation stable · pointer field local");
      state.stableFrames = 0;
      requestFrame();
    });

    const observeEntry = () => {
      state.observer?.disconnect();
      if (state.entered || reducedMotion.matches) return;
      if (!("IntersectionObserver" in window)) {
        scatterAndAssemble();
        return;
      }
      state.observer = new IntersectionObserver(
        (entries, observer) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          if (scatterAndAssemble()) {
            observer.disconnect();
            state.observer = null;
          } else {
            queueResize();
          }
        },
        { threshold: 0.26, rootMargin: "0px 0px -4% 0px" },
      );
      state.observer.observe(root);
    };

    const prepare = () => {
      queueResize();
      observeEntry();
    };

    if (source.complete && source.naturalWidth) prepare();
    else {
      source.addEventListener("load", prepare, { once: true });
      source.addEventListener("error", () => {
        root.dataset.particleState = "fallback";
        setStatus("Static representation unavailable");
      }, { once: true });
    }

    if ("ResizeObserver" in window) {
      state.resizeObserver = new ResizeObserver(queueResize);
      state.resizeObserver.observe(viewport);
    } else {
      window.addEventListener("resize", queueResize, { passive: true });
    }

    return {
      applyPreference() {
        if (reducedMotion.matches) {
          if (state.frame) window.cancelAnimationFrame(state.frame);
          state.frame = 0;
          state.pointer.active = false;
          trigger.disabled = true;
          root.dataset.particleState = "reduced";
          setStatus("Static representation · reduced motion");
          return;
        }

        if (state.entered && state.prepared) {
          trigger.disabled = false;
          root.dataset.particleState = state.inspecting ? "inspecting" : "stable";
          setStatus(state.inspecting
            ? "Ligand core isolated · protein field displaced"
            : "Representation stable · pointer field local");
          render();
        } else {
          root.dataset.particleState = "loading";
          observeEntry();
        }
      },
    };
  };

  const controllers = specimens.map((specimen) => setupSpecimen(specimen)).filter(Boolean);
  const applyPreference = () => controllers.forEach((controller) => controller.applyPreference());

  applyPreference();
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", applyPreference);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(applyPreference);
  }
})();

import * as THREE from "./vendor/three/three.module.min.js";
import { GLTFLoader } from "./vendor/three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "./vendor/three/addons/libs/meshopt_decoder.module.js";

const stationRoot = document.querySelector("[data-hero-station]");

if (stationRoot) {
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const mix = (from, to, amount) => from + (to - from) * amount;
  const easeInOut = (value) => value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
  const segmented = (progress, from, to) => clamp((progress - from) / (to - from), 0, 1);
  const seededUnit = (index, salt = 0) => {
    let value = Math.imul(index + 1 + salt, 374761393);
    value = (value ^ (value >>> 13)) >>> 0;
    return ((Math.imul(value, 1274126177) ^ (value >>> 16)) >>> 0) / 4294967295;
  };

  const viewport = stationRoot.querySelector("[data-station-viewport]");
  const canvas = stationRoot.querySelector("[data-station-canvas]");
  const status = stationRoot.querySelector("[data-station-status]");
  const payload = stationRoot.querySelector("[data-station-payload]");
  const runButtons = Array.from(stationRoot.querySelectorAll("[data-station-run]"));
  const runButton = runButtons[0] || null;
  const inspectButton = stationRoot.querySelector("[data-station-inspect]");
  const tourButton = stationRoot.querySelector("[data-station-tour]");
  const humanButton = stationRoot.querySelector("[data-station-human]");
  const humanDecisionButtons = Array.from(stationRoot.querySelectorAll("[data-human-decision]"));
  const packetCard = stationRoot.querySelector("[data-station-packet]");
  const executionPanel = stationRoot.querySelector("[data-station-execution]");
  const executionSummary = stationRoot.querySelector("[data-execution-summary]");
  const gateCountLabel = stationRoot.querySelector("[data-gate-count]");
  const gateLamps = Array.from(stationRoot.querySelectorAll(".hero-station__gate-lamps i"));
  const gateId = stationRoot.querySelector("[data-gate-id]");
  const gateName = stationRoot.querySelector("[data-gate-name]");
  const gateField = stationRoot.querySelector("[data-gate-field]");
  const gateVerdict = stationRoot.querySelector("[data-gate-verdict]");
  const authorityPanel = stationRoot.querySelector("[data-station-lever]");
  const leverLabel = humanButton?.querySelector(".hero-station__lever-label");
  const resultCard = stationRoot.querySelector("[data-station-result]");
  const resultStatus = stationRoot.querySelector("[data-result-status]");
  const resultTitle = stationRoot.querySelector("[data-result-title]");
  const resultRoute = stationRoot.querySelector("[data-result-route]");
  const resultChecks = stationRoot.querySelector("[data-result-checks]");
  const resultAuthority = stationRoot.querySelector("[data-result-authority]");
  const executionResult = stationRoot.querySelector("[data-execution-result]");
  const executionSteps = new Map(
    Array.from(stationRoot.querySelectorAll("[data-execution-step]"))
      .map((step) => [step.dataset.executionStep, step]),
  );
  const stageIndex = stationRoot.querySelector("[data-stage-index]");
  const stageTitle = stationRoot.querySelector("[data-stage-title]");
  const stageCopy = stationRoot.querySelector("[data-stage-copy]");
  const stageMarkers = new Map(
    Array.from(stationRoot.querySelectorAll("[data-stage-marker]"))
      .map((marker) => [marker.dataset.stageMarker, marker]),
  );
  const leaderLines = new Map(
    Array.from(stationRoot.querySelectorAll("[data-leader-stage]"))
      .map((line) => [line.dataset.leaderStage, line]),
  );

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const urlParameters = new URLSearchParams(window.location.search);
  const forcedFallback = urlParameters.get("hero3d") === "fallback";
  const forcedReducedMotion = urlParameters.get("heroMotion") === "reduced";
  const motionIsReduced = () => forcedReducedMotion || reducedMotion.matches;
  const saveData = Boolean(navigator.connection?.saveData);
  if (forcedReducedMotion) stationRoot.dataset.motionPreference = "reduced";

  const stageDetails = Object.freeze({
    contract: {
      index: "01",
      title: "Contract",
      copy: "TaskPacket and molecular datasets define what the Locator Agent may attempt.",
      modules: ["input"],
    },
    agent: {
      index: "02",
      title: "Locator Agent",
      copy: "The carrier may propose a source or missing input. It cannot cross the validation bank by itself.",
      modules: ["chassis", "locator"],
    },
    tool: {
      index: "03",
      title: "Registered tools",
      copy: "The route reaches one of three known tool ports; the selected port is recorded rather than hidden.",
      modules: ["tools"],
    },
    gate: {
      index: "04",
      title: "Six compatibility checks",
      copy: "Six visible checks resolve in sequence. A failed check diverts the route to a block state.",
      modules: ["gates"],
    },
    trace: {
      index: "05",
      title: "DecisionTrace + RunReceipt",
      copy: "Only after a gate verdict does the route write its tool call, gate result, stop reason, and output state.",
      modules: ["output"],
    },
    human: {
      index: "06",
      title: "Human authority",
      copy: "The external lever is outside the automatic loop. Only an explicit human action can acknowledge review.",
      modules: ["human"],
    },
    result: {
      index: "07",
      title: "Result",
      copy: "The final state is explicit: accepted artifact, needs input, blocked route, revision requested, or rejected route.",
      modules: ["output"],
    },
  });

  const gates = Object.freeze([
    { id: "G1", name: "Source identity", field: "source_hash" },
    { id: "G2", name: "Usage rights", field: "license_id" },
    { id: "G3", name: "Residue mapping", field: "residue_map" },
    { id: "G4", name: "Coverage", field: "time_window" },
    { id: "G5", name: "Scientific meaning", field: "measure_type" },
    { id: "G6", name: "Data maturity", field: "release_state" },
  ]);

  const moduleConfigs = Object.freeze([
    {
      key: "input",
      filename: "hero-harness-input-dock-v1.glb",
      desktop: { position: [-2.02, 0, -0.16], width: 1.28, rotationY: 0.08 },
      mobile: { position: [-1.12, 0, -0.22], width: 0.9, rotationY: 0.08 },
    },
    {
      key: "chassis",
      filename: "hero-harness-chassis-v1.glb",
      desktop: { position: [-0.38, 0, -0.28], width: 1.36, rotationY: 0 },
      mobile: { position: [-0.28, 0, -0.22], width: 1, rotationY: 0 },
    },
    {
      key: "locator",
      filename: "hero-harness-locator-carrier-v1.glb",
      desktop: { position: [-0.42, 0.03, 0.98], width: 0.86, rotationY: 0 },
      mobile: { position: [-0.22, 0.03, 0.82], width: 0.56, rotationY: 0 },
    },
    {
      key: "tools",
      filename: "hero-harness-tool-bank-v1.glb",
      desktop: { position: [-1.36, 0, 0.92], width: 1.25, rotationY: 0.04 },
      mobile: { position: [-0.84, 0, 0.8], width: 0.78, rotationY: 0.04 },
    },
    {
      key: "gates",
      filename: "hero-harness-compatibility-bank-v1.glb",
      desktop: { position: [0.75, 0, 0.9], width: 1.34, rotationY: -0.08 },
      mobile: { position: [0.52, 0, 0.76], width: 0.86, rotationY: -0.08 },
    },
    {
      key: "output",
      filename: "hero-harness-output-station-v1.glb",
      desktop: { position: [1.87, 0, -0.12], width: 0.9, rotationY: -0.12 },
      mobile: { position: [1.02, 0, -0.18], width: 0.58, rotationY: -0.12 },
    },
    {
      key: "human",
      filename: "hero-harness-human-key-v1.glb",
      desktop: { position: [1.9, 0, 1.03], width: 0.62, rotationY: -0.08 },
      mobile: { position: [0.98, 0, 0.78], width: 0.4, rotationY: -0.08 },
    },
  ]);

  const inspectOffsets = Object.freeze({
    input: [-0.34, 0.03, -0.18],
    chassis: [0, -0.02, -0.32],
    locator: [-0.08, 0.22, 0.38],
    tools: [-0.32, 0.06, 0.3],
    gates: [0.32, 0.08, 0.31],
    output: [0.4, 0.04, -0.16],
    human: [0.34, 0.2, 0.36],
  });

  const focusModuleByStage = Object.freeze({
    contract: "input",
    agent: "locator",
    tool: "tools",
    gate: "gates",
    trace: "output",
    human: "human",
    result: "output",
  });

  const stageByModule = Object.freeze({
    input: "contract",
    chassis: "agent",
    locator: "agent",
    tools: "tool",
    gates: "gate",
    output: "result",
    human: "human",
  });

  const markerSide = Object.freeze({
    contract: "left",
    tool: "left",
    trace: "left",
    agent: "right",
    gate: "right",
    human: "right",
    result: "right",
  });

  const state = {
    renderer: null,
    scene: null,
    camera: null,
    rig: null,
    loader: null,
    modules: new Map(),
    loaded: 0,
    loadingStarted: false,
    ready: false,
    isMobile: false,
    frame: 0,
    lastTime: 0,
    observer: null,
    visibilityObserver: null,
    resizeObserver: null,
    running: false,
    scenario: "pass",
    gateCount: 0,
    gateBlocked: false,
    humanDecision: null,
    runStartedAt: 0,
    runDuration: 8600,
    currentStage: "contract",
    selectedStage: "contract",
    reachedStages: new Set(),
    yaw: 0,
    dragging: false,
    pointerId: null,
    pointerX: 0,
    revealItems: [],
    route: null,
    routeGhost: null,
    routeCurve: null,
    routeProgress: 0,
    routeBead: null,
    flowBeads: [],
    toolIndicators: [],
    gateIndicators: [],
    humanIndicator: null,
    humanActive: false,
    reviewReady: false,
    humanMotion: null,
    resultArtifact: null,
    resultMotion: null,
    particle: null,
    leverPointerId: null,
    leverStartY: 0,
    leverPull: 0,
    leverMoved: false,
    pointerMoved: false,
    inspectProgress: 0,
    inspectTarget: 0,
    inspectMotion: null,
    focusProgress: 0,
    focusTarget: 0,
    focusMotion: null,
    focusedStage: null,
    focusAnchorStage: null,
    focusPanX: 0,
    focusPanZ: 0,
    cameraZoom: 1,
    pendingScenario: null,
    tourRequested: true,
    tourActive: false,
    tourOwnsFocus: false,
    tourStageIndex: 0,
    tourStageStartedAt: 0,
    tourPausedUntil: 0,
    tourResumeTimer: 0,
    tourVisible: false,
  };

  const setStatus = (message) => {
    if (status) status.textContent = message;
  };

  const automaticStages = ["contract", "agent", "tool", "gate", "trace"];
  const tourStages = ["contract", "agent", "tool", "gate", "trace", "human", "result"];
  const tourTiming = Object.freeze({ releaseAt: 2300, stageDuration: 3400, resumeDelay: 9000 });
  const focusZoomByStage = Object.freeze({
    contract: 1.2,
    agent: 1.17,
    tool: 1.22,
    gate: 1.18,
    trace: 1.21,
    human: 1.24,
    result: 1.22,
  });

  const updateExecution = (activeStage = "contract", gateCount = 0) => {
    const activeIndex = automaticStages.indexOf(activeStage);
    stationRoot.dataset.workflowStage = activeStage;
    executionPanel?.setAttribute("data-active-stage", activeStage);

    automaticStages.forEach((key, index) => {
      const step = executionSteps.get(key);
      if (!step) return;
      let stepState = "pending";
      if (state.reviewReady || state.gateBlocked || state.humanActive || index < activeIndex) stepState = "done";
      else if (index === activeIndex) stepState = "active";
      if (key === "gate" && state.gateBlocked) stepState = "blocked";
      if (key === "trace" && state.gateBlocked && activeStage === "trace") stepState = "active";
      step.dataset.stepState = stepState;
    });

    const humanStep = executionSteps.get("human");
    if (humanStep) {
      humanStep.dataset.stepState = state.humanDecision
        ? "done"
        : (state.reviewReady && !state.gateBlocked ? "active" : "pending");
    }
    const resultStep = executionSteps.get("result");
    if (resultStep) {
      resultStep.dataset.stepState = state.humanDecision || state.gateBlocked ? "done" : "pending";
    }

    const safeGateCount = clamp(gateCount, 0, 6);
    if (gateCountLabel) gateCountLabel.textContent = `${safeGateCount} / 6`;
    gateLamps.forEach((lamp, index) => {
      lamp.classList.toggle("is-complete", index < safeGateCount && !(state.gateBlocked && index === 2));
      lamp.classList.toggle("is-blocked", state.gateBlocked && index === 2);
    });
    const activeGateIndex = clamp(Math.max(0, safeGateCount - 1), 0, gates.length - 1);
    const activeGate = gates[activeGateIndex];
    if (gateId) gateId.textContent = safeGateCount ? activeGate.id : "G0";
    if (gateName) gateName.textContent = safeGateCount ? activeGate.name : "Run a scenario to inspect each gate.";
    if (gateField) gateField.textContent = safeGateCount ? activeGate.field : "—";
    if (gateVerdict) {
      gateVerdict.textContent = state.gateBlocked ? "BLOCK · mapping missing" : (safeGateCount ? "PASS" : "Pending");
      gateVerdict.dataset.verdict = state.gateBlocked ? "blocked" : (safeGateCount ? "passed" : "pending");
    }
    if (packetCard) {
      const packetConsumed = automaticStages.indexOf(activeStage) >= 2 || state.reviewReady || state.humanActive;
      packetCard.setAttribute("aria-hidden", String(packetConsumed));
    }

    if (executionSummary) {
      const summaries = {
        contract: "Contract seated",
        agent: "Agent planning",
        tool: "Tool call visible",
        gate: `${safeGateCount} of 6 checks`,
        trace: "Writing receipt",
      };
      executionSummary.textContent = state.humanDecision
        ? `Result · ${state.humanDecision}`
        : (state.gateBlocked
          ? "G3 blocked · receipt written"
          : (state.reviewReady ? "Awaiting human scope decision" : summaries[activeStage] || "Waiting for route"));
    }
  };

  const setLeverState = (nextState) => {
    if (!authorityPanel || !humanButton) return;
    authorityPanel.dataset.leverState = nextState;
    const labels = {
      locked: "Locked until gates pass",
      ready: "Acknowledge scope / release",
      dragging: "Pull past the mark",
      pulled: "Human decision recorded",
      decided: "Human decision recorded",
    };
    if (leverLabel) leverLabel.textContent = labels[nextState] || labels.locked;
    humanDecisionButtons.forEach((button) => {
      button.disabled = nextState === "locked" || nextState === "pulled" || nextState === "decided";
    });
    humanButton.setAttribute("aria-pressed", String(nextState === "pulled"));
    if (nextState !== "dragging") authorityPanel.style.removeProperty("--lever-angle");
  };

  const updateLoadProgress = () => {
    stationRoot.style.setProperty("--station-load", (state.loaded / 8).toFixed(4));
    if (payload) payload.textContent = `${state.loaded} / 8 models`;
  };

  const setFallback = (message) => {
    state.running = false;
    state.ready = false;
    stationRoot.dataset.stationState = "fallback";
    setStatus(message);
    if (payload) payload.textContent = "Static station";
    [...runButtons, inspectButton, tourButton, ...humanDecisionButtons].forEach((button) => {
      if (button) button.disabled = true;
    });
    setLeverState("locked");
    resultCard?.setAttribute("aria-hidden", "true");
  };

  const modelURL = (filename) => new URL(`../models/hero-3d/${filename}`, import.meta.url).href;

  const requestRender = () => {
    if (document.visibilityState !== "visible") return;
    if (state.visibilityObserver && !state.tourVisible) return;
    if (!state.frame && state.renderer) state.frame = window.requestAnimationFrame(renderFrame);
  };

  const prepareMaterial = (mesh) => {
    const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const nextMaterials = sourceMaterials.map((sourceMaterial) => {
      const material = sourceMaterial.clone();
      material.userData.baseTransparent = material.transparent;
      material.userData.baseOpacity = material.opacity;
      material.userData.baseEmissive = material.emissive?.clone() || null;
      material.userData.baseEmissiveIntensity = material.emissiveIntensity || 0;
      if (material.map) material.map.anisotropy = Math.min(4, state.renderer.capabilities.getMaxAnisotropy());
      return material;
    });
    mesh.material = Array.isArray(mesh.material) ? nextMaterials : nextMaterials[0];
    mesh.frustumCulled = true;
  };

  const forEachMaterial = (object, callback) => {
    object.traverse((node) => {
      if (!node.isMesh) return;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => callback(material));
    });
  };

  const setOpacity = (object, opacity) => {
    forEachMaterial(object, (material) => {
      const baseOpacity = material.userData.baseOpacity ?? 1;
      material.opacity = baseOpacity * opacity;
      material.transparent = opacity < 0.999 || Boolean(material.userData.baseTransparent);
      material.depthWrite = opacity > 0.6;
    });
  };

  const finalizeOpacity = (object) => {
    forEachMaterial(object, (material) => {
      material.opacity = material.userData.baseOpacity ?? 1;
      material.transparent = Boolean(material.userData.baseTransparent);
      material.depthWrite = true;
    });
  };

  const normalizeModel = (model, config) => {
    model.traverse((node) => {
      if (node.isMesh) prepareMaterial(node);
    });
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.y -= box.min.y;
    model.position.z -= center.z;

    const wrapper = new THREE.Group();
    wrapper.name = `station-${config.key}`;
    wrapper.userData.config = config;
    wrapper.userData.moduleKey = config.key;
    wrapper.userData.sourceWidth = size.x;
    wrapper.userData.sourceHeight = size.y;
    wrapper.add(model);
    state.rig.add(wrapper);
    state.modules.set(config.key, wrapper);
    applyModuleLayout(wrapper);
    addModuleIndicators(config.key, wrapper);

    if (motionIsReduced()) {
      setOpacity(wrapper, 1);
    } else {
      setOpacity(wrapper, 0);
      wrapper.position.y -= 0.08;
      state.revealItems.push({ wrapper, startedAt: window.performance.now() + state.loaded * 48 });
      requestRender();
    }

    return wrapper;
  };

  const applyModuleLayout = (wrapper) => {
    const config = wrapper.userData.config;
    const layout = state.isMobile ? config.mobile : config.desktop;
    const scale = layout.width / wrapper.userData.sourceWidth;
    wrapper.scale.setScalar(scale);
    wrapper.position.set(...layout.position);
    wrapper.rotation.set(0, layout.rotationY, 0);
    wrapper.userData.basePosition = wrapper.position.clone();
    wrapper.userData.baseRotationY = layout.rotationY;
  };

  const indicatorMaterial = () => new THREE.MeshStandardMaterial({
    color: 0x5e4b2d,
    emissive: 0x000000,
    emissiveIntensity: 0,
    metalness: 0.72,
    roughness: 0.38,
  });

  const addModuleIndicators = (key, wrapper) => {
    if (key === "tools") {
      const geometry = new THREE.TorusGeometry(0.052, 0.012, 8, 24);
      [-0.34, 0, 0.34].forEach((x, index) => {
        const indicator = new THREE.Mesh(geometry, indicatorMaterial());
        indicator.position.set(x, 0.46, 0.17);
        indicator.rotation.x = Math.PI / 2;
        indicator.userData.index = index;
        wrapper.add(indicator);
        state.toolIndicators.push(indicator);
      });
    }

    if (key === "gates") {
      const geometry = new THREE.SphereGeometry(0.025, 12, 8);
      for (let index = 0; index < 6; index += 1) {
        const indicator = new THREE.Mesh(geometry, indicatorMaterial());
        indicator.position.set(-0.42 + index * 0.168, 0.64, 0.15);
        indicator.userData.index = index;
        wrapper.add(indicator);
        state.gateIndicators.push(indicator);
      }
    }

    if (key === "human") {
      const indicator = new THREE.Mesh(
        new THREE.TorusGeometry(0.09, 0.014, 8, 28),
        indicatorMaterial(),
      );
      indicator.position.set(0, 0.52, 0.06);
      indicator.rotation.x = Math.PI / 2;
      wrapper.add(indicator);
      state.humanIndicator = indicator;
    }
  };

  const createParticleSpecimen = (model) => {
    const sampled = [];
    model.updateMatrixWorld(true);
    model.traverse((node) => {
      if (!node.isMesh || !node.geometry?.attributes?.position) return;
      const attribute = node.geometry.attributes.position;
      const step = Math.max(1, Math.floor(attribute.count / 10500));
      const point = new THREE.Vector3();
      for (let index = 0; index < attribute.count; index += step) {
        point.fromBufferAttribute(attribute, index).applyMatrix4(node.matrixWorld);
        sampled.push(point.clone());
      }
    });

    if (!sampled.length) throw new Error("The protein specimen contains no readable vertices.");

    const bounds = new THREE.Box3().setFromPoints(sampled);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 0.94 / Math.max(size.x, size.y, size.z);
    const positions = new Float32Array(sampled.length * 3);
    const colors = new Float32Array(sampled.length * 3);
    const warmWhite = new THREE.Color(0xeee7d7);
    const warmGrey = new THREE.Color(0x8b8981);
    const color = new THREE.Color();

    sampled.forEach((point, index) => {
      point.sub(center).multiplyScalar(scale);
      positions[index * 3] = point.x;
      positions[index * 3 + 1] = point.y;
      positions[index * 3 + 2] = point.z;
      color.copy(warmGrey).lerp(warmWhite, 0.72 + seededUnit(index, 29) * 0.28);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    const material = new THREE.PointsMaterial({
      size: state.isMobile ? 0.014 : 0.012,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.98,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const protein = new THREE.Points(geometry, material);
    protein.name = "protein-particle-field";

    const ligandPositions = new Float32Array(96 * 3);
    for (let index = 0; index < 96; index += 1) {
      const radius = 0.018 + Math.cbrt(seededUnit(index, 91)) * 0.075;
      const theta = seededUnit(index, 111) * Math.PI * 2;
      const phi = Math.acos(2 * seededUnit(index, 137) - 1);
      ligandPositions[index * 3] = 0.035 + Math.sin(phi) * Math.cos(theta) * radius;
      ligandPositions[index * 3 + 1] = -0.025 + Math.cos(phi) * radius * 0.62;
      ligandPositions[index * 3 + 2] = 0.02 + Math.sin(phi) * Math.sin(theta) * radius * 0.72;
    }
    const ligandGeometry = new THREE.BufferGeometry();
    ligandGeometry.setAttribute("position", new THREE.BufferAttribute(ligandPositions, 3));
    const ligand = new THREE.Points(
      ligandGeometry,
      new THREE.PointsMaterial({
        color: 0xd8b56f,
        size: state.isMobile ? 0.03 : 0.025,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.98,
        depthWrite: false,
      }),
    );

    const group = new THREE.Group();
    group.name = "scientific-particle-specimen";
    group.add(protein, ligand);
    group.rotation.set(-0.16, 0.42, 0.05);
    state.rig.add(group);

    state.particle = {
      group,
      protein,
      ligand,
      attribute: geometry.attributes.position,
      home: positions.slice(),
      velocity: new Float32Array(positions.length),
      pointer: new THREE.Vector3(),
      pointerActive: false,
      inspect: 0,
      inspectTarget: 0,
    };
    applySpecimenLayout();
  };

  const applySpecimenLayout = () => {
    if (!state.particle) return;
    if (state.isMobile) {
      state.particle.group.position.set(-0.28, 0.6, -0.2);
      state.particle.group.scale.setScalar(0.66);
      state.particle.protein.material.size = 0.014;
      state.particle.ligand.material.size = 0.03;
    } else {
      state.particle.group.position.set(-0.38, 0.7, -0.26);
      state.particle.group.scale.setScalar(0.9);
      state.particle.protein.material.size = 0.012;
      state.particle.ligand.material.size = 0.025;
    }
  };

  const updateParticleField = (snap = false) => {
    const particle = state.particle;
    if (!particle) return false;
    const positions = particle.attribute.array;
    const home = particle.home;
    const velocity = particle.velocity;
    particle.inspect = snap
      ? particle.inspectTarget
      : mix(particle.inspect, particle.inspectTarget, 0.13);
    let energy = Math.abs(particle.inspectTarget - particle.inspect);

    for (let index = 0; index < positions.length; index += 3) {
      const homeX = home[index];
      const homeY = home[index + 1];
      const homeZ = home[index + 2];
      let targetX = homeX;
      let targetY = homeY;
      let targetZ = homeZ;

      const centerDistance = Math.hypot(homeX - 0.035, homeY + 0.025, homeZ - 0.02) || 1;
      if (particle.inspect > 0 && centerDistance < 0.38) {
        const displacement = Math.pow(1 - centerDistance / 0.38, 1.35) * 0.17 * particle.inspect;
        targetX += (homeX - 0.035) / centerDistance * displacement;
        targetY += (homeY + 0.025) / centerDistance * displacement;
        targetZ += (homeZ - 0.02) / centerDistance * displacement;
      }

      if (particle.pointerActive) {
        const dx = homeX - particle.pointer.x;
        const dy = homeY - particle.pointer.y;
        const dz = homeZ - particle.pointer.z;
        const distance = Math.hypot(dx, dy, dz) || 1;
        if (distance < 0.19) {
          const displacement = Math.pow(1 - distance / 0.19, 1.55) * 0.075;
          targetX += dx / distance * displacement;
          targetY += dy / distance * displacement;
          targetZ += dz / distance * displacement;
        }
      }

      if (snap) {
        positions[index] = targetX;
        positions[index + 1] = targetY;
        positions[index + 2] = targetZ;
        velocity[index] = 0;
        velocity[index + 1] = 0;
        velocity[index + 2] = 0;
        continue;
      }

      velocity[index] = (velocity[index] + (targetX - positions[index]) * 0.12) * 0.78;
      velocity[index + 1] = (velocity[index + 1] + (targetY - positions[index + 1]) * 0.12) * 0.78;
      velocity[index + 2] = (velocity[index + 2] + (targetZ - positions[index + 2]) * 0.12) * 0.78;
      positions[index] += velocity[index];
      positions[index + 1] += velocity[index + 1];
      positions[index + 2] += velocity[index + 2];
      energy = Math.max(
        energy,
        Math.abs(velocity[index]) + Math.abs(velocity[index + 1]) + Math.abs(velocity[index + 2]),
      );
    }

    particle.attribute.needsUpdate = true;
    return !snap && (energy > 0.00035 || particle.pointerActive);
  };

  const createBench = () => {
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(5.25, 0.08, 2.5),
      new THREE.MeshStandardMaterial({ color: 0x171916, roughness: 0.93, metalness: 0.06 }),
    );
    bench.position.set(0, -0.08, 0.26);
    state.rig.add(bench);

    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(bench.geometry),
      new THREE.LineBasicMaterial({ color: 0x6d5732, transparent: true, opacity: 0.58 }),
    );
    edge.position.copy(bench.position);
    state.rig.add(edge);
  };

  const disposeObject = (object) => {
    object?.traverse((node) => {
      node.geometry?.dispose?.();
      if (Array.isArray(node.material)) node.material.forEach((material) => material.dispose?.());
      else node.material?.dispose?.();
    });
  };

  const buildRoute = () => {
    if (!state.rig) return;
    if (state.route) {
      state.rig.remove(state.route);
      state.route.geometry.dispose();
      state.route.material.dispose();
    }
    if (state.routeGhost) {
      state.rig.remove(state.routeGhost);
      state.routeGhost.geometry.dispose();
      state.routeGhost.material.dispose();
    }
    if (state.routeBead) {
      state.rig.remove(state.routeBead);
      disposeObject(state.routeBead);
    }
    state.flowBeads.forEach((bead) => {
      state.rig.remove(bead);
      disposeObject(bead);
    });
    state.flowBeads = [];
    if (state.resultArtifact) {
      state.rig.remove(state.resultArtifact);
      disposeObject(state.resultArtifact);
      state.resultArtifact = null;
    }

    const position = (key) => {
      const wrapper = state.modules.get(key);
      if (wrapper) return wrapper.userData.basePosition.clone();
      const config = moduleConfigs.find((item) => item.key === key);
      return new THREE.Vector3(...(state.isMobile ? config.mobile.position : config.desktop.position));
    };
    const input = position("input");
    const chassis = position("chassis");
    const locator = position("locator");
    const tools = position("tools");
    const gates = position("gates");
    const output = position("output");
    const points = [
      input.clone().add(new THREE.Vector3(0.34, 0.07, 0.42)),
      chassis.clone().add(new THREE.Vector3(-0.35, 0.09, 0.5)),
      locator.clone().add(new THREE.Vector3(0, 0.1, 0.02)),
      tools.clone().add(new THREE.Vector3(0.36, 0.1, 0.02)),
      gates.clone().add(new THREE.Vector3(-0.28, 0.1, 0.06)),
      output.clone().add(new THREE.Vector3(-0.22, 0.08, 0.36)),
    ];
    state.routeCurve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.4);
    state.routeGhost = new THREE.Mesh(
      new THREE.TubeGeometry(state.routeCurve, 160, state.isMobile ? 0.009 : 0.012, 6, false),
      new THREE.MeshStandardMaterial({
        color: 0x6d5732,
        emissive: 0x24190c,
        emissiveIntensity: 0.28,
        metalness: 0.78,
        roughness: 0.42,
      }),
    );
    state.routeGhost.name = "trace-tape";
    state.rig.add(state.routeGhost);

    const routePoints = state.routeCurve.getPoints(260).map((point) => point.clone().add(new THREE.Vector3(0, 0.022, 0)));
    const geometry = new THREE.BufferGeometry().setFromPoints(routePoints);
    const material = new THREE.LineBasicMaterial({ color: 0xe0bc75, transparent: true, opacity: 0.98 });
    state.route = new THREE.Line(geometry, material);
    state.route.name = "reviewable-trace-route";
    state.route.renderOrder = 4;
    state.rig.add(state.route);
    setRouteProgress(state.routeProgress);

    state.routeBead = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 16, 10),
      new THREE.MeshStandardMaterial({
        color: 0xd8b56f,
        emissive: 0x7e5c25,
        emissiveIntensity: 0.8,
        metalness: 0.72,
        roughness: 0.28,
      }),
    );
    state.routeBead.position.copy(state.routeCurve.getPointAt(state.routeProgress)).add(new THREE.Vector3(0, 0.025, 0));
    state.rig.add(state.routeBead);

    for (let index = 0; index < 3; index += 1) {
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.022 - index * 0.003, 12, 8),
        new THREE.MeshStandardMaterial({
          color: 0xe0bc75,
          emissive: 0x7e5c25,
          emissiveIntensity: 0.58 - index * 0.1,
          transparent: true,
          opacity: 0.72 - index * 0.14,
          depthWrite: false,
        }),
      );
      bead.visible = false;
      bead.renderOrder = 5;
      state.rig.add(bead);
      state.flowBeads.push(bead);
    }

    const receipt = new THREE.Group();
    receipt.name = "evidence-bundle-receipt";
    const receiptCard = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.24, 0.035),
      new THREE.MeshStandardMaterial({ color: 0xeee7d7, roughness: 0.62, metalness: 0.04 }),
    );
    const receiptRule = new THREE.Mesh(
      new THREE.BoxGeometry(0.29, 0.018, 0.042),
      new THREE.MeshStandardMaterial({
        color: 0xd8b56f,
        emissive: 0x65481e,
        emissiveIntensity: 0.34,
        metalness: 0.5,
        roughness: 0.35,
      }),
    );
    receiptRule.position.set(0, 0.064, 0.022);
    receipt.add(receiptCard, receiptRule);
    receipt.userData.home = output.clone().add(new THREE.Vector3(-0.08, 0.18, 0.14));
    receipt.userData.released = output.clone().add(new THREE.Vector3(0.42, 0.45, 0.28));
    receipt.userData.targetScale = state.isMobile ? 0.72 : 1;
    receipt.position.copy(state.humanActive ? receipt.userData.released : receipt.userData.home);
    receipt.rotation.set(-0.18, -0.24, 0.04);
    receipt.scale.setScalar(state.humanActive ? receipt.userData.targetScale : 0.01);
    receipt.visible = state.humanActive;
    state.rig.add(receipt);
    state.resultArtifact = receipt;
  };

  const setRouteProgress = (progress) => {
    state.routeProgress = clamp(progress, 0, 1);
    if (state.route) {
      const count = state.route.geometry.attributes.position.count;
      state.route.geometry.setDrawRange(0, Math.max(1, Math.round(count * state.routeProgress)));
    }
    if (state.routeBead && state.routeCurve) {
      state.routeBead.visible = state.routeProgress > 0.01;
      state.routeBead.position.copy(state.routeCurve.getPointAt(state.routeProgress)).add(new THREE.Vector3(0, 0.025, 0));
    }
    state.flowBeads.forEach((bead, index) => {
      const beadProgress = clamp(state.routeProgress - (index + 1) * 0.028, 0, 1);
      bead.visible = state.routeProgress > (index + 1) * 0.028 && state.routeProgress < 0.998;
      if (bead.visible) {
        bead.position.copy(state.routeCurve.getPointAt(beadProgress)).add(new THREE.Vector3(0, 0.025, 0));
      }
    });
  };

  const applyInspectionLayout = () => {
    const distanceScale = state.isMobile ? 0.58 : 1;
    state.modules.forEach((wrapper, moduleKey) => {
      const base = wrapper.userData.basePosition;
      const offset = inspectOffsets[moduleKey];
      if (!base || !offset) return;
      wrapper.position.set(
        base.x + offset[0] * state.inspectProgress * distanceScale,
        base.y + offset[1] * state.inspectProgress * distanceScale,
        base.z + offset[2] * state.inspectProgress * distanceScale,
      );
    });

    if (state.rig) {
      state.rig.position.x = state.focusPanX;
      state.rig.position.z = state.focusPanZ;
      state.rig.position.y = state.isMobile ? 0.04 : -0.27;
      state.rig.rotation.y = state.yaw;
    }

    if (state.camera) {
      state.camera.zoom = state.cameraZoom;
      state.camera.updateProjectionMatrix();
    }

    const selectedModules = new Set(stageDetails[state.focusAnchorStage]?.modules || []);
    state.modules.forEach((wrapper, moduleKey) => {
      if (!state.focusAnchorStage || selectedModules.has(moduleKey)) finalizeOpacity(wrapper);
      else setOpacity(wrapper, mix(1, 0.16, state.focusProgress));
    });
    if (state.particle) {
      const specimenTarget = !state.focusAnchorStage || state.focusAnchorStage === "agent" ? 0.98 : 0.12;
      const specimenOpacity = mix(0.98, specimenTarget, state.focusProgress);
      state.particle.protein.material.opacity = specimenOpacity;
      state.particle.ligand.material.opacity = specimenOpacity;
    }
  };

  const applyLayout = () => {
    state.modules.forEach((wrapper) => applyModuleLayout(wrapper));
    applySpecimenLayout();
    buildRoute();
    applyInspectionLayout();
  };

  const updateMarkers = () => {
    const inspectionOpen = state.inspectProgress > 0.04 || state.inspectTarget > 0;
    if (!state.camera || !state.rig || (state.isMobile && !inspectionOpen)) {
      stageMarkers.forEach((marker) => {
        marker.classList.remove("is-projected");
        marker.style.removeProperty("--marker-x-px");
        marker.style.removeProperty("--marker-y-px");
      });
      leaderLines.forEach((line) => line.removeAttribute("data-visible"));
      return;
    }

    state.scene.updateMatrixWorld(true);
    const anchors = {
      contract: { object: state.modules.get("input"), local: [0, 0.76, 0] },
      agent: { object: state.modules.get("locator"), local: [0, 0.58, 0] },
      tool: { object: state.modules.get("tools"), local: [0, 0.54, 0] },
      gate: { object: state.modules.get("gates"), local: [0, 0.72, 0] },
      human: { object: state.modules.get("human"), local: [0, 0.66, 0] },
      result: { object: state.modules.get("output"), local: [0.18, 0.68, 0] },
    };

    const projected = [];
    stageMarkers.forEach((marker, key) => {
      let point;
      if (key === "trace" && state.routeCurve) {
        point = state.rig.localToWorld(state.routeCurve.getPointAt(0.72));
      } else {
        const anchor = anchors[key];
        if (!anchor?.object) return;
        point = anchor.object.localToWorld(new THREE.Vector3(...anchor.local));
      }
      point.project(state.camera);
      const anchorX = clamp((point.x * 0.5 + 0.5) * viewport.clientWidth, viewport.clientWidth * 0.035, viewport.clientWidth * 0.965);
      const anchorY = clamp((-point.y * 0.5 + 0.5) * viewport.clientHeight, viewport.clientHeight * 0.08, viewport.clientHeight * 0.92);
      projected.push({ key, marker, anchorX, anchorY, side: markerSide[key] || "left" });
    });

    const labelPositions = new Map();
    if (inspectionOpen) {
      const minimumY = state.isMobile ? 84 : 128;
      const maximumY = viewport.clientHeight - (state.isMobile ? 64 : 74);
      const gap = state.isMobile ? 64 : 82;
      ["left", "right"].forEach((side) => {
        const items = projected.filter((item) => item.side === side).sort((a, b) => a.anchorY - b.anchorY);
        let nextY = minimumY;
        items.forEach((item) => {
          const labelY = clamp(Math.max(item.anchorY, nextY), minimumY, maximumY);
          labelPositions.set(item.key, {
            x: side === "left"
              ? (state.isMobile ? 64 : 142)
              : viewport.clientWidth - (state.isMobile ? 64 : 142),
            y: labelY,
          });
          nextY = labelY + gap;
        });
        const overflow = nextY - gap - maximumY;
        if (overflow > 0) {
          items.forEach((item) => {
            const current = labelPositions.get(item.key);
            current.y = Math.max(minimumY, current.y - overflow);
          });
        }
      });
    }

    projected.forEach(({ key, marker, anchorX, anchorY }) => {
      const label = labelPositions.get(key) || { x: anchorX, y: anchorY };
      marker.classList.add("is-projected");
      marker.style.setProperty("--marker-x-px", `${label.x.toFixed(2)}px`);
      marker.style.setProperty("--marker-y-px", `${label.y.toFixed(2)}px`);
      const line = leaderLines.get(key);
      if (line) {
        line.setAttribute("x1", anchorX.toFixed(2));
        line.setAttribute("y1", anchorY.toFixed(2));
        line.setAttribute("x2", label.x.toFixed(2));
        line.setAttribute("y2", label.y.toFixed(2));
        if (inspectionOpen) line.setAttribute("data-visible", "true");
        else line.removeAttribute("data-visible");
      }
    });
  };

  const setIndicators = (toolActive = false, gateCount = 0, blockedGateIndex = -1) => {
    state.toolIndicators.forEach((indicator, index) => {
      const active = toolActive && index === 1;
      indicator.material.color.setHex(active ? 0xd8b56f : 0x5e4b2d);
      indicator.material.emissive.setHex(active ? 0x8a6228 : 0x000000);
      indicator.material.emissiveIntensity = active ? 1.4 : 0;
    });
    state.gateIndicators.forEach((indicator, index) => {
      const blocked = index === blockedGateIndex;
      const active = index < gateCount && !blocked;
      indicator.material.color.setHex(blocked ? 0xb66c43 : (active ? 0xd8b56f : 0x5e4b2d));
      indicator.material.emissive.setHex(blocked ? 0x7a2f16 : (active ? 0x8a6228 : 0x000000));
      indicator.material.emissiveIntensity = blocked ? 1.45 : (active ? 1.25 : 0);
    });
  };

  const highlightStage = (key) => {
    const selectedModules = new Set(stageDetails[key]?.modules || []);
    state.modules.forEach((wrapper, moduleKey) => {
      const selected = selectedModules.has(moduleKey);
      forEachMaterial(wrapper, (material) => {
        if (!material.emissive) return;
        const base = material.userData.baseEmissive;
        material.emissive.copy(base || new THREE.Color(0x000000));
        if (selected) material.emissive.lerp(new THREE.Color(0x9c7130), 0.58);
        material.emissiveIntensity = selected ? 0.32 : (material.userData.baseEmissiveIntensity || 0);
      });
    });
    if (state.humanIndicator) {
      const selected = key === "human" || state.humanActive;
      state.humanIndicator.material.color.setHex(selected ? 0xd8b56f : 0x5e4b2d);
      state.humanIndicator.material.emissive.setHex(selected ? 0x8a6228 : 0x000000);
      state.humanIndicator.material.emissiveIntensity = selected ? 1.3 : 0;
    }
  };

  const selectStage = (key, { pause = true } = {}) => {
    const detail = stageDetails[key];
    if (!detail) return;
    if (pause && state.running) {
      state.running = false;
      stationRoot.dataset.stationState = motionIsReduced() ? "reduced" : "ready";
      runButtons.forEach((button) => {
        button.disabled = false;
        const scenario = button.dataset.stationScenario || "pass";
        button.querySelector("span").textContent = `Restart ${scenario.toUpperCase()} example`;
      });
      setStatus(`Route paused at ${detail.title}`);
    }
    state.selectedStage = key;
    if (stageIndex) stageIndex.textContent = detail.index;
    if (stageTitle) stageTitle.textContent = detail.title;
    if (stageCopy) stageCopy.textContent = detail.copy;
    stageMarkers.forEach((marker, markerKey) => {
      const selected = markerKey === key;
      marker.classList.toggle("is-selected", selected);
      marker.querySelector("button")?.setAttribute("aria-pressed", String(selected));
    });
    highlightStage(key);
    requestRender();
  };

  const setInspectControl = (open) => {
    if (!inspectButton) return;
    inspectButton.setAttribute("aria-pressed", String(open));
    const label = inspectButton.querySelector("span");
    const note = inspectButton.querySelector("small");
    if (label) label.textContent = open ? "Assemble the harness" : "Inspect the harness";
    if (note) note.textContent = open ? "restore complete instrument" : "separate + label modules";
  };

  const setFocusedStage = (key = null, { duration = 620, source = "interaction" } = {}) => {
    const previousStage = state.focusedStage;
    state.focusedStage = key && stageDetails[key] ? key : null;
    if (state.focusedStage) state.focusAnchorStage = state.focusedStage;
    state.focusTarget = state.focusedStage ? 1 : 0;
    const focusedModule = state.modules.get(focusModuleByStage[state.focusedStage]);
    const focusedPosition = focusedModule?.position || new THREE.Vector3();
    const panScale = state.isMobile ? 0.1 : 0.22;
    const desktopZoom = focusZoomByStage[state.focusedStage] || 1.18;
    const mobileZoom = 1 + (desktopZoom - 1) * 0.48;
    state.focusMotion = !state.focusedStage && !previousStage && state.focusProgress < 0.001
      ? null
      : {
          startedAt: window.performance.now(),
          from: state.focusProgress,
          to: state.focusTarget,
          fromPanX: state.focusPanX,
          toPanX: state.focusedStage ? -focusedPosition.x * panScale : 0,
          fromPanZ: state.focusPanZ,
          toPanZ: state.focusedStage ? -focusedPosition.z * panScale : 0,
          fromZoom: state.cameraZoom,
          toZoom: state.focusedStage ? (state.isMobile ? mobileZoom : desktopZoom) : 1,
          duration: motionIsReduced() ? 1 : duration,
        };

    if (state.focusedStage) stationRoot.dataset.moduleFocus = state.focusedStage;
    else delete stationRoot.dataset.moduleFocus;

    stageMarkers.forEach((marker, markerKey) => {
      marker.classList.toggle("is-focused", markerKey === state.focusedStage);
      marker.classList.toggle("is-dimmed", Boolean(state.focusedStage && markerKey !== state.focusedStage));
    });
    if (state.focusedStage) {
      selectStage(state.focusedStage, { pause: false });
      setStatus(source === "tour"
        ? `Auto tour · ${stageDetails[state.focusedStage].title}`
        : `${stageDetails[state.focusedStage].title} focused · select it again or press Escape to assemble`);
    }
    applyInspectionLayout();
  };

  const completeInspectionState = () => {
    const inspectionOpen = state.inspectProgress >= 0.999;
    stationRoot.dataset.inspection = inspectionOpen ? "open" : "closed";
    setInspectControl(inspectionOpen);
    if (inspectionOpen) {
      setStatus(state.focusedStage
        ? `${stageDetails[state.focusedStage].title} focused · select it again or press Escape to assemble`
        : "Harness separated · select a module to focus");
    } else {
      state.inspectProgress = 0;
      state.inspectTarget = 0;
      setFocusedStage(null);
      setStatus("Harness assembled · choose Inspect, PASS, or BLOCK");
      const pendingScenario = state.pendingScenario;
      state.pendingScenario = null;
      if (pendingScenario) window.queueMicrotask(() => beginRun(pendingScenario));
    }
  };

  const moveInspection = (target, focusKey = null) => {
    if (!state.ready || state.running) return;
    state.inspectTarget = target;
    state.inspectMotion = {
      startedAt: window.performance.now(),
      from: state.inspectProgress,
      to: target,
      duration: motionIsReduced() ? 1 : 760,
    };
    stationRoot.dataset.inspection = target ? "opening" : "closing";
    setInspectControl(Boolean(target));
    if (target) {
      if (state.reviewReady || state.gateBlocked || state.humanDecision) resetRunVisuals();
      stationRoot.dataset.stationState = motionIsReduced() ? "reduced" : "ready";
      setFocusedStage(focusKey);
      setStatus(focusKey
        ? `${stageDetails[focusKey].title} separating from the harness`
        : "Separating seven named modules");
    } else {
      setFocusedStage(null);
      setStatus("Reassembling the harness");
    }
    if (motionIsReduced()) {
      updateInspectionMotion(window.performance.now() + 1000);
      requestRender();
    } else {
      requestRender();
    }
  };

  const toggleHarnessInspection = () => {
    const open = state.inspectTarget > 0 || state.inspectProgress > 0.05;
    moveInspection(open ? 0 : 1);
  };

  const focusInspectionStage = (key) => {
    if (!stageDetails[key] || !state.ready || state.running) return;
    if (state.focusedStage === key) {
      moveInspection(0);
      return;
    }
    if (state.inspectTarget < 1 && state.inspectProgress < 0.95) moveInspection(1, key);
    else setFocusedStage(key);
  };

  const updateInspectionMotion = (now) => {
    let active = false;
    if (state.inspectMotion) {
      const progress = clamp((now - state.inspectMotion.startedAt) / state.inspectMotion.duration, 0, 1);
      state.inspectProgress = mix(state.inspectMotion.from, state.inspectMotion.to, easeInOut(progress));
      active = progress < 1;
      if (progress >= 1) {
        state.inspectProgress = state.inspectMotion.to;
        state.inspectMotion = null;
        completeInspectionState();
      }
    }
    if (state.focusMotion) {
      const progress = clamp((now - state.focusMotion.startedAt) / state.focusMotion.duration, 0, 1);
      const eased = easeInOut(progress);
      state.focusProgress = mix(state.focusMotion.from, state.focusMotion.to, eased);
      state.focusPanX = mix(state.focusMotion.fromPanX, state.focusMotion.toPanX, eased);
      state.focusPanZ = mix(state.focusMotion.fromPanZ, state.focusMotion.toPanZ, eased);
      state.cameraZoom = mix(state.focusMotion.fromZoom, state.focusMotion.toZoom, eased);
      active = progress < 1 || active;
      if (progress >= 1) {
        state.focusProgress = state.focusMotion.to;
        state.focusPanX = state.focusMotion.toPanX;
        state.focusPanZ = state.focusMotion.toPanZ;
        state.cameraZoom = state.focusMotion.toZoom;
        state.focusMotion = null;
        if (!state.focusedStage && state.focusProgress < 0.001) state.focusAnchorStage = null;
      }
    }
    applyInspectionLayout();
    return active;
  };

  const updateTourControl = () => {
    if (!tourButton) return;
    const available = state.ready && !motionIsReduced();
    const label = tourButton.querySelector("span");
    const note = tourButton.querySelector("small");
    tourButton.disabled = !available || state.running;
    tourButton.setAttribute("aria-pressed", String(available && state.tourRequested));
    if (label) label.textContent = state.tourRequested ? "Pause auto tour" : "Resume auto tour";
    if (note) {
      note.textContent = motionIsReduced()
        ? "off for reduced motion"
        : (state.tourActive
          ? `${stageDetails[tourStages[state.tourStageIndex]].title} · ${state.tourStageIndex + 1} / ${tourStages.length}`
          : "Contract → Result loop");
    }
  };

  const clearTourResumeTimer = () => {
    if (!state.tourResumeTimer) return;
    window.clearTimeout(state.tourResumeTimer);
    state.tourResumeTimer = 0;
  };

  const scheduleTourResume = () => {
    clearTourResumeTimer();
    if (!state.tourRequested || motionIsReduced()) return;
    const delay = Math.max(0, state.tourPausedUntil - window.performance.now());
    state.tourResumeTimer = window.setTimeout(() => {
      state.tourResumeTimer = 0;
      requestRender();
    }, delay + 34);
  };

  const resetTourAmbient = () => {
    if (state.rig) state.rig.rotation.y = state.yaw;
    state.modules.forEach((wrapper) => {
      if (wrapper.userData.baseRotationY !== undefined && !state.humanMotion) {
        wrapper.rotation.y = wrapper.userData.baseRotationY;
      }
    });
    if (state.particle) state.particle.group.rotation.y = 0.42;
  };

  const pauseAutoTour = ({ duration = tourTiming.resumeDelay, reason = "interaction" } = {}) => {
    const now = window.performance.now();
    state.tourActive = false;
    state.tourStageStartedAt = 0;
    state.tourPausedUntil = Math.max(state.tourPausedUntil, now + duration);
    stationRoot.dataset.tourState = state.tourRequested ? "paused" : "off";
    if (state.tourOwnsFocus) {
      state.tourOwnsFocus = false;
      setFocusedStage(null, { duration: 780, source: "tour" });
    }
    resetTourAmbient();
    if (reason === "interaction" && state.ready && !state.running) {
      setStatus("Auto tour paused · it will resume after interaction");
    }
    updateTourControl();
    scheduleTourResume();
    requestRender();
  };

  const canRunAutoTour = (now) => state.ready
    && state.tourRequested
    && state.tourVisible
    && document.visibilityState === "visible"
    && !motionIsReduced()
    && now >= state.tourPausedUntil
    && !state.running
    && !state.dragging
    && !state.pendingScenario
    && !state.reviewReady
    && !state.gateBlocked
    && !state.humanDecision
    && state.inspectTarget < 0.02
    && state.inspectProgress < 0.02
    && !state.inspectMotion;

  const beginTourStage = (now) => {
    const key = tourStages[state.tourStageIndex];
    state.tourStageStartedAt = now;
    state.tourOwnsFocus = true;
    setFocusedStage(key, { duration: 900, source: "tour" });
    stationRoot.dataset.tourStage = key;
    setStatus(`Auto tour · ${stageDetails[key].title} · drag or select a control to take over`);
    updateTourControl();
  };

  const updateAutoTour = (now) => {
    if (!canRunAutoTour(now)) {
      if (state.tourActive) {
        state.tourActive = false;
        state.tourStageStartedAt = 0;
        stationRoot.dataset.tourState = state.tourRequested ? "paused" : "off";
        updateTourControl();
      }
      return false;
    }

    if (!state.tourActive) {
      state.tourActive = true;
      stationRoot.dataset.tourState = "playing";
      beginTourStage(now);
      return true;
    }

    const elapsed = now - state.tourStageStartedAt;
    if (elapsed >= tourTiming.releaseAt && state.tourOwnsFocus) {
      state.tourOwnsFocus = false;
      setFocusedStage(null, { duration: 900, source: "tour" });
      setStatus(`Auto tour · returning to overview before ${stageDetails[tourStages[(state.tourStageIndex + 1) % tourStages.length]].title}`);
    }
    if (elapsed >= tourTiming.stageDuration) {
      state.tourStageIndex = (state.tourStageIndex + 1) % tourStages.length;
      beginTourStage(now);
    }
    return true;
  };

  const updateTourAmbient = (now) => {
    if (!state.tourActive || !canRunAutoTour(now)) return false;
    if (state.rig) state.rig.rotation.y = state.yaw + Math.sin(now * 0.00034) * 0.018;
    const focusedModule = state.modules.get(focusModuleByStage[state.focusedStage]);
    if (focusedModule?.userData.baseRotationY !== undefined) {
      focusedModule.rotation.y = focusedModule.userData.baseRotationY + Math.sin(now * 0.0011) * 0.026;
    }
    if (state.particle) state.particle.group.rotation.y = 0.42 + Math.sin(now * 0.00042) * 0.035;
    return true;
  };

  const updateReachedStages = (keys) => {
    state.reachedStages = new Set(keys);
    stageMarkers.forEach((marker, key) => marker.classList.toggle("is-reached", state.reachedStages.has(key)));
  };

  const resetRunVisuals = () => {
    state.running = false;
    state.reviewReady = false;
    state.humanActive = false;
    state.humanDecision = null;
    state.gateCount = 0;
    state.gateBlocked = false;
    state.humanMotion = null;
    state.resultMotion = null;
    stationRoot.dataset.reviewState = "locked";
    resultCard?.setAttribute("aria-hidden", "true");
    setLeverState("locked");
    state.modules.forEach((wrapper) => {
      const base = wrapper.userData.basePosition;
      if (base) wrapper.position.copy(base);
      wrapper.rotation.set(0, wrapper.userData.baseRotationY || 0, 0);
    });
    if (state.resultArtifact) {
      state.resultArtifact.visible = false;
      state.resultArtifact.position.copy(state.resultArtifact.userData.home);
      state.resultArtifact.scale.setScalar(0.01);
    }
    setRouteProgress(0);
    setIndicators(false, 0);
    updateReachedStages([]);
    updateExecution("contract", 0);
    if (executionResult) executionResult.textContent = "Not produced";
    if (resultStatus) resultStatus.textContent = "Result";
    if (resultTitle) resultTitle.textContent = "No result yet";
    if (resultRoute) resultRoute.textContent = "Not run";
    if (resultChecks) resultChecks.textContent = "0 / 6 resolved";
    if (resultAuthority) resultAuthority.textContent = "No human decision";
  };

  const setResultCopy = ({ statusLabel, title, route, checks, authority }) => {
    if (resultStatus) resultStatus.textContent = statusLabel;
    if (resultTitle) resultTitle.textContent = title;
    if (resultRoute) resultRoute.textContent = route;
    if (resultChecks) resultChecks.textContent = checks;
    if (resultAuthority) resultAuthority.textContent = authority;
    if (executionResult) executionResult.textContent = title;
  };

  const finishAutomatedRoute = (blocked = false) => {
    state.running = false;
    state.gateBlocked = blocked;
    state.reviewReady = !blocked;
    state.gateCount = blocked ? 3 : 6;
    stationRoot.dataset.stationState = motionIsReduced() ? "reduced" : (blocked ? "blocked" : "complete");
    stationRoot.dataset.reviewState = blocked ? "blocked" : "waiting";
    setRouteProgress(blocked ? 0.72 : 1);
    setIndicators(true, state.gateCount, blocked ? 2 : -1);
    updateReachedStages(["contract", "agent", "tool", "gate", "trace", ...(blocked ? ["result"] : [])]);
    updateExecution("trace", state.gateCount);
    setLeverState(blocked ? "locked" : "ready");
    selectStage(blocked ? "result" : "trace", { pause: false });
    runButtons.forEach((button) => {
      button.disabled = false;
      const scenario = button.dataset.stationScenario || "pass";
      button.querySelector("span").textContent = `Run ${scenario.toUpperCase()} again`;
    });
    resultCard?.setAttribute("aria-hidden", blocked ? "false" : "true");
    if (blocked) {
      setResultCopy({
        statusLabel: "BLOCKED",
        title: "Residue mapping is missing",
        route: "Stopped at G3 · residue_map",
        checks: "G1–G2 passed · G3 blocked",
        authority: "Release unavailable · revise input",
      });
      setStatus("G3 Residue mapping blocked · DecisionTrace + RunReceipt written");
    } else {
      setResultCopy({
        statusLabel: "ACCEPTED ROUTE",
        title: "Six gates passed",
        route: "Registered source route accepted",
        checks: "6 / 6 passed",
        authority: "Awaiting release, revision, or rejection",
      });
      setStatus("Six gates passed · choose a human scope decision");
    }
    updateTourControl();
    requestRender();
  };

  const beginRun = (scenario = "pass") => {
    if (!state.ready || state.running) return;
    state.tourRequested = false;
    pauseAutoTour({ duration: 0, reason: "workflow" });
    resetRunVisuals();
    state.scenario = scenario === "block" ? "block" : "pass";
    runButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.stationScenario === state.scenario)));
    if (motionIsReduced()) {
      finishAutomatedRoute(state.scenario === "block");
      return;
    }
    state.running = true;
    state.runStartedAt = window.performance.now();
    state.currentStage = "contract";
    stationRoot.dataset.stationState = "running";
    runButtons.forEach((button) => {
      button.disabled = true;
      if (button.dataset.stationScenario === state.scenario) button.querySelector("span").textContent = "Scenario running";
    });
    setStatus(`${state.scenario.toUpperCase()} example · TaskPacket seated`);
    updateTourControl();
    updateExecution("contract", 0);
    selectStage("contract", { pause: false });
    requestRender();
  };

  const startRun = (scenario = "pass") => {
    if (!state.ready || state.running) return;
    if (state.inspectTarget > 0 || state.inspectProgress > 0.02 || state.inspectMotion) {
      state.pendingScenario = scenario;
      runButtons.forEach((button) => { button.disabled = true; });
      moveInspection(0);
      return;
    }
    beginRun(scenario);
  };

  const updateRun = (now) => {
    if (!state.running) return false;
    const progress = clamp((now - state.runStartedAt) / state.runDuration, 0, 1);
    const input = state.modules.get("input");
    const locator = state.modules.get("locator");
    const tools = state.modules.get("tools");
    const output = state.modules.get("output");
    const inputMove = easeInOut(segmented(progress, 0.02, 0.13));
    const agentPulse = Math.sin(Math.PI * segmented(progress, 0.14, 0.3));
    const locatorMove = easeInOut(segmented(progress, 0.14, 0.34));
    const toolPulse = Math.sin(Math.PI * segmented(progress, 0.3, 0.43));
    const toolActive = progress >= 0.32;
    const blockedScenario = state.scenario === "block";
    const verdictAt = blockedScenario ? 0.63 : 0.78;
    const gateProgress = segmented(progress, 0.43, verdictAt);
    const gateCount = blockedScenario
      ? clamp(Math.floor(gateProgress * 3.999), 0, 3)
      : clamp(Math.floor(gateProgress * 6.999), 0, 6);
    const blockedNow = blockedScenario && progress >= verdictAt;
    const traceProgress = easeInOut(segmented(progress, verdictAt, 0.96)) * (blockedScenario ? 0.72 : 1);
    const outputMove = easeInOut(segmented(progress, verdictAt, 0.94));

    if (input?.userData.basePosition) input.position.x = input.userData.basePosition.x + inputMove * 0.07;
    if (locator?.userData.basePosition) {
      locator.position.x = locator.userData.basePosition.x + locatorMove * (state.isMobile ? 0.2 : 0.38);
      locator.position.y = locator.userData.basePosition.y + agentPulse * 0.05;
    }
    if (tools?.userData.basePosition) {
      tools.position.y = tools.userData.basePosition.y + toolPulse * 0.025;
    }
    if (output?.userData.basePosition) output.position.y = output.userData.basePosition.y + outputMove * 0.055;
    setRouteProgress(traceProgress);
    state.gateCount = gateCount;
    state.gateBlocked = blockedNow;
    setIndicators(toolActive, gateCount, blockedNow ? 2 : -1);

    let stage = "contract";
    let reached = ["contract"];
    if (progress >= 0.14) {
      stage = "agent";
      reached = ["contract", "agent"];
    }
    if (progress >= 0.32) {
      stage = "tool";
      reached = ["contract", "agent", "tool"];
    }
    if (progress >= 0.43) {
      stage = "gate";
      reached = ["contract", "agent", "tool", "gate"];
    }
    if (progress >= verdictAt) {
      stage = "trace";
      reached = ["contract", "agent", "tool", "gate", "trace"];
    }
    if (stage !== state.currentStage) {
      state.currentStage = stage;
      selectStage(stage, { pause: false });
      const messages = {
        agent: "Locator Agent proposed one bounded source route",
        tool: "Registered tool port 02 selected",
        gate: blockedScenario ? "G1–G3 resolving · residue_map is required" : "G1–G6 resolving in order",
        trace: blockedScenario ? "G3 blocked · writing DecisionTrace + RunReceipt" : "Six gates passed · writing DecisionTrace + RunReceipt",
      };
      setStatus(messages[stage]);
    }
    updateExecution(stage, gateCount);
    updateReachedStages(reached);

    if (progress >= 1) {
      finishAutomatedRoute(blockedScenario);
      return false;
    }
    return true;
  };

  const updateHumanMotion = (now) => {
    const motion = state.humanMotion;
    const wrapper = state.modules.get("human");
    if (!motion || !wrapper) return false;
    const progress = clamp((now - motion.startedAt) / 760, 0, 1);
    const eased = easeInOut(progress);
    wrapper.rotation.y = mix(motion.from, motion.to, eased);
    if (progress >= 1) {
      state.humanMotion = null;
      return false;
    }
    return true;
  };

  const updateResultMotion = (now) => {
    const motion = state.resultMotion;
    const artifact = state.resultArtifact;
    if (!motion || !artifact) return false;
    const progress = clamp((now - motion.startedAt) / 1100, 0, 1);
    const eased = easeInOut(progress);
    artifact.position.lerpVectors(artifact.userData.home, artifact.userData.released, eased);
    artifact.scale.setScalar(mix(0.01, artifact.userData.targetScale, eased));
    artifact.rotation.z = mix(0.12, -0.025, eased);
    const output = state.modules.get("output");
    if (output?.userData.basePosition) {
      output.position.y = output.userData.basePosition.y + mix(0.055, 0.11, eased);
    }
    if (progress >= 1) {
      state.resultMotion = null;
      return false;
    }
    return true;
  };

  const recordHumanDecision = (decision = "release") => {
    if (!state.ready || !state.reviewReady || state.humanDecision) return;
    state.humanDecision = decision;
    state.humanActive = decision === "release";
    stationRoot.dataset.reviewState = "acknowledged";
    setLeverState(decision === "release" ? "pulled" : "decided");
    resultCard?.setAttribute("aria-hidden", "false");
    const wrapper = state.modules.get("human");
    if (wrapper && decision === "release") {
      state.humanMotion = {
        startedAt: window.performance.now(),
        from: wrapper.rotation.y,
        to: (wrapper.userData.baseRotationY || 0) - 0.11,
      };
    }
    if (state.resultArtifact && decision === "release") {
      state.resultArtifact.visible = true;
      state.resultMotion = { startedAt: window.performance.now() };
    }
    const outcomes = {
      release: {
        statusLabel: "RELEASED",
        title: "Reviewed artifact released",
        authority: "Human acknowledged scope",
      },
      revise: {
        statusLabel: "NEEDS INPUT",
        title: "Revision requested",
        authority: "Human returned the route",
      },
      reject: {
        statusLabel: "REJECTED",
        title: "Route rejected",
        authority: "Human declined release",
      },
    };
    const outcome = outcomes[decision] || outcomes.release;
    setResultCopy({
      statusLabel: outcome.statusLabel,
      title: outcome.title,
      route: "Registered source route + receipt",
      checks: "6 / 6 passed",
      authority: outcome.authority,
    });
    updateReachedStages([...state.reachedStages, "human", "result"]);
    updateExecution("human", 6);
    setStatus(`${outcome.title} · decision recorded in RunReceipt`);
    selectStage("result", { pause: false });
    if (motionIsReduced()) {
      updateHumanMotion(window.performance.now() + 760);
      updateResultMotion(window.performance.now() + 1100);
    }
    requestRender();
  };

  const updateRevealItems = (now) => {
    if (!state.revealItems.length) return false;
    state.revealItems = state.revealItems.filter((item) => {
      const progress = clamp((now - item.startedAt) / 760, 0, 1);
      const eased = easeInOut(progress);
      const base = item.wrapper.userData.basePosition;
      item.wrapper.position.y = base.y - (1 - eased) * 0.08;
      setOpacity(item.wrapper, eased);
      if (progress >= 1) {
        item.wrapper.position.y = base.y;
        finalizeOpacity(item.wrapper);
        return false;
      }
      return true;
    });
    return state.revealItems.length > 0;
  };

  const renderFrame = (now) => {
    state.frame = 0;
    let active = false;
    active = updateRevealItems(now) || active;
    active = updateRun(now) || active;
    active = updateAutoTour(now) || active;
    active = updateHumanMotion(now) || active;
    active = updateResultMotion(now) || active;
    active = updateInspectionMotion(now) || active;
    active = updateTourAmbient(now) || active;
    if (state.particle && !motionIsReduced()) active = updateParticleField(false) || active;
    state.renderer.render(state.scene, state.camera);
    updateMarkers();
    if (active) requestRender();
  };

  const resize = () => {
    if (!state.renderer || !viewport) return;
    const bounds = viewport.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    const nextMobile = width < 740;
    const layoutChanged = nextMobile !== state.isMobile;
    state.isMobile = nextMobile;
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, nextMobile ? 1.15 : 1.4));
    state.renderer.setSize(width, height, false);
    const aspect = width / height;
    const frustumHeight = nextMobile ? 3.8 : 3.2;
    state.camera.left = -frustumHeight * aspect / 2;
    state.camera.right = frustumHeight * aspect / 2;
    state.camera.top = frustumHeight / 2;
    state.camera.bottom = -frustumHeight / 2;
    state.rig.position.y = nextMobile ? 0.04 : -0.27;
    state.camera.lookAt(0, nextMobile ? 0.08 : 0.42, 0.18);
    state.camera.updateProjectionMatrix();
    if (layoutChanged || !state.route) applyLayout();
    else applyInspectionLayout();
    requestRender();
  };

  const updateParticlePointer = (event) => {
    if (!state.particle || motionIsReduced() || !finePointer.matches || state.dragging) return;
    const bounds = viewport.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      (event.clientX - bounds.left) / bounds.width * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, state.camera);
    const specimenWorld = state.particle.group.getWorldPosition(new THREE.Vector3());
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      state.camera.getWorldDirection(new THREE.Vector3()),
      specimenWorld,
    );
    const hit = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    if (!hit) return;
    state.particle.group.worldToLocal(hit);
    state.particle.pointer.copy(hit);
    state.particle.pointerActive = true;
    requestRender();
  };

  const setYaw = (value) => {
    state.yaw = clamp(value, THREE.MathUtils.degToRad(-12), THREE.MathUtils.degToRad(12));
    if (state.rig) state.rig.rotation.y = state.yaw;
    requestRender();
  };

  const focusModuleAtPointer = (event) => {
    if (!state.ready || state.running || !state.camera) return;
    const bounds = viewport.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      (event.clientX - bounds.left) / bounds.width * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, state.camera);
    const intersections = raycaster.intersectObjects(Array.from(state.modules.values()), true);
    for (const intersection of intersections) {
      let object = intersection.object;
      while (object && object !== state.rig) {
        if (object.userData?.moduleKey) {
          const stageKey = stageByModule[object.userData.moduleKey];
          if (stageKey) focusInspectionStage(stageKey);
          return;
        }
        object = object.parent;
      }
    }
  };

  const bindInteractions = () => {
    stageMarkers.forEach((marker, key) => {
      marker.querySelector("button")?.addEventListener("click", () => {
        pauseAutoTour();
        if (state.running) selectStage(key, { pause: true });
        else focusInspectionStage(key);
      });
    });
    runButtons.forEach((button) => {
      button.addEventListener("click", () => {
        pauseAutoTour();
        startRun(button.dataset.stationScenario || "pass");
      });
    });
    inspectButton?.addEventListener("click", () => {
      pauseAutoTour();
      toggleHarnessInspection();
    });
    tourButton?.addEventListener("click", () => {
      if (state.tourRequested) {
        state.tourRequested = false;
        pauseAutoTour({ duration: 0, reason: "toggle" });
        setStatus("Auto tour paused · manual controls remain available");
        return;
      }

      state.tourRequested = true;
      if (state.reviewReady || state.gateBlocked || state.humanDecision) resetRunVisuals();
      const inspectionOpen = state.inspectTarget > 0 || state.inspectProgress > 0.02 || state.inspectMotion;
      state.tourPausedUntil = window.performance.now() + (inspectionOpen ? 900 : 0);
      if (inspectionOpen) moveInspection(0);
      stationRoot.dataset.tourState = "paused";
      updateTourControl();
      scheduleTourResume();
      setStatus(inspectionOpen ? "Reassembling before auto tour" : "Auto tour resuming");
      requestRender();
    });
    humanButton?.addEventListener("click", (event) => {
      pauseAutoTour();
      if (event.detail > 0 && state.leverMoved) {
        event.preventDefault();
        state.leverMoved = false;
        return;
      }
      recordHumanDecision("release");
    });
    humanDecisionButtons
      .filter((button) => button !== humanButton)
      .forEach((button) => {
        button.addEventListener("click", () => {
          pauseAutoTour();
          recordHumanDecision(button.dataset.humanDecision);
        });
      });
    humanButton?.addEventListener("pointerdown", (event) => {
      if (!state.reviewReady || state.humanActive || humanButton.disabled) return;
      event.preventDefault();
      event.stopPropagation();
      state.leverPointerId = event.pointerId;
      state.leverStartY = event.clientY;
      state.leverPull = 0;
      state.leverMoved = false;
      setLeverState("dragging");
      authorityPanel?.style.setProperty("--lever-angle", "-25deg");
      humanButton.setPointerCapture?.(event.pointerId);
    });
    humanButton?.addEventListener("pointermove", (event) => {
      if (event.pointerId !== state.leverPointerId) return;
      event.preventDefault();
      event.stopPropagation();
      const delta = event.clientY - state.leverStartY;
      state.leverMoved = state.leverMoved || Math.abs(delta) > 4;
      state.leverPull = clamp(delta / 72, 0, 1);
      authorityPanel?.style.setProperty("--lever-angle", `${mix(-25, 25, state.leverPull)}deg`);
    });
    const finishLeverPull = (event, cancelled = false) => {
      if (event.pointerId !== state.leverPointerId) return;
      event.preventDefault();
      event.stopPropagation();
      humanButton.releasePointerCapture?.(event.pointerId);
      state.leverPointerId = null;
      const shouldRelease = !cancelled && (state.leverPull >= 0.58 || !state.leverMoved);
      if (shouldRelease) recordHumanDecision("release");
      else setLeverState("ready");
    };
    humanButton?.addEventListener("pointerup", (event) => finishLeverPull(event));
    humanButton?.addEventListener("pointercancel", (event) => finishLeverPull(event, true));

    viewport?.addEventListener("pointerdown", (event) => {
      if (!state.ready || event.target.closest("button, [data-station-lever]")) return;
      pauseAutoTour();
      state.dragging = true;
      state.pointerId = event.pointerId;
      state.pointerX = event.clientX;
      state.pointerMoved = false;
      stationRoot.classList.add("is-dragging");
      viewport.setPointerCapture?.(event.pointerId);
      if (state.particle) state.particle.pointerActive = false;
    });
    viewport?.addEventListener("pointermove", (event) => {
      if (state.dragging && event.pointerId === state.pointerId) {
        const delta = event.clientX - state.pointerX;
        state.pointerX = event.clientX;
        state.pointerMoved = state.pointerMoved || Math.abs(delta) > 2;
        setYaw(state.yaw + delta * 0.0026);
      }
    });
    const endDrag = (event) => {
      if (state.dragging && (event.pointerId === undefined || event.pointerId === state.pointerId)) {
        state.dragging = false;
        state.pointerId = null;
        stationRoot.classList.remove("is-dragging");
      }
    };
    viewport?.addEventListener("pointerup", (event) => {
      const shouldFocus = state.dragging && !state.pointerMoved && event.pointerId === state.pointerId;
      endDrag(event);
      if (shouldFocus) focusModuleAtPointer(event);
    });
    viewport?.addEventListener("pointercancel", endDrag);
    viewport?.addEventListener("pointerleave", (event) => {
      endDrag(event);
      if (state.particle) state.particle.pointerActive = false;
    });
    viewport?.addEventListener("keydown", (event) => {
      pauseAutoTour();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setYaw(state.yaw - THREE.MathUtils.degToRad(3));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setYaw(state.yaw + THREE.MathUtils.degToRad(3));
      } else if (event.key === "Escape" || event.key.toLowerCase() === "r") {
        event.preventDefault();
        setYaw(0);
        if (state.inspectTarget > 0 || state.inspectProgress > 0.02 || state.focusedStage) moveInspection(0);
        else setStatus("View reset · route state preserved");
      }
    });
  };

  const createScene = () => {
    state.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    state.renderer.outputColorSpace = THREE.SRGBColorSpace;
    state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    state.renderer.toneMappingExposure = 1.08;

    state.scene = new THREE.Scene();
    state.camera = new THREE.OrthographicCamera(-3, 3, 1.6, -1.6, 0.01, 100);
    state.camera.position.set(5.2, 4.15, 6.35);
    state.camera.lookAt(0, 0.42, 0.18);
    state.rig = new THREE.Group();
    state.rig.name = "heroic-alpha-station";
    state.rig.position.y = -0.27;
    state.scene.add(state.rig);
    createBench();

    state.scene.add(new THREE.HemisphereLight(0xf6ead3, 0x0c0d0b, 2.8));
    const keyLight = new THREE.DirectionalLight(0xffefd0, 4.1);
    keyLight.position.set(3.8, 5.5, 4.6);
    state.scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xb5ac96, 1.8);
    rimLight.position.set(-4.5, 2.6, -3.2);
    state.scene.add(rimLight);
    const brassLight = new THREE.PointLight(0xd8b56f, 1.1, 4.5, 2);
    brassLight.position.set(0.35, 1.25, 1.3);
    state.scene.add(brassLight);

    state.loader = new GLTFLoader();
    state.loader.setMeshoptDecoder(MeshoptDecoder);
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      setFallback("Static station · WebGL context unavailable");
    }, { once: true });

    resize();
  };

  const loadModule = async (config) => {
    const gltf = await state.loader.loadAsync(modelURL(config.filename));
    normalizeModel(gltf.scene, config);
    state.loaded += 1;
    updateLoadProgress();
  };

  const loadSpecimen = async () => {
    const gltf = await state.loader.loadAsync(modelURL("hero-protein-ligand-specimen-v1.glb"));
    createParticleSpecimen(gltf.scene);
    state.loaded += 1;
    updateLoadProgress();
  };

  const loadStation = async () => {
    if (state.loadingStarted) return;
    state.loadingStarted = true;
    if (forcedFallback || saveData) {
      setFallback(forcedFallback ? "Static station · forced fallback check" : "Static station · data saver enabled");
      return;
    }

    try {
      createScene();
      await MeshoptDecoder.ready;
      const chassisConfig = moduleConfigs.find((config) => config.key === "chassis");
      await Promise.all([loadModule(chassisConfig), loadSpecimen()]);
      stationRoot.dataset.stationState = "core-ready";
      setStatus("Central harness ready · loading six bounded modules");
      requestRender();

      for (const config of moduleConfigs) {
        if (config.key === "chassis") continue;
        await loadModule(config);
        setStatus(`Loading station · ${state.loaded} of 8 models verified`);
      }

      state.ready = true;
      applyLayout();
      stationRoot.dataset.stationState = motionIsReduced() ? "reduced" : "ready";
      [...runButtons, inspectButton, tourButton].forEach((button) => {
        if (button) button.disabled = false;
      });
      setLeverState("locked");
      updateExecution("contract", 0);
      setStatus(motionIsReduced()
        ? "Station assembled · reduced motion"
        : "Station assembled · auto tour starting");
      selectStage("contract", { pause: false });
      updateTourControl();
      if (motionIsReduced()) applyMotionPreference();
      else {
        state.tourPausedUntil = window.performance.now() + 1200;
        scheduleTourResume();
        requestRender();
      }

    } catch (error) {
      console.error("Heroic Alpha Station could not be assembled.", error);
      setFallback("Static station · one or more 3D modules failed validation");
    }
  };

  const applyMotionPreference = () => {
    if (!state.renderer || !state.ready) return;
    if (motionIsReduced()) {
      clearTourResumeTimer();
      state.tourActive = false;
      state.tourStageStartedAt = 0;
      stationRoot.dataset.tourState = "off";
      if (state.tourOwnsFocus) {
        state.tourOwnsFocus = false;
        setFocusedStage(null, { duration: 1, source: "tour" });
        updateInspectionMotion(window.performance.now() + 2);
      }
      resetTourAmbient();
      state.running = false;
      state.revealItems = [];
      if (state.inspectTarget > 0 || state.inspectProgress > 0.02) {
        state.inspectProgress = 1;
        state.inspectTarget = 1;
        state.inspectMotion = null;
        state.focusProgress = state.focusedStage ? 1 : 0;
        state.focusTarget = state.focusProgress;
        state.focusMotion = null;
        stationRoot.dataset.stationState = "reduced";
        stationRoot.dataset.inspection = "open";
        setInspectControl(true);
        applyInspectionLayout();
        updateParticleField(true);
        setStatus("Harness separated · reduced-motion inspection");
        requestRender();
        return;
      }
      state.modules.forEach((wrapper) => {
        const base = wrapper.userData.basePosition;
        if (base) wrapper.position.copy(base);
        finalizeOpacity(wrapper);
      });
      updateParticleField(true);
      if (state.humanDecision) {
        stationRoot.dataset.stationState = "reduced";
        setRouteProgress(state.gateBlocked ? 0.72 : 1);
        setIndicators(true, state.gateCount, state.gateBlocked ? 2 : -1);
        updateReachedStages(["contract", "agent", "tool", "gate", "trace", "human", "result"]);
        updateExecution("human", 6);
        setLeverState("pulled");
        updateHumanMotion(window.performance.now() + 760);
        updateResultMotion(window.performance.now() + 1100);
      } else if (state.gateBlocked) {
        finishAutomatedRoute(true);
      } else if (state.reviewReady) {
        finishAutomatedRoute(false);
      } else {
        resetRunVisuals();
        stationRoot.dataset.stationState = "reduced";
        setStatus("Station assembled · choose PASS or BLOCK example");
      }
    } else {
      stationRoot.dataset.stationState = state.reviewReady ? "complete" : "ready";
      if (state.inspectTarget > 0 || state.inspectProgress > 0.02) {
        setStatus(state.focusedStage
          ? `${stageDetails[state.focusedStage].title} focused`
          : "Harness separated · select a module to focus");
      } else if (state.humanDecision) {
        setStatus(`Human ${state.humanDecision} decision recorded`);
      } else if (state.reviewReady) {
        setStatus("Six gates passed · choose a human scope decision");
        setLeverState("ready");
      } else {
        state.tourPausedUntil = window.performance.now() + 600;
        scheduleTourResume();
        setStatus("Station assembled · auto tour resuming");
      }
    }
    updateTourControl();
    requestRender();
  };

  bindInteractions();
  selectStage("contract", { pause: false });
  updateExecution("contract", 0);
  updateLoadProgress();

  if ("IntersectionObserver" in window) {
    state.visibilityObserver = new IntersectionObserver((entries) => {
      const entry = entries.find((item) => item.target === stationRoot);
      if (!entry) return;
      state.tourVisible = entry.isIntersecting;
      if (state.tourVisible) {
        requestRender();
      } else if (state.tourActive) {
        state.tourActive = false;
        state.tourStageStartedAt = 0;
        stationRoot.dataset.tourState = "paused";
        updateTourControl();
      }
    }, { threshold: 0.06 });
    state.visibilityObserver.observe(stationRoot);
  } else {
    state.tourVisible = true;
  }

  if (forcedFallback || saveData) {
    loadStation();
  } else if ("IntersectionObserver" in window) {
    state.observer = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        state.observer = null;
        loadStation();
      }
    }, { rootMargin: "220px 0px", threshold: 0.04 });
    state.observer.observe(stationRoot);
  } else {
    loadStation();
  }

  if ("ResizeObserver" in window && viewport) {
    state.resizeObserver = new ResizeObserver(resize);
    state.resizeObserver.observe(viewport);
  } else {
    window.addEventListener("resize", resize, { passive: true });
  }

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", applyMotionPreference);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(applyMotionPreference);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") requestRender();
    else {
      state.tourActive = false;
      state.tourStageStartedAt = 0;
    }
  });
}

import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "images", "project-stages");

const colors = {
  carbon: "#171613",
  carbon2: "#25231d",
  carbon3: "#333027",
  paper: "#f2ead9",
  paper2: "#ded2ba",
  ink: "#171510",
  muted: "#6d6658",
  rule: "#8d816b",
  white: "#fffaf0",
  pass: "#a6ad8f",
  stop: "#9d8972",
};

const projects = {
  evidenceops: { name: "EVIDENCEOPS", accent: "#c9a85b", code: "EVIDENCE ROUTE" },
  careplan: { name: "CAREPLAN", accent: "#9daa84", code: "CONTROLLED DRAFT" },
  dynamics: { name: "DYNAMICS ATLAS", accent: "#86a09b", code: "COMPATIBILITY ROUTE" },
  hsp90: { name: "HSP90 / LiGaMD", accent: "#bd9562", code: "SYSTEM-LEVEL EVALUATION" },
};

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const text = (x, y, value, cls = "body", anchor = "start") =>
  `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;

const rect = (x, y, width, height, options = {}) => {
  const { fill = colors.paper, stroke = "none", radius = 14, cls = "" } = options;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" class="${cls}"/>`;
};

const line = (x1, y1, x2, y2, options = {}) => {
  const { stroke = colors.rule, width = 2, cls = "", dash = "" } = options;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ""} class="${cls}"/>`;
};

const arrow = (x1, y1, x2, y2, project, options = {}) => {
  const { label = "", dashed = false, bend = 0 } = options;
  const middleX = (x1 + x2) / 2;
  const pathData = bend
    ? `M ${x1} ${y1} C ${middleX} ${y1 + bend}, ${middleX} ${y2 + bend}, ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;
  return [
    `<path d="${pathData}" fill="none" stroke="${project.accent}" stroke-width="4"${dashed ? ' stroke-dasharray="12 10"' : ""} marker-end="url(#arrow)" class="flow-line"/>`,
    label ? text(middleX, Math.min(y1, y2) - 14, label, "flow-label", "middle") : "",
  ].join("");
};

const pill = (x, y, label, project, tone = "accent", width = Math.max(110, label.length * 12 + 28)) => {
  const fill = tone === "dark" ? colors.carbon2 : tone === "paper" ? colors.paper2 : project.accent;
  const ink = tone === "dark" ? colors.white : colors.ink;
  return `${rect(x, y, width, 38, { fill, radius: 19 })}${text(x + width / 2, y + 25, label, tone === "dark" ? "pill-light" : "pill-dark", "middle")}`;
};

const card = (x, y, width, height, kicker, title, rows = [], options = {}) => {
  const { tone = "paper", project, active = false, mono = false } = options;
  const fill = tone === "dark" ? colors.carbon2 : tone === "muted" ? colors.paper2 : colors.paper;
  const inkClass = tone === "dark" ? "card-light" : "card-dark";
  const stroke = active && project ? project.accent : tone === "dark" ? colors.rule : "#b8aa8e";
  const body = rows.map((row, index) => text(x + 24, y + 104 + index * 29, row, `${inkClass} ${mono ? "mono" : ""}`)).join("");
  return [
    rect(x, y, width, height, { fill, stroke, radius: 14, cls: active ? "active-card" : "" }),
    text(x + 24, y + 32, kicker.toUpperCase(), tone === "dark" ? "kicker-light" : "kicker-dark"),
    text(x + 24, y + 72, title, tone === "dark" ? "card-title-light" : "card-title-dark"),
    body,
  ].join("");
};

const checkRow = (x, y, width, label, value, project, state = "pass") => {
  const activeColor = state === "pass" ? project.accent : colors.stop;
  const icon = state === "pass" ? "✓" : "×";
  return [
    rect(x, y, width, 54, { fill: colors.paper, stroke: "#b8aa8e", radius: 9 }),
    `<circle cx="${x + 27}" cy="${y + 27}" r="13" fill="${activeColor}"/>`,
    text(x + 27, y + 34, icon, "check-icon", "middle"),
    text(x + 52, y + 23, label, "row-label"),
    text(x + 52, y + 43, value, "row-value"),
  ].join("");
};

const documentCard = (x, y, width, height, project, options = {}) => {
  const { highlight = 2, label = "VERSIONED PASSAGE", version = "v3" } = options;
  const lines = Array.from({ length: 7 }, (_, index) => {
    const yPos = y + 92 + index * 31;
    const isHighlight = index === highlight;
    return `${rect(x + 30, yPos - 18, width - 60 - (index % 3) * 52, 22, { fill: isHighlight ? project.accent : "#cbc0a9", radius: 3 })}`;
  }).join("");
  return [
    rect(x, y, width, height, { fill: colors.paper, stroke: project.accent, radius: 16 }),
    text(x + 30, y + 38, label, "kicker-dark"),
    pill(x + width - 92, y + 19, version, project, "dark", 62),
    lines,
  ].join("");
};

const frame = (project, stage, title, subtitle, body, takeaway) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img" aria-labelledby="title desc">
  <title id="title">${esc(project.name)} stage ${String(stage).padStart(2, "0")}: ${esc(title)}</title>
  <desc id="desc">${esc(subtitle)} ${esc(takeaway)}</desc>
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".055" stroke-width="1"/>
    </pattern>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M0 0 L12 6 L0 12 Z" fill="${project.accent}"/>
    </marker>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="9" stdDeviation="11" flood-color="#000000" flood-opacity=".16"/>
    </filter>
  </defs>
  <style>
    text{font-family:Arial,Helvetica,sans-serif}
    .scene-title{font-size:38px;font-weight:760;fill:${colors.white};letter-spacing:-1px}
    .scene-subtitle{font-size:19px;font-weight:500;fill:#c9c1b0}
    .scene-kicker,.kicker-light,.kicker-dark,.flow-label,.pill-light,.pill-dark,.row-label{font-size:16px;font-weight:700;letter-spacing:1.4px}
    .scene-kicker,.kicker-light{fill:${project.accent}}.kicker-dark{fill:${colors.muted}}
    .scene-index{font:700 18px 'Courier New',monospace;fill:${project.accent}}
    .card-title-dark{font-size:27px;font-weight:760;fill:${colors.ink}}.card-title-light{font-size:27px;font-weight:760;fill:${colors.white}}
    .card-dark{font-size:18px;font-weight:520;fill:${colors.ink}}.card-light{font-size:18px;font-weight:520;fill:#d8d0c0}
    .body{font-size:20px;font-weight:540;fill:${colors.ink}}.body-light{font-size:20px;font-weight:540;fill:${colors.white}}
    .small{font-size:16px;font-weight:520;fill:${colors.muted}}.small-light{font-size:16px;font-weight:520;fill:#c9c1b0}
    .big{font-size:34px;font-weight:780;fill:${colors.ink}}.big-light{font-size:34px;font-weight:780;fill:${colors.white}}
    .mono{font-family:'Courier New',monospace}.pill-dark{fill:${colors.ink}}.pill-light{fill:${colors.white}}
    .flow-label{fill:${project.accent}}.check-icon{font-size:18px;font-weight:900;fill:${colors.ink}}
    .row-label{fill:${colors.muted}}.row-value{font-size:17px;font-weight:650;fill:${colors.ink}}
    .takeaway-label{font-size:14px;font-weight:800;letter-spacing:1.8px;fill:${project.accent}}
    .takeaway{font-size:21px;font-weight:650;fill:${colors.white}}
    .active-card{filter:url(#shadow)}
    .flow-line{stroke-dasharray:16 10;animation:route 2.6s linear infinite}
    .pulse{transform-box:fill-box;transform-origin:center;animation:pulse 1.8s ease-in-out infinite}
    .scan{animation:scan 2.4s ease-in-out infinite}
    @keyframes route{to{stroke-dashoffset:-52}}
    @keyframes pulse{50%{transform:scale(1.08);opacity:.76}}
    @keyframes scan{50%{opacity:.42}}
    @media (prefers-reduced-motion:reduce){.flow-line,.pulse,.scan{animation:none}}
  </style>
  <rect width="1280" height="720" fill="${colors.carbon}"/>
  <rect y="108" width="1280" height="530" fill="url(#grid)"/>
  <rect x="0" y="0" width="11" height="720" fill="${project.accent}"/>
  ${text(54, 36, `${project.code} / ${String(stage).padStart(2, "0")}`, "scene-kicker")}
  ${text(54, 79, title, "scene-title")}
  ${text(1228, 39, `${String(stage).padStart(2, "0")} / 06`, "scene-index", "end")}
  ${text(1228, 75, subtitle, "scene-subtitle", "end")}
  ${body}
  ${line(0, 638, 1280, 638, { stroke: project.accent, width: 2 })}
  ${text(54, 671, "WHAT CHANGED", "takeaway-label")}
  ${text(224, 674, takeaway, "takeaway")}
</svg>`;

const evidenceBodies = [
  (p) => [
    documentCard(78, 148, 558, 438, p, { highlight: 3, label: "SCIENTIFIC PASSAGE", version: "source v3" }),
    card(720, 168, 470, 190, "Attached context", "Conditions stay with the text", ["Assay: SPR", "Temperature: 25°C", "Reported value: 15 nM"], { project: p, active: true }),
    card(720, 390, 470, 164, "Evidence object", "One versioned input", ["source hash · span offsets · context"], { project: p, tone: "dark" }),
    arrow(636, 350, 714, 350, p, { label: "BIND" }),
  ].join(""),
  (p) => [
    card(70, 145, 1140, 84, "Search request", "HSP90 binding value under SPR conditions", [], { project: p, tone: "dark", active: true }),
    card(80, 270, 310, 250, "Result 01", "Same protein", ["Different assay", "No exact value"], { project: p, tone: "muted" }),
    card(485, 250, 310, 290, "Selected span", "Exact candidate", ["\“Kd was 15 nM\”", "SPR · 25°C", "source text unchanged"], { project: p, active: true }),
    card(890, 270, 310, 250, "Result 03", "Related mechanism", ["Right topic", "Wrong measurement"], { project: p, tone: "muted" }),
    arrow(390, 395, 475, 395, p),
    arrow(795, 395, 880, 395, p),
  ].join(""),
  (p) => [
    documentCard(60, 160, 430, 360, p, { highlight: 3, label: "CANDIDATE SPAN", version: "unchanged" }),
    arrow(500, 340, 610, 340, p, { label: "PROPOSE" }),
    card(650, 150, 250, 155, "Field 01", "Claim", ["HSP90 ligand binds"], { project: p, active: true }),
    card(930, 150, 250, 155, "Field 02", "Value", ["15"], { project: p, active: true, mono: true }),
    card(650, 345, 250, 155, "Field 03", "Unit", ["nM"], { project: p, active: true, mono: true }),
    card(930, 345, 250, 155, "Field 04", "Context", ["SPR · 25°C"], { project: p, active: true }),
    pill(760, 535, "MODEL PROPOSAL · NOT RELEASED", p, "dark", 380),
  ].join(""),
  (p) => [
    card(60, 155, 420, 380, "Source tokens", "What the passage says", ["text: binds HSP90", "value: 15", "unit: nM", "context: SPR · 25°C"], { project: p, tone: "dark" }),
    arrow(490, 345, 610, 345, p, { label: "CHECK" }),
    checkRow(650, 155, 510, "TEXT", "exact span match", p, "pass"),
    checkRow(650, 225, 510, "VALUE", "15 = 15", p, "pass"),
    checkRow(650, 295, 510, "UNIT", "nM = nM", p, "pass"),
    checkRow(650, 365, 510, "CONTEXT", "BLI ≠ SPR", p, "stop"),
    card(650, 450, 510, 92, "Gate result", "RELEASE BLOCKED", ["context mismatch stays visible"], { project: p, tone: "dark", active: true }),
  ].join(""),
  (p) => [
    documentCard(55, 165, 390, 360, p, { highlight: 3, label: "SOURCE", version: "v3" }),
    card(835, 165, 390, 360, "Candidate record", "Claim awaiting decision", ["Value: 15 nM", "Context: BLI · 25°C", "Rule flag: context mismatch"], { project: p, tone: "dark" }),
    arrow(452, 345, 605, 345, p),
    arrow(675, 345, 828, 345, p),
    `<circle cx="640" cy="345" r="68" fill="${p.accent}" class="pulse"/>`,
    text(640, 332, "HUMAN", "kicker-dark", "middle"),
    text(640, 365, "REVIEW", "big", "middle"),
    pill(510, 490, "SUPPORT", p, "paper", 120),
    pill(650, 490, "SEND BACK", p, "dark", 150),
  ].join(""),
  (p) => [
    card(70, 150, 1140, 410, "Durable evidence record", "Source-linked review outcome", [""], { project: p, tone: "dark", active: true }),
    card(105, 245, 225, 210, "01", "Source", ["hash 8f2c…", "span 418–462"], { project: p }),
    card(365, 245, 225, 210, "02", "Fields", ["claim · value", "unit · context"], { project: p }),
    card(625, 245, 225, 210, "03", "Checks", ["3 pass", "1 mismatch"], { project: p }),
    card(885, 245, 260, 210, "04", "Decision", ["send back", "reviewer owned"], { project: p, active: true }),
    arrow(330, 350, 355, 350, p), arrow(590, 350, 615, 350, p), arrow(850, 350, 875, 350, p),
    pill(454, 492, "TRACEABLE TO THE EXACT PASSAGE", p, "accent", 380),
  ].join(""),
];

const careBodies = [
  (p) => [
    card(70, 150, 570, 400, "Synthetic order", "Order #CP-120", ["requested plan: draft", "expected state: NEW", "state version: 12", "idempotency key: req-a81"], { project: p, active: true }),
    card(710, 165, 480, 172, "Hard-stop flags", "Explicit before AI", ["allergy conflict: false", "interaction check: pending"], { project: p, tone: "dark" }),
    card(710, 375, 480, 145, "Workflow state", "NEW · version 12", ["no draft exists yet"], { project: p }),
    arrow(640, 350, 700, 350, p, { label: "ATTACH" }),
  ].join(""),
  (p) => [
    card(65, 245, 280, 230, "Incoming", "Synthetic order", ["state NEW", "flags attached"], { project: p }),
    arrow(350, 360, 485, 360, p),
    card(500, 175, 280, 370, "Rule before AI", "ELIGIBILITY", ["allergy", "interaction", "required fields", "state allowed"], { project: p, tone: "dark", active: true }),
    arrow(785, 285, 930, 240, p, { label: "PASS", bend: -34 }),
    arrow(785, 435, 930, 490, p, { label: "STOP", bend: 34 }),
    card(945, 150, 260, 175, "Next state", "DRAFT_QUEUED", ["AI may run"], { project: p }),
    card(945, 400, 260, 175, "Blocked state", "REJECTED", ["AI never called"], { project: p, tone: "muted" }),
  ].join(""),
  (p) => [
    card(60, 170, 330, 330, "Request", "req-a81", ["expected v12", "same payload", "same idempotency key"], { project: p, active: true, mono: true }),
    arrow(400, 335, 535, 335, p, { label: "COMPARE" }),
    card(550, 150, 310, 370, "State store", "Version + key", ["current version: 12", "key req-a81: seen", "payload hash: same", "job id: draft-044"], { project: p, tone: "dark" }),
    arrow(870, 335, 995, 335, p, { label: "RETURN" }),
    card(1010, 190, 210, 290, "Queue", "One job", ["draft-044", "duplicate-safe", "no second plan"], { project: p }),
  ].join(""),
  (p) => [
    card(70, 145, 780, 415, "Bounded AI worker", "Typed draft fields", ["Goal: reduce interaction risk", "Instructions: structured draft", "Monitoring: named observations", "Notes: source-linked rationale"], { project: p, active: true }),
    card(900, 170, 300, 180, "Schema boundary", "Allowed output", ["string fields only", "no state mutation"], { project: p, tone: "dark" }),
    card(900, 390, 300, 150, "Not in schema", "APPROVAL", ["cannot be generated"], { project: p, tone: "muted" }),
    `<path d="M930 425 L1170 505 M1170 425 L930 505" stroke="${colors.stop}" stroke-width="8" opacity=".65"/>`,
  ].join(""),
  (p) => [
    card(55, 170, 405, 330, "Provider response", "Draft candidate", ["schema v4", "expected version 12", "transition DRAFTING → ?"], { project: p, tone: "dark" }),
    arrow(470, 335, 590, 335, p, { label: "VALIDATE" }),
    checkRow(625, 150, 545, "SCHEMA", "required fields only", p, "pass"),
    checkRow(625, 220, 545, "VERSION", "expected 12 = current 12", p, "pass"),
    checkRow(625, 290, 545, "TRANSITION", "DRAFTING → REVIEW_PENDING", p, "pass"),
    checkRow(625, 360, 545, "IDEMPOTENCY", "key bound to payload", p, "pass"),
    card(625, 445, 545, 92, "Persisted state", "REVIEW_PENDING", ["invalid responses return FAILED receipt"], { project: p, active: true }),
  ].join(""),
  (p) => [
    card(60, 180, 350, 315, "Persisted plan", "REVIEW_PENDING", ["draft fields validated", "audit receipt written", "AI worker finished"], { project: p, tone: "dark" }),
    arrow(420, 335, 565, 335, p),
    card(590, 145, 580, 400, "Authorized reviewer", "Human owns the transition", ["role: reviewer / pharmacist", "inspect draft + checks", "APPROVE or REJECT", "decision is persisted"], { project: p, active: true }),
    pill(650, 445, "APPROVE", p, "accent", 165),
    pill(845, 445, "REJECT", p, "dark", 165),
    text(1125, 195, "AI", "scene-index", "end"),
    text(1125, 220, "NO AUTHORITY", "small", "end"),
  ].join(""),
];

const dynamicsBodies = [
  (p) => [
    card(55, 145, 1170, 100, "TaskPacket", "Compare residue mobility across two molecular datasets", [], { project: p, tone: "dark", active: true }),
    card(65, 285, 330, 245, "Dataset A", "NMR ensemble", ["source: PDB", "coverage: residues 20–80", "meaning: conformers"], { project: p }),
    card(885, 285, 330, 245, "Dataset B", "MD trajectory", ["source: run-17", "coverage: residues 18–82", "meaning: time samples"], { project: p }),
    card(465, 270, 350, 290, "Comparison contract", "Fields that must agree", ["identity · rights", "residue mapping · coverage", "measurement meaning · maturity"], { project: p, active: true }),
    arrow(400, 405, 455, 405, p), arrow(880, 405, 825, 405, p),
  ].join(""),
  (p) => [
    card(60, 255, 310, 230, "TaskPacket", "Missing source locator", ["dataset B named", "URI unresolved"], { project: p, tone: "dark" }),
    arrow(380, 370, 545, 370, p, { label: "NEEDS INPUT", dashed: true }),
    card(560, 235, 310, 270, "Locator Agent", "Suggest only", ["candidate URI", "registered source", "confidence + reason"], { project: p, active: true }),
    arrow(880, 370, 1030, 370, p, { label: "PROPOSE", dashed: true }),
    card(1045, 255, 180, 230, "Output", "Locator", ["dataset://", "md/run-17"], { project: p }),
    pill(520, 535, "AGENT CANNOT APPROVE THE ROUTE", p, "dark", 410),
  ].join(""),
  (p) => [
    card(55, 165, 350, 365, "Operation registry", "Allowed tools", ["align_residues@2.1", "compare_ensemble@1.4", "summarize_coverage@3.0"], { project: p, tone: "dark" }),
    arrow(415, 345, 555, 345, p, { label: "SELECT" }),
    card(575, 150, 620, 395, "Registered compiler", "Build one executable route", ["input types: NMR + MD", "operation: align_residues", "tool version: 2.1", "parameters + source hashes attached"], { project: p, active: true, mono: true }),
    pill(755, 465, "UNREGISTERED ROUTE → BLOCK", p, "dark", 330),
  ].join(""),
  (p) => {
    const labels = ["IDENTITY", "RIGHTS", "MAPPING", "COVERAGE", "MEANING", "MATURITY"];
    const gates = labels.map((label, index) => {
      const x = 55 + index * 195;
      const state = index < 2 ? "pass" : index === 2 ? "stop" : "pending";
      const fill = state === "pass" ? p.accent : state === "stop" ? colors.stop : colors.carbon3;
      const copy = state === "pass" ? "PASS" : state === "stop" ? "MISSING MAP" : "NOT RUN";
      return `${rect(x, 250, 165, 230, { fill, stroke: p.accent, radius: 14 })}${text(x + 82.5, 300, `G${index + 1}`, "scene-index", "middle")}${text(x + 82.5, 356, label, state === "pending" ? "small-light" : "kicker-dark", "middle")}${text(x + 82.5, 414, copy, state === "pending" ? "small-light mono" : "card-dark mono", "middle")}`;
    }).join("");
    return gates + arrow(220, 365, 245, 365, p) + arrow(415, 365, 440, 365, p) + pill(455, 510, "ROUTE STOPS AT G3 · RESIDUE MAP REQUIRED", p, "dark", 500);
  },
  (p) => [
    card(70, 165, 345, 360, "DecisionTrace", "Why the route ran", ["gate outcomes", "route choice", "veto reasons", "human-readable decision"], { project: p, tone: "dark" }),
    card(465, 165, 345, 360, "RunReceipt", "How it ran", ["source hashes", "tool versions", "status + timestamps", "replay boundary"], { project: p, active: true }),
    card(860, 165, 345, 360, "EvidenceBundle", "What may be used", ["analysis output", "source locators", "allowed interpretation", "remaining limits"], { project: p, tone: "dark" }),
    arrow(420, 345, 455, 345, p), arrow(815, 345, 850, 345, p),
  ].join(""),
  (p) => [
    card(60, 165, 425, 370, "EvidenceBundle", "Compatible route result", ["residues 20–80", "NMR ↔ MD mapping", "coverage + meaning attached", "all six gates resolved"], { project: p, tone: "dark" }),
    arrow(495, 345, 625, 345, p),
    `<circle cx="690" cy="345" r="72" fill="${p.accent}" class="pulse"/>`,
    text(690, 334, "HUMAN", "kicker-dark", "middle"), text(690, 368, "SCOPE", "big", "middle"),
    arrow(765, 345, 880, 345, p),
    card(895, 150, 325, 400, "Scoped result", "Comparison allowed", ["claim: compare mobility", "range: residues 20–80", "limits remain attached", "Agent cannot widen scope"], { project: p, active: true }),
  ].join(""),
];

const trajectory = (x, y, width, height, project, variant = 0) => {
  const points = Array.from({ length: 14 }, (_, index) => {
    const px = x + (index / 13) * width;
    const py = y + height / 2 + Math.sin(index * 1.35 + variant) * height * 0.28 + Math.cos(index * 0.54 + variant) * height * 0.12;
    return `${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ");
  return `<polyline points="${points}" fill="none" stroke="${project.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
};

const hspBodies = [
  (p) => [
    card(55, 145, 1170, 84, "Evaluation unit", "One protein–ligand system · one assay-derived pKoff label", [], { project: p, tone: "dark", active: true }),
    ...[0, 1, 2].map((index) => {
      const x = 65 + index * 390;
      return `${card(x, 270, 350, 250, `Replica ${index + 1}`, "LiGaMD trajectory", ["same system", "independent simulation"], { project: p })}${trajectory(x + 28, 410, 294, 70, p, index)}`;
    }),
    pill(420, 545, "3 REPLICAS ≠ 3 LABELLED SAMPLES", p, "dark", 440),
  ].join(""),
  (p) => [
    ...[0, 1, 2].map((index) => {
      const x = 55 + index * 400;
      return [
        card(x, 150, 360, 380, `Replica ${index + 1}`, "Endpoint → frames → vector", ["sustained exit receipt", "512 real frames", "Dynamic10"], { project: p, active: index === 1 }),
        trajectory(x + 30, 325, 300, 66, p, index),
        pill(x + 84, 440, "10 FEATURES", p, index === 1 ? "accent" : "dark", 192),
      ].join("");
    }),
  ].join(""),
  (p) => [
    card(55, 145, 390, 400, "Replica vectors", "Three Dynamic10 rows", ["R1  ··········", "R2  ··········", "R3  ··········"], { project: p, tone: "dark", mono: true }),
    arrow(455, 345, 575, 345, p, { label: "COLUMN MEAN" }),
    card(610, 160, 580, 370, "System row", "Static20 + mean Dynamic10", ["one row per protein–ligand system", "replica identity preserved upstream", "assay pKoff label attached once"], { project: p, active: true }),
    pill(745, 445, "30 FEATURES · 1 LABEL", p, "accent", 300),
  ].join(""),
  (p) => {
    const groupColors = [p.accent, colors.pass, colors.paper2, "#8f836d", "#b8aa8e"];
    const groups = Array.from({ length: 15 }, (_, index) => {
      const fold = index % 5;
      const col = fold;
      const row = Math.floor(index / 5);
      const x = 70 + col * 230;
      const y = 280 + row * 70;
      return `${rect(x, y, 170, 48, { fill: groupColors[fold], stroke: colors.carbon, radius: 24 })}${text(x + 85, y + 31, `Ligand group ${String(index + 1).padStart(2, "0")}`, "pill-dark mono", "middle")}`;
    }).join("");
    const headers = Array.from({ length: 5 }, (_, index) => text(155 + index * 230, 240, `FOLD ${index + 1}`, "scene-index", "middle")).join("");
    return card(45, 145, 1190, 415, "Grouped validation", "Exact copies of a ligand stay in one fold", [], { project: p, tone: "dark", active: true }) + headers + groups + pill(422, 515, "NO EXACT-LIGAND LEAKAGE", p, "accent", 430);
  },
  (p) => {
    const names = ["Ridge", "Random forest", "Gradient boost", "MLP"];
    const modelCards = names.map((name, index) => {
      const x = 55 + index * 292;
      const bar = 160 - index * 17 + (index === 0 ? 0 : 18);
      return `${card(x, 185, 260, 320, `Model ${index + 1}`, name, ["same rows", "same folds", "same metric"], { project: p, active: index === 0 })}${rect(x + 28, 430, 200, 18, { fill: colors.carbon3, radius: 9 })}${rect(x + 28, 430, bar, 18, { fill: p.accent, radius: 9 })}`;
    }).join("");
    return modelCards + pill(420, 535, "LOWEST GROUP-EQUAL MAE · 0.8182", p, "dark", 440);
  },
  (p) => [
    card(55, 150, 1170, 405, "Stability gate", "Does the candidate beat the grouped dummy reliably?", [], { project: p, tone: "dark", active: true }),
    line(150, 375, 1110, 375, { stroke: colors.rule, width: 3 }),
    line(640, 245, 640, 500, { stroke: colors.white, width: 2, dash: "8 8" }),
    text(640, 230, "NO DIFFERENCE", "scene-index", "middle"),
    line(390, 335, 820, 335, { stroke: p.accent, width: 12 }),
    `<circle cx="585" cy="335" r="18" fill="${p.accent}" class="pulse"/>`,
    text(390, 315, "paired bootstrap interval", "small-light"),
    text(820, 315, "crosses zero", "small-light", "end"),
    pill(425, 430, "NO MODEL SELECTED", p, "accent", 430),
    text(640, 500, "The apparent improvement is not stable enough to choose a winner.", "body-light", "middle"),
  ].join(""),
];

const specs = [
  {
    key: "evidenceops",
    project: projects.evidenceops,
    files: ["evidenceops-01-source-diagram-v1.svg", "evidenceops-02-find-diagram-v1.svg", "evidenceops-03-structure-diagram-v1.svg", "evidenceops-04-check-diagram-v1.svg", "evidenceops-05-review-diagram-v1.svg", "evidenceops-06-record-diagram-v1.svg"],
    titles: ["Keep the passage and conditions together", "Retrieve an exact candidate span", "Turn the span into named fields", "Check every field against the source", "Put release authority with a reviewer", "Persist the source, checks, and decision"],
    subtitles: ["INPUT", "TOOL", "MODEL MOVE", "BLOCKING RULE", "HUMAN REVIEW", "RECORDED OUTCOME"],
    takeaways: ["The passage never travels without its experimental context.", "Search finds candidates; it does not rewrite the source.", "Claim, value, unit, and context remain a proposal.", "One mismatch produces a visible release block.", "The model cannot approve its own record.", "The result stays traceable to the exact source span."],
    bodies: evidenceBodies,
  },
  {
    key: "careplan",
    project: projects.careplan,
    files: ["careplan-01-order-diagram-v1.svg", "careplan-02-hard-stop-diagram-v1.svg", "careplan-03-version-diagram-v1.svg", "careplan-04-draft-diagram-v1.svg", "careplan-05-validate-diagram-v1.svg", "careplan-06-human-diagram-v1.svg"],
    titles: ["Start with an explicit synthetic order", "Run eligibility rules before AI", "Queue one versioned draft job", "Generate typed draft fields only", "Validate schema, version, and transition", "Leave the final decision to a reviewer"],
    subtitles: ["INPUT", "PRE-AI RULE", "STATE", "AI WORKER", "POST-AI RULE", "HUMAN AUTHORITY"],
    takeaways: ["State, flags, version, and idempotency key define the request.", "An ineligible order never reaches the AI worker.", "A retry with the same key does not create a second plan.", "Approval is impossible because it is absent from the draft schema.", "Invalid or stale output becomes a failed receipt, not new state.", "The automated path ends at REVIEW_PENDING."],
    bodies: careBodies,
  },
  {
    key: "dynamics",
    project: projects.dynamics,
    files: ["dynamics-01-data-diagram-v1.svg", "dynamics-02-locate-diagram-v1.svg", "dynamics-03-compile-diagram-v1.svg", "dynamics-04-gates-diagram-v1.svg", "dynamics-05-bundle-diagram-v1.svg", "dynamics-06-scope-diagram-v1.svg"],
    titles: ["Name the comparison and both datasets", "Let the Agent suggest a locator", "Compile only a registered operation", "Resolve six ordered compatibility gates", "Record the decision with the output", "Scope the scientific claim outside the Agent"],
    subtitles: ["TASK CONTRACT", "AGENT SIDECAR", "REGISTERED TOOL", "DETERMINISTIC GATES", "RECEIPT", "HUMAN SCOPE"],
    takeaways: ["The proposed comparison is explicit before any route runs.", "A missing locator becomes needs-input; the Agent cannot approve it.", "Unregistered analysis routes cannot execute.", "Identity, rights, mapping, coverage, meaning, and maturity fail closed.", "Trace, receipt, and EvidenceBundle preserve why and how the route ran.", "A reviewer owns the allowed interpretation."],
    bodies: dynamicsBodies,
  },
  {
    key: "hsp90",
    project: projects.hsp90,
    files: ["hsp90-01-replicates-diagram-v1.svg", "hsp90-02-features-diagram-v1.svg", "hsp90-03-aggregate-diagram-v1.svg", "hsp90-04-folds-diagram-v1.svg", "hsp90-05-models-diagram-v1.svg", "hsp90-06-stability-diagram-v1.svg"],
    titles: ["Keep three replicas attached to one system", "Summarize each replica independently", "Build one row for one system", "Hold exact-ligand groups out together", "Compare every model under one protocol", "Refuse selection when the gain is unstable"],
    subtitles: ["EVALUATION UNIT", "FEATURE EXTRACTION", "AGGREGATION", "LEAKAGE GATE", "MODEL COMPARISON", "STABILITY DECISION"],
    takeaways: ["Thousands of frames still correspond to one experimental label.", "Each replica yields its own endpoint receipt and Dynamic10 vector.", "Only corresponding feature values are averaged across replicas.", "Exact copies of a ligand never cross train and test folds.", "Rows, folds, preprocessing, and metric stay fixed across candidates.", "The paired interval crosses zero, so no model is selected."],
    bodies: hspBodies,
  },
];

await mkdir(outDir, { recursive: true });

for (const spec of specs) {
  for (let index = 0; index < 6; index += 1) {
    const stage = index + 1;
    const svg = frame(
      spec.project,
      stage,
      spec.titles[index],
      spec.subtitles[index],
      spec.bodies[index](spec.project),
      spec.takeaways[index],
    );
    await writeFile(path.join(outDir, spec.files[index]), svg, "utf8");
  }
}

console.log(`Generated ${specs.length * 6} project-stage SVGs in ${outDir}`);

# Website Review Guide

This repository is the reviewable source for Zhenpeng Liu's static personal
website. It includes the published HTML, CSS, JavaScript, project illustrations,
Hero source images, optimized Hero GLBs, local runtime dependencies, design
decisions, source notices, and dependency-free validation scripts.

## Ten-minute review path

1. Open `index.html` and follow the home-page sequence from AI for Science
   positioning through the Heroic Alpha Station and four project stories.
2. Read `design.md` for the information hierarchy, visual system, responsive
   rules, and motion contract.
3. Inspect `js/hero-station.js` and `js/site-motion.js` for the bounded Hero run,
   explicit Human step, scroll-stage synchronization, keyboard controls, and
   reduced-motion behavior.
4. Compare `docs/hero-harness-module-manifest.md` with `models/hero-3d/` and
   `images/hero-3d-source/` to trace every published 3D module to its source
   image and verified generator export.
5. Review the four detailed pages and their claim boundaries:
   `projects/evidenceops.html`, `projects/careplan.html`,
   `research/dynamics-atlas.html`, and `research/ligamd-pkoff.html`.
6. Check `THIRD_PARTY_NOTICES.md` before reusing vendored libraries or adapted
   motion patterns.

## Run locally

From the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. The site has no build step, package install,
backend, analytics request, or external runtime dependency.

## Validation

```bash
python3 scripts/validate_site.py
node scripts/validate_hero_models.mjs
git diff --check
```

The first check covers pages, local links, referenced assets, cache
fingerprints, accessibility hooks, responsive-motion hooks, and known claim or
identity regressions. The second checks all eight published GLBs, compression,
triangle counts, per-file limits, and the combined payload budget.

## Asset inventory and boundary

| Repository path | Review purpose | Publication status |
| --- | --- | --- |
| `images/project-visuals/*-index-v2.jpg` | initial project compositions | retained for design history |
| `images/project-visuals/*-index-v3.jpg` | intermediate project compositions | retained for comparison |
| `images/project-visuals/*-index-v4.jpg` | final project scenes | used by detailed pages |
| `images/hero-3d-source/*.png` | Hero scene, module, and particle references | retained as source evidence and fallback art |
| `models/hero-3d/*.glb` | eight compressed web derivatives | published runtime assets |
| `js/vendor/` | pinned Anime.js and Three.js runtime files | published with upstream licenses |
| `.hallmark/` | design preflight and redesign log | retained as design provenance |

The opaque master-quality GLB downloads are intentionally not committed. They
total roughly 640 MB and are not web payloads. Their verified filename-to-module
mapping, byte counts, and triangle counts are recorded in
`docs/hero-harness-module-manifest.md`; the optimized derivatives required by
the site are committed under `models/hero-3d/`.

Local browser screenshots, Playwright traces, operating-system metadata, and
temporary output are excluded by `.gitignore` because they are QA artifacts,
not website resources.

## Evidence and scope checks

- EvidenceOps is presented as a bounded public MVP with synthetic evaluation,
  not as a production evidence platform.
- CarePlan is a synthetic biomedical workflow prototype, not clinical software.
- Dynamics Atlas describes research-engineering workflow and governance; it
  does not claim broad Agent effectiveness.
- HSP90 / LiGaMD uses experimental assay-derived `pKoff` labels and does not
  claim physical `koff` estimation.
- The Hero is an explanatory interaction model. Its GLBs are generated visual
  components rather than scientific simulation output or a rigged mechanical
  system.

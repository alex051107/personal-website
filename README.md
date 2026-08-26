# Zhenpeng Liu — Personal Website

A static, evidence-bounded portfolio for AI for Science, AI application engineering, and scientific computing. The home page connects scientific or domain objects to model operations, deterministic gates, and reviewable records; four deeper pages carry the engineering decisions, evaluation units, failure evidence, and scope that do not fit in a résumé.

Start with [`docs/REVIEW_GUIDE.md`](docs/REVIEW_GUIDE.md) for the shortest review
path, asset inventory, validation commands, and publication boundaries.

## Architecture

The site intentionally uses semantic HTML, a portable `tokens.css`, one shared page stylesheet, and local progressive-enhancement JavaScript. Instrument Serif, Instrument Sans, and Geist Mono are self-hosted so the primary type identity does not change with the operating system. Anime.js 4.5.0 draws four finite SVG project traces. ScrollMagic 2.0.8, Lottie Web 5.13.0, and GSAP 3.15.0 support existing scene, semantic-glyph, and state transitions; VueUse Motion and React Spring patterns are adapted in vanilla JavaScript so the static site does not ship Vue or React solely for animation. Three.js 0.185.1 loads the Exploded Scientific Agent Harness from eight compressed same-origin GLBs. The site still requires no package manager or build step at runtime and makes no third-party runtime requests. Sources and licenses are recorded in `THIRD_PARTY_NOTICES.md`.

The stylesheet and local application-script URLs carry fingerprints derived from their Git blob contents. This prevents a browser or CDN from combining a newly deployed HTML layout with older cached CSS or JavaScript. The validator fails when a required fingerprint is stale.

The home page follows a Narrative Workflow. The personal masthead establishes authorship; the 3D Agent Harness demonstrates one complete decision route; the AI × Science chain and comparison matrix explain the shared grammar; four project-specific scroll stories then show their own inputs, operators, gates, receipts, human authority, and limits. The shared `AGENT / MODEL / TOOL / RULE / STATE / HUMAN` labels separate orchestration, model work, deterministic execution, authority, and records. Only Dynamics Atlas is labelled as an Agent sidecar; CarePlan remains a controlled AI worker and HSP90 remains scientific ML evaluation.

The visual direction is a warm scientific editorial dossier: paper, carbon ink, muted brass signals, square geometry, and named OKLCH tokens. It deliberately avoids blue-black, purple, neon gradients, robot or brain symbols, and generic AI-SaaS backgrounds. The home station is the one bounded particle and 3D exception: a generated protein-form mesh sits inside a tactile Agent Harness, while semantic HTML names Contract, Locator Agent, registered Tool, six Gates, DecisionTrace + RunReceipt, Human, and Result. The unchanged real portrait appears once at the right of the opening on wide screens and remains in its original color without grayscale, blend modes, face regeneration, or skin-tone filters. Every earlier project image remains in the repository.

Motion is semantic progressive enhancement for the Narrative Workflow and Long Document structures. The one signature interaction is the Exploded Scientific Agent Harness: `Inspect the harness` separates seven real modules, projects collision-managed leader labels from their Three.js world positions, and lets a visitor focus one module before restoring the complete instrument. PASS and BLOCK first reassemble the station, then run finite routes. PASS resolves all six gates and opens a real `release / revise / reject` decision; BLOCK stops at G3 `residue_map`, writes a receipt, and keeps release disabled. The active brass trace is written only after the relevant action. Each project uses native scroll to select one project-specific stage, draw its entering SVG edge, update a compact status readout, and rewrite an `event / owner / outcome` receipt. `prefers-reduced-motion` snaps to complete static states, and Save-Data uses the static Hero fallback. There is no scroll hijacking, free orbit, continuous loop, cursor replacement, typing effect, or background timer.

That boundary is deliberate:

- GitHub Pages can serve every current requirement directly.
- Core identity, project evidence, and contact information remain readable when the optional motion script is unavailable.
- A `mailto:` contact path avoids collecting visitor data or operating a form service.
- The repository has no dependency-update or framework-migration burden.

A backend should be added only when a real capability requires durable state, authentication, private content, or a submitted form. The current five-page public structure remains small enough to maintain directly. If project writing grows into a frequently updated archive, the next reasonable step is a static content system such as Astro with Markdown—not a database-backed application.

## Information architecture

The home page supports a quick 60–90 second orientation and a deeper two-to-three-minute project scan:

1. personal masthead and an interactive PASS/BLOCK Agent Harness;
2. explicit AI for Science grammar and a four-project decision matrix;
3. four project-specific scroll stories with visible stop paths and receipts;
4. research context, profile, and contact. Interaction sources and licenses live in repository documentation rather than a public effect scorecard.

The four deeper pages serve different kinds of evidence instead of forcing every project into one template:

- `projects/evidenceops.html` is an engineering case study;
- `projects/careplan.html` is a backend workflow case study;
- `research/dynamics-atlas.html` is a research engineering case study;
- `research/ligamd-pkoff.html` is a research method note.

Each page leads with a concrete failure point, then separates the implemented route, design decisions, recorded evaluation, current scope, and proposed next validation. The proposed work is visibly labelled and is never presented as completed evidence.

## Content contract

Every home project carries the same evidence contract—scientific or domain object, computable representation, AI role, deterministic control, visible stop path, recorded result, current scope, and public links—but not the same composition. EvidenceOps uses a release pipeline, CarePlan a state-controlled drafting path, Dynamics Atlas a model sidecar beside deterministic evidence gates, and HSP90 a three-replica aggregation feeding grouped model comparison.

The deeper pages distinguish a local prototype, a public static console, a synthetic harness, a research collaboration, and an experimental model registry from production deployment, real-user impact, scientific correctness, or broad generalization.

## Local preview

From the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

## Validation

Run the dependency-free site check and GLB payload check:

```bash
python3 scripts/validate_site.py
node scripts/validate_hero_models.mjs
```

The checks cover local links and anchors, referenced assets, current token/CSS/JavaScript cache fingerprints, allowlisted local runtimes and licenses, the deterministic 8-initial / 16-deferred project-image window, image attributes, the four required homepage project plates, traces and maps, external-link safety, required metadata, progressive-motion and accessibility hooks, asset-size budgets, known stale identity/claim strings, all eight GLB headers, embedded-resource boundaries, required compression extensions, triangle counts, per-file limits, and the combined 3D payload budget.

## Deployment

GitHub Pages serves this repository from the project path:

`https://alex051107.github.io/personal-website/`

Keep all local asset and page links relative so the `/personal-website/` base path continues to work.

The default publication route is an authenticated GitHub repository API fast-forward of `main`, with the live parent checked immediately before updating the ref and `force` disabled. SSH keys are not required for this portfolio deployment.

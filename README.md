# Zhenpeng Liu — Personal Website

A static, evidence-bounded portfolio for AI for Science, AI application engineering, and scientific computing. The home page connects scientific or domain objects to model operations, deterministic gates, and reviewable records; four deeper pages carry the engineering decisions, evaluation units, failure evidence, and scope that do not fit in a résumé.

Start with [`docs/REVIEW_GUIDE.md`](docs/REVIEW_GUIDE.md) for the shortest review
path, asset inventory, validation commands, and publication boundaries.

## Architecture

The site intentionally uses semantic HTML, a portable `tokens.css`, one shared page stylesheet, and local progressive-enhancement JavaScript. Anime.js 4.5.0 draws four finite SVG project traces. Three.js 0.185.1 loads the home Heroic Alpha Station from eight compressed same-origin GLBs; the scene still requires no package manager or build step at runtime. The site has no database, analytics script, contact-form backend, CDN dependency, or third-party runtime request. Sources and licenses are recorded in `THIRD_PARTY_NOTICES.md`.

The stylesheet and local application-script URLs carry fingerprints derived from their Git blob contents. This prevents a browser or CDN from combining a newly deployed HTML layout with older cached CSS or JavaScript. The validator fails when a required fingerprint is stale.

The home page remains Index-First. Its opening AI × Science chain makes the positioning legible before the project list: scientific inputs become computable representations, AI systems perform bounded operations, and evidence gates produce reviewable records. A compact field matrix distinguishes direct molecular-data work, scientific evidence engineering, and the adjacent synthetic biomedical workflow. Four differentiated editorial spreads use a full-bleed project scene with a restrained annotation rail that states `What goes in / What AI does / What comes out` without turning the image into a dashboard. A six-step execution trace, object rail, and exact system map provide increasing detail. The shared `AGENT / MODEL / TOOL / RULE / STATE / HUMAN` grammar separates orchestration, model work, deterministic execution, authority, and records. Only Dynamics Atlas is labelled as an Agent sidecar; CarePlan remains a controlled AI worker and HSP90 remains scientific ML evaluation.

The visual direction is a graphite scientific editorial index: deep warm charcoal, bone-white type, oxidized brass signals, square geometry, and named OKLCH tokens. It deliberately avoids blue-black, red, green accents, neon gradients, robot or brain symbols, and generic AI-SaaS backgrounds. The home station is the one bounded particle and 3D exception: a generated protein-form mesh supplies the vertex field inside a tactile Agent Harness, while semantic HTML names Contract, Agent, Tool, Gate, Trace, and Human. The unchanged real portrait appears once at the right of the opening on wide screens and remains in its original color without grayscale, blend modes, face regeneration, or skin-tone filters. Four versioned OpenAI-edited v4 scenes retain the original flow compositions and stay visually prominent; literal input, AI/Agent or ML action, output, trace, and stop-state labels remain selectable HTML. Every earlier project image remains in the repository.

Motion is semantic progressive enhancement for the Index-First and Long Document structures. The opening uses a one-shot portrait mask and scanner pass. The Hero station runs one finite route from TaskPacket to output: a bounded Locator move, one selected tool light, six gate lights, a brass trace, and a review-pending stop before Human authority. Drag and arrow-key rotation are limited to ±12 degrees; particle displacement remains local and springs back. Each project then combines a directional image expansion, reading-progress beam, compact status readouts, sequential trace nodes, and Anime.js SVG path drawing. IntersectionObserver triggers finite scenes at a meaningful viewport threshold; same-origin page transitions remain progressive enhancement. `prefers-reduced-motion` presents the complete station state immediately. There is no scroll hijacking, scroll-scrubbed parallax, free orbit, continuous loop, cursor replacement, typing effect, or background timer.

That boundary is deliberate:

- GitHub Pages can serve every current requirement directly.
- Core identity, project evidence, and contact information remain readable when the optional motion script is unavailable.
- A `mailto:` contact path avoids collecting visitor data or operating a form service.
- The repository has no dependency-update or framework-migration burden.

A backend should be added only when a real capability requires durable state, authentication, private content, or a submitted form. The current five-page public structure remains small enough to maintain directly. If project writing grows into a frequently updated archive, the next reasonable step is a static content system such as Astro with Markdown—not a database-backed application.

## Information architecture

The home page supports a quick 60–90 second orientation and a deeper two-to-three-minute project scan:

1. explicit AI for Science positioning, a scientific-input chain, and a direct page index;
2. a four-project field matrix naming object, model move, safeguard, and record;
3. four project-specific explainer spreads, each with an object rail, purpose statement, role boundary, system map, stop path, and recorded evidence;
4. research context, contribution direction, profile, and contact.

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

The checks cover local links and anchors, referenced assets, current token/CSS/JavaScript cache fingerprints, allowlisted local runtimes, image attributes, the four required homepage project plates, traces and maps, external-link safety, required metadata, progressive-motion and accessibility hooks, asset-size budgets, known stale identity/claim strings, all eight GLB headers, embedded-resource boundaries, required compression extensions, triangle counts, per-file limits, and the combined 3D payload budget.

## Deployment

GitHub Pages serves this repository from the project path:

`https://alex051107.github.io/personal-website/`

Keep all local asset and page links relative so the `/personal-website/` base path continues to work.

The default publication route is an authenticated GitHub repository API fast-forward of `main`, with the live parent checked immediately before updating the ref and `force` disabled. SSH keys are not required for this portfolio deployment.

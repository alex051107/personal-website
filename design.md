# Design — Zhenpeng Liu Personal Website

This file is the shared visual and interaction contract for the portfolio. Read
it before changing a page. Amend it only when the common system changes.

## Genre

Scientific editorial dossier: personal, evidence-rich, and readable before it
is interactive. The home page should resemble a well-edited research portfolio,
not an AI product launch.

Primary visual references are scientific publishing and explanatory journalism:
Distill for legible machine-learning diagrams, Quanta for a warm editorial voice,
and The Pudding for motion that explains an argument. Component libraries supply
mechanisms, not the page aesthetic.

## Anti-template boundary

Do not combine the signals that make a page look AI-generated:

- no blue-black full-page ground;
- no continuous page-wide technical grid;
- no oversized two-line AI slogan;
- no purple, aurora, neon fog, particles, fake terminal, robot, or ornamental
  neural network;
- no central SaaS dashboard surrounded by generic feature cards;
- no custom cursor or ambient loop.

A coordinate grid may appear inside a real process diagram. Mono labels may
identify a state or role. Those elements stay local to the information they
explain.

## Macrostructure

- Home: `personal masthead + scientific decision matrix + scroll-linked project dossiers`.
  The real portrait and name establish authorship. A short AI for Science
  statement explains the shared logic. A literal matrix exposes differences
  among four decisions. Each full project dossier has one semantic diagram;
  scrolling copy, selectable nodes, failure branches, and records all update
  that same diagram.
- Case studies: `Long Document`. The broader problem comes before the local
  implementation. Figures and tables may break the prose measure when needed.
- Native scrolling remains intact. A diagram may be `position: sticky` while its
  own explanatory steps pass beside it. No smooth-scroll runtime, pinned card
  stack, hidden navigation state, or scroll hijacking.

## Theme

Warm paper, carbon ink, and one muted-brass signal. Brass marks a selected state,
path, focus edge, or evidence boundary. It never becomes a gradient wash.

- `--color-paper` oklch(95% 0.020 88)
- `--color-paper-2` oklch(90% 0.024 86)
- `--color-ink` oklch(22% 0.018 66)
- `--color-ink-2` oklch(35% 0.022 70)
- `--color-graphite` oklch(16% 0.014 66)
- `--color-off-white` oklch(98% 0.012 88)
- `--color-rule` oklch(76% 0.026 82)
- `--color-accent` oklch(48% 0.100 80)
- `--color-accent-soft` oklch(72% 0.090 84)
- `--color-focus` oklch(42% 0.120 78)

The document is light by default. Dark carbon surfaces are reserved for process
plates and image readouts where light paths and labels need a controlled field.

## Typography

- Display: Iowan Old Style, weight 600, roman.
- Body: Avenir Next, weight 400.
- Mono: SFMono-Regular, weight 600, reserved for states, code, and compact role
  labels.
- Display tracking: -0.035em; the personal masthead may use -0.055em.
- No runtime or remote font request.

The name is the home-page masthead. Section titles state their function directly:
`Compare the four systems` and `Project case studies`. Avoid paired slogan lines
and polished oppositions that could belong to any AI company.

## Spacing and geometry

Use the named four-point scale in `tokens.css`. Square rules, captions, and
aligned edges establish the system. Warm empty space is part of the editorial
layout; it should separate arguments, not hide missing content. Rounded cards,
floating glass panels, and pills are not part of the language.

Project dossiers may widen to a 94rem editorial shell. On wide screens the
project plate owns roughly three quarters of the spread and the written thesis
becomes the smaller sticky margin note. Reverse spreads swap those proportions;
they do not shrink the image back to a secondary card. On narrow screens the
plate returns to one full column and project names must wrap only at meaningful
word boundaries.

## Motion contract

The home page adapts ten concrete templates as five paired interaction recipes.
They all read and write one semantic project state: the same active stage must
control the copy, node, edge, status card, terminal record, and result branch.
The recipes are not ten independent decorations.

The project dossiers use scrollytelling rather than ordinary entrance reveals.
Natural page scroll is mapped to a continuous six-stage position. Crossing a
stage midpoint changes the discrete active state; the position between
midpoints controls the tracing beam. The sticky scene moves one inspection lens
to the active object, draws only the route entering it, updates the stage badge,
and rewrites the status and terminal values without replacing their DOM
structure. On viewports at or below 64rem, the large scene returns to document
flow and a compact paper-and-brass stage dock remains sticky above the steps.

1. **MotionSites — AI Agent Pipeline + Agent Plan.** The pipeline supplies the
   legible `input → worker/tool → gate → record` route; the plan supplies an
   ordered run sheet with completed, active, pending, stopped, and released
   states. Both are translated into project-specific scientific objects and
   authority boundaries.
2. **React Bits — Scroll Expand + Animated List.** The Hero station receives one
   bounded clip-and-scale entrance; each project terminal's real execution rows
   reveal in order and then remain still. Neither effect may create a card
   stack, marquee, or second navigation system.
3. **Uiverse — Progress Status Card + Terminal Card.** Every dossier has one
   compact six-stage status readout and one finite text record. They report the
   selected project state; they are not decorative fake terminals.
4. **Anime.js — `createDrawable` + `createMotionPath`.** `createDrawable` draws
   only the edge entering the selected node. `createMotionPath` moves one runner
   over that same SVG edge and stops at the destination.
5. **Aceternity UI — Sticky Scroll Reveal + Tracing Beam.** Native page scroll
   selects the nearest explanatory step while its semantic diagram stays sticky
   on wide screens. A thin beam marks progress through those steps without
   pinning, smoothing, or replacing native scroll.

These translations may use three internal primitives—finite reveal, finite
trace, and state transition—but the visible source patterns above remain
separately identifiable. `data-template-source` and `data-template-name` record
their provenance. The home page contains one `.motion-source-map`, while each
of the four project dossiers contains one `[data-story-status]`, one
`.workflow-terminal`, and one `.project-story__beam` instance.

All animations are finite. No loop, bounce, elastic overshoot, `transition-all`,
idle movement, or scroll hijacking. Reduced-motion mode keeps scroll-selected
states but removes interpolation, moving runners, scaling, and probe travel.
Every control remains usable, and focus and selected-state feedback remain
immediate.

## Resource-selection boundary

Real source and licensing were checked before adaptation. The portfolio keeps
its static HTML/CSS/JS architecture instead of installing React runtimes.

- Integrate exactly the named ten-template set in the motion contract. Preserve
  each template's useful information architecture or interaction anatomy, then
  restyle it with the site's warm paper, carbon, brass, square rules, and project
  vocabulary.
- Vendor source may be adapted only when its license permits that use and its
  notice remains in `THIRD_PARTY_NOTICES.md`. Where a catalog restricts template
  redistribution, reproduce the behavior independently in scoped semantic HTML,
  CSS, SVG, and JavaScript.
- Do not redistribute MotionSites prompt text, preview images, or video; React
  component source from catalogs with redistribution limits; or Aceternity
  template source. Do not present a behavioral reconstruction as the original
  author's component.
- Reject Future-State's blue-black particle-eye aesthetic, decorative shaders,
  custom cursors, infinite paths, paid templates, 21st.dev Neon Nebula and N
  Ascii video wrappers, Codrops OneElementScroll, and React Bits Scroll Stack.
  They either conflict with the visual contract or replace native reading
  behavior.

## Microinteractions

- Silent success; no celebratory feedback.
- Focus rings appear immediately.
- Hover has a keyboard-focus equivalent.
- Touch targets are at least 44 by 44 CSS pixels.
- Comparison rows are ordinary table rows and links, not simulated chart data.
- Project steps are native buttons. Arrow keys move between adjacent steps,
  Home and End move to the boundary, and Enter or Space selects the step. Scroll
  activation never steals focus. Completed, active, and pending states remain
  distinguishable without motion or color alone.

## Per-page allowances

- Home masthead: the unchanged portrait appears once, at the right on wide
  screens and between the name and description on narrow screens.
- AI for Science overview: three open editorial columns name the scientific
  object, bounded model move, and reviewable decision. They are not cards.
- Comparison: a six-column matrix names project, decision, input, bounded
  automation, stopping gate, and durable outcome. On narrow screens each row
  becomes one readable project block.
- Project spreads: one project-specific semantic diagram is the primary image.
  Its nodes contain real fields, states, checks, and result branches. Five or
  six scroll steps activate those exact nodes and edges. There is no second
  trace rail, locator overlay, repeated system map, unrelated gallery,
  decorative hover field, or full-screen modal.
- Case studies: supplied figures, diagrams, and tables remain where they carry
  evidence or orientation.
- Conceptual images may establish material context, but purpose, input, action,
  gate, output, and limits remain selectable HTML.

## Narrative order

Each project follows the same reasoning sequence:

1. Why the broader problem matters.
2. What scientific or biomedical object enters the system.
3. What the model, ML workflow, or Agent is allowed to change.
4. Which deterministic, scientific, or authority gate controls the route.
5. What record or bounded decision leaves the system.
6. What the project does not establish.

## AI × Science object grammar

- `OBJECT`: literature passage, synthetic workflow input, molecular dataset
  pair, or protein–ligand system across LiGaMD replicas.
- `REPRESENTATION`: structured claim record, versioned draft state, TaskPacket
  and route contract, or one system-level feature row.
- `MODEL MOVE`: extraction, drafting, locator suggestion, or bundled-regressor
  comparison.
- `GATE`: evidence support, workflow authority, scientific compatibility, or
  leakage-aware evaluation.
- `RECORD`: review record, review receipt, EvidenceBundle, or explicit selection
  decision.

Dynamics Atlas and HSP90 / LiGaMD are direct molecular-data work. EvidenceOps
works on scientific evidence records. CarePlan is adjacent: a synthetic
biomedical workflow, not a clinical system.

## Role grammar

- `AGENT`: bounded orchestration or locator suggestion. Dynamics Atlas is the
  current Agent project.
- `MODEL`: probabilistic suggestion, extraction, drafting, or model candidate.
- `TOOL`: deterministic retrieval, compilation, or feature computation.
- `RULE`: validation, permission, compatibility, or selection gate.
- `STATE`: input, receipt, record, queue, result, or explicit stopping state.
- `HUMAN`: review or final authority.

The model or Agent never owns release, approval, scientific compatibility, or
model-selection authority. CarePlan remains a controlled AI worker. HSP90
remains scientific ML, not an invented Agent. Failure and no-selection states
remain visible.

## Imagery and provenance

- `portrait.png` is the unchanged real profile image.
- Four `*-index-v4.jpg` scenes were edited from the original v2 compositions
  with OpenAI image generation, then resized and compressed locally. They remain
  versioned conceptual covers and material references, not primary workflow
  explanations.
- Existing `*-index-v2.jpg`, `*-index-v3.jpg`, `*-card-portrait.jpg`, and
  `*-editorial.jpg` assets remain as versioned alternatives.
- Primary homepage diagrams are semantic HTML and SVG. Generated plates are
  conceptual illustrations, never screenshots, molecular results, patient
  evidence, or evaluation evidence.

## Exports

`tokens.css` is the source of truth. This static site does not load Tailwind or
shadcn, but the main colors translate as follows.

### Tailwind v4

```css
@theme {
  --color-paper: oklch(95% 0.020 88);
  --color-paper-2: oklch(90% 0.024 86);
  --color-ink: oklch(22% 0.018 66);
  --color-ink-2: oklch(35% 0.022 70);
  --color-graphite: oklch(16% 0.014 66);
  --color-accent: oklch(48% 0.100 80);
  --color-focus: oklch(42% 0.120 78);
  --font-display: "Iowan Old Style", Palatino, serif;
  --font-body: "Avenir Next", "Segoe UI", sans-serif;
  --spacing-md: 1.5rem;
}
```

### DTCG

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(95% 0.020 88)", "$type": "color" },
    "ink": { "$value": "oklch(22% 0.018 66)", "$type": "color" },
    "accent": { "$value": "oklch(48% 0.100 80)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Iowan Old Style, Palatino, serif", "$type": "fontFamily" },
    "body": { "$value": "Avenir Next, Segoe UI, sans-serif", "$type": "fontFamily" }
  }
}
```

### shadcn/ui

```css
:root {
  --background: 95% 0.020 88;
  --foreground: 22% 0.018 66;
  --primary: 48% 0.100 80;
  --primary-foreground: 98% 0.012 88;
  --muted: 90% 0.024 86;
  --muted-foreground: 47% 0.028 76;
  --border: 76% 0.026 82;
  --input: 76% 0.026 82;
  --ring: 42% 0.120 78;
  --radius: 0;
}
```

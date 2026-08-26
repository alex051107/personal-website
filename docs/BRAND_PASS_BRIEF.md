# Personal Website Brand Pass

## Decision

This pass gives the portfolio one authored identity: a scientific editorial
site built around one interactive instrument. The accepted 24 project-stage
illustrations and their scroll synchronization stay in place. New work is
limited to the opening thesis, the Agent Harness, typography, copy, and the
runtime needed to support those changes.

The signature interaction is an **Exploded Scientific Agent Harness**. At rest,
the existing GLB modules read as one instrument. `Inspect the harness` separates
the real modules a short distance, binds one leader label to each module, and
lets the visitor focus a part with a finite camera move. PASS and BLOCK then
reassemble the instrument and run the existing semantic route.

The newer Brand Pass brief supersedes the earlier suggestion to auto-loop the
Hero. Zoom remains, but it is attached to an explicit inspect or focus action.
The scene stops when the action finishes.

## Subject, audience, and job

- **Subject:** Zhenpeng Liu's AI for Science and scientific-software work.
- **Primary audience:** engineering and research teams reviewing internship or
  early-career candidates.
- **Page job:** establish within ten seconds that the work concerns evidence,
  stopping rules, recorded state, and human scientific judgment around model
  output.
- **Through-line:** scientific AI becomes useful when a visitor can see what the
  model did, what stopped it, and what decision remains.

## Observed baseline

The deployed `db92d27` baseline already has four project-specific six-stage
stories, PASS/BLOCK routes, six named gates, three human outcomes, and a static
fallback. Those are accepted.

The current Hero has three brand-level problems:

1. The 3D instrument is legible, but large UI panels cover it. On a 390 px
   viewport the Contract, route, and authority panels overlap the apparatus and
   each other.
2. Clicking a stage changes copy and emphasis, but the modules remain assembled.
   The visitor never gets one clean moment that explains the instrument's parts.
3. The site ships several motion runtimes and a public effect inventory. The
   inventory describes implementation sources before the portfolio has one
   memorable visual action of its own.

Baseline screenshots:

- `docs/screenshots/brand-pass/before-hero-desktop.png`
- `docs/screenshots/brand-pass/before-hero-mobile.png`

## Visual direction

### Palette

Preserve the existing material world.

| Token | Value | Role |
| --- | --- | --- |
| Warm paper | `#f0eadb` | page and editorial fields |
| Carbon | `#161816` | instrument and technical surfaces |
| Graphite | `#3e3d38` | body text and rules |
| Restrained brass | `#a77c39` | active state and measurement marks |
| Lit brass | `#d8b56f` | one active signal, never ambient glow |
| Ivory | `#eee7d7` | text inside the instrument |

### Type

The preferred proof candidate is Instrument Serif, Instrument Sans, and Geist
Mono, subject to the documented proof. Display type carries identity; body type
does the reading; mono appears only where the content is genuinely technical.

### Layout

The opening remains an editorial spread. The Hero is allowed to break wider
than the reading column, but its labels and controls must stay inside a measured
frame.

```text
DESKTOP
┌──────────────── personal opening + portrait ────────────────┐
└──────────────────────────────────────────────────────────────┘
  ┌──────────────── exploded scientific instrument ─────────┐
  │ labels ←  module  module  module  module  → labels       │
  │              finite route / gate readout                 │
  ├──────── Inspect ───── PASS ───── BLOCK ───── Reset ──────┤
  └───────────────────────────────────────────────────────────┘

MOBILE
┌──────── thesis ────────┐
├──── instrument view ───┤
│ one focused label      │
│ no overlapping panels  │
├──── horizontal stages ─┤
├──── current readout ───┤
└──── stacked controls ──┘
```

## Motion contract

- Resting scene is still.
- Inspect separates seven named modules over 700–900 ms with `power2.inOut`-
  equivalent easing and a short stagger.
- Focusing a module dims the others and moves the orthographic camera over
  420–620 ms. A second click or Escape returns to the exploded overview.
- PASS and BLOCK first reassemble the scene, then run the existing finite route.
- No bounce, elastic overshoot, idle particles, continuous camera motion,
  scroll hijacking, or infinite loop.
- Native scrolling remains untouched.
- Reduced motion shows a static separated diagram with all information available.
- Rendering stops after a finite action and while the Hero is outside the viewport.

## Information architecture

1. Personal opening and thesis.
2. Exploded Agent Harness.
3. Four-project comparison.
4. Four accepted project stories.
5. Research and engineering focus.
6. Profile and contact.
7. Methods, licenses, and interaction sources in repository documentation rather
   than a public motion-library scorecard.

## Production constraints

- Keep the static, framework-free site.
- Reuse the current Three.js models and semantic state machine.
- Add no production animation runtime.
- Keep PASS, BLOCK, release, revise, reject, fallback, Save-Data, keyboard, touch,
  and `prefers-reduced-motion` behavior.
- Keep labels attached to module world positions and recalculate their screen
  positions after camera, resize, font, or module-layout changes.
- Do not decode all 24 project-stage images during initial load. The active and
  adjacent stages are the eager window.

## Acceptance focus

The internal acceptance test is concrete even before an external five-person
study is available:

- the first screen says AI for Science in plain language;
- the Hero names Contract, Agent, Tool, Gates, Receipt, Human authority, and
  Result without overlapping the apparatus;
- Inspect is the only signature motion and it finishes;
- PASS and BLOCK leave different visible route and receipt states;
- a user can restore the assembled view with the same control, Escape, or Reset;
- macOS and Windows receive the same local primary fonts;
- each project opening contains a plain-language problem, one system sentence,
  and one evidence boundary;
- the final build adds no new runtime and passes the repository and browser checks.

## Implementation record

The implemented pass follows this brief without expanding the accepted project
illustration system. Visual and state readbacks are collected in
[BRAND_PASS_ACCEPTANCE.md](BRAND_PASS_ACCEPTANCE.md). Runtime, font, source, and
project-image deltas are recorded in
[BRAND_PASS_PAYLOAD.md](BRAND_PASS_PAYLOAD.md).

The requested five-person unfamiliar-reviewer study remains a real-person
acceptance step. It is not replaced by a synthetic or automated score.

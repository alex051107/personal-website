# Project mini-demo motion map

This note records the reference grammar and project-specific adaptation behind the four continuously looping homepage demos. The public site does not display a motion-credits catalogue.

## Reference grammar

- [MotionSites — AI Agent Pipeline](https://motionsites.org/prompts/dani-0212bfb0-ai-agent-pipeline): compact input → action → gate → recorded-state narrative.
- [MotionSites — Agent Plan](https://motionsites.org/prompts/user-2tkbbpfwyn8ymjznhwgiup3yzvd-agent-plan): stage plan whose active item changes while the system continues to run.
- [React Bits — Animated List](https://www.reactbits.dev/components/animated-list): one newly active event at a time, with previous events retained as history.
- [React Bits — Stepper](https://www.reactbits.dev/components/stepper): explicit current, completed, and pending stage states.
- [Anime.js — timeline loop](https://animejs.com/documentation/timeline/timeline-playback-settings/loop/): bounded, repeating stage sequence.
- [Anime.js — SVG motion path](https://animejs.com/documentation/svg/createmotionpath/): a visible packet follows the exact auditable route between stages.
- [Aceternity UI — Tracing Beam](https://ui.aceternity.com/components/tracing-beam): one signal line connects narrative stages without replacing their meaning.

The implementation adapts those patterns in local semantic HTML, CSS, and JavaScript. It does not import the source-site components or add a React runtime to this static GitHub Pages site.

## Four different product loops

### EvidenceOps

`versioned passage → four proposed claim fields → exact-support rule → review record / blocked mismatch`

The loop visualizes field-level evidence checking. It never converts topical relevance into support or presents a model proposal as a released record.

### CarePlan

`synthetic order → eligibility hard stop → typed AI draft → schema/state validation → review pending`

The loop ends at human-owned review state. It contains no autonomous approval animation.

### Dynamics Atlas

`TaskPacket + two molecular datasets → Locator Agent → registered compiler → six compatibility gates → EvidenceBundle / structured stop`

The Agent proposes a source or route. Registered tools and deterministic gates own execution eligibility.

### HSP90 / LiGaMD

`three replicas → per-replica Dynamic10 → one system row → exact-ligand grouped comparison → uncertainty gate / no selection`

The loop preserves the scientific evaluation unit and ends at the recorded N31 decision: no model selected.

## Motion contract

- A visible demo advances every 1.7–1.85 seconds and holds the terminal state longer.
- Each transition uses a drawn SVG edge plus one moving packet; node internals supply the project-specific micro-motion.
- Clicking a node pauses the loop at that state. The control resumes playback.
- `IntersectionObserver` stops timers outside the viewport, and document visibility stops them in a background tab.
- `prefers-reduced-motion: reduce` disables the loop and exposes a static overview.

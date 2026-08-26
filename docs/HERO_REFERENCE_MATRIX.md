# Hero Reference Matrix

## Research rule

Candidates were evaluated as mechanisms, not as visual skins. The scientific
object each effect must explain is the existing Dynamics Atlas Agent Harness:
Contract, Locator Agent, registered tools, six deterministic gates, receipt,
external human authority, and result. Prompt text, preview media, and proprietary
layout source are not copied.

Current production context before this pass:

- Three.js module: 365,552 B raw / 86,831 B gzip.
- GSAP core: 72,927 B raw / 28,356 B gzip.
- Anime.js: 118,043 B raw / 40,723 B gzip.
- Lottie light: 168,394 B raw / 46,741 B gzip.
- ScrollMagic: 17,388 B raw / 6,102 B gzip.
- Eight optimized Hero GLBs: 5,127,196 B total.

Payload values below are **incremental production cost for this selection**.
Rejected packages are not downloaded into the production tree, so their project
delta is 0 B; the dependency they would require is still named.

## Candidate review

| # | Source and exact demo | Mechanism | Scientific object it could explain | Dependency / candidate footprint | Input and motion behavior | Pin / hijack | Duplicate risk | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | [Motion Prompts — Exploded Product with Leader Labels](https://motionprompts.dev/component/exploded-product-labels/) | Parts separate in depth; labels bind by part ID; leaders measure live bounds; labels de-collide | The seven real Harness modules | Reference uses GSAP and Lenis. Adapted mechanism uses existing Three.js and DOM projection; **+0 B runtime** | Desktop and touch can use one button and part taps; keyboard needs real buttons and Escape; reduced motion shows the separated diagram | Original pins and smooths; adaptation does neither | Low if used once | **ADAPT / SELECT** |
| 02 | [Motion Prompts — Dotted Path Traveller](https://motionprompts.dev/component/dotted-path-traveller/) | Traveller, milestones, and reveal derive from one SVG path | PASS/BLOCK packet and named gates | Original uses GSAP ScrollTrigger and Lenis; existing Hero already owns a Three.js route; **+0 B** if the path-derived rule is applied locally | Strong resize and reduced-motion rules; touch and keyboard are not intrinsic | Original is sticky and Lenis-smoothed | High: current route curve already derives bead positions | REJECT as Hero; retain the single-route-definition rule |
| 03 | [Motion Prompts — 3D Scroll Scanner](https://motionprompts.dev/component/silenceo/) | Full-page WebGL scanner scrubbed by scroll | Could scan a dataset or molecule | Would add a separate scene and scroll controller; **0 B project delta because rejected** | Desktop-first, persistent scroll-driven motion; poor fit for finite keyboard control and reduced motion | Pins and hijacks/smooths | High: second 3D experience | REJECT |
| 04 | [Codrops — Exploding 3D Objects with Three.js](https://tympanus.net/codrops/2019/03/26/exploding-3d-objects-with-three-js/) | GPU vertex displacement breaks geometry into fragments | Could imply model internals or molecular fragments | Three.js exists; shader and fragmented geometry add code/GPU work; **+0 B runtime** | Pointer and reduced-motion behavior would need a new implementation | No required pin | High decorative risk; destroys module semantics | REJECT |
| 05 | [Codrops — Folding 3D Cardboard Box](https://tympanus.net/codrops/2022/12/13/how-to-code-an-on-scroll-folding-3d-cardboard-box-animation-with-three-js-and-gsap/) | Hinged geometry opens and closes on ScrollTrigger | Could assemble/disassemble the instrument enclosure | Three.js and GSAP core exist, but ScrollTrigger is not shipped; **0 B project delta because rejected** | Scroll owns the sequence; keyboard/touch alternatives and static reduced state need added work | Pinned scroll sequence | Medium; physical assembly is relevant, ownership is wrong | REJECT |
| 06 | [Theatre.js — Three.js integration](https://www.theatrejs.com/docs/latest/getting-started/with-three-js) | Author camera and object keyframes in a visual sequence editor, export JSON | Module separation, camera focus, and easing | `@theatre/core` would be a new runtime; Studio is AGPL-3.0 for development, core Apache-2.0; **0 B project delta because rejected** | Can author finite sequences; accessibility still belongs to the site | No required pin | Medium: duplicates a short deterministic timeline | REJECT for production and authoring; coordinates are simple enough to keep local |
| 07 | [21st.dev / Magic UI — Animated Beam](https://21st.dev/community/components/magicui/animated-beam/default) | SVG beam follows measured DOM endpoints | Gate-to-gate route | React + Framer Motion component; static site has neither; **0 B project delta because rejected** | Touch and keyboard do not control the decorative beam; reduced behavior needs adaptation | No pin | High: existing route curve and packet already do this | REJECT |
| 08 | [Motion Primitives — Morphing Dialog](https://motion-primitives.com/docs/morphing-dialog) | Shared-layout expansion from trigger to focused detail; Escape and click-outside close | Module focus and explanation | React + Motion + Tailwind; **0 B project delta because rejected** | Strong keyboard close contract; touch is natural; reduced mode supported only through a new implementation | No pin | Medium: useful state model, wrong framework | ADAPT only the focus / Escape contract |
| 09 | [Motion Primitives — Tilt](https://motion-primitives.com/docs/tilt) | Pointer-driven 3D tilt with a spring | Inspection angle for the whole instrument | React + Motion; **0 B project delta because rejected** | Hover-centric; touch and keyboard add little; perpetual pointer response conflicts with finite motion | No pin | High: current ±12° drag already exists | REJECT |
| 10 | [Motion Primitives — Spotlight](https://motion-primitives.com/docs/spotlight) | Cursor-following radial highlight | Could highlight an active Gate | React + Motion and decorative gradient; **0 B project delta because rejected** | Pointer-first and not meaningful to keyboard users | No pin | High: existing brass state signal is clearer | REJECT |
| 11 | [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/) | Captures DOM layout before/after and animates the difference | Could rearrange annotation panels | Requires the Flip plugin; official docs state it does not accommodate 3D transforms; **0 B project delta because rejected** | Good interruption handling and finite transitions; responsive resize during a flip is a caveat | No pin | Medium: DOM labels can transition with CSS while Three owns modules | REJECT |
| 12 | [Three.js CSS2D label example](https://threejs.org/examples/css2d_label) and [Three.js MIT license](https://github.com/mrdoob/three.js/blob/dev/LICENSE) | DOM label follows a real `Object3D` through the active camera | One truthful label for each Harness module | Three.js already ships. Reuse the current world-to-screen projection rather than adding another renderer; **+0 B runtime** | DOM labels can be buttons for keyboard and touch; reduced mode can show all labels statically | No pin | Low: current stage markers already project world positions | **KEEP as the binding method inside #01** |

## License and reuse boundary

- Motion Prompts explicitly presents validated prompts for rebuilding and
  adapting effects, but the reviewed pages do not provide a general code license.
  This repository uses the interaction anatomy only and does not redistribute
  their prompt text, code, screenshots, or preview media.
- Codrops downloadable demos are MIT unless a demo states otherwise:
  <https://tympanus.net/codrops/licensing/>.
- Theatre core is Apache-2.0; Studio is AGPL-3.0 and intended for development:
  <https://github.com/theatre-js/theatre/blob/main/README.md>.
- Motion Primitives is MIT:
  <https://github.com/ibelick/motion-primitives>.
- Three.js is MIT. The existing local license remains at
  `js/vendor/three/LICENSE`.
- The existing GSAP core is governed by the GreenSock standard no-charge
  license recorded in `THIRD_PARTY_NOTICES.md`. No new GSAP plugin is selected.

## Selected mechanism

Only one Hero mechanism advances to implementation:

> **Exploded Scientific Agent Harness with world-bound leader labels.**

It combines the semantic anatomy of candidate 01 with the existing Three.js
world-to-screen binding already used by the station markers in candidate 12.
This is one interaction, not two stacked effects.

### Finite state sequence

1. **ASSEMBLED** — complete instrument, no idle motion.
2. **EXPLODING** — modules move from stored base transforms to small semantic
   offsets over 760 ms; leaders and labels appear after their module starts.
3. **INSPECTED** — all parts remain separated and readable; render loop stops.
4. **FOCUSED** — one part stays full strength, others dim, camera zooms to it;
   a second click or Escape returns to INSPECTED.
5. **REASSEMBLING** — modules return to base transforms before PASS/BLOCK.
6. **RUNNING** — the existing finite route state machine owns the scene.

### Module mapping

| Label | GLB module | Explanation |
| --- | --- | --- |
| Contract | `hero-harness-input-dock-v1.glb` | Defines the task, inputs, and allowed calls. |
| Agent | chassis + locator carrier | May suggest a locator or missing input. |
| Tool | `hero-harness-tool-bank-v1.glb` | Executes a registered operation. |
| Gates | `hero-harness-compatibility-bank-v1.glb` | Checks identity, rights, mapping, coverage, meaning, and maturity. |
| Receipt | output station, receipt position | Records calls, checks, stop reasons, and state. |
| Human authority | `hero-harness-human-key-v1.glb` | May release, revise, or reject after a passed route. |
| Result | output station, result position | Exists only after the relevant route and decision. |

### Why this mechanism won

- It explains the actual project rather than decorating it.
- It uses every existing 3D asset the user already supplied.
- It creates one recognizable visual moment without another runtime.
- It fixes desktop hierarchy and mobile overlap with the same information model.
- Its reduced-motion state is a complete diagram rather than a missing animation.


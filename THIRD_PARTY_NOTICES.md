# Third-party notices and interaction sources

This portfolio keeps its own semantic HTML, design tokens, project copy,
scientific diagrams, and imagery. Its interaction layer uses local, versioned
runtimes and adapts selected public mechanisms to the site's static architecture.

## Scientific editorial study

The page aesthetic was reworked after studying scientific publishing and
explanatory journalism rather than AI landing pages. No page source or media was
copied from these publications.

- Distill: <https://distill.pub/>
- Quanta Magazine: <https://www.quantamagazine.org/>
- The Pudding: <https://pudding.cool/>

## Interaction source archive

The project reviewed two named templates from each of five public catalogs.
Repository-level `data-template-source` / `data-template-name` hooks keep the
adaptations still in production auditable without turning the public page into
a source scorecard.
"Adapt" has a precise meaning here: licensed
runtime or component code is used only where its terms permit; otherwise the
site independently reconstructs the interaction anatomy in scoped semantic
HTML, CSS, SVG, and JavaScript. Catalog prompt copy, screenshots, video, and
preview media are not included.

### MotionSites: AI Agent Pipeline + Agent Plan

- **AI Agent Pipeline**, underlying 21st.dev component by **Monolyth Dev**:
  MotionSites prompt <https://motionsites.org/prompts/dani-0212bfb0-ai-agent-pipeline>;
  component <https://21st.dev/@monolythdev/components/ai-agent-pipeline>.
- **Agent Plan**, underlying 21st.dev component by **Isaiah**:
  MotionSites prompt
  <https://motionsites.org/prompts/user-2tkbbpfwyn8ymjznhwgiup3yzvd-agent-plan>;
  component <https://21st.dev/@isaiahbjork/components/agent-plan>.

The two underlying 21st.dev components are MIT-labelled. Their route, plan,
status, and result relationships are adapted to the portfolio's scientific
objects. MotionSites prompt text and preview media remain reference material and
are not redistributed.

### React Bits: Scroll Expand study + Animated List adaptation

- **Scroll Expand**: <https://reactbits.dev/animations/scroll-expand>
- **Animated List**: <https://reactbits.dev/components/animated-list>
- Repository and license:
  <https://github.com/DavidHDev/react-bits/blob/main/LICENSE>

React Bits is licensed under MIT with Commons Clause License Condition v1.0.
The Brand Pass removed the earlier Scroll Expand behavior from the Hero. The
ordered execution-list relationship remains independently implemented in
vanilla CSS and JavaScript. The site does not bundle, sublicense, sell, or
redistribute the React Bits components.

### Uiverse: Progress Status Card + Terminal Card

- **Progress Status Card** (`ordinary-duck-36`) by **Cybercom682**:
  <https://uiverse.io/Cybercom682/ordinary-duck-36>
- **Terminal Card** (`soft-jellyfish-99`) by **Yaya12085**, which credits the
  original terminal concept to **Shu Ding**:
  <https://uiverse.io/Yaya12085/soft-jellyfish-99>
- Uiverse reuse guidance: <https://uiverse.io/legal/fair-use>

Both cited entries are MIT-labelled. Their DOM anatomy is translated into
project-specific status and record panels with scoped local CSS. This notice
retains the component authorship and the terminal's original-creator credit.

### Anime.js 4.5.0: createDrawable + createMotionPath

- **createDrawable**:
  <https://animejs.com/documentation/svg/createdrawable/>
- **createMotionPath**:
  <https://animejs.com/documentation/svg/createmotionpath/>
- Repository: <https://github.com/juliangarnier/anime>

The official MIT-licensed UMD runtime is vendored at
`js/vendor/anime.umd.min.js`. These are the only two Anime.js template-level
motion patterns in the ten-template set: one selected SVG edge draws, and one
runner travels that same route once.

### Aceternity UI: Sticky Scroll Reveal + Tracing Beam

- **Sticky Scroll Reveal**:
  <https://ui.aceternity.com/components/sticky-scroll-reveal>
- **Tracing Beam**: <https://ui.aceternity.com/components/tracing-beam>
- Aceternity license: <https://ui.aceternity.com/licence>

Aceternity permits use in end products but restricts redistribution of its
component and template source. The website therefore uses an independent
vanilla implementation: native scroll chooses the active dossier step and a
finite beam reports progress through that same semantic sequence. No
Aceternity source or registry template is redistributed.

## Additional reviewed route geometry

React Flow's Animating Edges example informed the rule that motion must follow
a real source-to-destination SVG edge. React Flow is MIT licensed; no React Flow
runtime or component is bundled.

- Example: <https://reactflow.dev/examples/edges/animating-edges>
- License: <https://github.com/xyflow/xyflow/blob/main/LICENSE>

## Supporting motion runtimes and adapted patterns

The Douyin reference names ScrollMagic, VueUse Motion, React Spring, Lottie Web,
and GSAP. Existing adaptations remain attached to section arrival,
project-story progress, Contract, Agent, Gate, Receipt, active workflow node,
and comparison states. They support the accepted project stories; the public
page no longer presents them as an effect count or detached animation gallery.

### ScrollMagic 2.0.8

- Documentation: <https://scrollmagic.io/docs/index.html>
- Repository: <https://github.com/janpaepke/ScrollMagic>
- Local runtime: `js/vendor/ScrollMagic.min.js`
- Local MIT license: `js/vendor/licenses/scrollmagic-LICENSE.md`
- Integrated effects: scene toggle, project-story scrub, Hero depth, and matrix
  scan.

### VueUse Motion patterns

- Presets: <https://motion.vueuse.org/features/presets/>
- Parallax composable: <https://vueuse.org/core/useParallax/>
- Repository and MIT license: <https://github.com/vueuse/motion>
- Integrated adaptations: fade-visible, roll-visible, pointer parallax, and
  press variant.

VueUse Motion is not bundled. The visible/interaction semantics are independently
adapted to the site's existing `IntersectionObserver`, pointer events, CSS
variables, and locally vendored GSAP runtime.

### React Spring patterns

- Examples: <https://www.react-spring.dev/examples>
- Parallax documentation: <https://www.react-spring.dev/docs/components/parallax>
- Repository and MIT license: <https://github.com/pmndrs/react-spring>
- Integrated adaptations: basic trail, scrolling wave, pointer dock, and active
  workflow-node spring.

React Spring is not bundled. Shipping React solely for decorative motion would
break the site's static, framework-free runtime contract, so the spring-like
timing and state relationships are recreated locally.

### Lottie Web 5.13.0

- Repository and documentation: <https://github.com/airbnb/lottie-web>
- Local light renderer: `js/vendor/lottie_light.min.js`
- Local MIT license: `js/vendor/licenses/lottie-web-LICENSE.md`
- Integrated effects: Contract write, Agent orbit, six-gate scan, and Receipt
  stamp.

The four tiny animation-data objects are original project-specific vectors
defined in `js/motion-library-showcase.js`; no downloaded Lottie artwork or
preview media is included.

### GSAP 3.15.0

- Documentation: <https://gsap.com/docs/v3/>
- Repository: <https://github.com/greensock/GSAP>
- Standard no-charge license: <https://gsap.com/community/standard-license/>
- Local runtime: `js/vendor/gsap.min.js`
- Integrated effects: word reveal, Hero stage timeline, Hero state transition,
  and semantic project-plate reveal.

GSAP is distributed under GreenSock's standard no-charge license, not MIT. The
site uses the public core runtime only and does not redistribute Club GSAP
plugins or sell an animation component library.

## Anime.js 4.5.0 license text

`js/vendor/anime.umd.min.js` is the official Anime.js 4.5.0 UMD minified bundle.
The site uses `createDrawable` for one-shot SVG traces and `createMotionPath` for
the finite runner in the home project stories. The 3D modules remain
synchronized by the local Three.js render loop.

- Documentation: <https://animejs.com/documentation/svg/createdrawable/>
- Documentation: <https://animejs.com/documentation/svg/createmotionpath/>
- Repository: <https://github.com/juliangarnier/anime>

MIT License

Copyright (c) 2025 Julian Garnier

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Onest and Geist fonts

The production site self-hosts two WOFF2 files under `fonts/`:

- Onest variable Latin, used for identity, display, body, and navigation text;
- Geist Mono Medium, reserved for actual machine states, gate IDs, receipts,
  metrics, and compact controls.

Onest is copyright The Onest Project Authors. Geist is copyright Vercel, in
collaboration with Basement Studio. Both families are distributed under the
SIL Open Font License 1.1. The exact license texts shipped with the site are:

- `fonts/licenses/Onest-OFL.txt`
- `fonts/licenses/Geist-OFL.txt`

Instrument Serif, Instrument Sans, Newsreader, and IBM Plex remain as historical
comparison files for the earlier equal-content typography proof. They are not
requested by the production stylesheet.

## Three.js 0.185.1 and Meshoptimizer 1.1

The Exploded Scientific Agent Harness uses a local Three.js ES module build, `GLTFLoader`,
and the small Meshoptimizer decoder required by the optimized GLB geometry.
The website does not load these files from a CDN.

Vendored paths:

- `js/vendor/three/three.module.min.js`
- `js/vendor/three/three.core.min.js`
- `js/vendor/three/addons/loaders/GLTFLoader.js`
- `js/vendor/three/addons/utils/BufferGeometryUtils.js`
- `js/vendor/three/addons/utils/SkeletonUtils.js`
- `js/vendor/three/addons/libs/meshopt_decoder.module.js`

Sources and licenses:

- Three.js documentation: <https://threejs.org/docs/pages/GLTFLoader.html>
- Three.js repository: <https://github.com/mrdoob/three.js>
- Three.js MIT license: `js/vendor/three/LICENSE`
- Meshoptimizer repository: <https://github.com/zeux/meshoptimizer>
- Meshoptimizer MIT license: `js/vendor/three/addons/libs/MESHOPT_LICENSE.md`

Three.js copyright © 2010–2026 three.js authors. Meshoptimizer copyright ©
2016–2026 Arseny Kapoulkine.

## glTF Transform 4.4.2

glTF Transform is a build-time tool only. It reduced each master-quality Hunyuan
GLB to a local web derivative with Meshopt geometry, WebP textures, and glTF mesh
quantization. No glTF Transform runtime is shipped to the browser.

- CLI documentation: <https://gltf-transform.dev/cli.html>
- Repository: <https://github.com/donmccurdy/glTF-Transform>
- License: MIT

## Motion Primitives

Earlier selector studies reviewed the state model of `Animated Background` and
the finite panel behavior of `Transition Panel`; those React components are not
redistributed.

- Animated Background: <https://motion-primitives.com/docs/animated-background>
- Transition Panel: <https://motion-primitives.com/docs/transition-panel>
- Repository: <https://github.com/ibelick/motion-primitives>
- License: <https://github.com/ibelick/motion-primitives/blob/main/LICENSE.md>

Motion Primitives is MIT licensed.

## Magic UI

The semantic workflows adapt Animated Beam's core geometry: each visible path
is tied to real source and destination nodes. The portfolio replaces the
component's endless gradient with a finite, single-color scientific route.

- Animated Beam: <https://magicui.design/docs/components/animated-beam>
- Registry source: <https://magicui.design/r/animated-beam.json>
- Repository: <https://github.com/magicuidesign/magicui>
- License: <https://github.com/magicuidesign/magicui/blob/main/LICENSE.md>

Magic UI is MIT licensed.

## Sources researched but not integrated

These sources informed selection, but no source, image, video, or dependency from
them is included in the portfolio:

- 21st.dev Neon Nebula:
  <https://21st.dev/r/karthiksivacharan/neon-nebula>
- 21st.dev N Ascii: <https://21st.dev/r/nblairwalker/n-ascii>
- Codrops OneElementScroll: <https://github.com/codrops/OneElementScroll>

The two 21st.dev entries are preview-video wrappers rather than semantic project
components. Codrops OneElementScroll adds GSAP, Flip, ScrollTrigger, Lenis, and
scrubbed decorative movement. No preview media, template, or source from these
entries was copied into this site.

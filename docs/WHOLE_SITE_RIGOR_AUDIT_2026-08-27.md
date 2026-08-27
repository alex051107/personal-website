# Personal website whole-site rigor audit

Date: 2026-08-27
Scope: homepage, 3D Hero, all four project narratives, project films, case-study pages, portrait, typography, navigation, responsive behavior, accessibility, performance, and publication controls.

Status key: **FIXED** = a defect was found and repaired in this pass; **VERIFIED** = the item was challenged and the existing implementation passed; **BOUNDED** = the design remains intentionally limited and the limit is stated in the interface.

## 1. Positioning and narrative

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 01 | Can a recruiter identify the person, discipline, and location before scrolling? | VERIFIED | The opening names Zhenpeng Liu, UNC Biology + Computer Science, Chapel Hill, and the expected graduation date. |
| 02 | Does the first screen explain AI for Science in ordinary language rather than slogans? | FIXED | The lead now says the software finds evidence, compares molecular data, and shows when a human decision is required. |
| 03 | Is the portfolio framed around one coherent practice rather than four unrelated projects? | FIXED | The five-part scientific-decision framework connects object, bounded automation, gate, record, and authority. |
| 04 | Is the word “Agent” attached to an observable job and boundary? | FIXED | The Hero names Contract, Agent, Tool, six Gates, Receipt, Human, and Result; the Agent is limited to locator suggestions. |
| 05 | Can the four projects be distinguished by the scientific decision each one supports? | FIXED | The comparison matrix now states one decision, input, automated contribution, stop condition, and recorded outcome per project. |
| 06 | Are project outcomes separated from future ambition or production claims? | VERIFIED | EvidenceOps, CarePlan, Dynamics Atlas, and HSP90 retain explicit fixed-case, synthetic, collaboration, and N31 boundaries. |
| 07 | Does the portfolio avoid turning research projects into employment history? | VERIFIED | Project ownership is described as work shown, not employer/title claims. |
| 08 | Is there a clear next action after the reader understands the work? | VERIFIED | GitHub, LinkedIn, case-study, repository, and contact routes remain direct and descriptive. |

## 2. Information architecture and wayfinding

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 09 | Does the heading hierarchy form a readable outline without level jumps that obscure ownership? | VERIFIED | One H1 leads section H2s, project H3s, and project-thesis H4s. |
| 10 | Does the comparison matrix answer a different question from the project stories? | FIXED | The matrix is a fast cross-project comparison; the stories explain one route stage by stage. |
| 11 | Does “Selected work” arrive at the actual work instead of an animation prelude? | FIXED | The public motion-library showcase and its delayed scene activation were removed. |
| 12 | Are the same workflows repeated as a film, mini demo, process rail, and six-step story? | FIXED | The four redundant mini demos were removed from HTML, CSS, and JavaScript. |
| 13 | Does each project use the same reading grammar without forcing identical scientific semantics? | FIXED | Each retains the same input → operation → gate → record grammar while using project-specific objects and stopping rules. |
| 14 | Do homepage summaries lead to deeper case studies and working repositories? | VERIFIED | Each project has a case-study route and one or more evidence-bearing external links. |
| 15 | Do anchored links land below the sticky header rather than under it? | FIXED | Section and project anchors now use a header-aware scroll margin. |
| 16 | Do legacy URLs fail silently or strand the visitor? | VERIFIED | Legacy routes retain explicit redirect plus fallback links to current sections or case pages. |

## 3. Typography, hierarchy, and legibility

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 17 | Does the typography resemble a personal product portfolio rather than a paper manuscript? | FIXED | Body copy now uses Instrument Sans; Onest is reserved for display hierarchy and Geist Mono for compact system labels. |
| 18 | Are display headings distinct without becoming decorative or difficult to scan? | VERIFIED | Headings use one modern display family, controlled weight, balanced wrapping, and restrained tracking. |
| 19 | Is any operational Hero text below a practical reading size? | FIXED | Contract, route, gate, result, authority, telemetry, and control labels received explicit readable minimums. |
| 20 | Is monospace used for state and evidence labels rather than entire paragraphs? | FIXED | Monospace remains confined to compact system metadata; explanatory prose uses the body face. |
| 21 | Do long headings wrap predictably on 390px screens? | VERIFIED | Mobile display sizes and maximum measures keep headings inside the viewport. |
| 22 | Are dates and project metadata visually secondary but still readable? | VERIFIED | Metadata remains smaller than project titles while preserving contrast and line height. |
| 23 | Does muted text preserve sufficient visual separation from the warm-paper background? | VERIFIED | Muted ink tokens remain materially darker than the surface and are not used for essential button labels. |
| 24 | Does mobile type keep the same hierarchy instead of collapsing everything to one size? | VERIFIED | Identity, thesis, explanatory copy, state labels, and captions retain distinct mobile scales. |

## 4. Portrait, scientific imagery, and project-to-image binding

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 25 | Is the portrait recognizably the user and free of a visible white cutout fringe? | FIXED | The opening uses the cleaned v4 portrait once, at a large size, with the duplicate profile portrait removed. |
| 26 | Does the Hero image read as an Agent workflow rather than an arbitrary 3D sculpture? | FIXED | The scene is explicitly labeled as a bounded Agent Harness with a contract, locator, tool bank, six gates, receipt, human lever, and result. |
| 27 | Can the viewer understand the Hero route order without guessing spatial symbolism? | FIXED | Seven named markers, a route walkthrough, live status, and PASS/BLOCK examples bind the spatial model to the route. |
| 28 | Are the four project images actually different in scientific object and operation? | VERIFIED | Evidence pages, synthetic order states, molecular datasets, and LiGaMD replica/model objects use separate stage-image sets. |
| 29 | Does every one of the 24 project stages have a stage-specific image and explanatory text? | VERIFIED | Four projects × six ordered stage images are validated; initial and deferred loading windows are checked. |
| 30 | Are stage images loaded progressively instead of downloading all 24 at startup? | VERIFIED | Eight images load initially and sixteen are hydrated only around the active stage. |
| 31 | Do image alternatives describe the scientific state rather than say “concept image”? | FIXED | Stage alt text names the object, operation, gate, mismatch, human action, or recorded result shown. |
| 32 | Does each video have a stable poster and adjacent written explanation? | VERIFIED | All four films have compressed posters, chapter descriptions, and text summaries on homepage and case pages. |
| 33 | Does changing a stage visibly replace the relevant scene rather than only highlighting a label? | VERIFIED | Active-stage selection swaps the stage art, runtime status, receipt, and explanatory text together. |
| 34 | Is the visually mismatched exact-support frame aligned with the shared material language? | FIXED | The exact-support stage now uses the same paper, carbon, brass, instrument, and evidence-object grammar as the other scenes. |

## 5. Motion, films, and interaction logic

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 35 | Does the 3D Hero continuously demonstrate the route without waiting for a click? | VERIFIED | The camera tour loops Contract → Result and resumes after temporary inspection. |
| 36 | Can a visitor stop a loop longer than five seconds without losing the content? | FIXED | A compact Hero tour control and one control per project film pause/resume motion while written states remain visible. |
| 37 | Does reduced-motion preference actually stop continuous motion? | FIXED | Hero tour and film autoplay stop under reduced motion; an explicit user action may still play a film. |
| 38 | Does data-saving preference prevent automatic video use? | FIXED | Save-Data initializes films as paused and exposes a manual Play motion control. |
| 39 | Do off-screen films continue consuming decoding and battery? | FIXED | Intersection observation pauses films outside the visible region and resumes only when allowed. |
| 40 | Does chapter seeking download a second Blob copy of the same MP4? | FIXED | The fetch/Blob fallback was removed; native media seeking is used. |
| 41 | Are five animation libraries competing for the same elements? | FIXED | ScrollMagic, Lottie, the 20-effect showcase runtime, and duplicate mini-demo runtime were removed; GSAP and Anime remain tied to stage transitions. |
| 42 | Does scroll change project state rather than merely reveal generic cards? | VERIFIED | Desktop scroll selects six project-specific stages and updates image, role, state, receipt, and progress. |
| 43 | Can a visitor inspect stages directly instead of being trapped in autoplay? | VERIFIED | Hero markers, PASS/BLOCK controls, stage nodes, chapter buttons, and Advance trace remain directly operable. |
| 44 | Does motion communicate a real transition instead of acting as decorative noise? | FIXED | Remaining motion maps to camera focus, packet travel, gate progression, scene replacement, receipt recording, or state change. |

## 6. Keyboard, touch, and assistive access

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 45 | Can keyboard users bypass the header and Hero? | VERIFIED | A visible-on-focus skip link targets the main content. |
| 46 | Are focus states visible on links, controls, stage buttons, and film controls? | VERIFIED | Focus-visible treatments exist across navigation, workflow, film, and Hero controls. |
| 47 | Are primary mobile controls at least 44px in both dimensions where practical? | FIXED | Navigation, Hero markers, film controls, chapter controls, and matrix project links received minimum target dimensions. |
| 48 | Does the mobile header remain readable without clipping Contact or covering anchors? | FIXED | Navigation gaps, target widths, header height, and section scroll margins were adjusted together. |
| 49 | Can workflow stages be changed with keyboard arrows, Home, and End? | VERIFIED | The six explanatory stage buttons implement directional and endpoint keys. |
| 50 | Does the same stage appear twice in the tab order as both a visual node and a text card? | FIXED | Visual rail nodes remain pointer-selectable but leave the tab order; the descriptive stage buttons own keyboard navigation. |
| 51 | Do live regions announce only meaningful state changes? | VERIFIED | Hero status, film status, workflow log, and active-stage summary update on state transitions rather than every animation frame. |
| 52 | Can the comparison table be examined on a narrow screen without widening the page? | VERIFIED | The matrix scrolls inside its own labeled frame; the document itself remains viewport-width. |
| 53 | Is film meaning available when video cannot play? | VERIFIED | Posters, captions, chapter labels, and project explanations preserve the full route. |
| 54 | Are forced-colors and print modes intentionally handled? | VERIFIED | Canvas/fallback, borders, motion, and printable project-story behavior have explicit fallbacks. |

## 7. Performance, maintainability, and publication

| # | Audit question | Status | Resolution / evidence |
|---:|---|---|---|
| 55 | Is the homepage loading code for components that no longer render? | FIXED | Six retired runtime/license files and their script tags were removed. |
| 56 | Is the stylesheet carrying hundreds of lines for removed demos and library showcases? | FIXED | Both retired CSS blocks were deleted; the stylesheet dropped from roughly 299KB transferred in the baseline preview to a smaller single bundle. |
| 57 | Are the eight Hero GLBs individually and collectively bounded? | VERIFIED | Validation limits every module to 1MB and the combined models to 6MB. |
| 58 | Do four MP4 files download before the visitor reaches them? | VERIFIED | Videos use `preload="none"`; posters and text appear first. |
| 59 | Is the large Hero fallback unnecessarily served as a multi-megabyte PNG? | FIXED | The active fallback was converted to an approximately 454KB JPEG with the same 1536×1024 framing. |
| 60 | Can stale CSS or JavaScript survive GitHub Pages/browser caching after deployment? | FIXED | Content fingerprints are enforced for the stylesheet and every local runtime. |
| 61 | Does the page produce console errors during its normal route? | VERIFIED | Browser acceptance checks the homepage and case pages for runtime errors. |
| 62 | Can a future edit silently re-add retired libraries, duplicate demos, missing controls, or unbounded assets? | FIXED | The site validator rejects those regressions and checks film controls, scripts, models, fonts, links, anchors, and stage counts. |
| 63 | Do all four case-study pages share the current film, typography, navigation, and accessibility behavior? | FIXED | They load the same film runtime and stylesheet and each exposes its own project-specific film control and written fallback. |
| 64 | Is “published” distinguished from merely editing the local files? | VERIFIED | Delivery requires local checks, browser acceptance, Git commit/push, and public-URL readback before publication is claimed. |

## Acceptance summary

- Baseline structural check before repairs: `SITE_CHECK PASS pages=14 anchors=33 links=98`.
- Baseline visual evidence still showed a 32,160px desktop page, approximately 38,500px mobile page, 100 buttons, 7–9px Hero microcopy, duplicated project demonstrations, and four retired motion runtimes.
- Final local acceptance: desktop 24,911px, tablet 20,199px, mobile 24,920px; 82 buttons; zero retired runtimes; zero visible sub-44px mobile targets after repair; no page-level horizontal overflow.
- Keyboard acceptance starts with the Skip link and shows a visible outline on the 3D viewport and controls. Reduced-motion acceptance pauses every film and disables the automatic Hero tour. Normal-motion acceptance confirms the EvidenceOps film advances and loops on screen.
- All four case pages expose one project-specific film, poster, written explanation, and motion control at 390px. Console and page-error collections were empty. Public GitHub Pages readback remains the last publication check.

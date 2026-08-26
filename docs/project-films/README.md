# Project micro-film production bible

## Current status

The four project films are designed as **12-second, three-clip loops**. This
folder contains the director treatment, generated storyboard boards, 24 stage
reference crops, and copy-ready keyframe/video prompts. No video-generation
model is connected in this workspace, so the `.mp4` / `.webm` files do not yet
exist and the public site has not been changed to pretend that they do.

The generated boards are **directional reference art**, not project evidence.
They may contain invented micro-copy inside the image. Before any frame goes
public, replace that micro-copy with the exact synthetic labels defined here or
render the labels as HTML/SVG overlays. Never publish an invented paper title,
author, DOI, clinical field, model score, or scientific conclusion.

## What the Douyin tutorial actually does

The inspected public tutorial is [小羊同学的 Vox video workflow](https://www.douyin.com/video/7667991237215014186).
Its visible sequence is:

1. `00:13–00:22` — prepare a narration and use a Codex skill to split it into
   image prompts and image-to-video prompts.
2. `00:23–00:42` — combine a persistent style board, a style pre-prompt, and one
   narration segment to produce a keyframe.
3. `00:42–01:14` — pair the generated keyframe with its matching video prompt,
   upload the image, and generate the clip.
4. `01:15–01:46` — assemble the clips, voice-over, and subtitles in an editor.

The tutorial's automatic chapter text mis-transcribes `skill` and `imagegen`.
The matching public repository is
[myriadone/vox-prompt-creating](https://github.com/myriadone/vox-prompt-creating):
it defines one concept + one visual event + one complete camera move per clip,
uses 4/6/8-second shots, GPT Image keyframes, and Omni Flash video prompts.

Related skills were checked but not installed:

- [Storyboard Artboard](https://www.skills.sh/astriaai/skills/artboard) — useful
  consistency tactic: one multi-panel board becomes the continuity reference.
- [Seedance 2.0 API](https://www.skills.sh/hexiaochun/seedance2-api/seedance2-api)
  — an end-to-end option if its external service and credentials are approved.
- [Pexo Agent](https://www.skills.sh/pexoai/pexo-skills/pexo-agent) — a broader
  hosted pipeline, also dependent on an external account/API.
- [LibTV's official Agent skill](https://github.com/libtv-labs/libtv-skills) —
  the closest executable match to the second tutorial. It can create a hosted
  generation session, upload reference art, query progress, and download media,
  but it requires a user-owned `LIBTV_ACCESS_KEY`. It was inspected, not
  installed or invoked.

This implementation adopts the tutorial's production grammar, not its SpaceX
collage content. The visual system remains specific to this portfolio.

## Upgrade adopted from the evolved Vox workflow

The follow-up reference is [光郡的 Vox Skill update](https://www.douyin.com/video/7670129516907540346).
The visible tutorial describes a hosted LibTV skill-community flow that turns a
voice-over into split shots and then a complete video. The author also describes
three quality improvements that are directly useful here:

1. More motion and camera choices are available.
2. The finished piece should not repeat the same effect from shot to shot.
3. A number that is already correct must not roll away and return to the same
   number merely to look animated.

The public [LibTV Skill Hub](https://www.liblib.tv/skill) was checked directly
on 2026-08-26. Browsing worked without an account, but searches for `VOX` and
`VOX风格` returned no public Skill. The second search then opened a login dialog.
No login, upload, generation request, or credit spend was performed. The exact
Skill shown by the creator is therefore treated as private or unlisted until a
public identifier is supplied; this production pack adopts its observable
workflow rules without claiming to have copied that unavailable Skill.

The portfolio adaptation therefore adds a **motion ledger** and a **semantic
lock**:

- Every one of the 12 clips uses a named camera trajectory; adjacent clips may
  not repeat it.
- Numbers, gate names, state names, units, versions, and metric labels are
  immutable unless the story explicitly changes that value.
- Decorative counters, slot-machine digits, random scanning, and repeated
  zoom-in/zoom-out are rejected.
- Motion must expose a real operation: selecting, routing, validating,
  aggregating, grouping, recording, or handing authority to a human.
- Hosted end-to-end generation remains an optional production surface. The
  generated result still requires the same claim and visual review before it
  becomes a website asset.

### Evolved workflow used for these four films

1. Freeze one claim-bounded narration and one six-panel continuity board per
   project.
2. Split each story into three four-second shots. Each shot contains one
   concept, one visible operation, and one complete camera move.
3. Feed the project visual bible plus the relevant stage crop into the
   keyframe prompt; never regenerate a frame from text alone after continuity
   has been established.
4. Generate shots independently so a failure cannot rewrite the whole story.
5. Record every camera path, transition, and material event in the motion
   ledger before generation. A used effect is unavailable to the next shot.
6. Apply the semantic lock before generation: correct labels, digits, units,
   gate counts, stage owners, and result states are immutable pixels or later
   HTML/SVG overlays.
7. Assemble voice-over, restrained sound design, and subtitles only after the
   visual edit is stable. Do not ask the video model to typeset narration.
8. Review the complete loop without surrounding website copy. Reject it if a
   viewer cannot identify the input, operation, gate or stop, human boundary,
   and recorded result.

### Cross-film semantic lock ledger

| Project | Immutable vocabulary and values | State that may visibly change |
| --- | --- | --- |
| EvidenceOps | `PAPER A–D`, `VALUE`, `UNIT`, `METHOD`, `CONDITION`, source attachment | candidate selection, mismatch diversion, review receipt |
| CarePlan | `SYNTHETIC ORDER`, version key, `DRAFT ONLY`, `APPROVAL FIELD ABSENT` | eligibility, schema/state checks, `REVIEW PENDING` |
| Dynamics Atlas | TaskPacket identity, registered-tool boundary, six named gates | locator suggestion, tool route, gate resolution, receipt/bundle |
| HSP90 / LiGaMD | assay-derived `pKoff`, three replicas, four fixed pipelines, interval labels | replica aggregation, grouped folds, interval reveal, `NO MODEL SELECTED` |

## Shared visual bible

- **Personality:** calm, exact, editorial, scientific, tactile.
- **Materials:** warm ivory paper, carbon black, oxidized brass, restrained
  project-specific signal color, subtle ink and archival wear.
- **No generic AI shorthand:** no robot, glowing brain, blue/purple neon,
  meaningless network sphere, or ornamental machine that has no workflow role.
- **One active event:** at most one primary object and one supporting signal move
  at a time. Previous state remains visible as evidence.
- **Three motion layers:** hero object, secondary annotation/rail, ambient dust or
  paper depth. Ambient motion must never compete with the operation.
- **Scene text:** only physical labels, cards, stamps, gauges, or folder tabs.
  Narration subtitles are added in post, not generated inside the scene.
- **Truth boundary:** generated images say `SYNTHETIC DEMO`, `PAPER A`, `ORDER
  01`, or other neutral identifiers. Exact metrics remain HTML text on the site.
- **Camera:** one trajectory per clip; no random orbit, whip pan, or repeated zoom
  in/out. A cut is allowed only between the three four-second clips.
- **Motion ledger:** EvidenceOps uses overhead push / lateral trace / dolly-back;
  CarePlan uses descending track / dock-side slide / locked-board rack focus;
  Dynamics Atlas uses diagonal reveal / route-follow / crane-down; HSP90 uses
  three-ribbon converge / fold-rail tracking / interval-tabletop pullback.
- **Semantic lock:** exact labels and existing numbers remain correct throughout
  motion. They do not spin, count, morph, or flicker for decoration.

## Runtime and website contract

- Master duration: `12.0 s` = `3 × 4.0 s` clips.
- Beat map inside each clip: `0.0–1.2 s setup`, `1.2–3.4 s operation`,
  `3.4–4.0 s reaction + stable hold`.
- Export: `1920×1080`, `30 fps`, H.264 `.mp4` plus VP9 `.webm`, no baked
  narration, optional restrained SFX stem.
- Website: muted autoplay, inline, continuous loop, visible pause/resume button,
  poster image, and no restart when a project card merely receives hover.
- `prefers-reduced-motion: reduce`: show the final verified poster and the six
  textual steps; do not autoplay.
- Mobile: use `1280×720` derivatives, disable parallax, retain the same semantic
  order, and keep key labels inside the central 70% safe area.
- Loading: poster first; lazy-load video only when the project approaches the
  viewport; stop decoding when far off-screen.

## Reference asset manifest

| Project | Master board | Stage references |
| --- | --- | --- |
| EvidenceOps | `images/project-films/storyboards/evidenceops-master.png` | `evidenceops-01.png` … `evidenceops-06.png` |
| CarePlan | `images/project-films/storyboards/careplan-master.png` | `careplan-01.png` … `careplan-06.png` |
| Dynamics Atlas | `images/project-films/storyboards/dynamics-master.png` | `dynamics-01.png` … `dynamics-06.png` |
| HSP90 / LiGaMD | `images/project-films/storyboards/hsp90-master.png` | `hsp90-01.png` … `hsp90-06.png` |

Detailed prompts and timecodes:

- [EvidenceOps](./evidenceops.md)
- [CarePlan](./careplan.md)
- [Dynamics Atlas](./dynamics-atlas.md)
- [HSP90 / LiGaMD](./hsp90-ligamd.md)

## Final acceptance gate before site integration

1. Without adjacent copy, can a reviewer name the input, operation, stop/gate,
   human boundary, and final recorded object?
2. Does every label match the actual project vocabulary?
3. Does the Agent remain suggestion-only where required?
4. Does CarePlan stop at reviewer-owned authority?
5. Does HSP90 end at `NO MODEL SELECTED`, with no visual winner?
6. Are all paper titles, patient data, model metrics, dates, signatures, and IDs
   either exact source-backed facts or clearly synthetic placeholders?
7. Does the loop reset by returning the physical state, not by a visible jump?
8. Does the reduced-motion version preserve the same explanation?

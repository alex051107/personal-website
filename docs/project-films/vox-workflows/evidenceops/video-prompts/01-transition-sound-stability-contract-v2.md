# EvidenceOps · v2 transition, stability, text, and sound contract

This is the production contract for one 12-second editorial sequence. It supplements future shot prompts; it is not permission to use the unconfirmed v2 keyframes as final video inputs.

## Sequence structure

| Sequence time | Shot | Meaning | Dominant motion |
|---|---|---|---|
| `00:00–00:04` | 01 | papers narrow to an inspectable passage | selected paper advances toward passage window |
| `00:04–00:08` | 02 | candidate passages are checked for exact support | index travels across candidates; one mismatch exits |
| `00:08–00:12` | 03 | source-linked record reaches a human boundary | human inspects; record moves to archive tray |

The film contains three editorial shots because the explanation has three distinct semantic changes. It is still one film and one continuous visual world. Other project films may use four to six internal cuts when their workflow needs them; three is not a global limit.

## Global stability contract

### Camera

- Preserve the uploaded image as the exact first frame.
- Hold the first frame for `0.30 s` before object motion.
- Use one slow camera translation only, no more than `5%` of frame width.
- Camera rotation: `0–1°` total. Lens and horizon remain fixed.
- No dolly zoom, orbit, whip pan, handheld shake, focus breathing, or automatic reframing.
- Hold a stable edit handle for the final `0.35 s`; this hold is inside the declared duration.

### Identity registry

Every shot prompt must list all visible moving carriers and their counts. A named carrier keeps the same material, silhouette, label, scale, front/back orientation, and route for the entire shot.

- no new paper, label, hand, page, hinge, tray, rail, or form may appear
- no object may split, merge, duplicate, dissolve, teleport, or change material
- at most one third of visible objects move at once
- stationary anchors are named explicitly and remain pixel-stable apart from camera parallax
- rejected and accepted carriers must remain distinguishable; rejection never deletes the evidence trail

### Text as texture

For each readable label define: exact token, case, number of lines, carrier ID, initial position, and final position. The label is a planar ink texture rigidly attached to that carrier.

- no re-typesetting, spelling change, extra glyph, character morph, mirroring, flicker, blur, disappearance, duplication, or carrier swap
- text-bearing carriers may translate or rotate only as rigid paper cut-outs
- a label may not fold behind another object unless the prompt explicitly preserves its visibility
- all non-label paper content remains neutral non-readable line texture
- narration and explanatory captions are added later as tracked HTML/SVG or post-production overlays

## Match cut 1 · shot 01 to shot 02

### Outgoing action, shot 01 local time `03.55–04.00`

The `PASSAGE 03` carrier continues moving left-to-right. A blank charcoal-and-ivory foreground paper tab attached to the same route crosses the lens plane from left to right. At `03.88 s` it covers at least 75% of the frame. Motion blur applies only to this blank wipe tab; `PASSAGE 03` and all printed labels remain sharp until occluded.

### Edit

Cut during maximum occlusion, within a 4–6 frame window centered on sequence time `04.00 s`. No dissolve, generative morph, flash, or black frame.

### Incoming action, shot 02 local time `00.00–00.35`

Begin with a matching blank foreground paper edge occupying the same region and continuing in the same left-to-right direction. As it clears, the four candidate carriers are revealed on the continuation of the same charcoal route. Hold the first unobstructed candidate layout for at least `0.20 s` before the index begins.

### Sound bridge

Start a soft paper-slide pre-lap `100 ms` before the cut. Carry its tail `160 ms` into shot 02. Place one quiet dry index click `40–80 ms` after the cut. Do not place a cinematic impact on the cut.

## Match cut 2 · shot 02 to shot 03

### Outgoing action, shot 02 local time `03.50–04.00`

After the mismatch rests in `REJECTED`, the accepted source carrier moves toward frame right as one rigid cut-out. A blank attached paper margin passes close to camera and covers at least 70% of the frame by `03.90 s`. `PAPER A–D`, `EXACT SUPPORT`, and `REJECTED` do not mutate while visible.

### Edit

Cut on the continuing rightward paper motion in a 4–6 frame window centered on sequence time `08.00 s`. Do not crossfade two incompatible layouts.

### Incoming action, shot 03 local time `00.00–00.35`

The same-direction paper margin clears to reveal the open source-linked record. The central hinge and `SOURCE ATTACHED` plate occupy the motion endpoint. The human hand remains completely still during this reveal and begins its inspection only after the frame has been stable for `0.20 s`.

### Sound bridge

Start a lighter paper-fiber scrape `80 ms` before the cut and continue it `180 ms` into shot 03. Add a quiet hinge tick `100 ms` after the cut. Continuous room tone prevents the one-second silence present in v1.

## Loop cut · shot 03 to shot 01

At `11.65–12.00`, the background intake stack advances slightly along the upper-left paper route without creating a new page. A blank foreground paper edge enters at the same upper-left position used by shot 01. Cut during the edge motion to the original intake stack. Keep movement direction and paper scale within 5% across the boundary. If a matte is needed, use a 6–8 frame paper-fiber luma wipe; no fade to black.

## Sound event map

All sound is post-production. The video generator produces silent visuals.

| Sequence time | Event | Sound |
|---|---|---|
| `00:00–12:00` | continuous bed | very low archive-room air and paper-room tone; no tonal music |
| `00:45` | selected page unlocks | short dry paper latch, no metallic ring |
| `01:20` | passage enters frame | soft paper-on-paper slide |
| `01:90–02:65` | four field tabs confirm | four restrained paper/foil ticks, evenly staggered |
| `03:90–04:16` | match cut 1 | one continuous paper wipe spanning the cut |
| `04:45–05:35` | candidate index | four tiny editorial ticks with descending intensity |
| `05:55–06:55` | exact-support rows | four muted foil-lock clicks; no success chime |
| `06:90–07:45` | mismatch exits | paper rail scrape ending in a soft tray stop |
| `07:92–08:18` | match cut 2 | paper-fiber scrape spanning the cut |
| `08:45` | human inspection | single pencil-to-paper touch; no writing or signature sound |
| `09:20–10:15` | record closes | two-layer paper fold plus quiet hinge texture |
| `10:35–11:20` | record enters tray | low paper drawer slide, then one dry stop |
| `11:75–00:12` | loop pre-lap | soft intake-paper rustle crossing the loop boundary |

### Mix targets

- SFX stem before narration: target `-24 LUFS ± 2 LU`, true peak no higher than `-3 dBTP`
- final web mix with narration, if added: target approximately `-18 LUFS`, true peak no higher than `-1 dBTP`
- no isolated transient near 0 dBFS
- no unmotivated silence longer than `250 ms`
- transition pre-laps and tails must remain audible across both cuts

## Production typography recommendation

The safest production path is to animate clean paper carriers and composite exact labels afterward as tracked SVG/HTML textures. If the generator preserves the label perfectly, the overlay may be omitted. If any glyph, spacing, or line break mutates, replace that label in post rather than repeatedly regenerating the entire shot.

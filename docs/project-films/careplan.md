# CarePlan — 12-second micro-film

## Story thesis

A plausible biomedical draft is useful only after software rules control
eligibility, duplicate work, schema, state, and reviewer authority.

Suggested voice-over:

> CarePlan checks a synthetic order before AI drafting, keeps the draft inside
> valid state transitions, and stops at a reviewer-owned decision.

## Timecode and reference frames

| Time | Beat | Visible event | Reference |
| --- | --- | --- | --- |
| `0.0–1.6` | Synthetic order | An order arrives with version, current state, and hard-stop flags. | `careplan-01.png` |
| `1.6–3.4` | Eligibility | Deterministic eligibility runs first; an ineligible order diverts to `STOP`. | `careplan-02.png` |
| `3.4–4.0` | Hold | The eligible route and stop tray remain visible together. | — |
| `4.0–5.6` | Versioned queue | Duplicate keys lock; one idempotent job advances. | `careplan-03.png` |
| `5.6–7.4` | Draft only | Typed fields are filled inside a bounded chamber; approval is absent. | `careplan-04.png` |
| `7.4–8.0` | Hold | `DRAFT ONLY` and `APPROVAL FIELD ABSENT` share the frame. | — |
| `8.0–9.6` | Validate | Schema and allowed state transitions resolve; invalid routes stay blocked. | `careplan-05.png` |
| `9.6–11.4` | Human boundary | The card reaches `REVIEW PENDING`; the human lever remains outside automation. | `careplan-06.png` |
| `11.4–12.0` | Loop return | A new synthetic order enters as the previous card remains review-pending. | `careplan-01.png` |

## Copy-ready keyframe prompts

### 01 — Synthetic order

```text
Create a 16:9 cinematic keyframe for CarePlan, a synthetic biomedical workflow prototype. A stack of neutral paper cards enters an intake rail; the top card has large physical fields reading “SYNTHETIC ORDER”, “VERSION 01”, “CURRENT STATE: NEW”, and “HARD-STOP FLAGS”. The checkboxes are generic: DUPLICATE, INVALID TRANSITION, MISSING REQUIRED FIELD. No patient name, diagnosis, prescription, identifier, or real medical data appears. Premium editorial documentary style, warm ivory paper, carbon-black desk, oxidized brass rails, muted sage signal, subtle ink texture, realistic miniature workflow, soft side light, shallow depth, 35mm lens, clean negative space. The order card is the only active object. No hospital, clinician portrait, medical icon collage, robot, neon, generic AI graph, glossy SaaS screen, dense fake text, warped labels, or watermark.
```
### 02 — Eligibility hard stop

```text
Create a 16:9 cinematic keyframe showing a deterministic eligibility hard stop before any AI drafting. A synthetic order card reaches a physical split gate labeled “ELIGIBILITY”. The left route reads “ELIGIBLE / CONTINUE”; the right side tray reads “STOP / HARD-STOP FLAG”. One duplicate synthetic card is visibly diverted into STOP while one eligible card remains on the main rail. The AI drafting chamber is distant and inactive, proving that this rule runs first. Premium warm ivory, carbon black, oxidized brass, muted sage, restrained red only on the stop tray, subtle paper grain, museum-exhibit production design, soft side light, shallow depth, clear central labels. No real patient data, clinical claim, autonomous model, robot, blue-purple neon, random medical symbols, success celebration, dense UI, watermark, or unreadable micro-copy.
```

### 03 — Versioned idempotent queue

```text
Create a 16:9 cinematic keyframe for a versioned, idempotent workflow queue. Three neutral synthetic order cards occupy parallel carbon-black slots under a large physical sign reading “VERSIONED QUEUE”. Two cards share the same generic key “ORDER-01 / V1” and are visibly locked together; only one job token is allowed to advance. A small brass rule plate reads “ONE DRAFT PER KEY”. Warm ivory paper, oxidized brass locks and rollers, muted sage signal, restrained editorial science documentary, realistic miniature mechanics, soft side light, shallow depth, clean negative space, 35mm lens. The lock communicates duplicate handling, not decoration. No patient identity, medical details, cloud-dashboard UI, robot, generic network, blue-purple neon, decorative conveyor clutter, distorted text, or watermark.
```

### 04 — Draft only

```text
Create a 16:9 cinematic keyframe for a bounded AI drafting chamber in a synthetic biomedical workflow. One versioned order card enters a transparent carbon-and-brass enclosure. A mechanical pen fills only a compact set of typed fields labeled “PLAN TYPE”, “RATIONALE”, and “REVIEW NOTES”. A large plate above reads “DRAFT ONLY”; a separate sealed plate reads “APPROVAL FIELD ABSENT”. The pen never touches an approve or reject control. Premium warm ivory paper, carbon black, oxidized brass, muted sage accent, subtle ink texture, soft cinematic side light, shallow depth, precise museum-exhibit miniature design. Use generic synthetic values only, no patient data or treatment instruction. No doctor, hospital, autonomous approval, robot face, glowing brain, purple-blue neon, glossy chatbot UI, dense text, or watermark.
```

### 05 — Schema and state validation

```text
Create a 16:9 cinematic keyframe showing software validation after a typed draft. The draft card sits in the center of a physical state board. On the left are two large checks: “SCHEMA” and “STATE TRANSITION”. The allowed path NEW → DRAFT → REVIEW PENDING is a restrained sage rail; invalid shortcuts from DRAFT directly to APPROVED are blocked with carbon shutters and a small red “INVALID” marker. The image explains state ownership, not model confidence. Premium editorial workflow, warm ivory paper, carbon black, oxidized brass, muted sage, subtle ink grain, soft side light, shallow depth, clear central typography, realistic miniature depth. No real patient content, clinical result, autonomous approval, generic AI network, blue-purple cyberpunk, excessive arrows, glossy SaaS UI, warped text, or watermark.
```

### 06 — Review pending / human authority

```text
Create a 16:9 cinematic keyframe showing the human boundary of CarePlan. A validated synthetic draft card stops in a slot labeled “REVIEW PENDING”. A physical human-authority lever sits outside the automated enclosure; a natural hand rests on the brass handle but has not yet moved it. A plate reads “HUMAN REVIEWER OWNS FINAL DECISION”. Behind the card, the AI pen and validation rails are visibly inactive. Premium warm ivory paper, carbon black, oxidized brass, muted sage, restrained documentary lighting, realistic miniature depth, 50mm composition, clean negative space. No face, patient data, treatment recommendation, automatic approval, success badge, robot, neon, generic AI graph, glossy software panel, fake signature, or watermark.
```

## Copy-ready image-to-video prompts

### Clip 01 — Order to eligibility (`0.0–4.0 s`)

```text
镜头时长：4 秒。Use the supplied CarePlan Synthetic Order keyframe as the exact first frame and the Eligibility frame as the end-state reference. Preserve all cards, labels, checkboxes, warm ivory/carbon/brass/sage palette, perspective, and lighting. 0.0–1.2s: the top SYNTHETIC ORDER card settles and its VERSION, CURRENT STATE, and HARD-STOP FLAGS tabs unfold without changing text. 1.2–3.4s: the camera tracks forward once as the card reaches ELIGIBILITY; one duplicate card takes the visible STOP branch while the eligible card stays on the main rail. The drafting chamber remains inactive in the distance. 3.4–4.0s: hold both CONTINUE and STOP outcomes in one readable frame. Forward-only card motion, no cut, no model activity before the rule. Lock all glyphs and fields; forbid mutation, gibberish, duplication, flicker, mirroring, or patient data. SFX: paper feed, one gate clack, one muted stop catch.
```

### Clip 02 — Queue to bounded draft (`4.0–8.0 s`)

```text
镜头时长：4 秒。Use the supplied CarePlan Versioned Queue keyframe as the exact first frame and the Draft Only frame as the composition target. Preserve the three slots, duplicate keys, locks, order geometry, physical labels, palette, perspective, and lighting. 0.0–1.2s: two ORDER-01 / V1 cards approach together; one brass idempotency lock closes and only one job token remains active. 1.2–3.4s: the camera makes one steady push along that token into the transparent drafting chamber; a pen fills PLAN TYPE, RATIONALE, and REVIEW NOTES while APPROVAL FIELD ABSENT remains sealed and unchanged. 3.4–4.0s: stop on the DRAFT ONLY plate and hold. No cut, no approval gesture, no new field, no clinical content. Lock all text and forbid glyph changes, flicker, duplication, floating UI, robot imagery, or neon. SFX: lock click, card slide, three quiet pen strokes, chamber stop.
```

### Clip 03 — Validate to reviewer boundary and loop (`8.0–12.0 s`)

```text
镜头时长：4 秒。Use the supplied CarePlan Validate keyframe as the exact first frame and the Review Pending frame as the end-state reference. Preserve the state board, draft card, allowed and blocked paths, label spelling, palette, perspective, and lighting. 0.0–1.2s: SCHEMA and STATE TRANSITION checks resolve in order; invalid DRAFT → APPROVED shortcuts close behind carbon shutters. 1.2–3.2s: the camera tracks with the validated card to REVIEW PENDING and stops outside the inactive automation chamber; the external human lever enters focus, but automation never moves it. 3.2–3.6s: a fresh SYNTHETIC ORDER card appears on the far-left intake rail while the existing card remains review-pending. 3.6–4.0s: hold the two states for a seamless loop cut. Lock text; no automatic decision, patient data, clinical result, face reveal, robot, neon, or subtitle. SFX: two validation clicks, rail stop, quiet lever-room ambience, new-card rustle.
```

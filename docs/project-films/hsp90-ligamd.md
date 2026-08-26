# HSP90 / LiGaMD — 12-second micro-film

## Story thesis

Thousands of simulation frames still belong to one protein–ligand system and
one experimental label. The evaluation must aggregate replicas, hold out exact
ligand groups, and stop when improvement is unstable.

Suggested voice-over:

> Three LiGaMD replicas become one system row, exact ligands stay in the same
> fold, and an interval crossing zero leaves no model selected.

## Timecode and reference frames

| Time | Beat | Visible event | Reference |
| --- | --- | --- | --- |
| `0.0–1.6` | Three replicas | Three trajectory ribbons remain attached to one HSP90–ligand system and one assay-derived pKoff label. | `hsp90-01.png` |
| `1.6–3.4` | Per-replica features | Each replica independently reaches sustained exit, selects 512 frames, and yields one Dynamic10 vector. | `hsp90-02.png` |
| `3.4–4.0` | Hold | All three Dynamic10 vectors remain separate and visible. | — |
| `4.0–5.6` | One system row | Corresponding Dynamic10 features average; `Static20 + mean Dynamic10` becomes one row. | `hsp90-03.png` |
| `5.6–7.4` | Leakage gate | N31 systems sort into 27 exact-ligand groups before folds; preprocessing stays fold-local. | `hsp90-04.png` |
| `7.4–8.0` | Hold | Identical ligand tokens stay locked in one group car. | — |
| `8.0–9.6` | Fixed comparison | Four fixed regressors and a grouped dummy use the same rows, folds, and group-equal metric. | `hsp90-05.png` |
| `9.6–11.4` | Stability decision | The paired improvement interval crosses zero; the decision settles at `NO MODEL SELECTED`. | `hsp90-06.png` |
| `11.4–12.0` | Loop return | The three replica ribbons reappear behind the decision board. | `hsp90-01.png` |

## Copy-ready keyframe prompts

### 01 — Three replicas, one system, one label

```text
Create a 16:9 cinematic keyframe for an HSP90 / LiGaMD scientific machine-learning workflow. Three distinct molecular trajectory ribbons labeled “REPLICA 1”, “REPLICA 2”, and “REPLICA 3” converge toward one physical card labeled “ONE HSP90–LIGAND SYSTEM”. A separate attached card reads exactly “ASSAY-DERIVED pKoff”; use lowercase p, uppercase K, lowercase off. The single label card is visibly shared by all three replicas, not copied three times. Premium editorial science documentary, warm ivory paper, carbon black, oxidized brass, muted copper-brown signal, subtle ink texture, restrained molecular linework, museum-exhibit production design, soft side light, shallow depth, clean negative space. No IC50, simulated physical koff, real ligand identity, real assay value, robot, generic AI network, blue-purple neon, DNA decoration, glossy dashboard, warped label, or watermark.
```
### 02 — Sustained exit, 512 frames, Dynamic10

```text
Create a 16:9 cinematic keyframe showing three independent replica feature paths. Each of the three trajectory ribbons passes its own physical marker labeled “SUSTAINED EXIT”, then its own film strip labeled “512 FRAMES”, then its own compact card labeled “DYNAMIC10 / REPLICA 1”, “DYNAMIC10 / REPLICA 2”, or “DYNAMIC10 / REPLICA 3”. The three paths remain parallel and are not concatenated into extra labels. Premium warm ivory paper, carbon-black rails, oxidized brass, muted copper-brown, subtle film-grain and scientific notation texture, soft side light, shallow depth, precise museum-instrument miniature, clear central labels. The numbers 512 and 10 are immutable and must not roll, count, morph, or duplicate. No physical koff claim, real result value, winner badge, robot, glowing molecule cloud, purple-blue neon, dense fake chart, or watermark.
```

### 03 — One system row

```text
Create a 16:9 cinematic keyframe explaining the evaluation unit in HSP90 / LiGaMD. Three separate cards labeled “DYNAMIC10 / R1”, “DYNAMIC10 / R2”, and “DYNAMIC10 / R3” feed into one restrained averaging bridge labeled “MEAN CORRESPONDING FEATURES”. The bridge outputs one card labeled “MEAN DYNAMIC10”. That card combines with one “STATIC20” card to form exactly one large physical row labeled “ONE SYSTEM ROW / STATIC20 + MEAN DYNAMIC10”. The three replicas never become three training labels. Premium editorial science documentary, warm ivory paper, carbon black, oxidized brass, muted copper, subtle ink texture, soft side light, clean flat-lay composition, shallow depth. Numbers 10 and 20 remain fixed. No concatenation of trajectories, model result, real metric, robot, generic network, neon, decorative equation cloud, glossy UI, warped text, or watermark.
```

### 04 — Exact-ligand grouped folds

```text
Create a 16:9 cinematic keyframe showing leakage control for the HSP90 evaluation. Neutral system-row tokens first enter a sorting table labeled “N31 SYSTEMS → 27 EXACT-LIGAND GROUPS”. Tokens that share the same ligand silhouette lock into the same physical group car; each car must move as one unit toward TRAIN or TEST fold rails. A small paper tab reads “FOLD-LOCAL PREPROCESSING”. No identical ligand token appears on both sides of one fold boundary. Premium warm ivory paper, carbon black, oxidized brass, muted copper-brown, restrained rail-and-archive metaphor, soft side light, shallow depth, realistic miniature depth, clear central labels. N31 and 27 are immutable; do not animate them like counters. No random split, frame-level split, glowing network, robot, neon, DNA icon, real ligand name, fake metric, glossy UI, or watermark.
```

### 05 — Four fixed pipelines, same folds

```text
Create a 16:9 cinematic keyframe for a fair model comparison. Four restrained instrument rows labeled “STATIC20 RIDGE”, “STATIC20 RF”, “COMBINED30 RIDGE”, and “COMBINED30 RF” plus one lower row labeled “GROUPED DUMMY” receive the same system-row tokens from one shared fold rail. A physical plate reads “SAME ROWS · SAME FOLDS · GROUP-EQUAL METRIC”. No row is crowned, highlighted as a winner, or enlarged. Premium editorial scientific instrument table, warm ivory paper, carbon black, oxidized brass, muted copper-brown, subtle ink texture, soft side light, shallow depth, precise alignment, readable central labels. Model names and fold identities are immutable. No accuracy trophy, autonomous selection, fake score, random bar animation, robot, blue-purple neon, generic AI graph, glossy dashboard, or watermark.
```

### 06 — Interval crosses zero, no model selected

```text
Create a 16:9 cinematic keyframe for the recorded HSP90 / LiGaMD selection decision. A large paired-bootstrap interval chart lies flat on a warm paper table with one clear vertical marker labeled “ZERO”. The candidate interval visibly extends across that marker. Beside it, a large physical decision card reads exactly “NO MODEL SELECTED”. In the background, three replica ribbons curl back toward one HSP90–ligand system card and one “ASSAY-DERIVED pKoff” card. Do not render a winner or improvement badge. Premium warm ivory paper, carbon black, oxidized brass, muted copper, soft side light, restrained statistical documentary design, shallow depth, clean safe labels. Leave exact numeric interval endpoints for HTML overlay rather than inventing them in the raster. No IC50, physical koff claim, broad generalization, trophy, green success glow, robot, neon, fake metrics, warped typography, or watermark.
```

## Copy-ready image-to-video prompts

### Clip 01 — Three replicas to three Dynamic10 vectors (`0.0–4.0 s`)

```text
镜头时长：4 秒。Use the supplied HSP90 Three Replicas keyframe as the exact first frame and the 512 Frames → Dynamic10 frame as the end-state reference. Preserve the HSP90–ligand system card, one assay-derived pKoff card, three ribbon identities, label spelling, colors, perspective, and lighting. 0.0–1.2s: keep the camera nearly locked while REPLICA 1, 2, and 3 ribbons unfurl at different restrained speeds toward the same system card; the single label never duplicates. 1.2–3.4s: the three paths fan outward into independent sustained-exit markers, each reveals exactly one 512-frame film strip, and each compresses into its own Dynamic10 card. Numbers 512 and 10 remain correct and never roll or re-count. 3.4–4.0s: all three vectors hold separately. No cut, no extra label, no physical koff implication. Lock all glyphs; forbid flicker, morphing, duplication, neon, or robot imagery. SFX: three soft ribbon passes, three endpoint clicks, one low compression tone.
```

### Clip 02 — One system row to exact-ligand folds (`4.0–8.0 s`)

```text
镜头时长：4 秒。Use the supplied One System Row keyframe as the exact first frame and the Exact-Ligand Groups frame as the end-state reference. Preserve all feature-card labels, system-row geometry, ligand token shapes, N31, 27, palette, perspective, and lighting. 0.0–1.2s: corresponding positions on the three Dynamic10 cards align and average into one MEAN DYNAMIC10 card; combine it once with STATIC20 to form exactly one system row. 1.2–3.4s: perform one continuous fold-rail tracking move as many system rows enter the grouping table; identical ligand silhouettes lock into the same car before TRAIN and TEST rails separate. N31 and 27 remain immutable and do not count, spin, or change. 3.4–4.0s: hold one locked group car at the fold boundary with FOLD-LOCAL PREPROCESSING visible. No frame-level split, cut, random shuffle, or label mutation. SFX: averaging chime, one row clamp, ligand-car locks, rail switch.
```

### Clip 03 — Same-fold comparison to no selection and loop (`8.0–12.0 s`)

```text
镜头时长：4 秒。Use the supplied Same Folds keyframe as the exact first frame and the No Model Selected frame as the end-state reference. Preserve the four fixed model rows, grouped dummy, shared fold rail, labels, interval chart, ZERO marker, palette, perspective, and lighting. 0.0–1.2s: the same folded system tokens pass once through all five rows; only small mechanical indicators move and no model is visually crowned. 1.2–3.2s: make one slow interval-tabletop pullback as paired uncertainty bars settle on the chart; the candidate interval visibly crosses ZERO and the physical card NO MODEL SELECTED rises without celebration. Existing numbers and model names remain fixed—no slot-machine counter effect. 3.2–3.6s: the three replica ribbons reappear behind the decision board and curve toward the opening system card. 3.6–4.0s: stable loop hold. No green winner, fake score, physical koff claim, broad generalization, text mutation, robot, neon, or subtitle. SFX: five equal instrument ticks, paper interval slide, restrained decision latch, three-ribbon return.
```

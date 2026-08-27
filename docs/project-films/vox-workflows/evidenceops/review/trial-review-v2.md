# EvidenceOps VOX v2 trial review

## Scope

Reviewed the three generated files in `media/trial-vox-v2/` at original resolution. This review checks medium, project meaning, readable tokens, object grammar, and whether the images can serve as first frames. It does not claim the resulting video has been generated or approved.

## SHOT-001

**Result: suitable as a v2 trial.**

- visibly cut paper, halftone, paper fibers, dry print texture, and limited ochre replace the v1 metal-and-glass miniature
- the intake stack, selected `PAPER A`, `PASSAGE 03`, and attached field tabs tell one causal step
- allowed labels are present and readable: `SYNTHETIC DEMO`, `PAPER A`, `PASSAGE 03`, `TEXT`, `VALUE`, `UNIT`, `CONTEXT`
- body copy reads as line texture rather than a scientific claim
- the blank route in the upper-right can provide a rightward paper-wipe exit

## SHOT-002

**Result: suitable as a v2 trial.**

- four candidates remain distinct and countable
- `EXACT SUPPORT` and the four field rows are tied to one visible inspection plate
- the `REJECTED` tray is a physical side route, not a red error state
- all allowed labels are present with no extra headline or score
- the long left-to-right rail supports a continuation from shot 1 and an outgoing source-card wipe toward shot 3

## SHOT-003

**Result: suitable as a v2 trial.**

- the cut-out human hand is visibly editorial rather than photoreal product photography
- the attached source, review boundary, and archive tray remain in one frame
- `HUMAN REVIEW`, `SOURCE ATTACHED`, and `RECORDED` are readable; `SOURCE ATTACHED` intentionally occupies two lines on one fixed carrier
- no signature, date, approval state, clinical conclusion, or autonomous action appears
- the upper-left intake stack can support a motivated loop back to shot 1

## Remaining production risks

1. Generative video may still mutate small labels. Exact labels should be replaced by tracked SVG/HTML overlays if any glyph changes.
2. The generator may duplicate paper during the shot-2 rejection move. The video prompt must enumerate carrier IDs and move only one carrier at a time.
3. A prompt asking for a “smooth transition” may morph the entire layout. The edit must instead use the foreground-paper match cuts defined in `video-prompts/01-transition-sound-stability-contract-v2.md`.
4. These images establish EvidenceOps only. The three continuous-master trials for CarePlan, Dynamics Atlas, and HSP90/LiGaMD are continuity references, not final VOX keyframes.

## Gate

State remains `trial-generated`. New per-shot Omni/Flow prompts are blocked until the user explicitly confirms or rejects the v2 trial images.

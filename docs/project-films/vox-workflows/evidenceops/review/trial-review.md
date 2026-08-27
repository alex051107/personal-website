# EvidenceOps mandatory trial review

## Trial outputs

| Shot | File | Visible workflow meaning |
| --- | --- | --- |
| `SHOT-001` | `media/trial/SHOT-001.png` | synthetic papers narrow to one exact passage with attached field tabs |
| `SHOT-002` | `media/trial/SHOT-002.png` | four candidates reach an exact-support mechanism and visible rejected branch |
| `SHOT-003` | `media/trial/SHOT-003.png` | a source-attached claim reaches a human-owned desk and durable record drawer |

## Structural check

```text
PASS trial shots=3 manifest-parity=100% media=3
```

All three images are `1672 × 941` PNG files. The shot map and keyframe manifest have exact ID, scene-text, and carrier-mapping parity.

## Manual visual review

- **Text accuracy:** all required labels are readable and correctly spelled; no required token is missing or duplicated.
- **SHOT-001:** `SYNTHETIC DEMO`, `PAPER A`, `PASSAGE 03`, `TEXT`, `VALUE`, `UNIT`, and `CONTEXT` are attached to distinct physical carriers.
- **SHOT-002:** `PAPER A–D`, `TEXT`, `VALUE`, `UNIT`, `CONTEXT`, `EXACT SUPPORT`, and `REJECTED` are readable in one frame; alternatives and the rejected route stay visible.
- **SHOT-003:** `HUMAN REVIEW`, `SOURCE ATTACHED`, and `RECORDED` are readable; the hand does not cover the hinge and no approval control exists.
- **Continuity:** all three frames share carbon black, warm ivory paper, oxidized brass, muted ochre, shallow depth, and the same rail-based miniature world.
- **Meaning before decoration:** intake, comparison, gate, rejection, human boundary, and durable record are visible without relying on surrounding website copy.
- **Claim boundary:** no real paper title, author, DOI, institution, date, signature, metric, biomedical conclusion, or autonomous scientific approval is presented.
- **Video feasibility:** each frame contains the physical rails, tabs, indicators, hinge, hand, and drawer needed for its planned single-camera animation.

## Known boundary

Paper-body marks are intentionally non-semantic line texture. Only the explicitly mapped physical labels may be treated as content. The public site has not been changed and no video prompt has been generated at this gate.

## Current gate

State is `trial-generated`. Explicit user approval of these three images is required before the remaining project keyframes or any video prompts are produced.

# EvidenceOps storyboard validation report

## Deterministic check

Command:

```text
node ~/.codex/skills/vox-video-prompt-workflow/scripts/validate-storyboard.mjs --project docs/project-films/vox-workflows/evidenceops
```

Final result:

```text
PASS storyboard shots=3 sequence=001..003 durations=4|6|8 typography=100%
```

The validator was run once on the first complete storyboard and once after the manual semantic review changed the visible field vocabulary. No full site build or independent review was run because this batch adds prompt-workflow documents only and does not change the public page.

## Manual semantic review

- **Narration coverage:** three unique source spans cover the full narration in order.
- **One-camera discipline:** overhead push, lateral rail trace, and dolly-back are each used once.
- **Project vocabulary:** visible field checks match the current website contract: `TEXT`, `VALUE`, `UNIT`, `CONTEXT`.
- **Input clarity:** synthetic papers visibly narrow to one versioned passage rather than implying that a paper title alone is evidence.
- **Gate clarity:** the accepted source remains attached while a mismatch moves to the visible `REJECTED` branch.
- **Human boundary:** the reviewer inspects the attachment; no approval, release, signature, or scientific conclusion is generated.
- **Durable result:** `RECORDED` means a source-linked review record, not validated scientific truth or production deployment.
- **Truth boundary:** no real title, author, DOI, institution, date, metric, or biomedical conclusion is permitted in scene text.
- **Visual continuity:** all three shots retain warm ivory paper, carbon black, oxidized brass, and muted ochre without the Skill's default hot-red treatment.

## Current gate

State remains `models-confirmed`. The storyboard must receive explicit user approval before the mandatory first-three-keyframe trial can be generated.

# EvidenceOps first video audit · 2026-08-26

## Verdict

The 12-second first generation communicates a three-step route, but it is not yet a VOX paper-collage film. The model followed the original prompt accurately: that prompt asked for a photorealistic editorial miniature and museum-exhibit depth. The medium, not merely the transitions, must be corrected at the keyframe level.

## Observed media facts

- source: `/Users/liuzhenpeng/Downloads/初始场景_-_2026-08-26_202608260918.mp4`
- duration: `12.036003 s`
- video: H.264, `1280 × 720`, approximately `24 fps`
- audio: AAC, `48 kHz`, stereo
- detected hard cuts: `4.036003 s` and `8.036003 s`
- integrated loudness: approximately `-31.3 LUFS`
- loudness range: approximately `17.7 LU`
- true peak: approximately `+0.4 dBFS`
- detected silence: `7.862896–8.122729` and `8.430354–9.448937`

These measurements describe this file only. They are not claims about the generator in general.

## Root cause

The v1 style and keyframe prompts explicitly used:

- `photorealistic editorial miniature set`
- `museum-exhibit production design`
- `realistic contact shadows`
- `shallow depth of field`
- `no flat infographic layout`

Those instructions bias the result toward a brass-and-glass tabletop machine. Extending the video prompt cannot turn that start frame into a VOX collage without introducing unstable morphing. The correct repair is to establish new paper-collage keyframes first, then animate them.

## Visual findings

### 1. The medium is wrong

The result reads as a steampunk museum miniature. A VOX-style explainer needs visible cut-paper layers, scissor or torn fibers, halftone and photocopy texture, limited color, editorial framing, and shallow paper-plane parallax. It should not rely on deep photorealistic metal, glass, lens bokeh, or cinematic product rendering.

### 2. The two transitions are unmotivated hard cuts

At both detected cut times the outgoing frame and incoming frame lack a shared foreground object, movement direction, or sound bridge. The viewer sees three separate demonstrations rather than one causal explanation.

### 3. Object identity drifts

- Near the end of shot 1, extra paper forms appear at the right edge and the selected passage framing changes.
- In shot 2, a paper carrier appears to split as the rejected route moves, making it unclear whether the same candidate was inspected and rejected.
- In shot 3, the model invents a signature-like mark, extra form text, and an additional page. The source-attached relationship becomes harder to trace as the record closes.

### 4. Text is not a locked physical texture

Primary labels survive for part of each shot, but smaller marks mutate. In shot 3, `SOURCE ATTACHED` disappears during the folding action. Text-bearing surfaces are being treated as generative content rather than immutable printed carriers.

### 5. Audio does not glue the film together

The file is quiet overall, but isolated transients approach or exceed digital full scale. The second cut is followed by a long silence, so shot 3 feels detached. The final mix needs a continuous low room/paper bed and deliberately overlapped transition sounds.

## v2 repair

1. Replace the photorealistic miniature start frames with the VOX paper-collage v2 trial in `media/trial-vox-v2/`.
2. Treat the output as one 12-second editorial sequence containing three motivated shots, not one literal generative take and not three unrelated clips.
3. Use foreground paper wipes and cut-on-action at the two edit points. Do not ask the model to morph one layout into another.
4. Give every visible object a fixed ID and count. Move at most one third of the visible objects at one time.
5. Lock all readable labels as planar textures attached to named carriers. Body copy remains deliberately unreadable line texture.
6. Generate visual-only clips. Build the sound design as a separate post-production stem.
7. For production typography, prefer tracked SVG/HTML overlays on fixed label plates when exact glyph stability matters more than generative integration.

## Current acceptance boundary

The three v2 images are new trial keyframes, not approved video inputs. The v1 keyframes were previously approved, but that approval does not transfer to a materially different visual medium. Per the VOX workflow, final per-shot video prompts should be regenerated only after explicit approval of the v2 trial.

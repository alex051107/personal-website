# Project stage visual audit

## Decision

The 24 generated JPEGs are visually polished, but they are too dependent on a
shared brass-machine metaphor. A visitor has to decode the metaphor before
they can understand the project. They remain in the repository as concept-art
archive assets, but they no longer serve as the explanatory stage images on
the home page.

The replacement is a deterministic set of 24 SVG storyboards. Each storyboard
shows one real input, operation, gate, branch, or recorded result. Labels are
part of the drawing, so the image and the adjacent stage copy use the same
vocabulary.

## Design system

- **Paper:** `#f2ead9` and `#ded2ba`
- **Carbon:** `#171613` and `#25231d`
- **Rule:** `#8d816b`
- **EvidenceOps signal:** `#c9a85b`
- **CarePlan signal:** `#9daa84`
- **Dynamics Atlas signal:** `#86a09b`
- **HSP90 / LiGaMD signal:** `#bd9562`
- **Typography:** one humanist sans hierarchy inside the drawings; monospace
  only for versions, states, hashes, gates, and metrics
- **Layout:** one large active scientific or workflow object, one visible
  transformation, and one plain-language takeaway per frame
- **Signature:** the active object moves through a labelled evidence rail;
  motion traces the actual operation rather than decorating the background

## Mapping

| Project | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 | Stage 6 |
| --- | --- | --- | --- | --- | --- | --- |
| EvidenceOps | passage + context | candidate span | four named fields | exact-support gate | side-by-side human review | source-linked record |
| CarePlan | synthetic order + state | eligibility hard stop | versioned, idempotent queue | typed draft without approval | schema + state validation | reviewer-owned decision |
| Dynamics Atlas | TaskPacket + two datasets | suggestion-only Locator Agent | registered compiler | six named gates | trace, receipt, bundle | human-scoped claim |
| HSP90 / LiGaMD | three replicas, one system | endpoint + 512 frames per replica | one system row | exact-ligand folds | fixed model comparison | uncertainty crosses zero; no selection |

## Self-critique before build

The first plan kept the old dark workbench and only added clearer captions.
That still asked the visitor to translate decorative machinery into software
semantics, so it was rejected. The revised plan spends visual complexity on
real domain objects and exact state changes. It keeps the site's paper-carbon
identity, but the four projects now have different compositions and signals.

## Acceptance questions

1. Can a visitor name the input without reading the paragraph beside it?
2. Does the active image show the exact operation named by the stage?
3. Is the stop or failure branch visible at the stage where it can occur?
4. Does the final frame show the actual recorded object or decision?
5. Can the four projects be distinguished when their titles are hidden?

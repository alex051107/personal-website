# Home Hero 3D Scene Plan

> Superseded after visual review. The rail / gate / drawer concept is retained
> as a versioned exploration, but the selected direction is now
> `hero-agent-harness-plan.md`.

## Status and boundary

- Observed: the home page is a static HTML/CSS/JavaScript portfolio with a
  locked warm-paper, carbon-ink, and muted-brass design system.
- Observed: the existing portrait remains the only portrait and stays
  unchanged at the opening right.
- Design proposal: add one interactive 3D scientific instrument to the home
  Hero. Generated source images and AI-generated meshes are conceptual design
  assets, not scientific results or screenshots.
- Delivery boundary: generate and inspect the source images first; create the
  Hunyuan models second; only then wire the final GLB assets into the page.

## Hero thesis

The scene is a **scientific decision instrument**, not a generic AI core. It
makes the portfolio's common workflow physically legible:

`scientific object -> bounded model move -> gate -> reviewable record`

The instrument sits on a paper-and-graphite bench. A project cartridge enters
from the front, a model carriage moves along one rail, a mechanical gate opens
only after a check, and a record drawer presents either a reviewable output or
an explicit stop state.

## Scene graph

```text
Hero
├── existing HTML copy
├── interactive 3D stage
│   ├── base / rail                      static anchor
│   ├── model carriage                   one finite translation + scan
│   ├── evidence gate                    one finite open / close rotation
│   ├── record drawer                    one finite slide
│   └── selected project cartridge       one of four lazy-loaded objects
│       ├── EvidenceOps                  passage + support apertures
│       ├── CarePlan                     versioned state blocks
│       ├── Dynamics Atlas               paired molecular-data reels
│       └── HSP90 / LiGaMD               three replica ribbons + ligand bead
└── existing real portrait              2D HTML figure; never regenerated
```

## Interaction story

1. The assembled instrument reveals once after the heading; no idle loop.
2. Pointer drag or arrow keys rotate the stage within a restrained +/-14 degree
   range. `R` resets the view.
3. Hover/focus raises a project cartridge. Click/Enter selects and loads it.
4. Selection runs one finite trace: cartridge seats, model carriage advances,
   gate evaluates, and the record drawer opens or the stop tab becomes visible.
5. HTML labels name `Input`, `Model move`, `Gate`, and `Record`; meaning is not
   baked into unreliable model texture text.
6. Reduced-motion mode snaps to each final state and keeps all controls usable.

## Local particle extension

The particle treatment is a Hero-specific exception to the site's general
no-particle rule. It does not become a background, cursor trail, portrait
effect, or decorative star field. It appears only inside the model carriage's
smoked-glass aperture, where it explains one concrete transformation:

`scientific object -> computable particle representation`

- Chosen subject: one compact protein-fold ribbon surrounding a small ligand
  cluster. The silhouette is deliberately recognisable as a molecular specimen,
  not a generic orb, brain, neural network, jellyfish, or abstract bloom.
- Visual treatment: dense off-white and graphite points with a restrained
  muted-brass ligand core. No blue-black, purple, cyan, neon bloom, or full-page
  glow.
- Resting state: the molecular silhouette remains legible and still.
- Entrance: particles assemble once after the model carriage opens, then stop.
- Pointer/focus state: only points inside a small inspection radius are pushed
  aside; the untouched points preserve the overall protein silhouette.
- Exit state: displaced points spring back to their recorded positions. There
  is no ambient breathing, random drift, or idle loop.
- Reduced-motion/data fallback: show the static particle still inside the
  aperture and skip particle simulation.

The molecular object is a conceptual AI-for-Science signifier, not a rendered
experimental structure or a claim that all four projects operate on proteins.
The four project cartridges and the HTML labels continue to carry the exact
project semantics.

## Image-to-3D source manifest

All mesh-source assets use the same three-quarter orthographic camera, neutral warm-paper
backdrop, soft studio daylight, crisp silhouette, and restrained materials:
matte graphite, off-white paper, smoked glass, porcelain, and oxidized muted
brass. No text, logos, people, neon, blue-black glow, or thin loose wires. The
single particle-reference still below is the local exception described above.

| File | Purpose | Hunyuan use |
| --- | --- | --- |
| `hero-scene-master-v1.png` | Assembled wide composition and material reference | visual reference only |
| `hero-base-rail-v1.png` | Low plinth, one rail, four mounting sockets | image-to-3D |
| `hero-model-carriage-v1.png` | Central bounded-model carriage with visible aperture | image-to-3D |
| `hero-gate-v1.png` | Two-leaf mechanical evidence gate | image-to-3D + component split |
| `hero-record-drawer-v1.png` | Archive drawer with stop/review tabs, no text | image-to-3D + component split |
| `hero-cartridge-evidenceops-v1.png` | Paper passage stack and four support windows | image-to-3D |
| `hero-cartridge-careplan-v1.png` | Versioned state blocks and authority latch | image-to-3D |
| `hero-cartridge-dynamics-v1.png` | Paired trajectory reels and locator pin | image-to-3D |
| `hero-cartridge-hsp90-v1.png` | Three replica ribbons and one ligand bead | image-to-3D |
| `hero-particle-representation-v1.png` | Final-state protein-ligand point-cloud reference and static fallback | visual reference only |

## Web model requirements

- Prefer GLB over FBX for the website.
- Generate the lowest useful polygon option first; the video demonstrates a
  1.5M-triangle output, which is inappropriate as a direct Hero payload.
- Keep named movable parts separate: `carriage`, `gate_left`, `gate_right`,
  `drawer`, `stop_tab`, and `cartridge`.
- Before integration, simplify meshes, remove hidden geometry, merge static
  materials, resize textures, and apply mesh/texture compression.
- Initial Hero 3D payload target: at most 2 MB. Non-selected cartridges load
  after interaction or browser idle time.
- A static poster made from `hero-scene-master-v1.png` is the fallback for slow
  connections, WebGL failure, print, and reduced-data modes.

## Page-layout boundary

The 3D stage enlarges the opening visual without replacing authorship. On wide
screens, the name and explanation remain left, the interactive instrument owns
the middle/right visual field, and the unchanged portrait stays on the far
right as a signed editorial figure. On narrow screens, the existing portrait
continues to appear between the name and description; the 3D stage follows as
a full-width, touch-operable figure.

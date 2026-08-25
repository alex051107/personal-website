# Hero Agent Harness — Module Manifest

## What to generate as GLB

Use the seven isolated PNG references below. Export each result as **GLB**, keep
the source PNG filename stem, and add `.glb`.

| ID | Source image | GLB filename | Runtime role | Motion |
| --- | --- | --- | --- | --- |
| M01 | `hero-harness-input-dock-v1.png` | `hero-harness-input-dock-v1.glb` | TaskPacket clamp plus two dataset plates | TaskPacket seats once; plates remain static |
| M02 | `hero-harness-chassis-v1.png` | `hero-harness-chassis-v1.glb` | Empty central Agent Harness frame and specimen chamber | Static anchor; restrained whole-scene tilt only |
| M03 | `hero-harness-locator-carrier-v1.png` | `hero-harness-locator-carrier-v1.glb` | Locator Agent's bounded movable carrier | Slides a finite distance; never free-roams |
| M04 | `hero-harness-tool-bank-v1.png` | `hero-harness-tool-bank-v1.glb` | Three registered tool ports | Selected port lifts or turns slightly |
| M05 | `hero-harness-compatibility-bank-v1.png` | `hero-harness-compatibility-bank-v1.glb` | Exactly six compatibility shutters | Six staged close/open motions |
| M06 | `hero-harness-output-station-v1.png` | `hero-harness-output-station-v1.glb` | EvidenceBundle cradle plus blocked-route tray | Paper cradle or block tray receives the route |
| M07 | `hero-harness-human-key-v1.png` | `hero-harness-human-key-v1.glb` | External human authority | Lever moves only after explicit user input |

## Do not generate as separate GLB

| Module | Web implementation | Reason |
| --- | --- | --- |
| P01 Particle specimen | Sample a simplified molecular surface into points in Three.js | The interaction needs local particle displacement and spring return, not a second dense textured mesh |
| P02 Trace tape | Three.js curve plus a moving dash/material offset | A thin generated mesh adds weight and is harder to align than a code-native route |
| P03 HTML stage labels | Semantic HTML overlay | `Contract`, `Agent`, `Tool`, `Gate`, `Trace`, and `Human` must remain readable and accessible |

## Hunyuan export settings

- Choose **GLB** and the lowest useful polygon or web/low-poly option.
- Do not choose a 1.5M-triangle result for the final Hero. The first downloaded
  GLB is a valid source asset, but at 1,500,000 triangles and about 92 MB it is
  a master-quality intermediate, not a direct website payload.
- If Hunyuan exposes material or texture resolution, start with 1K textures.
- Keep the seven outputs separate. Do not ask the generator to assemble them.
- Do not add text or labels to the mesh; those remain HTML overlays.

## Assembly order

`M01 Input -> M02 Chassis + P01 Particle -> M03 Locator -> M04 Tools -> M05 Six gates -> M06 Output`, with `M07 Human key` visibly outside the automatic path and `P02 Trace tape` recording the finite route.

## Verified local ingest — 2026-08-24

The Hunyuan downloads used opaque filenames. Each mapping below was verified by
loading the source GLB in Three.js and inspecting the rendered object; download
order was not used as the deciding signal.

| Runtime asset | Hunyuan source | Visual check | Web bytes | Web triangles |
| --- | --- | --- | ---: | ---: |
| `hero-harness-input-dock-v1.glb` | `f7bb4d1b2b4789df751949cd16904dcc.glb` | one TaskPacket plate plus two dataset plates | 571,048 | 45,000 |
| `hero-harness-chassis-v1.glb` | `a5ed2a6e674a97d882e774c88071c6f5.glb` | open central frame with three front ports | 617,124 | 45,000 |
| `hero-harness-locator-carrier-v1.glb` | `ee5a40b3ebe016602069d8ffe283dfba.glb` | bounded brass carrier on small wheels | 619,364 | 45,000 |
| `hero-harness-tool-bank-v1.glb` | `4348f3c88282a12b6f30498674a06bed.glb` | exactly three replaceable tool sockets | 681,124 | 45,000 |
| `hero-harness-compatibility-bank-v1.glb` | `50546d6fc67527e6370c7219fb7f4282.glb` | exactly six visible shutters | 674,632 | 45,000 |
| `hero-harness-output-station-v1.glb` | `1426b495a652a73a220f525dc54c83e0.glb` | paper cradle plus separate block tray | 674,912 | 45,000 |
| `hero-harness-human-key-v1.glb` | `8df3ae092a948b94938e2cffca8673a2.glb` | external manual lever | 530,800 | 45,000 |
| `hero-protein-ligand-specimen-v1.glb` | `12614b371a080dab0fe3828dd3427374.glb` | protein-fold mesh with a central ligand | 758,192 | 45,000 |

The eight web files total 5,127,196 bytes and 360,000 triangles. The page loads
the chassis and specimen first (1,375,316 bytes), then assembles the other six
modules sequentially. The roughly 640 MB master set remains local and is ignored
by Git; `models/hero-3d/` contains the only publishable derivatives.

## Runtime animation boundary

The generated assets are fused meshes rather than authored, named mechanical
subassemblies. The website therefore animates whole modules only: TaskPacket
seating, bounded Locator translation, output lift, restrained station rotation,
and an explicit limited turn of the external human-key module. Three tool rings,
six gate lamps, the brass trace tape, and its moving route bead are code-native
Three.js indicators. They show runtime state without falsely claiming that the
downloaded GLBs contain separately rigged sockets, shutters, or a lever hinge.

The protein GLB supplies the sampled 3D vertex field. Its original textured mesh
is not rendered in the station; local point displacement and spring return are
applied to the sampled positions, with a small procedural brass ligand cluster.
This remains a conceptual AI-for-Science specimen, not an experimental structure
or simulation result.

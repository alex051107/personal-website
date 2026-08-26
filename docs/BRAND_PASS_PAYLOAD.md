# Brand Pass payload and dependency comparison — historical

Status: this document records the 2026-08-25 Brand Pass. The 2026-08-26
personal-site humanize pass replaces the three production Instrument files with
one 33,808-byte Onest variable Latin WOFF2. Geist Mono remains unchanged. The
current production font payload is 85,672 bytes.

## Outcome

The Brand Pass adds no production JavaScript runtime. The signature Hero uses
the existing Three.js scene, GLBs, orthographic camera, semantic route, and DOM
stage controls. CSS and local Hero code provide the finite exploded state,
focus state, leader lines, reassembly, and reduced-motion snap.

The only new production assets are four self-hosted WOFF2 files. They total
149,744 bytes and replace operating-system-dependent primary fonts with one
consistent authored type system.

## Baseline and current source

The baseline is commit `db92d27`. Raw and gzip values were measured from the
exact Git blobs and the current working files on 2026-08-25.

| Asset | Baseline raw | Brand Pass raw | Raw delta | Baseline gzip | Brand Pass gzip | Gzip delta |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `index.html` | 88,188 B | 84,754 B | −3,434 B | 16,577 B | 16,016 B | −561 B |
| `tokens.css` | 3,061 B | 3,826 B | +765 B | 1,095 B | 1,247 B | +152 B |
| `css/styles.css` | 253,397 B | 262,132 B | +8,735 B | 39,863 B | 41,064 B | +1,201 B |
| `js/hero-station.js` | 62,142 B | 73,974 B | +11,832 B | 14,768 B | 17,144 B | +2,376 B |
| `js/site-motion.js` | 25,205 B | 25,546 B | +341 B | 5,876 B | 6,010 B | +134 B |
| `js/motion-library-showcase.js` | 26,745 B | 26,745 B | 0 B | unchanged | unchanged | 0 B |

The changed HTML, CSS, tokens, Hero, and site-motion files add 18,239 raw bytes
or 3,302 gzip bytes before fonts. Including the already-compressed WOFF2 files,
the deterministic transfer delta is approximately 153,046 bytes.

## Brand Pass production fonts at that milestone

| File | Bytes | Role |
| --- | ---: | --- |
| `InstrumentSerif-Regular.woff2` | 27,440 | display |
| `InstrumentSans-Regular.woff2` | 34,628 | body |
| `InstrumentSans-SemiBold.woff2` | 35,812 | UI |
| `GeistMono-Medium.woff2` | 51,864 | technical states |
| **Total** | **149,744** | |

## Existing runtime and 3D payload

These production dependencies are unchanged by the Brand Pass.

| Existing asset | Raw bytes | Brand Pass action |
| --- | ---: | --- |
| Three.js module | 365,552 | reused |
| GSAP core | 72,927 | reused by accepted transitions |
| Anime.js | 118,043 | reused by project edges |
| Lottie light | 168,394 | reused by semantic glyphs |
| ScrollMagic | 17,388 | reused by accepted story scenes |
| Eight optimized Hero GLBs | 5,127,196 | reused without regeneration |
| React / Spline / Theatre / Lenis / shader runtime | 0 | not added |

## Project-stage image window

The accepted 24 stage images remain unchanged and total 11,223,246 bytes. The
HTML now provides only stage 01 and 02 for each project at initial parse time:
eight files totaling 1,587,106 bytes. The other sixteen keep their real path in
`data-src` and are hydrated only when they become the current or adjacent stage.

This makes the initial eligibility window deterministic. Browser-native
`loading="lazy"` and `decoding="async"` remain as secondary safeguards.

## Runtime boundary

- Three.js renders only while a model loads, an explicit action changes state,
  the user drags, or a finite route is running.
- Inspect, focus, reassembly, PASS, BLOCK, and result motion each stop.
- Save-Data selects the static Hero fallback before GLB loading.
- Reduced motion exposes the separated diagram and result states without
  interpolation.
- Native page scrolling remains unchanged.

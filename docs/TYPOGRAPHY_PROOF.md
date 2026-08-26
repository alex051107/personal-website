# Typography proof — historical Brand Pass

Status: superseded on 2026-08-26 by the personal-site humanize pass. The
production site now uses Onest for identity, display, body, and navigation text,
with Geist Mono reserved for real machine state. See
[`PERSONAL_SITE_REFERENCE_AUDIT.md`](PERSONAL_SITE_REFERENCE_AUDIT.md) and
[`PERSONAL_SITE_HUMANIZE_ACCEPTANCE.md`](PERSONAL_SITE_HUMANIZE_ACCEPTANCE.md).

## Historical decision

Use **Instrument Serif + Instrument Sans + Geist Mono**.

The selected system gives the portfolio a stable editorial identity without
changing the paper, carbon, graphite, or brass direction. Instrument Serif is
recognisable at the sizes used for the name, Hero thesis, and project titles;
Instrument Sans stays quiet in long technical paragraphs; Geist Mono makes
Gate, state, receipt, and metric fields visibly different from explanatory
copy.

The proof is available at
[`proofs/typography/index.html`](../proofs/typography/index.html). It uses the
same content and layout for all three candidates. The query parameter selects
the candidate:

- `?candidate=instrument`
- `?candidate=plex`
- `?candidate=current`

## Proof content

Every candidate was rendered with:

- a homepage thesis and Harness summary;
- the four-project comparison matrix;
- a blocked workflow stage;
- a long HSP90 / LiGaMD paragraph;
- a technical receipt;
- a 1440 px desktop viewport and a 390 px mobile viewport.

The mobile proof has no horizontal document overflow. It turns the comparison
matrix into four two-column records so line wrapping can be judged rather than
hidden behind a horizontal scroller.

## Candidate comparison

| Candidate | Display identity | Long reading | Technical states | 390 px behavior | Added WOFF2 bytes | Decision |
| --- | --- | --- | --- | --- | ---: | --- |
| Instrument Serif / Instrument Sans / Geist Mono | Distinctive display rhythm; clearly belongs to the editorial instrument concept | Compact, open counters, and comfortable at 62–68ch | Geist Mono separates receipts without making the whole page look like a terminal | Hero and stage titles keep deliberate line breaks; matrix and receipts remain readable | 149,744 | **SELECT** |
| Newsreader / IBM Plex Sans / IBM Plex Mono | Strong publication voice but less specific to the mechanical Hero | Best pure reading texture of the three | Clear and familiar scientific-document tone | Large titles require more lines; the result feels closer to an academic journal than a personal portfolio | 107,756 | KEEP as a future long-form alternative |
| Current Iowan/Palatino + Avenir/Segoe + system mono | Familiar and calm on this Mac | Acceptable on the tested Mac | Serviceable but visually generic | Similar local wrapping to Newsreader; Windows would substitute materially different metrics | 0 | REJECT as the authored identity |

The byte comparison uses the exact files shown in the proof. WOFF2 files are
already compressed, so transfer size is effectively their file size.

## Selected production files

| Role | File | Bytes | Weight | Use |
| --- | --- | ---: | ---: | --- |
| Display | `InstrumentSerif-Regular.woff2` | 27,440 | 400 | Name, Hero thesis, major titles, selected pull quotes |
| Body | `InstrumentSans-Regular.woff2` | 34,628 | 400 | Paragraphs, captions, navigation |
| UI | `InstrumentSans-SemiBold.woff2` | 35,812 | 600 | Buttons, project names, concise labels |
| Technical | `GeistMono-Medium.woff2` | 51,864 | 500 | Gate IDs, states, receipts, metrics, version strings |

Two static Instrument Sans files are smaller than the 88,784-byte variable
file and prevent unused width and weight axes from entering production.

## Rendering evidence

### Candidate 01 — selected

- [Desktop](screenshots/brand-pass/typography/instrument-desktop.png)
- [Mobile](screenshots/brand-pass/typography/instrument-mobile.png)

### Candidate 02

- [Desktop](screenshots/brand-pass/typography/plex-desktop.png)
- [Mobile](screenshots/brand-pass/typography/plex-mobile.png)

### Candidate 03

- [Desktop](screenshots/brand-pass/typography/current-desktop.png)
- [Mobile](screenshots/brand-pass/typography/current-mobile.png)

Playwright confirmed that all seven proof font families requested by the active
candidates loaded successfully. Both self-hosted candidates reported a 390 px
document width in a 390 px viewport.

## Historical production rules

- Self-host the four selected WOFF2 files.
- Preload Instrument Serif Regular and Instrument Sans Regular only.
- Use `font-display: swap` and explicit weight ranges; do not synthesize bold.
- Keep Instrument Serif out of body paragraphs and compact controls.
- Keep Geist Mono to machine-readable fields. Explanations remain in Instrument
  Sans.
- Use sentence case for display headings. Uppercase is reserved for short
  technical identifiers where it carries meaning.
- Keep body copy within 62–68 characters on case-study pages.

## License record

Instrument Serif, Instrument Sans, Geist, Newsreader, and IBM Plex are covered
by the SIL Open Font License. Proof copies of the licenses are stored in
[`proofs/typography/licenses`](../proofs/typography/licenses). The selected
licenses must also be named in the production third-party notice after the
files move to the production font directory.

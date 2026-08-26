# Brand Pass acceptance record

## Visual evidence

### Baseline

- [Desktop Hero](screenshots/brand-pass/before-hero-desktop.png)
- [Mobile Hero](screenshots/brand-pass/before-hero-mobile.png)

### Brand Pass

- [Desktop assembled Hero](screenshots/brand-pass/after-hero-desktop.png)
- [Desktop exploded inspection](screenshots/brand-pass/after-hero-desktop-inspect.png)
- [Desktop Gates focus](screenshots/brand-pass/after-hero-desktop-focus-gates.png)
- [Desktop G3 block](screenshots/brand-pass/after-hero-desktop-block.png)
- [Mobile assembled Hero](screenshots/brand-pass/after-hero-mobile.png)
- [Mobile exploded inspection](screenshots/brand-pass/after-hero-mobile-inspect.png)
- [Reduced-motion exploded state](screenshots/brand-pass/after-hero-reduced-motion.png)

## Browser acceptance

The following states were read back from the rendered DOM in Playwright.

| Surface | Observed result |
| --- | --- |
| Desktop 1440 px | 8 / 8 GLBs loaded; assembled apparatus visible; execution, Contract, and authority overlays hidden at rest |
| Inspect | `data-inspection="open"`; seven labels project from real module anchors; seven leaders visible |
| Module focus | Gates remains full strength; unrelated modules and labels dim; second selection restores the assembled station |
| Normal-motion BLOCK | finite route stops at G3; result `BLOCKED`; title `Residue mapping is missing`; verdict `BLOCK · mapping missing`; receipt status written |
| Reduced-motion PASS | six gates resolve; Human control becomes ready; no successful result exists before a human decision |
| Human release | result changes to `RELEASED`; authority reads `Human acknowledged scope`; RunReceipt status updates |
| Mobile 390 px | assembled and exploded states fit the page without document-width overflow; controls remain stacked and readable |
| Keyboard | Enter opens Inspect from the focused control; Escape from the viewport reassembles the station and clears module focus |
| Touch | a real Chromium touch sequence on the 390 px Inspect control opens the exploded state; document width remains 390 px |
| Save-Data | Hero enters `fallback`; status reads `Static station · data saver enabled`; canvas opacity is 0 and static plate remains visible |
| Console | no error-level messages during the inspected desktop route |

## Copy and claim review

- The opening leads with AI for Science and one engineering thesis.
- Each project begins with a plain-language problem, one system sentence, and
  one evidence-and-boundary line.
- The four existing project metrics and non-claims remain within their prior
  documented scope. The complete material claim log is in
  [COPY_STYLE_GUIDE.md](COPY_STYLE_GUIDE.md#claim-change-log).

## Acceptance still requiring people

The requested five-person unfamiliar-reviewer test has not been represented as
an automated pass. It requires five real reviewers who have not seen the site.
The repository now contains the stable desktop/mobile build and the exact
questions needed for that study:

1. After five seconds, what kind of work does this person do?
2. Who can stop or approve the scientific result?
3. What did the Hero interaction show you?

The target remains four of five for both comprehension questions. Until that
study runs, the implementation and browser criteria are verified; the external
comprehension criterion remains open.

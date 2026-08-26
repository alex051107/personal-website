# Personal-site humanize acceptance

Date: 2026-08-26

## Scope

This pass changes typography, homepage language, and the opening layout. It
does not replace the accepted 3D Agent Harness, its finite PASS/BLOCK behavior,
or the 24 stage-specific project images.

## Design outcome

- The first line is now a greeting and a real name, not a category label.
- The first work sentence names scientific teams, evidence, molecular data,
  AI results, and human decisions in ordinary language.
- The portrait is paired with the introduction on desktop instead of reading
  like an archival figure.
- Onest replaces the high-contrast editorial serif throughout the production
  site. Geist Mono remains limited to the parts that are genuinely machine
  readable.
- Work, About, and Contact are visible in the sticky header. The redundant
  dossier-style page index has been removed.
- The Hero now introduces itself as a featured interactive project and asks a
  concrete question about what an Agent can do and where it stops.
- Section headings use personal, sentence-case language. Project and scientific
  claim boundaries remain unchanged.

## Safari checks

The local page was opened directly in Safari 26.4.

- At the desktop window size, the name, introduction, and portrait form one
  opening composition and the Harness begins as a separate featured project.
- At an approximately 390 px content width, Work, About, and Contact remain
  visible, the greeting wraps without horizontal overflow, and the opening
  copy remains readable.
- The Safari window was restored to its original bounds after the mobile check.

Screenshots from that check were not added to the repository because unrelated
desktop notifications and applications were visible around the Safari window.

## Reference record

The twelve-site research matrix and the adopt/reject decisions are stored in
[`PERSONAL_SITE_REFERENCE_AUDIT.md`](PERSONAL_SITE_REFERENCE_AUDIT.md).

# Zhenpeng Liu — Personal Website

A static, evidence-bounded portfolio for AI application engineering and scientific computing. The home page is a short project index; four deeper pages carry the engineering decisions, evaluation units, failure evidence, and scope that do not fit in a résumé.

## Architecture

The site intentionally uses semantic HTML, one CSS file, and one small local progressive-enhancement script. It has no package manager, build system, database, analytics script, contact-form backend, third-party animation library, or runtime network request.

The stylesheet and motion-script URLs carry fingerprints derived from their Git blob contents. This prevents a browser or CDN from combining a newly deployed HTML layout with an older cached CSS or JavaScript asset. The validator fails if either fingerprint is stale.

Its visual system gives each project two complementary illustrations: a portrait composition for fast recognition on the home card and a separate landscape scene for the case-study opening. Exact, selectable HTML workflow diagrams carry the technical sequence, gates, failure states, captions, and claim boundaries. Images provide a visual metaphor without embedding technical claims in pixels.

The visual direction is a light editorial engineering portfolio. It restores the earlier gray-blue palette, uses solid surfaces, the real portrait, restrained paper-and-resin project illustrations, and flat workflow diagrams instead of neon gradients, glass panels, dashboard decoration, or artificial portrait treatment. The portrait source is shown in its original color without grayscale, blend modes, face regeneration, or skin-tone filters. Project illustrations are optimized JPEGs, each kept below 400 KB by the validator.

Motion remains deliberately bounded: the hero settles once on load, an `IntersectionObserver` applies a short one-time reveal to section-level content, project workflow lines draw once, and a CSS scroll timeline may show reading progress where supported. `prefers-reduced-motion` removes all automatic animation. There are no continuous loops, particles, parallax, 3D pointer tilt, typing effects, animation-library dependencies, or background timers.

That boundary is deliberate:

- GitHub Pages can serve every current requirement directly.
- Core identity, project evidence, and contact information remain readable when the optional motion script is unavailable.
- A `mailto:` contact path avoids collecting visitor data or operating a form service.
- The repository has no dependency-update or framework-migration burden.

A backend should be added only when a real capability requires durable state, authentication, private content, or a submitted form. The current five-page public structure remains small enough to maintain directly. If project writing grows into a frequently updated archive, the next reasonable step is a static content system such as Astro with Markdown—not a database-backed application.

## Information architecture

The home page is designed for a 60–90 second scan:

1. professional direction and current research;
2. four compact project cards;
3. three engineering decisions supported by those projects;
4. education, research context, and contact.

The four deeper pages serve different kinds of evidence instead of forcing every project into one template:

- `projects/evidenceops.html` is an engineering case study;
- `projects/careplan.html` is a backend workflow case study;
- `research/dynamics-atlas.html` is a research engineering case study;
- `research/ligamd-pkoff.html` is a research method note.

Each page leads with a concrete failure point, then separates the implemented route, design decisions, recorded evaluation, current scope, and proposed next validation. The proposed work is visibly labelled and is never presented as completed evidence.

## Content contract

Each home card follows the same compact contract:

1. one concrete problem;
2. one contribution statement;
3. one workflow slice;
4. one recorded result;
5. one current-scope sentence;
6. case-study and public-evidence links.

The deeper pages distinguish a local prototype, a public static console, a synthetic harness, a research collaboration, and an experimental model registry from production deployment, real-user impact, scientific correctness, or broad generalization.

## Local preview

From the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

## Validation

Run the dependency-free site check:

```bash
python3 scripts/validate_site.py
```

It checks local links and anchors, referenced assets, current CSS and JavaScript cache fingerprints, the single allowlisted deferred motion script, image attributes, external-link safety, required metadata, progressive-motion and accessibility hooks, asset-size budgets, and known stale identity/claim strings.

## Deployment

GitHub Pages serves this repository from the project path:

`https://alex051107.github.io/personal-website/`

Keep all local asset and page links relative so the `/personal-website/` base path continues to work.

The default publication route is an authenticated GitHub repository API fast-forward of `main`, with the live parent checked immediately before updating the ref and `force` disabled. SSH keys are not required for this portfolio deployment.

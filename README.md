# Zhenpeng Liu — Personal Website

A static, evidence-bounded portfolio for AI application engineering and scientific machine learning.

## Architecture

The site intentionally uses semantic HTML, one CSS file, and one small local progressive-enhancement script. It has no package manager, build system, database, analytics script, contact-form backend, third-party animation library, or runtime network request.

Its visual system combines four original generated project plates with exact, selectable HTML workflow labels. Generated imagery supplies atmosphere and material detail; the browser layer owns the technical sequence, gates, failure states, captions, and claim boundaries so the diagrams remain accurate and accessible.

The visual signature is a dark system-aperture hero around the real portrait. The portrait source is shown in its original color without grayscale, blend modes, face regeneration, or skin-tone filters. Four project plates retain exact HTML workflow overlays, so the technical labels remain selectable and accurate.

Motion remains deliberately bounded: the hero and execution trace settle once on load; an `IntersectionObserver` applies one-time popup/reveal states to section-level content and project figures; the hero has a small fine-pointer response; and a CSS scroll timeline may show reading progress where supported. `prefers-reduced-motion` removes all automatic animation and pointer response. There are no continuous loops, particles, parallax, typing effects, animation-library dependencies, or background timers.

That boundary is deliberate:

- GitHub Pages can serve every current requirement directly.
- Core identity, project evidence, and contact information remain readable when the optional motion script is unavailable.
- A `mailto:` contact path avoids collecting visitor data or operating a form service.
- The repository has no dependency-update or framework-migration burden.

A backend should be added only when a real capability requires durable state, authentication, private content, or a submitted form. If project writing grows into a frequently updated archive, the next reasonable step is a static content system such as Astro with Markdown—not a database-backed application.

## Content contract

Each featured project follows the same public structure:

1. problem and intended user;
2. system flow;
3. implemented decisions;
4. recorded validation;
5. explicit claim boundary;
6. public evidence link.

The site distinguishes a local prototype, a public static console, a synthetic harness, and a research result from production deployment or real-user impact.

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

It checks local links and anchors, referenced assets, the single allowlisted deferred motion script, image attributes, external-link safety, required metadata, progressive-motion and accessibility hooks, asset-size budgets, and known stale identity/claim strings.

## Deployment

GitHub Pages serves this repository from the project path:

`https://alex051107.github.io/personal-website/`

Keep all local asset and page links relative so the `/personal-website/` base path continues to work.

The default publication route is an authenticated GitHub repository API fast-forward of `main`, with the live parent checked immediately before updating the ref and `force` disabled. SSH keys are not required for this portfolio deployment.

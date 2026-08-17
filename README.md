# Zhenpeng Liu — Personal Website

A static, evidence-bounded portfolio for AI application engineering and scientific machine learning.

## Architecture

The site intentionally uses semantic HTML and one CSS file. It has no runtime JavaScript, package manager, build system, database, analytics script, or contact-form backend.

Its motion system is deliberately bounded: one CSS-only hero sequence presents an execution trace in under one second, interactive feedback uses short transform/color transitions, and `prefers-reduced-motion` removes all automatic animation. There are no continuous loops, particles, parallax, typing effects, or animation-library dependencies.

That boundary is deliberate:

- GitHub Pages can serve every current requirement directly.
- Core identity, project evidence, and contact information remain readable without client-side code.
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

It checks local links and anchors, referenced assets, image attributes, external-link safety, required metadata, accessibility hooks, asset-size budgets, and known stale identity/claim strings.

## Deployment

GitHub Pages serves this repository from the project path:

`https://alex051107.github.io/personal-website/`

Keep all local asset and page links relative so the `/personal-website/` base path continues to work.

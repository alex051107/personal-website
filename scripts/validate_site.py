#!/usr/bin/env python3
"""Dependency-free structural checks for the static portfolio."""

from __future__ import annotations

import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
SITE_PREFIX = "/personal-website/"
REQUIRED_ANCHORS = {
    "top",
    "why",
    "map",
    "work",
    "evidenceops",
    "careplan",
    "dynamics-atlas",
    "hsp90",
    "research",
    "contribute",
    "about",
    "contact",
}
CONTENT_PAGES = {
    Path("index.html"),
    Path("projects/evidenceops.html"),
    Path("projects/careplan.html"),
    Path("research/dynamics-atlas.html"),
    Path("research/ligamd-pkoff.html"),
}
STALE_STRINGS = {
    "zwt233": "reference-site identity leaked into the portfolio",
    "github.com/ZhenpengLiu": "wrong GitHub account",
    "zphengl@unc.edu": "stale contact email",
    "Caltech SURF Fellow": "unsupported fellowship claim",
    "SURF Research Fellow": "unsupported fellowship role",
    "physical koff from simulation": "overstated kinetic claim",
    "I build AI systems that know when to stop": "superseded hero positioning",
    "I build AI tools and scientific software": "superseded hero positioning",
    "I use AI-assisted coding, but I remain responsible": "removed defensive ownership disclosure",
    "Proof before polish": "superseded project-section positioning",
}


def git_blob_sha(path: Path) -> str:
    content = path.read_bytes()
    header = f"blob {len(content)}\0".encode("ascii")
    return hashlib.sha1(header + content).hexdigest()


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.duplicate_ids: set[str] = set()
        self.links: list[dict[str, str]] = []
        self.assets: list[tuple[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.scripts_with_src: list[str] = []
        self.scripts: list[dict[str, str]] = []
        self.meta_refreshes: list[str] = []
        self.h1_count = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        if values.get("id"):
            if values["id"] in self.ids:
                self.duplicate_ids.add(values["id"])
            self.ids.add(values["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "a" and values.get("href"):
            self.links.append(values)
        if tag == "meta" and values.get("http-equiv", "").lower() == "refresh":
            self.meta_refreshes.append(values.get("content", ""))
        if tag in {"img", "script", "link"}:
            source = values.get("src") or values.get("href")
            if source:
                self.assets.append((tag, source))
        if tag == "img":
            self.images.append(values)
        if tag == "script":
            self.scripts.append(values)
            if values.get("src"):
                self.scripts_with_src.append(values["src"])


def parse_pages() -> dict[Path, PageParser]:
    parsed: dict[Path, PageParser] = {}
    for page in sorted(ROOT.rglob("*.html")):
        if ".git" in page.parts:
            continue
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        parsed[page.resolve()] = parser
    return parsed


def local_target(page: Path, href: str) -> tuple[Path, str] | None:
    parts = urlsplit(href)
    if parts.scheme or href.startswith("//"):
        return None
    raw_path = unquote(parts.path)
    if raw_path.startswith(SITE_PREFIX):
        raw_path = raw_path[len(SITE_PREFIX):]
        target = ROOT / (raw_path or "index.html")
    elif raw_path.startswith("/"):
        return None
    elif raw_path:
        target = page.parent / raw_path
    else:
        target = page
    if target.is_dir():
        target = target / "index.html"
    return target.resolve(), parts.fragment


def main() -> int:
    errors: list[str] = []
    pages = parse_pages()
    index = ROOT / "index.html"
    css_path = ROOT / "css" / "styles.css"
    motion_script = ROOT / "js" / "site-motion.js"
    if index.resolve() not in pages:
        errors.append("index.html is missing")
    else:
        missing = REQUIRED_ANCHORS - pages[index.resolve()].ids
        if missing:
            errors.append(f"index.html is missing anchors: {sorted(missing)}")

    parsed_relative_pages = {page.relative_to(ROOT) for page in pages}
    missing_content_pages = CONTENT_PAGES - parsed_relative_pages
    if missing_content_pages:
        errors.append(f"content pages are missing: {sorted(map(str, missing_content_pages))}")

    for page, parser in pages.items():
        relative_page = page.relative_to(ROOT)
        is_content_page = relative_page in CONTENT_PAGES
        depth_prefix = "../" * (len(relative_page.parts) - 1)
        expected_page_css = f"{depth_prefix}css/styles.css?v={git_blob_sha(css_path)[:7]}"
        expected_page_motion = f"{depth_prefix}js/site-motion.js?v={git_blob_sha(motion_script)[:7]}"
        page_text = page.read_text(encoding="utf-8")
        if parser.duplicate_ids:
            errors.append(f"{relative_page}: duplicate ids: {sorted(parser.duplicate_ids)}")
        if parser.h1_count > 1:
            errors.append(f"{relative_page}: expected at most one h1, found {parser.h1_count}")

        for link in parser.links:
            href = link["href"]
            if href.startswith(("mailto:", "tel:")):
                continue
            parts = urlsplit(href)
            if parts.scheme in {"http", "https"}:
                if link.get("target") == "_blank":
                    rel_tokens = set(link.get("rel", "").split())
                    if not {"noopener", "noreferrer"}.issubset(rel_tokens):
                        errors.append(f"{relative_page}: external _blank link lacks noopener noreferrer: {href}")
                continue
            if parts.path.startswith("/") and not href.startswith(("//", SITE_PREFIX)):
                errors.append(f"{relative_page}: absolute local path must use {SITE_PREFIX}: {href}")
                continue
            resolved = local_target(page, href)
            if resolved is None:
                continue
            target, fragment = resolved
            if not target.exists():
                errors.append(f"{relative_page}: missing local link target: {href}")
                continue
            if fragment and target.suffix == ".html":
                target_parser = pages.get(target)
                if target_parser is None or fragment not in target_parser.ids:
                    errors.append(f"{relative_page}: missing anchor #{fragment} in {target.relative_to(ROOT)}")

        for refresh in parser.meta_refreshes:
            match = re.fullmatch(r"\s*\d+\s*;\s*url=(.+?)\s*", refresh, flags=re.IGNORECASE)
            if not match:
                errors.append(f"{relative_page}: invalid meta refresh content: {refresh!r}")
                continue
            refresh_target = local_target(page, match.group(1))
            fallback_targets = {
                target
                for link in parser.links
                if (target := local_target(page, link["href"])) is not None
            }
            if refresh_target is None or refresh_target not in fallback_targets:
                errors.append(f"{relative_page}: meta refresh target differs from fallback link")

        for tag, source in parser.assets:
            parts = urlsplit(source)
            if parts.scheme or source.startswith(("//", "data:")):
                continue
            resolved = local_target(page, source)
            if resolved is None:
                continue
            target, _ = resolved
            if not target.exists():
                errors.append(f"{relative_page}: missing {tag} asset: {source}")

        if is_content_page:
            if parser.h1_count != 1:
                errors.append(f"{relative_page}: expected exactly one h1, found {parser.h1_count}")
            for image in parser.images:
                missing_attrs = [name for name in ("alt", "width", "height") if not image.get(name)]
                if missing_attrs:
                    errors.append(
                        f"{relative_page}: image {image.get('src', '<unknown>')} "
                        f"lacks {', '.join(missing_attrs)}"
                    )
            if parser.scripts_with_src != [expected_page_motion]:
                errors.append(
                    f"{relative_page}: expected only the current fingerprinted local motion script: "
                    f"{expected_page_motion}, found {parser.scripts_with_src}"
                )
            for script in parser.scripts:
                if script.get("src") == expected_page_motion and "defer" not in script:
                    errors.append(f"{relative_page}: local motion script must be deferred: {script['src']}")
            inline_scripts = [script for script in parser.scripts if not script.get("src")]
            if relative_page == Path("index.html"):
                if len(inline_scripts) != 1 or inline_scripts[0].get("type") != "application/ld+json":
                    errors.append(
                        "index.html: expected exactly one inline JSON-LD block and no inline runtime scripts"
                    )
            elif inline_scripts:
                errors.append(f"{relative_page}: case-study page has unexpected inline scripts")
            if f'<link rel="stylesheet" href="{expected_page_css}">' not in page_text:
                errors.append(
                    f"{relative_page}: stylesheet URL must use the current content fingerprint: "
                    f"{expected_page_css}"
                )
            for needle in (
                '<meta name="description"',
                '<link rel="canonical"',
                'property="og:title"',
                'property="og:image"',
                'name="twitter:card"',
                'class="skip-link"',
            ):
                if needle not in page_text:
                    errors.append(f"{relative_page}: required metadata/accessibility hook missing: {needle}")
        elif parser.scripts:
            errors.append(f"{relative_page}: redirect/archive page has unexpected scripts")

    index_text = index.read_text(encoding="utf-8") if index.exists() else ""
    if 'type="application/ld+json"' not in index_text:
        errors.append('index.html: required metadata hook missing: type="application/ld+json"')

    for exact in (
        '<title>Zhenpeng Liu — AI Application Engineering &amp; Scientific Software</title>',
        '<link rel="canonical" href="https://alex051107.github.io/personal-website/">',
        '<meta property="og:url" content="https://alex051107.github.io/personal-website/">',
        '<meta property="og:image" content="https://alex051107.github.io/personal-website/images/og-card.jpg">',
        '<meta name="twitter:image" content="https://alex051107.github.io/personal-website/images/og-card.jpg">',
    ):
        if exact not in index_text:
            errors.append(f"index.html: expected project-path metadata missing: {exact}")

    css = css_path.read_text(encoding="utf-8")
    for needle in (
        ":focus-visible",
        "prefers-reduced-motion",
        "--motion-ease",
        "@keyframes ui-enter-y",
        "@keyframes page-progress-fill",
        "html.motion-enabled [data-reveal]",
        "filter: none",
        "mix-blend-mode: normal",
    ):
        if needle not in css:
            errors.append(f"css/styles.css: missing {needle}")
    if "infinite" in css.lower():
        errors.append("css/styles.css: continuous animation is outside the motion contract")

    if motion_script.exists():
        script_text = motion_script.read_text(encoding="utf-8")
        for needle in ("IntersectionObserver", "prefers-reduced-motion", "motion-enabled"):
            if needle not in script_text:
                errors.append(f"js/site-motion.js: missing progressive-motion guard: {needle}")
        for forbidden in ("fetch(", "XMLHttpRequest", "WebSocket", "import("):
            if forbidden in script_text:
                errors.append(f"js/site-motion.js: network or dynamic dependency is outside the motion contract: {forbidden}")

    public_text_files = [*pages.keys(), ROOT / "README.md"]
    for path in public_text_files:
        text = path.read_text(encoding="utf-8")
        for stale, reason in STALE_STRINGS.items():
            if stale.lower() in text.lower():
                errors.append(f"{path.relative_to(ROOT)}: {reason}: {stale!r}")

    size_limits = {
        ROOT / "images" / "portrait.png": 1_000_000,
        ROOT / "images" / "og-card.jpg": 1_000_000,
        ROOT / "images" / "project-visuals" / "evidenceops-editorial.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "careplan-editorial.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "dynamics-atlas-editorial.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "hsp90-ligamd-editorial.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "evidenceops-card-portrait.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "careplan-card-portrait.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "dynamics-atlas-card-portrait.jpg": 400_000,
        ROOT / "images" / "project-visuals" / "hsp90-ligamd-card-portrait.jpg": 400_000,
    }
    for asset, limit in size_limits.items():
        if not asset.exists():
            errors.append(f"required image is missing: {asset.relative_to(ROOT)}")
        elif asset.stat().st_size > limit:
            errors.append(f"{asset.relative_to(ROOT)} exceeds {limit:,} bytes")

    if errors:
        print("SITE_CHECK FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "SITE_CHECK PASS "
        f"pages={len(pages)} anchors={len(pages[index.resolve()].ids)} "
        f"links={sum(len(page.links) for page in pages.values())}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

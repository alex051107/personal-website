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
REQUIRED_HERO_MODELS = {
    "hero-harness-input-dock-v1.glb",
    "hero-harness-chassis-v1.glb",
    "hero-harness-locator-carrier-v1.glb",
    "hero-harness-tool-bank-v1.glb",
    "hero-harness-compatibility-bank-v1.glb",
    "hero-harness-output-station-v1.glb",
    "hero-harness-human-key-v1.glb",
    "hero-protein-ligand-specimen-v1.glb",
}
REQUIRED_TEMPLATE_NAMES = {
    "motionsites": {"ai-agent-pipeline", "agent-plan"},
    "reactbits": {"scroll-expand", "animated-list"},
    "uiverse": {"progress-status-card", "terminal-card"},
    "anime": {"create-drawable", "create-motion-path"},
    "aceternity": {"sticky-scroll-reveal", "tracing-beam"},
}
STALE_STRINGS = {
    "zwt233": "reference-site identity leaked into the portfolio",
    "github.com/ZhenpengLiu": "wrong GitHub account",
    "zphengl@unc.edu": "stale contact email",
    "Caltech SURF Fellow": "unsupported fellowship claim",
    "SURF Research Fellow": "unsupported fellowship role",
    "predicts physical koff from simulation": "overstated kinetic claim",
    "physical koff inferred from simulation time": "overstated kinetic claim",
    "I build AI systems that know when to stop": "superseded hero positioning",
    "I build AI tools and scientific software": "superseded hero positioning",
    "I use AI-assisted coding, but I remain responsible": "removed defensive ownership disclosure",
    "Proof before polish": "superseded project-section positioning",
    "Backend AI applications.<br>Scientific software.": "superseded hero positioning",
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
        self.decision_matrix_header_cells = 0
        self.decision_matrix_body_rows = 0
        self.project_stories: list[dict[str, object]] = []
        self.template_refs: list[tuple[str, str]] = []
        self.motion_source_maps = 0
        self.workflow_statuses = 0
        self.workflow_terminals = 0
        self.tracing_beams = 0
        self._in_decision_matrix = False
        self._in_decision_matrix_head = False
        self._in_decision_matrix_body = False
        self._active_story: dict[str, object] | None = None
        self._active_story_root_tag = ""
        self._active_story_root_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        class_tokens = set(values.get("class", "").split())

        if "motion-source-map" in class_tokens:
            self.motion_source_maps += 1
        if "data-story-status" in values:
            self.workflow_statuses += 1
        if "workflow-terminal" in class_tokens:
            self.workflow_terminals += 1
        if "project-story__beam" in class_tokens:
            self.tracing_beams += 1
        if "data-template-source" in values or "data-template-name" in values:
            self.template_refs.append(
                (values.get("data-template-source", ""), values.get("data-template-name", ""))
            )

        if tag == "table" and "decision-matrix__table" in class_tokens:
            self._in_decision_matrix = True
        elif self._in_decision_matrix and tag == "thead":
            self._in_decision_matrix_head = True
        elif self._in_decision_matrix and tag == "tbody":
            self._in_decision_matrix_body = True
        elif self._in_decision_matrix_head and tag == "th":
            self.decision_matrix_header_cells += 1
        elif self._in_decision_matrix_body and tag == "tr":
            self.decision_matrix_body_rows += 1

        if values.get("data-project-story"):
            self._active_story = {
                "name": values["data-project-story"],
                "nodes": [],
                "steps": [],
                "edges": [],
                "results": [],
                "logs": 0,
                "statuses": 0,
                "terminals": 0,
                "beams": 0,
                "focus_lenses": 0,
                "mobile_docks": 0,
            }
            self.project_stories.append(self._active_story)
            self._active_story_root_tag = tag
            self._active_story_root_depth = 1
        elif self._active_story is not None and tag == self._active_story_root_tag:
            self._active_story_root_depth += 1

        if self._active_story is not None:
            for attribute, bucket in (
                ("data-story-node", "nodes"),
                ("data-story-step", "steps"),
                ("data-edge-stage", "edges"),
                ("data-story-result", "results"),
            ):
                if attribute in values:
                    cast_bucket = self._active_story[bucket]
                    assert isinstance(cast_bucket, list)
                    cast_bucket.append(values[attribute])
            if "data-story-log" in values:
                self._active_story["logs"] = int(self._active_story["logs"]) + 1
            if "data-story-status" in values:
                self._active_story["statuses"] = int(self._active_story["statuses"]) + 1
            if "workflow-terminal" in class_tokens:
                self._active_story["terminals"] = int(self._active_story["terminals"]) + 1
            if "project-story__beam" in class_tokens:
                self._active_story["beams"] = int(self._active_story["beams"]) + 1
            if "data-story-focus" in values:
                self._active_story["focus_lenses"] = int(self._active_story["focus_lenses"]) + 1
            if "data-story-mobile-dock" in values:
                self._active_story["mobile_docks"] = int(self._active_story["mobile_docks"]) + 1

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

    def handle_endtag(self, tag: str) -> None:
        if self._in_decision_matrix and tag == "thead":
            self._in_decision_matrix_head = False
        elif self._in_decision_matrix and tag == "tbody":
            self._in_decision_matrix_body = False
        elif self._in_decision_matrix and tag == "table":
            self._in_decision_matrix = False

        if self._active_story is not None and tag == self._active_story_root_tag:
            self._active_story_root_depth -= 1
            if self._active_story_root_depth == 0:
                self._active_story = None
                self._active_story_root_tag = ""


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
    tokens_path = ROOT / "tokens.css"
    motion_script = ROOT / "js" / "site-motion.js"
    station_script = ROOT / "js" / "hero-station.js"
    anime_script = ROOT / "js" / "vendor" / "anime.umd.min.js"
    expected_token_import = f'@import url("../tokens.css?v={git_blob_sha(tokens_path)[:7]}");'
    css_text = css_path.read_text(encoding="utf-8")
    token_imports = re.findall(
        r'@import url\("\.\./tokens\.css(?:\?v=[0-9a-f]{7})?"\);',
        css_text,
    )
    if token_imports != [expected_token_import]:
        errors.append(
            "css/styles.css: token import must use the current content fingerprint: "
            f"{expected_token_import}"
        )
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
        expected_page_station = f"{depth_prefix}js/hero-station.js?v={git_blob_sha(station_script)[:7]}"
        expected_page_anime = (
            f"{depth_prefix}js/vendor/anime.umd.min.js?v={git_blob_sha(anime_script)[:7]}"
        )
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
            if page_text.count('class="page-progress" aria-hidden="true"') != 1:
                errors.append(f"{relative_page}: expected one decorative reading-progress line")
            for image in parser.images:
                missing_attrs = [name for name in ("alt", "width", "height") if not image.get(name)]
                if missing_attrs:
                    errors.append(
                        f"{relative_page}: image {image.get('src', '<unknown>')} "
                        f"lacks {', '.join(missing_attrs)}"
                    )
            expected_script_sources = (
                [expected_page_anime, expected_page_station, expected_page_motion]
                if relative_page == Path("index.html")
                else [expected_page_motion]
            )
            if parser.scripts_with_src != expected_script_sources:
                errors.append(
                    f"{relative_page}: expected scripts in order {expected_script_sources}, "
                    f"found {parser.scripts_with_src}"
                )
            for script in parser.scripts:
                script_path = urlsplit(script.get("src", "")).path
                if script_path == urlsplit(expected_page_motion).path and "defer" not in script:
                    errors.append(f"{relative_page}: local motion script must be deferred: {script['src']}")
                if script_path == urlsplit(expected_page_anime).path and "defer" not in script:
                    errors.append(f"{relative_page}: local Anime.js script must be deferred: {script['src']}")
                if script_path == urlsplit(expected_page_station).path and script.get("type") != "module":
                    errors.append(f"{relative_page}: Hero station runtime must be an ES module: {script['src']}")
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
    if index.resolve() in pages:
        home = pages[index.resolve()]
        if home.decision_matrix_header_cells != 6:
            errors.append(
                "index.html: decision matrix must have exactly six column headers; "
                f"found {home.decision_matrix_header_cells}"
            )
        if home.decision_matrix_body_rows != 4:
            errors.append(
                "index.html: decision matrix must have exactly four project rows; "
                f"found {home.decision_matrix_body_rows}"
            )

        if home.motion_source_maps != 1:
            errors.append(
                "index.html: expected exactly one motion-source-map; "
                f"found {home.motion_source_maps}"
            )
        for label, actual in (
            ("workflow status cards", home.workflow_statuses),
            ("workflow terminals", home.workflow_terminals),
            ("tracing beams", home.tracing_beams),
        ):
            if actual != 4:
                errors.append(f"index.html: expected exactly four {label}; found {actual}")
        invalid_template_refs = [
            (source, name) for source, name in home.template_refs if not source or not name
        ]
        if invalid_template_refs:
            errors.append(
                "index.html: every template reference needs non-empty "
                f"data-template-source and data-template-name: {invalid_template_refs}"
            )
        actual_template_names: dict[str, set[str]] = {}
        for source, name in home.template_refs:
            if source and name:
                actual_template_names.setdefault(source, set()).add(name)
        for source in sorted(set(actual_template_names) | set(REQUIRED_TEMPLATE_NAMES)):
            expected_names = REQUIRED_TEMPLATE_NAMES.get(source, set())
            actual_names = actual_template_names.get(source, set())
            if actual_names != expected_names:
                errors.append(
                    "index.html: template source "
                    f"{source!r} must expose exactly {sorted(expected_names)}; "
                    f"found {sorted(actual_names)}"
                )

        stories = home.project_stories
        if len(stories) != 4:
            errors.append(f"index.html: expected exactly four project stories; found {len(stories)}")
        story_names = [str(story["name"]) for story in stories]
        if any(not name for name in story_names) or len(set(story_names)) != len(story_names):
            errors.append(f"index.html: project story identifiers must be non-empty and unique: {story_names}")
        expected_stages = [str(stage) for stage in range(6)]
        for story in stories:
            story_name = str(story["name"])
            for bucket in ("nodes", "steps"):
                actual_stages = list(story[bucket])
                if actual_stages != expected_stages:
                    errors.append(
                        f"index.html: project story {story_name!r} must have ordered {bucket} "
                        f"stages 0..5 exactly once; found {actual_stages}"
                    )
            edge_stages = list(story["edges"])
            if len(edge_stages) < 5:
                errors.append(
                    f"index.html: project story {story_name!r} needs at least five semantic edges; "
                    f"found {len(edge_stages)}"
                )
            expected_edge_stages = {str(stage) for stage in range(1, 6)}
            actual_edge_stages = set(edge_stages)
            if actual_edge_stages != expected_edge_stages:
                errors.append(
                    f"index.html: project story {story_name!r} edges must cover stages 1..5; "
                    f"found {sorted(actual_edge_stages)}"
                )
            if int(story["logs"]) != 1:
                errors.append(
                    f"index.html: project story {story_name!r} needs exactly one live status log; "
                    f"found {story['logs']}"
                )
            if int(story["statuses"]) != 1:
                errors.append(
                    f"index.html: project story {story_name!r} needs exactly one workflow status card; "
                    f"found {story['statuses']}"
                )
            if int(story["terminals"]) != 1:
                errors.append(
                    f"index.html: project story {story_name!r} needs exactly one workflow terminal; "
                    f"found {story['terminals']}"
                )
            if int(story["beams"]) != 1:
                errors.append(
                    f"index.html: project story {story_name!r} needs exactly one tracing beam; "
                    f"found {story['beams']}"
                )
            if int(story["focus_lenses"]) != 1:
                errors.append(
                    f"index.html: project story {story_name!r} needs exactly one scroll focus lens; "
                    f"found {story['focus_lenses']}"
                )
            if int(story["mobile_docks"]) != 1:
                errors.append(
                    f"index.html: project story {story_name!r} needs exactly one mobile stage dock; "
                    f"found {story['mobile_docks']}"
                )
            result_stages = list(story["results"])
            if not result_stages:
                errors.append(f"index.html: project story {story_name!r} needs a visible branch state")
            invalid_result_stages = [stage for stage in result_stages if stage not in expected_stages]
            if invalid_result_stages:
                errors.append(
                    f"index.html: project story {story_name!r} has invalid result stages: "
                    f"{invalid_result_stages}"
                )
    if index_text.count('src="images/portrait.png"') != 1:
        errors.append("index.html: the unchanged portrait must appear exactly once")
    if index_text.count('class="index-opening__portrait"') != 1:
        errors.append("index.html: the portrait must appear once in the opening")
    if 'class="profile-portrait"' in index_text:
        errors.append("index.html: the portrait must not remain duplicated in Profile")
    for forbidden_marker in ('data-project-instrument', 'project-plate__locator'):
        if forbidden_marker in index_text:
            errors.append(f"index.html: retired generic project UI remains: {forbidden_marker}")
    for marker in ('class="ai-science-bridge"', "AI × Science", 'class="decision-matrix"'):
        if index_text.count(marker) != 1:
            errors.append(f"index.html: expected one AI for Science positioning marker: {marker}")
    for marker in (
        'data-hero-station',
        'data-station-viewport',
        'data-station-run',
        'data-station-inspect',
        'data-station-human',
        'data-station-execution',
        'data-station-lever',
        'data-station-result',
        'Heroic Alpha Station',
        'Gate × 6',
    ):
        if index_text.count(marker) != 1:
            errors.append(f"index.html: expected one readable Hero station marker: {marker}")
    if index_text.count("data-stage-marker=") != 6:
        errors.append("index.html: expected six Contract-to-Human Hero stage markers")
    for role in ("Agent", "Model", "Tool", "Rule", "State", "Human"):
        marker = f">{role}</b>"
        if index_text.count(marker) != 1:
            errors.append(f"index.html: expected one shared role legend entry: {role}")

    for exact in (
        '<title>Zhenpeng Liu — AI for Science &amp; Evidence Systems</title>',
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
        "@keyframes portrait-scan",
        "@keyframes project-scan",
        "html.motion-enabled [data-reveal]",
        ".motion-opening",
        ".decision-matrix",
        ".project-story",
        ".semantic-workflow",
        ".workflow-edge",
        ".workflow-node",
        ".project-story__step",
        ".hero-station",
        ".hero-station__markers",
        ".hero-station__execution",
        ".hero-station__lever",
        ".hero-station__result",
        '[data-station-state="running"]',
        "--project-shell",
        "view-transition",
        "filter: none",
        "mix-blend-mode: normal",
    ):
        if needle not in css:
            errors.append(f"css/styles.css: missing {needle}")
    if "infinite" in css.lower():
        errors.append("css/styles.css: continuous animation is outside the motion contract")

    if motion_script.exists():
        script_text = motion_script.read_text(encoding="utf-8")
        for needle in (
            "IntersectionObserver",
            "prefers-reduced-motion",
            "motion-enabled",
            "setupProjectStory",
            "[data-project-story]",
            "[data-story-step]",
            "[data-story-node]",
            "[data-edge-stage]",
            "[data-story-log]",
            "aria-pressed",
            "ArrowRight",
            "createMotionPath",
        ):
            if needle not in script_text:
                errors.append(f"js/site-motion.js: missing progressive-motion guard: {needle}")
        for forbidden in ("fetch(", "XMLHttpRequest", "WebSocket", "import("):
            if forbidden in script_text:
                errors.append(f"js/site-motion.js: network or dynamic dependency is outside the motion contract: {forbidden}")
    if station_script.exists():
        station_text = station_script.read_text(encoding="utf-8")
        for needle in (
            'from "./vendor/three/three.module.min.js"',
            "GLTFLoader",
            "MeshoptDecoder",
            "OrthographicCamera",
            "IntersectionObserver",
            "ResizeObserver",
            "prefers-reduced-motion",
            "requestAnimationFrame",
            "pointermove",
            "ArrowLeft",
            "for (let index = 0; index < 6",
            "stageReview",
            "acknowledgeHuman",
            "flowBeads",
            "dataset.stepState",
            "aria-pressed",
        ):
            if needle not in station_text:
                errors.append(f"js/hero-station.js: missing progressive-3D guard: {needle}")
        for forbidden in ("http://", "https://", "fetch(", "XMLHttpRequest", "WebSocket", "import("):
            if forbidden in station_text:
                errors.append(
                    "js/hero-station.js: remote or dynamic dependency is outside the Hero contract: "
                    f"{forbidden}"
                )
    else:
        errors.append("js/hero-station.js: local Hero station runtime is missing")
    if not anime_script.exists() or "Anime.js - UMD minified bundle" not in anime_script.read_text(
        encoding="utf-8"
    ):
        errors.append("js/vendor/anime.umd.min.js: official local Anime.js bundle is missing")

    three_vendor_files = {
        ROOT / "js" / "vendor" / "three" / "three.module.min.js",
        ROOT / "js" / "vendor" / "three" / "three.core.min.js",
        ROOT / "js" / "vendor" / "three" / "LICENSE",
        ROOT / "js" / "vendor" / "three" / "addons" / "loaders" / "GLTFLoader.js",
        ROOT / "js" / "vendor" / "three" / "addons" / "utils" / "BufferGeometryUtils.js",
        ROOT / "js" / "vendor" / "three" / "addons" / "utils" / "SkeletonUtils.js",
        ROOT / "js" / "vendor" / "three" / "addons" / "libs" / "meshopt_decoder.module.js",
        ROOT / "js" / "vendor" / "three" / "addons" / "libs" / "MESHOPT_LICENSE.md",
    }
    for vendor_file in three_vendor_files:
        if not vendor_file.exists():
            errors.append(f"required local Three.js file is missing: {vendor_file.relative_to(ROOT)}")

    hero_model_root = ROOT / "models" / "hero-3d"
    actual_hero_models = {path.name for path in hero_model_root.glob("*.glb")}
    if actual_hero_models != REQUIRED_HERO_MODELS:
        errors.append(
            "models/hero-3d: expected exactly the eight verified Hero GLBs; "
            f"found {sorted(actual_hero_models)}"
        )
    hero_model_bytes = 0
    for filename in REQUIRED_HERO_MODELS:
        model = hero_model_root / filename
        if not model.exists():
            continue
        hero_model_bytes += model.stat().st_size
        if model.stat().st_size > 1_000_000:
            errors.append(f"models/hero-3d/{filename} exceeds the 1,000,000-byte module budget")
        if station_script.exists() and f'"{filename}"' not in station_script.read_text(encoding="utf-8"):
            errors.append(f"js/hero-station.js does not reference required model: {filename}")
    if hero_model_bytes > 6_000_000:
        errors.append(f"models/hero-3d combined payload exceeds 6,000,000 bytes: {hero_model_bytes}")

    gitignore = ROOT / ".gitignore"
    if "images/hero-3d-source/3D models for Heroic Alpha Station./" not in gitignore.read_text(
        encoding="utf-8"
    ):
        errors.append(".gitignore must keep the roughly 640 MB master Hero GLBs out of publication")

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
        ROOT / "images" / "project-visuals" / "evidenceops-index-v2.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "careplan-index-v2.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "dynamics-atlas-index-v2.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "hsp90-ligamd-index-v2.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "evidenceops-index-v4.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "careplan-index-v4.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "dynamics-atlas-index-v4.jpg": 750_000,
        ROOT / "images" / "project-visuals" / "hsp90-ligamd-index-v4.jpg": 750_000,
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

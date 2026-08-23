#!/usr/bin/env python3
"""Flag AI-style copy in the site's user-facing text.

Runs over the visible text of index.html, so markup, scripts and metadata
attributes are not scanned. Exits non-zero when anything is flagged.

    python3 scripts/copy-lint.py
"""
import re
import sys
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Phrases that read as generated marketing copy. Word-boundary matched so
# legitimate technical terms are untouched.
PHRASES = [
    "not just", "at the intersection", "bridging", "unlock", "production-grade",
    "seamless", "robust", "cutting-edge", "game-changing", "real-world",
    "end-to-end", "transforming", "empowering", "built to", "designed to",
    "coming soon", "passionate", "leverage", "delve", "tapestry",
    "in today's world", "landscape of", "testament to",
]

# Placeholder text that must never ship.
PLACEHOLDERS = ["lorem ipsum", "tbd", "todo", "xxx", "placeholder"]

# Hyphens that are part of a term, not stylistic dashes.
ALLOWED_HYPHEN = re.compile(
    r"(gpt-4o|multi-tenant|time-series|read-only|zero-shot|open-source|"
    r"[a-z]+-(?:backed|driven|based|scale|party|series|tenant|shot))",
    re.I,
)


def visible_text(html: str) -> str:
    html = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.S)
    return unescape(re.sub(r"<[^>]+>", " ", html))


def lint(path: Path) -> list[str]:
    text = visible_text(path.read_text(encoding="utf-8"))
    flat = re.sub(r"\s+", " ", text)
    low = flat.lower()
    found = []

    em, en = flat.count("—"), flat.count("–")
    if em:
        found.append(f"{em} em dash(es) in prose")
    if en:
        found.append(f"{en} en dash(es) in prose")

    for phrase in PHRASES:
        n = len(re.findall(rf"\b{re.escape(phrase)}\b", low))
        if n:
            found.append(f"AI-copy phrase {phrase!r} x{n}")

    for ph in PLACEHOLDERS:
        if ph in low:
            found.append(f"placeholder text {ph!r}")

    # Domains and file names carry hyphens that are not prose.
    without_domains = re.sub(r"\b[\w.-]+\.(?:com|io|dev|org|net|ai|pdf|png|md)\b", " ", flat)
    stray = [h for h in re.findall(r"\b[\w']+-[\w']+\b", without_domains)
             if not ALLOWED_HYPHEN.fullmatch(h)]
    if stray:
        found.append(f"review hyphenated terms: {', '.join(sorted(set(stray)))}")

    return found


def main() -> int:
    failures = 0
    for path in sorted(ROOT.glob("*.html")):
        issues = lint(path)
        if issues:
            failures += 1
            print(f"{path.name}:")
            for issue in issues:
                print(f"  {issue}")
        else:
            print(f"{path.name}: clean")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())

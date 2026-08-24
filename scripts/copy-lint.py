#!/usr/bin/env python3
"""Flag generated-sounding or placeholder copy in portfolio source files."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PHRASES = [
    "not just",
    "at the intersection",
    "bridging",
    "unlock",
    "production-grade",
    "seamless",
    "robust",
    "cutting-edge",
    "game-changing",
    "real-world",
    "end-to-end",
    "transforming",
    "empowering",
    "built to",
    "designed to",
    "coming soon",
    "passionate",
    "leverage",
    "delve",
    "tapestry",
    "in today's world",
    "landscape of",
    "testament to",
]

PLACEHOLDERS = ["lorem ipsum", "tbd", "todo", "xxx", "placeholder"]


def source_files() -> list[Path]:
    files = [*ROOT.glob("src/**/*.ts"), *ROOT.glob("src/**/*.tsx")]
    return sorted(path for path in files if ".test." not in path.name)


def lint(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    low = re.sub(r"\s+", " ", text).lower()
    found: list[str] = []

    for phrase in PHRASES:
        count = len(re.findall(rf"\b{re.escape(phrase)}\b", low))
        if count:
            found.append(f"generated-sounding phrase {phrase!r} x{count}")

    for placeholder in PLACEHOLDERS:
        if re.search(rf"\b{re.escape(placeholder)}\b", low):
            found.append(f"placeholder text {placeholder!r}")

    if "—" in text:
        found.append("em dash in user-facing source")

    return found


def main() -> int:
    failures = 0
    for path in source_files():
        issues = lint(path)
        if not issues:
            continue
        failures += 1
        print(f"{path.relative_to(ROOT)}:")
        for issue in issues:
            print(f"  {issue}")

    if failures:
        return 1

    print(f"copy clean across {len(source_files())} source files")
    return 0


if __name__ == "__main__":
    sys.exit(main())

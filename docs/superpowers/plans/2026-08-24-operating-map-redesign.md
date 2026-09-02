# Operating Map Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static-exported, evidence-first portfolio whose signature is an accessible interactive map of Akash's applied AI work.

**Architecture:** A thin Next.js App Router shell renders typed profile content through feature-local presentational components. A dynamically loaded React Flow view and a semantic fallback consume the same map data, while a feature-scoped Zustand store synchronizes selection with the detail panel and URL hash.

**Tech Stack:** Next.js, React, strict TypeScript, `@xyflow/react`, Zustand, CSS Modules/global design tokens, Vitest, Testing Library, Playwright, axe.

**Spec:** `docs/superpowers/specs/2026-08-24-operating-map-redesign.md`

## Global Constraints

- Named exports only and no TypeScript `any`.
- API or content logic never lives in UI components.
- Content is defined once in typed modules and reused by graph, fallback, and evidence views.
- Static export must deploy at `https://akashkokare2910.github.io/`.
- No secrets, environment files, confidential employer details, or unsupported metrics.
- Work only on `feat/operating-map-redesign`; do not merge or push to `main`.
- Mobile must use a semantic map list rather than a shrunken canvas.
- Reduced motion, keyboard access, WCAG AA, and 44px touch targets are release blockers.

---

### Task 1: Static application foundation and typed content

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/features/profile/types.ts`, `src/features/profile/content.ts`, `src/features/profile/content.test.ts`
- Move: public assets remain under `public/`

**Interfaces:**
- Produces: `profile`, `mapNodes`, `mapEdges`, `evidenceCases`, and `journey` typed exports.
- Consumes: verified copy and assets from the current static site and resume.

- [ ] Write a failing content-integrity test that asserts unique IDs, exactly three evidence cases, no repeated full name outside identity, and no banned marketing phrases.
- [ ] Run the focused test and confirm it fails before modules exist.
- [ ] Add the Next.js static-export foundation and typed content interfaces.
- [ ] Populate one source of truth, using `800+ automated tests` until the exact count is reconciled.
- [ ] Run unit tests, TypeScript, and a production build.
- [ ] Commit the foundation and content system.

### Task 2: Tokenized page shell and identity-first hero

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`
- Create: `src/features/profile/components/Hero.tsx`, `src/features/profile/components/ProofRail.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`
- Test: `src/features/profile/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `profile.identity`, `profile.thesis`, and `profile.proof`.
- Produces: semantic `#thesis` and navigation landmarks.

- [ ] Write failing tests for one visible English full name, the Marathi identity, thesis heading, and non-repeated footer identity.
- [ ] Run the test and confirm failure.
- [ ] Implement the header, hero, restrained proof rail, and minimal contact footer.
- [ ] Implement CSS tokens, asymmetric grid, visible focus, reduced motion, and 44px targets.
- [ ] Run tests and inspect 375px and 1440px renders.
- [ ] Commit the shell and hero.

### Task 3: Accessible Operating Map

**Files:**
- Create: `src/features/operating-map/store.ts`
- Create: `src/features/operating-map/components/OperatingMap.tsx`
- Create: `src/features/operating-map/components/OperatingMapClient.tsx`
- Create: `src/features/operating-map/components/OperatingMapFallback.tsx`
- Create: `src/features/operating-map/components/MapNode.tsx`
- Create: `src/features/operating-map/components/MapDetail.tsx`
- Create: `src/features/operating-map/operating-map.css`
- Test: `src/features/operating-map/components/OperatingMapFallback.test.tsx`, `src/features/operating-map/store.test.ts`

**Interfaces:**
- Consumes: typed `mapNodes` and `mapEdges`.
- Produces: `selectedNodeId`, `selectNode(id)`, `clearSelection()`, semantic fallback, and dynamically loaded graph.

- [ ] Write failing tests for complete fallback content, selection, clearing, and URL-hash initialization.
- [ ] Run tests and confirm failure.
- [ ] Implement narrow Zustand selectors and URL synchronization.
- [ ] Implement the semantic fallback first.
- [ ] Implement fixed-position custom React Flow nodes with bounded navigation and no dragging.
- [ ] Add keyboard labels, live selection feedback, reduced-motion styling, and a mobile fallback breakpoint.
- [ ] Run tests, TypeScript, and keyboard smoke checks.
- [ ] Commit the Operating Map.

### Task 4: Three evidence cases and compressed journey

**Files:**
- Create: `src/features/evidence/components/EvidenceSection.tsx`
- Create: `src/features/evidence/components/EvidenceCase.tsx`
- Create: `src/features/evidence/components/EvalForgeArtifact.tsx`
- Create: `src/features/evidence/components/ContractExample.tsx`
- Create: `src/features/profile/components/Journey.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`
- Test: `src/features/evidence/components/EvidenceSection.test.tsx`

**Interfaces:**
- Consumes: `evidenceCases`, approved images, public links, and `journey`.
- Produces: semantic `#evidence` and `#journey` sections with no repeated project summaries.

- [ ] Write failing tests that require exactly three unique case headings, evidence labels, and verified links.
- [ ] Run tests and confirm failure.
- [ ] Implement artifact-led cases with progressive disclosure where useful.
- [ ] Implement the compact journey without repeating current-role prose.
- [ ] Verify employer-sensitive copy stays at the already-public abstraction level.
- [ ] Run tests and responsive checks.
- [ ] Commit evidence and journey.

### Task 5: Accessible HTML resume, metadata, and deployment

**Files:**
- Create: `src/app/resume/page.tsx`, `src/app/resume/resume.css`
- Modify: `src/app/layout.tsx`, `next.config.ts`, `.github/workflows/deploy.yml`, `README.md`
- Test: `src/app/resume/resume.test.tsx`

**Interfaces:**
- Consumes: shared profile, journey, evidence, and existing PDF.
- Produces: printable semantic `/resume`, static-export deployment, updated metadata and JSON-LD.

- [ ] Write failing tests for resume headings, dates, PDF download, and absence of portfolio hero duplication.
- [ ] Run tests and confirm failure.
- [ ] Implement the semantic resume and print styles.
- [ ] Update title, description, Open Graph metadata, canonical link, and Person JSON-LD.
- [ ] Add GitHub Pages build/deploy workflow and document local commands.
- [ ] Run tests and production export.
- [ ] Commit resume and deployment.

### Task 6: Production quality gate

**Files:**
- Create: `tests/e2e/portfolio.spec.ts`, `playwright.config.ts`
- Modify: `scripts/copy-lint.py` only if it must scan generated content modules.

**Interfaces:**
- Consumes: the complete production export.
- Produces: verified desktop/mobile screenshots, axe results, keyboard behavior, and final branch status.

- [ ] Add browser tests for thesis, map fallback/interaction, three cases, resume, and link targets.
- [ ] Add 320, 375, 768, and 1440 viewport overflow assertions.
- [ ] Run copy lint, unit tests, TypeScript, and the production build.
- [ ] Run browser tests and accessibility scan against the local production server.
- [ ] Capture and visually inspect desktop and mobile screenshots.
- [ ] Remove one unnecessary element after the visual critique.
- [ ] Confirm no secret, environment file, generated cache, or unrelated workspace change is staged.
- [ ] Commit verification fixes and report the branch as ready for review, without merging.


# Mobile Information Density Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mobile card stack with a compact relationship map, progressive evidence dossiers, and a responsive forecasting topology while preserving the complete desktop story and zero-runtime performance.

**Architecture:** The page keeps one typed content source and feature-local server components. Desktop and mobile operating-map presentations share `mapNodes` and `mapEdges`; evidence uses one semantic article with native disclosure; forecasting uses authored HTML and decorative SVG rather than a graph runtime.

**Tech Stack:** Next.js 16 App Router static export, React 19 server components, strict TypeScript, semantic HTML, CSS media queries, inline SVG, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-24-mobile-information-density-redesign.md`

## Global Constraints

- No React Flow, carousel dependency, animated graph physics, or pan-and-zoom controls.
- No client state, global store, API logic, `any`, or duplicated content module.
- Preserve the current verified case-study claims, public links, metadata, resume, and deployment behavior.
- Every disclosure and link must work with keyboard controls and provide at least a 44-pixel mobile target.
- Keep meaningful content without JavaScript and preserve a Lighthouse target of 95 or higher in every category.
- Default 375 by 812 mobile length must be no more than seven viewports; map height no more than 700 pixels; collapsed evidence no more than 2,200 pixels.

---

### Task 1: Compact Mobile Operating Map

**Files:**
- Create: `src/features/operating-map/components/MobileOperatingMap.tsx`
- Create: `src/features/operating-map/components/MobileOperatingMap.test.tsx`
- Modify: `src/features/operating-map/components/OperatingMap.tsx`
- Modify: `src/features/operating-map/operating-map.css`

**Interfaces:**
- Consumes: `mapNodes: MapNodeItem[]` from `src/features/profile/content.ts`.
- Produces: named server component `MobileOperatingMap(): JSX.Element` and responsive classes `.operating-map__desktop` and `.operating-map__mobile`.

- [ ] **Step 1: Write the failing semantic-map tests**

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileOperatingMap } from "./MobileOperatingMap";

describe("MobileOperatingMap", () => {
  it("presents the thesis and three systems as one constellation", () => {
    render(<MobileOperatingMap />);
    const map = screen.getByLabelText("Three systems connected by one engineering thesis");
    expect(within(map).getByText("Applied AI engineering")).toBeInTheDocument();
    for (const system of ["EvalForge", "Forecasting platform", "MCPLint"]) {
      expect(within(map).getByRole("link", { name: system })).toBeInTheDocument();
    }
    for (const relation of ["Evaluate behavior", "Serve reliably", "Clarify contracts"]) {
      expect(within(map).getByText(relation)).toBeInTheDocument();
    }
  });

  it("places supporting practices in one disclosure", () => {
    render(<MobileOperatingMap />);
    expect(screen.getByText("Methods behind the systems").closest("details")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run the test and verify the missing-component failure**

Run: `npm test -- --run src/features/operating-map/components/MobileOperatingMap.test.tsx`

Expected: FAIL because `MobileOperatingMap.tsx` does not exist.

- [ ] **Step 3: Implement the semantic constellation**

Create a server component that resolves the center node and the three evidence-linked system nodes from `mapNodes`. Render a compact SVG edge layer, a central thesis node, three evidence anchors, explicit relationship labels, and one `details` element containing the remaining practice and principle labels. Throw an error when an expected content node is missing so source drift fails loudly.

- [ ] **Step 4: Compose desktop and mobile map presentations**

Update `OperatingMap` to render `OperatingMapGraph` inside `.operating-map__desktop` and `MobileOperatingMap` inside `.operating-map__mobile`. CSS shows exactly one presentation at each breakpoint, caps the mobile constellation, and removes the eleven-card mobile layout without modifying the desktop graph.

- [ ] **Step 5: Run focused and full tests**

Run: `npm test -- --run src/features/operating-map/components/MobileOperatingMap.test.tsx src/features/operating-map/components/OperatingMapGraph.test.tsx`

Expected: both files PASS with no warnings.

- [ ] **Step 6: Commit the map**

```bash
git add src/features/operating-map
git commit -m "feat: add compact mobile operating map"
```

### Task 2: Progressive Evidence Dossiers

**Files:**
- Create: `src/features/evidence/components/EvidenceCase.test.tsx`
- Modify: `src/features/evidence/components/EvidenceCase.tsx`
- Modify: `src/features/evidence/evidence.css`

**Interfaces:**
- Consumes: `EvidenceCaseData` with `facts`, `problem`, `ownership`, `decision`, `artifact`, and links.
- Produces: one `article.evidence-case`, an always-visible `.evidence-case__proofline`, and one native `details.evidence-case__depth` per case.

- [ ] **Step 1: Write failing dossier tests**

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { evidenceCases } from "@/features/profile/content";
import { EvidenceCase } from "./EvidenceCase";

describe("EvidenceCase", () => {
  it("keeps two headline facts visible and moves depth into one disclosure", () => {
    const item = evidenceCases[2];
    render(<EvidenceCase item={item} />);
    const article = screen.getByRole("article");
    expect(within(article).getByText(item.facts[0].value)).toBeInTheDocument();
    expect(within(article).getByText(item.facts[1].value)).toBeInTheDocument();
    const disclosure = within(article).getByText("Open case evidence").closest("details");
    expect(disclosure).toBeTruthy();
    expect(within(disclosure as HTMLElement).getByText(item.problem)).toBeInTheDocument();
  });

  it("renders each verified fact once", () => {
    const item = evidenceCases[0];
    render(<EvidenceCase item={item} />);
    for (const fact of item.facts) {
      expect(screen.getAllByText(fact.value)).toHaveLength(1);
    }
  });
});
```

- [ ] **Step 2: Run the test and verify the missing-disclosure failure**

Run: `npm test -- --run src/features/evidence/components/EvidenceCase.test.tsx`

Expected: FAIL because `Open case evidence` and `.evidence-case__proofline` do not exist.

- [ ] **Step 3: Refactor the case into summary and depth**

Keep the title, thesis, links, and first two facts in the article header. Wrap decisions, artifact, and facts three and four in a native `details` element with a `summary` labelled `Open case evidence`. Keep every verified value rendered once. Do not create a second content object or mobile-only paragraph.

- [ ] **Step 4: Add responsive dossier presentation**

On mobile, render the summary as a 44-pixel control and keep depth closed by default. At desktop widths, visually expose the existing complete case presentation only if browser accessibility inspection confirms the detail content remains in the accessibility tree; otherwise retain the explicit disclosure at desktop and style it as an intentional case-file control.

- [ ] **Step 5: Run evidence tests**

Run: `npm test -- --run src/features/evidence/components/EvidenceCase.test.tsx src/features/evidence/components/EvidenceSection.test.tsx`

Expected: both files PASS and every fact occurs once.

- [ ] **Step 6: Commit the dossiers**

```bash
git add src/features/evidence
git commit -m "feat: make evidence depth progressive on mobile"
```

### Task 3: Forecasting System Topology

**Files:**
- Create: `src/features/evidence/components/ForecastArtifact.test.tsx`
- Modify: `src/features/evidence/components/ForecastArtifact.tsx`
- Modify: `src/features/evidence/evidence.css`

**Interfaces:**
- Produces: `ForecastArtifact(): JSX.Element` with ordered stages `Inputs`, `Validation gate`, `Job control`, `Inference`, and `Authenticated API`, plus output branches `Product`, `MCP`, and `Agent`.

- [ ] **Step 1: Write the failing topology test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ForecastArtifact } from "./ForecastArtifact";

describe("ForecastArtifact", () => {
  it("shows the execution path and three delivery branches", () => {
    render(<ForecastArtifact />);
    for (const stage of ["Inputs", "Validation gate", "Job control", "Inference", "Authenticated API"]) {
      expect(screen.getByRole("heading", { name: stage })).toBeInTheDocument();
    }
    for (const output of ["Product", "MCP", "Agent"]) {
      expect(screen.getByText(output)).toBeInTheDocument();
    }
    expect(screen.getAllByTestId("forecast-connector")).toHaveLength(7);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails on the old five-card model**

Run: `npm test -- --run src/features/evidence/components/ForecastArtifact.test.tsx`

Expected: FAIL because the named architecture stages, output branches, and connectors do not exist.

- [ ] **Step 3: Implement the fixed topology**

Render an ordered list for the five execution stages, a nested output list for Product, MCP, and Agent, and an `aria-hidden` SVG with seven authored connector paths marked `data-testid="forecast-connector"`. Keep all relationship meaning in adjacent text so the SVG remains decorative.

- [ ] **Step 4: Add desktop graph and mobile scroll-snap styles**

Desktop fits the entire topology inside one bounded artifact with the API visibly branching into outputs. Mobile uses `grid-auto-columns: minmax(72%, 18rem)`, horizontal overflow, scroll snap, a visible `Swipe the system path →` cue, and no vertical stacking. Use existing color, type, radius, and spacing tokens.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- --run src/features/evidence/components/ForecastArtifact.test.tsx`

Expected: PASS with five execution headings, three outputs, and seven connectors.

- [ ] **Step 6: Commit the topology**

```bash
git add src/features/evidence/components/ForecastArtifact.tsx src/features/evidence/components/ForecastArtifact.test.tsx src/features/evidence/evidence.css
git commit -m "feat: show forecasting as a system topology"
```

### Task 4: Mobile Rhythm and Scan Length

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/features/evidence/evidence.css`
- Modify: `src/features/operating-map/operating-map.css`

**Interfaces:**
- Produces: responsive spacing and typography only; no new content API.

- [ ] **Step 1: Record the current browser baseline**

At 375 by 812, record total document height and the hero, proof, map, evidence, and journey section heights. Baseline from the approved spec: 9,963 total, 1,473 map, and 5,994 evidence pixels.

- [ ] **Step 2: Tighten mobile-only spacing**

Reduce surplus section padding, evidence-case gaps, artifact margins, and journey-row padding below 650 pixels. Keep the hero thesis legible and all touch targets at least 44 pixels. Do not reduce body copy below the existing readable size or hide unique content.

- [ ] **Step 3: Verify responsive budgets in the browser**

At 375 by 812, verify total default height is at most 5,684 pixels, map height at most 700 pixels, and collapsed evidence height at most 2,200 pixels. At 320 and 768 pixels, verify `scrollWidth === clientWidth`.

- [ ] **Step 4: Capture and critique screenshots**

Capture the mobile map, one collapsed dossier, one expanded dossier, the mobile forecasting path, and the desktop map. Remove any visual element that does not clarify hierarchy or relationships.

- [ ] **Step 5: Commit the rhythm pass**

```bash
git add src/app/globals.css src/features/evidence/evidence.css src/features/operating-map/operating-map.css
git commit -m "style: sharpen mobile information hierarchy"
```

### Task 5: Production Quality Gate

**Files:**
- Modify only files required by failures found during verification.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test && npm run typecheck && npm run copy-lint && npm run build && git diff --check`

Expected: all tests pass, TypeScript and copy lint are clean, static export succeeds, and the runtime-strip step leaves structured data intact.

- [ ] **Step 2: Verify browser behavior**

At 320, 375, 768, and 1440 pixels, verify one H1, three cases, no horizontal page overflow, map links, disclosure keyboard behavior, forecasting horizontal scrolling on mobile, and complete desktop graph visibility. Confirm the browser console is clean.

- [ ] **Step 3: Run Lighthouse**

Run a mobile Lighthouse audit against `http://127.0.0.1:4173/` and record Performance, Accessibility, Best Practices, SEO, LCP, TBT, and transfer size.

Expected: every category is at least 95, TBT is zero or negligible, and transfer size has no material regression from 137 KiB.

- [ ] **Step 4: Commit verification fixes if any**

If verification changes source files, inspect `git status --short`, stage each reported source or test file by its exact path, rerun the complete automated suite, and commit with `git commit -m "fix: close mobile portfolio quality gaps"`. If verification requires no changes, do not create an empty commit.

# Desktop Open Casebook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every engineering case substantive and immediately inspectable on desktop while preserving the compact native disclosures on tablet and mobile.

**Architecture:** Keep the existing single `EvidenceCase` semantic tree and use an author-level desktop media query to expose the closed details body without JavaScript. Retain native details behavior below 901px, add a sticky desktop identity rail, and tighten only desktop vertical rhythm through the existing feature and global stylesheets.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript 5.9, semantic HTML, CSS media queries, Vitest, Testing Library, browser visual verification, Lighthouse

**Spec:** `docs/superpowers/specs/2026-08-24-desktop-open-casebook-design.md`

## Global Constraints

- Render every evidence fact exactly once from `src/features/profile/content.ts`.
- Introduce no client component, viewport script, ReactFlow dependency, additional font, or duplicated responsive content.
- Desktop evidence is visually open at widths of 901px and wider.
- Tablet and mobile evidence is collapsed by default at widths of 900px and narrower.
- Retain native details/summary keyboard behavior and 44px minimum targets.
- Preserve the compact mobile operating map and current mobile spacing.
- Keep the production output static and free of unused Next.js client runtime.
- Never push directly to `main`; integration happens through a pull request.

---

### Task 1: Clarify the mobile disclosure contract

**Files:**
- Modify: `src/features/evidence/components/EvidenceCase.test.tsx`
- Modify: `src/features/evidence/components/EvidenceCase.tsx`

**Interfaces:**
- Consumes: `EvidenceCaseData` from `src/features/profile/types.ts`
- Produces: one closed `<details className="evidence-case__depth">` per case with the visible summary label `Inspect system proof`

- [ ] **Step 1: Write the failing disclosure-copy test**

Replace the old disclosure lookup and assert the default semantic state:

```tsx
const disclosureLabel = within(article).getByText("Inspect system proof");
const disclosure = disclosureLabel.closest("details");

expect(disclosure).toBeTruthy();
expect(disclosure).not.toHaveAttribute("open");
expect(within(disclosure as HTMLElement).getByText(item.problem)).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- src/features/evidence/components/EvidenceCase.test.tsx`

Expected: FAIL because the component still renders `Open case evidence`.

- [ ] **Step 3: Update the semantic disclosure label**

In `EvidenceCase.tsx`, change only the summary's primary label:

```tsx
<summary>
  <span>Inspect system proof</span>
  <small>Problem · ownership · decision · artifact</small>
</summary>
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `npm test -- src/features/evidence/components/EvidenceCase.test.tsx`

Expected: 2 tests pass.

- [ ] **Step 5: Commit the disclosure contract**

```bash
git add src/features/evidence/components/EvidenceCase.tsx src/features/evidence/components/EvidenceCase.test.tsx
git commit -m "refactor: clarify evidence disclosure"
```

---

### Task 2: Expose the desktop casebook without duplicating content

**Files:**
- Modify: `src/features/evidence/evidence.css`

**Interfaces:**
- Consumes: `.evidence-case`, `.evidence-case__header`, `.evidence-case__depth`, `.evidence-case__body`, `.evidence-decisions`, and `.artifact` from `EvidenceCase.tsx`
- Produces: open visual evidence at `min-width: 901px` and unchanged native disclosure behavior below that breakpoint

- [ ] **Step 1: Record the failing desktop geometry**

At 1440px, use the browser to record for every `.evidence-case__depth`:

```js
({
  summaryVisible: getComputedStyle(details.querySelector("summary")).display !== "none",
  bodyVisible: getComputedStyle(details.querySelector(".evidence-case__body")).display !== "none",
  caseHeight: article.getBoundingClientRect().height,
})
```

Expected before implementation: `summaryVisible` is `true` and `bodyVisible` is `false` for every closed case.

- [ ] **Step 2: Add the desktop open-casebook media query**

Add an author-level override before the existing `max-width: 900px` rules:

```css
@media (min-width: 901px) {
  .evidence {
    padding-top: clamp(7rem, 9vw, 9rem);
  }

  .evidence__cases {
    margin-top: clamp(3.5rem, 5vw, 5rem);
  }

  .evidence-case {
    align-items: start;
    padding-block: clamp(4rem, 6vw, 6rem);
  }

  .evidence-case__header {
    position: sticky;
    top: 6rem;
  }

  .evidence-case__depth {
    align-self: start;
  }

  .evidence-case__depth > summary {
    display: none;
  }

  .evidence-case__depth:not([open]) > .evidence-case__body {
    display: block !important;
  }
}
```

The `!important` is narrowly required to override the browser's closed-details descendant rule while keeping the semantic element closed for mobile behavior.

- [ ] **Step 3: Refine the decision register and artifact rhythm**

Within the same desktop media query, give the evidence column a complete first screen:

```css
.evidence-case__body {
  padding-top: 0;
}

.evidence-decisions > div {
  min-height: 11rem;
}

.artifact {
  margin-top: 1.75rem;
}
```

- [ ] **Step 4: Verify the desktop geometry passes**

Rebuild, reload at 1440px, and re-run the geometry probe.

Expected: every summary is hidden, every body is visible, Problem/Ownership/Decision and the artifact are present without interaction, and there is no empty reserved disclosure column.

- [ ] **Step 5: Verify the mobile contract is unchanged**

At 375px and 768px confirm every summary is visible, every closed body is hidden, cases remain single-column, and the page has no horizontal overflow.

- [ ] **Step 6: Commit the open casebook**

```bash
git add src/features/evidence/evidence.css
git commit -m "feat: open engineering evidence on desktop"
```

---

### Task 3: Tighten the desktop narrative rhythm

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/features/operating-map/operating-map.css`

**Interfaces:**
- Consumes: existing `.journey`, `.site-footer`, `.operating-map`, `.operating-map__interactive`, and `.map-graph` layout contracts
- Produces: shorter transitions between related desktop sections without changing mobile values

- [ ] **Step 1: Record the current desktop section geometry**

At 1440px record the top and height of `.hero`, `.proof-rail`, `.operating-map`, `.evidence`, `.journey`, and `.site-footer`.

Expected baseline: operating map begins near 1027px, evidence near 2134px, journey near 4692px, and footer near 5570px in the current production build.

- [ ] **Step 2: Add desktop-only global rhythm values**

Before the `max-width: 760px` rules in `globals.css`, add:

```css
@media (min-width: 901px) {
  .journey {
    padding-top: clamp(7rem, 9vw, 9rem);
  }

  .site-footer {
    margin-top: clamp(5rem, 7vw, 7rem);
  }
}
```

- [ ] **Step 3: Tighten the desktop operating-map transition**

In `operating-map.css`, add desktop values without changing node positions:

```css
@media (min-width: 901px) {
  .operating-map {
    padding-top: clamp(7rem, 9vw, 9rem);
  }

  .operating-map__interactive {
    margin-top: 3rem;
  }
}
```

Do not reduce `.map-graph` below its current 45rem until visual inspection proves all lower nodes and expanded details fit.

- [ ] **Step 4: Build and inspect the complete desktop narrative**

Run: `npm run build`

Expected: static build succeeds and unused client runtime is removed from all static pages.

Inspect at 1024px and 1440px. Expected: no collisions, no clipped map nodes, sticky case headers remain below the site header, and vertical transitions are visibly tighter.

- [ ] **Step 5: Commit the rhythm pass**

```bash
git add src/app/globals.css src/features/operating-map/operating-map.css
git commit -m "style: tighten desktop narrative rhythm"
```

---

### Task 4: Production quality gate

**Files:**
- Verify only; modify source files only when a failed check identifies a regression

**Interfaces:**
- Consumes: the complete homepage and static build
- Produces: fresh evidence that the branch is ready for visual approval and a pull request

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm test
npm run typecheck
npm run copy-lint
npm run build
git diff --check
```

Expected: all tests pass, TypeScript reports no errors, copy lint is clean, the production build succeeds, and the diff check emits no output.

- [ ] **Step 2: Run responsive browser verification**

Check 375px, 768px, 1024px, and 1440px for document width, horizontal overflow, evidence summary/body visibility, map variant, focus targets, and console errors.

Expected:

- 375px and 768px: mobile map visible, desktop map hidden, all evidence summaries visible, all evidence bodies collapsed by default.
- 1024px and 1440px: desktop map visible, mobile map hidden, evidence summaries visually hidden, all evidence bodies visible.
- Every width: `scrollWidth === clientWidth`, one `h1`, three unique evidence cases, and zero console errors.

- [ ] **Step 3: Run Lighthouse against the production preview**

Run Lighthouse in mobile mode against `http://127.0.0.1:4173/`.

Expected: Performance, Accessibility, Best Practices, and SEO are each at least 95.

- [ ] **Step 4: Reopen the verified local build for visual approval**

Open `http://127.0.0.1:4173/` in the app browser and leave the branch unpushed and unmerged until Akash reviews it.

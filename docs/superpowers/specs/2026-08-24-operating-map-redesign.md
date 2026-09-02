# Operating Map Portfolio Redesign

## Purpose

Rebuild Akash Kokare's portfolio as an evidence-first account of an applied AI engineer who makes AI systems behave like dependable software. The page must demonstrate product design judgment as clearly as engineering depth.

## Audience and job

The primary audience is senior engineering and product leadership, founders, research engineers, and collaborators evaluating Akash's thinking and delivery. The page's single job is to make the visitor remember one thesis: Akash builds AI systems that can be tested, trusted, and shipped.

## Identity

The visible identity appears once as `Akash Kokare` with `आकाश कोकरे` as a quiet mother-tongue annotation. The persistent navigation uses `AK`; the footer does not repeat the name.

Hero copy:

- Eyebrow: `AKASH KOKARE / AI ENGINEER AT BIRLA AI LABS`
- Marathi: `आकाश कोकरे`
- Headline: `AI systems should behave like dependable software.`
- Supporting copy: `I build them that way: from time-series foundation models and multi-tenant inference to agent evaluation, MCP tooling, and the interfaces people use.`

## Information architecture

The page contains five surfaces: Thesis, Operating Map, Selected Evidence, Journey, and Contact. News, technology lists, and separate principles are removed. Their unique information is attached to the relevant evidence or map node.

The accessible HTML resume becomes `/resume`; the PDF remains a secondary download.

## Operating Map

The signature component is a read-only authored graph, not a workflow editor. It has a central thesis and four branches: reliable agents, production AI, developer tools, and product craft. Project nodes reveal concise evidence in a synchronized detail panel.

Desktop and tablet use `@xyflow/react` with fixed positions, bounded pan/zoom, non-draggable nodes, keyboard selection, URL hash synchronization, and reduced-motion support. Mobile and no-JavaScript rendering use a semantic list with the same data and relationships.

## Evidence cases

Only three cases are shown:

1. EvalForge: behavioral evaluation, traces, state, regression gates, security, SDK/CLI/CI.
2. MCPLint: deterministic rules, ambiguity detection, behavioral contracts, reporters, release integrity.
3. Forecasting platform: seven models, multi-tenant serving, restart-safe jobs, data layer, MCP, AWS.

Earlier work is compressed into the Journey and may use only verified results: 30% search improvement, 50% conversion-time reduction, and 10x throughput.

The implementation must resolve the existing `847` versus `856` EvalForge test-count discrepancy. Until resolved, public copy says `800+ automated tests`.

## Visual system

The direction is `precision field notes for production AI`.

- Cloud canvas: `#f2f5f4`
- Paper: `#ffffff`
- Carbon: `#101513`
- Slate: `#53605b`
- Rule: `#cdd6d2`
- Verification green: `#167a5a`
- Fault orange: `#d85b2a`, used only for real failures
- Display and body: self-hosted Inter with deliberate optical sizing and tracking
- Utility: system monospace

The Operating Map receives the visual boldness. The rest is quiet. No gradients, glass, glows, marquees, bento grids, fake terminals, giant statistic cards, arbitrary numbering, or scroll-jacking.

## Architecture

Use Next.js App Router with static export for GitHub Pages, strict TypeScript, named exports, no `any`, feature-first files, typed content, CSS tokens, `@xyflow/react`, and feature-scoped Zustand map state. UI components contain no data-access logic.

The graph is client-only and dynamically loaded. Meaningful static HTML is present before it loads. Content comes from one typed module so visible copy cannot be duplicated or drift.

## Quality requirements

- Keyboard access and visible focus for every control and graph node.
- WCAG AA color contrast and no color-only meaning.
- `prefers-reduced-motion` respected.
- 44px mobile touch targets.
- Layouts verified at 320, 375, 768, and 1440px widths.
- No horizontal overflow.
- Meaningful content without JavaScript.
- Explicit image dimensions and lazy-loaded case media.
- Lighthouse target of 95+ for all categories on mobile and desktop.
- Copy lint, unit tests, production build, and browser smoke tests must pass.
- Existing canonical URL, metadata, portrait, resume, favicon, manifest, JSON-LD, and approved public links remain functional.
- Employer-confidential information must not be introduced.


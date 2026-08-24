# Desktop Open Casebook Redesign

**Date:** 2026-08-24  
**Status:** Approved direction; implementation pending  
**Audience:** AI lab, AI-native product, and big-tech hiring managers

## First-principles note

- **Job to be done:** Let a technical hiring manager establish Akash Kokare's engineering depth, ownership, and product judgment within 60–90 seconds.
- **Minimum data:** Operating thesis, three shipped systems, the problem behind each system, Akash's ownership, the consequential decision, observable proof, career trajectory, and contact path.
- **Real constraints:** Desktop and mobile need different information density; the site must publish today; content must not be duplicated; the static, accessible, fast delivery model must remain intact.
- **Essential patterns:** Persistent evidence on desktop and progressive disclosure on mobile. The operating map remains because it explains relationships that prose cannot communicate as efficiently.
- **Friction floor:** One scroll establishes the thesis and scope; another exposes substantive proof. The current desktop exceeds that floor because it reserves 602–714px for each case while hiding most of the evidence.

## Problem

The mobile evidence treatment is currently applied to desktop. Each evidence case uses a two-column grid: the identity column determines the row height, while the right column contains only a collapsed disclosure. The resulting empty right-hand area makes the page appear unfinished and hides the strongest technical material.

The page also uses generous section spacing designed for the earlier editorial composition. After the mobile-density pass, those gaps no longer create useful pacing. They separate related ideas and extend the desktop page without adding evidence.

The hero and operating map are not the source of the regression. The hero states a distinctive thesis, and the map remains the site's primary signature. The redesign should sharpen them rather than replace them.

## Design direction

The desktop site becomes an **open engineering casebook**. Each case reads as an inspectable engineering record rather than a portfolio card:

1. A sticky identity column anchors the system name, thesis, destinations, and primary proof.
2. The evidence column displays Problem, Ownership, and Decision immediately.
3. The relevant system artifact follows directly below those decisions.
4. Supporting facts close the case.

The evidence is visually open on desktop and remains a native disclosure on smaller screens. The same semantic content is rendered once. CSS changes its presentation across breakpoints; no duplicated desktop/mobile copy and no viewport-detection JavaScript are introduced.

## Information architecture

The homepage order remains:

1. Thesis and identity
2. Quantified proof rail
3. Operating map
4. Selected engineering evidence
5. Career journey
6. Contact

This order answers the hiring sequence: who is this person, how do they think, what have they built, what decisions did they own, and how can I contact them?

No news feed, publication feed, technology inventory, or additional project grid will be added. The colleague reference demonstrates the value of immediately visible proof, but its card layout and narrow desktop column are not appropriate to Akash's applied-AI systems narrative.

## Evidence case behavior

### Desktop: 901px and wider

- Hide the disclosure summary visually while keeping the underlying semantic content tree intact.
- Override the closed-details descendant rule so the evidence body is rendered without requiring interaction.
- Keep the case identity column sticky below the site header while its evidence column moves through the viewport.
- Present Problem, Ownership, and Decision as an equal three-column decision register.
- Keep system artifacts at the evidence-column width; do not stretch them decoratively across the entire viewport.
- Reduce case padding so transitions feel deliberate rather than vacant.

### Tablet and mobile: 900px and narrower

- Preserve the current single-column progressive dossiers.
- Show the title, thesis, links, and two primary facts before the disclosure.
- Keep Problem, Ownership, Decision, the artifact, and remaining facts inside the native details element.
- Change the disclosure label from “Open case evidence” to “Inspect system proof.”
- Maintain 44px minimum targets, visible focus, and native Enter/Space operation.

## Global rhythm

- Reduce the space before the operating map, evidence section, journey, and footer on desktop by approximately 35–45%.
- Reduce the gap between the evidence introduction and the first case.
- Retain enough separation for each case to read as an independent record.
- Tighten the desktop map container only if all nodes, labels, edges, and expanded details remain legible without collision.
- Do not reduce the mobile spacing established by the previous pass unless responsive verification identifies a regression.

## Visual system

The existing restrained systems aesthetic remains:

- **Canvas:** `#f2f5f4`
- **Paper:** `#ffffff`
- **Carbon:** `#101513`
- **Slate:** `#53605b`
- **Verification green:** `#167a5a`
- **Display/body:** Inter
- **Utility/data:** system monospace

No additional typeface, gradient, illustration, decorative card treatment, or animation is added. The intentional design risk remains the operating map; the casebook should be precise and quiet.

## Component boundaries

- `EvidenceCase` continues to own one semantic case record.
- Existing artifact components remain feature-local and unchanged unless their desktop geometry requires a narrowly scoped adjustment.
- Responsive behavior stays in `evidence.css`; global rhythm stays in `globals.css`; map geometry stays in `operating-map.css`.
- Profile content remains in `content.ts` and is not duplicated in presentation components.

## Accessibility and performance

- Retain semantic headings, definition lists, articles, links, figures, and native details/summary behavior.
- Desktop-visible evidence must not create duplicate screen-reader announcements.
- Mobile focus order must match visual order.
- Reduced-motion behavior remains unchanged.
- No ReactFlow dependency, viewport script, client component, or additional font is introduced.
- The production output must remain static and free of unused Next.js client runtime.

## Verification

Implementation is complete only when all of the following pass:

- Existing and new component tests
- TypeScript type checking
- Copy lint
- Production build and runtime stripping
- `git diff --check`
- Visual review at 375px, 768px, 1024px, and 1440px
- No horizontal overflow at any verified width
- Desktop evidence bodies visible without interaction
- Mobile evidence bodies collapsed by default and expandable
- Keyboard focus and activation for mobile disclosures and links
- Browser console free of errors
- Lighthouse performance, accessibility, best-practices, and SEO scores of at least 95

## Acceptance criteria

1. At 1440px, no evidence case presents a large blank right column above an unopened disclosure.
2. Problem, Ownership, Decision, the system artifact, and all supporting facts are immediately visible on desktop.
3. At 375px and 768px, the progressive evidence behavior and compact operating map remain intact.
4. Every evidence fact appears exactly once in the document.
5. The page uses one content source and introduces no responsive content duplication.
6. The desktop page feels denser because previously hidden proof is visible, not because additional decorative elements were added.
7. The branch remains unmerged until reviewed through a pull request.

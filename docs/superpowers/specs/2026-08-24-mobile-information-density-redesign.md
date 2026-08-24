# Mobile Information Density Redesign

## Status

Approved design direction. This specification supersedes the responsive-map and evidence-expansion behavior in `2026-08-24-operating-map-redesign.md`. The evidence-first thesis, identity, visual tokens, verified copy, and deployment architecture remain unchanged.

## Problem

The current mobile page preserves the desktop information order but turns the operating map into eleven stacked cards and exposes every case-study layer at once. At 375 by 812 pixels, the page is 9,963 pixels or 12.3 viewports tall. The map consumes 1,473 pixels and the evidence section consumes 5,994 pixels. The mobile map also removes the visible relationships that make the desktop graph meaningful.

The redesign must let a hiring manager understand Akash's engineering thesis, three systems, strongest proof, and career trajectory without an exhausting scroll. Depth must remain available on demand rather than being deleted.

## Audience and mobile reading model

The primary mobile reader is a hiring manager or senior engineering leader scanning between other tasks. The default page is an executive narrative; expanded states are an engineering appendix.

Each viewport should carry one clear idea:

1. Thesis and identity.
2. Quantified proof.
3. How the three systems connect to the thesis.
4. One concise dossier for each system.
5. Career trajectory and contact.

The target default mobile length is no more than seven 812-pixel viewports, with the map no taller than 700 pixels and the collapsed evidence section no taller than 2,200 pixels.

## Operating map

### Desktop

The complete authored graph remains the signature desktop element. It continues to show the central applied-AI thesis, practices, systems, principles, and their ten explicit relationships. It remains semantic HTML and SVG with native disclosure behavior and no graph runtime.

### Mobile

The eleven-card stack is replaced by a compact system constellation:

- Center: `Applied AI engineering`.
- Systems: `EvalForge`, `Forecasting platform`, and `MCPLint`.
- Relationship labels: `evaluate behavior`, `serve reliably`, and `clarify contracts`.

The constellation uses one responsive SVG for edges and four semantic nodes. Each system node links directly to its evidence dossier. Practices and principles remain available in one native `details` disclosure titled `Methods behind the systems`; they are not rendered as separate default cards.

This is not a second content model. Both desktop and mobile derive from the existing typed `mapNodes` and `mapEdges` source. The mobile component selects and reorganizes that source without copying descriptions.

## Evidence dossiers

Each case becomes a progressive dossier on mobile.

Always visible:

- Case label and system name.
- One-sentence thesis.
- Primary public link.
- Two strongest verified facts.
- A native summary control labelled `Open case evidence`.

Inside the disclosure:

- Problem.
- Ownership.
- Decision.
- System artifact.
- Remaining verified facts.

Desktop keeps the current complete case-study presentation. The component uses one content source and one semantic article. Responsive presentation must not duplicate full paragraphs or introduce separate mobile copy.

The disclosure uses native `details` and `summary`, remains keyboard-operable, and requires no JavaScript. Desktop presentation may visually expose the dossier body with responsive CSS only if the accessibility tree also exposes that content; otherwise the desktop case remains a disclosure rather than using an inaccessible CSS override.

## Forecasting system graph

The five equal step cards are replaced by a truthful system topology:

1. Inputs: CSV, Excel, and Parquet.
2. Validation gate: schema, gaps, and frequency.
3. Job control: queue and restart-safe idempotency.
4. Inference: seven zero-shot foundation models.
5. Authenticated API.
6. Outputs: Product, MCP, and Agent.

Desktop presents this as a single directed graph with authored SVG connectors. The final API node branches visibly into the three output surfaces.

Mobile presents the same nodes as a horizontal scroll-snap path. One stage occupies approximately 72 to 80 percent of the viewport so the next stage peeks into view. A visible `Swipe the system path` cue and semantic ordered structure communicate the interaction. The graph must not stack into six tall cards.

React Flow is intentionally not used. The topology is fixed, does not need dragging or zooming, and can be expressed more clearly with semantic HTML and SVG. Avoiding the dependency preserves the zero-runtime page, native accessibility, and the existing 100 performance score.

## Remaining mobile compression

- Keep the hero thesis as the first-screen priority; reduce only surplus vertical spacing.
- Keep all four proof values, arranged as a compact two-by-two rail.
- Reduce section padding on mobile using existing spacing tokens.
- Compress Journey rows while retaining every role and verified outcome.
- Do not introduce a hamburger menu solely for four short navigation links.
- Do not hide unique evidence without a disclosure or destination.

## Component architecture

- `OperatingMap` owns responsive composition.
- `OperatingMapGraph` remains the complete desktop graph.
- A new `MobileOperatingMap` renders the constellation and methods disclosure from typed map data.
- `EvidenceCase` owns the dossier boundary and delegates the detailed body to a focused component when extraction improves readability.
- `ForecastArtifact` owns the fixed forecasting topology and its responsive presentation.
- CSS remains feature-local in `operating-map.css` and `evidence.css`; global tokens are extended only when a value is shared across features.
- No client state, global store, API logic, `any`, or duplicated content module is introduced.

## Accessibility and interaction

- Every disclosure and link must work with Tab, Enter, and Space.
- All mobile touch targets are at least 44 pixels.
- The forecasting path uses semantic ordered content even when connectors are decorative.
- SVG connectors are `aria-hidden`; relationship meaning is also present in text.
- Horizontal scrolling has a visible affordance and does not trap vertical page scrolling.
- Focus indicators use the existing verification-green treatment.
- Reduced-motion users receive no smooth or automated horizontal movement.

## Testing and verification

Test-first implementation must prove:

- The mobile constellation contains one thesis node, the three system nodes, and three textual relationships.
- All remaining methods are available through one semantic disclosure.
- Every evidence dossier exposes its two headline facts before expansion and its detailed evidence inside the disclosure.
- The forecasting graph contains the six ordered stages and three output branches.
- No case paragraph or full name is duplicated in the rendered content source.

Production verification must include:

- Unit tests, strict TypeScript, copy lint, production export, and whitespace checks.
- Browser checks at 320, 375, 768, and 1440 pixels.
- Default mobile document height, section heights, horizontal overflow, touch targets, disclosure operation, and forecasting scroll behavior.
- Keyboard checks for map links and evidence disclosures.
- Lighthouse mobile audit with targets of 95 or higher in every category and no material regression from the current 137 KiB transfer size.

## Non-goals

- Adding React Flow, a carousel dependency, animated graph physics, or pan-and-zoom controls.
- Rewriting verified case-study claims.
- Creating separate mobile routes or duplicate mobile content.
- Hiding the complete evidence from mobile readers.
- Changing deployment, resume content, metadata, or public links.

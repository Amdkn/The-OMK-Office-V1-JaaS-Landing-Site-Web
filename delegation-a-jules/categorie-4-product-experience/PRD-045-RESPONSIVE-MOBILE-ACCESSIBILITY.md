# PRD-045 — Responsive, Mobile & Accessibility Gate
## Objective
Turn Product Experience into a desktop/mobile/keyboard-accessible surface with enforceable gates.
## Scope
Responsive breakpoints, touch targets, focus order, dialogs, navigation, reduced-motion compatibility, accessibility regression tests.
## Contracts
Cross-cutting consumer of Category 4 UI; no business-domain ownership.
## Ownership
Own responsive/accessibility primitives and tests. Changes to other Category 4 files only when required for compliance and must preserve public contracts.
## Acceptance
Critical journeys work at mobile and desktop widths; keyboard-only completion; no focus traps; semantic labels; automated accessibility/responsive regression gate.

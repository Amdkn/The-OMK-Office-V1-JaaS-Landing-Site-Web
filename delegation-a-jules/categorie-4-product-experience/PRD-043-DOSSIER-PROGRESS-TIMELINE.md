# PRD-043 — Dossier Progress & Timeline
## Objective
Expose trustworthy progress for a service/dossier without inventing regulatory status.
## Scope
Milestones, completed/current/blocked states, evidence links, user actions, deterministic progress calculation.
## Contracts
Use workspace/session data and regulatory provenance where applicable. No fabricated government status or deadlines.
## Ownership
Own progress projection/UI and tests; do not alter regulatory rules or persistence engine.
## Acceptance
Progress derived from canonical state; blocked/missing evidence explicit; refresh/resume deterministic; cross-service isolation and failure states tested.

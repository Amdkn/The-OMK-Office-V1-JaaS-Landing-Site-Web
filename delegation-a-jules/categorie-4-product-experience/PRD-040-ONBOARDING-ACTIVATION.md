# PRD-040 — Onboarding & Activation
## Objective
Create deterministic visitor/client onboarding from first entry to an actionable service workspace.
## Scope
Progressive onboarding, role/context detection, first-service activation, resume/re-entry state.
## Contracts
Consume Service Context Router, 75-service compiler, workspace archetype registry and persistence APIs. Do not redefine them.
## Ownership
Own onboarding UI/state/tests only. No auth backend, catalog compiler, regulatory registry or workspace core mutation except additive public adapters.
## Acceptance
Visitor and authenticated flows are deterministic; onboarding is resumable; no cross-client state leakage; keyboard/mobile usable; tests cover first-run, resume and failure states.

# PRD-044 — Notification & Action Center
## Objective
Create an in-product action center for actionable workspace events.
## Scope
Notification model, read/unread, severity/type, deep links, deduplication, user-action queue. In-product only; external email/SMS delivery is out of scope.
## Contracts
Consume existing observability/workspace/session events through additive adapters.
## Ownership
Own notification projection/store/UI/tests; no mutation of observability core or external messaging infrastructure.
## Acceptance
Deterministic dedupe; actionable deep links; persistence; no tenant leakage; offline/recovery behavior; accessible UI tests.

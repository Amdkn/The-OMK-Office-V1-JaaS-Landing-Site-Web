# Category 4 — Product Experience Execution Contract

Parallel workers: PRD-040..045. Each worker owns only its declared surface and tests. Category 0–3 contracts are frozen dependencies, not rewrite targets.

DAG: 040 and 041 may start immediately; 042 consumes existing workspace contracts; 043 consumes canonical workspace/regulatory state; 044 consumes canonical events/state; 045 is cross-cutting and integrates after/alongside 040–044 without redefining business logic.

Global gate: bun run test:ci && bun run typecheck && bun run build && bun run lint.

Merge rule: additive adapters over shared-core rewrites. No hard-coded service catalogue, regulatory claims, auth semantics, or tenant identifiers. Conflicting shared-core edits are rejected unless required by an explicit public-contract defect.

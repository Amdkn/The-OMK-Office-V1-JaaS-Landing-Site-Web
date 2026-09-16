# OMK Office — Parallel PRD Boundaries

Ce document est l'index opérationnel pour Jules. Le contrat supérieur est `PRD-900-PARALLEL-DEVELOPMENT-INTEGRATION-CONTRACT.md`.

## Workstreams parallèles

### Foundation Gate
- PRD-000 + PRD-006 : types/invariants/API publique.
- PRD-007 : versionnement/migrations.

### Catégorie 0 après Foundation Gate
- PRD-001 : store uniquement.
- PRD-002 : path/navigation uniquement.
- PRD-003 : repeater/fields uniquement.
- PRD-004 : visual secretary uniquement.
- PRD-005 : persistence CMS uniquement.

### Catégorie 1
- PRD-010 : rôle/launch routing.
- PRD-011 : shell.
- PRD-016 : contrat plugin.
- PRD-012, 013, 014 : trois plugins parallèles.
- PRD-015 : session workspace.
- PRD-017 : frontière persistence.

### Catégorie 2
- PRD-020 : registry engine.
- PRD-026 : protocole contribution/compilation.- PRD-021, 022, 023 : spécialisations de pôles parallèles.
- PRD-024 : capability affiliation transverse.
- PRD-025 : compilateur final, développé d'abord contre fixtures.

## Interdictions globales
- Ne pas modifier le territoire d'un autre PRD pour faire passer ses tests.
- Ne pas créer une deuxième définition de `EngramNode`, `ServiceSpecializationConfig` ou du plugin workspace.
- Ne pas inventer de règle légale/fiscale/bancaire manquante.
- Ne pas transformer une dépendance optionnelle en dépendance de démarrage.
- Ne pas déclarer `DONE` avec mocks si le contract test d'intégration final échoue.

## Stratégie Jules
Une session = un PRD/work package. Chaque session commence par lire PRD-900, le PRD assigné et ses seuls contrats consommés. Elle produit une branche isolée et un handoff contenant fichiers changés, contrats consommés/publiés, tests exécutés et risques restants.

## Merge waves
Wave A : 000/006/007.
Wave B : 001/002/003/004/005 + 010/011/016.
Wave C : 012/013/014/015/017 + 020/026.
Wave D : 021/022/023/024.
Wave E : 025 + tests E2E contractuels des 75 services.

Les waves sont des gates d'intégration ; à l'intérieur d'une wave, les PRD explicitement indépendants sont développables en parallèle.
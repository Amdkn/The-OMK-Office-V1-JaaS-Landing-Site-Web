# Catégorie 3 — Production Readiness

Objectif : transformer l’implémentation PRD déjà livrée (Waves B→E) en système déployable, observable, testable et récupérable en production.

Cette catégorie ne crée pas de nouveau métier. Elle durcit l’existant.

## PRDs
- PRD-030 — Test Harness & CI Quality Gate
- PRD-031 — End-to-End Integration & User Journeys
- PRD-032 — Persistence, Recovery & Failure Engineering
- PRD-033 — Security, Privacy & Authorization Hardening
- PRD-034 — Regulatory Provenance & Rule Governance
- PRD-035 — Observability, Health & Failure UX

## Dépendances
Tous consomment les contrats stabilisés des catégories 0, 1 et 2.
PRD-031 dépend de 030.
PRD-032, 033, 034, 035 peuvent être développés en parallèle après 030.

## Règle de sortie
Aucun PRD Catégorie 3 ne peut redéfinir les contrats métier ou les 75 services. Toute incompatibilité doit être rapportée au propriétaire du PRD d’origine.
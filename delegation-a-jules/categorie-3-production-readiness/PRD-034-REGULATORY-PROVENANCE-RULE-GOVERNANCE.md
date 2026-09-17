# PRD-034 — Regulatory Provenance & Rule Governance

## Mission
Garantir que toute règle Legal/Finance présentée comme normative possède une provenance vérifiable et une version explicite.

## Scope propriétaire
- modèle de provenance des règles
- métadonnées `source`, `jurisdiction`, `effectiveDate`, `version`, `lastVerifiedAt`
- classification `canonical`, `informational`, `placeholder`, `blocked`
- registry de règles et audit de couverture
- tests empêchant une règle non sourcée d’être présentée comme réelle

## Règles impératives
1. aucune exigence USCIS/tribunal/fiscale/prêt/DTI inventée
2. une règle expirée/non vérifiée ne devient jamais automatiquement canonique
3. un placeholder reste visible comme placeholder
4. les calculateurs déterministes citent leur version de règle
5. toute divergence renvoie au PRD métier propriétaire

## Blockers standards
- `BLOCKER_REGULATORY_SOURCE_REQUIRED`
- `BLOCKER_FINANCIAL_RULE_REQUIRED`
- `BLOCKER_RULE_VERSION_EXPIRED`

## Ne possède pas
- contenu légal/fiscal lui-même
- décisions de conformité métier
- catalogue des 75 services

## Gate
100% des règles normatives actives possèdent provenance complète et tests de non-régression.
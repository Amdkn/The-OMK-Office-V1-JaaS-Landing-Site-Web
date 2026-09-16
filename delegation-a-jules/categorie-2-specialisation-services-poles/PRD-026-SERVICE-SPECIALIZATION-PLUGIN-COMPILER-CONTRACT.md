# PRD-026 : Service Specialization Plugin & Compiler Contract

## 1. Mission
Séparer strictement le moteur de registre PRD-020, les spécialisations 021-024 et le catalogue exhaustif PRD-025 pour autoriser leur développement parallèle.

## 2. Ownership Boundary
PRD-020 owns : types du registry, lookup O(1), validation structurelle et API `getServiceSpecialization`.

PRD-021/022/023 own : plugins/configurations métier de leur pôle et validateurs spécifiques.

PRD-024 owns : capability affiliation/referral/viral ; elle s'enregistre comme capability et ne possède pas le Career Studio.

PRD-025 owns : assemblage/compilation des 75 entrées. Il ne redéfinit ni types ni règles métier.

PRD-026 owns : protocole de contribution et validation d'intégration.

## 3. Published Contract
Une contribution de spécialisation expose `serviceId`, `poleId`, `archetype`, `validationSchemaName`, `defaultProperties`, capabilities et métadonnées requises par PRD-020.

Le compilateur reçoit des contributions et échoue explicitement sur doublon, ID manquant, schéma absent ou champ requis vide.

## 4. Source of Truth
`src/data/msg2MatrixData.ts` reste la source déclarée des identifiants/services tant qu'un autre catalogue canonique n'est pas formellement désigné.

## 5. Règles métier sensibles
Jules ne doit pas inventer les seuils, mentions ou formules réglementaires absents des sources canoniques. Une règle non spécifiée devient une dependency explicite ou un placeholder bloquant, jamais une valeur plausible inventée.

## 6. Parallel Development Gate
Fixtures : une contribution valide par pôle, doublon, service inconnu, schema manquant et capability optionnelle.

Tests contractuels :
- 020 accepte chaque contribution valide ;
- 021/022/023 compilent indépendamment ;
- 025 assemble exactement 75 IDs canoniques ;
- aucun module métier n'importe directement un autre pôle ;
- 024 peut être absent sans casser les services non-affiliation.

## 7. Definition of Done
Les sessions Jules de 021, 022, 023 et 024 peuvent travailler simultanément ; 025 peut être développé contre fixtures et finalisé par assemblage sans réécriture de leurs implémentations.
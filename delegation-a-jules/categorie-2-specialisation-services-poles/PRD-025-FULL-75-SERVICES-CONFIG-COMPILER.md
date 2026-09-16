# PRD-025 : Full 75 Services Configuration Compiler

## 1. Contexte & Problématique
Pour éliminer toute dette technique, coquille vide ou code fictif, le système doit posséder un dictionnaire exhaustif compilant les configurations exactes des 75 services réels d'OMK Office.

## 2. Objectifs & Exigences Techniques
* Compiler un catalogue d'objets `Record<string, ServiceSpecializationConfig>` couvrant :
  - **Pôle 1 :** 25 services (`1.1-1` à `1.5-5`).
  - **Pôle 2 :** 25 services (`2.1-1` à `2.5-5`).
  - **Pôle 3 :** 25 services (`3.1-1` à `3.5-5`).
* Chaque entrée doit définir sans exception :
  - L'identifiant canonique, le pôle de rattachement, l'archétype d'interface.
  - Le titre bilingue (FR et EN).
  - Le schéma de validation Zod associé.
  - La durée moyenne d'exécution et les champs de formulaire par défaut.
* Zéro dépendance cyclique ou import fantôme.

## 3. Fichier Cible
* `src/config/services75.compiled.ts`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/services/services75Compiler.test.ts`
* Le test vérifie que `Object.keys(compiledServices).length === 75`.
* Tous les 75 services passent avec succès la validation de leur schéma Zod respectif.
* Aucun champ obligatoire n'est null, undefined ou vide.


## 5. Ownership Boundary
Owns: assemblage exhaustif des 75 configurations canoniques. Must not own: type registry, validateurs métier ou implémentation des plugins.

## 6. Consumed / Published Contracts
Consomme PRD-020/026 et contributions 021/022/023/024. Publie uniquement `compiledServices` validé et rapports de compilation.

## 7. Parallel Development Gate
Développable d'abord contre fixtures PRD-026; finalisation en Wave E. Toute entrée doit correspondre à un service source de `msg2MatrixData.ts` tant que cette source reste canonique.

Gate final: exactement 75 IDs uniques, aucune config vide, aucun import fantôme, schémas résolus, rapport des règles/placeholders réglementaires encore bloquants.
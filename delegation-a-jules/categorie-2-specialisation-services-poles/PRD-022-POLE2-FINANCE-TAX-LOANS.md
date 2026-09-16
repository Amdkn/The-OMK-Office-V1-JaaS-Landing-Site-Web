# PRD-022 : Spécialisation Pôle 2 — Le Moteur Fiscal, Calculateurs & Éligibilité Prêts

## 1. Contexte & Problématique
Le Pôle 2 (Fiscalité, Microcrédits, Assurances, Comptabilité) traite des opérations monétaires où l'erreur arithmétique n'est pas tolérée.

## 2. Objectifs & Exigences Techniques
* **Parseur & Déclaration Fiscale W-2 / 1099 (Sous-cadre 2.1) :**
  - Grille de saisie des cases W-2 (Box 1 Wages, Box 2 Federal Tax Withheld, etc.) avec vérification de cohérence mathématique.
  - Calculateur automatique de l'estimation de remboursement fiscal (Federal Tax Refund Estimator).
* **Moteur d'Éligibilité Microcrédits & Prêts d'Insertion (Sous-cadre 2.3) :**
  - Formulaire de calcul du ratio d'endettement (*Debt-to-Income Ratio - DTI*).
  - Jauge d'éligibilité en temps réel (Vert si DTI < 36 %, Orange entre 36 et 43 %, Rouge au-delà).
* **Grille de Trésorerie H90 & Facturation (Sous-cadre 2.2 & 2.5) :**
  - Projection de solde sur 12 semaines (alignée sur la méthode 12WY).

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/finance/W2TaxEstimator.tsx`
* `src/components/workspace/finance/LoanEligibilityGauge.tsx`
* `src/lib/finance/taxCalculator.ts`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/financeSpecialization.test.ts`
* Le calcul du ratio DTI est vérifié par rapport aux formules financières bancaires standard.
* L'estimation fiscale W-2 est validée avec zéro divergence d'arrondi sur les centimes.


## 5. Ownership Boundary
Owns: contributions et calculateurs spécialisés Pôle 2. Must not own: Cash Matrix générique, registry ou compilateur 75.

## 6. Consumed / Published Contracts
Consomme PRD-013, PRD-020 et PRD-026. Publie règles/configurations Pôle 2 comme plugins/contributions indépendantes.

## 7. Parallel Development Gate
Seuils DTI, fiscalité W-2/1099 et formules de remboursement exigent une source canonique/versionnée. Jules n'invente ni tranche, ni taux, ni seuil absent.

Calcul monétaire déterministe en centimes/décimal. Tests avec cas de référence sourcés et gestion explicite de l'année fiscale/version de règle.
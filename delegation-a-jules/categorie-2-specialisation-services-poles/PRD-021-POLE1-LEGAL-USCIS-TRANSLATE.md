# PRD-021 : Spécialisation Pôle 1 — Le Moteur Juridique, USCIS & OMK Translate

## 1. Contexte & Problématique
Le Pôle 1 (Immigration, Notariat, Apostilles, Traduction assermentée) exige des formats de données stricts conformes aux autorités fédérales américaines (USCIS, State Department) et consulaires.

## 2. Objectifs & Exigences Techniques
* **Validateurs Déterministes d'Identifiants :**
  - Validation du numéro A-Number USCIS (format exact : `A-XXX-XXX-XXX` ou 9 chiffres).
  - Validation du numéro de sécurité sociale (`SSN` : format `XXX-XX-XXXX`).
  - Validation du numéro de reçu USCIS (format : `SRC-XX-XXX-XXXXX`, `IOE...`, etc.).
* **Module OMK Translate Assermenté (Sous-cadre 1.5) :**
  - Studio bilingue juxtaposé (texte source à gauche / traduction certifiée à droite).
  - Génération automatique de l'attestation de traducteur assermenté (*Certificate of Translation Accuracy*).
  - QR Code et empreinte SHA-256 scellée prouvant l'authenticité de la traduction.
* **Prévisualisation USCIS I-765 & I-539 :**
  - Mappage des champs du store sur les coordonnées officielles du formulaire PDF.

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/legal/UscisFormPreview.tsx`
* `src/components/workspace/legal/OmkTranslateStudio.tsx`
* `src/schemas/legal.validators.ts`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/legalSpecialization.test.ts`
* Un format d'A-Number erroné bloque immédiatement la soumission du dossier.
* L'attestation OMK Translate contient toutes les mentions légales requises par les tribunaux et l'immigration.


## 5. Ownership Boundary
Owns: contributions/validateurs métier du Pôle 1 et adapters de preview/traduction. Must not own: registry engine, shell ou compilateur 75.

## 6. Consumed / Published Contracts
Consomme PRD-012, PRD-020 et protocole PRD-026. Publie contributions Pôle 1 enregistrables indépendamment.

## 7. Parallel Development Gate
Les formats/mentions USCIS et attestations doivent provenir de sources canoniques fournies/vérifiées. Si une règle manque, créer un placeholder bloquant explicite; ne pas inventer une conformité.

PDF officiel, QR et SHA-256 sont capabilities testables séparément. Tests métier fondés sur fixtures sourcées.
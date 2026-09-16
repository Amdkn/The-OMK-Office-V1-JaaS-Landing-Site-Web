# PRD-023 : Spécialisation Pôle 3 — Le Studio JaaS ATS & Mock Interview IA

## 1. Contexte & Problématique
Le Pôle 3 est le cœur de l'offre JaaS 1.0 (Job-as-a-Service). Il doit fournir une expérience d'édition de candidature visuelle et interactive digne des meilleurs outils SaaS du marché (type Reactive Resume / Jack Roberts Website OS).

## 2. Objectifs & Exigences Techniques
* **Studio Visuel de Candidature (Sous-cadre 3.2) :**
  - Mode double vue : Document format lettre/A4 pour impression PDF vs Vue Portfolio Web Mobile responsive.
  - Édition directe de chaque section (Summary, Core Competencies, Professional Experience, Education).
* **Scanner de Mots-Clés ATS en Direct :**
  - Zone de texte pour coller la description du poste convoité.
  - Extraction des termes techniques clés et calcul du score de correspondance ATS (0 à 100 %).
  - Surlignage en vert des mots-clés présents dans le CV et en rouge des mots-clés manquants.
* **Module d'Entraînement aux Entretiens (Mock Interview) :**
  - Générateur de 5 questions comportementales ciblées selon le poste.
  - Grille d'évaluation basée sur la structure STAR (Situation, Tâche, Action, Résultat).

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/career/AtsKeywordScanner.tsx`
* `src/components/workspace/career/MockInterviewSimulator.tsx`
* `src/lib/career/atsScorer.ts`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/careerSpecialization.test.ts`
* Le score ATS reflète fidèlement la présence des mots-clés obligatoires de l'offre d'emploi.
* Le rendu visuel du CV ne déborde jamais sur la page suivante lors de l'aperçu PDF.


## 5. Ownership Boundary
Owns: spécialisations JaaS/ATS/Mock Interview du Pôle 3. Must not own: Career Studio générique, affiliation 024, registry ou compilateur.

## 6. Consumed / Published Contracts
Consomme PRD-014, PRD-020 et PRD-026. Publie capabilities ATS/interview et contributions Pôle 3.

## 7. Parallel Development Gate
Le score ATS doit publier sa formule/version et rester testable sans LLM. Génération de questions IA est un adapter optionnel avec fallback déterministe ou état indisponible explicite.

Tests: scoring fixture, pagination/overflow preview, grille STAR, absence de dépendance directe à 021/022/024.
# PRD-014 : Archétype C — "Career & ATS Studio" (Pôle Carrière & Recrutement)

## 1. Contexte & Problématique
Le Pôle 3 (Pack JOB ATS, refonte de CV, profil LinkedIn, préparation d'entretiens) s'inspire directement du studio visuel de Jack Roberts : un rendu dynamique de document au centre avec un panneau de personnalisation et d'optimisation IA à droite.

## 2. Objectifs & Exigences Techniques
* Implémenter le gabarit `<CareerStudioView serviceId={...} />` :
  - **Preview Canvas Centrale :** Rendu en direct du CV ou de la fiche candidat avec bascule de vue (Aperçu Document PDF vs Aperçu Mobile Portfolio).
  - **Side Studio d'Édition :**
    * Onglet *Design* : Sélection des styles typographiques et de la palette de couleurs.
    * Onglet *ATS Scoring* : Champ de collage d'une offre d'emploi cible calculant un score de compatibilité de 0 à 100 %.
    * Onglet *Contenu & IA* : Boutons de micro-reformulation ("Rendre plus percutant", "Traduire en anglais corporate") sans régénérer l'ensemble de la page.
  - **Mode "Edit More, Rebuild Less" :** Chaque section du CV (expériences, formation, compétences) est éditable inline dans le store Zustand en $O(1)$.

## 3. Composants Cibles
Fichiers cibles :
* `src/components/workspace/templates/CareerStudioView.tsx`
* `src/components/workspace/templates/AtsScoreCard.tsx`
* `src/components/workspace/templates/ResumeCanvas.tsx`

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/workspace/careerStudio.test.tsx`
* La modification d'un texte d'expérience met à jour le canvas en 0 ms sans flash ni lag.
* Le calculateur ATS identifie les mots-clés manquants entre le CV et l'offre d'emploi saisie.
* L'export document conserve la mise en page exacte visualisée à l'écran.


## 5. Ownership Boundary
Owns: archétype générique Career Studio, canvas CV, édition et surface ATS. Must not own: algorithmes spécialisés JaaS ou provider IA.

## 6. Consumed / Published Contracts
Implémente PRD-016 et session PRD-015/017. Publie plugin Career Studio et points d'extension ATS/IA.

## 7. Parallel Development Gate
Scoring et micro-actions IA doivent être injectables/mockables. `0 ms` signifie update local sans round-trip; mesurer rendu/rerenders plutôt que promettre latence physique nulle.

PRD-023 possède les règles JaaS/ATS spécialisées. Tests: édition locale, preview, extension scoring et export stable.
# ADR-003 : Restauration et Positionnement Déterministe du Bouton Menu / Sidebar

* **Statut :** ACCEPTÉ
* **Date :** 2026-09-09
* **Auteur :** Amadou Kone (Architecte & Propriétaire) via Antigravity / Gemini
* **Contexte :** Lors de la PR #2, le nettoyage du Header a supprimé le bouton hamburger / Menu (`Menu` de lucide-react) qui déclenchait l'ouverture du Sidebar via `onOpenSidebar` / `setIsSidebarOpen(true)`. Par conséquent, le Sidebar est devenu inaccessible depuis l'interface sur toutes les vues (Landing Page, Pôles 1/2/3, Dashboard).

---

## 1. Problème & Diagnostic

1. **Régression d'accessibilité :** L'utilisateur n'a aucun moyen visuel d'ouvrir le Sidebar latéral pour explorer les 75 Actes MSG2 ni basculer entre les vues.
2. **Besoin d'indépendance de vue :** Le bouton d'ouverture du Sidebar doit être présent et fonctionnel sur **TOUTES** les vues (Landing Page vitrine et Back-Office), ancré à gauche du logo.

---

## 2. Décision d'Architecture & Directives d'Implémentation

### A. Emplacement & Style dans `src/components/layout/Header.tsx`
1. Réintégrer l'icône `Menu` de `lucide-react`.
2. Placer le bouton **immédiatement à gauche du Logo & Titre "The OMK Office"** dans le conteneur gauche du Header :
   ```tsx
   <button
     type="button"
     onClick={onOpenSidebar}
     className="p-2 mr-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
     aria-label="Ouvrir le menu de navigation"
     title="Menu de navigation"
   >
     <Menu className="w-5 h-5 text-amber-400" />
   </button>
   ```
3. S'assurer que la prop `onOpenSidebar: () => void` est bien définie dans l'interface `HeaderProps` et transmise depuis `src/App.tsx` :
   ```tsx
   onOpenSidebar={() => setIsSidebarOpen(true)}
   ```

### B. Comportement du Sidebar (`src/components/layout/Sidebar.tsx` & `src/App.tsx`)
1. Quand l'utilisateur clique sur le bouton Menu, `isSidebarOpen` passe à `true`.
2. Sur mobile et desktop, le Sidebar s'ouvre soit en overlay fluide avec backdrop cliquable pour fermer, soit en volet latéral rétractable.
3. Conserver le bouton de fermeture (`X`) à l'intérieur du Sidebar pour le refermer (`onClose` / `setIsSidebarOpen(false)`).

### C. Invariants de Non-Régression
* **Ne pas réintroduire** la liste encombrante de liens au centre du Header. Le Header reste épuré :
  - **Gauche :** Bouton `Menu` + Logo OMK.
  - **Droite :** Badge d'accès / Profil + Bouton Paramètres (Modal).
* **Compilation stricte :** `bun run tsc` et `bun run build` doivent impérativement compiler avec **0 erreur**.

---

## 3. Critères d'Acceptation (DoD)

1. Le bouton Menu (icône hamburger dorée/ambre) est visible sur toutes les pages en haut à gauche.
2. Un clic dessus ouvre immédiatement le Sidebar des 75 Actes et des vues.
3. Le bouton de fermeture `X` du Sidebar et le clic hors du Sidebar le referment correctement.
4. Aucun warning ni erreur TypeScript.

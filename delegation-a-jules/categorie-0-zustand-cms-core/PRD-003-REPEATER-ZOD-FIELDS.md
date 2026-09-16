# PRD-003 : Le Repeater Universel & Formulaires Déterministes Connectés

## 1. Contexte & Problématique
Le concept phare de Wix CMS est le **Repeater** : un composant réutilisable qui lie automatiquement les champs d'une collection à des éléments d'interface. OMK Office standardise ce composant avec liaison bidirectionnelle au store Zustand et validation déterministe Zod.

## 2. Objectifs & Exigences Techniques
* Implémenter `<CmsRepeater>` : prend un `parentId` ou une liste de nœuds et effectue le rendu itératif via un gabarit personnalisé.
* Implémenter `<CmsField>` : champ d'édition inline ("Edit More, Rebuild Less") permettant à l'utilisateur ou à l'administrateur de modifier une propriété en temps réel.
* Déterminisme Zod : toute saisie dans `<CmsField>` est validée à la volée. En cas de non-conformité (ex: format de date, texte vide, montant négatif), l'erreur s'affiche immédiatement sans muter l'état global.

## 3. Spécifications des Composants
Fichiers cibles :
* `src/components/cms/CmsRepeater.tsx`
* `src/components/cms/CmsField.tsx`

```tsx
<CmsRepeater 
  parentId="pole-legal" 
  renderItem={(serviceNode) => (
    <div className="card-service">
      <CmsField nodeId={serviceNode.id} fieldKey="title" />
      <CmsField nodeId={serviceNode.id} fieldKey="price" />
    </div>
  )} 
/>
```

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/cms/repeater.test.tsx`
* Le Repeater réagit instantanément à l'ajout ou à la suppression d'un enfant sans re-render des éléments frères.
* La saisie dans un `CmsField` met à jour la propriété dans le store en 0 ms.
* Les entrées invalides sont bloquées par la barrière Zod.

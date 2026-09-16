# PRD-010 : Service Context Router (Modal Visiteur vs Micro-SaaS Client)

## 1. Contexte & Problématique
Actuellement, le clic sur une carte de service déclenche l'ouverture indifférenciée de la pop-up `BookingModal`. Dans l'architecture OMK Office, l'espace membre du client doit débloquer une réelle valeur logicielle : chaque service doit devenir un atelier de production self-service pour le client, tout en préservant la pop-up d'information et de vente pour le visiteur.

## 2. Objectifs & Exigences Techniques
* Créer un hook de routage contextuel `useServiceAction` ou intercepteur de clic.
* Si l'utilisateur a le rôle `visitor` (ou non connecté) :
  - Déclencher l'état `selectedServiceId` pour afficher la pop-up `BookingModal` actuelle sans aucune régression visuelle ou fonctionnelle.
* Si l'utilisateur a le rôle `client` (ou `client_titulaire`) :
  - Interdire l'ouverture de la simple pop-up informative.
  - Déclencher l'ouverture de l'atelier micro-SaaS `<MicroSaaSWorkspace serviceId={id} />`.
* Transition fluide et gestion du retour à l'écran catalogue sans perte de position de scroll.

## 3. Spécifications du Router
Fichier cible : `src/hooks/useServiceLauncher.ts`

```typescript
export function useServiceLauncher() {
  const { user } = useUser();
  const { openWorkspace } = useWorkspaceStore();
  const [modalServiceId, setModalServiceId] = useState<string | null>(null);

  const launchService = (serviceId: string) => {
    if (user.role === 'visitor') {
      // Conservation stricte de la pop-up actuelle
      setModalServiceId(serviceId);
    } else {
      // Ouverture du micro-SaaS dédié
      openWorkspace(serviceId);
    }
  };

  return { launchService, modalServiceId, closeModal: () => setModalServiceId(null) };
}
```

## 4. Critères d'Acceptation & Tests
* Fichier de test : `tests/services/router.test.ts`
* Un utilisateur visiteur qui clique sur une carte voit s'afficher la pop-up de réservation/détails avec le tarif et les livrables.
* Un utilisateur client connecté qui clique sur une carte voit s'afficher le Micro-SaaS Workspace.
* Zéro régression sur les formulaires ou boutons de contact de la modal visiteur.


## 5. Ownership Boundary
Owns: décision `visitor -> modal` / `client -> workspace` et restauration du contexte catalogue. Must not own: auth implementation, modal, shell ou store métier.

## 6. Consumed / Published Contracts
Consomme un contrat utilisateur/role existant et l'API d'ouverture du workspace PRD-011. Publie `launchService` et résultat de routing déterministe.

## 7. Parallel Development Gate
Mocks canoniques `visitor`/`client`. Un rôle inconnu doit suivre une politique explicite fail-safe, jamais être assimilé silencieusement à client.

Tests: modal visiteur intacte, workspace client, retour/scroll, aucune double ouverture.
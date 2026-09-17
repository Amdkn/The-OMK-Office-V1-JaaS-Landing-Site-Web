import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useWorkspaceStore } from '../store/workspaceStore';

export function useServiceLauncher() {
  const { currentRole } = useUser();
  const { openWorkspace } = useWorkspaceStore();
  const [modalServiceId, setModalServiceId] = useState<string | null>(null);

  const launchService = (serviceId: string) => {
    // Si l'utilisateur est client ou client_titulaire
    if (currentRole === 'client' || currentRole === 'client_titulaire' as string) {
      openWorkspace(serviceId);
    } else {
      // Visiteur (ou inconnu par défaut fail-safe)
      setModalServiceId(serviceId);
    }
  };

  const closeModal = () => setModalServiceId(null);

  return { launchService, modalServiceId, closeModal };
}

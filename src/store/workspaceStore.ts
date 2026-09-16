import { create } from 'zustand';

interface WorkspaceState {
  isOpen: boolean;
  activeServiceId: string | null;
  openWorkspace: (serviceId: string) => void;
  closeWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  isOpen: false,
  activeServiceId: null,
  openWorkspace: (serviceId) => set({ isOpen: true, activeServiceId: serviceId }),
  closeWorkspace: () => set({ isOpen: false, activeServiceId: null }),
}));

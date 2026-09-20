import { create } from 'zustand';

export interface TimelineStep {
  id: number;
  label: string;
  sublabel: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
  officerNote?: string;
}

interface DossierState {
  activeDossierId: string | null;
  dossiers: Record<string, TimelineStep[]>;
  setActiveDossier: (id: string) => void;
  getProgress: (dossierId: string) => number;
  updateStepStatus: (dossierId: string, stepId: number, status: TimelineStep['status']) => void;
}

const INITIAL_I589_STEPS: TimelineStep[] = [
  {
    id: 1,
    label: "1. Documents reçus",
    sublabel: "Scans originaux intake validés",
    status: "completed",
    timestamp: "24 Août · 14h15",
    officerNote: "Acte de naissance & passeport scannés au guichet physique de Cincinnati."
  },
  {
    id: 2,
    label: "2. Traduction certifiée",
    sublabel: "Norme légale 8 CFR § 1003.33",
    status: "completed",
    timestamp: "27 Août · 10h30",
    officerNote: "Attestation formelle de compétence et d'exactitude bilingue rédigée et scellée."
  },
  {
    id: 3,
    label: "3. Revue Notariée",
    sublabel: "Sceau Notary Public Ohio",
    status: "current",
    timestamp: "En cours aujourd'hui",
    officerNote: "Apposition du sceau officiel par Sarah Jenkins (Notary Public n° OH-2024-884)."
  },
  {
    id: 4,
    label: "4. Envoi & Dépôt Gouvernement",
    sublabel: "Liasse scellée avec accusé de réception",
    status: "upcoming",
    officerNote: "Expédition par courrier sécurisé USPS Certified Mail avec numéro de suivi."
  },
  {
    id: 5,
    label: "5. Biométrie & EAD",
    sublabel: "Prise d'empreintes & Permis de travail",
    status: "upcoming",
    officerNote: "Convocation au centre d'application biométrique (ASC) de Cincinnati."
  }
];

export const useDossierStore = create<DossierState>((set, get) => ({
  activeDossierId: 'i589',
  dossiers: {
    'i589': INITIAL_I589_STEPS,
  },
  setActiveDossier: (id) => set({ activeDossierId: id }),
  getProgress: (dossierId) => {
    const steps = get().dossiers[dossierId];
    if (!steps || steps.length === 0) return 0;

    const completedSteps = steps.filter(s => s.status === 'completed').length;
    return Math.round((completedSteps / steps.length) * 100);
  },
  updateStepStatus: (dossierId, stepId, status) => set((state) => {
    const steps = state.dossiers[dossierId];
    if (!steps) return state;

    const newSteps = steps.map(s => s.id === stepId ? { ...s, status } : s);
    return {
      dossiers: {
        ...state.dossiers,
        [dossierId]: newSteps
      }
    };
  })
}));

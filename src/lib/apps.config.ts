// Registry configuration for OMK Mobile OS Applications
export interface SystemAppConfig {
  id: string;
  name: string;
  shortName: string;
  pole: 1 | 2 | 3 | 'system';
  poleLabel: string;
  category: string;
  badge?: string;
  description: string;
  iconName: string;
  gradient: string;
  isNative: boolean;
  version: string;
}

export const SYSTEM_APPS_REGISTRY: SystemAppConfig[] = [
  {
    id: "legal-vault",
    name: "Legal Vault (Evidence OS)",
    shortName: "Legal Vault",
    pole: 1,
    poleLabel: "Pôle 1 : Légal & Notariat",
    category: "Legal Engineering",
    badge: "45 MIN",
    description: "Intake souverain P2P, matrice chronologique 30 mois et conformité miroir 8 CFR § 103.2(b)(3) avec bloc notarié certifié.",
    iconName: "Scale",
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    isNative: true,
    version: "SOP-LD05-OPS-001"
  },
  {
    id: "ai-chat",
    name: "Assistant OMK AI",
    shortName: "OMK AI",
    pole: "system",
    poleLabel: "Système Central",
    category: "Intelligence",
    description: "Moteur conversationnel d'intention et d'exécution d'actes pour la Triade.",
    iconName: "Sparkles",
    gradient: "from-blue-600 to-indigo-500",
    isNative: true,
    version: "v2.4"
  },
  {
    id: "baas-status",
    name: "Registre BaaS Corporate",
    shortName: "BaaS Statut",
    pole: 2,
    poleLabel: "Pôle 2 : Finance & Fiscalité",
    category: "Corporate",
    badge: "100%",
    description: "Immatriculations LLC, déclarations fiscales 1099 et conformité bancaire.",
    iconName: "Briefcase",
    gradient: "from-amber-500 to-orange-500",
    isNative: true,
    version: "v1.8"
  },
  {
    id: "node-health",
    name: "Solarpunk PaaS Nodes",
    shortName: "Nœuds OS",
    pole: "system",
    poleLabel: "Système Distribué",
    category: "Infrastructure",
    badge: "99.9%",
    description: "Micro-services locaux, workers asynchrones et télémétrie résiliente.",
    iconName: "Server",
    gradient: "from-purple-600 to-pink-500",
    isNative: true,
    version: "v3.0"
  },
  {
    id: "treasury-widget",
    name: "Trésorerie Règle des 5",
    shortName: "Trésorerie",
    pole: 2,
    poleLabel: "Pôle 2 : Finance & Fiscalité",
    category: "Finance",
    badge: "+$30",
    description: "Suivi du ROI d'amortissement parrainage : 5 x $150 = $750 vs $720 de frais.",
    iconName: "DollarSign",
    gradient: "from-emerald-500 to-green-600",
    isNative: true,
    version: "v1.2"
  },
  {
    id: "security-widget",
    name: "Sécurité & RBAC Souverain",
    shortName: "Sécurité",
    pole: "system",
    poleLabel: "Système de Sécurité",
    category: "Security",
    description: "Chiffrement local AES-256 GCM, gestion de rôles Founder/BaaS/PaaS et tokens JWT.",
    iconName: "Shield",
    gradient: "from-rose-500 to-red-600",
    isNative: true,
    version: "v2.1"
  },
  {
    id: "terminal-widget",
    name: "Terminal Express",
    shortName: "Terminal",
    pole: "system",
    poleLabel: "Console Kernel",
    category: "System Log",
    description: "Flux en direct du serveur Node/Express port 3000 et des transactions locales.",
    iconName: "Terminal",
    gradient: "from-slate-800 to-slate-900",
    isNative: true,
    version: "v1.0"
  },
  {
    id: "notif-center",
    name: "Centre d'Alertes",
    shortName: "Alertes",
    pole: "system",
    poleLabel: "Centre de Notifications",
    category: "System",
    description: "Pile de notifications push prioritaires et accusés de réception d'actes.",
    iconName: "Bell",
    gradient: "from-amber-600 to-amber-700",
    isNative: true,
    version: "v1.0"
  }
];

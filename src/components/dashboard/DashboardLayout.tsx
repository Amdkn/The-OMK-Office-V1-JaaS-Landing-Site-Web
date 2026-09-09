import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUser, UserRole } from "../../contexts/UserContext";
import { VisitorHubView } from "./VisitorHubView";
import { ClientHubView } from "./ClientHubView";
import { StaffOpsView } from "./StaffOpsView";
import { 
  Compass, UserCheck, Shield, Sparkles, ArrowRight, Layers, 
  ChevronRight, Bookmark, Calculator, CheckSquare, Clock, 
  FolderLock, Share2, Calendar, Stamp, Briefcase, CreditCard, 
  Building2, Monitor, Smartphone, MessageSquare, AlertCircle,
  FileText, ShieldCheck, CheckCircle2, User, PhoneCall,
  Flame, ExternalLink, ArrowUpRight, UploadCloud
} from "lucide-react";

export type PersonaType = 'visitor' | 'client' | 'staff';
export type ActiveRole = UserRole | PersonaType;

export interface DashboardLayoutProps {
  activeRole?: ActiveRole;
  onRoleChange?: (role: UserRole) => void;
  className?: string;
}

interface PersonaConfig {
  id: PersonaType;
  title: string;
  roleId: UserRole;
  subtitle: string;
  archetype: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  activeBorder: string;
  badge: string;
  accentBg: string;
  accentText: string;
}

const PERSONAS: PersonaConfig[] = [
  {
    id: 'visitor',
    roleId: 'visiteur',
    title: 'Visiteur / Prospect',
    subtitle: 'Découverte, Diagnostic & Micro-Actes',
    archetype: 'Inspi Coursera / Udemy',
    icon: Compass,
    color: 'text-amber-400',
    gradient: 'from-amber-600 to-orange-600',
    activeBorder: 'border-amber-500',
    badge: 'ACTION CENTER & MARKETPLACE',
    accentBg: 'bg-amber-500/15 border-amber-500/40',
    accentText: 'text-amber-300'
  },
  {
    id: 'client',
    roleId: 'client',
    title: 'Client Bénéficiaire',
    subtitle: 'Suivi Logistique & Coffre-fort Familial',
    archetype: 'Inspi Uber / Airbnb',
    icon: UserCheck,
    color: 'text-emerald-400',
    gradient: 'from-emerald-600 to-teal-600',
    activeBorder: 'border-emerald-500',
    badge: 'TRACKER LOGISTIQUE & VAULT',
    accentBg: 'bg-emerald-500/15 border-emerald-500/40',
    accentText: 'text-emerald-300'
  },
  {
    id: 'staff',
    roleId: 'admin',
    title: 'Staff / Back-Office Ops',
    subtitle: 'Intake, Adjudication & Assermentation 8 CFR',
    archetype: 'Inspi CRM Déterministe',
    icon: Shield,
    color: 'text-purple-400',
    gradient: 'from-purple-600 to-indigo-600',
    activeBorder: 'border-purple-500',
    badge: 'COCKPIT OPÉRATIONS & INTAKE',
    accentBg: 'bg-purple-500/15 border-purple-500/40',
    accentText: 'text-purple-300'
  }
];

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  tagline: string;
}

const VISITOR_NAV_ITEMS: NavItem[] = [
  { 
    id: 'diagnostic', 
    label: '1. Diagnostic Initial', 
    icon: Compass, 
    badge: 'Express', 
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    tagline: 'Profil & Recommandation 1-Click' 
  },
  { 
    id: 'catalogue', 
    label: '2. Catalogue des 75 Actes', 
    icon: Bookmark, 
    badge: '3 Pôles', 
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    tagline: 'Légal, Fiscalité & Carrière' 
  },
  { 
    id: 'simulateur', 
    label: '3. Simulateur $0 Net', 
    icon: Calculator, 
    badge: '$0 Net', 
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    tagline: 'Amortissement & JaaS $300/an' 
  },
  { 
    id: 'checklist', 
    label: '4. Checklist Gratuite', 
    icon: CheckSquare, 
    badge: '12 Pièces', 
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    tagline: 'Intake & Préparation aux RDV' 
  },
];

const CLIENT_NAV_ITEMS: NavItem[] = [
  { 
    id: 'demarches', 
    label: '1. Démarches en cours', 
    icon: Clock, 
    badge: 'J-15', 
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    tagline: 'Suivi Uber I-589 & I-765' 
  },
  { 
    id: 'vault', 
    label: '2. Coffre-fort (Vault)', 
    icon: FolderLock, 
    badge: '3 Scellés', 
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    tagline: 'Documents chiffrés & Sceau 8 CFR' 
  },
  { 
    id: 'ambassadeur', 
    label: '3. Espace Ambassadeur', 
    icon: Share2, 
    badge: '$150', 
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    tagline: 'Code LELO-CIN-50 · +$50/filleul' 
  },
  { 
    id: 'echeances', 
    label: '4. Échéances USCIS', 
    icon: Calendar, 
    badge: 'Actif', 
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    tagline: 'Biométrie & Calendrier d\'Audience' 
  },
];

const STAFF_NAV_ITEMS: NavItem[] = [
  { 
    id: 'inbox', 
    label: '1. File d\'Intake (Inbox)', 
    icon: Layers, 
    badge: '4 Scans', 
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    tagline: 'SOP-LD05 Qualification & OCR' 
  },
  { 
    id: 'dossiers', 
    label: '2. Dossiers Immigration', 
    icon: Briefcase, 
    badge: '1 NOID', 
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    tagline: 'Asile I-589 & RFE Adjudication' 
  },
  { 
    id: 'assermentation', 
    label: '3. Banc d\'Assermentation', 
    icon: Stamp, 
    badge: 'Ohio Seal', 
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    tagline: 'Notary Public & 8 CFR § 1003.33' 
  },
  { 
    id: 'metriques', 
    label: '4. Métriques & Facturation', 
    icon: CreditCard, 
    badge: 'SLA 45m', 
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    tagline: 'Conformité, CA & Stripe Logs' 
  },
];

export function DashboardLayout({ activeRole: controlledRole, onRoleChange, className = "" }: DashboardLayoutProps) {
  const { currentRole, setRole, currentUser, openProfile } = useUser();
  const [selectedNavItemId, setSelectedNavItemId] = useState<string | null>(null);

  // Determine effective active persona from controlled prop or UserContext
  const effectiveRole = controlledRole || currentRole;
  
  const activePersona: PersonaType = 
    effectiveRole === 'visiteur' || effectiveRole === 'visitor' ? 'visitor' :
    effectiveRole === 'client' ? 'client' : 'staff';

  const currentPersonaConfig = PERSONAS.find(p => p.id === activePersona) || PERSONAS[0];

  const handleSelectPersona = (persona: PersonaType) => {
    const targetRole: UserRole = 
      persona === 'visitor' ? 'visiteur' :
      persona === 'client' ? 'client' : 'admin';

    setRole(targetRole);
    setSelectedNavItemId(null);
    onRoleChange?.(targetRole);
  };

  // Get current sidebar navigation items based on active role
  const currentNavItems = 
    activePersona === 'visitor' ? VISITOR_NAV_ITEMS :
    activePersona === 'client' ? CLIENT_NAV_ITEMS : STAFF_NAV_ITEMS;

  return (
    <div className={`space-y-6 w-full ${className}`}>

      {/* 1. TOP GLOBAL PERSONA SWITCHER */}
      <section 
        aria-label="Sélecteur de mode opérationnel"
        className="p-5 md:p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md space-y-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Architecture Tri-Rôle & Divulgation Progressive
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white mt-0.5 tracking-tight">
              Console Opérationnelle & Sélecteur de Rôle
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Rôle actif : <strong className="text-white capitalize">{activePersona}</strong></span>
            </span>
          </div>
        </div>

        {/* 3 Prominent Persona Cards with Fluid Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PERSONAS.map((p) => {
            const isActive = activePersona === p.id;
            const Icon = p.icon;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPersona(p.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer relative overflow-hidden border ${
                  isActive
                    ? `bg-gradient-to-br ${p.gradient} text-white shadow-xl shadow-black/40 scale-[1.01] border-white/40 ring-1 ring-white/30`
                    : 'bg-slate-950/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-6 -mt-6" />
                )}

                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isActive ? 'bg-white/20 text-white scale-105' : 'bg-slate-800 text-slate-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-black/30 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}>
                    {p.archetype}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="text-sm font-black leading-tight flex items-center justify-between">
                    <span>{p.title}</span>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                    {p.subtitle}
                  </div>
                  <div className={`text-[9px] font-mono uppercase tracking-wider font-bold pt-1 ${
                    isActive ? 'text-white/95' : 'text-slate-500'
                  }`}>
                    {p.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. DEDICATED FLEX LAYOUT (SIDEBAR + MAIN MODULAR PANEL) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">

        {/* SIDEBAR NAVIGATION PANEL (Flex Child: shrink-0, fixed width on lg) */}
        <aside 
          aria-label="Navigation spécifique au rôle"
          className="flex flex-col w-full lg:w-80 xl:w-88 shrink-0 space-y-4"
        >
          <div className="p-5 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-xl space-y-5">
            
            {/* Header of Sidebar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Navigation Dédiée
                </div>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {activePersona === 'visitor' && "Parcours Visiteur"}
                  {activePersona === 'client' && "Parcours Client Titulaire"}
                  {activePersona === 'staff' && "Console Staff & Back-Office"}
                </h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${currentPersonaConfig.accentBg} ${currentPersonaConfig.accentText}`}>
                {activePersona}
              </span>
            </div>

            {/* FLUID ROLE-BASED NAVIGATION ITEMS */}
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePersona}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="space-y-1.5"
                >
                  {currentNavItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = selectedNavItemId === item.id || (!selectedNavItemId && idx === 0);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedNavItemId(item.id)}
                        className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 border ${
                          isSelected
                            ? `${currentPersonaConfig.accentBg} ${currentPersonaConfig.accentText} font-bold shadow-sm`
                            : 'bg-slate-950/60 hover:bg-slate-800/80 text-slate-400 hover:text-white border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-white/20' : 'bg-slate-900 text-slate-400'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs truncate">{item.label}</div>
                            <div className={`text-[10px] truncate ${isSelected ? 'opacity-90' : 'text-slate-500'}`}>
                              {item.tagline}
                            </div>
                          </div>
                        </div>

                        {item.badge && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase shrink-0 border ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ROLE SPECIFIC CONTEXT CARDS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`context-${activePersona}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pt-3 border-t border-slate-800"
              >
                {/* 1. VISITOR ROLE CONTEXT CARD */}
                {activePersona === 'visitor' && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-amber-400 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Offre JaaS Découverte</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      Abonnement 75 Actes · $300/an
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Amorti dès le 1er acte d'état civil traduit ou le 1er conseil 1040/ITIN.
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-amber-300 font-semibold">
                      <span>Simulateur $0 Net inclus</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {/* 2. CLIENT ROLE CONTEXT CARD */}
                {activePersona === 'client' && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-emerald-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Dossier Lelo-Mumbanda</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">J-15</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      USCIS #CIN-2026-8841
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Partition Client RLS active · Accès exclusif à vos pièces scellées.
                    </p>
                    <button 
                      type="button"
                      onClick={() => openProfile('profile')}
                      className="w-full mt-1 py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Gérer mon profil & pièces</span>
                    </button>
                  </div>
                )}

                {/* 3. STAFF ROLE CONTEXT CARD */}
                {activePersona === 'staff' && (
                  <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-purple-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Clearance Niveau 4</span>
                      </div>
                      <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono">1 NOID</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      Directeur de Cabinet (Super Admin)
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Kernel RLS Bypass & Banc d'Assermentation Notary Public Ohio opérationnels.
                    </p>
                    <button 
                      type="button"
                      onClick={() => openProfile('roles')}
                      className="w-full mt-1 py-1.5 px-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Matrice RLS & Permissions</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Office Physical Hub Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-400 font-bold">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Guichet Central Cincinnati
              </div>
              <div className="text-xs font-bold text-white leading-tight">
                The OMK Office Central HQ
              </div>
              <p className="text-[11px] text-slate-400">
                2600 Civic Center Dr, Cincinnati, OH 45216
              </p>
              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span>Lun - Ven : 08h00 - 18h30 EST</span>
                <span className="text-emerald-400 font-bold">Ouvert</span>
              </div>
            </div>

            {/* Advanced OS Bridges */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                Passerelles Systèmes Avancés
              </div>
              <a
                href="#poc"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  <span>Web Desktop OS</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <a
                href="https://the-omk-mobile-back-office.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mobile OS Simulator</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>

          </div>
        </aside>

        {/* MAIN CONTENT PANELS (Flex Child: flex-1, min-w-0, fluid transition between roles) */}
        <main 
          aria-label="Panneau de contenu principal du tableau de bord"
          className="flex-1 min-w-0 w-full flex flex-col"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 14, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.995 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {activePersona === 'visitor' && <VisitorHubView />}
              {activePersona === 'client' && <ClientHubView />}
              {activePersona === 'staff' && <StaffOpsView />}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

    </div>
  );
}

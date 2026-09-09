import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, Briefcase, Zap, Sprout, BookOpen, 
  X, Lock, Smartphone, ExternalLink, Layers, ShieldCheck, Calculator, GraduationCap,
  LayoutDashboard, Compass, UserCheck, Shield, Bookmark, CheckSquare, Clock,
  FolderLock, Share2, Calendar, Stamp, CreditCard, ChevronRight, CheckCircle2,
  Sparkles, ArrowRight, ArrowLeft, Palette
  , Settings
} from "lucide-react";
import { PageView } from "../../types";
import { useUser, PersonaRole, UserRole } from "../../contexts/UserContext";
import { useTheme, THEME_OPTIONS } from "../../contexts/ThemeContext";
import { BackOfficeAccessModal } from "../shared/BackOfficeAccessModal";

export interface MenuItem {
  id: PageView;
  dashboardTab?: string;
  label: string;
  icon: any;
  desc: string;
  color?: 'amber' | 'emerald' | 'purple' | 'blue' | 'indigo';
  badge?: string;
  badgeColor?: string;
  isDashboardSubItem?: boolean;
}

export interface MenuSection {
  title: string;
  roleBadge?: string;
  items: MenuItem[];
}

export interface SidebarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  menuSections?: MenuSection[];
  activeRole?: string;
}

export function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  isOpen, 
  setIsOpen, 
  isMobile,
  menuSections: customMenuSections,
  activeRole: propActiveRole
}: SidebarProps) {
  const { 
    currentRole, 
    activeRole: contextActiveRole, 
    activePersona, 
    setActivePersona, 
    activeDashboardTab, 
    setActiveDashboardTab,
    openProfile,
    currentUser
  } = useUser();
  const { theme, setTheme, setIsThemePanelOpen } = useTheme();

  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const effectiveRole = propActiveRole || contextActiveRole || currentRole;
  const isVisitor = effectiveRole === 'visiteur' || effectiveRole === 'visitor';
  const isClient = effectiveRole === 'client';
  const isStaff = !isVisitor && !isClient;

  const isDashboardMode = currentPage === 'dashboard';

  // 1. CLEAN LANDING PAGE MENU (Used when on public site)
  const LANDING_MENU_SECTIONS: MenuSection[] = [
    {
      title: "PRÉSENTATION & ARCHITECTURE",
      items: [
        { 
          id: 'home', 
          label: 'The OMK Office', 
          icon: Home, 
          desc: 'Accueil & Guichet Cincinnati',
          color: 'blue' 
        },
        { 
          id: 'matrix', 
          label: 'Matrice MSG2', 
          icon: Layers, 
          desc: 'Explorateur 75 Actes (3x5x5)', 
          color: 'blue' 
        },
      ]
    },
    {
      title: "LES 3 PÔLES OPÉRATIONNELS",
      items: [
        { id: 'pole-1-legal', label: 'Pôle 1 · Légal & Statut', icon: ShieldCheck, desc: '25 Actes · USCIS, Asile & EAD', color: 'blue' },
        { id: 'pole-2-finance', label: 'Pôle 2 · Finance & Fisc', icon: Calculator, desc: '25 Actes · 1040, ITIN & LLC', color: 'emerald' },
        { id: 'pole-3-career', label: 'Pôle 3 · Carrière & Emploi', icon: GraduationCap, desc: '25 Actes · Skills & Dispatch CVG', color: 'amber' },
      ]
    },
    {
      title: "FORMULES D'ADHÉSION",
      items: [
        { id: 'jaas', label: 'JOB (JaaS - $300/an)', icon: Briefcase, desc: 'Passeport 3 Pôles & $0 Net', color: 'amber' },
        { id: 'baas', label: 'BUZZ (BaaS - $720)', icon: Zap, desc: 'Business Launchpad Solarpunk', color: 'indigo' },
        { id: 'paas', label: 'PRO (PaaS - $1,500)', icon: Sprout, desc: 'BaaS Factory & Hubs Locaux', color: 'emerald' },
      ]
    },
    {
      title: "OUTILS & LABS",
      items: [
        { id: 'blog-poc', label: 'Études de Cas Réels', icon: BookOpen, desc: 'Récits d\'Exécution (3 Pôles)' },
        { id: 'mobile-os', label: 'Mobile OS (Aperçu)', icon: Smartphone, desc: 'Portail Découverte Mobile' },
      ]
    }
  ];

  // 2. BACK-OFFICE DASHBOARD MENU (Used when inside Back-Office OS)
  const getBackOfficeMenuSections = (): MenuSection[] => {
    if (isVisitor) {
      return [
        {
          title: "DASHBOARD VISITEUR · DÉCOUVERTE",
          roleBadge: "ACCÈS PUBLIC",
          items: [
            { 
              id: 'dashboard', 
              dashboardTab: 'diagnostic',
              label: '1. Diagnostic Initial', 
              icon: Compass, 
              desc: 'Bilan Express en 4 Questions', 
              color: 'amber',
              badge: 'Express',
              badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            },
            { 
              id: 'dashboard', 
              dashboardTab: 'catalog',
              label: '2. Catalogue des 75 Actes', 
              icon: Bookmark, 
              desc: 'Légal, Fiscalité & Carrière', 
              color: 'amber',
              badge: '3 Pôles',
              badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
            },
            { 
              id: 'dashboard', 
              dashboardTab: 'simulator',
              label: '3. Simulateur $0 Net', 
              icon: Calculator, 
              desc: 'Amortissement & JaaS $300/an', 
              color: 'amber',
              badge: '$0 Net',
              badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            },
            { 
              id: 'dashboard', 
              dashboardTab: 'checklist',
              label: '4. Checklist Gratuite', 
              icon: CheckSquare, 
              desc: '12 Pièces & Préparation RDV', 
              color: 'amber',
              badge: '12 Pièces',
              badgeColor: 'bg-slate-700 text-slate-200 border-slate-600'
            },
          ]
        },
        {
          title: "SERVICES CONNEXES",
          items: [
            { id: 'matrix', label: 'Matrice MSG2 (75 Actes)', icon: Layers, desc: 'Architecture 3x5x5', color: 'blue' },
            { id: 'jaas', label: 'Adhésion JaaS ($300/an)', icon: Briefcase, desc: 'Couverture 3 Pôles', color: 'amber' },
          ]
        }
      ];
    }

    if (isClient) {
      return [
        {
          title: "DASHBOARD CLIENT · SUIVI & LOGISTIQUE",
          roleBadge: "CAS-2026-JM01",
          items: [
            { 
              id: 'dashboard', 
              dashboardTab: 'tracker',
              label: '1. Démarches en Cours', 
              icon: Clock, 
              desc: 'Suivi I-589 & I-765 en temps réel', 
              color: 'emerald',
              badge: 'J-15',
              badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            },
            { 
              id: 'dashboard', 
              dashboardTab: 'vault',
              label: '2. Coffre-fort (Vault)', 
              icon: FolderLock, 
              desc: '3 Pièces certifiées & Sceau 8 CFR', 
              color: 'emerald',
              badge: '3 Scellés',
              badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
            },
            { 
              id: 'dashboard', 
              dashboardTab: 'ambassador',
              label: '3. Espace Ambassadeur', 
              icon: Share2, 
              desc: 'Code LELO-JM-8841 · +$50/filleul', 
              color: 'emerald',
              badge: '+$50',
              badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
            },
            { 
              id: 'dashboard', 
              dashboardTab: 'deadlines',
              label: '4. Échéances USCIS', 
              icon: Calendar, 
              desc: 'Biométrie & Calendrier Audience', 
              color: 'emerald',
              badge: 'Actif',
              badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            },
          ]
        },
        {
          title: "ACCÈS AUX 3 PÔLES",
          items: [
            { id: 'pole-1-legal', label: 'Pôle 1 · Dossier Légal', icon: ShieldCheck, desc: 'Asile I-589 & 8 CFR', color: 'blue' },
            { id: 'pole-2-finance', label: 'Pôle 2 · Fisc & Revenus', icon: Calculator, desc: '1040, ITIN & LLC', color: 'emerald' },
            { id: 'pole-3-career', label: 'Pôle 3 · Emploi & Carrière', icon: GraduationCap, desc: 'Certifications & Dispatch', color: 'amber' },
          ]
        }
      ];
    }

    // Staff / Back-Office Cockpit
    return [
      {
        title: "DASHBOARD STAFF · COCKPIT OPS",
        roleBadge: "RLS NIVEAU 4",
        items: [
          { 
            id: 'dashboard', 
            dashboardTab: 'inbox',
            label: '1. File d\'Intake (Inbox)', 
            icon: Layers, 
            desc: 'SOP-LD05 Qualification & OCR', 
            color: 'purple',
            badge: '4 Scans',
            badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
          },
          { 
            id: 'dashboard', 
            dashboardTab: 'cases',
            label: '2. Dossiers Immigration', 
            icon: Briefcase, 
            desc: '1 Alerte Critique NOID sous 5 jours', 
            color: 'purple',
            badge: '1 NOID',
            badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          },
          { 
            id: 'dashboard', 
            dashboardTab: 'notary_bench',
            label: '3. Banc d\'Assermentation', 
            icon: Stamp, 
            desc: 'Ohio Notary Public & 8 CFR § 1003.33', 
            color: 'purple',
            badge: 'Ohio Seal',
            badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          },
          { 
            id: 'dashboard', 
            dashboardTab: 'metrics',
            label: '4. Métriques & Facturation', 
            icon: CreditCard, 
            desc: 'SLA 45m, CA Réalisé & Stripe Logs', 
            color: 'purple',
            badge: 'SLA 45m',
            badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          },
        ]
      },
      {
        title: "SUPERVISION SYSTÈME",
        items: [
          { id: 'matrix', label: 'Matrice MSG2 Master', icon: Layers, desc: 'Architecture 3x5x5 & 75 Actes', color: 'blue' },
          { id: 'jaas', label: 'Pilotage JaaS', icon: Briefcase, desc: 'Abonnements & SLA', color: 'amber' },
        ]
      }
    ];
  };

  const currentSections = isDashboardMode
    ? getBackOfficeMenuSections()
    : LANDING_MENU_SECTIONS;

  const handleOpenAccess = (role: PersonaRole) => {
    setActivePersona(role);
    setCurrentPage('dashboard');
    setIsAccessModalOpen(false);
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 310, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full glass-dark flex flex-col rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/10 shrink-0 overflow-hidden z-40"
          >
            {/* Header: Mode-Aware Header */}
            <div className="p-5 border-b border-white/5 shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-black text-white text-2xl tracking-tight">
                    OMK<span className="text-blue-500">.</span>OS
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold">
                    {isDashboardMode ? 'BACK-OFFICE' : 'PORTAIL'}
                  </span>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5 shrink-0"
                  aria-label="Fermer le menu latéral"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* In Dashboard Mode: Show Exit to Landing Page + 3-Way Role Switcher */}
              {isDashboardMode ? (
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('home');
                      if (isMobile) setIsOpen(false);
                    }}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold transition-all border border-white/10"
                  >
                    <span className="flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
                      <span>Retour Landing Page</span>
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">Site Public</span>
                  </button>

                  <div>
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Accès Actif :
                      </span>
                      <span className={`text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                        isVisitor ? 'text-amber-400' : isClient ? 'text-emerald-400' : 'text-purple-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isVisitor ? 'bg-amber-400' : isClient ? 'bg-emerald-400' : 'bg-purple-400'
                        } animate-pulse`} />
                        {isVisitor ? 'Visiteur' : isClient ? 'Client' : 'Staff/Ops'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
                      <button
                        type="button"
                        onClick={() => setActivePersona('visiteur')}
                        className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                          isVisitor 
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-black' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Visiteur
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePersona('client')}
                        className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                          isClient 
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Client
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePersona('staff')}
                        className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                          isStaff 
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-black' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Staff/Ops
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* In Landing Page Mode: Clean, uncluttered subtitle */
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-slate-400">
                    The OMK Office · Cincinnati Hub
                  </span>
                </div>
              )}
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-4 flex flex-col gap-5 px-3.5 overflow-y-auto w-[310px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {currentSections.map((section, sIdx) => {
                const isDashboardSection = isDashboardMode && sIdx === 0;

                return (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between px-2.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {section.title}
                      </span>
                      {section.roleBadge && (
                        <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                          isVisitor 
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                            : isClient 
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                            : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                        }`}>
                          {section.roleBadge}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => {
                        const isDashboardSubItem = Boolean(item.dashboardTab);
                        const isActive = isDashboardSubItem 
                          ? (currentPage === 'dashboard' && activeDashboardTab === item.dashboardTab)
                          : (item.id === 'dashboard' 
                              ? (currentPage === 'dashboard' && !activeDashboardTab)
                              : currentPage === item.id);

                        return (
                          <button
                            key={`${item.id}-${item.dashboardTab || iIdx}`}
                            type="button"
                            onClick={() => {
                              setCurrentPage(item.id);
                              if (item.dashboardTab) {
                                setActiveDashboardTab(item.dashboardTab);
                              }
                              if (isMobile) setIsOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full p-2.5 rounded-2xl transition-all group relative text-left ${
                              isActive 
                                ? item.color === 'emerald' || (isClient && isDashboardSubItem)
                                  ? 'bg-emerald-600 text-white shadow-[0_8px_20px_rgba(5,150,105,0.35)] border border-emerald-400/60'
                                  : item.color === 'amber' || (isVisitor && isDashboardSubItem)
                                  ? 'bg-amber-500 text-slate-950 shadow-[0_8px_20px_rgba(245,158,11,0.35)] border border-amber-300 font-black'
                                  : item.color === 'purple' || (isStaff && isDashboardSubItem)
                                  ? 'bg-purple-600 text-white shadow-[0_8px_20px_rgba(147,51,234,0.35)] border border-purple-400/60'
                                  : 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] border border-blue-400/60'
                                : 'text-slate-400 hover:bg-white/8 hover:text-white border border-transparent'
                            }`}
                          >
                            <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                              isActive 
                                ? (item.color === 'amber' || (isVisitor && isDashboardSubItem))
                                  ? 'bg-black/20 text-slate-950' 
                                  : 'bg-white/20 text-white'
                                : isDashboardSection
                                ? isVisitor 
                                  ? 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20'
                                  : isClient
                                  ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20'
                                  : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'
                                : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                            }`}>
                              <item.icon className="w-4 h-4" />
                            </div>
                            
                            <div className="flex flex-col items-start overflow-hidden whitespace-nowrap flex-1 min-w-0">
                              <div className="flex items-center justify-between w-full gap-1">
                                <span className={`text-xs font-bold leading-tight truncate ${
                                  isActive && (item.color === 'amber' || (isVisitor && isDashboardSubItem)) 
                                    ? 'text-slate-950 font-black' 
                                    : ''
                                }`}>
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase shrink-0 border ${
                                    isActive 
                                      ? 'bg-black/20 text-white border-white/20' 
                                      : item.badgeColor 
                                      ? item.badgeColor 
                                      : isVisitor
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                      : isClient
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                      : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className={`text-[9px] font-medium mt-0.5 truncate max-w-full ${
                                isActive 
                                  ? (item.color === 'amber' || (isVisitor && isDashboardSubItem))
                                    ? 'text-slate-900 font-semibold' 
                                    : 'text-blue-100' 
                                  : 'text-slate-500 group-hover:text-slate-300'
                              }`}>
                                {item.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Section */}
            <div className="p-4 border-t border-white/5 bg-black/30 shrink-0 w-[310px] space-y-3">
              <button
                type="button"
                onClick={() => openProfile()}
                className="w-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-2.5 flex items-center justify-between transition-all group shadow-inner cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-200 group-hover:text-white transition-colors">
                      {currentUser.roleTitleFr.split('·')[0].trim()}
                    </div>
                    <div className="text-[9px] text-blue-400 font-mono mt-0.5">
                      Paramètres & Déconnexion
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <Settings className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Back-Office Access Modal */}
      <BackOfficeAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        onSelectAccess={handleOpenAccess}
      />
    </>
  );
}

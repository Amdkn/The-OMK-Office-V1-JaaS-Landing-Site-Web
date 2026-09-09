import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar, MenuSection } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { AnchorNav } from "./components/layout/AnchorNav";
import { HomeView } from "./components/views/HomeView";
import { Pole1LegalView } from "./components/views/Pole1LegalView";
import { Pole2FinanceView } from "./components/views/Pole2FinanceView";
import { Pole3CareerView } from "./components/views/Pole3CareerView";
import { JaaSView } from "./components/views/JaaSView";
import { MatrixView } from "./components/views/MatrixView";
import { BaaSView } from "./components/views/BaaSView";
import { PaaSView } from "./components/views/PaaSView";
import { BlogPoCView } from "./components/views/BlogPoCView";
import { MobileOSView } from "./components/views/MobileOSView";
import { VisitorHubView } from "./components/dashboard/VisitorHubView";
import { ClientHubView } from "./components/dashboard/ClientHubView";
import { StaffOpsView } from "./components/dashboard/StaffOpsView";
import { BookingModal } from "./components/shared/BookingModal";
import { AuthAccessModal } from "./components/auth/AuthAccessModal";
import { UserProfileModal } from "./components/profile/UserProfileModal";
import { PageView } from "./types";
import { useLanguage } from "./contexts/LanguageContext";
import { useUser, UserRole, PersonaRole } from "./contexts/UserContext";
import { t } from "./i18n/translations";
import { 
  Home, Compass, UserCheck, Shield, Layers, ShieldCheck, 
  Calculator, GraduationCap, Briefcase, Zap, Sprout, 
  BookOpen, Smartphone, AlertTriangle, Clock, FolderLock, 
  CheckCircle2, ArrowRight, Bookmark, CheckSquare, Share2, 
  Calendar, Stamp, CreditCard
} from "lucide-react";

export interface DashboardLayoutProps {
  activeRole?: UserRole | PersonaRole | string;
  currentPage?: PageView;
  setCurrentPage?: (page: PageView) => void;
  onOpenModal?: (serviceId?: string) => void;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
  children?: React.ReactNode;
}

/**
 * Returns role-conditioned sidebar navigation items tailored specifically 
 * for Visiteur, Client, and Staff/Ops personas, separating clean Landing Page 
 * navigation from Back-Office OS Dashboards.
 */
export function getRoleNavSections(role: string, isDashboard: boolean = false): MenuSection[] {
  // 1. CLEAN LANDING PAGE MENU (No compressed dashboard tabs)
  if (!isDashboard) {
    return [
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
            desc: 'Explorateur des 75 Actes (3x5x5)', 
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
  }

  // 2. BACK-OFFICE OS DASHBOARD SECTIONS
  const isVisitor = role === 'visiteur' || role === 'visitor';
  const isClient = role === 'client';
  const isStaff = !isVisitor && !isClient;

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
          { id: 'matrix', label: 'Matrice MSG2 (75 Actes)', icon: Layers, desc: 'Explorateur interactif', color: 'blue' },
          { id: 'jaas', label: 'Formule JaaS ($300/an)', icon: Briefcase, desc: 'Passeport 3 Pôles', color: 'amber' },
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
        title: "MES 3 PÔLES & DOSSIERS",
        items: [
          { id: 'pole-1-legal', label: 'Pôle 1 · Dossier Légal', icon: ShieldCheck, desc: 'Asile I-589 & Sceau 8 CFR', color: 'blue' },
          { id: 'pole-2-finance', label: 'Pôle 2 · Fisc & Revenus', icon: Calculator, desc: '1040, W-7 ITIN & LLC', color: 'emerald' },
          { id: 'pole-3-career', label: 'Pôle 3 · Emploi & Carrière', icon: GraduationCap, desc: 'Certifications & Dispatch CVG', color: 'amber' },
        ]
      }
    ];
  }

  // Staff / Ops (admin / employer)
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
        { id: 'jaas', label: 'Pilotage JaaS', icon: Briefcase, desc: 'Abonnements & SLA 45m', color: 'amber' },
        { id: 'baas', label: 'Pipeline BaaS', icon: Zap, desc: 'Launchpad & Facturation', color: 'indigo' },
      ]
    }
  ];
}

/**
 * DashboardLayout Component
 * Conditionally renders the sidebar navigation items and main content views
 * dynamically driven by activeRole with fluid role transitions.
 */
export function DashboardLayout({
  activeRole: propRole,
  currentPage = 'home',
  setCurrentPage = () => {},
  onOpenModal = () => {},
  isSidebarOpen: propSidebarOpen,
  setIsSidebarOpen: propSetSidebarOpen,
  isMobile: propIsMobile,
  children
}: DashboardLayoutProps) {
  const { currentRole, activeRole: contextRole } = useUser();
  const { lang } = useLanguage();

  // Internal fallback state if not controlled from parent
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(true);
  const [internalMobile, setInternalMobile] = useState(false);

  const isSidebarOpen = propSidebarOpen !== undefined ? propSidebarOpen : internalSidebarOpen;
  const setIsSidebarOpen = propSetSidebarOpen || setInternalSidebarOpen;
  const isMobile = propIsMobile !== undefined ? propIsMobile : internalMobile;

  // Handle responsive resize if not controlled
  useEffect(() => {
    if (propIsMobile === undefined) {
      const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setInternalMobile(mobile);
        if (mobile) setInternalSidebarOpen(false);
        else setInternalSidebarOpen(true);
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [propIsMobile]);

  // Determine effective role & persona
  const effectiveRole = propRole || contextRole || currentRole || 'visiteur';
  const activePersona: PersonaRole = 
    effectiveRole === 'visiteur' || effectiveRole === 'visitor' ? 'visiteur' :
    effectiveRole === 'client' ? 'client' : 'staff';

  // Compute role-tailored navigation items (separating clean Landing Page from Back-Office OS)
  const menuSections = getRoleNavSections(activePersona, currentPage === 'dashboard');

  // Definition of anchors based on the active view and role
  const getNavAnchors = () => {
    switch (currentPage) {
      case 'dashboard':
        if (activePersona === 'visiteur') {
          return [
            { label: 'Diagnostic Initial', id: 'visitor-diagnostic' },
            { label: 'Catalogue 75 Actes', id: 'visitor-catalog' },
            { label: 'Simulateur $0 Net', id: 'visitor-simulator' },
            { label: 'Checklist 12 Pièces', id: 'visitor-checklist' },
          ];
        }
        if (activePersona === 'client') {
          return [
            { label: 'Suivi Dossier I-589', id: 'client-tracker' },
            { label: 'Coffre-fort Scellé', id: 'client-vault' },
            { label: 'Ambassadeur ($50)', id: 'client-ambassador' },
            { label: 'Échéances USCIS', id: 'client-timeline' },
          ];
        }
        return [
          { label: 'File Intake SOP-LD05', id: 'staff-intake' },
          { label: 'Adjudication & NOID', id: 'staff-cases' },
          { label: 'Banc Notary 8 CFR', id: 'staff-notary' },
          { label: 'Métriques & SLA', id: 'staff-metrics' },
        ];
      case 'home':
        return [
          { label: 'Accueil', id: 'hero-global' },
          { label: t.header.nav.catalogue[lang], id: 'catalogue' },
          { label: t.header.nav.offers[lang], id: 'grille-offres' },
          { label: t.header.nav.pricing[lang], id: 'tarifs-actes' },
          { label: t.header.nav.simulator[lang], id: 'simulateur-base' },
        ];
      case 'pole-1-legal':
        return [
          { label: 'Diagnostic EAD', id: 'pole1-checker' },
          { label: 'Catalogue 25 Actes', id: 'pole1-catalog' },
        ];
      case 'pole-2-finance':
        return [
          { label: 'Simulateur 1040 & ITIN', id: 'pole2-simulator' },
          { label: 'Catalogue 25 Actes', id: 'pole2-catalog' },
        ];
      case 'pole-3-career':
        return [
          { label: 'Simulateur 1-Click', id: 'pole3-simulator' },
          { label: '25 Actes Carrière', id: 'pole3-acts-breakdown' },
          { label: 'Amortissement $50', id: 'pole3-roi' },
        ];
      case 'jaas':
        return [
          { label: 'Vue Globale ($300/an)', id: 'jaas-hero' },
          { label: 'Pôle 1 · Légal (25 Actes)', id: 'jaas-pole1' },
          { label: 'Pôle 2 · Finance (25 Actes)', id: 'jaas-pole2' },
          { label: 'Pôle 3 · Carrière (25 Actes)', id: 'jaas-pole3' },
          { label: 'Simulateur 1-Click', id: 'jaas-simulateur-1click' },
        ];
      case 'matrix':
        return [
          { label: 'Explorateur 75 Actes', id: 'matrix-explorer' },
        ];
      case 'baas':
        return [
          { label: 'Vue d’ensemble', id: 'baas-hero' },
          { label: '1. Légal & Création', id: 'baas-launchpad' },
          { label: '2. Fiscalité & Taxes', id: 'baas-finance' },
          { label: '3. Moteur Croissance', id: 'baas-growth' },
          { label: '4. Back-Office OS', id: 'baas-runtime' },
        ];
      case 'paas':
        return [
          { label: t.header.nav.paas_horizons[lang], id: 'paas-horizons' },
          { label: t.header.nav.paas_solarpunk[lang], id: 'paas-solarpunk' },
          { label: t.header.nav.paas_factory[lang], id: 'paas-factory' },
        ];
      case 'blog-poc':
        return [
          { label: t.header.nav.poc_problem[lang], id: 'poc-probleme' },
          { label: t.header.nav.poc_resolution[lang], id: 'poc-resolution' },
          { label: t.header.nav.poc_results[lang], id: 'poc-resultats' },
        ];
      case 'mobile-os':
        return [
          { label: 'Aperçu Mobile OS', id: 'mobile-preview' },
          { label: 'Portail Login / FaceID', id: 'mobile-auth' },
          { label: 'Applications & Widgets', id: 'mobile-apps' },
        ];
      default:
        return [];
    }
  };

  /**
   * Conditionally render main content views based on activeRole and currentPage,
   * replacing static renders with role-driven views and fluid transitions.
   */
  const renderMainView = () => {
    if (children) {
      return children;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 pt-24 pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`dash-${activePersona}`}
                initial={{ opacity: 0, y: 12, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.995 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="w-full"
              >
                {activePersona === 'visiteur' && <VisitorHubView />}
                {activePersona === 'client' && <ClientHubView />}
                {activePersona === 'staff' && <StaffOpsView />}
              </motion.div>
            </AnimatePresence>
          </div>
        );

      case 'home':
        return (
          <div className="w-full">
            {/* Conditional Role Context Banner above HomeView */}
            {activePersona === 'client' && (
              <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-24 pb-2">
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
                        <span>Dossier Bénéficiaire Actif</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 text-[10px]">J-15 USCIS</span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        #CIN-2026-8841 · Famille Lelo-Mumbanda (Asile I-589)
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('dashboard')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <span>Accéder au Tracker & Vault</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activePersona === 'staff' && (
              <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-24 pb-2">
                <div className="p-4 rounded-2xl bg-purple-950/80 border border-purple-500/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-2">
                        <span>Cockpit Back-Office · Niveau 4</span>
                        <span className="px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-300 text-[10px] font-mono">1 NOID Alert</span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        4 Scans SOP-LD05 en attente de qualification & Banc 8 CFR opérationnel
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('dashboard')}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <span>Ouvrir la File d'Intake</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <HomeView onOpenModal={onOpenModal} setCurrentPage={setCurrentPage} />
          </div>
        );

      case 'pole-1-legal':
        return <Pole1LegalView onOpenModal={onOpenModal} />;
      case 'pole-2-finance':
        return <Pole2FinanceView onOpenModal={onOpenModal} />;
      case 'pole-3-career':
        return <Pole3CareerView onOpenModal={onOpenModal} />;
      case 'jaas':
        return <JaaSView onOpenModal={() => onOpenModal('3.2-1')} />;
      case 'matrix':
        return <MatrixView onOpenModal={onOpenModal} />;
      case 'baas':
        return <BaaSView onOpenModal={onOpenModal} />;
      case 'paas':
        return <PaaSView onOpenModal={onOpenModal} />;
      case 'blog-poc':
        return <BlogPoCView onOpenModal={onOpenModal} setCurrentPage={setCurrentPage} />;
      case 'mobile-os':
        return <MobileOSView />;
      default:
        return <HomeView onOpenModal={onOpenModal} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen theme-app-bg p-3 sm:p-4 lg:p-5 gap-4 lg:gap-5 theme-font overflow-hidden transition-colors duration-500">
      
      {/* Anchor Navigation */}
      <AnchorNav sections={getNavAnchors()} />

      {/* Role-Conditioned Sidebar Wrapper */}
      {currentPage === 'dashboard' && (
            <div
              className={`
                fixed inset-y-4 left-4 z-50 shrink-0
                lg:static lg:inset-auto lg:h-full lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[150%] lg:hidden'}
              `}
            >
              <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                isMobile={isMobile}
                menuSections={menuSections}
                activeRole={activePersona}
              />
            </div>
      )}

      {/* Main Content Area - Large Nested Clay/Glass Container */}
      <div className="flex-1 flex flex-col theme-main-content relative z-0 transition-all duration-500 w-full max-w-full overflow-hidden">
        
        {/* Scrollable Container */}
        <div 
          id="main-scroll-container" 
          className="main-scroll-container flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth flex flex-col items-center w-full"
        >
          
          {/* Sticky Floating Header */}
          <div className="sticky top-0 z-40 w-full max-w-7xl mx-auto px-4 lg:px-6 pt-4 lg:pt-5 pointer-events-none">
            <div className="pointer-events-auto">
              <Header 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                onOpenModal={onOpenModal} 
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isMobile={isMobile}
              />
            </div>
          </div>
          
          {/* Main View rendering - with fluid role-conditioned transitions */}
          <main className="flex-1 flex flex-col w-full -mt-[88px] lg:-mt-[92px] z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPage}-${activePersona}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                {renderMainView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * Root App Component
 * Delegates layout rendering to DashboardLayout, maintaining modal and page state.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const { activeRole, currentRole, isAuthModalOpen, closeAuthModal, authModalDefaultTab } = useUser();

  const handleOpenModal = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset scroll and lock window scroll
  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <>
      <DashboardLayout
        activeRole={activeRole || currentRole}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenModal={handleOpenModal}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      <AuthAccessModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultTab={authModalDefaultTab}
      />

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialServiceId={selectedServiceId}
      />

      <UserProfileModal 
        onOpenBookingModal={() => handleOpenModal()} 
      />
    </>
  );
}

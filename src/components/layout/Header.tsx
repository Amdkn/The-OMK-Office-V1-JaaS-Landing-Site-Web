import React from "react"
import { PageView } from "../../types"
import { Menu, Globe, Lock } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../i18n/translations"
import { useUser } from "../../contexts/UserContext"
import { UserProfileButton } from "../profile/UserProfileButton"
import { ThemeSelector } from "./ThemeSelector"

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage?: (page: PageView) => void;
  onOpenModal: (serviceId?: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

interface NavSectionLink {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export function Header({ currentPage, setCurrentPage, onOpenModal, isSidebarOpen, toggleSidebar, isMobile }: HeaderProps) {
  const { lang, toggleLang } = useLanguage();
  const { openProfile } = useUser();

  // Sections de la Page d'Accueil
  const HOME_SECTIONS: NavSectionLink[] = [
    { label: 'Accueil', href: '#hero-global' },
    { label: t.header.nav.catalogue[lang] + ' (75 Actes)', href: '#catalogue' },
    { label: t.header.nav.offers[lang], href: '#grille-offres' },
    { 
      label: t.header.nav.simulator[lang] + ' $0 Net', 
      href: '#simulateur-base',
      badge: '$0 Net',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    { label: t.header.nav.pricing[lang], href: '#tarifs-actes' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavSectionLink) => {
    e.preventDefault();
    const id = link.href.replace('#', '');
    
    // Si l'utilisateur n'est pas sur la page d'accueil, basculer d'abord sur la page d'accueil
    if (currentPage !== 'home' && setCurrentPage) {
      setCurrentPage('home');
      setTimeout(() => {
        const scrollContainer = document.getElementById('main-scroll-container');
        if (id === 'hero-global' || id === 'top' || !id) {
          if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const element = document.getElementById(id);
        if (element && scrollContainer) {
          const containerTop = scrollContainer.getBoundingClientRect().top;
          const elementTop = element.getBoundingClientRect().top;
          const offsetPosition = elementTop - containerTop + scrollContainer.scrollTop - 90;
          scrollContainer.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        } else if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return;
    }

    // Déjà sur la page d'accueil: défilement fluide vers la section
    const scrollContainer = document.getElementById('main-scroll-container');
    if (id === 'hero-global' || id === 'top' || !id) {
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element && scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offsetPosition = elementTop - containerTop + scrollContainer.scrollTop - 90;

      scrollContainer.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header 
      className={`w-full backdrop-blur-xl bg-white/90 border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-3 py-2 sm:px-5 lg:px-6 h-[68px]">
        
        {/* LEFT: Menu Toggle + Brand Logo / Hub Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 mr-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            aria-label="Ouvrir le menu de navigation"
            title="Menu de navigation"
          >
            <Menu className="w-5 h-5 text-amber-400" />
          </button>
          
          <button 
            onClick={() => {
              if (currentPage !== 'home' && setCurrentPage) {
                setCurrentPage('home');
              }
              const scrollContainer = document.getElementById('main-scroll-container');
              if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer text-left shrink-0"
            title="Accueil The OMK Office"
          >
            <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>The OMK Office</span>
            </span>
          </button>
        </div>

        {/* CENTER: NAVIGATION ÉPURÉE */}
        <div className="hidden lg:flex flex-1"></div>

        {/* RIGHT CONTROLS: Themes, Language, Back-Office OS, User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sélecteur de Thèmes Compact */}
          <ThemeSelector />

          {/* Langue FR/EN */}
          <button 
            onClick={toggleLang}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/60"
            title="Changer de langue"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="ml-1 text-[10.5px] font-bold uppercase">{lang}</span>
          </button>
          
          {/* Back-Office OS Bouton d'accès Réduit */}
          <button
            onClick={() => setCurrentPage?.(currentPage === 'dashboard' ? 'home' : 'dashboard')}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border shadow-xs cursor-pointer shrink-0 ${
              currentPage === 'dashboard'
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-blue-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30'
            }`}
            title="Accès au Back-Office OS"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>{currentPage === 'dashboard' ? 'Public' : 'Back-Office'}</span>
          </button>

          {/* User Profile */}
          <UserProfileButton 
            onOpenBookingModal={onOpenModal} 
            onNavigateToDashboard={() => setCurrentPage?.('dashboard')}
          />
        </div>
      </div>
    </header>
  )
}

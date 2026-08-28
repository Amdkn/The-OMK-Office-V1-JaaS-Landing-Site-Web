import { Button } from "@/src/components/ui/button"
import { PageView } from "../../types"
import { Menu, Globe, Palette } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../i18n/translations"
import { useTheme } from "../../contexts/ThemeContext"

interface HeaderProps {
  currentPage: PageView;
  onOpenModal: () => void;
  isSidebarOpen: boolean;
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

export function Header({ currentPage, onOpenModal, isSidebarOpen, toggleSidebar, isMobile }: HeaderProps) {
  const { lang, toggleLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  const NAV_LINKS: Record<PageView, { label: string; href: string }[]> = {
    'home': [
      { label: t.header.nav.catalogue[lang], href: '#catalogue' },
      { label: t.header.nav.offers[lang], href: '#grille-offres' },
      { label: t.header.nav.pricing[lang], href: '#tarifs-actes' },
      { label: t.header.nav.simulator[lang], href: '#simulateur-base' },
    ],
    'pole-1-legal': [
      { label: 'Diagnostic EAD & Urgences', href: '#pole1-checker' },
      { label: 'Catalogue 25 Actes', href: '#pole1-catalog' },
    ],
    'pole-2-finance': [
      { label: 'Simulateur 1040 & ITIN', href: '#pole2-simulator' },
      { label: 'Catalogue 25 Actes', href: '#pole2-catalog' },
    ],
    'pole-3-career': [
      { label: 'Simulateur 1-Click', href: '#pole3-simulator' },
      { label: '25 Actes Carrière', href: '#pole3-acts-breakdown' },
      { label: 'Amortissement $50', href: '#pole3-roi' },
    ],
    'jaas': [
      { label: t.header.nav.jaas_method[lang], href: '#jaas-methode' },
      { label: t.header.nav.jaas_pricing[lang], href: '#jaas-pricing' },
      { label: t.header.nav.jaas_roi[lang], href: '#jaas-simulateur-roi' },
    ],
    'matrix': [
      { label: 'Matrice Complète', href: '#matrix-explorer' },
      { label: 'Pôle 1 (Légal)', href: '#matrix-explorer' },
      { label: 'Pôle 2 (Finance)', href: '#matrix-explorer' },
      { label: 'Pôle 3 (JaaS)', href: '#matrix-explorer' },
    ],
    'baas': [
      { label: t.header.nav.baas_pillars[lang], href: '#baas-piliers' },
      { label: t.header.nav.baas_pricing[lang], href: '#baas-pricing' },
      { label: t.header.nav.baas_rule[lang], href: '#baas-regle-des-5' },
    ],
    'paas': [
      { label: t.header.nav.paas_horizons[lang], href: '#paas-horizons' },
      { label: t.header.nav.paas_solarpunk[lang], href: '#paas-solarpunk' },
      { label: t.header.nav.paas_factory[lang], href: '#paas-factory' },
    ],
    'blog-poc': [
      { label: t.header.nav.poc_problem[lang], href: '#poc-probleme' },
      { label: t.header.nav.poc_resolution[lang], href: '#poc-resolution' },
      { label: t.header.nav.poc_results[lang], href: '#poc-resultats' },
    ],
    'mobile-os': [
      { label: 'Aperçu Mobile', href: '#mobile-preview' },
      { label: 'Login FaceID', href: '#mobile-auth' },
      { label: 'Apps & Widgets', href: '#mobile-apps' },
      { label: 'Spécifications', href: '#mobile-specs' },
    ],
  };

  const links = NAV_LINKS[currentPage] || []

  return (
    <header 
      className={`w-full backdrop-blur-xl bg-white/80 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 lg:px-6 h-[72px]">
        
        <div className="flex items-center gap-3">
          {(!isSidebarOpen || isMobile) && (
            <button 
              onClick={toggleSidebar}
              className="p-2.5 bg-white rounded-full text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase">
              {currentPage === 'home' ? t.header.active_office[lang] : `${t.header.mode[lang]} ${currentPage.toUpperCase()}`}
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center bg-slate-50/80 rounded-full px-2 py-1.5 border border-slate-200/50">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-white px-4 py-2 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dropdown de Thèmes */}
          <div className="relative group">
            <button className="flex items-center justify-center space-x-1 w-auto px-3 sm:px-4 h-10 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200">
              <Palette className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline text-xs font-bold capitalize">{theme.replace('-', ' ')}</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 hidden group-hover:block z-50">
              <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Themes</div>
              <button onClick={() => setTheme('warm-paper')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 ${theme === 'warm-paper' ? 'font-bold bg-slate-50' : ''}`}>Warm Paper</button>
              <button onClick={() => setTheme('glassmorphism')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 ${theme === 'glassmorphism' ? 'font-bold bg-slate-50' : ''}`}>Glassmorphism</button>
              <button onClick={() => setTheme('brutalism')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 ${theme === 'brutalism' ? 'font-bold bg-slate-50' : ''}`}>Brutalism</button>
              <button onClick={() => setTheme('dark-oled')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 ${theme === 'dark-oled' ? 'font-bold bg-slate-50' : ''}`}>Dark OLED</button>
              <button onClick={() => setTheme('claymorphism')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 ${theme === 'claymorphism' ? 'font-bold bg-slate-50' : ''}`}>Claymorphism</button>
            </div>
          </div>

          <button 
            onClick={toggleLang}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-1 text-xs font-bold uppercase">{lang}</span>
          </button>
          
          <Button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-bold rounded-full px-4 sm:px-6 h-10 sm:h-11 text-xs sm:text-sm">
            <span className="hidden sm:inline">{t.header.book_appointment[lang]}</span>
            <span className="sm:hidden">{t.header.book_short[lang]}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

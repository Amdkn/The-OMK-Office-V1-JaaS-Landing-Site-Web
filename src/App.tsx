import { useState, useEffect } from "react"
import { Sidebar } from "./components/layout/Sidebar"
import { Header } from "./components/layout/Header"
import { AnchorNav } from "./components/layout/AnchorNav"
import { HomeView } from "./components/views/HomeView"
import { Pole1LegalView } from "./components/views/Pole1LegalView"
import { Pole2FinanceView } from "./components/views/Pole2FinanceView"
import { Pole3CareerView } from "./components/views/Pole3CareerView"
import { JaaSView } from "./components/views/JaaSView"
import { MatrixView } from "./components/views/MatrixView"
import { BaaSView } from "./components/views/BaaSView"
import { PaaSView } from "./components/views/PaaSView"
import { BlogPoCView } from "./components/views/BlogPoCView"
import { MobileOSView } from "./components/views/MobileOSView"
import { BookingModal } from "./components/shared/BookingModal"
import { PageView } from "./types"
import { useLanguage } from "./contexts/LanguageContext"
import { t } from "./i18n/translations"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined)
  
  const { lang } = useLanguage()

  const handleOpenModal = (serviceId?: string) => {
    setSelectedServiceId(serviceId)
    setIsModalOpen(true)
  }

  // Auto-close sidebar on mobile & reset scroll on page change
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Reset scroll and lock window scroll
  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [currentPage])

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [])

  // Definition of anchors based on the active view
  const getNavAnchors = () => {
    switch (currentPage) {
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
          { label: 'Amortissement $50', id: 'jaas-simulateur-roi' },
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
          { label: '3. Moteur d’Acquisition', id: 'baas-growth' },
          { label: '4. Back-Office OS', id: 'baas-runtime' },
          { label: '5. La Règle des 5 (ROI)', id: 'baas-regle-5' },
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
          { label: 'Spécifications OS', id: 'mobile-specs' },
        ];
      default:
        return [];
    }
  };

  // Render the current view
  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onOpenModal={handleOpenModal} setCurrentPage={setCurrentPage} />
      case 'pole-1-legal':
        return <Pole1LegalView onOpenModal={handleOpenModal} />
      case 'pole-2-finance':
        return <Pole2FinanceView onOpenModal={handleOpenModal} />
      case 'pole-3-career':
        return <Pole3CareerView onOpenModal={handleOpenModal} />
      case 'jaas':
        return <JaaSView onOpenModal={() => handleOpenModal('3.2-1')} />
      case 'matrix':
        return <MatrixView onOpenModal={handleOpenModal} />
      case 'baas':
        return <BaaSView onOpenModal={handleOpenModal} />
      case 'paas':
        return <PaaSView onOpenModal={handleOpenModal} />
      case 'blog-poc':
        return <BlogPoCView onOpenModal={handleOpenModal} />
      case 'mobile-os':
        return <MobileOSView />
      default:
        return <HomeView onOpenModal={handleOpenModal} setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen theme-app-bg p-3 sm:p-4 lg:p-5 gap-4 lg:gap-5 theme-font overflow-hidden transition-colors duration-500">
      
      {/* Anchor Navigation */}
      <AnchorNav sections={getNavAnchors()} />

      {/* Sidebar Wrapper */}
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
        />
      </div>

      {/* Main Content Area - Large Nested Clay/Glass Container */}
      <div className="flex-1 flex flex-col theme-main-content relative z-0 transition-all duration-500 w-full max-w-full overflow-hidden">
        
        {/* Scrollable Container */}
        <div id="main-scroll-container" className="main-scroll-container flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth flex flex-col items-center w-full">
          
          {/* Sticky Floating Header */}
          <div className="sticky top-0 z-40 w-full max-w-7xl mx-auto px-4 lg:px-6 pt-4 lg:pt-5 pointer-events-none">
            <div className="pointer-events-auto">
              <Header 
                currentPage={currentPage} 
                onOpenModal={handleOpenModal} 
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isMobile={isMobile}
              />
            </div>
          </div>
          
          {/* Main View rendering - Negative margin to tuck under the header */}
          <main className="flex-1 flex flex-col w-full -mt-[88px] lg:-mt-[92px] z-10">
            {renderView()}
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

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialServiceId={selectedServiceId}
      />
    </div>
  )
}

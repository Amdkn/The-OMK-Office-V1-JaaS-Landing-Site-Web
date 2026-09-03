import { motion, AnimatePresence } from "motion/react"
import { 
  Home, Briefcase, Zap, Sprout, BookOpen, ChevronLeft, ChevronRight, 
  X, Lock, Smartphone, ExternalLink, Layers, ShieldCheck, Calculator, GraduationCap 
} from "lucide-react"
import { PageView } from "../../types"

interface SidebarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

interface MenuSection {
  title: string;
  items: {
    id: PageView;
    label: string;
    icon: any;
    desc: string;
    color?: string;
  }[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "GÉNÉRAL & MATRICE",
    items: [
      { id: 'home', label: 'The OMK Office', icon: Home, desc: 'Hub Global Multi-Services' },
      { id: 'matrix', label: 'Matrice MSG2 (75 Actes)', icon: Layers, desc: 'Architecture 3x5x5 Intégrale', color: 'blue' },
    ]
  },
  {
    title: "LES 3 PÔLES OPÉRATIONNELS (75 ACTES)",
    items: [
      { id: 'pole-1-legal', label: 'Pôle 1 · Légal & Admin', icon: ShieldCheck, desc: '25 Actes · USCIS & Notariat', color: 'blue' },
      { id: 'pole-2-finance', label: 'Pôle 2 · Finance & Fisc', icon: Calculator, desc: '25 Actes · 1040, ITIN & LLC', color: 'emerald' },
      { id: 'pole-3-career', label: 'Pôle 3 · Carrière & Éduc', icon: GraduationCap, desc: '25 Actes · Skills & Dispatch', color: 'amber' },
    ]
  },
  {
    title: "OFFRES & PACKAGES",
    items: [
      { id: 'jaas', label: 'JOB (JaaS - $300/an)', icon: Briefcase, desc: 'Passeport 3 Pôles · 75 Actes', color: 'amber' },
      { id: 'baas', label: 'BUZZ (BaaS - $720)', icon: Zap, desc: 'Business Launchpad Solarpunk', color: 'indigo' },
      { id: 'paas', label: 'PRO (PaaS - $1,500)', icon: Sprout, desc: 'BaaS Factory & Hubs', color: 'emerald' },
    ]
  },
  {
    title: "OUTILS & LABS",
    items: [
      { id: 'blog-poc', label: 'Étude de Cas (Blog)', icon: BookOpen, desc: 'Dispatch Recruteurs PoC' },
      { id: 'mobile-os', label: 'Mobile OS (Maquette)', icon: Smartphone, desc: 'Portail Login Mobile' },
    ]
  }
];

export function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen, isMobile }: SidebarProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className={`h-full glass-dark flex flex-col rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/10 shrink-0 overflow-hidden z-40`}
        >
          <div className="p-6 flex items-center justify-between border-b border-white/5 min-h-[96px] shrink-0">
            <span className="font-black text-white text-2xl tracking-tight whitespace-nowrap overflow-hidden">
              OMK<span className="text-blue-500">.</span>OS
            </span>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-full bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors mx-auto border border-white/5 shrink-0 hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 py-6 flex flex-col gap-6 px-4 overflow-y-auto w-[300px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {MENU_SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {section.title}
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id)
                          if (isMobile) setIsOpen(false)
                        }}
                        className={`flex items-center gap-3.5 w-full p-3 rounded-2xl transition-all group relative text-left ${
                          isActive 
                            ? item.color === 'emerald'
                              ? 'bg-emerald-600 text-white shadow-[0_8px_25px_rgba(5,150,105,0.4)] border border-emerald-500/50'
                              : item.color === 'amber'
                              ? 'bg-amber-500 text-slate-950 shadow-[0_8px_25px_rgba(245,158,11,0.4)] border border-amber-400 font-black'
                              : 'bg-blue-600 text-white shadow-[0_8px_25px_rgba(37,99,235,0.4)] border border-blue-500/50'
                            : 'text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                          isActive 
                            ? item.color === 'amber' ? 'bg-black/20 text-slate-950' : 'bg-white/20 text-white'
                            : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                        }`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        
                        <div className="flex flex-col items-start overflow-hidden whitespace-nowrap">
                          <span className={`text-xs font-bold leading-tight ${isActive && item.color === 'amber' ? 'text-slate-950 font-black' : ''}`}>
                            {item.label}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-semibold mt-0.5 ${
                            isActive 
                              ? item.color === 'amber' ? 'text-slate-800' : 'text-blue-200' 
                              : 'text-slate-500 group-hover:text-slate-300'
                          }`}>
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-white/5 bg-black/10 shrink-0 w-[300px]">
            <a
              href="https://the-omk-mobile-back-office.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-3 flex items-center justify-between transition-all group shadow-inner"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-200 group-hover:text-amber-400 transition-colors flex items-center">
                    <span>Back-Office OS</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[9px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>OMK Mobile OS</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded-lg text-amber-400 border border-amber-500/30 group-hover:text-amber-300 transition-colors">
                Log-in
              </span>
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

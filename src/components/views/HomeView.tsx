import { Button } from "@/src/components/ui/button"
import { Briefcase, LayoutDashboard, ShieldCheck, ArrowRight, Star, Users, Zap } from "lucide-react"
import { ServicesCatalog } from "../ServicesCatalog"
import { Pricing } from "../Pricing"
import { useState } from "react"
import { PageView } from "../../types"
import { ShapeDivider } from "../ui/ShapeDivider"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../i18n/translations"

export function HomeView({ onOpenModal, setCurrentPage }: { onOpenModal: () => void, setCurrentPage: (page: PageView) => void }) {
  const [referrals, setReferrals] = useState(3)
  const cost = 300
  const revenue = referrals * 50
  const net = revenue - cost
  const progressPercent = Math.min(100, (referrals / 6) * 100)
  
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col w-full bg-slate-50 relative overflow-hidden">
      
      {/* Background Animated Blobs for Liquid Glass Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-amber-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none z-0"></div>

      {/* HERO GLOBAL - Glassmorphism */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden">
            {/* Inner subtle gradient for extra depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-blue-200/50 bg-white/50 backdrop-blur-md px-4 py-2 mb-8 shadow-sm">
                <span className="text-xs sm:text-sm font-bold text-blue-700 tracking-wide uppercase text-center">{t.home.badge[lang]}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-8">
                {t.home.title_1[lang]} <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                  {t.home.title_2[lang]}
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-700 mb-10 max-w-3xl mx-auto leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t.home.subtitle[lang].replace('The OMK Office', '<strong>The OMK Office</strong>') }}>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Button size="lg" onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 text-lg h-16 px-6 sm:px-10 rounded-full transition-all hover:scale-105 active:scale-95">
                  {t.home.btn_explore[lang]}
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('grille-offres')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto gap-2 border-slate-300 text-slate-800 bg-white/60 backdrop-blur hover:bg-white text-lg h-16 px-6 sm:px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm">
                  {t.home.btn_discover[lang]}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & TRUST - Soft UI / Neumorphism expansion */}
      <section className="py-12 bg-white/60 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">10k+</h3>
              <p className="text-slate-600 font-medium">Membres Actifs</p>
            </div>
            <div className="p-6 border-y md:border-y-0 md:border-x border-slate-200">
              <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">4.9/5</h3>
              <p className="text-slate-600 font-medium">Satisfaction Client</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">1-Click</h3>
              <p className="text-slate-600 font-medium">Déploiement & Dispatch</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <div id="catalogue" className="relative z-10 bg-slate-50 pt-16">
        <ServicesCatalog onOpenBooking={() => onOpenModal()} />
      </div>

      {/* GRILLE DES OFFRES - Glassmorphism Dark Mode (OLED) */}
      <section id="grille-offres" className="py-32 bg-slate-950 text-white relative z-10 overflow-hidden">
        <ShapeDivider position="top" type="waves-opacity" color="fill-slate-50" />
        {/* Dark Mode glowing orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              La Grille des 3 Paliers d'Offres
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Choisissez le cadre adapté à votre ambition professionnelle avec notre architecture premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* JOB */}
            <div className="glass-dark rounded-[3rem] p-10 flex flex-col hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-2">JOB <span className="text-slate-400 font-light text-lg">(JaaS)</span></h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold">$300</span>
                <span className="text-slate-400 font-medium">/ an</span>
              </div>
              <p className="text-slate-400 mb-10 flex-1 leading-relaxed">Accélérateur d'insertion et de carrière individuelle. Master Profile et Dispatch RH instantané.</p>
              <Button onClick={() => setCurrentPage('jaas')} variant="outline" className="w-full justify-between h-14 rounded-2xl border-slate-700 bg-slate-800/50 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 text-white transition-all">
                <span className="font-bold">Voir l'offre JOB</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* BUZZ */}
            <div className="glass-dark rounded-[3rem] p-10 flex flex-col hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-900/50">POPULAIRE</div>
              </div>
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-2">BUZZ <span className="text-slate-400 font-light text-lg">(BaaS)</span></h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold">$720</span>
                <span className="text-slate-400 font-medium">/ an</span>
              </div>
              <p className="text-slate-400 mb-10 flex-1 leading-relaxed">Système d'affaires clé en main. Légal, comptabilité et acquisition pour indépendants.</p>
              <Button onClick={() => setCurrentPage('baas')} className="w-full justify-between h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-900/50">
                <span className="font-bold">Voir l'offre BUZZ</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* PRO */}
            <div className="glass-dark rounded-[3rem] p-10 flex flex-col hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-2">PRO <span className="text-slate-400 font-light text-lg">(PaaS)</span></h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold">$1,500</span>
                <span className="text-slate-400 font-medium">/ an</span>
              </div>
              <p className="text-slate-400 mb-10 flex-1 leading-relaxed">Usine à projets territoriaux. Économie circulaire, infrastructure et mouvement Solarpunk.</p>
              <Button onClick={() => setCurrentPage('paas')} variant="outline" className="w-full justify-between h-14 rounded-2xl border-slate-700 bg-slate-800/50 hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 text-white transition-all">
                <span className="font-bold">Voir l'offre PRO</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* SIMULATEUR GLOBAL CAPPE A 100% - Claymorphism style */}
      <section id="simulateur-base" className="py-32 bg-[#FAF8F5] relative z-10">
        <ShapeDivider position="top" type="curve" color="fill-slate-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Simulateur d'Amortissement (Pack JOB)</h2>
            <p className="text-xl text-slate-600 font-medium">
              L'objectif de The OMK Office est que votre accompagnement ne vous coûte rien. Atteignez 100% d'amortissement grâce à l'affiliation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto clay p-10 md:p-14 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-6">
                  <label className="text-lg font-bold text-slate-700">Filleuls parrainés</label>
                  <span className="text-4xl font-extrabold text-blue-600 bg-white px-4 py-2 rounded-full shadow-sm">{referrals} <span className="text-2xl text-slate-400">/ 6</span></span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="6" 
                  value={referrals} 
                  onChange={(e) => setReferrals(parseInt(e.target.value))}
                  className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 shadow-inner"
                />
              </div>
              <div className="clay-card p-8 min-w-[240px] text-center">
                <span className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Coût Net Restant</span>
                <span className={`text-6xl font-extrabold tracking-tighter ${net === 0 ? 'text-emerald-500' : 'text-slate-900'}`}>
                  ${net === 0 ? '0' : Math.abs(net)}
                </span>
              </div>
            </div>

            <div className="relative h-8 bg-slate-200/50 rounded-full overflow-hidden shadow-inner p-1">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${progressPercent === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-4 text-sm font-extrabold uppercase tracking-widest text-slate-400">
              <span>0%</span>
              <span className={progressPercent === 100 ? 'text-emerald-500 animate-pulse' : ''}>100% AMORTI</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING (Actes Unitaires) */}
      <div id="tarifs-actes" className="relative z-10 bg-white pt-24">
        <ShapeDivider position="top" type="wave" color="fill-[#FAF8F5]" />
        <Pricing onOpenModal={onOpenModal} />
      </div>

    </div>
  )
}

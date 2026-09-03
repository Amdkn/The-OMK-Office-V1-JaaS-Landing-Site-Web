import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { 
  Briefcase, ArrowRight, ShieldCheck, Calculator, GraduationCap, 
  Sparkles, CheckCircle2, FileCheck, Rocket, Navigation, 
  TrendingUp, Award, ExternalLink, ChevronRight, Layers,
  Clock, DollarSign, Search, Check, Zap, Building2, HelpCircle
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { ShapeDivider } from "../ui/ShapeDivider"
import { useLanguage } from "../../contexts/LanguageContext"
import { MasterProfile1ClickSimulator } from "../jaas/MasterProfile1ClickSimulator"
import { TricephaleFlowSimulator } from "../jaas/TricephaleFlowSimulator"
import { MSG2_ALL_SERVICES, MSG2_POLES } from "../../data/msg2MatrixData"
import { ServiceItem } from "../../types"

export function JaaSView({ onOpenModal }: { onOpenModal: (serviceId?: string) => void }) {
  const { lang } = useLanguage()

  // Referral ROI simulator state
  const [referrals, setReferrals] = useState(6)
  const cost = 300
  const revenue = referrals * 50
  const net = revenue - cost
  const isProfitable = net > 0
  const isBreakEven = net === 0

  // Filter and preview state for Poles
  const [selectedPole1Sub, setSelectedPole1Sub] = useState<string>('ALL')
  const [selectedPole2Sub, setSelectedPole2Sub] = useState<string>('ALL')
  const [selectedPole3Sub, setSelectedPole3Sub] = useState<string>('ALL')
  const [activePreviewService, setActivePreviewService] = useState<ServiceItem | null>(null)

  const pole1Services = MSG2_ALL_SERVICES.filter(s => s.pole === 'POLE_1_LEGAL_ADMIN')
  const pole2Services = MSG2_ALL_SERVICES.filter(s => s.pole === 'POLE_2_FINANCE_ACCOUNTING')
  const pole3Services = MSG2_ALL_SERVICES.filter(s => s.pole === 'POLE_3_EDUCATION_JAAS')

  const pole1Data = MSG2_POLES.find(p => p.id === 'POLE_1_LEGAL_ADMIN')!
  const pole2Data = MSG2_POLES.find(p => p.id === 'POLE_2_FINANCE_ACCOUNTING')!
  const pole3Data = MSG2_POLES.find(p => p.id === 'POLE_3_EDUCATION_JAAS')!

  const filteredPole1 = pole1Services.filter(s => selectedPole1Sub === 'ALL' || s.subCategoryCode === selectedPole1Sub)
  const filteredPole2 = pole2Services.filter(s => selectedPole2Sub === 'ALL' || s.subCategoryCode === selectedPole2Sub)
  const filteredPole3 = pole3Services.filter(s => selectedPole3Sub === 'ALL' || s.subCategoryCode === selectedPole3Sub)

  const scrollToAnchor = (id: string) => {
    const scrollContainer = document.getElementById('main-scroll-container')
    const element = document.getElementById(id)
    if (element && scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top
      const elementTop = element.getBoundingClientRect().top
      const offsetPosition = elementTop - containerTop + scrollContainer.scrollTop - 90
      scrollContainer.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      })
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen font-sans">
      
      {/* HERO JaaS 1.0 - The Complete 3-Poles Membership */}
      <section id="jaas-hero" className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-24 scroll-mt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-amber-50/20 to-slate-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-[3rem] p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(245,158,11,0.08)] border border-white">
            
            {/* Top pill */}
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-amber-100/90 px-5 py-2 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-xs sm:text-sm font-black text-amber-950 tracking-wider uppercase">
                {lang === 'fr' 
                  ? 'LE PASSEPORT INTÉGRÉ · LES 3 PÔLES & 75 OFFRES INCLUS ($300/AN)' 
                  : 'INTEGRATED MEMBERSHIP · ALL 3 POLES & 75 ACTS INCLUDED ($300/YR)'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-5">
              {lang === 'fr' ? 'JOB as a Service (JaaS 1.0)' : 'JOB as a Service (JaaS 1.0)'} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500">
                {lang === 'fr' ? 'La Triade Complète des 3 Pôles' : 'The Full 3-Pole Triad'}
              </span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              {lang === 'fr'
                ? 'JaaS ($300/an) regroupe et débloque les 3 Pôles majeurs de The OMK Office (75 Actes opérationnels) : Légal & Administration, Finance & Fiscalité, et Carrière & Éducation pour une insertion et une réussite totale aux USA.'
                : 'JaaS ($300/yr) integrates and unlocks all 3 major Poles of The OMK Office (75 operational Acts): Legal & Administration, Finance & Taxation, and Career & Education for total empowerment in the USA.'}
            </p>

            {/* Quick Access Anchor Bar to the 3 Poles */}
            <div className="bg-slate-100/90 p-2.5 rounded-3xl border border-slate-200/80 mb-8 max-w-3xl mx-auto shadow-inner">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
                Accès Rapide aux 3 Pôles JaaS (25 Actes chacun) :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => scrollToAnchor('jaas-pole1')}
                  className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-blue-50 text-blue-900 rounded-2xl border border-blue-200 text-xs sm:text-sm font-extrabold transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pôle 1 · Légal (25 Actes)</span>
                </button>
                <button
                  onClick={() => scrollToAnchor('jaas-pole2')}
                  className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-extrabold transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pôle 2 · Finance (25 Actes)</span>
                </button>
                <button
                  onClick={() => scrollToAnchor('jaas-pole3')}
                  className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-amber-50 text-amber-950 rounded-2xl border border-amber-300 text-xs sm:text-sm font-black transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pôle 3 · Carrière (25 Actes)</span>
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={() => onOpenModal('ACT-3.2-1')} 
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_10px_30px_rgba(245,158,11,0.3)] text-base sm:text-lg h-15 px-8 sm:px-10 rounded-[2.5rem] transition-all hover:-translate-y-0.5 font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Souscrire au Passeport JaaS ($300/an)' : 'Subscribe to JaaS ($300/yr)'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToAnchor('jaas-simulateur-1click')} 
                className="w-full sm:w-auto text-base h-15 px-6 sm:px-8 rounded-[2.5rem] border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold cursor-pointer"
              >
                {lang === 'fr' ? 'Simulateur 1-Click Master Profile' : '1-Click Simulator'}
              </Button>
              <Button 
                size="lg" 
                variant="ghost"
                onClick={() => scrollToAnchor('jaas-simulateur-roi')} 
                className="w-full sm:w-auto text-base h-15 px-5 rounded-[2.5rem] text-slate-700 hover:text-amber-700 hover:bg-amber-50 font-bold cursor-pointer"
              >
                {lang === 'fr' ? 'Affiliation $50 (Amortissement)' : '$50 Referral Program'}
              </Button>
            </div>

            {/* Key stats banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 text-left">
              <div className="p-2.5">
                <span className="block text-xl sm:text-2xl font-black text-slate-900">75 Actes</span>
                <span className="text-xs font-semibold text-slate-500">3 Pôles complets inclus</span>
              </div>
              <div className="p-2.5 border-l border-slate-200">
                <span className="block text-xl sm:text-2xl font-black text-blue-600">Pôle 1 & 2</span>
                <span className="text-xs font-semibold text-slate-500">Légal USCIS + 1040/ITIN</span>
              </div>
              <div className="p-2.5 border-l border-slate-200">
                <span className="block text-xl sm:text-2xl font-black text-amber-600">Pôle 3 (SLA 48h)</span>
                <span className="text-xs font-semibold text-slate-500">Dispatch Recruteurs CVG</span>
              </div>
              <div className="p-2.5 border-l border-slate-200">
                <span className="block text-xl sm:text-2xl font-black text-emerald-600">$50 / Parrain</span>
                <span className="text-xs font-semibold text-slate-500">6 filleuls = 100% amorti</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 POLES INTEGRATED TRIAD OVERVIEW CARD */}
      <section className="py-12 bg-white border-y border-slate-200/80 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-200">
              L’Architecture JaaS 1.0
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Comment les 3 Pôles s’articulent dans votre forfait $300/an
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-1">
              Une chaîne de valeur continue : du droit de travailler à la gestion de vos impôts et à l’embauche directe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Triad 1: Legal */}
            <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-200 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    P1
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    25 Actes Inclus
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Légal & Administration</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Validation de votre statut USCIS, renouvellement EAD, notariat assermenté, traduction officielle et conformité I-9 pour lever tout blocage employeur.
                </p>
              </div>
              <button
                onClick={() => scrollToAnchor('jaas-pole1')}
                className="w-full py-2.5 px-4 bg-white hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Explorer les 25 Actes Légaux</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Triad 2: Finance */}
            <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-200 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    P2
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    25 Actes Inclus
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Finance & Fiscalité</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Déclaration fiscale annuelle 1040/W-2, obtention numéro ITIN (CAA), réparation et construction du score de crédit FICO (720+), et création LLC.
                </p>
              </div>
              <button
                onClick={() => scrollToAnchor('jaas-pole2')}
                className="w-full py-2.5 px-4 bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Explorer les 25 Actes Fiscaux</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Triad 3: Career */}
            <div className="bg-amber-50/60 rounded-3xl p-6 border border-amber-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
                    P3
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 bg-amber-200 text-amber-900 rounded-full">
                    25 Actes Inclus
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Carrière & Éducation</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Master Profile 1-Click, distribution instantanée aux recruteurs SLA 48h (Amazon CVG, DHL, Hebron), équivalences WES et affiliation $50.
                </p>
              </div>
              <button
                onClick={() => scrollToAnchor('jaas-pole3')}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl border border-amber-400 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Explorer les 25 Actes Carrière</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: PÔLE 1 · LÉGAL & ADMINISTRATION (25 ACTES DANS JAAS) */}
      {/* ========================================================================= */}
      <section id="jaas-pole1" className="py-20 bg-slate-50 relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 text-blue-800 text-xs font-black uppercase rounded-full mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pôle 1 dans JaaS · 25 Actes Opérationnels
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Pôle 1 : Légal & Administration
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-1">
                Autorisation de travail EAD, requêtes USCIS, Notariat public officiel et traductions assermentées certifiées pour lever tous vos freins administratifs.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                onClick={() => onOpenModal('ACT-1.1-1')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl px-5 py-2.5 cursor-pointer"
              >
                Prendre RDV Légal / EAD
              </Button>
            </div>
          </div>

          {/* Sub-category Filter Tabs for Pole 1 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedPole1Sub('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPole1Sub === 'ALL'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tous les 25 Actes Légaux
            </button>
            {pole1Data.subCategories.map(sub => (
              <button
                key={sub.code}
                onClick={() => setSelectedPole1Sub(sub.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPole1Sub === sub.code
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub.nameFr}
              </button>
            ))}
          </div>

          {/* Grid of 25 Legal Acts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPole1.map((act) => (
              <div 
                key={act.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {act.id}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      ${act.baseFeeUsd}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-1">
                    {lang === 'fr' ? act.titleFr : act.titleEn}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {lang === 'fr' ? act.descriptionFr : act.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {act.durationMinutes} min · {act.deliveryMode}
                  </span>
                  <button
                    onClick={() => onOpenModal(act.id)}
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Réserver</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PÔLE 2 · FINANCE & FISCALITÉ (25 ACTES DANS JAAS) */}
      {/* ========================================================================= */}
      <section id="jaas-pole2" className="py-20 bg-white relative z-10 scroll-mt-24 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-black uppercase rounded-full mb-3">
                <Calculator className="w-3.5 h-3.5" />
                Pôle 2 dans JaaS · 25 Actes Opérationnels
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Pôle 2 : Finance & Fiscalité
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-1">
                Déclarations fiscales 1040 (W-2 & 1099), délivrance d'ITIN certifié (W-7 CAA), réparation de score FICO (720+) et création de structures LLC/EIN.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                onClick={() => onOpenModal('ACT-2.1-1')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl px-5 py-2.5 cursor-pointer"
              >
                Prendre RDV Fiscal / ITIN
              </Button>
            </div>
          </div>

          {/* Sub-category Filter Tabs for Pole 2 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedPole2Sub('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPole2Sub === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tous les 25 Actes Fiscaux
            </button>
            {pole2Data.subCategories.map(sub => (
              <button
                key={sub.code}
                onClick={() => setSelectedPole2Sub(sub.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPole2Sub === sub.code
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub.nameFr}
              </button>
            ))}
          </div>

          {/* Grid of 25 Finance Acts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPole2.map((act) => (
              <div 
                key={act.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {act.id}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      ${act.baseFeeUsd}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-1">
                    {lang === 'fr' ? act.titleFr : act.titleEn}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {lang === 'fr' ? act.descriptionFr : act.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {act.durationMinutes} min · {act.deliveryMode}
                  </span>
                  <button
                    onClick={() => onOpenModal(act.id)}
                    className="text-xs font-extrabold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Réserver</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: PÔLE 3 · CARRIÈRE & ÉDUCATION (25 ACTES DANS JAAS) */}
      {/* ========================================================================= */}
      <section id="jaas-pole3" className="py-20 bg-slate-50 relative z-10 scroll-mt-24 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase rounded-full mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                Pôle 3 dans JaaS · 25 Actes Opérationnels
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Pôle 3 : Carrière, Éducation & Placement
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-1">
                Création et validation du Master Profile, dispatch direct auprès des recruteurs SLA 48h, équivalences diplômes WES et accompagnement période d'essai.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                onClick={() => scrollToAnchor('jaas-simulateur-1click')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl px-5 py-2.5 cursor-pointer shadow-sm"
              >
                Tester le Master Profile
              </Button>
            </div>
          </div>

          {/* Sub-category Filter Tabs for Pole 3 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedPole3Sub('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPole3Sub === 'ALL'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tous les 25 Actes Carrière
            </button>
            {pole3Data.subCategories.map(sub => (
              <button
                key={sub.code}
                onClick={() => setSelectedPole3Sub(sub.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPole3Sub === sub.code
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub.nameFr}
              </button>
            ))}
          </div>

          {/* Grid of 25 Career Acts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPole3.map((act) => (
              <div 
                key={act.id}
                className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {act.id}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      ${act.baseFeeUsd}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-1">
                    {lang === 'fr' ? act.titleFr : act.titleEn}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {lang === 'fr' ? act.descriptionFr : act.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {act.durationMinutes} min · {act.deliveryMode}
                  </span>
                  <button
                    onClick={() => onOpenModal(act.id)}
                    className="text-xs font-black text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Réserver</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1-CLICK MASTER PROFILE SIMULATOR (INGESTION & DISPATCH SLA 48H) */}
      {/* ========================================================================= */}
      <section id="jaas-simulateur-1click" className="py-20 relative z-10 bg-slate-900 text-white scroll-mt-24">
        <ShapeDivider position="top" type="wave" color="fill-slate-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-400/30">
              Outil Opérationnel JaaS 1.0
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Simulateur d’Ingestion Unique 1-Click
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-2">
              Testez la conversion de vos documents et l'envoi immédiat de votre Master Profile certifié vers les hubs de recrutement d'Amazon CVG, DHL et Hebron.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-[2.5rem] p-6 sm:p-10 border border-slate-700 shadow-2xl">
            <MasterProfile1ClickSimulator onOpenBooking={() => onOpenModal('ACT-3.2-1')} />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FLUX TRICÉPHALE MÉTIER */}
      {/* ========================================================================= */}
      <section className="py-20 relative z-10 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TricephaleFlowSimulator />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* AFFILIATION & ROI SIMULATOR ($50/MEMBER -> 6 = $300 AMORTI) */}
      {/* ========================================================================= */}
      <section id="jaas-simulateur-roi" className="py-20 md:py-28 bg-slate-900 text-white relative scroll-mt-24">
        <ShapeDivider position="top" type="wave" color="fill-slate-950" />
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase rounded-full mb-3">
              <Award className="w-3.5 h-3.5" />
              Acte 3.5-5 · Sovereign Fund Programs
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              {lang === 'fr' ? 'Simulateur d’Amortissement 100% (Affiliation)' : '100% Self-Funding ROI Simulator'}
            </h2>
            <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
              {lang === 'fr' 
                ? 'Gagnez $50 par filleul activé dans le réseau OMK. Avec 6 recommandations, votre adhésion annuelle de $300 est entièrement remboursée.' 
                : 'Earn $50 per activated referral in the OMK network. With 6 referrals, your $300 annual membership is 100% self-funded.'}
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-[3rem] p-8 sm:p-12 md:p-14 border border-slate-700 shadow-2xl">
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <label className="text-lg sm:text-xl font-bold text-slate-200">
                  {lang === 'fr' ? 'Nombre de Filleuls Parrainés :' : 'Referred Members Count:'}
                </label>
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 bg-slate-900 px-5 py-2 rounded-2xl border border-slate-700">
                  {referrals} <span className="text-lg text-slate-400 font-bold">/ 20</span>
                </span>
              </div>

              <input 
                type="range" 
                min="0" 
                max="20" 
                value={referrals} 
                onChange={(e) => setReferrals(parseInt(e.target.value))}
                className="w-full h-4 bg-slate-900 rounded-full appearance-none cursor-pointer accent-amber-500 shadow-inner"
              />

              <div className="flex justify-between mt-4 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-widest">
                <span>0 Filleuls ($0)</span>
                <span className={referrals >= 6 ? "text-amber-400 font-black" : ""}>Seuil 100% Amorti (6 Filleuls = $300)</span>
                <span>20 Filleuls ($1,000)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-700 text-center">
                <span className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Gains d'Affiliation ($50/u)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">${revenue}</span>
              </div>

              <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-700 text-center">
                <span className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Coût Annuel JaaS 1.0
                </span>
                <span className="text-3xl sm:text-4xl font-black text-rose-400">-$300</span>
              </div>

              <div className={`p-6 sm:p-8 rounded-3xl border text-center transition-all ${
                isProfitable 
                  ? 'bg-amber-500/20 border-amber-400' 
                  : isBreakEven
                  ? 'bg-emerald-500/20 border-emerald-400'
                  : 'bg-slate-900/80 border-slate-700'
              }`}>
                <span className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Trésorerie Nette Réelle
                </span>
                <span className={`text-3xl sm:text-4xl font-black ${
                  net > 0 ? 'text-amber-400' : net === 0 ? 'text-emerald-400' : 'text-slate-300'
                }`}>
                  {net > 0 ? `+$${net}` : net === 0 ? '$0 (100% Amorti)' : `-$${Math.abs(net)}`}
                </span>
                {net >= 0 && (
                  <span className="block text-[11px] font-black text-amber-300 mt-2 uppercase tracking-widest">
                    {net === 0 ? 'Zero Dépense Nette' : 'Gains Nets Positifs'}
                  </span>
                )}
              </div>
            </div>

            {/* Referral CTA */}
            <div className="mt-10 pt-8 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
                Votre lien d’affiliation est activé dès la validation de votre adhésion JaaS 1.0.
              </div>
              <Button 
                onClick={() => onOpenModal('ACT-3.5-5')}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl shadow-lg cursor-pointer"
              >
                Rejoindre & Activer mon Code Affilié
              </Button>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

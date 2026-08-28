import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  Calculator, DollarSign, TrendingUp, Building, Briefcase, 
  CheckCircle2, Clock, ArrowRight, Sparkles, Filter, Search, 
  ChevronRight, Building2, Laptop, RefreshCw, Landmark, CreditCard, PieChart, Shield
} from "lucide-react"
import { MSG2_ALL_SERVICES, MSG2_POLES } from "../../data/msg2MatrixData"
import { ServiceItem, DeliveryMode } from "../../types"
import { useLanguage } from "../../contexts/LanguageContext"
import { Button } from "../ui/button"
import { ShapeDivider } from "../ui/ShapeDivider"

export function Pole2FinanceView({ onOpenModal }: { onOpenModal: (serviceId?: string) => void }) {
  const { lang } = useLanguage()
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL')
  const [selectedMode, setSelectedMode] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Interactive Tax & Cash-Flow Simulator State
  const [incomeType, setIncomeType] = useState<'W2' | '1099' | 'BOTH'>('W2')
  const [estimatedGrossIncome, setEstimatedGrossIncome] = useState<number>(45000)
  const [dependentsCount, setDependentsCount] = useState<number>(1)
  const [hasITINNeed, setHasITINNeed] = useState<boolean>(false)

  const pole2Data = MSG2_POLES.find(p => p.id === 'POLE_2_FINANCE_ACCOUNTING')!
  const pole2Services = MSG2_ALL_SERVICES.filter(s => s.pole === 'POLE_2_FINANCE_ACCOUNTING')

  const filteredServices = useMemo(() => {
    return pole2Services.filter(service => {
      if (selectedSubCategory !== 'ALL' && service.subCategoryCode !== selectedSubCategory) {
        return false
      }
      if (selectedMode !== 'ALL' && service.deliveryMode !== selectedMode) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = service.titleFr.toLowerCase().includes(q) || service.titleEn.toLowerCase().includes(q)
        const matchDesc = service.descriptionFr.toLowerCase().includes(q) || service.descriptionEn.toLowerCase().includes(q)
        const matchId = service.id.toLowerCase().includes(q)
        return matchTitle || matchDesc || matchId
      }
      return true
    })
  }, [pole2Services, selectedSubCategory, selectedMode, searchQuery])

  // Simple Tax Estimation Calculation for demonstration
  const estimatedTaxRefund = useMemo(() => {
    let base = incomeType === 'W2' ? 1800 : incomeType === '1099' ? 600 : 1200
    base += dependentsCount * 1200
    if (estimatedGrossIncome > 60000) base -= 400
    return Math.max(200, base)
  }, [incomeType, estimatedGrossIncome, dependentsCount])

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen font-sans">
      
      {/* HERO POLE 2 */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/50 via-emerald-50/20 to-slate-50 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 mb-6 shadow-sm">
              <Calculator className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-emerald-900 tracking-wider uppercase">
                {lang === 'fr' ? 'Pôle 2 Matrice MSG2 · 25 Actes Fiscaux & Financiers' : 'Pole 2 MSG2 Matrix · 25 Financial & Tax Acts'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              {lang === 'fr' ? 'Fiscalité, Finance &' : 'Taxation, Finance &'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
                {lang === 'fr' ? 'Comptabilité Entreprise' : 'Business Accounting'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
              {lang === 'fr'
                ? 'De la préparation de vos déclarations d’impôts (1040 W-2 / 1099) à l’obtention d’ITIN (W-7), la construction de crédit FICO et la création de LLC. Optimisez et sécurisez votre capital.'
                : 'From tax preparation (1040 W-2 / 1099) to ITIN processing (W-7), FICO credit score building, and LLC formation. Maximize and protect your financial growth.'}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => onOpenModal()}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 text-base h-14 px-8 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <span>{lang === 'fr' ? 'Réserver un Acte Fiscal / Finance' : 'Book a Finance / Tax Act'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('pole2-simulator')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-base h-14 px-6 rounded-2xl border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold"
              >
                {lang === 'fr' ? 'Simulateur d’Impôts & FICO' : 'Tax & FICO Simulator'}
              </Button>
            </div>

            {/* 5 Sub-Categories Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12 text-left">
              {pole2Data.subCategories.map((sub) => (
                <button
                  key={sub.code}
                  onClick={() => {
                    setSelectedSubCategory(sub.code)
                    document.getElementById('pole2-catalog')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    selectedSubCategory === sub.code 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                      : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200 shadow-sm'
                  }`}
                >
                  <span className={`text-[11px] font-mono font-black ${selectedSubCategory === sub.code ? 'text-emerald-200' : 'text-emerald-700'}`}>
                    {sub.code}
                  </span>
                  <span className="text-xs font-bold leading-tight mt-1 line-clamp-2">
                    {lang === 'fr' ? sub.nameFr.replace(`${sub.code} `, '') : sub.nameEn.replace(`${sub.code} `, '')}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE TAX & FICO SIMULATOR */}
      <section id="pole2-simulator" className="py-16 bg-white relative z-10 border-y border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              Outil Fédéral & Fiscal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'fr' ? 'Simulateur de Remboursement Fédéral (1040 & ITIN)' : 'Federal Tax Refund Simulator (1040 & ITIN)'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-1">
              Estimez votre remboursement potentiel et identifiez les leviers d'optimisation W-2, 1099 et crédits enfants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-slate-800">
            <div className="lg:col-span-6 space-y-6">
              
              {/* Income Type */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Type de Revenus :
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['W2', '1099', 'BOTH'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setIncomeType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        incomeType === type 
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' 
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {type === 'W2' ? 'Salarié (W-2)' : type === '1099' ? 'Indépendant (1099)' : 'Mixte (W-2 & 1099)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gross Income Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-200">
                    Revenu Brut Annuel Estimé :
                  </label>
                  <span className="font-mono text-xl font-black text-emerald-400 bg-slate-800 px-3 py-1 rounded-xl">
                    ${estimatedGrossIncome.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="15000" 
                  max="120000" 
                  step="5000"
                  value={estimatedGrossIncome} 
                  onChange={(e) => setEstimatedGrossIncome(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>$15,000</span>
                  <span>$60,000</span>
                  <span>$120,000+</span>
                </div>
              </div>

              {/* Dependents & ITIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Personnes à charge (Enfants) :
                  </label>
                  <select
                    value={dependentsCount}
                    onChange={(e) => setDependentsCount(parseInt(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={0}>0 personne à charge</option>
                    <option value={1}>1 enfant / dépendant</option>
                    <option value={2}>2 enfants / dépendants</option>
                    <option value={3}>3+ enfants / dépendants</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 p-3 bg-slate-800/80 rounded-xl cursor-pointer hover:bg-slate-800 w-full mt-auto">
                    <input 
                      type="checkbox" 
                      checked={hasITINNeed} 
                      onChange={(e) => setHasITINNeed(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-medium">Besoin d'un numéro ITIN W-7</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results Output */}
            <div className="lg:col-span-6 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
              <div className="text-center p-4 bg-slate-900/90 rounded-2xl border border-slate-700/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Remboursement Fédéral Brut Estimé
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-400">
                  ~${estimatedTaxRefund.toLocaleString()}
                </span>
                <span className="block text-[11px] text-slate-400 mt-1">
                  Sous réserve des déductions d'État (KY/OH/IN) et crédits EITC/CTC applicables.
                </span>
              </div>

              <div className="border-t border-slate-700/80 pt-3 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Actes Fiscaux Concernés :
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="font-medium text-slate-200">
                      {incomeType === 'W2' ? 'Acte 2.1-1 · Déclaration 1040 Particulier W-2' : 'Acte 2.1-2 · Déclaration 1040 Schedule C 1099'}
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {incomeType === 'W2' ? '$120' : '$220'}
                    </span>
                  </div>
                  {hasITINNeed && (
                    <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl">
                      <span className="font-medium text-slate-200">Acte 2.1-3 · Demande ITIN W-7 (CAA Certifié)</span>
                      <span className="font-mono font-bold text-teal-400">$175</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="font-medium text-slate-200">Acte 2.2-2 · Optimisation FICO Score & Credit Building</span>
                    <span className="font-mono font-bold text-amber-400">$85 / bilan</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onOpenModal('2.1-1')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold h-11 rounded-xl text-sm"
              >
                Planifier ma Déclaration Fiscale avec The OMK Office
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE COMPLET DES 25 ACTES POLE 2 */}
      <section id="pole2-catalog" className="py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Nomenclature Intégrale
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Les 25 Actes Opérationnels du Pôle 2
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Explorez par domaine ou effectuez une recherche par mot-clé (ex: 1040, ITIN, LLC, Microcrédit).
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'fr' ? 'Rechercher un acte fiscal / finance...' : 'Search finance act...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sub-Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-200">
            <button
              onClick={() => setSelectedSubCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedSubCategory === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tous les Actes (25)
            </button>
            {pole2Data.subCategories.map((sub) => (
              <button
                key={sub.code}
                onClick={() => setSelectedSubCategory(sub.code)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedSubCategory === sub.code
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sub.code} · {lang === 'fr' ? sub.nameFr.replace(`${sub.code} `, '') : sub.nameEn.replace(`${sub.code} `, '')}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Acte {service.id}
                    </span>
                    
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {service.deliveryMode === 'IN_PERSON_OFFICE' && (
                        <>
                          <Building2 className="w-3 h-3 text-emerald-600" />
                          <span>Au Bureau</span>
                        </>
                      )}
                      {service.deliveryMode === 'REMOTE_ONLINE' && (
                        <>
                          <Laptop className="w-3 h-3 text-teal-600" />
                          <span>En Ligne</span>
                        </>
                      )}
                      {service.deliveryMode === 'HYBRID_DISPATCH' && (
                        <>
                          <RefreshCw className="w-3 h-3 text-amber-600" />
                          <span>Hybride</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                    {lang === 'fr' ? service.titleFr : service.titleEn}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {lang === 'fr' ? service.descriptionFr : service.descriptionEn}
                  </p>

                  {/* Deliverables tags */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Livrables :</span>
                    {(lang === 'fr' ? service.deliverablesFr : service.deliverablesEn).map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  {service.includedInJaaS && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 mb-4 text-[11px] text-amber-900 font-medium">
                      <span className="font-bold">Synergie JaaS 1.0 :</span> {lang === 'fr' ? service.jaasSynergyNoteFr : service.jaasSynergyNoteEn}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Tarif indicatif</span>
                    <span className="font-mono text-lg font-black text-slate-900">
                      ${service.baseFeeUsd}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1">/ {service.durationMinutes} min</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onOpenModal(service.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl px-4 h-9 shadow-sm"
                  >
                    Réserver
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 font-medium">Aucun acte financier ne correspond à votre recherche.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedSubCategory('ALL'); setSelectedMode('ALL'); }}
                className="mt-3 text-xs font-bold text-emerald-600 underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

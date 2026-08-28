import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  ShieldCheck, FileText, Stamp, Scale, Globe, CheckCircle2, 
  Clock, DollarSign, ArrowRight, Sparkles, Filter, Search, 
  ChevronRight, Building2, Laptop, RefreshCw, FileCheck2, UserCheck, AlertTriangle
} from "lucide-react"
import { MSG2_ALL_SERVICES, MSG2_POLES } from "../../data/msg2MatrixData"
import { ServiceItem, DeliveryMode } from "../../types"
import { useLanguage } from "../../contexts/LanguageContext"
import { Button } from "../ui/button"
import { ShapeDivider } from "../ui/ShapeDivider"

export function Pole1LegalView({ onOpenModal }: { onOpenModal: (serviceId?: string) => void }) {
  const { lang } = useLanguage()
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL')
  const [selectedMode, setSelectedMode] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null)

  // Interactive Legal Readiness & Document Intake Simulator State
  const [eadExpiryMonths, setEadExpiryMonths] = useState<number>(4)
  const [hasCivilDocs, setHasCivilDocs] = useState<boolean>(true)
  const [needsTranslation, setNeedsTranslation] = useState<boolean>(true)

  const pole1Data = MSG2_POLES.find(p => p.id === 'POLE_1_LEGAL_ADMIN')!
  const pole1Services = MSG2_ALL_SERVICES.filter(s => s.pole === 'POLE_1_LEGAL_ADMIN')

  const filteredServices = useMemo(() => {
    return pole1Services.filter(service => {
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
  }, [pole1Services, selectedSubCategory, selectedMode, searchQuery])

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen font-sans">
      
      {/* HERO POLE 1 */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 via-blue-50/20 to-slate-50 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/80 px-4 py-1.5 mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-wider uppercase">
                {lang === 'fr' ? 'Pôle 1 Matrice MSG2 · 25 Actes Certifiés' : 'Pole 1 MSG2 Matrix · 25 Certified Acts'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              {lang === 'fr' ? 'Légal, Immigration &' : 'Legal, Immigration &'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                {lang === 'fr' ? 'Conformité Administrative' : 'Administrative Compliance'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
              {lang === 'fr'
                ? 'Du renouvellement d’autorisation de travail (EAD/I-765) aux traductions certifiées et actes notariés. Sécurisez votre statut et vos documents avec l’accompagnement rigoureux de The OMK Office.'
                : 'From work authorization renewals (EAD/I-765) to certified translations and notarized acts. Secure your status and records with The OMK Office.'}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => onOpenModal()}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 text-base h-14 px-8 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <span>{lang === 'fr' ? 'Réserver un Acte Légal' : 'Book a Legal Act'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('pole1-checker')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-base h-14 px-6 rounded-2xl border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold"
              >
                {lang === 'fr' ? 'Audit d’Éligibilité EAD & Traduction' : 'EAD & Translation Audit'}
              </Button>
            </div>

            {/* 5 Sub-Categories Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12 text-left">
              {pole1Data.subCategories.map((sub) => (
                <button
                  key={sub.code}
                  onClick={() => {
                    setSelectedSubCategory(sub.code)
                    document.getElementById('pole1-catalog')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    selectedSubCategory === sub.code 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                      : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200 shadow-sm'
                  }`}
                >
                  <span className={`text-[11px] font-mono font-black ${selectedSubCategory === sub.code ? 'text-blue-200' : 'text-blue-600'}`}>
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

      {/* INTERACTIVE LEGAL AUDIT & READINESS SIMULATOR */}
      <section id="pole1-checker" className="py-16 bg-white relative z-10 border-y border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Outil d'Ingestion & Prévention
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'fr' ? 'Diagnostic d’Urgence Administrative & EAD' : 'Administrative & EAD Urgency Diagnostic'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-1">
              Anticipez les délais USCIS (150-180 jours) et sécurisez votre transition vers l’emploi sans rupture de contrat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-slate-800">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-200">
                    Délai avant expiration de votre permis / EAD :
                  </label>
                  <span className="font-mono text-xl font-black text-amber-400 bg-slate-800 px-3 py-1 rounded-xl">
                    {eadExpiryMonths} {lang === 'fr' ? 'mois' : 'months'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={eadExpiryMonths} 
                  onChange={(e) => setEadExpiryMonths(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>1 mois (Urgence absolue)</span>
                  <span>6 mois (Recommandé USCIS)</span>
                  <span>12 mois</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl cursor-pointer hover:bg-slate-800">
                  <input 
                    type="checkbox" 
                    checked={hasCivilDocs} 
                    onChange={(e) => setHasCivilDocs(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm font-medium">Actes de naissance & passeport valide en main</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl cursor-pointer hover:bg-slate-800">
                  <input 
                    type="checkbox" 
                    checked={needsTranslation} 
                    onChange={(e) => setNeedsTranslation(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm font-medium">Documents rédigés en langue étrangère (Besoin de traduction certifiée)</span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center gap-3">
                {eadExpiryMonths <= 3 ? (
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    {eadExpiryMonths <= 3 ? 'Action Immédiate Requise (Form I-765)' : 'Période Idéale de Préparation'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {eadExpiryMonths <= 3 
                      ? 'Les délais de traitement USCIS risquent de dépasser votre date de fin de validité.' 
                      : 'Vous êtes dans la fenêtre optimale de 180 jours pour un renouvellement sans stress.'}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700/80 pt-3 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Actes Recommandés par The OMK Office :
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="font-medium text-slate-200">Acte 1.1-2 · Renouvellement EAD I-765</span>
                    <span className="font-mono font-bold text-blue-400">$150 (48h)</span>
                  </div>
                  {needsTranslation && (
                    <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl">
                      <span className="font-medium text-slate-200">Acte 1.5-1 · Traduction Certifiée de Diplômes/Actes</span>
                      <span className="font-mono font-bold text-sky-400">$45 / page</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="font-medium text-slate-200">Synergie JaaS 1.0 · Ingestion Master Profile</span>
                    <span className="font-mono font-bold text-amber-400">Inclus dans $300/an</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onOpenModal('1.1-2')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold h-11 rounded-xl text-sm"
              >
                Prendre Rendez-Vous pour cet Audit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE COMPLET DES 25 ACTES POLE 1 */}
      <section id="pole1-catalog" className="py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Nomenclature Intégrale
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Les 25 Actes Opérationnels du Pôle 1
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Explorez par domaine ou effectuez une recherche par mot-clé ou numéro d'acte (ex: 1.1-1, 1.3-4).
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'fr' ? 'Rechercher un acte légal...' : 'Search legal act...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
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
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tous les Actes (25)
            </button>
            {pole1Data.subCategories.map((sub) => (
              <button
                key={sub.code}
                onClick={() => setSelectedSubCategory(sub.code)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedSubCategory === sub.code
                    ? 'bg-blue-600 text-white shadow-sm'
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
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-blue-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                      Acte {service.id}
                    </span>
                    
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {service.deliveryMode === 'IN_PERSON_OFFICE' && (
                        <>
                          <Building2 className="w-3 h-3 text-blue-600" />
                          <span>Au Bureau</span>
                        </>
                      )}
                      {service.deliveryMode === 'REMOTE_ONLINE' && (
                        <>
                          <Laptop className="w-3 h-3 text-emerald-600" />
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

                  <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors leading-snug">
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
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl px-4 h-9 shadow-sm"
                  >
                    Réserver
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 font-medium">Aucun acte ne correspond à votre recherche.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedSubCategory('ALL'); setSelectedMode('ALL'); }}
                className="mt-3 text-xs font-bold text-blue-600 underline"
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

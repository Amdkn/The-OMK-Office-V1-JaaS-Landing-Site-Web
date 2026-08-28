import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { 
  GraduationCap, Briefcase, Rocket, Sparkles, CheckCircle2, 
  Clock, DollarSign, ArrowRight, Search, Building2, Laptop, 
  RefreshCw, Award, BookOpen, UserCheck, ShieldCheck, Zap
} from "lucide-react"
import { MSG2_ALL_SERVICES, MSG2_POLES } from "../../data/msg2MatrixData"
import { ServiceItem } from "../../types"
import { useLanguage } from "../../contexts/LanguageContext"
import { Button } from "../ui/button"
import { MasterProfile1ClickSimulator } from "../jaas/MasterProfile1ClickSimulator"
import { TricephaleFlowSimulator } from "../jaas/TricephaleFlowSimulator"
import { Pole3DetailedBreakdown } from "../jaas/Pole3DetailedBreakdown"

export function Pole3CareerView({ onOpenModal }: { onOpenModal: (serviceId?: string) => void }) {
  const { lang } = useLanguage()
  const [referrals, setReferrals] = useState(6)
  const cost = 300
  const revenue = referrals * 50
  const net = revenue - cost
  const isProfitable = net > 0
  const isBreakEven = net === 0

  const pole3Data = MSG2_POLES.find(p => p.id === 'POLE_3_EDUCATION_JAAS')!

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen font-sans">
      
      {/* HERO POLE 3 */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-amber-50/20 to-slate-50 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/80 px-4 py-1.5 mb-6 shadow-sm">
              <GraduationCap className="w-4 h-4 text-amber-800 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-amber-950 tracking-wider uppercase">
                {lang === 'fr' ? 'Pôle 3 Matrice MSG2 · 25 Actes Carrière & JaaS 1.0' : 'Pole 3 MSG2 Matrix · 25 Career & JaaS Acts'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              {lang === 'fr' ? 'Carrière, Éducation &' : 'Career, Education &'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600">
                JOB as a Service (JaaS 1.0)
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
              {lang === 'fr'
                ? 'L’industrialisation complète de votre recherche d’emploi et de vos montées en compétences. Ingestion unique Master Profile, multi-dispatch recruteurs SLA 48h, et adhésion annuelle amortissable à $300/an.'
                : 'Complete industrialization of your job search and skill development. Single 1-Click Master Profile ingestion, 48h SLA recruiter multi-dispatch, and self-funding $300/year annual membership.'}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => onOpenModal('3.2-1')}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 text-base h-14 px-8 rounded-2xl font-black flex items-center justify-center gap-2"
              >
                <span>{lang === 'fr' ? 'Souscrire au JaaS 1.0 ($300/an)' : 'Subscribe to JaaS 1.0 ($300/yr)'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('pole3-simulator')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-base h-14 px-6 rounded-2xl border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold"
              >
                {lang === 'fr' ? 'Tester le Simulateur 1-Click' : 'Test 1-Click Simulator'}
              </Button>
            </div>

            {/* 5 Sub-Categories Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12 text-left">
              {pole3Data.subCategories.map((sub) => (
                <button
                  key={sub.code}
                  onClick={() => {
                    document.getElementById('pole3-acts-breakdown')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between bg-white/80 hover:bg-white text-slate-700 border-slate-200 shadow-sm hover:border-amber-400"
                >
                  <span className="text-[11px] font-mono font-black text-amber-700">
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

      {/* 1-CLICK MASTER PROFILE SIMULATOR */}
      <section id="pole3-simulator" className="py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MasterProfile1ClickSimulator onOpenBooking={() => onOpenModal('3.2-4')} />
        </div>
      </section>

      {/* LE TRICEPHALE METIER FLOW */}
      <section className="py-16 md:py-24 relative z-10 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TricephaleFlowSimulator />
        </div>
      </section>

      {/* DETAILED 25 ACTS BREAKDOWN */}
      <section id="pole3-acts-breakdown" className="py-16 md:py-24 relative z-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Pole3DetailedBreakdown onOpenBooking={(id) => onOpenModal(id)} />
        </div>
      </section>

      {/* AFFILIATION & ROI SIMULATOR */}
      <section id="pole3-roi" className="py-20 md:py-28 bg-slate-900 text-white relative">
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
                onClick={() => onOpenModal('3.5-5')}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl shadow-lg"
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

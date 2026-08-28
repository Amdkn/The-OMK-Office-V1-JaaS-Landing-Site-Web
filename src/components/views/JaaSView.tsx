import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { 
  Briefcase, ArrowRight, Play, CheckCircle2, Navigation, 
  FileCheck, Rocket, Sparkles, ShieldCheck, Zap, Users,
  TrendingUp, QrCode, Award, Truck, BookOpen
} from "lucide-react"
import { motion } from "motion/react"
import { ShapeDivider } from "../ui/ShapeDivider"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../i18n/translations"
import { MasterProfile1ClickSimulator } from "../jaas/MasterProfile1ClickSimulator"
import { TricephaleFlowSimulator } from "../jaas/TricephaleFlowSimulator"
import { Pole3DetailedBreakdown } from "../jaas/Pole3DetailedBreakdown"
import { MSG2MatrixExplorer } from "../matrix/MSG2MatrixExplorer"

export function JaaSView({ onOpenModal }: { onOpenModal: () => void }) {
  const [referrals, setReferrals] = useState(6)
  const cost = 300
  const revenue = referrals * 50
  const net = revenue - cost
  const isProfitable = net > 0
  const isBreakEven = net === 0
  
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen font-sans">
      
      {/* HERO JaaS 1.0 - Focused Value Proposition */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-amber-50/20 to-slate-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-[3rem] p-6 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(245,158,11,0.08)] border border-white">
            
            {/* Top pill */}
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-amber-100/80 px-5 py-2 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-amber-900 tracking-widest uppercase">
                {lang === 'fr' ? 'Offre Pôle 3 Focus V1 · JOB as a Service' : 'Pole 3 Core V1 · JOB as a Service'}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              {lang === 'fr' ? 'Accélérateur de Carrière' : 'Career Acceleration Engine'}{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500">
                JaaS 1.0 · $300 / an
              </span>
            </h1>
            
            <p className="text-lg sm:text-2xl text-slate-700 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              {lang === 'fr'
                ? 'L’industrialisation complète du Pôle 3 de la matrice MSG2 (25 actes opérationnels). Master Profile 1-Click, multi-dispatch recruteurs SLA 48h, et interconnexion légale & fiscale.'
                : 'Full industrialization of Pole 3 from the MSG2 matrix (25 operational acts). 1-Click Master Profile, 48h recruiter multi-dispatch SLA, and tri-polar legal & tax synergy.'}
            </p>
            
            {/* Action buttons & key stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={onOpenModal} 
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_10px_30px_rgba(245,158,11,0.3)] text-base sm:text-lg h-16 px-8 sm:px-12 rounded-[2.5rem] transition-all hover:-translate-y-1 active:translate-y-0 font-extrabold flex items-center justify-center gap-2"
              >
                <span>{lang === 'fr' ? 'Souscrire au JaaS 1.0 ($300/an)' : 'Subscribe to JaaS 1.0 ($300/yr)'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('jaas-simulateur-1click')?.scrollIntoView({ behavior: 'smooth' })} 
                className="w-full sm:w-auto text-base sm:text-lg h-16 px-6 sm:px-8 rounded-[2.5rem] border-slate-300 bg-white/80 hover:bg-white text-slate-800 font-bold"
              >
                {lang === 'fr' ? 'Tester le Simulateur 1-Click' : 'Test 1-Click Simulator'}
              </Button>
            </div>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200/80 text-left">
              <div className="p-3">
                <span className="block text-2xl sm:text-3xl font-black text-slate-900">25 Actes</span>
                <span className="text-xs font-semibold text-slate-500">Pôle 3 complet inclus</span>
              </div>
              <div className="p-3 border-l border-slate-200">
                <span className="block text-2xl sm:text-3xl font-black text-amber-600">SLA 48h</span>
                <span className="text-xs font-semibold text-slate-500">Dispatch recruteurs CVG</span>
              </div>
              <div className="p-3 border-l border-slate-200">
                <span className="block text-2xl sm:text-3xl font-black text-emerald-600">94%</span>
                <span className="text-xs font-semibold text-slate-500">Offre signée &lt; 14 jours</span>
              </div>
              <div className="p-3 border-l border-slate-200">
                <span className="block text-2xl sm:text-3xl font-black text-blue-600">$50 / parrain</span>
                <span className="text-xs font-semibold text-slate-500">Auto-financement à 100%</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1-CLICK MASTER PROFILE SIMULATOR */}
      <section id="jaas-simulateur-1click" className="py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MasterProfile1ClickSimulator onOpenBooking={() => onOpenModal()} />
        </div>
      </section>

      {/* METHODOLOGIE JAAS - 3 Piliers */}
      <section id="jaas-methode" className="py-16 md:py-24 bg-white relative z-10">
        <ShapeDivider position="top" type="wave" color="fill-slate-50" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-extrabold uppercase rounded-full mb-3">
              Standard Opérationnel
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {lang === 'fr' ? 'La Méthodologie d’Industrialisation JaaS' : 'The JaaS Industrialization Methodology'}
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              {lang === 'fr' 
                ? 'Trois étapes automatisées pour transformer une démarche d’embauche laborieuse en un pipeline continu d’opportunités certifiées.' 
                : 'Three automated steps turning repetitive applications into a continuous certified hiring pipeline.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 shadow-sm">
                <FileCheck className="w-8 h-8" />
              </div>
              <div className="font-mono text-xs font-extrabold text-blue-700 mb-1">ACTES 3.2-1 & 1.1-1</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">1. Ingestion Unique (1-Click)</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Numérisation et validation unique au bureau : pièces d’identité, autorisations EAD/I-9, diplômes traduits et historique professionnel. Fini les formulaires répétitifs.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-10 border border-amber-300 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              <div className="w-16 h-16 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center mb-6 shadow-sm relative z-10">
                <Rocket className="w-8 h-8" />
              </div>
              <div className="font-mono text-xs font-extrabold text-amber-800 mb-1 relative z-10">ACTE 3.2-4 (SLA 48H)</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 relative z-10">2. Multi-Dispatch Recruteurs</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed relative z-10">
                Distribution en 1 clic de votre Master Profile certifié directement aux managers d’embauche des hubs logistiques (Amazon CVG, DHL, Hebron, Wayfair).
              </p>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />
            </div>
            
            <div className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-sm">
                <Navigation className="w-8 h-8" />
              </div>
              <div className="font-mono text-xs font-extrabold text-emerald-700 mb-1">ACTES 3.2-5 & 2.1-1</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">3. Protection 90 Jours & Fisc</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Accompagnement continu pendant la période d’essai, résolution des litiges plannings et bascule vers la déclaration fiscale 1040 W-2 et le credit building FICO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LE TRICEPHALE METIER SIMULATOR */}
      <section className="py-16 md:py-24 relative z-10 bg-slate-950">
        <ShapeDivider position="top" type="curve" color="fill-white" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TricephaleFlowSimulator />
        </div>
      </section>

      {/* DETAILED BREAKDOWN OF THE 25 ACTS OF POLE 3 */}
      <section id="jaas-pricing" className="py-16 md:py-24 relative z-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Pole3DetailedBreakdown onOpenBooking={() => onOpenModal()} />
        </div>
      </section>

      {/* COMPLETE MSG2 MATRIX EXPLORER EMBEDDED */}
      <section className="py-16 md:py-24 bg-white relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-800 rounded-full border border-slate-200">
              Navigation Globale
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Explorer l’Intégralité des 75 Actes de la Matrice MSG2
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-1">
              Filtrez instantanément entre le Pôle 1 (Légal), le Pôle 2 (Finance) et le Pôle 3 (Carrière & JaaS).
            </p>
          </div>

          <MSG2MatrixExplorer 
            defaultPole="POLE_3_EDUCATION_JAAS" 
            onOpenBooking={() => onOpenModal()} 
          />
        </div>
      </section>

      {/* AFFILIATION & ROI SIMULATOR ($50/MEMBER -> 6 = $300 AMORTI) */}
      <section id="jaas-simulateur-roi" className="py-20 md:py-28 bg-slate-900 text-white relative">
        <ShapeDivider position="top" type="wave" color="fill-white" />
        
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
                onClick={onOpenModal}
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

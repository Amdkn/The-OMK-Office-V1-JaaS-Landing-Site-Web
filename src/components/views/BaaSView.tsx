import { useState } from "react"
import { ShieldCheck, ArrowRight, Zap, CheckCircle, Briefcase, TrendingUp, Calculator, Building2, Terminal } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ShapeDivider } from "../ui/ShapeDivider"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../i18n/translations"

interface BaaSViewProps {
  onOpenModal: () => void;
}

export function BaaSView({ onOpenModal }: BaaSViewProps) {
  const [referrals, setReferrals] = useState(0)
  const { lang } = useLanguage()

  const buzzCost = 720
  const referralBonus = 150
  const revenue = referrals * referralBonus
  const net = revenue - buzzCost
  const isProfitable = net >= 0

  return (
    <div className="w-full bg-slate-950 min-h-screen text-slate-200">
      
      {/* HERO SECTION (BaaS) */}
      <section id="baas-hero" className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto glass-dark p-6 sm:p-12 md:p-16 rounded-[3rem] relative border border-white/10 shadow-2xl">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-500/30 animate-pulse">
              <Zap className="w-10 h-10" />
            </div>
            
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 mb-8">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-blue-300 tracking-wider uppercase text-center">CADRE 2 : BUZZ (BaaS) — $720 / AN</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8">
              Votre Entreprise Clé en Main, <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-sm">
                Conforme et Auto-Opérée.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              De l'immatriculation légale et la fiscalité continue jusqu'au moteur d'acquisition client. Un système complet à $720/an conçu pour s'auto-financer dès 5 recommandations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-300">Immatriculation LLC/EIN</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-300">Comptabilité & Taxes</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-300">Moteur de Leads Locaux</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-300">Back-Office Connecté</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" onClick={onOpenModal} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] text-lg h-16 px-6 sm:px-12 rounded-[2rem] transition-all">
                Lancer mon Entreprise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Légal & Création */}
      <section id="baas-launchpad" className="py-20 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6">1. Corporate & Legal Launchpad</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Ne vous laissez plus freiner par la bureaucratie. Nous établissons votre structure juridique en parfaite conformité avec les réglementations d'État.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Création et enregistrement de structure (LLC, Corp, Sole Prop) en conformité d'État.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Obtention immédiate de l'EIN fédéral et configuration du Registered Agent.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Rédaction des statuts (Operating Agreement) et conformité bancaire professionnelle.</span>
                </li>
              </ul>
            </div>
            <div className="glass-dark rounded-[3rem] p-8 border border-white/10 relative overflow-hidden h-full min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Fiscalité & Taxes */}
      <section id="baas-finance" className="py-20 relative bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 glass-dark rounded-[3rem] p-8 border border-white/10 relative overflow-hidden h-full min-h-[400px]">
               <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-indigo-500 to-transparent"></div>
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/40 to-transparent"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6">2. Fiscalité Continue & Comptabilité</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Gardez l'esprit tranquille. Notre système automatise votre santé financière et garantit que vous êtes toujours en règle avec les services fiscaux.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Tenue de livres mensuelle automatisée et rapprochement bancaire.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Déclarations fiscales annuelles (W2, 1099, impôts sur les sociétés) sans friction.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Suivi du calendrier fiscal et alertes d'échéances pour éviter les pénalités.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Moteur d'Acquisition */}
      <section id="baas-growth" className="py-20 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6">3. Moteur d'Acquisition & Autorité Locale</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Une entreprise sans clients n'est qu'un concept. Nous déployons un système de conversion pour générer des leads qualifiés dans votre zone.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Optimisation du référencement local (Google Business Profile, fiches d'autorité).</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Funnel de capture de leads automatisé avec notification instantanée.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Kit d'outils marketing et modèle de conversion client pour indépendants et cabinets.</span>
                </li>
              </ul>
            </div>
            <div className="glass-dark rounded-[3rem] p-8 border border-white/10 relative overflow-hidden h-full min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent"></div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Back-Office OS */}
      <section id="baas-runtime" className="py-20 relative bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 glass-dark rounded-[3rem] p-8 border border-white/10 relative overflow-hidden h-full min-h-[400px]">
               <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-rose-500 to-transparent"></div>
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/40 to-transparent"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Terminal className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6">4. Intégration Runtime & Ontologie Back-Office</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Propulsé par la puissance de notre système d'exploitation OMK. Vos opérations ne sont pas seulement suivies, elles sont mathématiquement orchestrées.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Synchronisation avec le Back-Office OMK Business OS (OMK-DESKTOP-WEB-OS).</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Structuration des entités de l'entreprise : Organization, Membership, Offering, SOPs.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" /> 
                  <span className="text-slate-300">Délégation des tâches récurrentes aux agents d'exécution pour libérer l'entrepreneur.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ADVANCED SIMULATOR (Règle des 5) - Dark OLED Style */}
      <section id="baas-regle-5" className="py-32 bg-slate-900 relative">
        <ShapeDivider position="top" type="waves-opacity" color="fill-slate-950" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">5. Simulateur de Rentabilité — "La Règle des 5"</h2>
            <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto">
              Chaque entreprise immatriculée sur votre recommandation génère une prime d'affiliation de <strong className="text-white">$150</strong>. Calculez votre point d'équilibre.
            </p>
          </div>

          <div className="glass-dark rounded-[2.5rem] p-10 md:p-14 shadow-2xl">
            <div className="mb-16">
              <div className="flex justify-between items-end mb-6">
                <label className="text-lg font-bold text-slate-300">Recommandations (Entreprises apportées)</label>
                <span className="text-5xl font-extrabold text-white bg-slate-800/80 px-6 py-3 rounded-[2rem] border border-slate-700">{referrals}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="25" 
                value={referrals} 
                onChange={(e) => setReferrals(parseInt(e.target.value))}
                className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500 shadow-inner"
              />
              <div className="flex justify-between mt-4 text-sm font-bold text-slate-500 tracking-wider uppercase">
                <span>0</span>
                <span className={referrals >= 5 ? 'text-blue-400' : ''}>La Règle des 5</span>
                <span>25 max</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-8 rounded-[3rem] border border-slate-700/50 text-center backdrop-blur-sm">
                <span className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Gains Cumulés</span>
                <span className="text-4xl font-extrabold text-white">${revenue}</span>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-[3rem] border border-slate-700/50 text-center backdrop-blur-sm">
                <span className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Coût Initial</span>
                <span className="text-4xl font-extrabold text-white">-$720</span>
              </div>
              <div className={`p-8 rounded-[3rem] border text-center transition-all duration-500 ${isProfitable ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' : 'bg-slate-800/50 border-slate-700/50'}`}>
                <span className={`block text-sm font-bold mb-3 uppercase tracking-wider ${isProfitable ? 'text-blue-400' : 'text-slate-400'}`}>
                  Solde Net
                </span>
                <span className={`text-5xl font-extrabold ${isProfitable ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'text-white'}`}>
                  {net >= 0 ? `+$${net}` : `-$${Math.abs(net)}`}
                </span>
                {isProfitable && (
                  <span className="block text-sm font-bold text-blue-400 mt-4 uppercase tracking-widest">
                    {referrals === 5 ? '100% Remboursé' : 'Bénéfice Net'}
                  </span>
                )}
              </div>
            </div>
            
            {/* Jauge de progression */}
            <div className="mt-12">
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${isProfitable ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min((referrals / 5) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

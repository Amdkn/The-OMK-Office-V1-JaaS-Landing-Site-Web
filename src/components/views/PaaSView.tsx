import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { ShieldCheck, Truck, Factory, Leaf, Sun } from "lucide-react"
import { ShapeDivider } from "../ui/ShapeDivider"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../i18n/translations"

export function PaaSView({ onOpenModal }: { onOpenModal: () => void }) {
  const [referrals, setReferrals] = useState(6)
  const cost = 1500
  const revenue = referrals * 250
  const net = revenue - cost
  const isProfitable = net >= 0
  
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col w-full bg-[#FAF8F5] min-h-screen">
      {/* HERO PaaS - Claymorphism Solarpunk */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Soft sun background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto clay p-6 sm:p-12 md:p-16 relative">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
              <Sun className="w-10 h-10" />
            </div>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 mb-8 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-emerald-700 tracking-wider uppercase text-center">{t.paas.badge[lang]}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.1] mb-8">
              {t.paas.title_1[lang]} <br className="hidden lg:block"/>
              <span className="text-emerald-600 drop-shadow-sm">
                {t.paas.title_2[lang]}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              {t.paas.subtitle[lang]}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={onOpenModal} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_8px_20px_rgba(5,150,105,0.4)] text-lg h-16 px-6 sm:px-12 rounded-[2rem] transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-inner font-bold">
                {t.paas.btn[lang]}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONS / PROJETS - Clay Cards */}
      <section id="paas-horizons" className="py-24 bg-white relative z-10">
        <ShapeDivider position="top" type="waves-opacity" color="fill-[#FAF8F5]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-6">Matrice des Projets par Horizon</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Une planification structurée pour des infrastructures à fort impact local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Court Terme */}
            <div className="clay-card p-10 flex flex-col hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 rounded-[1.5rem] bg-amber-100 text-amber-600 flex items-center justify-center mb-8 shadow-inner border-2 border-white">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Court Terme</h3>
              <p className="text-sm font-bold text-amber-500 mb-6 uppercase tracking-wider bg-amber-50 inline-block px-3 py-1 rounded-full w-fit">0 à 6 mois</p>
              <ul className="space-y-4 text-slate-600 text-base font-medium flex-1">
                <li className="flex items-start gap-3"><span className="text-amber-500 font-extrabold">•</span> Logistique du Dernier Kilomètre & Hubs Urbains</li>
                <li className="flex items-start gap-3"><span className="text-amber-500 font-extrabold">•</span> Audit d'Efficacité Énergétique</li>
                <li className="flex items-start gap-3"><span className="text-amber-500 font-extrabold">•</span> Micro-Unités de Valorisation des Déchets</li>
              </ul>
            </div>
            
            {/* Moyen Terme */}
            <div className="clay-card p-10 flex flex-col hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-100 text-blue-600 flex items-center justify-center mb-8 shadow-inner border-2 border-white">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Moyen Terme</h3>
              <p className="text-sm font-bold text-blue-500 mb-6 uppercase tracking-wider bg-blue-50 inline-block px-3 py-1 rounded-full w-fit">6 à 18 mois</p>
              <ul className="space-y-4 text-slate-600 text-base font-medium flex-1">
                <li className="flex items-start gap-3"><span className="text-blue-500 font-extrabold">•</span> Micro-Fermes d'Agriculture Urbaine</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-extrabold">•</span> Micro-Réseaux Énergétiques (Microgrids)</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-extrabold">•</span> Ateliers Low-Tech & Biomimétisme</li>
              </ul>
            </div>
            
            {/* Long Terme */}
            <div className="clay-card p-10 flex flex-col hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 shadow-inner border-2 border-white">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Long Terme</h3>
              <p className="text-sm font-bold text-emerald-500 mb-6 uppercase tracking-wider bg-emerald-50 inline-block px-3 py-1 rounded-full w-fit">18 mois et +</p>
              <ul className="space-y-4 text-slate-600 text-base font-medium flex-1">
                <li className="flex items-start gap-3"><span className="text-emerald-500 font-extrabold">•</span> Éco-Construction & Matériaux Biosourcés</li>
                <li className="flex items-start gap-3"><span className="text-emerald-500 font-extrabold">•</span> Consortiums Territoriaux Circulaires</li>
                <li className="flex items-start gap-3"><span className="text-emerald-500 font-extrabold">•</span> Infrastructures Résilientes de Quartier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED SIMULATOR (PaaS) - Claymorphism */}
      <section id="paas-simulateur-roi" className="py-24 relative z-10">
        <ShapeDivider position="top" type="wave" color="fill-white" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-6">{t.paas.simulator.title[lang]}</h2>
            <p className="text-xl text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: t.paas.simulator.desc[lang].replace('$250', '<strong className="text-emerald-600">$250</strong>') }}>
            </p>
          </div>

          <div className="clay-card p-10 md:p-14">
            <div className="mb-14">
              <div className="flex justify-between items-end mb-6">
                <label className="text-xl font-bold text-slate-700">{t.paas.simulator.referrals[lang]}</label>
                <span className="text-5xl font-extrabold text-emerald-600 bg-[#FAF8F5] px-6 py-3 rounded-[2rem] shadow-inner border border-white">{referrals}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="12" 
                value={referrals} 
                onChange={(e) => setReferrals(parseInt(e.target.value))}
                className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600 shadow-inner"
              />
              <div className="flex justify-between mt-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span>0</span>
                <span className={referrals >= 6 ? "text-emerald-500" : ""}>Seuil (6)</span>
                <span>12 max</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FAF8F5] p-8 rounded-[2rem] border-4 border-white shadow-[6px_6px_12px_#e3e1df,-6px_-6px_12px_#ffffff] text-center">
                <span className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Primes de Signature</span>
                <span className="text-4xl font-extrabold text-slate-800">${revenue}</span>
              </div>
              <div className="bg-[#FAF8F5] p-8 rounded-[2rem] border-4 border-white shadow-[6px_6px_12px_#e3e1df,-6px_-6px_12px_#ffffff] text-center">
                <span className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Coût PRO (PaaS)</span>
                <span className="text-4xl font-extrabold text-slate-800">-$1,500</span>
              </div>
              <div className={`p-8 rounded-[2rem] border-4 border-white text-center transition-all ${isProfitable ? 'bg-emerald-50 shadow-[inset_4px_4px_8px_#d1fae5,inset_-4px_-4px_8px_#ffffff]' : 'bg-[#FAF8F5] shadow-inner'}`}>
                <span className={`block text-sm font-bold mb-3 uppercase tracking-wider ${isProfitable ? 'text-emerald-700' : 'text-slate-500'}`}>
                  Trésorerie Nette
                </span>
                <span className={`text-5xl font-extrabold ${isProfitable ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {net >= 0 ? `+$${net}` : `-$${Math.abs(net)}`}
                </span>
                {isProfitable && (
                  <span className="block text-sm font-bold text-emerald-600 mt-4 uppercase tracking-widest animate-pulse">
                    Financement Acquis
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

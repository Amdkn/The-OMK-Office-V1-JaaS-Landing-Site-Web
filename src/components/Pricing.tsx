import { Button } from "@/src/components/ui/button"
import { Check, Info } from "lucide-react"

export function Pricing({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Grille Tarifaire Transparente
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choisissez le format d'engagement qui correspond à vos besoins immédiats ou annuels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Flash */}
          <div className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">Consultation Flash</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold text-slate-900">
              $30
              <span className="ml-2 text-lg font-medium text-slate-500">/ 30 min</span>
            </div>
            <p className="mt-4 text-slate-600">Diagnostic initial, audit rapide de CV ou orientation sur une démarche administrative.</p>
            
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Audit et diagnostic express</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">100% déductible si souscription au Pack Annuel le jour même.</span>
              </li>
            </ul>
            
            <Button onClick={onOpenModal} variant="outline" className="w-full mt-8 h-12 text-base">Réserver pour $30</Button>
          </div>

          {/* Annual JOB (Hero) */}
          <div className="bg-white rounded-[3rem] border-2 border-amber-400 p-8 shadow-xl relative flex flex-col transform lg:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="inline-flex items-center rounded-full bg-amber-400 px-4 py-1 text-sm font-bold text-amber-900 uppercase tracking-wide whitespace-nowrap">
                Formule Recommandée & Auto-Finançable
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">Pack Annuel JOB (JaaS)</h3>
            <div className="mt-4 flex items-baseline text-6xl font-extrabold text-slate-900">
              $300
              <span className="ml-2 text-lg font-medium text-slate-500">/ an</span>
            </div>
            <p className="mt-4 text-slate-600 font-medium">Paiement unique. L'accélération de carrière All-in-One.</p>
            
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-900 font-medium">Ingestion & gestion du Master Profile</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-900 font-medium">Multi-Dispatch candidatures illimité</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-900 font-medium">Traitement prioritaire au bureau</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-emerald-50 rounded-3xl mt-6 border border-emerald-200">
                <div className="flex-1">
                  <span className="block text-emerald-900 font-bold mb-1">Prime d'Affiliation : $50 / personne</span>
                  <span className="block text-emerald-700 text-sm leading-snug">Recommandez 6 personnes et votre pack est 100% remboursé.</span>
                </div>
              </li>
            </ul>
            
            <Button onClick={onOpenModal} className="w-full mt-8 h-14 text-lg bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20">
              Activer mon Pack Annuel
            </Button>
          </div>

          {/* Custom */}
          <div className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">Prestation Dédiée à l'Acte</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold text-slate-900">
              $75
              <span className="ml-2 text-lg font-medium text-slate-500">/ h</span>
            </div>
            <p className="mt-4 text-slate-600">Idéal pour les démarches administratives unitaires complexes.</p>
            
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-700">Dossier d'immigration complet</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-700">Déclaration fiscale (Tax Prep)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-700">Actes notariés & Légalisation</span>
              </li>
            </ul>
            
            <Button onClick={onOpenModal} variant="outline" className="w-full mt-8 h-12 text-base">Prendre RDV ($75/h)</Button>
          </div>

        </div>
      </div>
    </section>
  )
}

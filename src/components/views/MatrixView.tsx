import { MSG2MatrixExplorer } from "../matrix/MSG2MatrixExplorer"
import { TricephaleFlowSimulator } from "../jaas/TricephaleFlowSimulator"
import { Sparkles, Layers, ShieldCheck, Calculator, GraduationCap } from "lucide-react"

export function MatrixView({ onOpenModal }: { onOpenModal: (serviceId?: string) => void }) {
  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen font-sans">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/20 to-slate-50 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/70 px-5 py-2 mb-6 shadow-sm">
            <Layers className="w-4 h-4 text-blue-700 shrink-0" />
            <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-widest uppercase">
              Architecture Maîtresse · 75 Actes Opérationnels
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Matrice Magnificent SG <span className="text-blue-600">(MSG2)</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            L'industrialisation intégrale en <strong>3 Pôles Majeurs × 5 Sous-Cadres × 5 Actes</strong>. 
            Découvrez l’intégralité des 75 prestations réelles délivrées au bureau ou à distance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/80 p-5 rounded-2xl border border-blue-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Pôle 1 · Légal & Admin</h4>
                <p className="text-xs text-slate-500 font-medium">25 Actes (Immigration, Notariat, Traduction, État Civil)</p>
              </div>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Pôle 2 · Finance & Fisc</h4>
                <p className="text-xs text-slate-500 font-medium">25 Actes (Tax Prep, ITIN/EIN, Comptabilité, Microcrédits)</p>
              </div>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-amber-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Pôle 3 · JaaS & Carrière</h4>
                <p className="text-xs text-slate-500 font-medium">25 Actes (Master Profile, Dispatch, Formations, Soft Skills)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Matrix Explorer */}
      <section id="matrix-explorer" className="pb-20 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MSG2MatrixExplorer onOpenBooking={onOpenModal} />
        </div>
      </section>

      {/* Tricéphale Flow Simulator */}
      <section className="py-20 bg-slate-950 text-white relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TricephaleFlowSimulator />
        </div>
      </section>

    </div>
  )
}

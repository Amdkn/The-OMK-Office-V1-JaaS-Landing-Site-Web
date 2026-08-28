import { Button } from "@/src/components/ui/button"
import { Search, Zap, CheckCircle2, ArrowRight } from "lucide-react"

export function BlogPoCView({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex flex-col w-full min-h-screen pb-24 bg-slate-50 font-sans relative overflow-hidden">
      {/* Background Blobs for Visual Interest */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply animate-blob pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-amber-200/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* HERO BLOG - Glassmorphism Style */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-2xl sm:rounded-full px-5 py-2 mb-10 shadow-sm border border-white">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></div>
            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-widest uppercase text-center">Étude de Cas / Ingénierie System</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.1] mb-8 drop-shadow-sm">
            Comment l'Architecture 1-Click a Résolu un Recrutement <br className="hidden lg:block"/>
            <span className="text-blue-600">Non Répertorié</span>
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 font-bold tracking-wide uppercase">
            <span className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">OS</div> OMK Office Eng</span>
            <span className="text-slate-300">•</span>
            <span className="bg-white/50 px-3 py-1 rounded-full">Temps de lecture : 4 min</span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 space-y-20 relative z-10">
        
        {/* LE PROBLÈME - Clay Card */}
        <section id="poc-probleme" className="clay-card rounded-[3rem] p-10 md:p-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-[2rem] bg-red-50 text-red-500 flex items-center justify-center shadow-inner border border-red-100">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">Le Problème : L'Angle Mort</h2>
          </div>
          <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
            L'approche traditionnelle du recrutement repose sur des bases de données déclaratives (job boards). Le problème de cette méthode est qu'elle ignore l'immense marché "caché" : les entreprises qui ont un besoin réel mais qui n'ont pas encore formalisé ou publié d'offre en ligne.
          </p>
          <div className="p-8 bg-white/60 backdrop-blur-md border border-white rounded-[2rem] shadow-sm">
            <p className="text-slate-700 font-semibold italic text-lg leading-relaxed">
              "Notre client recherchait un poste de responsable logistique dans la zone d'Elsmere, KY. Aucun poste n'était publié sur les plateformes classiques, mais le besoin sur le terrain était criant. La bureaucratie ralentissait tout."
            </p>
          </div>
        </section>

        {/* LA RÉSOLUTION - Liquid Style Layout */}
        <section id="poc-resolution">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-[2rem] bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner border border-blue-100">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">La Résolution : Dispatch 1-Click</h2>
          </div>
          <p className="text-xl text-slate-600 leading-relaxed mb-12 font-medium">
            Pour contourner cette limite, nous avons utilisé l'infrastructure JaaS (Job as a Service) de The OMK Office. L'opération s'est déroulée en deux temps, entièrement automatisés et sans intervention manuelle.
          </p>
          
          <div className="space-y-6">
            <div className="glass rounded-[2rem] p-8 border border-white flex gap-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
              <div className="w-12 h-12 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg">1</div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-xl mb-2">Ingestion du Master Profile</h4>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">Le profil du candidat (compétences, certifications, historique) a été ingéré dans notre Master Database, standardisant ses données pour être lisibles par des systèmes d'IA.</p>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-8 border border-white flex gap-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="w-12 h-12 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg relative z-10">2</div>
              <div className="relative z-10">
                <h4 className="font-extrabold text-slate-800 text-xl mb-2">Analyse Cadastrale (Geo-Skip Tracing)</h4>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">Le système a scanné la zone cible via l'API Google Maps et les données locales pour identifier tous les entrepôts de plus de 50 000 sq ft, indépendamment des offres actives.</p>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-8 border border-white flex gap-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
              <div className="w-12 h-12 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg">3</div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-xl mb-2">Dispatch Instantané & Asynchrone</h4>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">Le Master Profile a été formaté et expédié aux décideurs (RH, Opérations) de 38 entrepôts identifiés en une seule passe d'exécution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* RÉSULTATS - Neo Brutalism Stats */}
        <section id="poc-resultats" className="pt-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-[2rem] bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">Résultats Méthodologiques</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-center shadow-[0_20px_40px_rgba(15,23,42,0.2)] border border-slate-800 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="block text-5xl font-black text-emerald-400 mb-3 relative z-10">{'<'} 3m</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest relative z-10">Latence Dispatch</span>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-[2rem] text-center shadow-[0_20px_40px_rgba(15,23,42,0.2)] border border-slate-800 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="block text-5xl font-black text-blue-400 mb-3 relative z-10">38</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest relative z-10">Entrepôts Touchés</span>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-[2rem] text-center shadow-[0_20px_40px_rgba(15,23,42,0.2)] border border-slate-800 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="block text-5xl font-black text-amber-400 mb-3 relative z-10">1</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest relative z-10">Entretien (24h)</span>
            </div>
          </div>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-12 font-medium">
            En déplaçant l'effort de la recherche passive (formulaires) vers la proposition proactive de valeur, The OMK Office prouve que l'ingénierie et l'automatisation remplacent avantageusement la bureaucratie du recrutement.
          </p>
          
          <div className="clay-card rounded-[3rem] p-12 text-center bg-gradient-to-b from-blue-50 to-white border border-white">
            <h3 className="text-3xl font-black text-slate-800 mb-4">L'Infrastructure travaille pour vous.</h3>
            <p className="text-lg text-slate-600 mb-8 font-medium max-w-xl mx-auto">Rejoignez le programme JaaS et activez la distribution instantanée de votre profil.</p>
            <Button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 px-10 text-lg rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-transform w-full sm:w-auto">
              Découvrir le Pack JOB (JaaS)
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

      </article>
    </div>
  )
}

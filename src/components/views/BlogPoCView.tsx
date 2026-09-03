import React, { useState, useMemo } from "react"
import { Button } from "@/src/components/ui/button"
import { 
  Search, BookOpen, Scale, Zap, Calculator, Sparkles, 
  Layers, PlusCircle, Filter, ArrowRight, ShieldCheck, CheckCircle2
} from "lucide-react"
import { PageView, CaseStudyPole } from "../../types"
import { CASE_STUDIES_DATA, getFeaturedCaseStudy } from "../../data/caseStudiesData"
import { CaseStudyCard } from "./blog/CaseStudyCard"
import { CaseStudyDetail } from "./blog/CaseStudyDetail"
import { CaseStudyGuideModal } from "./blog/CaseStudyGuideModal"

interface BlogPoCViewProps {
  onOpenModal: (serviceId?: string) => void;
  setCurrentPage?: (page: PageView) => void;
}

export function BlogPoCView({ onOpenModal, setCurrentPage }: BlogPoCViewProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>("uscis-noid-45min")
  const [selectedPole, setSelectedPole] = useState<'ALL' | 1 | 2 | 3>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false)

  // Filtered case studies based on pole and search query
  const filteredStudies = useMemo(() => {
    return CASE_STUDIES_DATA.filter(study => {
      const matchesPole = selectedPole === 'ALL' || study.pole === selectedPole
      const matchesQuery = searchQuery.trim() === "" || 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.leadParagraph.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.clientReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.categoryTag.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesPole && matchesQuery
    })
  }, [selectedPole, searchQuery])

  // Current active study for detailed view
  const activeStudy = useMemo(() => {
    if (!selectedCaseId) return null
    return CASE_STUDIES_DATA.find(s => s.id === selectedCaseId) || CASE_STUDIES_DATA[0]
  }, [selectedCaseId])

  const featuredStudy = useMemo(() => getFeaturedCaseStudy(), [])

  return (
    <div className="flex flex-col w-full min-h-screen pb-24 bg-slate-50 font-sans relative overflow-hidden">
      {/* Subtle Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-amber-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
      <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />

      {/* ==================================================================== */}
      {/* TOP HEADER / SEARCH & FILTER BAR                                     */}
      {/* ==================================================================== */}
      <div className="relative pt-28 sm:pt-32 z-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-8">
        
        {/* Title & Hub Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold font-mono uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Ingénierie & Retours d'Expérience Réels
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Études de Cas & Actes Déterministes
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Consultez les récits d'exécution de The OMK Office sur les 3 Pôles : résolutions légales d'urgence, création d'entreprises optimisées et dispatch proactif 1-Click.
            </p>
          </div>

          {/* Action button to open schema guide for adding new case studies */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              onClick={() => setIsGuideOpen(true)}
              className="border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              Gabarit Nouvelle Étude de Cas
            </Button>
            {selectedCaseId && (
              <Button
                variant="ghost"
                onClick={() => setSelectedCaseId(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              >
                Vue Catalogue ({CASE_STUDIES_DATA.length})
              </Button>
            )}
          </div>
        </div>

        {/* Search & Pole Filter Pills */}
        <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
            <button
              onClick={() => setSelectedPole('ALL')}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                selectedPole === 'ALL'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Tous ({CASE_STUDIES_DATA.length})
            </button>
            <button
              onClick={() => setSelectedPole(1)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedPole === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Pôle 1 · Légal
            </button>
            <button
              onClick={() => setSelectedPole(2)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedPole === 2
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Pôle 2 · Finance
            </button>
            <button
              onClick={() => setSelectedPole(3)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedPole === 3
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Pôle 3 · Carrière
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé, réf..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MAIN VIEW CONTENT : DETAIL READER vs CATALOG OVERVIEW                */}
      {/* ==================================================================== */}
      {selectedCaseId && activeStudy ? (
        <CaseStudyDetail
          study={activeStudy}
          allStudies={CASE_STUDIES_DATA}
          onBack={() => setSelectedCaseId(null)}
          onSelectStudy={(id) => setSelectedCaseId(id)}
          onOpenModal={onOpenModal}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        /* CATALOG OVERVIEW (GRID OF ALL CASE STUDIES) */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Featured Hero Box if no search query */}
          {searchQuery === "" && selectedPole === 'ALL' && featuredStudy && (
            <div className="mb-10 rounded-3xl bg-slate-900 text-white border border-slate-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    ÉTUDE À LA UNE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {featuredStudy.poleLabel}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 leading-tight">
                  {featuredStudy.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {featuredStudy.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80">
                  <Button
                    onClick={() => setSelectedCaseId(featuredStudy.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
                  >
                    Lire l'Étude d'Exécution
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-500">Temps</span>
                      <span className="font-bold text-emerald-400">{featuredStudy.highlightMetric.value}</span>
                    </div>
                    <div className="border-l border-slate-800 pl-4">
                      <span className="block text-[10px] uppercase text-slate-500">Protocole</span>
                      <span className="font-bold text-slate-200">{featuredStudy.protocol}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 font-mono">
              {filteredStudies.length} {filteredStudies.length > 1 ? "Études d'Exécution Disponibles" : "Étude d'Exécution Disponible"}
            </h3>
          </div>

          {filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  onSelect={(id) => setSelectedCaseId(id)}
                  isSelected={study.id === selectedCaseId}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-900 mb-1">Aucune étude ne correspond</h4>
              <p className="text-xs text-slate-500 mb-4">
                Essayez d'autres mots-clés ou réinitialisez le filtre par pôle.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedPole('ALL')
                  setSearchQuery("")
                }}
                className="text-xs font-bold"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {/* Bottom Extensibility Callout */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-blue-600 font-mono block mb-1">
                ARCHITECTURE DATA-DRIVEN
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1">
                Structure prête pour l'ajout continu de nouvelles études de cas
              </h4>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                Toutes les études de cas sont alimentées par une base de données typée (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">src/data/caseStudiesData.ts</code>). Les nouveaux cas d'ingénierie légale, comptable ou de carrière s'intègrent automatiquement dans les filtres, le moteur de recherche et les inspecteurs interactifs.
              </p>
            </div>

            <Button
              onClick={() => setIsGuideOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0"
            >
              Consulter le Guide d'Ajout
            </Button>
          </div>
        </div>
      )}

      {/* Guide Modal for Adding New Case Studies */}
      <CaseStudyGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  )
}

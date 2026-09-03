import React, { useState } from "react"
import { CaseStudy, PageView } from "../../../types"
import { Button } from "@/src/components/ui/button"
import { 
  ArrowLeft, Clock, ShieldCheck, Scale, Zap, Calculator, CheckCircle2, 
  AlertTriangle, Layers, FileText, ChevronRight, Hash, ArrowRight, 
  Check, ExternalLink, Download, FileCheck, Stamp
} from "lucide-react"

interface CaseStudyDetailProps {
  study: CaseStudy;
  allStudies: CaseStudy[];
  onBack: () => void;
  onSelectStudy: (id: string) => void;
  onOpenModal: (serviceId?: string) => void;
  setCurrentPage?: (page: PageView) => void;
}

export function CaseStudyDetail({
  study,
  allStudies,
  onBack,
  onSelectStudy,
  onOpenModal,
  setCurrentPage
}: CaseStudyDetailProps) {
  // Tab state for interactive inspector
  const defaultTabId = study.resolution.interactiveInspector?.tabs[0]?.id || "tab-0"
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId)

  const activeTab = study.resolution.interactiveInspector?.tabs.find(t => t.id === activeTabId) 
    || study.resolution.interactiveInspector?.tabs[0]

  // Find next and prev study
  const currentIndex = allStudies.findIndex(s => s.id === study.id)
  const prevStudy = currentIndex > 0 ? allStudies[currentIndex - 1] : null
  const nextStudy = currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : null

  const getPoleIcon = (pole: number | string) => {
    switch (pole) {
      case 1:
        return <Scale className="w-4 h-4 text-blue-400" />
      case 2:
        return <Calculator className="w-4 h-4 text-emerald-400" />
      case 3:
        return <Zap className="w-4 h-4 text-amber-400" />
      default:
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />
    }
  }

  return (
    <div className="w-full">
      {/* TOP NAVIGATION & CONTROLS */}
      <div className="sticky top-20 z-30 bg-slate-900/90 backdrop-blur-md border-y border-white/10 px-4 sm:px-8 py-3 mb-8 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux Études de Cas
          </button>

          {/* Quick jump navigation anchors matching Header.tsx */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <a 
              href="#poc-probleme" 
              className="text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              1. The Problem
            </a>
            <span className="text-slate-600">/</span>
            <a 
              href="#poc-resolution" 
              className="text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              2. The Resolution
            </a>
            <span className="text-slate-600">/</span>
            <a 
              href="#poc-resultats" 
              className="text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              3. The Results
            </a>
          </div>

          {/* Study Switcher dropdown/pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase hidden md:inline">Étude :</span>
            {allStudies.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  onSelectStudy(s.id)
                  setActiveTabId(s.resolution.interactiveInspector?.tabs[0]?.id || "tab-0")
                }}
                className={`text-xs px-2.5 py-1 rounded-md font-mono font-bold transition-all ${
                  s.id === study.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                }`}
                title={s.title}
              >
                #{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================================================================== */}
        {/* ARTICLE HEADER                                                       */}
        {/* ==================================================================== */}
        <header className="mb-14">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl px-4 py-2 mb-6 bg-slate-900 text-white shadow-md border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-xs font-black tracking-widest uppercase text-emerald-400 font-mono flex items-center gap-1.5">
              {getPoleIcon(study.pole)}
              {study.categoryTag}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-semibold">{study.readTime}</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">{study.protocol}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            {study.title}
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-600 font-mono mb-6 leading-relaxed">
            {study.subtitle}
          </p>

          {/* Lead Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-8 relative">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-600 rounded-l-2xl" />
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {study.leadParagraph}
            </p>
          </div>

          {/* Author & Reference Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {study.author.initials}
              </div>
              <div>
                <span className="font-bold text-slate-800 block">{study.author.name}</span>
                <span className="text-slate-500">{study.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Référence Dossier</span>
                <span className="font-bold text-slate-700">{study.clientReference}</span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="text-slate-400 block text-[10px] uppercase">Latence</span>
                <span className="font-black text-blue-600">{study.highlightMetric.value}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* BLOC 1 : THE PROBLEM                                                */}
        {/* ==================================================================== */}
        <section id="poc-probleme" className="scroll-mt-36 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center font-black font-mono text-sm border border-rose-500/20">
              01
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {study.problem.title}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {study.problem.summary}
            </p>

            {study.problem.quote && (
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500 text-slate-700 italic text-sm">
                "{study.problem.quote}"
              </div>
            )}

            {/* Breakdown Items */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs uppercase font-black tracking-widest text-slate-500 font-mono">
                {study.problem.breakdownTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.problem.breakdownItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Comparison Warning Box */}
            {study.problem.traditionalFirmComparison && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block mb-1">
                    {study.problem.traditionalFirmComparison.title}
                  </span>
                  {study.problem.traditionalFirmComparison.desc}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* BLOC 2 : THE RESOLUTION                                             */}
        {/* ==================================================================== */}
        <section id="poc-resolution" className="scroll-mt-36 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-black font-mono text-sm border border-blue-500/20">
              02
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {study.resolution.title}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {study.resolution.summary}
            </p>

            {/* Resolution Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.resolution.steps.map((step) => (
                <div 
                  key={step.number} 
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center">
                        {step.number}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {step.tag}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2 leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Inspector */}
            {study.resolution.interactiveInspector && activeTab && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-slate-900 text-emerald-400 px-2 py-0.5 rounded">
                        {study.resolution.interactiveInspector.badge}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {study.resolution.interactiveInspector.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {study.resolution.interactiveInspector.subtitle}
                    </p>
                  </div>

                  {/* Tabs selector */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                    {study.resolution.interactiveInspector.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                          activeTabId === tab.id
                            ? "bg-white text-slate-900 font-bold shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Split-View Display Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-xl bg-slate-900 p-4 sm:p-6 text-slate-100 border border-slate-800 shadow-inner">
                  {/* Left Column: Original / Source */}
                  <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          {activeTab.originalTitle}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{activeTab.originalMeta}</span>
                      </div>
                      <p className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {activeTab.originalContent}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Statut Ingestion</span>
                      <span className="text-amber-400 font-bold">{activeTab.originalStatus}</span>
                    </div>
                  </div>

                  {/* Right Column: Resolved / Certified Conforme */}
                  <div className="rounded-lg bg-blue-950/40 border border-blue-900/60 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-3">
                        <span className="text-[10px] font-mono font-bold text-blue-300 uppercase flex items-center gap-1.5">
                          <Stamp className="w-3.5 h-3.5 text-blue-400" />
                          {activeTab.resolvedTitle}
                        </span>
                        <span className="text-[10px] font-mono text-blue-400/80">{activeTab.resolvedMeta}</span>
                      </div>
                      <p className="text-xs font-mono text-blue-100 leading-relaxed whitespace-pre-wrap">
                        {activeTab.resolvedContent}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-blue-900/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Résolution OMK</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" />
                        {activeTab.resolvedStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Raw JSON Manifest inspector dropdown */}
                {activeTab.rawJson && (
                  <details className="mt-3 text-xs bg-slate-950 rounded-lg border border-slate-800 text-slate-300 overflow-hidden group">
                    <summary className="cursor-pointer p-3 font-mono text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Hash className="w-3.5 h-3.5 text-blue-400" />
                        Voir l'empreinte JSON / Définition déterministe ({activeTab.id})
                      </span>
                      <span className="text-[10px] text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <pre className="p-4 font-mono text-[11px] text-emerald-400 bg-black/50 border-t border-slate-800 overflow-x-auto">
                      {JSON.stringify(activeTab.rawJson, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* BLOC 3 : THE RESULTS                                                */}
        {/* ==================================================================== */}
        <section id="poc-resultats" className="scroll-mt-36 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black font-mono text-sm border border-emerald-500/20">
              03
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {study.results.title}
            </h2>
          </div>

          <div className="space-y-6">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.results.metrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className={`text-3xl font-black font-mono mb-2 ${
                    metric.accentColor === 'emerald' ? 'text-emerald-600' :
                    metric.accentColor === 'blue' ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Results Summary Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {study.results.summary}
              </p>
            </div>

            {/* Comparative Execution Table */}
            {study.results.comparativeTable && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-900">
                    {study.results.comparativeTable.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    {study.results.comparativeTable.caseRef}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/60 font-mono text-slate-600">
                        <th className="p-4 font-bold">{study.results.comparativeTable.columns[0]}</th>
                        <th className="p-4 font-bold text-rose-700 bg-rose-50/50">
                          {study.results.comparativeTable.columns[1]}
                        </th>
                        <th className="p-4 font-bold text-emerald-800 bg-emerald-50/50">
                          {study.results.comparativeTable.columns[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {study.results.comparativeTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-bold text-slate-800 font-mono">{row.criterion}</td>
                          <td className="p-4 text-slate-600 bg-rose-50/20">{row.traditional}</td>
                          <td className="p-4 font-semibold text-emerald-900 bg-emerald-50/30 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            {row.omk}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Action CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-black mb-2">
                    {study.results.cta.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    {study.results.cta.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <Button
                    onClick={() => {
                      if (study.results.cta.targetServiceId) {
                        onOpenModal(study.results.cta.targetServiceId)
                      } else {
                        onOpenModal()
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30"
                  >
                    {study.results.cta.primaryButtonText}
                  </Button>

                  {study.results.cta.secondaryButtonText && study.results.cta.targetPage && setCurrentPage && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(study.results.cta.targetPage!)}
                      className="border-white/20 text-white hover:bg-white/10 text-xs px-4 py-3 rounded-xl"
                    >
                      {study.results.cta.secondaryButtonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* FOOTER: PREV / NEXT STUDY NAVIGATION                                 */}
        {/* ==================================================================== */}
        <footer className="border-t border-slate-200 pt-8 pb-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevStudy ? (
            <button
              onClick={() => onSelectStudy(prevStudy.id)}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-left transition-all group flex-1"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono mb-1">
                ← Étude Précédente
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                {prevStudy.title}
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {nextStudy ? (
            <button
              onClick={() => onSelectStudy(nextStudy.id)}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-right transition-all group flex-1"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono mb-1">
                Étude Suivante →
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                {nextStudy.title}
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </footer>
      </div>
    </div>
  )
}

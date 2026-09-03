import React from "react"
import { CaseStudy } from "../../../types"
import { Scale, Zap, Calculator, Clock, ArrowRight, ShieldCheck, CheckCircle2, User } from "lucide-react"

interface CaseStudyCardProps {
  key?: React.Key;
  study: CaseStudy;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

export function CaseStudyCard({ study, onSelect, isSelected }: CaseStudyCardProps) {
  const getPoleIcon = () => {
    switch (study.pole) {
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

  const getPoleBadgeClasses = () => {
    switch (study.pole) {
      case 1:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case 2:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      case 3:
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
    }
  }

  const getAccentGradient = () => {
    switch (study.pole) {
      case 1:
        return "from-blue-600/20 to-indigo-600/10 hover:border-blue-500/40"
      case 2:
        return "from-emerald-600/20 to-teal-600/10 hover:border-emerald-500/40"
      case 3:
        return "from-amber-600/20 to-orange-600/10 hover:border-amber-500/40"
      default:
        return "from-indigo-600/20 to-blue-600/10 hover:border-indigo-500/40"
    }
  }

  return (
    <div 
      onClick={() => onSelect(study.id)}
      className={`group cursor-pointer rounded-2xl bg-white border transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-xl ${
        isSelected 
          ? "border-blue-600 ring-2 ring-blue-500/20 shadow-blue-500/10" 
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Top subtle gradient highlight */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getAccentGradient()}`} />

      <div>
        {/* Top Badges & Meta */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPoleBadgeClasses()}`}>
              {getPoleIcon()}
              {study.categoryTag}
            </span>
            {study.isFeatured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-700 font-mono">
                À LA UNE
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-slate-400" />
            {study.readTime}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
          {study.title}
        </h3>

        <p className="text-xs font-medium text-slate-500 mb-3 font-mono line-clamp-1">
          {study.subtitle}
        </p>

        {/* Short Problem Summary */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
          {study.leadParagraph}
        </p>
      </div>

      {/* Footer Details: Metric + Protocol + CTA */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black font-mono">
              {study.author.initials}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {study.author.name}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight font-mono">
                {study.protocol}
              </div>
            </div>
          </div>

          {/* Highlight Key Metric Badge */}
          <div className="text-right">
            <span className="text-base font-black font-mono text-slate-900 block leading-tight">
              {study.highlightMetric.value}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              {study.highlightMetric.label}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1.5">
            Lire l'Étude d'Exécution
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Réf: {study.clientReference.split('(')[0]}
          </span>
        </div>
      </div>
    </div>
  )
}

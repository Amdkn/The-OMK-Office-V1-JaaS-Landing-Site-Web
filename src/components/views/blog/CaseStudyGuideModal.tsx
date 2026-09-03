import { useState } from "react"
import { X, Copy, Check, Code, Sparkles, BookOpen } from "lucide-react"
import { Button } from "@/src/components/ui/button"

interface CaseStudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyGuideModal({ isOpen, onClose }: CaseStudyGuideModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const sampleTemplate = `// Ajouter dans src/data/caseStudiesData.ts
{
  id: "nouvelle-etude-titre",
  pole: 1, // 1: Légal, 2: Finance, 3: Carrière
  poleLabel: "Pôle 1 · Légal & Administration",
  categoryTag: "LÉGAL & IMMIGRATION",
  title: "Titre de votre Étude de Cas",
  subtitle: "Sous-titre descriptif ou protocole",
  leadParagraph: "Résumé exécutif du cas d'ingénierie et de l'impact...",
  clientReference: "Dossier Exécutif XYZ",
  protocol: "Pipeline SOP-XX-001",
  readTime: "5 min",
  date: "Octobre 2026",
  isFeatured: false,
  author: {
    name: "OMK Engineering",
    role: "Legal & Ops",
    initials: "OE"
  },
  highlightMetric: {
    value: "45 MIN",
    label: "Temps d'exécution"
  },
  problem: {
    title: "The Problem : Le Mur de la Force Brute",
    summary: "Description détaillée du blocage...",
    breakdownTitle: "3 Points de Rupture Majeurs :",
    breakdownItems: [
      { title: "Point 1", desc: "Détail..." }
    ],
    traditionalFirmComparison: {
      title: "Le Piège du Modèle Classique",
      desc: "Délais et surcoûts des cabinets..."
    }
  },
  resolution: {
    title: "The Resolution : Le Pipeline Déterministe",
    summary: "Méthodologie séquentielle...",
    steps: [
      { number: 1, title: "Étape 1", tag: "Tag 1", description: "Détails étape 1" }
    ]
  },
  results: {
    title: "The Results : Impact Chiffré",
    summary: "Bilan chiffré des résultats...",
    metrics: [
      { value: "45 MIN", label: "Temps", description: "Description...", accentColor: "emerald" }
    ],
    cta: {
      title: "Prêt à résoudre ce problème ?",
      description: "Activez notre protocole...",
      primaryButtonText: "Consulter le Pôle",
      targetServiceId: "1.1-1",
      targetPage: "pole-1-legal"
    }
  }
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                Structure & Modèle pour Nouvelles Études de Cas
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Architecture standardisée déterministe (Pôles 1, 2, 3)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
          <p className="text-slate-300">
            Le Blog est entièrement piloté par les données (<strong>Data-Driven Architecture</strong>). 
            Chaque nouvelle étude de cas s'insère directement dans le fichier <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono">src/data/caseStudiesData.ts</code> sans avoir à écrire de code JSX ou modifier le simulateur Mobile OS.
          </p>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 relative font-mono text-[11px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span>TypeScript Interface : CaseStudy</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copié !" : "Copier le Gabarit"}
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 max-h-72 font-mono">
              {sampleTemplate}
            </pre>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-200">
            <span className="font-bold block mb-1">Règle des 3 Pôles :</span>
            Indiquez simplement <code className="bg-blue-900/60 px-1 rounded">pole: 1</code> (Légal & Notariat), <code className="bg-blue-900/60 px-1 rounded">pole: 2</code> (Finance & Fiscalité), ou <code className="bg-blue-900/60 px-1 rounded">pole: 3</code> (Carrière & JaaS) pour que le filtrage automatique, les badges et les passerelles d'action s'alignent instantanément.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3">
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            Fermer le Guide
          </Button>
        </div>
      </div>
    </div>
  )
}

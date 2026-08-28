import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Briefcase, Calculator, ArrowRight, CheckCircle2, 
  Sparkles, Zap, ChevronRight, RefreshCw, UserCheck, Award, 
  Truck, FileCheck, Building, DollarSign, TrendingUp
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function TricephaleFlowSimulator() {
  const { lang } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const personas = [
    {
      id: 'logistics',
      name: 'Mamadou D.',
      status: 'Nouvel arrivant (Permis EAD actif)',
      targetRole: 'Conducteur Chariot / Forklift CVG',
      hourlyRate: '$24.50/h',
      annualSalary: '$50,960/an'
    },
    {
      id: 'medical',
      name: 'Amina K.',
      status: 'Titulaire Bachelor étranger (Traduction requise)',
      targetRole: 'Coordinatrice Logistique & Contrôle WMS',
      hourlyRate: '$27.00/h',
      annualSalary: '$56,160/an'
    },
    {
      id: 'contractor',
      name: 'Carlos M.',
      status: 'Opérateur expérimenté (Transition vers superviseur)',
      targetRole: 'Lead Shift Manager DHL Hebron',
      hourlyRate: '$29.00/h',
      annualSalary: '$60,320/an'
    }
  ];

  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  const steps = [
    {
      step: 1,
      titleFr: 'Étape 1 : Pôle 1 (Légal) · Déverrouillage Administratif',
      titleEn: 'Step 1: Pole 1 (Legal) · Administrative Unlock',
      poleCode: 1,
      poleName: 'Pôle 1 : Légal & Conformité',
      accentColor: 'blue',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      acts: [
        { code: '1.1-1', title: 'Audit Immédiat EAD / Permis de Travail', desc: 'Vérification de la validité de l’autorisation I-9 pour embauche instantanée.' },
        { code: '1.3-1', title: 'Notarisation Officielle Notary Public', desc: 'Sceau notarié apposé sur les déclarations et attestations de domicile.' },
        { code: '1.5-1', title: 'Traduction Assermentée ATA / USCIS', desc: 'Conformité linguistique des diplômes et permis de conduire étrangers.' }
      ],
      resultFr: 'Dossier 100% conforme et certifié sans risque pour l’employeur.',
      resultEn: '100% compliant, risk-free certified credential file for the hiring company.'
    },
    {
      step: 2,
      titleFr: 'Étape 2 : Pôle 3 (JaaS) · Passeport, Compétences & Multi-Dispatch',
      titleEn: 'Step 2: Pole 3 (JaaS) · Passport, Skills & Multi-Dispatch',
      poleCode: 3,
      poleName: 'Pôle 3 : Carrière & JaaS 1.0 (Cœur)',
      accentColor: 'amber',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      acts: [
        { code: '3.2-1', title: 'Ingestion Master Profile 1-Click', desc: 'Génération de l’empreinte candidat ATS chiffrée avec QR Code recruteur.' },
        { code: '3.1-1', title: 'Validation Cariste / Forklift OSHA', desc: 'Acquisition du badge cariste opérant sur les entrepôts Amazon CVG & DHL.' },
        { code: '3.2-4', title: 'Multi-Dispatch SLA 48h aux Recruteurs', desc: 'Routage direct auprès des managers de recrutement régionaux.' }
      ],
      resultFr: 'Offre d’embauche signée sous 7 à 14 jours ($24.50/h+).',
      resultEn: 'Signed job offer secured in 7 to 14 days ($24.50/hr+).'
    },
    {
      step: 3,
      titleFr: 'Étape 3 : Pôle 2 (Finance) · Stabilisation & Souveraineté',
      titleEn: 'Step 3: Pole 2 (Finance) · Stabilization & Sovereignty',
      poleCode: 2,
      poleName: 'Pôle 2 : Finance & Fiscalité',
      accentColor: 'emerald',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      acts: [
        { code: '2.1-1', title: 'Déclaration Fiscale 1040 W-2 & Crédits', desc: 'Optimisation du remboursement d’impôt annuel avec dépôt direct IRS.' },
        { code: '2.2-2', title: 'Construction Credit Score FICO 700+', desc: 'Déblocage des financements auto éthiques et accès au logement sans garant.' },
        { code: '3.5-5', title: 'Programme d’Affiliation ($50/Filleul)', desc: 'Recommandation de 6 membres = $300 remboursés (JaaS 100% gratuit).' }
      ],
      resultFr: 'Stabilité patrimoniale durable et intégration totale dans le tissu US.',
      resultEn: 'Long-term financial stability and full integration into the US economic fabric.'
    }
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
    
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setIsSimulating(false);
        }, 800);
      }, 1400);
    }, 1400);
  };

  return (
    <div className="bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500 text-slate-950 rounded-full">
              Architecture Tri-Polaire
            </span>
            <span className="text-xs font-bold text-slate-400">
              Le Tricéphale Métier JaaS 1.0
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {lang === 'fr' 
              ? 'Comment le JaaS 1.0 Orchestre les 3 Pôles en Temps Réel'
              : 'How JaaS 1.0 Orchestrates all 3 Poles in Real-Time'}
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'L’adhésion JaaS à $300/an n’est pas un simple service de CV : c’est une passerelle qui active le pôle légal en amont et le pôle fiscal/bancaire en aval.'
              : 'The $300/yr JaaS membership is not just a resume service: it is a tri-polar gateway triggering legal upstream and finance downstream.'}
          </p>
        </div>

        {/* Persona Switcher & Run Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={selectedPersona.id}
            onChange={(e) => {
              const p = personas.find(item => item.id === e.target.value);
              if (p) setSelectedPersona(p);
            }}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs sm:text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {personas.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.targetRole})
              </option>
            ))}
          </select>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulation...' : 'Lancer la Simulation Tri-Polaire'}</span>
          </button>
        </div>
      </div>

      {/* Selected Persona Strip */}
      <div className="relative z-10 my-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base border border-amber-500/30">
            {selectedPersona.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">{selectedPersona.name}</div>
            <div className="text-xs text-slate-400">{selectedPersona.status}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400">Poste Ciblé</span>
            <span className="text-xs font-bold text-amber-300">{selectedPersona.targetRole}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400">Salaire Négocié</span>
            <span className="text-xs font-extrabold text-emerald-400">{selectedPersona.hourlyRate} ({selectedPersona.annualSalary})</span>
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {steps.map((s) => {
          const isActive = activeStep === s.step;
          const isDone = activeStep > s.step;

          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`text-left p-5 rounded-3xl border transition-all duration-300 ${
                isActive
                  ? 'bg-slate-800 border-amber-400 shadow-xl ring-1 ring-amber-400/50'
                  : isDone
                  ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  s.poleCode === 1 ? 'bg-blue-900/50 text-blue-300 border-blue-700' :
                  s.poleCode === 3 ? 'bg-amber-900/50 text-amber-300 border-amber-700' :
                  'bg-emerald-900/50 text-emerald-300 border-emerald-700'
                }`}>
                  {s.poleName}
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-xs font-black text-slate-400 font-mono">0{s.step}</span>
                )}
              </div>

              <h4 className="text-sm font-extrabold text-white mb-1">
                {lang === 'fr' ? s.titleFr : s.titleEn}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      <AnimatePresence mode="wait">
        {steps.map((s) => {
          if (s.step !== activeStep) return null;

          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700/80">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Activation des Actes MSG2
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {lang === 'fr' ? s.titleFr : s.titleEn}
                  </h4>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700/80 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Bénéfice Candidat Immédiat</div>
                    <div className="text-xs font-extrabold text-emerald-400">
                      {lang === 'fr' ? s.resultFr : s.resultEn}
                    </div>
                  </div>
                </div>
              </div>

              {/* Acts In Step Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {s.acts.map((act) => (
                  <div
                    key={act.code}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-black px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg">
                          {act.code}
                        </span>
                        <Zap className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <h5 className="text-sm font-extrabold text-white mb-2 leading-snug">
                        {act.title}
                      </h5>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Connecté
                      </span>
                      <span>SLA Actif</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step Navigation footer */}
              <div className="mt-8 pt-6 border-t border-slate-700/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30"
                >
                  ← Étape Précédente
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Étape {activeStep} sur 3</span>
                </div>

                <button
                  onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                  disabled={activeStep === 3}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 disabled:opacity-30"
                >
                  <span>Étape Suivante</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

    </div>
  );
}

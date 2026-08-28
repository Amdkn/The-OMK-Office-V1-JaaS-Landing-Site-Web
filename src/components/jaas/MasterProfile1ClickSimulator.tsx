import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, ShieldCheck, CheckCircle2, ArrowRight, Zap, 
  Sparkles, FileText, Award, QrCode, Building, Send, 
  MapPin, Clock, DollarSign, Check, RefreshCw, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MasterProfile1ClickSimulatorProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export function MasterProfile1ClickSimulator({ onOpenBooking }: MasterProfile1ClickSimulatorProps) {
  const { lang } = useLanguage();
  
  // Profile Form State
  const [fullName, setFullName] = useState('Abdoulaye Traoré');
  const [workAuthStatus, setWorkAuthStatus] = useState('EAD_VALID');
  const [targetCorridor, setTargetCorridor] = useState('CVG_HEBRON');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Forklift Operator (OSHA 3.1-1)',
    'OSHA 10 General Industry (3.1-2)',
    'Logistics Bilingual English (3.1-3)'
  ]);

  // Dispatch Simulation state
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchComplete, setDispatchComplete] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);

  const skillOptions = [
    { id: 'forklift', label: 'Forklift Operator (OSHA 3.1-1)', valueBonus: '+$2.50/h' },
    { id: 'osha10', label: 'OSHA 10 General Industry (3.1-2)', valueBonus: '+$1.50/h' },
    { id: 'english', label: 'Logistics Bilingual English (3.1-3)', valueBonus: '+$2.00/h' },
    { id: 'wms', label: 'WMS & RF Scanner Mastery (3.1-4)', valueBonus: '+$1.75/h' },
    { id: 'driver', label: 'US Driver License Transfer (1.5-3)', valueBonus: 'Mobilité 24/7' }
  ];

  const targetEmployers = [
    { name: 'Amazon Air Hub CVG', location: 'Hebron, KY', avgRate: '$24.50/h', sla: '< 24h' },
    { name: 'DHL Express Americas Hub', location: 'Erlanger, KY', avgRate: '$26.00/h', sla: '< 36h' },
    { name: 'Kroger Distribution Center', location: 'Blue Ash, OH', avgRate: '$23.75/h', sla: '< 48h' },
    { name: 'Wayfair Mega-Fulfillment', location: 'Florence, KY', avgRate: '$24.00/h', sla: '< 48h' }
  ];

  const toggleSkill = (skillLabel: string) => {
    if (selectedSkills.includes(skillLabel)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillLabel));
    } else {
      setSelectedSkills([...selectedSkills, skillLabel]);
    }
  };

  const handleRun1ClickDispatch = () => {
    setIsDispatching(true);
    setDispatchComplete(false);
    setDispatchLogs([]);

    const logMessages = [
      'Ingestion du Master Profile chiffré (Acte 3.2-1)...',
      'Validation de la conformité EAD / Work Authorization (Pôle 1)...',
      'Vérification des attestations de compétences OSHA & Forklift...',
      'Génération du Passeport Numérique OMK OS avec QR Code RH...',
      'Routage vers le bassin Amazon CVG / DHL Hebron (SLA 48h)...',
      'Transmission sécurisée effectuée ! 4 recruteurs notifiés.'
    ];

    logMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setDispatchLogs(prev => [...prev, msg]);
        if (idx === logMessages.length - 1) {
          setIsDispatching(false);
          setDispatchComplete(true);
        }
      }, (idx + 1) * 450);
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
              Moteur JaaS 1.0 · Actes 3.2-1 & 3.2-4
            </span>
            <span className="text-xs font-bold text-slate-500">
              SLA 48h Garanti
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'fr' 
              ? 'Simulateur d’Ingestion 1-Click & Multi-Dispatch Recruteurs' 
              : '1-Click Master Profile Ingestion & Recruiter Multi-Dispatch Simulator'}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Une seule saisie certifiée. Vos compétences sont vérifiées par l’Office et distribuées immédiatement auprès des managers de recrutement de la région CVG.'
              : 'One single verified intake. Your skills are sealed by the Office and distributed directly to hiring managers across the CVG logistics corridor.'}
          </p>
        </div>

        <div className="bg-amber-500/10 border-2 border-amber-400/80 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <div className="text-xs font-extrabold uppercase text-amber-900">Tarif Forfait Annuel</div>
            <div className="text-xl font-black text-amber-950">$300 <span className="text-xs text-amber-700 font-bold">/ an</span></div>
          </div>
        </div>
      </div>

      {/* Simulator Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Column: Intake Configurator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
            <h4 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>{lang === 'fr' ? '1. Configuration du Master Profile' : '1. Master Profile Setup'}</span>
            </h4>

            {/* Candidate Name */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'fr' ? 'Nom du Candidat' : 'Candidate Full Name'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Work Authorization Status (Pole 1 Link) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>{lang === 'fr' ? 'Statut Autorisation US (Pôle 1)' : 'US Work Status (Pole 1)'}</span>
                <span className="text-[10px] text-blue-600 font-extrabold">Audit I-9 Acte 1.1-1</span>
              </label>
              <select
                value={workAuthStatus}
                onChange={(e) => setWorkAuthStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="EAD_VALID">Permis de Travail Actif (EAD C08 / C09 / TPS)</option>
                <option value="GREEN_CARD">Résident Permanent (Green Card 10 ans)</option>
                <option value="US_CITIZEN">Citoyen Américain (US Citizen)</option>
                <option value="IN_PROGRESS">Renouvellement en cours (Récépissé I-797C)</option>
              </select>
            </div>

            {/* Target Corridor */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'fr' ? 'Bassin Géographique Ciblé' : 'Target Regional Corridor'}
              </label>
              <select
                value={targetCorridor}
                onChange={(e) => setTargetCorridor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="CVG_HEBRON">Grand Cincinnati / CVG Airport Hub / Hebron, KY</option>
                <option value="NORTHERN_KY">Northern Kentucky (Erlanger, Florence, Richwood)</option>
                <option value="OHIO_VALLEY">Greater Cincinnati North (Sharonville, Blue Ash, Mason)</option>
              </select>
            </div>

            {/* Verified Skills & Credentials */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{lang === 'fr' ? 'Passeport de Compétences (Pôle 3.1)' : 'Skills Passport (Pole 3.1)'}</span>
                <span className="text-[10px] text-amber-700 font-extrabold">Valorisation Salariale</span>
              </label>

              <div className="space-y-2">
                {skillOptions.map((skill) => {
                  const isChecked = selectedSkills.includes(skill.label);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.label)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-amber-500 border-amber-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{skill.label}</span>
                      </div>
                      <span className="text-[11px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        {skill.valueBonus}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Launch Button */}
          <button
            onClick={handleRun1ClickDispatch}
            disabled={isDispatching}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isDispatching ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Multi-Dispatch en cours (SLA 48h)...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>{lang === 'fr' ? 'Lancer le Multi-Dispatch 1-Click' : 'Run 1-Click Multi-Dispatch'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Right Column: Master Profile Card & Recruiter Queue */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Live Passport Card Preview */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-2xl relative overflow-hidden">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                  OMK
                </div>
                <div>
                  <div className="text-xs font-black tracking-wider uppercase text-amber-400">Passeport Candidat JaaS 1.0</div>
                  <div className="text-[10px] text-slate-400 font-mono">ID: OMK-2026-CVG-{(fullName.length * 137).toString().padStart(4, '0')}</div>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Vérifié 100%
              </span>
            </div>

            {/* Profile Info */}
            <div className="my-5 flex items-start justify-between">
              <div>
                <h4 className="text-xl font-extrabold text-white">{fullName}</h4>
                <p className="text-xs text-slate-300 mt-0.5">Autorisation : {workAuthStatus}</p>
                <p className="text-xs text-amber-300 font-semibold mt-1">Bassin : {targetCorridor}</p>
              </div>

              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>

            {/* Verified Credentials Pills */}
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Compétences Validées par l’Office :
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedSkills.map((s, idx) => (
                  <span key={idx} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-600 text-slate-200">
                    ✓ {s.split('(')[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Salary Estimation */}
            <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Fourchette Négociée</span>
                <span className="text-base font-black text-emerald-400">$23.50 – $27.50 /h</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Projection Annuelle</span>
                <span className="text-base font-black text-amber-300">$48,880 – $57,200</span>
              </div>
            </div>

          </div>

          {/* Recruiter Dispatch Targets / Live Log */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>{lang === 'fr' ? '2. Files de Dispatch Recruteurs Partenaires' : '2. Partner Recruiter Queues'}</span>
              <span className="text-xs font-bold text-amber-700">Acte 3.2-4</span>
            </h4>

            {/* Dispatch Terminal / Logs */}
            {isDispatching || dispatchLogs.length > 0 ? (
              <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs space-y-1.5 mb-4 shadow-inner">
                {dispatchLogs.map((log, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-slate-500">[{index + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Employers List */}
            <div className="space-y-2.5">
              {targetEmployers.map((emp, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    dispatchComplete 
                      ? 'bg-emerald-50/70 border-emerald-300' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      dispatchComplete ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {dispatchComplete ? <Check className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">{emp.name}</div>
                      <div className="text-[11px] text-slate-500">{emp.location} · {emp.avgRate}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      dispatchComplete
                        ? 'bg-emerald-200 text-emerald-900 font-extrabold'
                        : 'bg-slate-100 text-slate-600 font-bold'
                    }`}>
                      {dispatchComplete ? 'Transmis 48h' : `SLA ${emp.sla}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking CTA trigger */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">
                {lang === 'fr' ? 'Prêt à intégrer le pipeline ?' : 'Ready to enter the pipeline?'}
              </span>
              <button
                onClick={() => onOpenBooking && onOpenBooking('jaas')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center gap-1.5"
              >
                <span>{lang === 'fr' ? 'Souscrire JaaS ($300/an)' : 'Subscribe JaaS ($300/yr)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

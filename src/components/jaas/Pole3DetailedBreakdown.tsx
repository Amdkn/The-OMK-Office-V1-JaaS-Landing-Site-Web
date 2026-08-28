import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Clock, DollarSign, Sparkles, ChevronDown, 
  ChevronUp, ArrowRight, ShieldCheck, Zap, Truck, 
  BookOpen, Rocket, Users, Award, ExternalLink, FileText
} from 'lucide-react';
import { MSG2_ALL_SERVICES } from '../../data/msg2MatrixData';
import { ServiceItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface Pole3DetailedBreakdownProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export function Pole3DetailedBreakdown({ onOpenBooking }: Pole3DetailedBreakdownProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('3.2');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const pole3Services = MSG2_ALL_SERVICES.filter(s => s.poleCode === 3);

  const subCategories = [
    {
      code: '3.1',
      titleFr: '3.1 Professional Training',
      titleEn: '3.1 Professional Training',
      subtitleFr: 'Passeport Compétences : Forklift, OSHA 10, Anglais & Outils WMS',
      subtitleEn: 'Skills Passport: Forklift, OSHA 10, English & WMS Tools',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Truck,
      descriptionFr: 'Modules certifiants réglementaires délivrés pour répondre immédiatement aux standards des géants de la logistique du corridor CVG.',
      descriptionEn: 'Official regulatory certification modules delivered to match immediate hiring criteria across the CVG logistics corridor.'
    },
    {
      code: '3.2',
      titleFr: '3.2 Career Counseling (Cœur JaaS 1.0)',
      titleEn: '3.2 Career Counseling (JaaS 1.0 Engine)',
      subtitleFr: 'Moteur de Dispatch : Master Profile 1-Click & Routage RH SLA 48h',
      subtitleEn: 'Dispatch Engine: 1-Click Master Profile & 48h SLA Recruiter Routing',
      badgeColor: 'bg-amber-500 text-white border-amber-600',
      icon: Zap,
      descriptionFr: 'Le cœur technologique de l’offre $300/an : saisie unique, formats ATS, distribution directe aux employeurs et protection 90 jours.',
      descriptionEn: 'The core engine of the $300/yr plan: unified intake, ATS optimization, direct manager routing, and 90-day probation safeguarding.'
    },
    {
      code: '3.3',
      titleFr: '3.3 Educational Services',
      titleEn: '3.3 Educational Services',
      subtitleFr: 'Passerelle Académique : Équivalences WES, FAFSA, Universités & Apprentissage',
      subtitleEn: 'Academic Bridge: WES Evaluations, FAFSA, University Admissions & Youth',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      icon: BookOpen,
      descriptionFr: 'Valorisation des diplômes étrangers et intégration dans les collèges régionaux (Gateway, NKU, UC) et bourses fédérales.',
      descriptionEn: 'Recognition of international credentials and admission into regional institutions (Gateway, NKU, UC) with federal grants.'
    },
    {
      code: '3.4',
      titleFr: '3.4 Entrepreneurship (Passerelle BaaS V2)',
      titleEn: '3.4 Entrepreneurship (BaaS V2 Bridge)',
      subtitleFr: 'Transition Salariat vers Indépendant : Incubation, Mentoring & B2B',
      subtitleEn: 'Employee-to-Owner Transition: Incubation, Mentoring & B2B Quoting',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      icon: Rocket,
      descriptionFr: 'Pont naturel permettant aux candidats expérimentés de créer leur propre LLC et démarrer leur activité d’entrepreneur.',
      descriptionEn: 'Natural pathway allowing experienced candidates to launch their own LLC and transition into independent business ownership.'
    },
    {
      code: '3.5',
      titleFr: '3.5 Financial Education & Sovereignty',
      titleEn: '3.5 Financial Education & Sovereignty',
      subtitleFr: 'Souveraineté & Rétention : Désendettement, FHA & Programme Affiliation $50',
      subtitleEn: 'Sovereignty & Retention: Debt Relief, FHA Mortgages & $50 Referral Engine',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: Award,
      descriptionFr: 'Protection du pouvoir d’achat, accession à la propriété et auto-financement complet du JaaS grâce à l’affiliation (6 filleuls = 100% remboursé).',
      descriptionEn: 'Purchasing power defense, homeownership access, and 100% self-funded JaaS membership through referrals (6 members = fully paid).'
    }
  ];

  const currentSub = subCategories.find(s => s.code === activeTab) || subCategories[1];
  const currentActs = pole3Services.filter(s => s.subCategoryCode === activeTab);

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-xl">
      
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500 text-white rounded-full">
              Pôle 3 Détaillé · 25 Actes Opérationnels
            </span>
            <span className="text-xs font-bold text-slate-500">
              Socle du Front-Office JaaS 1.0 ($300/an)
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'fr' 
              ? 'La Matrice des 25 Actes du Pôle Carrière & Éducation' 
              : 'The 25 Operational Acts of the Career & Education Pole'}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Explorez les 5 sous-cadres structurants du Pôle 3. Chaque acte dispose d’une fiche de livrables, d’un tarif unitaire et d’une intégration directe dans le forfait JaaS.'
              : 'Explore the 5 sub-frameworks of Pole 3. Every act features verified deliverables, unit pricing, and deep integration into the JaaS bundle.'}
          </p>
        </div>

        <button
          onClick={() => onOpenBooking && onOpenBooking('jaas')}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap self-start lg:self-center"
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Adhérer au JaaS ($300/an)' : 'Join JaaS ($300/yr)'}</span>
        </button>
      </div>

      {/* Sub-frameworks Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-8">
        {subCategories.map((sub) => {
          const isActive = activeTab === sub.code;
          const IconComp = sub.icon;

          return (
            <button
              key={sub.code}
              onClick={() => setActiveTab(sub.code)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {sub.code}
                  </span>
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
                </div>
                <h4 className="text-xs font-extrabold line-clamp-2 leading-snug">
                  {lang === 'fr' ? sub.titleFr : sub.titleEn}
                </h4>
              </div>

              <span className={`text-[10px] font-bold mt-3 block ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                5 actes validés
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Sub-category Banner */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              Sous-Cadre {currentSub.code}
            </span>
            <span className="text-xs font-bold text-slate-500">5 Actes Opérationnels</span>
          </div>
          <h4 className="text-lg font-black text-slate-900">
            {lang === 'fr' ? currentSub.subtitleFr : currentSub.subtitleEn}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {lang === 'fr' ? currentSub.descriptionFr : currentSub.descriptionEn}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-bold text-slate-400 block uppercase">Format de livraison</span>
          <span className="text-sm font-extrabold text-slate-800">Dispatch & Bureau OMK</span>
        </div>
      </div>

      {/* 5 Acts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentActs.map((act) => (
          <div
            key={act.id}
            className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              act.includedInJaaS
                ? 'bg-white border-amber-200 shadow-[0_4px_20px_rgba(245,158,11,0.06)] hover:border-amber-400'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              {/* Card Top */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-black px-2 py-0.5 bg-slate-900 text-white rounded-lg">
                  {act.id}
                </span>

                {act.includedInJaaS ? (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Inclus JaaS ($300)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Option / V2
                  </span>
                )}
              </div>

              {/* Title */}
              <h5 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2 leading-snug">
                {lang === 'fr' ? act.titleFr : act.titleEn}
              </h5>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {lang === 'fr' ? act.descriptionFr : act.descriptionEn}
              </p>

              {/* Synergy Note if exists */}
              {act.jaasSynergyNoteFr && (
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] font-semibold text-amber-900 mb-4">
                  💡 {act.jaasSynergyNoteFr}
                </div>
              )}

              {/* Deliverables List */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Livrables Remis :
                </div>
                {(lang === 'fr' ? act.deliverablesFr : act.deliverablesEn).map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {act.durationMinutes} min
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  ${act.baseFeeUsd}
                </span>
              </div>

              <button
                onClick={() => onOpenBooking && onOpenBooking(act.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-extrabold text-xs transition-all flex items-center gap-1"
              >
                <span>Réserver</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

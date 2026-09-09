import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { 
  Compass, CheckSquare, Square, ArrowRight, Star, ShieldCheck, 
  Sparkles, Zap, Building2, Calendar, Phone, CheckCircle2, ChevronRight, 
  HelpCircle, Award, Users, Clock, Info, Calculator, Filter, Search,
  FileText, ArrowUpRight, Check, AlertCircle, Bookmark, DollarSign
} from "lucide-react";

interface QuestionStep {
  id: string;
  label: string;
  options: { label: string; value: string; hint: string }[];
}

const DIAGNOSTIC_QUESTIONS: QuestionStep[] = [
  {
    id: "legal_status",
    label: "1. Quel est votre statut légal actuel aux États-Unis ?",
    options: [
      { label: "Demandeur d'Asile (I-589 en cours)", value: "asylum", hint: "Requis : Traduction 8 CFR & Suivi Asylum Clock" },
      { label: "Bénéficiaire Parole Humanitaire (CHNV / U4U)", value: "parole", hint: "Requis : Demande EAD I-765 & Dépôt SSN" },
      { label: "Regroupement Familial (Pétition I-130)", value: "family", hint: "Requis : Légalisation des actes civils" },
      { label: "Autre statut / En attente de régularisation", value: "other", hint: "Requis : Audit juridique préliminaire" },
    ]
  },
  {
    id: "employment",
    label: "2. Quelle est votre situation professionnelle immédiate ?",
    options: [
      { label: "En recherche active d'emploi (Hubs Logistiques)", value: "job_search", hint: "Eligible : Dispatch Amazon CVG & DHL Express" },
      { label: "Permis de travail (EAD) en cours de validation", value: "ead_pending", hint: "Urgence : Suivi biométrie et récépissé I-797" },
      { label: "Activité indépendante / Projet de LLC", value: "business", hint: "Requis : Numéro EIN & Domiciliation légale" },
      { label: "Salarié avec besoin de régularisation fiscale 1040", value: "tax_prep", hint: "Requis : ITIN W-7 & Déclaration annuelle" },
    ]
  },
  {
    id: "family",
    label: "3. Quelle est la composition de votre foyer à Cincinnati ?",
    options: [
      { label: "Personne seule", value: "single", hint: "Parcours individuel optimisé" },
      { label: "Couple sans enfant", value: "couple", hint: "Deux dossiers conjoints à synchroniser" },
      { label: "Famille avec enfants mineurs scolarisés", value: "family_minors", hint: "Requis : Inscription scolaire & Attestations notariées" },
      { label: "Conjoints avec parents à charge", value: "extended", hint: "Regroupement familial multi-générationnel" },
    ]
  },
  {
    id: "urgency",
    label: "4. Quelle est votre urgence administrative prioritaire ?",
    options: [
      { label: "Traduction urgente d'actes d'état civil (< 48h)", value: "trans_urgent", hint: "Micro-acte d'appel : Traduction 8 CFR à $45" },
      { label: "Obtention d'un ITIN W-7 pour compte bancaire", value: "itin_urgent", hint: "Dossier fiscal IRS sans attendre le SSN" },
      { label: "Délai de réponse USCIS (RFE / Avis d'audience)", value: "rfe_urgent", hint: "Alerte rouge : Réponse sous 30 jours requise" },
      { label: "Préparation globale sans date limite stricte", value: "prep_global", hint: "Bilan complet et abonnement JaaS annuel" },
    ]
  }
];

interface ActeItem {
  id: string;
  pole: "legal" | "tax" | "career";
  poleLabel: string;
  title: string;
  code: string;
  price: number;
  duration: string;
  isMicroActe?: boolean;
  deliverables: string[];
  description: string;
}

const CATALOG_ACTES: ActeItem[] = [
  {
    id: "act-01",
    pole: "legal",
    poleLabel: "Pôle 1 · Légal",
    title: "Traduction Certifiée 8 CFR § 1003.33 (1 Page)",
    code: "ACT-LEG-001",
    price: 45,
    duration: "24h - 48h",
    isMicroActe: true,
    description: "Traduction formelle anglais/français avec attestation assermentée de compétence pour l'USCIS et l'EOIR.",
    deliverables: ["Attestation de compétence signée", "Copie miroir scellée", "Conformité 8 CFR garantie"]
  },
  {
    id: "act-02",
    pole: "legal",
    poleLabel: "Pôle 1 · Légal",
    title: "Revue & Sceau Notarié de l'État d'Ohio au Guichet",
    code: "ACT-LEG-004",
    price: 35,
    duration: "Immédiat (15 min)",
    isMicroActe: true,
    description: "Apposition du sceau officiel Notary Public pour procurations, affidavits de soutien et baux d'hébergement.",
    deliverables: ["Sceau notarié Ohio physique", "Horodatage dans le registre d'État", "Copie numérisée certifiée"]
  },
  {
    id: "act-03",
    pole: "legal",
    poleLabel: "Pôle 1 · Légal",
    title: "Audit Juridique d'Admissibilité I-589 & I-765",
    code: "ACT-LEG-012",
    price: 90,
    duration: "48h",
    isMicroActe: true,
    description: "Examen des pièces justificatives, vérification de l'Asylum Clock et conformité des dates limites.",
    deliverables: ["Rapport de conformité 5 points", "Checklist des exhibits manquants", "Recommandations procédurales"]
  },
  {
    id: "act-04",
    pole: "tax",
    poleLabel: "Pôle 2 · Fiscal",
    title: "Dossier d'Attribution ITIN W-7 auprès de l'IRS",
    code: "ACT-TAX-003",
    price: 120,
    duration: "3 à 5 jours",
    description: "Montage du formulaire W-7 avec certification des pièces d'identité pour bancarisation rapide.",
    deliverables: ["Formulaire W-7 complété", "Copie certifiée conforme", "Reçu de dépôt officiel IRS"]
  },
  {
    id: "act-05",
    pole: "tax",
    poleLabel: "Pôle 2 · Fiscal",
    title: "Déclaration Fiscale 1040-NR / 1040 Particulier",
    code: "ACT-TAX-008",
    price: 150,
    duration: "48h",
    description: "Préparation et transmission électronique de la déclaration de revenus annuelle avec crédits optimisés.",
    deliverables: ["Formulaire 1040 dématérialisé", "Bordereau d'acceptation IRS", "Conseil d'épargne fiscale"]
  },
  {
    id: "act-06",
    pole: "career",
    poleLabel: "Pôle 3 · Carrière",
    title: "Refonte CV Format ATS & Audit I-9 Hub Logistique",
    code: "ACT-CAR-002",
    price: 65,
    duration: "24h",
    isMicroActe: true,
    description: "Adaptation de l'expérience professionnelle aux normes de recrutement des géants de Cincinnati (Amazon CVG, DHL).",
    deliverables: ["CV optimisé mot-clé ATS US", "Vérification conformité I-9", "Fast-track orientation"]
  },
  {
    id: "act-07",
    pole: "career",
    poleLabel: "Pôle 3 · Carrière",
    title: "Coaching Entretien & Enrôlement Dispatch CVG",
    code: "ACT-CAR-009",
    price: 110,
    duration: "2 jours",
    description: "Simulation d'embauche en anglais, préparation aux tests de sécurité et mise en relation recruteurs.",
    deliverables: ["Session d'entraînement 45 min", "Guide des questions types", "Contact direct agence partenaire"]
  },
  {
    id: "act-08",
    pole: "legal",
    poleLabel: "Pôle 1 · Légal",
    title: "Liasse Scellée Regroupement Familial I-130",
    code: "ACT-LEG-020",
    price: 250,
    duration: "5 jours",
    description: "Assemblage complet de la pétition avec intercalaires Exhibit, traductions et index chronologique.",
    deliverables: ["Dossier complet relié 8 CFR", "Index exhaustif des preuves", "Bordereau d'expédition certifié"]
  }
];

export function VisitorHubView() {
  const { activeDashboardTab, setActiveDashboardTab } = useUser();
  const [activeSection, setActiveSection] = useState<'diagnostic' | 'catalog' | 'simulator' | 'checklist'>('diagnostic');
  
  // Synchronize with external activeDashboardTab from Sidebar or other controls
  useEffect(() => {
    if (activeDashboardTab === 'diagnostic') setActiveSection('diagnostic');
    else if (activeDashboardTab === 'catalog' || activeDashboardTab === 'catalogue') setActiveSection('catalog');
    else if (activeDashboardTab === 'simulator' || activeDashboardTab === 'simulateur') setActiveSection('simulator');
    else if (activeDashboardTab === 'checklist') setActiveSection('checklist');
  }, [activeDashboardTab]);

  const handleSectionSelect = (sec: 'diagnostic' | 'catalog' | 'simulator' | 'checklist') => {
    setActiveSection(sec);
    setActiveDashboardTab(sec);
  };
  
  // Diagnostic State
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / DIAGNOSTIC_QUESTIONS.length) * 100);

  // Catalog State
  const [selectedPole, setSelectedPole] = useState<'all' | 'legal' | 'tax' | 'career'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reservedActes, setReservedActes] = useState<string[]>([]);

  // Simulator State
  const [referralCount, setReferralCount] = useState<number>(3);
  const jaasAnnualCost = 300;
  const bonusPerReferral = 50;
  const totalDiscount = referralCount * bonusPerReferral;
  const netAnnualCost = Math.max(0, jaasAnnualCost - totalDiscount);
  const isZeroDollar = netAnnualCost === 0;

  // Free Checklist State
  const [checkedItems, setCheckedItems] = useState<string[]>(["item-1"]);

  const toggleCheckItem = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(i => i !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleSelectAnswer = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const filteredActes = CATALOG_ACTES.filter(item => {
    const matchesPole = selectedPole === 'all' || item.pole === selectedPole;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Action Center & Style Udemy / Coursera */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Visitor Hub · Action Center & Découverte
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Bienvenue à The OMK Office Cincinnati
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diagnostiquez votre situation d'installation aux USA, explorez les 75 actes sans engagement 
              et testez notre modèle d'amortissement <span className="text-amber-400 font-bold">« Zéro Dollar Net »</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleSectionSelect('diagnostic')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                activeSection === 'diagnostic'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              1. Diagnostic Initial
            </button>
            <button
              onClick={() => handleSectionSelect('catalog')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                activeSection === 'catalog'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              2. Catalogue (75 Actes)
            </button>
            <button
              onClick={() => handleSectionSelect('simulator')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                activeSection === 'simulator'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Calculator className="w-4 h-4" />
              3. Simulateur $0 Net
            </button>
            <button
              onClick={() => handleSectionSelect('checklist')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                activeSection === 'checklist'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              4. Checklist Gratuite
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: DIAGNOSTIC INITIAL (Style Coursera / Udemy) */}
      {activeSection === 'diagnostic' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          
          {/* Progress Header */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Bilan d'Intégration Personnalisé
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {answeredCount} / {DIAGNOSTIC_QUESTIONS.length} répondues
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {progressPercent === 100 
                  ? "Votre profil d'intégration est complété à 100% — 3 actions prioritaires identifiées !"
                  : `Votre profil d'intégration est complété à ${progressPercent}% — Répondez aux 4 questions pour révéler vos actes prioritaires.`
                }
              </h3>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full md:w-60">
              <div className="flex justify-between text-xs font-mono font-bold text-slate-400 mb-1.5">
                <span>Progression</span>
                <span className={progressPercent === 100 ? "text-emerald-400" : "text-amber-400"}>
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    progressPercent === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 4 Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DIAGNOSTIC_QUESTIONS.map((q) => {
              const currentAns = answers[q.id];
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">
                    {q.label}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = currentAns === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectAnswer(q.id, opt.value)}
                          className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start justify-between gap-3 border ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-sm'
                              : 'bg-slate-900/50 border-slate-800/60 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-100">{opt.label}</div>
                            <div className="text-[10px] text-slate-400">{opt.hint}</div>
                          </div>
                          <div className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-slate-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Priority Recommendations Box */}
          {answeredCount >= 2 && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/50 to-slate-950 border border-blue-800/40 space-y-4">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Actions Recommandées par l'Intelligence Procédurale OMK
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">Micro-acte</span>
                    <span className="font-mono text-white font-bold">$45</span>
                  </div>
                  <div className="text-sm font-bold text-white">Traduction 8 CFR de l'Acte de Naissance</div>
                  <p className="text-xs text-slate-400">Indispensable pour votre dossier USCIS I-589 ou I-130.</p>
                  <button 
                    onClick={() => setActiveSection('catalog')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 mt-2"
                  >
                    Commander cet acte <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">Pôle Fiscal</span>
                    <span className="font-mono text-white font-bold">$120</span>
                  </div>
                  <div className="text-sm font-bold text-white">Création Numéro ITIN W-7 (IRS)</div>
                  <p className="text-xs text-slate-400">Ouvre le droit au compte bancaire sans attendre le SSN officiel.</p>
                  <button 
                    onClick={() => setActiveSection('catalog')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 mt-2"
                  >
                    Voir le détail <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Formule Tout-en-Un</span>
                    <span className="font-mono text-white font-bold">$300 / an</span>
                  </div>
                  <div className="text-sm font-bold text-white">Adhésion JaaS (Les 75 Actes)</div>
                  <p className="text-xs text-slate-400">Couvre tous les actes et s'amortit à $0 net dès 6 parrainages.</p>
                  <button 
                    onClick={() => setActiveSection('simulator')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 mt-2"
                  >
                    Simuler l'amortissement <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* SECTION 2: CATALOGUE DES 75 ACTES (Marketplace avec Micro-Actes) */}
      {activeSection === 'catalog' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Architecture 3x5x5 · Matrice Officielle
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Catalogue Général des 75 Actes Démarches
              </h3>
              <p className="text-xs text-slate-400">
                Tarifs transparents, sans frais cachés. Réservez un micro-acte d'appel ou souscrivez au pack global.
              </p>
            </div>

            {/* Search bar */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un acte, code..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => setSelectedPole('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPole === 'all'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Tous les Actes ({CATALOG_ACTES.length})
            </button>
            <button
              onClick={() => setSelectedPole('legal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPole === 'legal'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              ⚖️ Pôle 1 : Légal & 8 CFR
            </button>
            <button
              onClick={() => setSelectedPole('tax')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPole === 'tax'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              💵 Pôle 2 : Fiscal & 1040
            </button>
            <button
              onClick={() => setSelectedPole('career')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPole === 'career'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              🚀 Pôle 3 : Carrière & CVG
            </button>
          </div>

          {/* Acts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActes.map((item) => {
              const isReserved = reservedActes.includes(item.id);
              return (
                <div 
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 relative group"
                >
                  {item.isMicroActe && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                      Micro-acte d'appel
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{item.code}</span>
                      <span>{item.poleLabel}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 space-y-1">
                      <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Livrables certifiés :</div>
                      {item.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-white font-mono">${item.price}</div>
                      <div className="text-[10px] text-slate-500">{item.duration}</div>
                    </div>

                    <button
                      onClick={() => {
                        if (isReserved) {
                          setReservedActes(reservedActes.filter(id => id !== item.id));
                        } else {
                          setReservedActes([...reservedActes, item.id]);
                        }
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isReserved
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {isReserved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Réservé
                        </>
                      ) : (
                        <>
                          Réserver cet Acte
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredActes.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              Aucun acte ne correspond à votre filtre.
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: SIMULATEUR D'AMORTISSEMENT ($0 NET / 6 PARRAINAGES) */}
      {activeSection === 'simulator' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              Programme Ambassadeur Zéro Dollar
            </div>
            <h3 className="text-xl font-bold text-white">
              Simulateur Dynamique d'Amortissement de la Cotisation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chez The OMK Office, votre réseau communautaire finance vos démarches.
              Chaque personne que vous orientez vers notre guichet vous rapporte <strong className="text-emerald-400">$50 déduits</strong> de votre abonnement annuel JaaS ($300/an).
            </p>
          </div>

          {/* Interactive Calculator Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800">
            
            {/* Left slider area */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-200">
                    Nombre de personnes recommandées :
                  </label>
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black font-mono text-sm">
                    {referralCount} filleuls
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={referralCount}
                  onChange={(e) => setReferralCount(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>0 (Débutant)</span>
                  <span className="text-emerald-400 font-bold">6 (Palier $0 Net)</span>
                  <span>10+ (Excédent Cash)</span>
                </div>
              </div>

              {/* Breakdown steps */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Coût standard abonnement JaaS :</span>
                  <span className="font-mono text-slate-200 font-bold">${jaasAnnualCost} / an</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold">
                    Bonus parrainage ({referralCount} × $50) :
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">-${totalDiscount}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-200 font-bold">Votre cotisation annuelle résiduelle :</span>
                  <span className={`font-mono text-base font-black ${isZeroDollar ? 'text-emerald-400' : 'text-amber-400'}`}>
                    ${netAnnualCost} / an
                  </span>
                </div>
              </div>
            </div>

            {/* Right Result Visualizer */}
            <div className={`lg:col-span-5 p-6 rounded-xl border flex flex-col justify-between items-center text-center space-y-4 ${
              isZeroDollar 
                ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Bilan de la Simulation
                </span>
                <div className="text-3xl font-black font-mono text-white mt-1">
                  {isZeroDollar ? "$0 NET" : `$${netAnnualCost}`}
                </div>
                <div className="text-xs text-slate-400">
                  {isZeroDollar 
                    ? "Félicitations ! Votre abonnement annuel est intégralement amorti." 
                    : `Encore ${6 - referralCount} filleul(s) pour atteindre le Zéro Dollar absolu.`
                  }
                </div>
              </div>

              {/* Visual gauge */}
              <div className="w-full space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Jauge vers $0 Net</span>
                  <span>{Math.min(100, Math.round((referralCount / 6) * 100))}%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (referralCount / 6) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="w-full pt-3">
                <button
                  onClick={() => alert("Lien d'adhésion généré ! Présentez-vous au guichet du 2600 Civic Center Dr.")}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Activer mon Code Ambassadeur
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 4: CHECKLIST GRATUITE DE PRÉPARATION */}
      {activeSection === 'checklist' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <CheckSquare className="w-3.5 h-3.5" />
              Checklist Gratuite d'Intake
            </div>
            <h3 className="text-xl font-bold text-white">
              Pièces Requises à Rassembler Avant de Souscrire
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Préparez ces documents originaux dès maintenant. Cela garantit un traitement en 24h chrono lors de votre venue au guichet de Cincinnati.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "item-1",
                title: "Passeport original en cours de validité (ou carte consulaire)",
                details: "Doit comporter la page d'identité avec photo nette et les tampons d'entrée aux États-Unis.",
                tip: "Vérifiez que la validité résiduelle dépasse au moins 6 mois."
              },
              {
                id: "item-2",
                title: "Actes d'état civil originaux (Naissance, Mariage)",
                details: "En langue d'origine. Les copies simples ne sont pas admises par l'USCIS sans confrontation à l'original.",
                tip: "Préparez également les copies de votre conjoint et de vos enfants s'ils sont rattachés."
              },
              {
                id: "item-3",
                title: "Formulaire d'admission I-94 ou Notice d'Assignation (NTA)",
                details: "Téléchargeable sur le portail officiel CBP ou remis lors du passage frontière.",
                tip: "Ce document fixe la date officielle de départ de votre Asylum Clock."
              },
              {
                id: "item-4",
                title: "Justificatif d'adresse physique dans l'agglomération de Cincinnati",
                details: "Bail de location, facture Duke Energy ou attestation d'hébergement signée devant notaire.",
                tip: "Nécessaire pour fixer la compétence territoriale du tribunal de Cleveland ou bureau USCIS de Columbus/Cincinnati."
              }
            ].map((check) => {
              const isDone = checkedItems.includes(check.id);
              return (
                <div
                  key={check.id}
                  onClick={() => toggleCheckItem(check.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isDone 
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600 bg-slate-900'
                  }`}>
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <div className={`text-sm font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                      {check.title}
                    </div>
                    <p className="text-xs text-slate-400">
                      {check.details}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-mono mt-1">
                      <Info className="w-3 h-3" />
                      <span>{check.tip}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span className="text-white font-bold">{checkedItems.length} sur 4 pièces</span> rassemblées. Prêt à nous rencontrer ?
            </div>
            <a
              href="#office-hub"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              Prendre RDV au Guichet (2600 Civic Center Dr)
            </a>
          </div>

        </div>
      )}

    </div>
  );
}

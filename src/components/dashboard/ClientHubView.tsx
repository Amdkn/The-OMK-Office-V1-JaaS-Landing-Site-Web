import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { calculateProgress, Milestone } from "../../lib/progress/progressEngine";
import { 
  CheckCircle2, Clock, ArrowRight, Download, MessageSquare, Phone, 
  Share2, Shield, Calendar, Sparkles, Check, ChevronRight, UserCheck, 
  FileText, ExternalLink, Star, Briefcase, Plus, AlertCircle, 
  FolderLock, Copy, AlertTriangle, Stamp, Printer, Eye, Lock
} from "lucide-react";

interface TimelineStep {
  id: number;
  label: string;
  sublabel: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
  officerNote?: string;
}

const UBER_TRACKER_STEPS: TimelineStep[] = [
  {
    id: 1,
    label: "1. Documents reçus",
    sublabel: "Scans originaux intake validés",
    status: "completed",
    timestamp: "24 Août · 14h15",
    officerNote: "Acte de naissance & passeport scannés au guichet physique de Cincinnati."
  },
  {
    id: 2,
    label: "2. Traduction certifiée",
    sublabel: "Norme légale 8 CFR § 1003.33",
    status: "completed",
    timestamp: "27 Août · 10h30",
    officerNote: "Attestation formelle de compétence et d'exactitude bilingue rédigée et scellée."
  },
  {
    id: 3,
    label: "3. Revue Notariée",
    sublabel: "Sceau Notary Public Ohio",
    status: "current",
    timestamp: "En cours aujourd'hui",
    officerNote: "Apposition du sceau officiel par Sarah Jenkins (Notary Public n° OH-2024-884)."
  },
  {
    id: 4,
    label: "4. Envoi & Dépôt USCIS",
    sublabel: "Liasse scellée avec accusé I-797C",
    status: "upcoming",
    officerNote: "Expédition par courrier sécurisé USPS Certified Mail avec numéro de suivi."
  },
  {
    id: 5,
    label: "5. Biométrie & EAD",
    sublabel: "Prise d'empreintes & Permis de travail",
    status: "upcoming",
    officerNote: "Convocation au centre d'application biométrique (ASC) de Cincinnati."
  }
];

interface VaultDocument {
  id: string;
  name: string;
  type: string;
  caseRef: string;
  sealDate: string;
  size: string;
  status: "certified" | "pending";
  category: "original" | "translation" | "uscis_form";
}

const VAULT_DOCS: VaultDocument[] = [
  {
    id: "doc-1",
    name: "Acte_Naissance_Original_ScanHD.pdf",
    type: "Document Original",
    caseRef: "CAS-2026-JM01",
    sealDate: "24/08/2026",
    size: "3.4 MB",
    status: "certified",
    category: "original"
  },
  {
    id: "doc-2",
    name: "Traduction_Certifiee_8CFR_Acte_Naissance.pdf",
    type: "Traduction Assermentée",
    caseRef: "CAS-2026-JM01",
    sealDate: "27/08/2026",
    size: "1.8 MB",
    status: "certified",
    category: "translation"
  },
  {
    id: "doc-3",
    name: "Formulaire_I-589_Liasse_Exhibits_A-D.pdf",
    type: "Formulaire Fédéral",
    caseRef: "CAS-2026-JM01",
    sealDate: "28/08/2026",
    size: "5.2 MB",
    status: "certified",
    category: "uscis_form"
  },
  {
    id: "doc-4",
    name: "Attestation_Notariee_Hebergement_Ohio.pdf",
    type: "Affidavit Notarié",
    caseRef: "CAS-2026-JM01",
    sealDate: "En cours",
    size: "950 KB",
    status: "pending",
    category: "translation"
  }
];

export function ClientHubView() {
  const { currentUser, activeDashboardTab, setActiveDashboardTab } = useUser();
  const [activeTab, setActiveTab] = useState<'tracker' | 'vault' | 'ambassador' | 'deadlines'>('tracker');
  const [activeDossier, setActiveDossier] = useState<'i589' | 'i130' | 'tax1040'>('i589');
  const [copiedLink, setCopiedLink] = useState(false);

  // Convert timeline steps to Milestones to calculate progress deterministically
  const milestones: Milestone[] = UBER_TRACKER_STEPS.map(step => ({
    id: step.id,
    status: step.status as Milestone['status']
  }));
  const progressPercent = calculateProgress(milestones);

  // Synchronize with external activeDashboardTab from Sidebar or other controls
  useEffect(() => {
    if (activeDashboardTab === 'tracker' || activeDashboardTab === 'demarches') setActiveTab('tracker');
    else if (activeDashboardTab === 'vault') setActiveTab('vault');
    else if (activeDashboardTab === 'ambassador' || activeDashboardTab === 'ambassadeur') setActiveTab('ambassador');
    else if (activeDashboardTab === 'deadlines' || activeDashboardTab === 'echeances' || activeDashboardTab === 'timeline') setActiveTab('deadlines');
  }, [activeDashboardTab]);

  const handleTabSelect = (tab: 'tracker' | 'vault' | 'ambassador' | 'deadlines') => {
    setActiveTab(tab);
    setActiveDashboardTab(tab);
  };

  const referralCode = "LELO-JM-8841";
  const referralUrl = `https://the-omk-office.com/ref/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">

      {/* Top Banner: Uber / Airbnb Logistics Style */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              Client Hub · Tracker Logistique & Filiation
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center font-black text-lg text-white shadow-lg shadow-emerald-600/30">
                JM
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Bonjour, Jean-Marc Lelo
                </h1>
                <p className="text-xs text-slate-300">
                  Adhérent JaaS (Job as a Service) · Dossier n° <span className="font-mono text-emerald-400 font-bold">CAS-2026-JM01</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Sub-navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleTabSelect('tracker')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'tracker'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              1. Démarches en Cours
            </button>
            <button
              onClick={() => handleTabSelect('vault')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'vault'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FolderLock className="w-4 h-4" />
              2. Coffre-fort (Vault)
            </button>
            <button
              onClick={() => handleTabSelect('ambassador')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'ambassador'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Share2 className="w-4 h-4" />
              3. Espace Ambassadeur
            </button>
            <button
              onClick={() => handleTabSelect('deadlines')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'deadlines'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4" />
              4. Échéances & Alertes
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: MES DÉMARCHES EN COURS (Tracker Type Uber) */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          
          {/* Active Cases Switcher Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">Sélectionner le dossier actif :</span>
              <button
                onClick={() => setActiveDossier('i589')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDossier === 'i589'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Pétition Asile & EAD (I-589 / I-765)
              </button>
              <button
                onClick={() => setActiveDossier('i130')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDossier === 'i130'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Pétition I-130 Olive (Conjoint)
              </button>
              <button
                onClick={() => setActiveDossier('tax1040')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDossier === 'tax1040'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Déclaration Fiscale 1040
              </button>
            </div>

            {/* Case Manager Contact Pill */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                SJ
              </div>
              <div className="text-xs">
                <div className="font-bold text-white leading-tight">Sarah Jenkins</div>
                <div className="text-[10px] text-slate-400">Gestionnaire Assignée</div>
              </div>
              <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                <button 
                  onClick={() => alert("Ouverture du canal de messagerie chiffré avec Sarah Jenkins")}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 cursor-pointer"
                  title="Envoyer un message"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => alert("Appel vers le guichet : +1 (513) 984-8002")}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 cursor-pointer"
                  title="Appeler le bureau"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Uber-style Tracker Timeline */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Suivi Temps Réel · Étape 3 sur 5
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Revue Notariée & Légalisation en cours
                </h3>
                <p className="text-xs text-slate-400">
                  Dossier inspecté et contresigné au bureau de Cincinnati · Date prévisionnelle de dépôt : <strong>Dans 48 heures</strong>
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
                <div className="text-[10px] font-mono uppercase text-slate-400">Numéro de récépissé</div>
                <div className="text-sm font-mono font-black text-amber-400">OH-USCIS-994821</div>
              </div>
            </div>


            {/* Progression & Milestones Header */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span>Progression du Dossier</span>
                <span className="text-emerald-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div className="grid grid-cols-5 text-center text-[10px] font-mono text-slate-400 mt-2">
                <div className="text-emerald-400 font-bold">Intake</div>
                <div className="text-emerald-400 font-bold">Traduction</div>
                <div className="text-white font-bold">USCIS</div>
                <div>Biométrie</div>
                <div>Décision</div>
              </div>
            </div>

            {/* Dépôt simplifié des pièces d'identité */}
            <div className="bg-slate-900/80 border border-slate-700 border-dashed rounded-2xl p-6 mb-8 text-center hover:bg-slate-800/80 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/20 transition-colors">
                <Plus className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Dépôt simplifié de pièces d'identité / procurations</h3>
              <p className="text-xs text-slate-400">Glissez-déposez vos fichiers ici (PDF, JPG, PNG)</p>
            </div>

            {/* Step-by-Step Uber Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {UBER_TRACKER_STEPS.map((step, idx) => {
                const isDone = step.status === 'completed';
                const isCurrent = step.status === 'current';
                const isUpcoming = step.status === 'upcoming';

                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isCurrent
                        ? 'bg-gradient-to-b from-emerald-950/40 to-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500/50'
                        : isDone
                        ? 'bg-slate-950/70 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950/30 border-slate-800/80 opacity-60 text-slate-500'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone 
                            ? 'bg-emerald-500 text-slate-950' 
                            : isCurrent 
                            ? 'bg-emerald-500 text-slate-950 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
                        </div>

                        {step.timestamp && (
                          <span className="text-[10px] font-mono text-slate-400">
                            {step.timestamp}
                          </span>
                        )}
                      </div>

                      <div className={`text-sm font-bold leading-tight ${isCurrent ? 'text-emerald-300' : isDone ? 'text-white' : 'text-slate-400'}`}>
                        {step.label}
                      </div>

                      <div className="text-[11px] text-slate-400 leading-snug">
                        {step.sublabel}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 leading-relaxed italic">
                      "{step.officerNote}"
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions for Current Step */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Stamp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Signature physique requise pour l'Exhibit C</div>
                  <div className="text-[11px] text-slate-400">Passez au guichet du bureau ou confirmez par signature numérique.</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Signature numérique sécurisée validée avec horodatage blockchain !")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Signer Numériquement
                </button>
                <button
                  onClick={() => setActiveTab('vault')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Voir le Brouillon
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 2: COFFRE-FORT FAMILIAL (VAULT) */}
      {activeTab === 'vault' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold">
                <FolderLock className="w-4 h-4" />
                Coffre-fort Familial Chiffré AES-256
              </div>
              <h3 className="text-xl font-bold text-white">
                Originaux Scannés & Traductions Scellées 8 CFR
              </h3>
              <p className="text-xs text-slate-400">
                Vos documents certifiés restent disponibles en permanence, téléchargeables avec leurs certificats d'assermentation.
              </p>
            </div>

            <button
              onClick={() => alert("Ouverture de l'assistant de numérisation d'intake (SOP-LD05-OPS-001)")}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <Plus className="w-4 h-4" />
              Ajouter une Nouvelle Pièce
            </button>
          </div>

          {/* Table of documents */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Document / Intitulé</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Réf. Dossier</th>
                  <th className="p-4">Certification</th>
                  <th className="p-4">Poids</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                {VAULT_DOCS.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">{doc.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                        {doc.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-300">{doc.caseRef}</td>
                    <td className="p-4">
                      {doc.status === 'certified' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Scellé {doc.sealDate}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                          <Clock className="w-3.5 h-3.5" />
                          En attente de sceau
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-slate-400">{doc.size}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => alert(`Téléchargement certifié de : ${doc.name}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-400" />
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: MON ESPACE AMBASSADEUR (PARRAINAGE) */}
      {activeTab === 'ambassador' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
                <Share2 className="w-4 h-4" />
                Programme Ambassadeur Communautaire
              </div>
              <h3 className="text-xl font-bold text-white">
                Votre Solde & Vos Filleuls Actifs
              </h3>
              <p className="text-xs text-slate-400">
                Chaque filleul parrainé vous crédite <strong className="text-emerald-400">$50</strong>. À 6 filleuls, votre cotisation annuelle JaaS tombe à <strong className="text-white">$0 Net</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Solde déjà remboursé</div>
              <div className="text-2xl font-black font-mono text-emerald-400">$150 / $300</div>
            </div>
          </div>

          {/* Referral link box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300">
              Votre lien de recommandation personnel à partager :
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-md"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedLink ? "Copié !" : "Copier le Lien"}
              </button>
            </div>
          </div>

          {/* Gauge to $0 Net */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Progression vers le Zéro Dollar Net :</span>
              <span className="font-mono text-emerald-400 font-bold">3 sur 6 filleuls (50%)</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <p className="text-[11px] text-slate-400">
              Plus que <strong>3 nouveaux adhérents</strong> pour débloquer votre statut Zéro Dollar pour l'année 2027.
            </p>
          </div>

          {/* List of active referrals */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">Historique de vos parrainages récents :</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: "Alain K.", date: "12 Août 2026", status: "Validé (+$50)", pack: "Pack JaaS Annuel" },
                { name: "Grace M.", date: "18 Août 2026", status: "Validé (+$50)", pack: "Pack JaaS Annuel" },
                { name: "Pascal N.", date: "29 Août 2026", status: "Validé (+$50)", pack: "Micro-actes Légal" },
              ].map((filleul, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{filleul.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{filleul.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{filleul.pack}</div>
                  <div className="text-[10px] text-slate-500">{filleul.date}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 4: CALENDRIER & ALERTES ÉCHÉANCES */}
      {activeTab === 'deadlines' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
              <Calendar className="w-4 h-4" />
              Échéancier & Calendrier Procédural
            </div>
            <h3 className="text-xl font-bold text-white">
              Alertes Délais Stricts (USCIS & IRS)
            </h3>
            <p className="text-xs text-slate-400">
              Surveillance automatique des délais d'expiration pour ne manquer aucun rendez-vous critique.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "alert-1",
                level: "warning",
                title: "Fenêtre d'ouverture Asylum Clock (Jour 150)",
                date: "Dans 14 jours · 17 Septembre 2026",
                desc: "Votre horloge d'asile atteindra 150 jours. Dépôt automatique du formulaire I-765 (EAD) préparé par Sarah Jenkins.",
                badge: "PRIORITÉ ÉLEVÉE"
              },
              {
                id: "alert-2",
                level: "info",
                title: "Rendez-vous de vérification au guichet de Cincinnati",
                date: "Jeudi 10 Septembre à 14h00 EST",
                desc: "Revue physique des originaux d'état civil avec le juriste avant scellé définitif.",
                badge: "AU BUREAU OMK"
              },
              {
                id: "alert-3",
                level: "normal",
                title: "Échéance déclaration d'acompte fiscal IRS",
                date: "15 Octobre 2026",
                desc: "Déclaration trimestrielle sous numéro ITIN W-7 pour votre activité indépendante.",
                badge: "PÔLE 2 FISCAL"
              }
            ].map((al) => (
              <div
                key={al.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      al.level === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {al.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{al.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{al.title}</h4>
                  <p className="text-xs text-slate-400">{al.desc}</p>
                </div>

                <button
                  onClick={() => alert("Synchronisation avec votre agenda Google Calendar ou Apple Calendar réussie !")}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Ajouter à l'Agenda
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

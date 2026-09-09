import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { 
  LayoutDashboard, Users, FileText, Bot, CreditCard, BookOpen, Settings, 
  Search, Plus, Download, CheckCircle, Clock, AlertTriangle, ArrowRight, 
  ExternalLink, Sparkles, Filter, X, Shield, Briefcase, RefreshCw, Send, 
  CheckCircle2, Building2, Smartphone, Monitor, Stamp, Printer, Eye, 
  FileCheck, ArrowLeftRight, Code, AlertOctagon, Layers, Check
} from "lucide-react";

interface IntakeScan {
  id: string;
  source: "Guichet Physique" | "Upload Mobile" | "Email Scellé";
  clientName: string;
  documentType: string;
  scanTime: string;
  pages: number;
  status: "unqualified" | "in_review" | "approved" | "rejected";
  urgency: "normal" | "urgent" | "critical";
  sopCode: string;
}

const INTAKE_SCANS: IntakeScan[] = [
  {
    id: "SCN-2026-089",
    source: "Guichet Physique",
    clientName: "Jean-Marc Lelo",
    documentType: "Acte de Naissance (FR/RDC)",
    scanTime: "Aujourd'hui · 09h14",
    pages: 2,
    status: "in_review",
    urgency: "urgent",
    sopCode: "SOP-LD05-OPS-001"
  },
  {
    id: "SCN-2026-090",
    source: "Upload Mobile",
    clientName: "Maria Garcia",
    documentType: "Attestation Fiscale 1099-NEC",
    scanTime: "Aujourd'hui · 10h42",
    pages: 1,
    status: "unqualified",
    urgency: "normal",
    sopCode: "SOP-LD05-OPS-001"
  },
  {
    id: "SCN-2026-091",
    source: "Email Scellé",
    clientName: "Ousmane Traoré",
    documentType: "Notice of Intent to Deny (NOID)",
    scanTime: "Hier · 17h05",
    pages: 4,
    status: "unqualified",
    urgency: "critical",
    sopCode: "SOP-LD05-OPS-001"
  },
  {
    id: "SCN-2026-088",
    source: "Guichet Physique",
    clientName: "Fatou Diallo",
    documentType: "Passeport + Visa I-94",
    scanTime: "Hier · 14h20",
    pages: 3,
    status: "approved",
    urgency: "normal",
    sopCode: "SOP-LD05-OPS-001"
  }
];

interface ImmigrationCase {
  id: string;
  client: string;
  petition: string;
  category: "Asile" | "Parole" | "Famille" | "Fiscal";
  deadline: string;
  daysRemaining: number;
  hasUrgentRFE: boolean;
  officer: string;
  progress: number;
}

const IMMIGRATION_CASES: ImmigrationCase[] = [
  {
    id: "CAS-2026-001",
    client: "Ousmane Traoré",
    petition: "Réponse RFE / NOID Asylum I-589",
    category: "Asile",
    deadline: "10 Septembre 2026",
    daysRemaining: 7,
    hasUrgentRFE: true,
    officer: "Alexandre K.",
    progress: 75
  },
  {
    id: "CAS-2026-002",
    client: "Jean-Marc Lelo",
    petition: "I-589 + I-765 EAD Permis de travail",
    category: "Asile",
    deadline: "18 Septembre 2026",
    daysRemaining: 15,
    hasUrgentRFE: false,
    officer: "Sarah Jenkins",
    progress: 60
  },
  {
    id: "CAS-2026-003",
    client: "Maria Garcia",
    petition: "Attribution ITIN W-7 + Déclaration 1040",
    category: "Fiscal",
    deadline: "15 Octobre 2026",
    daysRemaining: 42,
    hasUrgentRFE: false,
    officer: "Sarah Jenkins",
    progress: 40
  },
  {
    id: "CAS-2026-004",
    client: "Alain K.",
    petition: "Pétition Regroupement Familial I-130",
    category: "Famille",
    deadline: "30 Septembre 2026",
    daysRemaining: 27,
    hasUrgentRFE: false,
    officer: "Alexandre K.",
    progress: 30
  }
];

export function StaffOpsView() {
  const { currentUser, activeDashboardTab, setActiveDashboardTab } = useUser();
  const [activeTab, setActiveTab] = useState<'inbox' | 'cases' | 'kanban' | 'notary_bench' | 'metrics' | 'fast_actions'>('inbox');
  
  // Synchronize with external activeDashboardTab from Sidebar or other controls
  useEffect(() => {
    if (activeDashboardTab === 'inbox') setActiveTab('inbox');
    else if (activeDashboardTab === 'cases' || activeDashboardTab === 'dossiers') setActiveTab('cases');
    else if (activeDashboardTab === 'kanban') setActiveTab('kanban');
    else if (activeDashboardTab === 'notary_bench' || activeDashboardTab === 'assermentation') setActiveTab('notary_bench');
    else if (activeDashboardTab === 'metrics' || activeDashboardTab === 'metriques') setActiveTab('metrics');
    else if (activeDashboardTab === 'fast_actions') setActiveTab('fast_actions');
  }, [activeDashboardTab]);

  const handleTabSelect = (tab: 'inbox' | 'cases' | 'kanban' | 'notary_bench' | 'metrics' | 'fast_actions') => {
    setActiveTab(tab);
    setActiveDashboardTab(tab);
  };

  // Cases filters
  const [caseFilter, setCaseFilter] = useState<'all' | 'critical' | 'deadlines7'>('all');
  
  // Notary Bench State
  const [notaryStamped, setNotaryStamped] = useState(false);
  const [stampTimestamp, setStampTimestamp] = useState<string | null>(null);

  // Fast Actions Dialog State
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [showExhibitModal, setShowExhibitModal] = useState(false);
  const [batValidated, setBatValidated] = useState(false);

  // Handle notary stamp
  const handleApplyStamp = () => {
    const now = new Date().toLocaleString("fr-FR", { 
      timeZone: "America/New_York",
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
    setNotaryStamped(true);
    setStampTimestamp(`${now} EST (Ohio Notary Commission #2024-884)`);
  };

  const manifestJsonData = {
    schemaVersion: "2026.1",
    officeId: "OMK-OH-CIN-01",
    facility: "2600 Civic Center Dr, Cincinnati, OH 45216",
    generatedAt: new Date().toISOString(),
    officerInCharge: "Alexandre K. / Sarah Jenkins",
    intakeBatch: "SOP-LD05-OPS-001",
    activeExhibits: [
      { id: "EXH-A", type: "Certified 8 CFR Translation", pages: 2, hash: "sha256-88a91f4..." },
      { id: "EXH-B", type: "Civil Status Original Scan", pages: 2, hash: "sha256-44c21b9..." },
      { id: "EXH-C", type: "Affidavit of Support Notarized", pages: 3, hash: "sha256-77b31e0..." }
    ],
    chainOfCustody: {
      sealed: true,
      notarySealAppended: notaryStamped
    }
  };

  const filteredCases = IMMIGRATION_CASES.filter(c => {
    if (caseFilter === 'critical') return c.hasUrgentRFE;
    if (caseFilter === 'deadlines7') return c.daysRemaining <= 7;
    return true;
  });

  return (
    <div className="space-y-6">

      {/* Top Banner: Staff Back-Office Cockpit */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              Staff Ops · Cockpit d'Opérations & Back-Office Déterministe
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Poste de Contrôle & Adjudication des Dossiers
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Supervision de la file d'intake (SOP-LD05-OPS-001), banc d'assermentation 8 CFR, 
              gestion des délais d'urgence (NOID/RFE) et émission des manifests.
            </p>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleTabSelect('inbox')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'inbox'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              1. File d'Intake (Inbox)
            </button>
            <button
              onClick={() => handleTabSelect('cases')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'cases'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              2. Dossiers Immigration
            </button>

            <button
              onClick={() => handleTabSelect('kanban')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'kanban'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Kanban
            </button>
            <button
              onClick={() => handleTabSelect('notary_bench')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'notary_bench'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Stamp className="w-4 h-4" />
              3. Banc d'Assermentation
            </button>
            <button
              onClick={() => handleTabSelect('metrics')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'metrics'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              4. Métriques & Facturation
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS BAR (Fast Buttons: Manifest JSON, Pack Exhibits, BAT) */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Actions Rapides Déterministes :
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowJsonModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white text-xs font-bold flex items-center gap-2 border border-purple-500/30 transition-all cursor-pointer"
          >
            <Code className="w-4 h-4 text-purple-400" />
            Générer Manifest JSON
          </button>

          <button
            onClick={() => setShowExhibitModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white text-xs font-bold flex items-center gap-2 border border-blue-500/30 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-blue-400" />
            Imprimer Pack d'Exhibits
          </button>

          <button
            onClick={() => {
              setBatValidated(true);
              alert("Bon à Tirer (BAT) validé ! Liasse scellée prête pour expédition physique ou dépôt eoir.justice.gov.");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              batValidated
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            {batValidated ? "BAT Validé (Prêt Envoi)" : "Valider BAT (Bon à Tirer)"}
          </button>
        </div>
      </div>

      {/* SECTION 1: FILE D'INTAKE (INBOX SOP-LD05-OPS-001) */}
      {activeTab === 'inbox' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
                <Layers className="w-4 h-4" />
                Procédure Standardisée SOP-LD05-OPS-001
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                File d'Intake & Numérisation des Originaux
              </h3>
              <p className="text-xs text-slate-400">
                Documents bruts entrants (scans guichet physique de Cincinnati, pièces jointes mobiles, courriers recommandés).
              </p>
            </div>

            <button
              onClick={() => alert("Ouverture du scanner haute définition du guichet physique (300 DPI min, couleur).")}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30"
            >
              <Plus className="w-4 h-4" />
              Nouveau Scan Guichet
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Réf. Scan</th>
                  <th className="p-4">Origine</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Document / Type</th>
                  <th className="p-4">Horodatage</th>
                  <th className="p-4">Urgence</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Adjudication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                {INTAKE_SCANS.map((scan) => (
                  <tr key={scan.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 font-mono text-slate-300 font-bold">{scan.id}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {scan.source}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white">{scan.clientName}</td>
                    <td className="p-4">
                      <div className="text-slate-200">{scan.documentType}</div>
                      <div className="text-[10px] font-mono text-slate-500">{scan.pages} page(s) · {scan.sopCode}</div>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">{scan.scanTime}</td>
                    <td className="p-4">
                      {scan.urgency === 'critical' ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-[10px]">
                          CRITIQUE
                        </span>
                      ) : scan.urgency === 'urgent' ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[10px]">
                          URGENT
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Normal</span>
                      )}
                    </td>
                    <td className="p-4">
                      {scan.status === 'approved' ? (
                        <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Qualifié
                        </span>
                      ) : scan.status === 'in_review' ? (
                        <span className="text-blue-400 font-bold text-[11px] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> En revue
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold text-[11px] flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> À qualifier
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setActiveTab('notary_bench');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3" />
                          Traiter au Banc
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

      {/* SECTION 2: DOSSIERS D'IMMIGRATION (AVEC FILTRES CRITIQUES NOID/RFE) */}
      {activeTab === 'cases' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
                <Briefcase className="w-4 h-4" />
                Tableau de Bord des Dossiers d'Immigration
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Suivi Déterministe & Gestion des Délais Stricts
              </h3>
              <p className="text-xs text-slate-400">
                Surveillance continue des avis d'adjudication USCIS, requêtes de preuves (RFE) et notifications de refus (NOID).
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCaseFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  caseFilter === 'all'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Tous ({IMMIGRATION_CASES.length})
              </button>
              <button
                onClick={() => setCaseFilter('critical')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  caseFilter === 'critical'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🚨 NOID / RFE Prioritaire
              </button>
              <button
                onClick={() => setCaseFilter('deadlines7')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  caseFilter === 'deadlines7'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ⏳ Délais &lt; 7 Jours
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Dossier</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Pétition / Formulaire</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Date Limite Stricte</th>
                  <th className="p-4">Gestionnaire</th>
                  <th className="p-4">Progression</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-300">{c.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{c.client}</div>
                      {c.hasUrgentRFE && (
                        <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                          <AlertOctagon className="w-3 h-3" /> NOID Reçue
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-200">{c.petition}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {c.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-200 font-bold">{c.deadline}</div>
                      <div className={`text-[10px] font-mono font-bold ${
                        c.daysRemaining <= 7 ? 'text-rose-400' : 'text-slate-500'
                      }`}>
                        J-{c.daysRemaining} restant(s)
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{c.officer}</td>
                    <td className="p-4">
                      <div className="w-24 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>{c.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full" 
                            style={{ width: `${c.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Ouverture du dossier ${c.id} pour ${c.client}`)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px]"
                      >
                        Consulter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: BANC D'ASSERMENTATION (RELECTURE MIROIR 8 CFR) */}
      {activeTab === 'notary_bench' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
                <Stamp className="w-4 h-4" />
                Banc d'Assermentation 8 CFR § 1003.33
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Interface de Relecture Miroir & Apposition du Sceau
              </h3>
              <p className="text-xs text-slate-400">
                Confrontation ligne à ligne de l'original scanné avec la traduction certifiée anglaise avant scellage notarié officiel.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyStamp}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                  notaryStamped
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <Stamp className="w-4 h-4" />
                {notaryStamped ? "Sceau Apposé & Certifié" : "Apposer le Sceau Notarié & Signature"}
              </button>
            </div>
          </div>

          {/* Split-Screen Mirror View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Panel: Original Document */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                  📄 Original Scanné (Français)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Scan HD 300 DPI · Guichet Cincinnati
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-serif text-xs text-slate-300 space-y-3 leading-relaxed">
                <div className="text-center font-bold text-white uppercase text-sm border-b border-slate-800 pb-2">
                  RÉPUBLIQUE DÉMOCRATIQUE DU CONGO<br />
                  <span className="text-[10px] font-normal text-slate-400">VILLE DE KINSHASA · ÉTAT CIVIL</span>
                </div>
                <div className="font-bold text-slate-200">EXTRAIT D'ACTE DE NAISSANCE N° 4419/2026</div>
                <p>
                  L'an deux mille, le quatorze mars, à zéro heure quarante minutes, est né à Kinshasa, 
                  <strong> LELO, Jean-Marc </strong>, de sexe masculin, de nationalité congolaise.
                </p>
                <p>
                  Fils de Lelo Mbemba et de Kiese Pauline. Dressé par l'Officier de l'État Civil soussigné 
                  sur déclaration du père.
                </p>
                <div className="pt-2 text-[10px] text-slate-500 italic">
                  [Sceau rond officiel de la Commune de Ngaliema apposé au recto]
                </div>
              </div>
            </div>

            {/* Right Panel: Certified English Translation */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">
                  ⚖️ Certified English Translation (8 CFR § 1003.33)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Compliant USCIS / EOIR
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-serif text-xs text-slate-200 space-y-3 leading-relaxed">
                <div className="text-center font-bold text-white uppercase text-sm border-b border-slate-800 pb-2">
                  DEMOCRATIC REPUBLIC OF THE CONGO<br />
                  <span className="text-[10px] font-normal text-slate-400">CITY OF KINSHASA · CIVIL REGISTRY OFFICE</span>
                </div>
                <div className="font-bold text-purple-300">BIRTH CERTIFICATE EXTRACT NO. 4419/2026</div>
                <p>
                  In the year two thousand, on March fourteenth, at 00:40 AM, was born in Kinshasa, 
                  <strong> LELO, Jean-Marc </strong>, male, Congolese citizenship.
                </p>
                <p>
                  Son of Lelo Mbemba and Kiese Pauline. Drawn up by the undersigned Civil Status Officer 
                  upon father's declaration.
                </p>

                {/* Formal 8 CFR § 1003.33 Attestation Clause */}
                <div className="pt-3 border-t border-purple-800/40 text-[11px] text-slate-300 bg-purple-950/20 p-3 rounded-lg border border-purple-900/50 space-y-1">
                  <div className="font-bold text-purple-300 uppercase text-[10px] font-mono">
                    CERTIFICATE OF ACCURACY (8 CFR § 1003.33)
                  </div>
                  <p className="italic text-[10px] text-slate-400">
                    "I, Sarah Jenkins, certify that I am competent to translate from French to English, 
                    and that the above translation is true and accurate to the best of my knowledge and belief."
                  </p>
                  {notaryStamped && (
                    <div className="pt-2 flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{stampTimestamp}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 4: MÉTRIQUES DU BUREAU & FACTURATION */}

      {/* KANBAN VIEW */}
      {activeTab === 'kanban' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
            <LayoutDashboard className="w-4 h-4" />
            Kanban - Tableaux de Suivi par Pôle
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto pb-4">
            {/* Pôle Juridique Column */}
            <div className="flex flex-col bg-slate-800/50 rounded-2xl p-4 min-w-[300px]">
              <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  Pôle Juridique
                </h4>
                <span className="bg-slate-700 text-xs px-2 py-0.5 rounded-full text-slate-300">3</span>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 cursor-grab hover:border-purple-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-purple-300">Asile I-589</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 rounded">Urgent</span>
                  </div>
                  <p className="text-sm text-white font-medium mb-2">Dossier Lelo-Mumbanda</p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> J-2</span>
                    <span>Alexandre K.</span>
                  </div>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 cursor-grab hover:border-purple-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-purple-300">Regroupement I-130</span>
                  </div>
                  <p className="text-sm text-white font-medium mb-2">Famille Diallo</p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> J-5</span>
                    <span>Marie L.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pôle Finance Column */}
            <div className="flex flex-col bg-slate-800/50 rounded-2xl p-4 min-w-[300px]">
              <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Pôle Finance
                </h4>
                <span className="bg-slate-700 text-xs px-2 py-0.5 rounded-full text-slate-300">2</span>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 cursor-grab hover:border-emerald-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-emerald-300">Taxes 1040</span>
                  </div>
                  <p className="text-sm text-white font-medium mb-2">Déclaration S. Kim</p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3 h-3"/> Revue</span>
                    <span>Jean P.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pôle Carrière Column */}
            <div className="flex flex-col bg-slate-800/50 rounded-2xl p-4 min-w-[300px]">
              <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  Pôle Carrière
                </h4>
                <span className="bg-slate-700 text-xs px-2 py-0.5 rounded-full text-slate-300">1</span>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 cursor-grab hover:border-blue-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-300">CV & Cover Letter</span>
                  </div>
                  <p className="text-sm text-white font-medium mb-2">Traduction M. Ndoye</p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> En cours</span>
                    <span>Sophie T.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeTab === 'metrics' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
              <CreditCard className="w-4 h-4" />
              Pilotage Financier & Volumes du Guichet
            </div>
            <h3 className="text-xl font-bold text-white">
              Chiffre d'Affaires des Micro-Actes & Rétrocessions
            </h3>
            <p className="text-xs text-slate-400">
              Supervision des paiements Stripe/PayPal et des avoirs parrainages octroyés aux adhérents.
            </p>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Chiffre d'Affaires Mensuel</span>
              <div className="text-2xl font-black font-mono text-emerald-400">$4,350.00</div>
              <div className="text-[11px] text-emerald-500 font-semibold">+18.5% vs mois dernier</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">En Attente de Règlement</span>
              <div className="text-2xl font-black font-mono text-amber-400">$850.00</div>
              <div className="text-[11px] text-slate-400">3 factures en cours</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Crédits Parrainage Déduits</span>
              <div className="text-2xl font-black font-mono text-purple-400">-$1,250.00</div>
              <div className="text-[11px] text-slate-400">25 filleuls validés ($50/ch.)</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Taux de Recouvrement</span>
              <div className="text-2xl font-black font-mono text-white">95.4%</div>
              <div className="text-[11px] text-slate-400">SLA paiement sous 48h</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: MANIFEST JSON VIEWER */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-bold text-white">Manifest JSON Officiel · SOP-LD05-OPS-001</h4>
              </div>
              <button 
                onClick={() => setShowJsonModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-80 border border-slate-800">
              {JSON.stringify(manifestJsonData, null, 2)}
            </pre>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(manifestJsonData, null, 2));
                  alert("Manifest JSON copié dans le presse-papier !");
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Copier le JSON
              </button>
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PACK D'EXHIBITS VIEWER */}
      {showExhibitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold text-white">Liasse d'Exhibits Conforme EOIR / USCIS</h4>
              </div>
              <button 
                onClick={() => setShowExhibitModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>Pagination déterministe avec intercalaires normés :</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="text-emerald-400 font-bold">Exhibit A · Pages 01-04 (Orig. Civil Status)</div>
                <div className="text-blue-400 font-bold">Exhibit B · Pages 05-08 (8 CFR Translation + Cert)</div>
                <div className="text-purple-400 font-bold">Exhibit C · Pages 09-12 (Notarized Affidavit)</div>
                <div className="text-slate-400">Total : 12 pages avec reliure sécurisée deux trous supérieurs</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  alert("Impression de la liasse scellée lancée sur l'imprimante thermique du bureau !");
                  setShowExhibitModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Lancer l'Impression
              </button>
              <button
                onClick={() => setShowExhibitModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

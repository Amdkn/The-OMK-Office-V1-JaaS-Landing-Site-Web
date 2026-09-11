import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { 
  LayoutDashboard, Users, FileText, Bot, CreditCard, BookOpen, Settings, 
  Search, Plus, Download, CheckCircle, Clock, AlertTriangle, ArrowRight, 
  ExternalLink, Sparkles, Filter, X, Shield, Briefcase, RefreshCw, Send, 
  CheckCircle2, Building2, Smartphone, Monitor
} from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  service: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-001",
    client: "John Smith",
    service: "Immigration Visa (Formulaire I-589 & I-765)",
    amount: 1500,
    dueDate: "10/7/2025",
    status: "Paid"
  },
  {
    id: "INV-002",
    client: "Maria Garcia",
    service: "Tax Preparation (1040 Schedule C & ITIN)",
    amount: 850,
    dueDate: "10/15/2025",
    status: "Pending"
  },
  {
    id: "INV-003",
    client: "Jean-Marc Lelo",
    service: "Abonnement Annuel JaaS Pro ($300/an)",
    amount: 300,
    dueDate: "09/01/2025",
    status: "Paid"
  },
  {
    id: "INV-004",
    client: "David K.",
    service: "Constitution Express LLC & Enregistrement Ohio",
    amount: 350,
    dueDate: "08/20/2025",
    status: "Overdue"
  },
  {
    id: "INV-005",
    client: "Fatou Diallo",
    service: "Traduction Assermentée 8 CFR (3 Actes Civils)",
    amount: 135,
    dueDate: "10/22/2025",
    status: "Paid"
  }
];

const INITIAL_CLIENTS = [
  {
    id: "CLI-01",
    name: "John Smith",
    email: "j.smith@corp.com",
    case: "Immigration Visa Form I-589",
    status: "En révision légale",
    stage: "Étape 3/5",
    manager: "Sarah Jenkins",
    date: "10/02/2025",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  },
  {
    id: "CLI-02",
    name: "Maria Garcia",
    email: "m.garcia@outlook.com",
    case: "Tax Preparation 1040 + W-7 ITIN",
    status: "Pièces en attente",
    stage: "Étape 2/4",
    manager: "Alexandre K.",
    date: "09/28/2025",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  },
  {
    id: "CLI-03",
    name: "Jean-Marc Lelo",
    email: "jm.lelo@gmail.com",
    case: "Asile & Régularisation Formulaire I-589 / I-765",
    status: "Traduction certifiée transmise",
    stage: "Étape 3/5 (SLA 45m OK)",
    manager: "Sarah Jenkins",
    date: "10/05/2025",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  {
    id: "CLI-04",
    name: "David K.",
    email: "david.k@logisticsohio.com",
    case: "Création Société LLC Ohio + EIN",
    status: "Rappel de paiement émis",
    stage: "Étape 1/3",
    manager: "Alexandre K.",
    date: "08/18/2025",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  },
  {
    id: "CLI-05",
    name: "Fatou Diallo",
    email: "fatou.d@afroexpress.org",
    case: "Dispatch Logistique Hub Amazon CVG",
    status: "Enrôlement validé",
    stage: "Étape 4/4",
    manager: "Sarah Jenkins",
    date: "10/01/2025",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  }
];

export function StaffOperationsView() {
  const { currentUser, currentRole } = useUser();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'documents' | 'ai-agents' | 'payments' | 'sop' | 'settings'>('payments');
  const [paymentSubTab, setPaymentSubTab] = useState<'invoices' | 'transactions'>('invoices');
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [searchInvoice, setSearchInvoice] = useState("");
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
  
  // Modal state for Create Invoice
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newService, setNewService] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // AI Assistant Sandbox state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient || !newAmount) return;

    const newInv: Invoice = {
      id: `INV-00${invoices.length + 1}`,
      client: newClient,
      service: newService || "Service Administratif & Légal 8 CFR",
      amount: parseFloat(newAmount) || 250,
      dueDate: newDueDate || "11/01/2025",
      status: "Pending"
    };

    setInvoices([newInv, ...invoices]);
    setIsCreateModalOpen(false);
    setNewClient("");
    setNewService("");
    setNewAmount("");
    setNewDueDate("");
  };

  const handleDownloadPdf = (invId: string) => {
    setDownloadSuccess(invId);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleAiCheck = () => {
    if (!aiPrompt.trim()) return;
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setAiResponse(`✓ Analyse de conformité 8 CFR complétée pour "${aiPrompt}" :
- Vérification préliminaire : Pièces admissibles selon 8 CFR § 1003.33 (Certificat de traduction requis).
- Recommandation Case Manager : Joindre les affidavits d'identité et vérifier l'horodatage notarié.
- SLA estimé d'exécution au guichet Cincinnati : 45 minutes.`);
      setIsAiAnalyzing(false);
    }, 900);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.client.toLowerCase().includes(searchInvoice.toLowerCase()) || 
                          inv.service.toLowerCase().includes(searchInvoice.toLowerCase()) ||
                          inv.id.toLowerCase().includes(searchInvoice.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-[#0B0F19] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[720px]">
      
      {/* Internal Staff Sidebar (Inspired directly by Lovable omk-flow-os prototype) */}
      <div className="w-full md:w-64 bg-[#080C14] border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Brand Header */}
          <div className="flex items-center gap-3 px-3 py-4 mb-3 border-b border-slate-800/60">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>OMK Service</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  OPS
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">Hub Central Cincinnati</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? "bg-slate-800/90 text-white shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'clients'
                  ? "bg-slate-800/90 text-white shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Clients</span>
              <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                5
              </span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'documents'
                  ? "bg-slate-800/90 text-white shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Documents</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-agents')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'ai-agents'
                  ? "bg-slate-800/90 text-white shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Bot className="w-4 h-4 text-pink-400" />
              <span>AI Agents</span>
              <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 animate-pulse">
                LIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'payments'
                  ? "bg-purple-950/40 text-purple-300 border border-purple-800/50 shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>Payments</span>
            </button>

            <button
              onClick={() => setActiveTab('sop')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'sop'
                  ? "bg-slate-800/90 text-white shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>SOP Library</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? "bg-slate-800/90 text-white shadow-inner font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Advanced Virtual OS Launchers (Before complex Web OS / Mobile OS transition) */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3">
              Passerelles Systèmes Avancées
            </div>

            <a
              href="https://omk-desktop-web-os.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 text-slate-300 text-xs transition-colors group"
            >
              <span className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Web Desktop OS</span>
              </span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-purple-400" />
            </a>

            <a
              href="https://the-omk-mobile-back-office.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 text-xs transition-colors group"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Mobile OS Simulator</span>
              </span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
            </a>
          </div>
        </div>

        {/* Sidebar Footer User Info (matching prototype) */}
        <div className="pt-4 border-t border-slate-800/80 mt-6 px-2 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentUser.avatarBg}`}>
            {currentUser.initials}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] font-mono text-slate-400 truncate">{currentUser.email}</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-5 md:p-8 overflow-y-auto max-h-[800px]">
        
        {/* VIEW 1: PAYMENTS MANAGEMENT (Exact reproduction of Lovable omk-flow-os prototype) */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Payment Management
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Automated billing with Stripe/PayPal integration
                </p>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-purple-600/25 transition-all self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </button>
            </div>

            {/* 4 Metric Cards (Identical to screenshot 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Revenue */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-400">Total Revenue</div>
                  <div className="text-2xl font-black text-white mt-1">$4,350</div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Pending */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-400">Pending</div>
                  <div className="text-2xl font-black text-white mt-1">$850</div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Overdue */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-400">Overdue</div>
                  <div className="text-2xl font-black text-white mt-1">$350</div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>

              {/* Collection Rate */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-400">Collection Rate</div>
                  <div className="text-2xl font-black text-white mt-1">95%</div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Sub-Tabs: Invoices / Transactions */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setPaymentSubTab('invoices')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  paymentSubTab === 'invoices'
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Invoices ({filteredInvoices.length})
              </button>
              <button
                onClick={() => setPaymentSubTab('transactions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  paymentSubTab === 'transactions'
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Transactions
              </button>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-slate-500 hidden sm:inline">Filtrer par statut :</span>
                {(['All', 'Paid', 'Pending', 'Overdue'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      statusFilter === status
                        ? "bg-purple-600 text-white font-bold"
                        : "bg-slate-800/80 text-slate-400 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar (matching prototype) */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInvoice}
                onChange={(e) => setSearchInvoice(e.target.value)}
                placeholder="Search invoices..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Invoices List (exact visual style from prototype) */}
            {paymentSubTab === 'invoices' && (
              <div className="space-y-3">
                {filteredInvoices.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
                    Aucune facture trouvée pour "{searchInvoice}".
                  </div>
                ) : (
                  filteredInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start md:items-center gap-4">
                        {/* Currency Icon Box */}
                        <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 text-sm shrink-0">
                          $
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{inv.id}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full ${
                              inv.status === 'Paid'
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : inv.status === 'Pending'
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }`}>
                              {inv.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                            <span>Client: <strong className="text-slate-200">{inv.client}</strong></span>
                            <span>Service: <span className="text-slate-300">{inv.service}</span></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                        <div className="text-left md:text-right">
                          <div className="text-xs text-slate-400">Amount</div>
                          <div className="text-sm font-black text-white">${inv.amount.toLocaleString()}</div>
                          <div className="text-[10px] font-mono text-slate-500">Due: {inv.dueDate}</div>
                        </div>

                        <button
                          onClick={() => handleDownloadPdf(inv.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-purple-400" />
                          <span>{downloadSuccess === inv.id ? "Téléchargé ✓" : "Download PDF"}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Transactions History Tab */}
            {paymentSubTab === 'transactions' && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-3">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>Passerelles Stripe & PayPal Connectées</span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Webhook Actif 24/7
                  </span>
                </div>
                <div className="space-y-2 text-slate-400 text-[11px] font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex justify-between">
                    <span>TX-88219 · Stripe Payout Cincinnati LLC</span>
                    <span className="text-emerald-400">+$1,500.00 (Cleared)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex justify-between">
                    <span>TX-88220 · PayPal Checkout JaaS Annual</span>
                    <span className="text-emerald-400">+$300.00 (Cleared)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex justify-between">
                    <span>TX-88221 · Stripe Invoice INV-005 Assermentation</span>
                    <span className="text-emerald-400">+$135.00 (Cleared)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">Cockpit des Opérations · Hub Cincinnati</h2>
              <p className="text-xs text-slate-400 mt-1">
                Supervision temps réel des 3 Pôles d'actes (Légal 8 CFR, Fiscalité 1040, Dispatch CVG)
              </p>
            </div>

            {/* Hub Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Dossiers en cours d'instruction</div>
                <div className="text-3xl font-black text-blue-400 mt-1">14</div>
                <div className="text-[11px] text-slate-500 mt-1">3 assignés aujourd'hui (SLA 45m)</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Taux de délivrance des actes</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">99.2%</div>
                <div className="text-[11px] text-slate-500 mt-1">Zéro rejet formel USCIS</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Guichet Physique Cincinnati</div>
                <div className="text-3xl font-black text-purple-400 mt-1">8 RDV</div>
                <div className="text-[11px] text-slate-500 mt-1">2600 Civic Center Dr (Ohio)</div>
              </div>
            </div>

            {/* Recent Operations Log */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Journal des Dernières Actions Notariées & Légales
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white">Traduction certifiée 8 CFR scellée</span>
                      <span className="text-slate-400 text-[11px] block">Dossier Jean-Marc Lelo (Acte de naissance & extrait d'asile)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Il y a 24 min</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="font-bold text-white">Relance automatique W-7 ITIN émise</span>
                      <span className="text-slate-400 text-[11px] block">Client Maria Garcia (Validation du passeport certifié)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Il y a 1h 12m</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CLIENTS CRM */}
        {activeTab === 'clients' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Répertoire des Clients & Titulaires</h2>
                <p className="text-xs text-slate-400">Suivi individualisé par Case Manager et statut d'instruction</p>
              </div>
              <span className="text-xs font-mono bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                5 Dossiers Actifs
              </span>
            </div>

            <div className="space-y-3">
              {INITIAL_CLIENTS.map((client) => (
                <div
                  key={client.id}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{client.name}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${client.badgeColor}`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-mono">{client.case}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-1 font-mono">
                      <span>Email : {client.email}</span>
                      <span>•</span>
                      <span>Manager : {client.manager}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">{client.stage}</span>
                    <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors" aria-label="Ouvrir le dossier du client">
                      Ouvrir Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: DOCUMENTS VAULT */}
        {activeTab === 'documents' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Coffre-fort Légal & Preuves 8 CFR</h2>
                <p className="text-xs text-slate-400">Actes originaux, traductions scellées, formulaires USCIS et récépissés</p>
              </div>
              <button className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                Sceller un Nouveau Document
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Formulaire I-589 scellé (LELO-JM)</div>
                  <div className="text-slate-400 text-[11px] font-mono mt-0.5">Certifié 8 CFR § 1003.33 · 28 Pages PDF</div>
                </div>
                <button aria-label="Télécharger le document" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Déclaration Fiscale 1040-NR (GARCIA)</div>
                  <div className="text-slate-400 text-[11px] font-mono mt-0.5">ITIN Assigné W-7 · Cachet Bureau Cincinnati</div>
                </div>
                <button aria-label="Télécharger le document" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: AI AGENTS */}
        {activeTab === 'ai-agents' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Bot className="w-6 h-6 text-pink-400" />
                Agent d'Intake & Conformité Légale
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Audit automatique des pièces d'immigration, détection des risques de Notice of Intent to Deny (NOID)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-300">Tester une requête ou vérifier un acte légal :</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ex : Vérifier validité acte de naissance sans mention marginale pour I-589..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
                <button
                  onClick={handleAiCheck}
                  disabled={isAiAnalyzing}
                  className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {isAiAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Auditer</span>
                </button>
              </div>

              {aiResponse && (
                <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-800/40 text-xs font-mono text-pink-200 whitespace-pre-line leading-relaxed">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 6: SOP LIBRARY */}
        {activeTab === 'sop' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-black text-white">SOP Library · Procédures Opérationnelles</h2>
              <p className="text-xs text-slate-400 mt-1">Protocoles standardisés pour les collaborateurs The OMK Office</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-white text-sm">SOP-01 : Assermentation et Certification 8 CFR § 1003.33</div>
                <p className="text-slate-400 mt-1">Délai d'exécution max 45 min pour traduction d'actes d'état civil.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-white text-sm">SOP-02 : Enrôlement JaaS et Amortissement $50 par Filleul</div>
                <p className="text-slate-400 mt-1">Calcul automatisé du solde parrainage et émission de l'avoir fiscal.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-black text-white">Configuration Opérationnelle & Sécurité RLS</h2>
              <p className="text-xs text-slate-400 mt-1">Paramètres du cabinet physique de Cincinnati et des accès PostgreSQL</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Siège Permanent :</span>
                <span className="font-bold text-white">2600 Civic Center Dr, Cincinnati, OH 45216</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Politiques RLS Actives :</span>
                <span className="font-mono text-emerald-400">14 Règles (auth.uid() isolation stricte)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Mode Facturation Actif :</span>
                <span className="font-bold text-purple-400">Stripe Invoicing & PayPal Connect</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CREATE INVOICE MODAL (matching screenshot action) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white">Create New Invoice</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Client Name :</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Service Provided :</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Immigration Visa Form I-589"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Amount ($) :</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Due Date :</label>
                  <input
                    type="text"
                    placeholder="11/15/2025"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-lg shadow-purple-600/30"
                >
                  Save & Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

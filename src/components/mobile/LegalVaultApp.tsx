import { useState } from "react"
import { 
  Scale, ShieldCheck, UploadCloud, HardDrive, Calendar, CheckCircle2, 
  FileText, Download, Check, RefreshCw, AlertTriangle, Eye, ArrowRight,
  Stamp, Lock, FileCheck, Layers, ChevronRight, Hash, Sparkles
} from "lucide-react"
import { appEventBus } from "@/src/lib/appEventBus"

interface IngestedDoc {
  id: string;
  name: string;
  category: 'Actes Civils' | 'Jugements' | 'Scolarité' | 'Santé';
  date: string;
  source: 'Local USB P2P' | 'Camera Scan HiFi';
  size: string;
  hash: string;
  status: 'ingested' | 'verified';
  originalExcerpt: string;
  translationExcerpt: string;
}

const DEFAULT_DOCS: IngestedDoc[] = [
  {
    id: "DOC_001",
    name: "DOC_001_Jugement_Adoption_TGI_Kinshasa.jpg",
    category: "Jugements",
    date: "2012-11-15",
    source: "Local USB P2P",
    size: "4.8 MB",
    hash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "verified",
    originalExcerpt: "EXTRAIT DU JUGEMENT CIVIL SOUS RC 441/2012 : Le Tribunal de Grande Instance de Kinshasa déclare l'adoption plénière de l'enfant LELO-MUMBANDA par les époux requérants avec autorité parentale immédiate.",
    translationExcerpt: "VERBATIM EXTRACT UNDER 8 CFR § 103.2(b)(3): The High Court of Kinshasa formally grants the full adoption of minor child LELO-MUMBANDA to petitioner spouses with immediate legal custody and parental authority."
  },
  {
    id: "DOC_002",
    name: "DOC_002_Acte_Naissance_Legalise_MinJust.jpg",
    category: "Actes Civils",
    date: "2013-01-02",
    source: "Local USB P2P",
    size: "3.2 MB",
    hash: "sha256:8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    status: "verified",
    originalExcerpt: "ACTE DE NAISSANCE N° 8901 : Délivré conforme au registre d'état civil, scellé du timbre fiscal et certifié par l'Officier de l'État Civil de la Commune de la Gombe.",
    translationExcerpt: "OFFICIAL BIRTH CERTIFICATE NO. 8901: Delivered true and conform to the civil register, sealed with fiscal stamps and certified by Civil Registrar of Gombe Municipality."
  },
  {
    id: "DOC_003",
    name: "DOC_003_Certificats_Scolarite_Continus.pdf",
    category: "Scolarité",
    date: "2013-09-10",
    source: "Camera Scan HiFi",
    size: "5.1 MB",
    hash: "sha256:59e108a7f9202521e25e0e0a58145bb3864a78c187e07a2c0792161b95ff8831",
    status: "verified",
    originalExcerpt: "ATTESTATION DE FRÉQUENTATION SCOLAIRE : Établie par la Direction du Complexe Mgr Bokeleale attestant de l'inscription continue pour l'année scolaire 2013-2014 sous la garde effective des requérants.",
    translationExcerpt: "CONTINUOUS SCHOOL ATTENDANCE CERTIFICATE: Established by Principal confirming regular attendance for academic year 2013-2014 under effective custody and care of petitioners."
  },
  {
    id: "DOC_004",
    name: "DOC_004_Carnet_Sante_Vaccinal_Pediatrique.jpg",
    category: "Santé",
    date: "2014-03-18",
    source: "Local USB P2P",
    size: "2.9 MB",
    hash: "sha256:3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b",
    status: "verified",
    originalExcerpt: "CARNET DE SUIVI MÉDICAL PÉDIATRIQUE : Consultations trimestrielles et carnet de vaccinations signé par le Médecin Chef du Centre Hospitalier Monkole, acquitté par le père adoptif.",
    translationExcerpt: "PEDIATRIC HEALTH RECORD: Quarterly health checkups and vaccination logs executed by Chief Physician at Monkole Hospital Center, financially endorsed by adoptive father."
  },
  {
    id: "DOC_005",
    name: "DOC_005_Attestation_Residence_Cohabitation.pdf",
    category: "Actes Civils",
    date: "2015-05-20",
    source: "Camera Scan HiFi",
    size: "4.4 MB",
    hash: "sha256:2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef9f5402150e4",
    status: "verified",
    originalExcerpt: "ATTESTATION DE COHABITATION DU CHEF DE QUARTIER : Certifie que l'enfant LELO-MUMBANDA a résidé de manière ininterrompue au domicile familial du 15/11/2012 au 20/05/2015 (30 mois).",
    translationExcerpt: "MUNICIPAL COHABITATION ATTESTATION: Certifies minor child LELO-MUMBANDA resided continuously at family residence from 11/15/2012 to 05/20/2015 (30 continuous months)."
  }
];

export function LegalVaultApp({ onClose }: { onClose?: () => void }) {
  const [currentScreen, setCurrentScreen] = useState<'intake' | 'chrono' | 'notary'>('intake')
  const [docs, setDocs] = useState<IngestedDoc[]>(DEFAULT_DOCS)
  const [isIngesting, setIsIngesting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')
  const [activeDocIndex, setActiveDocIndex] = useState<number>(0)
  const [isSigned, setIsSigned] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showManifestJson, setShowManifestJson] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Action: Ingestion fast drop
  const handleFastDrop = () => {
    setIsIngesting(true)
    setTimeout(() => {
      setIsIngesting(false)
      appEventBus.emit('EVENT_INTAKE_BATCH_LOADED', 'LegalVault', {
        batchId: 'BATCH-NOID-LELO-2026',
        fileCount: docs.length,
        totalSize: '20.4 MB',
        airGapped: true,
        protocol: 'SOP-LD05-OPS-001'
      })
      showToast("✓ 5 documents ingérés localement (Air-Gapped P2P) - Event émis")
    }, 600)
  }

  // Action: Validate Chrono
  const handleValidateChrono = () => {
    appEventBus.emit('EVENT_CHRONO_VALIDATED', 'LegalVault', {
      caseId: 'USCIS-I130-NOID',
      startDate: '2012-11-15',
      endDate: '2015-05-20',
      calculatedIntervalMonths: 30,
      inaStatutoryMonthsRequired: 24,
      compliant: true,
      gapsCount: 0
    })
    showToast("✓ Continuité 30 mois validée (INA 8 CFR ≥ 24m) - Event émis")
    setCurrentScreen('notary')
  }

  // Action: Compile Legal Brief
  const handleCompileBrief = () => {
    appEventBus.emit('EVENT_LEGAL_BRIEF_COMPILED', 'LegalVault', {
      manifestId: 'manifest_exhibits.json',
      pagesCount: 23,
      notary: 'Ousmane Kounta, Certified Notary Public',
      statutoryRef: '8 CFR § 103.2(b)(3)',
      outputPdf: 'NOID_Rebuttal_Lelo_Mumbanda_23p_PrintReady.pdf',
      batStatus: 'APPROVED_SINGLE_PASS'
    })
    showToast("✓ Pack 23 pages compilé & BAT validé - Prêt pour USCIS !")
  }

  const filteredDocs = selectedCategory === 'Tous' 
    ? docs 
    : docs.filter(d => d.category === selectedCategory)

  const activeDoc = docs[activeDocIndex] || docs[0]

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 rounded-3xl p-3 sm:p-4 overflow-hidden text-xs relative font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-2 inset-x-4 z-50 bg-emerald-600 text-white text-[11px] font-bold p-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* TOP APP HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/40 relative">
            <Scale className="w-4 h-4" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-slate-900 flex items-center justify-center">
              <Check className="w-2 h-2 text-slate-950 stroke-[3]" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-black text-white tracking-tight">Legal Vault</h2>
              <span className="text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 py-0.2 rounded">
                Pôle 1
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Preuves & NOID Rebuttal OS</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SOP-LD05</span>
        </div>
      </div>

      {/* 3-STEP TACTILE TAB BAR */}
      <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 mb-3 shrink-0">
        <button
          onClick={() => setCurrentScreen('intake')}
          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
            currentScreen === 'intake'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HardDrive className="w-3 h-3" />
          <span>1. Intake</span>
        </button>

        <button
          onClick={() => setCurrentScreen('chrono')}
          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
            currentScreen === 'chrono'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3 h-3" />
          <span>2. Chrono</span>
        </button>

        <button
          onClick={() => setCurrentScreen('notary')}
          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
            currentScreen === 'notary'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Stamp className="w-3 h-3" />
          <span>3. Notaire</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SCREEN 1: INTAKE & FAST DROP                              */}
      {/* ========================================================= */}
      {currentScreen === 'intake' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden space-y-2.5 animate-in fade-in">
          
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3" /> Transfert Souverain Air-Gapped
              </span>
              <span className="text-[10px] font-bold text-slate-400">Zero Cloud Leak</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Découplage complet des clouds commerciaux. Ingestion directe P2P pour pièces d'immigration critiques.
            </p>
          </div>

          {/* Drag & Fast Drop Simulation Box */}
          <div 
            onClick={handleFastDrop}
            className="border-2 border-dashed border-blue-500/40 hover:border-blue-400 bg-blue-950/20 hover:bg-blue-950/40 rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              {isIngesting ? <RefreshCw className="w-5 h-5 animate-spin text-amber-400" /> : <UploadCloud className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs font-black text-white block">
                {isIngesting ? "Ingestion locale en cours..." : "Fast Drop : Importer Lot P2P / Clé USB"}
              </span>
              <span className="text-[10px] text-slate-400">
                Format RAW/JPG/PDF haute fidélité (Affaires LELO-MUMBANDA)
              </span>
            </div>
          </div>

          {/* Ingested Document Counter List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1">
              <span>Pièces Ingestion ({docs.length} fichiers)</span>
              <span className="text-emerald-400 font-mono">20.4 MB TOTAL</span>
            </div>

            {docs.map((doc, idx) => (
              <div 
                key={doc.id}
                className="bg-slate-900 border border-slate-800/90 p-2 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-blue-900/40 border border-blue-500/30 text-blue-300 flex items-center justify-center font-mono text-[9px] font-black shrink-0">
                    {idx + 1}
                  </div>
                  <div className="truncate text-left">
                    <span className="text-[11px] font-bold text-white block truncate">{doc.name}</span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {doc.category} · {doc.size} · {doc.source}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    HASH OK
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Navigation Button */}
          <button
            onClick={() => {
              appEventBus.emit('EVENT_INTAKE_BATCH_LOADED', 'LegalVault', {
                batchId: 'BATCH-NOID-LELO-2026',
                fileCount: docs.length,
                totalSize: '20.4 MB'
              })
              setCurrentScreen('chrono')
            }}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Passer à la Matrice Chronologique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 2: CHRONOLOGY MATRIX                               */}
      {/* ========================================================= */}
      {currentScreen === 'chrono' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden space-y-2 animate-in fade-in">
          
          {/* Statutory Verification Box */}
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-2xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Règle INA & 8 CFR § 204.2
              </span>
              <span className="text-[10px] font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Seuil ≥ 24 Mois Validé
              </span>
            </div>
            <div className="text-sm font-black text-white">
              Intervalle continu : <span className="text-emerald-400">30 Mois et 5 Jours</span>
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5 flex items-center justify-between">
              <span>Du 15/11/2012 au 20/05/2015</span>
              <span className="font-bold text-emerald-400">Rupture : 0 Jour</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 shrink-0 [&::-webkit-scrollbar]:hidden">
            {['Tous', 'Jugements', 'Actes Civils', 'Scolarité', 'Santé'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Timeline Interactive List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 relative pl-3 border-l-2 border-blue-500/30 my-1">
            {filteredDocs.map((doc, idx) => (
              <div 
                key={doc.id}
                onClick={() => {
                  const originalIdx = docs.findIndex(d => d.id === doc.id);
                  setActiveDocIndex(originalIdx);
                }}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer relative text-left ${
                  docs[activeDocIndex].id === doc.id
                    ? 'bg-slate-900 border-blue-500 shadow-md'
                    : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[19px] top-4 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950 ring-2 ring-blue-500/20"></div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400">{doc.date}</span>
                  <span className="text-[9px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {doc.category}
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-white truncate">{doc.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{doc.originalExcerpt}</p>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleValidateChrono}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 shrink-0"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Valider la Continuité & Émettre Event</span>
          </button>

        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 3: NOTARY & VERBATIM PREVIEW                       */}
      {/* ========================================================= */}
      {currentScreen === 'notary' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden space-y-2 animate-in fade-in">
          
          {/* Header Compliance Rule */}
          <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between shrink-0">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                Conformité Miroir 8 CFR § 103.2(b)(3)
              </span>
              <span className="text-[11px] font-extrabold text-white">
                {activeDoc.id} · Traduction Assermentée Notariée
              </span>
            </div>
            <button
              onClick={() => setShowManifestJson(!showManifestJson)}
              className="text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-lg hover:bg-amber-500/20"
            >
              {showManifestJson ? "Voir Split" : "manifest.json"}
            </button>
          </div>

          {showManifestJson ? (
            /* Manifest JSON Inspector */
            <div className="flex-1 bg-black p-3 rounded-2xl border border-slate-800 font-mono text-[9px] text-emerald-400 overflow-y-auto space-y-1 text-left">
              <p className="text-slate-400">// manifest_exhibits.json - Export Déterministe OMK</p>
              <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">
{JSON.stringify({
  manifest_version: "SOP-LD05-OPS-001",
  case_reference: "USCIS-I130-NOID-LELO-MUMBANDA",
  execution_latency: "45 minutes chrono",
  certified_notary: "Ousmane Kounta, Commission Ohio",
  regulation: "8 CFR § 103.2(b)(3)",
  total_pages: 23,
  bat_validation: "APPROVED_SINGLE_PASS",
  unbroken_cohabitation_months: 30.2,
  exhibits: docs.map(d => ({
    id: d.id,
    date: d.date,
    category: d.category,
    sha256: d.hash.slice(0, 24) + "...",
    status: "CERTIFIED_MIRROR"
  }))
}, null, 2)}
              </pre>
            </div>
          ) : (
            /* Tactile Split-View: Original vs Certified Translation */
            <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden">
              
              {/* Left Column: Original Stamped Document */}
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl flex flex-col justify-between overflow-hidden text-left">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400">Document Original</span>
                    <span className="text-[8px] font-mono text-amber-400 bg-amber-500/10 px-1 rounded">RDC / TGI</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80 mb-2">
                    <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono mb-1">
                      <Stamp className="w-3 h-3 text-amber-400" />
                      <span>Tampon Officiel & Timbre</span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-serif leading-relaxed italic">
                      "{activeDoc.originalExcerpt}"
                    </p>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-slate-500 truncate">
                  SHA-256: {activeDoc.hash.slice(0, 16)}...
                </div>
              </div>

              {/* Right Column: Certified Translation with Notary Block */}
              <div className="bg-blue-950/30 border border-blue-500/40 p-2.5 rounded-2xl flex flex-col justify-between overflow-hidden text-left">
                <div>
                  <div className="flex items-center justify-between border-b border-blue-500/30 pb-1 mb-1.5">
                    <span className="text-[9px] font-bold uppercase text-blue-300">Certified Translation</span>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">USCIS READY</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-blue-500/20 mb-2">
                    <div className="flex items-center gap-1 text-[9px] text-blue-400 font-mono mb-1">
                      <FileCheck className="w-3 h-3 text-emerald-400" />
                      <span>8 CFR § 103.2(b)(3) Verbatim</span>
                    </div>
                    <p className="text-[10px] text-slate-200 font-sans leading-relaxed">
                      "{activeDoc.translationExcerpt}"
                    </p>
                  </div>
                </div>

                {/* Notary Seal Block */}
                <div className="bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 text-[8px] text-slate-300">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Ousmane Kounta</span>
                    <span className="text-emerald-400">✓ Signé</span>
                  </div>
                  <div className="text-slate-500 text-[8px]">Notary Public & Certified Translator</div>
                </div>
              </div>

            </div>
          )}

          {/* Action Row: BAT & PDF Export */}
          <div className="space-y-1.5 shrink-0">
            <button
              onClick={handleCompileBrief}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Valider BAT & Compiler Pack 23 Pages (Event)</span>
            </button>
            <div className="flex items-center justify-between text-[9px] text-slate-400 px-1">
              <span>Temps d'exécution : 45 min</span>
              <span className="text-emerald-400 font-bold">1 seul Bon à Tirer · Zéro Retirage</span>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

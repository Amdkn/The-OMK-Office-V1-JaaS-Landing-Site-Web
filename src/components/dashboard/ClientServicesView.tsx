import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { 
  CheckCircle2, Clock, ArrowRight, Download, MessageSquare, Phone, 
  Share2, Shield, Calendar, Sparkles, Check, ChevronRight, UserCheck, 
  FileText, ExternalLink, Star, Briefcase, Plus, AlertCircle
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  deliverables: string[];
  isIncludedInJaaS?: boolean;
}

const MARKETPLACE_SERVICES: ServiceItem[] = [
  {
    id: "tax-1040",
    title: "Déclaration Fiscale 1040 & ITIN W-7",
    category: "Pôle 2 · Finance",
    price: 150,
    duration: "48h max",
    rating: 4.9,
    reviewsCount: 38,
    description: "Préparation certifiée 1040/Schedule C pour travailleur indépendant ou employé avec déductions maximales.",
    deliverables: ["Formulaire 1040 scellé", "Attestation de dépôt IRS", "Revue anti-redressement"],
    isIncludedInJaaS: true
  },
  {
    id: "notary-express",
    title: "Certification Notariée Express au Guichet",
    category: "Pôle 1 · Légal",
    price: 35,
    duration: "Immédiat (15 min)",
    rating: 5.0,
    reviewsCount: 64,
    description: "Sceau notarié officiel État de l'Ohio pour vos procurations, affidavits de soutien et attestations d'hébergement.",
    deliverables: ["Sceau notarié Ohio apposé", "Horodatage d'audit", "Copie numérique sécurisée"],
    isIncludedInJaaS: true
  },
  {
    id: "interview-prep",
    title: "Simulation d'Entretien USCIS & Révision Orale",
    category: "Pôle 1 · Légal",
    price: 95,
    duration: "Session 1h en direct",
    rating: 4.85,
    reviewsCount: 29,
    description: "Entraînement individuel avec un case manager aux questions types de l'officier d'immigration.",
    deliverables: ["Fiche de synthèse personnalisée", "Audio de simulation", "Guide de posture légale"],
    isIncludedInJaaS: false
  },
  {
    id: "cvg-dispatch",
    title: "Coaching Emploi & Enrôlement Hub Amazon CVG",
    category: "Pôle 3 · Carrière",
    price: 120,
    duration: "3 jours ouvrés",
    rating: 4.95,
    reviewsCount: 52,
    description: "Mise aux normes US du CV, vérification EAD/I-9 et mise en relation directe avec les recruteurs du Hub logistique.",
    deliverables: ["CV format ATS US", "Audit I-9", "Fast-track recruteur"],
    isIncludedInJaaS: true
  }
];

export function ClientServicesView() {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState<'progress' | 'marketplace' | 'vault' | 'referral'>('progress');
  const [requestedServices, setRequestedServices] = useState<string[]>([]);
  const [referralCopied, setReferralCopied] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleRequestService = (serviceId: string) => {
    if (!requestedServices.includes(serviceId)) {
      setRequestedServices([...requestedServices, serviceId]);
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://the-omk-office.com/ref/LELO-JM-8841");
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#0E131F] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl p-5 md:p-8 space-y-6">
      
      {/* Header Client Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/30">
            JM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-white">
                Bonjour, Jean-Marc Lelo
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                Adhérent JaaS Actif
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-2">
              <span>Dossier N° USCIS-CIN-2026-8841</span>
              <span>•</span>
              <span className="text-blue-400">Hub Physique Cincinnati</span>
            </div>
          </div>
        </div>

        {/* Action quick links */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Prendre RDV Bureau</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs (Uber / Coursera style navigation) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'progress'
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Suivi de Progression (1 en cours)</span>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'marketplace'
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Marketplace de Services</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'vault'
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Coffre-fort Documents (4)</span>
        </button>

        <button
          onClick={() => setActiveTab('referral')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'referral'
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/25"
              : "text-amber-400 hover:text-amber-300 hover:bg-amber-950/30"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Parrainage "Zéro Dollar" ($150 cumulé)</span>
        </button>
      </div>

      {/* TAB 1: SUIVI DE PROGRESSION (Uber/Coursera progression pipeline) */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Active Dossier Progress Card */}
          <div className="p-5 md:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                  Dossier Actif · Pôle 1 Légal
                </span>
                <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                  Demande d'Asile & Permis de Travail (Formulaire I-589 / I-765)
                </h3>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-400">Progression globale :</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono font-bold text-xs">
                  65% (Étape 3 sur 5)
                </span>
              </div>
            </div>

            {/* Visual 5-step milestone pipeline (Coursera / Uber timeline) */}
            <div className="space-y-4">
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full w-[65%] rounded-full transition-all duration-700"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                
                {/* Step 1 */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-500/30 relative">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Étape 1 · Terminé</span>
                  </div>
                  <div className="font-bold text-white text-xs">Diagnostic & Collecte</div>
                  <p className="text-[11px] text-slate-400 mt-1">Audit des pièces d'identité et historique d'entrée.</p>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-500/30 relative">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Étape 2 · Validé</span>
                  </div>
                  <div className="font-bold text-white text-xs">Traduction 8 CFR</div>
                  <p className="text-[11px] text-slate-400 mt-1">SLA 45m respecté. Actes scellés avec certification légale.</p>
                </div>

                {/* Step 3 - Current */}
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/60 shadow-lg shadow-blue-500/10 relative">
                  <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-blue-500 text-white font-mono text-[9px] font-black uppercase animate-pulse">
                    En cours
                  </span>
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Étape 3 · Révision</span>
                  </div>
                  <div className="font-bold text-white text-xs">Assemblage & Affidavits</div>
                  <p className="text-[11px] text-slate-300 mt-1">Contrôle final par Sarah Jenkins avant scellement.</p>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 opacity-60">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <span>Étape 4 · À venir</span>
                  </div>
                  <div className="font-bold text-slate-300 text-xs">Dépôt USCIS</div>
                  <p className="text-[11px] text-slate-500 mt-1">Numéro de tracking et récépissé de dépôt officiel.</p>
                </div>

                {/* Step 5 */}
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 opacity-60">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <span>Étape 5 · Finale</span>
                  </div>
                  <div className="font-bold text-slate-300 text-xs">Biométrie & EAD</div>
                  <p className="text-[11px] text-slate-500 mt-1">Délivrance de la carte de permis de travail.</p>
                </div>

              </div>
            </div>

            {/* Case Manager Contact Card */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-300 text-sm">
                  SJ
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Sarah Jenkins</span>
                    <span className="text-[10px] text-slate-400 font-mono">(Votre Case Manager Dédiée)</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Bureau Physique de Cincinnati · Guichet 2</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="mailto:s.jenkins@the-omk-office.com"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>Envoyer un Message</span>
                </a>
                <a
                  href="tel:+15135550192"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MARKETPLACE DE SERVICES (Airbnb / Udemy style catalog) */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-white">Catalogue & Marketplace de Services</h2>
            <p className="text-xs text-slate-400 mt-1">
              Sélectionnez les démarches complémentaires pour enrichir votre dossier ou accélérer votre insertion aux USA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARKETPLACE_SERVICES.map((srv) => {
              const isRequested = requestedServices.includes(srv.id);
              return (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                        {srv.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{srv.rating}</span>
                        <span className="text-slate-500 text-[10px]">({srv.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mt-1">{srv.title}</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{srv.description}</p>

                    {/* Deliverables tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {srv.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-300 border border-slate-800 flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-white">
                        ${srv.price}
                        {srv.isIncludedInJaaS && (
                          <span className="ml-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Inclus JaaS
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">Délai : {srv.duration}</div>
                    </div>

                    <button
                      onClick={() => handleRequestService(srv.id)}
                      disabled={isRequested}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isRequested
                          ? "bg-emerald-600 text-white cursor-default"
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 cursor-pointer"
                      }`}
                    >
                      {isRequested ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Sollicité ✓</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Solliciter ce Service</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: COFFRE-FORT DOCUMENTS */}
      {activeTab === 'vault' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-white">Votre Coffre-fort Numérique Scellé</h2>
            <p className="text-xs text-slate-400 mt-1">
              Documents officiels, récépissés et traductions certifiées 8 CFR horodatés pour vos rendez-vous légaux.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { title: "Traduction Certifiée 8 CFR § 1003.33 (Acte de Naissance)", date: "15/08/2025", size: "2.4 MB", tag: "Officiel USCIS" },
              { title: "Récépissé de Dépôt Frais JaaS Annuel ($300)", date: "01/09/2025", size: "340 KB", tag: "Facture Acquittée" },
              { title: "Projet de Formulaire I-589 Complété & Scellé", date: "02/10/2025", size: "4.1 MB", tag: "Brouillon Juridique" },
              { title: "Attestation Notariée d'Hébergement Cincinnati", date: "24/09/2025", size: "1.1 MB", tag: "Sceau Ohio Apposé" }
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{doc.title}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Date : {doc.date}</span>
                      <span>•</span>
                      <span>Taille : {doc.size}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{doc.tag}</span>
                    </div>
                  </div>
                </div>

                <button className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PARRAINAGE "ZERO DOLLAR" */}
      {activeTab === 'referral' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
              Formule Modèle Économique "Zéro Dollar"
            </span>
            <h2 className="text-2xl font-black text-white">
              "Ne payez plus vos démarches administratives de votre poche."
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Pour chaque proche que vous parrainez à The OMK Office, vous recevez une déduction directe de <strong>$50</strong> sur votre pack annuel JaaS. 
              Avec 6 filleuls inscrits, votre adhésion annuelle ($300) est <strong>100% remboursée</strong> !
            </p>

            {/* Progress status */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Votre Solde Actuel : 3 Filleuls Actifs</span>
                <span className="text-amber-400 font-mono">$150 / $300 économisés (50%)</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full w-1/2 rounded-full"></div>
              </div>
              <div className="text-[11px] text-slate-400 font-mono text-right">
                Encore 3 filleuls pour la gratuité intégrale de votre prochaine année !
              </div>
            </div>

            {/* Share Link */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono flex items-center overflow-x-auto">
                https://the-omk-office.com/ref/LELO-JM-8841
              </div>
              <button
                onClick={handleCopyReferral}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {referralCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{referralCopied ? "Lien Copié !" : "Copier mon Code"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

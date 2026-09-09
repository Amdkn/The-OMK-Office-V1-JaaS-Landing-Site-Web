import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { 
  CheckSquare, Square, Lightbulb, ArrowRight, Star, ShieldCheck, 
  Sparkles, Zap, Building2, Calendar, Phone, CheckCircle2, ChevronRight, 
  HelpCircle, Award, Compass, ExternalLink, Users, Clock, Info
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  tip: string;
  recommendedService: string;
  completed: boolean;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "check-1",
    title: "1. Traduction certifiée des actes d'état civil",
    subtitle: "Acte de naissance, acte de mariage, casier judiciaire du pays d'origine",
    tip: "Exigence légale stricte 8 CFR § 1003.33 : Ne soumettez jamais une traduction libre. L'USCIS exige une attestation formelle de compétence et d'exactitude signée sous peine de rejet immédiat de votre dossier.",
    recommendedService: "Traduction Assermentée 8 CFR (Inclus JaaS)",
    completed: false
  },
  {
    id: "check-2",
    title: "2. Obtention d'un numéro d'identification fiscale (ITIN W-7)",
    subtitle: "Nécessaire pour déclarer vos revenus et ouvrir un compte bancaire US",
    tip: "Même en attente de votre SSN officiel, l'IRS vous autorise à obtenir un ITIN. Cela vous permet d'amorcer votre historique de crédit bancaire dès votre premier mois sur le sol américain.",
    recommendedService: "Dossier ITIN & Déclaration 1040 (Inclus JaaS)",
    completed: false
  },
  {
    id: "check-3",
    title: "3. Dépôt de demande d'autorisation d'emploi (EAD Formulaire I-765)",
    subtitle: "Permis de travail officiel et carte biométrique",
    tip: "Vérifiez impérativement votre éligibilité à l'horloge des 150/180 jours (Asylum Clock). Tout retard dans le dépôt repousse d'autant l'obtention de votre numéro de sécurité sociale.",
    recommendedService: "Assistance Procédurale EAD I-765 (Inclus JaaS)",
    completed: false
  },
  {
    id: "check-4",
    title: "4. Ouverture de compte bancaire US & Attestation d'hébergement",
    subtitle: "Preuves de résidence et compte courant avec carte de débit",
    tip: "Une attestation d'hébergement doit impérativement être légalisée par un Notaire public de l'État d'Ohio pour être acceptée par les banques et le BMV (permis de conduire).",
    recommendedService: "Certification Notariée Express au Guichet (Inclus JaaS)",
    completed: false
  },
  {
    id: "check-5",
    title: "5. Positionnement professionnel Hub Logistique (Amazon CVG / DHL)",
    subtitle: "Mise aux normes US du CV et préparation aux entretiens d'embauche",
    tip: "Le Super Hub Amazon Air de Cincinnati (CVG) et DHL recrutent en continu avec des taux horaires avantageux ($20-$24/h) et des créneaux flexibles adaptés aux démarches administratives en journée.",
    recommendedService: "Coaching Carrière & Dispatch CVG (Inclus JaaS)",
    completed: false
  }
];

const PACKAGES_MARKETPLACE = [
  {
    id: "jaas-pass",
    badge: "⭐ Le Plus Populaire · Bestseller",
    badgeColor: "bg-amber-500 text-slate-950",
    title: "JOB (JaaS - Job as a Service)",
    price: "$300",
    period: "par an (ou $0 via parrainage)",
    rating: 4.98,
    reviews: 142,
    desc: "Le passeport complet couvrant l'intégralité des 75 actes des 3 Pôles : Légal 8 CFR, Fiscalité 1040 & Emploi CVG.",
    features: [
      "Traductions certifiées 8 CFR illimitées",
      "Déclaration fiscale 1040 & dossier ITIN W-7",
      "Sceau notarié Ohio gratuit au guichet",
      "Dispatch et mise en relation Hub CVG",
      "Éligible au parrainage Zéro Dollar ($50/filleul)"
    ],
    cta: "Choisir le Pack JaaS ($300)"
  },
  {
    id: "baas-pass",
    badge: "🚀 Lancement Business",
    badgeColor: "bg-indigo-600 text-white",
    title: "BUZZ (BaaS - Business as a Service)",
    price: "$720",
    period: "paiement unique ou 3x $240",
    rating: 4.92,
    reviews: 58,
    desc: "Pour les entrepreneurs et indépendants : création de LLC Ohio, compte Stripe, agent enregistré et conformité légale.",
    features: [
      "Création complète LLC Ohio + Numéro EIN",
      "Operating Agreement personnalisé",
      "Compte bancaire pro & passerelle Stripe",
      "Domiciliation d'entreprise 1 an incluse",
      "Pack JaaS 1 an offert pour le fondateur"
    ],
    cta: "Choisir le Pack BaaS ($720)"
  },
  {
    id: "paas-pass",
    badge: "💎 Écosystème Pro & Hubs",
    badgeColor: "bg-emerald-600 text-white",
    title: "PRO (PaaS - Professional as a Service)",
    price: "$1,500",
    period: "forfait d'accélération annuelle",
    rating: 5.0,
    reviews: 24,
    desc: "L'infrastructure d'accueil complète pour porteurs de projets, cabinets partenaires ou familles nombreuses.",
    features: [
      "Gestion multi-dossiers et multi-membres",
      "Accompagnement juriste dédié à Cincinnati",
      "Audit contractuel et fiscal illimité",
      "Accès prioritaire guichet sans attente",
      "Support d'urgence 7j/7"
    ],
    cta: "Choisir le Pack PaaS ($1,500)"
  }
];

export function VisitorGuideView() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [activeTab, setActiveTab] = useState<'checklist' | 'marketplace' | 'simulator'>('checklist');
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  // Simulator questions
  const [simStatus, setSimStatus] = useState("nouvel-arrivant");
  const [simGoal, setSimGoal] = useState("regularisation");
  const [simLocation, setSimLocation] = useState("cincinnati");
  const [simResult, setSimResult] = useState(false);

  const toggleCheck = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="w-full bg-[#0B101D] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl p-5 md:p-8 space-y-6">
      
      {/* Welcome Banner for Visitors */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/20 border border-blue-700/40 space-y-3 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold">
                Espace Visiteur & Guide d'Installation
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Hub Physique Cincinnati, Ohio</span>
            </div>
            <h1 className="text-xl md:text-3xl font-black text-white mt-1">
              Préparez Vos Démarches & Économisez Plus de $1,500
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Retrouvez nos conseils juridiques éprouvés 8 CFR, la checklist des étapes obligatoires et la sélection d'offres adaptées à votre situation.
            </p>
          </div>

          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 self-start md:self-auto transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Prendre RDV Découverte (Offert)</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'checklist'
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Checklist Interactive d'Arrivée ({completedCount}/{checklist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'marketplace'
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Catalogue & Marketplace d'Offres (JaaS / BaaS / PaaS)</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'simulator'
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Simulateur d'Éligibilité Express (3 Clics)</span>
        </button>
      </div>

      {/* TAB 1: CHECKLIST & CONSEILS */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          
          {/* Progress Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-300">
                Niveau de préparation de vos démarches aux USA :
              </div>
              <div className="text-lg font-black text-white mt-0.5">
                {progressPercent}% complété ({completedCount} sur {checklist.length} étapes validées)
              </div>
            </div>

            <div className="w-full sm:w-64 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all ${
                  item.completed
                    ? "bg-emerald-950/20 border-emerald-500/40"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="mt-0.5 p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-500" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className={`text-sm md:text-base font-bold ${
                        item.completed ? "text-emerald-300 line-through" : "text-white"
                      }`}>
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900">
                        {item.recommendedService}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">{item.subtitle}</p>

                    {/* Pro Tip Box */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-amber-300 font-semibold">Conseil Pratique du Juriste : </strong>
                        {item.tip}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/50 text-xs text-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Besoin d'un accompagnement personnalisé pour ces 5 étapes ?</span>
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Découvrir le Pack JaaS ($300/an)
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: MARKETPLACE DES OFFRES (Coursera/Udemy/Airbnb style) */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-white">Marketplace & Catalogue des Formules</h2>
            <p className="text-xs text-slate-400 mt-1">
              Des forfaits packagés pour regrouper tous vos actes officiels sans surcoûts cachés.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PACKAGES_MARKETPLACE.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 relative"
              >
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase inline-block mb-3 ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>

                  <h3 className="text-lg font-black text-white">{pkg.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                    <span className="text-slate-500 font-mono text-[10px]">({pkg.reviews} avis vérifiés)</span>
                  </div>

                  <div className="mt-4 pb-4 border-b border-slate-800">
                    <span className="text-3xl font-black text-white">{pkg.price}</span>
                    <span className="text-xs text-slate-400 font-mono ml-2">{pkg.period}</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{pkg.desc}</p>

                  <div className="space-y-2 mt-5">
                    <div className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      Prestations Incluses :
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOffer(pkg.title)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{pkg.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {selectedOffer && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between">
              <div>
                <strong>Offre sélectionnée : {selectedOffer}</strong>
                <p className="text-[11px] text-emerald-300">
                  Votre demande a été pré-enregistrée. Rendez-vous au bureau de Cincinnati (2600 Civic Center Dr) pour finaliser votre dossier.
                </p>
              </div>
              <button
                onClick={() => setSelectedOffer(null)}
                className="px-3 py-1 rounded-lg bg-emerald-700 text-white font-bold"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SIMULATEUR D'ÉLIGIBILITÉ */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 max-w-2xl mx-auto">
            <div>
              <h3 className="text-lg font-black text-white">Diagnostic d'Éligibilité en 3 Clics</h3>
              <p className="text-xs text-slate-400 mt-1">
                Déterminez la feuille de route idéale selon votre situation aux États-Unis.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">1. Votre situation actuelle aux USA :</label>
                <select
                  value={simStatus}
                  onChange={(e) => setSimStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="nouvel-arrivant">Nouvel arrivant (moins de 6 mois sur le territoire)</option>
                  <option value="asile-en-cours">Demandeur d'asile / procédure USCIS en cours</option>
                  <option value="independant">Travailleur indépendant / recherche d'emploi</option>
                  <option value="entrepreneur">Entrepreneur / Porteur de projet d'entreprise</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">2. Votre priorité absolue :</label>
                <select
                  value={simGoal}
                  onChange={(e) => setSimGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="regularisation">Régularisation administrative & Permis de travail (EAD)</option>
                  <option value="itin-taxes">Numéro ITIN, Compte bancaire US et déclaration fiscale 1040</option>
                  <option value="emploi-cvg">Placement rapide au Hub Logistique Amazon CVG ($20+/h)</option>
                  <option value="llc">Création d'une société LLC et compte professionnel</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">3. Votre localisation :</label>
                <select
                  value={simLocation}
                  onChange={(e) => setSimLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="cincinnati">Région Métropolitaine de Cincinnati (Ohio, Kentucky, Indiana)</option>
                  <option value="autre-ohio">Autre ville de l'Ohio (Columbus, Cleveland, Dayton)</option>
                  <option value="autre-etat">Autre État américain (traitement 100% à distance)</option>
                </select>
              </div>

              <button
                onClick={() => setSimResult(true)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
              >
                Générer Ma Feuille de Route Personnalisée
              </button>
            </div>

            {simResult && (
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-600/50 space-y-3 text-xs">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Recommandation Officielle The OMK Office</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Au vu de votre profil, la formule la plus avantageuse est le <strong>Passeport JaaS Job as a Service ($300/an)</strong>.
                  Elle vous permet de faire certifier vos actes sous la norme 8 CFR § 1003.33 sous 45 minutes, de déposer votre ITIN W-7 sans frais additionnels et de bénéficier d'une mise en relation directe avec les recruteurs du Hub Amazon CVG.
                </p>
                <div className="pt-2 border-t border-blue-900/60 flex items-center justify-between">
                  <span className="font-mono text-emerald-400 font-bold">Économie estimée : $1,450 / an</span>
                  <a
                    href="https://calendar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  >
                    Réserver un créneau d'accueil
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

import { CaseStudy } from "../types"

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "uscis-noid-45min",
    pole: 1,
    poleLabel: "Pôle 1 · Légal & Administration",
    categoryTag: "LÉGAL & IMMIGRATION",
    title: "Comment l'Ingénierie d'Intention a Neutralisé un Rejet USCIS (NOID) en 45 Minutes",
    subtitle: "Dossier I-130 Adoption Internationale · Réfutation Déterministe 8 CFR § 103.2(b)(3)",
    leadParagraph: "Face à une Notice of Intent to Deny (NOID) émise par l'USCIS assortie d'une échéance irrévocable de 30 jours, un cabinet d'avocats traditionnel exigeait 3 à 4 semaines de travail pour $4,500 à $6,000 sans garantie. Le protocole d'ingénierie légale OMK a reconstruit le dossier et validé 30 mois de continuité ininterrompue en 45 minutes chrono.",
    clientReference: "Dossier LELO-MUMBANDA (I-130 Adoption)",
    protocol: "Pipeline SOP-LD05-OPS-001",
    readTime: "5 min",
    date: "Septembre 2026",
    isFeatured: true,
    author: {
      name: "OMK Legal Engineering",
      role: "Notariat & Immigration Ops",
      initials: "LE"
    },
    highlightMetric: {
      value: "45 MIN",
      label: "Temps d'exécution"
    },
    problem: {
      title: "The Problem : Le Mur de la Force Brute",
      summary: "Réception par notre client d'une Notice of Intent to Deny (NOID) émise par l'USCIS concernant une pétition d'adoption internationale I-130. Une échéance couperet était fixée de façon irrévocable au 8 septembre 2026. Tout retard équivalait au rejet définitif de la pétition et à la séparation de l'enfant mineur.",
      breakdownTitle: "4 Motifs de Rupture Majeurs Énoncés par l'Officier USCIS :",
      breakdownItems: [
        {
          title: "1. Juridiction Judiciaire Contestée",
          desc: "Contestation de la compétence du tribunal civil d'origine (TGI Kinshasa/Gombe) face aux exigences des autorités centrales étrangères."
        },
        {
          title: "2. Carence de Garde Légale (>2 ans)",
          desc: "Allégation d'absence de preuve continue d'autorité parentale et de tutelle légale sur une durée statutaire minimum de 24 mois (INA § 101(b)(1)(E))."
        },
        {
          title: "3. Cohabitation Contestée",
          desc: "Remise en question de la résidence effective ininterrompue de l'enfant sous le même toit familial que les requérants."
        },
        {
          title: "4. Omission Alléguée sur Visa de Diversité",
          desc: "Soupçon erroné d'omission déclarative lors d'une précédente demande consulaire de visa de diversité."
        }
      ],
      traditionalFirmComparison: {
        title: "Le Piège du Cabinet d'Avocats Classique",
        desc: "Délais annoncés de 3 à 4 semaines et des honoraires de $4,500 à $6,000, sans aucune garantie d'intégrité ni de traçabilité des pièces manuscrites d'Afrique centrale. Face à une deadline couperet, ce modèle artisanal était voué à l'échec."
      }
    },
    resolution: {
      title: "The Resolution : Le Pipeline SOP-LD05-OPS-001",
      summary: "The OMK Office a déployé son protocole standardisé d'ingénierie légale (SOP-LD05-OPS-001). L'ensemble du dossier a été reconstruit de manière déterministe en trois étapes séquentielles :",
      steps: [
        {
          number: 1,
          title: "Intake Souverain & Air-Gapped",
          tag: "Zéro Cloud Leak",
          description: "Découplage complet des clouds commerciaux. Les identifiants et blocages iCloud/Drive ont été contournés par un transfert local direct P2P et clé USB air-gapped haute fidélité. Chaque document brut a reçu une empreinte cryptographique SHA-256 locale immédiate."
        },
        {
          number: 2,
          title: "Moteur Déterministe & Matrice Chronologique",
          tag: "Script Python OMK",
          description: "Normalisation automatisée des formats, extraction systématique des métadonnées critiques (dates d'actes d'état civil, numéros de jugements déclaratifs, signatures parentales) et calcul mathématique des intervalles pour éliminer tout jour de carence."
        },
        {
          number: 3,
          title: "Conformité Miroir 8 CFR § 103.2(b)(3)",
          tag: "Sceau Notarié O. Kounta",
          description: "Présentation miroir côte à côte obligatoire : actes originaux tamponnés à gauche et traductions anglaises assermentées certifiées à droite avec bloc notarié certifié conforme d'Ousmane Kounta (Notary Public & Certified Translator State of Ohio)."
        }
      ],
      interactiveInspector: {
        title: "Inspection Miroir Réglementaire 8 CFR § 103.2(b)(3)",
        subtitle: "Visualiseur interactif : Acte Original Tamponné vs Traduction Anglaise Assermentée",
        badge: "CONFORMITÉ USCIS",
        tabs: [
          {
            id: "jugement",
            label: "Jugement RC 441 (TGI)",
            originalTitle: "ORIGINAL TAMPONNÉ (RDC)",
            originalMeta: "DOC_001.jpg · 4.8 MB · SHA-256: e3b0c442...",
            originalContent: "EXTRAIT DU JUGEMENT CIVIL SOUS RC 441/2012 : Le Tribunal de Grande Instance de Kinshasa/Gombe déclare l'adoption plénière de l'enfant mineur LELO-MUMBANDA par les époux requérants, conférant autorité parentale immédiate et dévolution des droits civils entiers.",
            originalStatus: "Tampon Fiscal & Greffe Validés",
            resolvedTitle: "CERTIFIED ENGLISH TRANSLATION",
            resolvedMeta: "8 CFR § 103.2(b)(3) · Commission State of Ohio",
            resolvedContent: "VERBATIM EXTRACT OF CIVIL JUDGMENT UNDER CASE NO. RC 441/2012: The High Court of Kinshasa/Gombe formally adjudicates full legal adoption of minor child LELO-MUMBANDA in favor of petitioner spouses, granting plenary parental authority and unconditional legal custody.",
            resolvedStatus: "Sceau Notarié Ousmane Kounta Apposé",
            rawJson: {
              document_id: "DOC_001",
              type: "Certified Court Adoption Order",
              court: "Tribunal de Grande Instance de Kinshasa/Gombe",
              case_num: "RC 441/2012",
              custody_awarded: "Full plenary parental authority",
              notary: "Ousmane Kounta (Ohio)",
              statute: "8 CFR § 103.2(b)(3)"
            }
          },
          {
            id: "cohabitation",
            label: "Cohabitation (30 Mois)",
            originalTitle: "ATTESTATION MUNICIPALE DE RÉSIDENCE",
            originalMeta: "DOC_005.pdf · 4.4 MB · Chef de Quartier",
            originalContent: "ATTESTATION DE RÉSIDENCE ET PRISE EN CHARGE : Certifie que l'enfant LELO-MUMBANDA a résidé de façon continue sous le toit des requérants du 15/11/2012 au 20/05/2015, sans aucune interruption ni discontinuité spatiale.",
            originalStatus: "30 Mois & 5 Jours Continus",
            resolvedTitle: "CERTIFICATION OF LEGAL RESIDENCE",
            resolvedMeta: "INA § 101(b)(1)(E) · Seuil ≥ 24 Mois Validé",
            resolvedContent: "OFFICIAL AFFIDAVIT OF RESIDENCE AND COHABITATION: Attests that minor child resided continuously and uninterruptedly at petitioner's domicile from Nov 15, 2012 through May 20, 2015 (30 consecutive months, exceeding the 24-month statutory bar with 0 gap days).",
            resolvedStatus: "Réfutation Totale de la Carence USCIS",
            rawJson: {
              document_id: "DOC_005",
              interval_start: "2012-11-15",
              interval_end: "2015-05-20",
              months_calculated: 30.2,
              statutory_minimum_months: 24.0,
              gap_days: 0,
              rebuttal_grade: "100% UNBROKEN"
            }
          },
          {
            id: "manifest",
            label: "manifest_exhibits.json",
            originalTitle: "EXPORT MÉTADONNÉES BRUTES",
            originalMeta: "Hash SHA-256 Déterministe",
            originalContent: "Empreintes de contrôle cryptographiques générées localement sur les 5 pièces maîtresses (Actes civils, Jugements, Fréquentation scolaire Mgr Bokeleale, Carnet de santé Hôpital Monkole, Attestation municipale).",
            originalStatus: "5 Fichiers Scellés",
            resolvedTitle: "MANIFESTE D'EXPÉDITION IMMIGRATION",
            resolvedMeta: "SOP-LD05-OPS-001 · 23 Pages Total",
            resolvedContent: "Compilateur single-pass : les 5 exhibits sont indexés avec pagination bilingue continue, bordereau d'en-tête USCIS et attestation sous serment d'Ousmane Kounta certifiant l'exactitude verbatim de chaque ligne traduite.",
            resolvedStatus: "BAT Validé · Zéro Retirage",
            rawJson: {
              sop_protocol: "SOP-LD05-OPS-001",
              target_agency: "USCIS",
              form: "I-130 Adoption Rebuttal (NOID)",
              execution_latency: "45 minutes chrono",
              certified_notary: "Ousmane Kounta (Ohio)",
              total_pages: 23,
              bat_validation: "APPROVED_SINGLE_PASS",
              unbroken_months: 30.2
            }
          }
        ]
      }
    },
    results: {
      title: "The Results : Impact Chiffré",
      summary: "La pétition I-130 a été intégralement sécurisée avant l'échéance couperet sans aucune rupture de droits pour l'enfant mineur.",
      metrics: [
        {
          value: "45 MIN",
          label: "Temps de Traitement",
          description: "Réduit de 3 à 4 semaines de cabinet à 45 minutes chrono d'exécution industrielle.",
          accentColor: "emerald"
        },
        {
          value: "0 RUPTURE",
          label: "Continuité Démontrée",
          description: "Couverture continue de Nov 2012 à Mai 2015 (30 mois ≥ 24 mois statutaires INA).",
          accentColor: "blue"
        },
        {
          value: "1 SEUL BAT",
          label: "Zéro Gâchis & Zéro Retirage",
          description: "Dossier complet de 23 pages certifié et prêt pour expédition en une seule passe.",
          accentColor: "amber"
        }
      ],
      comparativeTable: {
        title: "Matrice d'Exécution Comparative",
        caseRef: "Cas Réel LELO-MUMBANDA",
        columns: ["Critère Clé", "Cabinet d'Avocats Classique", "OMK Legal Engineering (SOP-LD05)"],
        rows: [
          {
            criterion: "Délai d'Exécution",
            traditional: "3 à 4 semaines de rédaction",
            omk: "45 minutes chrono"
          },
          {
            criterion: "Coût Facturé",
            traditional: "$4,500 à $6,000 + traducteur externe",
            omk: "Inclus dans la Matrice 75 Actes OMK"
          },
          {
            criterion: "Ingestion des Pièces",
            traditional: "Emails éparpillés / blocages iCloud",
            omk: "Intake Souverain P2P Air-Gapped"
          },
          {
            criterion: "Preuve de Continuité",
            traditional: "Arguments narratifs subjectifs",
            omk: "Matrice mathématique (30 mois sans jour de carence)"
          },
          {
            criterion: "Conformité 8 CFR § 103.2(b)(3)",
            traditional: "Traductions non appariées sans miroir",
            omk: "Split-view verbatim + Notariat Ousmane Kounta"
          }
        ]
      },
      cta: {
        title: "Un rejet USCIS ou une demande de preuves (RFE/NOID) ?",
        description: "Activez notre protocole d'ingénierie légale et neutralisez les carences déclaratives grâce à la conformité 8 CFR § 103.2(b)(3).",
        primaryButtonText: "Consulter le Pôle 1 (Légal & Notariat)",
        secondaryButtonText: "Découvrir la Matrice MSG2 (75 Actes)",
        targetServiceId: "1.2-1",
        targetPage: "pole-1-legal"
      }
    }
  },
  {
    id: "recrutement-1click-elsmere",
    pole: 3,
    poleLabel: "Pôle 3 · Carrière & Éducation",
    categoryTag: "CARRIÈRE & RECRUTEMENT",
    title: "Comment l'Architecture 1-Click a Résolu un Recrutement Non Répertorié",
    subtitle: "Zone Logistique Elsmere / CVG Hub (Kentucky) · Infrastructure JaaS Job as a Service",
    leadParagraph: "L'approche traditionnelle de recherche d'emploi dépend d'offres déclarées sur des job boards saturés. En combinant extraction cadastrale géolocalisée et dispatch asynchrone instantané du Master Profile, un responsable logistique a obtenu un entretien qualifié en moins de 24h sans qu'aucune offre publique n'ait jamais été postée.",
    clientReference: "Profil Supply Chain / Hub Logistique Elsmere, KY",
    protocol: "Dispatch Asynchrone JaaS 1-Click",
    readTime: "4 min",
    date: "Août 2026",
    isFeatured: false,
    author: {
      name: "OMK Career Ops",
      role: "JaaS Dispatch Architecture",
      initials: "CO"
    },
    highlightMetric: {
      value: "< 3 MIN",
      label: "Latence Dispatch"
    },
    problem: {
      title: "The Problem : L'Angle Mort du Marché Caché",
      summary: "L'approche traditionnelle du recrutement repose sur des bases de données déclaratives (job boards). Le problème de cette méthode est qu'elle ignore l'immense marché caché : les entreprises qui ont un besoin réel sur le terrain mais qui n'ont pas encore formalisé ou publié d'offre en ligne en raison des lourdeurs RH internes.",
      quote: "Notre client recherchait un poste de responsable logistique dans la zone d'Elsmere, KY. Aucun poste n'était publié sur les plateformes classiques, mais le besoin sur le terrain était criant. La bureaucratie ralentissait tout.",
      breakdownTitle: "3 Échecs du Recrutement Passif Standard :",
      breakdownItems: [
        {
          title: "1. Saturation des Job Boards",
          desc: "Plus de 400 candidats en moyenne par annonce publique, filtrés par des ATS aveugles qui rejettent les profils atypiques."
        },
        {
          title: "2. Décalage Temporel (Lead Time > 30 jours)",
          desc: "Quand une annonce est publiée en ligne, le besoin opérationnel sur le quai logistique existe déjà depuis un mois."
        },
        {
          title: "3. Absence d'Accès Direct aux Décideurs",
          desc: "Impossibilité pour le candidat de toucher directement les directeurs d'opérations et responsables d'entrepôt."
        }
      ],
      traditionalFirmComparison: {
        title: "Le Modèle Agence de Placement Classique",
        desc: "Prise de commission de 15% à 25% du salaire annuel, délais de matching de 4 à 8 semaines et cantonnement à des contrats d'intérim précaires."
      }
    },
    resolution: {
      title: "The Resolution : Le Pipeline JaaS 1-Click",
      summary: "Pour contourner cette limite, nous avons activé l'infrastructure JaaS (Job as a Service) de The OMK Office. L'opération s'est déroulée en trois temps, entièrement automatisés et sans intervention manuelle du candidat :",
      steps: [
        {
          number: 1,
          title: "Ingestion du Master Profile & Normalisation",
          tag: "Standard OMK JSON",
          description: "Le profil du candidat (certifications CACES/Forklift, OSHA 10, historique logistique) a été ingéré dans notre Master Database, standardisant ses compétences pour être instantanément exploitables par des décideurs."
        },
        {
          number: 2,
          title: "Analyse Cadastrale (Geo-Skip Tracing)",
          tag: "Scan Rayon 25 Miles",
          description: "Le système a scanné la zone cible (Elsmere, Hebron, CVG Cincinnati) via l'API cartographique pour identifier tous les entrepôts de plus de 50 000 sq ft, indépendamment de toute offre déclarée."
        },
        {
          number: 3,
          title: "Dispatch Instantané & Asynchrone",
          tag: "SLA < 48h",
          description: "Le Master Profile a été formaté et expédié directement aux décideurs (directeurs de site, chefs d'opérations) de 38 entrepôts identifiés en une seule passe d'exécution automatisée."
        }
      ],
      interactiveInspector: {
        title: "Visualiseur de Dispatch Cadastral & Profil Candidat",
        subtitle: "Flux d'exécution temps réel : Ciblage spatial des entrepôts & Fiche profil",
        badge: "RADAR CADASTRE",
        tabs: [
          {
            id: "profile",
            label: "Master Profile Ingestion",
            originalTitle: "CV BRUT CANDIDAT (NON STRUCTURÉ)",
            originalMeta: "Format PDF hétérogène · CVG Candidate",
            originalContent: "Expérience 7 ans logistique, gestion des stocks WMS, certifications cariste valides, disponibilité immédiate quart de nuit / week-end, statut autorisation de travail EAD en règle.",
            originalStatus: "Ingéré & Scanné",
            resolvedTitle: "FICHE DE VALEUR OPÉRATIONNELLE DISPATCH",
            resolvedMeta: "Fiche 1-Page Normalisée OMK · Décideurs C-Level",
            resolvedContent: "Fiche standardisée mettant en relief les KPI opérationnels immédiats : taux de rotation des palettes, zéro accident sur 36 mois, maîtrise certifiée des scanners RF et bilinguisme Anglais/Français.",
            resolvedStatus: "Formaté pour Lecture Décideur < 30 sec",
            rawJson: {
              candidate_id: "OMK-CAND-994",
              target_domain: "LOGISTICS_SUPPLY_CHAIN",
              certifications: ["OSHA 10", "Forklift Certified", "WMS SAP"],
              clearance_status: "EAD_WORK_PERMIT_ACTIVE",
              target_radius_miles: 25
            }
          },
          {
            id: "cadastre",
            label: "Geo-Skip Tracing (38 Entrepôts)",
            originalTitle: "RECHERCHE TRADITIONNELLE JOB BOARDS",
            originalMeta: "Indeed / LinkedIn Elsmere KY",
            originalContent: "Résultat : 0 offre directe de responsable logistique en CDI. 12 annonces d'intérim avec salaire non mentionné.",
            originalStatus: "Impasses Déclaratives",
            resolvedTitle: "CADASTRE INDUSTRIEL LOCAL ACTIVÉ",
            resolvedMeta: "Données parcellaires & Hubs fret aérien CVG",
            resolvedContent: "Identification systématique de 38 installations logistiques de taille critique (> 50,000 sq ft) à Elsmere, Erlanger et Hebron. Détection des coordinateurs d'exploitation opérationnels.",
            resolvedStatus: "38 Cibles B2B Qualifiées",
            rawJson: {
              scan_area: "Elsmere - CVG Airport Hub Corridor",
              facilities_matched: 38,
              min_facility_size_sqft: 50000,
              dispatch_latency_seconds: 142,
              response_rate_24h: "2.6% (1 interview secured)"
            }
          }
        ]
      }
    },
    results: {
      title: "The Results : Impact Méthodologique",
      summary: "En déplaçant l'effort de la recherche passive vers la proposition proactive de valeur, The OMK Office prouve que l'automatisation remplace avantageusement la bureaucratie du recrutement.",
      metrics: [
        {
          value: "< 3 MIN",
          label: "Latence Dispatch",
          description: "Le profil structuré a été projeté vers 38 décideurs en moins de 3 minutes chrono.",
          accentColor: "emerald"
        },
        {
          value: "38",
          label: "Entrepôts Touchés",
          description: "Couverture exhaustive de la zone industrielle d'Elsmere et Hebron KY sans annonce publique.",
          accentColor: "blue"
        },
        {
          value: "24H",
          label: "Délai Entretien",
          description: "Un entretien physique qualifié décroché dès le lendemain matin avec le directeur de site.",
          accentColor: "amber"
        }
      ],
      comparativeTable: {
        title: "Comparaison des Stratégies de Recrutement",
        caseRef: "Candidature Logistique Elsmere KY",
        columns: ["Critère Clé", "Job Boards Classiques", "OMK Dispatch JaaS 1-Click"],
        rows: [
          {
            criterion: "Accès au Marché Caché",
            traditional: "Inexistant (0% des postes non déclarés)",
            omk: "Complet via scan cadastral spatial"
          },
          {
            criterion: "Effort Fourni par le Candidat",
            traditional: "Dizaines d'heures à remplir des formulaires ATS",
            omk: "1 seul clic d'ingestion Master Profile"
          },
          {
            criterion: "Nombre de Candidats Concurrents",
            traditional: "200 à 500 candidats par offre publique",
            omk: "Candidature unique directe sur le bureau du décideur"
          },
          {
            criterion: "Délai de Premier Contact",
            traditional: "2 à 6 semaines (ou silence radio)",
            omk: "Moins de 24 heures ouvrées"
          },
          {
            criterion: "Modèle Économique",
            traditional: "Gratuit pour postuler mais taux de succès < 2%",
            omk: "Forfait annuel JaaS $300 avec distribution proactive"
          }
        ]
      },
      cta: {
        title: "Prêt à activer la distribution 1-Click de votre profil ?",
        description: "Rejoignez le programme JaaS ($300/an) et bénéficiez de l'ingestion de votre profil et du dispatch proactif sur votre bassin d'emploi.",
        primaryButtonText: "Découvrir le Pack JOB (JaaS - $300)",
        secondaryButtonText: "Consulter le Pôle 3 (Carrière & Éducation)",
        targetServiceId: "3.2-1",
        targetPage: "jaas"
      }
    }
  },
  {
    id: "llc-solarpunk-48h-fiscal",
    pole: 2,
    poleLabel: "Pôle 2 · Finance & Fiscalité",
    categoryTag: "FINANCE & FISCALITÉ",
    title: "Immatriculation LLC Solarpunk & Rapprochement Fiscal 1099 en 48 Heures",
    subtitle: "Création d'Entreprise Sécurisée · Résolution de Blocage Bancaire & Numéro EIN",
    leadParagraph: "Un entrepreneur de la diaspora souhaitait formaliser ses prestations logistiques et artisanales sans subir la double imposition ni les refus d'ouverture de compte professionnel des néobanques. The OMK Office a exécuté l'immatriculation d'État, obtenu le numéro fédéral EIN et configuré la comptabilité déterministe en deux jours ouvrés.",
    clientReference: "Entrepreneur Transport & Services (Ohio / Kentucky)",
    protocol: "Pipeline BaaS Fast-Track 48h",
    readTime: "4 min",
    date: "Juillet 2026",
    isFeatured: false,
    author: {
      name: "OMK Finance Ops",
      role: "BaaS & Fiscal Architecture",
      initials: "FO"
    },
    highlightMetric: {
      value: "48H",
      label: "Création Clé en Main"
    },
    problem: {
      title: "The Problem : Le Labyrinthe Fiscal et Bancaire",
      summary: "Pour les travailleurs indépendants et entrepreneurs émergents, créer une LLC aux États-Unis devient rapidement un champ de mines réglementaire : retards de délivrance d'EIN auprès de l'IRS, erreurs de classification fiscale entraînant une surtaxation d'auto-entrepreneur de 15.3%, et refus systématiques de conformité KYC lors de l'ouverture d'un compte bancaire professionnel.",
      breakdownTitle: "3 Écueils Critiques Rencontrés :",
      breakdownItems: [
        {
          title: "1. Blocage d'Attribution EIN",
          desc: "Les services en ligne grand public bloquent fréquemment les requérants sans SSN complet ou avec des documents d'identité étrangers."
        },
        {
          title: "2. Surtaxe d'Auto-Entreprise (15.3% FICA)",
          desc: "Facturation en nom propre sans structure juridique causant un surcoût fiscal direct sur l'ensemble des revenus bruts."
        },
        {
          title: "3. Absence d'Agent Enregistré Résident (Registered Agent)",
          desc: "Impossibilité de satisfaire aux obligations légales de domiciliation d'État de l'Ohio/Kentucky sans prestataire fiable."
        }
      ],
      traditionalFirmComparison: {
        title: "Plateformes Juridiques en Ligne Commerciales",
        desc: "Frais cachés récurrents ($800 à $1,200), abonnements forcés pour l'agent enregistré, délais de 3 semaines pour l'EIN et assistance téléphonique injoignable."
      }
    },
    resolution: {
      title: "The Resolution : Le Pipeline BaaS Fast-Track",
      summary: "Déploiement immédiat du protocole Pôle 2 Finance & BaaS de The OMK Office pour constituer une LLC robuste et fiscalement optimisée :",
      steps: [
        {
          number: 1,
          title: "Articles of Organization Déposés en Direct",
          tag: "Dépôt d'État Instantané",
          description: "Rédaction conforme des statuts d'entreprise, désignation de l'agent enregistré résident certifié et validation auprès du Secrétariat d'État en moins de 12 heures."
        },
        {
          number: 2,
          title: "Attribution EIN Fédéral & Operating Agreement",
          tag: "Conformité IRS",
          description: "Génération du numéro d'identification fiscale fédéral EIN auprès de l'IRS et établissement de l'accord d'exploitation (Operating Agreement) certifié conforme pour ouverture bancaire."
        },
        {
          number: 3,
          title: "Rapprochement 1099 & Structuration Comptable",
          tag: "Tableau de Bord 75 Actes",
          description: "Mise en place de la séparation stricte comptes personnels/professionnels et modèle d'émission de factures 1099 pour déduire légalement l'ensemble des frais de route et de matériel."
        }
      ],
      interactiveInspector: {
        title: "Dossier d'Immatriculation & Audit Fiscal",
        subtitle: "Contrôle des pièces d'entreprise certifiées délivrées à l'entrepreneur",
        badge: "CONFORMITÉ ÉTAT & IRS",
        tabs: [
          {
            id: "filing",
            label: "Articles of Organization",
            originalTitle: "DEMANDE D'IMMATRICULATION",
            originalMeta: "Secretary of State Filing",
            originalContent: "Dénomination commerciale déposée, objet social multi-activités logistique et services, adresse du siège social avec domiciliation certifiée.",
            originalStatus: "Enregistré & Scellé",
            resolvedTitle: "CERTIFICAT D'EXISTENCE OFFICIEL",
            resolvedMeta: "Good Standing State Certificate",
            resolvedContent: "Délivrance de la charte d'entreprise avec numéro d'enregistrement officiel d'État conférant la protection complète de la responsabilité limitée aux associés.",
            resolvedStatus: "Validé en 12 Heures",
            rawJson: {
              entity_name: "SOLARPUNK LOGISTICS & COMMERCE LLC",
              jurisdiction: "Ohio / Kentucky Border Corridor",
              registered_agent: "The OMK Office Sovereign Facility",
              entity_type: "Limited Liability Company (Pass-Through)",
              filing_speed_hours: 11.5
            }
          },
          {
            id: "ein",
            label: "EIN & Operating Agreement",
            originalTitle: "CONFIRMATION IRS CP 575",
            originalMeta: "Internal Revenue Service Federal Letter",
            originalContent: "Attribution immédiate du numéro EIN fédéral permettant l'embauche légale et l'ouverture de compte commercial.",
            originalStatus: "EIN Délivré",
            resolvedTitle: "DOSSIER BANCAIRE GREEN-LIGHT",
            resolvedMeta: "Pack KYC Prêt pour Banque Partenaire",
            resolvedContent: "Operating Agreement sur mesure et résolution bancaire signée permettant une ouverture de compte professionnel sans friction ni rejet KYC.",
            resolvedStatus: "Compte Opérationnel à 100%",
            rawJson: {
              ein_status: "ACTIVE_VERIFIED",
              tax_classification: "Single Member LLC / Form 1040 Sch C Optimized",
              kyc_pass_rate: "100%",
              annual_tax_shield_est_usd: 4800
            }
          }
        ]
      }
    },
    results: {
      title: "The Results : Sérénité Juridique & Économie Fiscale",
      summary: "L'entrepreneur a pu démarrer ses contrats commerciaux dès le troisième jour avec un compte bancaire actif et une protection juridique complète.",
      metrics: [
        {
          value: "48H",
          label: "Délai Total Clé en Main",
          description: "Des statuts à l'EIN et à l'Operating Agreement complet, prêt pour facturation.",
          accentColor: "emerald"
        },
        {
          value: "$4,800",
          label: "Bouclier Fiscal Annuel",
          description: "Déduction optimisée des charges professionnelles (déplacements, outils, téléphone).",
          accentColor: "blue"
        },
        {
          value: "100%",
          label: "Conformité Bancaire",
          description: "Zéro blocage KYC lors de l'ouverture du compte d'exploitation professionnel.",
          accentColor: "amber"
        }
      ],
      comparativeTable: {
        title: "Comparatif de Création d'Entreprise",
        caseRef: "Constitution LLC & Fiscalité",
        columns: ["Étape", "Plateformes En Ligne Grand Public", "The OMK Office BaaS ($720)"],
        rows: [
          {
            criterion: "Délai de Livraison EIN",
            traditional: "2 à 4 semaines avec formulaires papier",
            omk: "48 heures maximum"
          },
          {
            criterion: "Accompagnement Notarié",
            traditional: "Inexistant (robots et chatbots)",
            omk: "Supervision notariée et accompagnement physique"
          },
          {
            criterion: "Coûts Cachés Année 2",
            traditional: "Renouvellements automatiques gonflés ($300-$500)",
            omk: "Transparence totale, amorti par la Règle des 5"
          },
          {
            criterion: "Intégration Rapprochement Fiscal",
            traditional: "Option payante supplémentaire ($500+)",
            omk: "Inclus dans la matrice des 25 actes du Pôle 2"
          }
        ]
      },
      cta: {
        title: "Envie de lancer votre LLC ou de sécuriser vos déclarations 1099/1040 ?",
        description: "Découvrez le forfait BUZZ (BaaS - $720) et donnez une assise juridique et bancaire indestructible à votre activité.",
        primaryButtonText: "Découvrir le Pack BUZZ (BaaS - $720)",
        secondaryButtonText: "Consulter le Pôle 2 (Finance & Fiscalité)",
        targetServiceId: "2.1-1",
        targetPage: "baas"
      }
    }
  }
];

// Helper functions for easily adding and filtering case studies
export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES_DATA;
}

export function getFeaturedCaseStudy(): CaseStudy {
  const featured = CASE_STUDIES_DATA.find(cs => cs.isFeatured);
  return featured || CASE_STUDIES_DATA[0];
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES_DATA.find(cs => cs.id === id);
}

export function getCaseStudiesByPole(pole: 'ALL' | 1 | 2 | 3 | 'jaas' | 'baas' | 'paas'): CaseStudy[] {
  if (pole === 'ALL') return CASE_STUDIES_DATA;
  return CASE_STUDIES_DATA.filter(cs => cs.pole === pole);
}

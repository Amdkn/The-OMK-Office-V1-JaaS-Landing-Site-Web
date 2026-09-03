export type PageView = 
  | 'home' 
  | 'pole-1-legal' 
  | 'pole-2-finance' 
  | 'pole-3-career' 
  | 'jaas' 
  | 'matrix' 
  | 'baas' 
  | 'paas' 
  | 'blog-poc' 
  | 'mobile-os';

export type ServicePole = 'POLE_1_LEGAL_ADMIN' | 'POLE_2_FINANCE_ACCOUNTING' | 'POLE_3_EDUCATION_JAAS';

export type DeliveryMode = 'IN_PERSON_OFFICE' | 'REMOTE_ONLINE' | 'HYBRID_DISPATCH';

export type AssociatedOffer = 'UNIT_ACT' | 'JAAS_JOB_300' | 'BAAS_BUZZ_720' | 'PAAS_PRO_1500';

export interface ServiceItem {
  id: string; // Ex: "1.1-1", "3.2-1", "3.4-3"
  pole: ServicePole;
  poleCode: 1 | 2 | 3;
  poleNameFr: string;
  poleNameEn: string;
  subCategoryCode: string; // Ex: "1.1", "3.2"
  subCategoryNameFr: string;
  subCategoryNameEn: string;
  actNumber: number; // 1 to 5
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  durationMinutes: number;
  baseFeeUsd: number;
  deliveryMode: DeliveryMode;
  associatedOffer: AssociatedOffer;
  includedInJaaS: boolean;
  jaasSynergyNoteFr?: string;
  jaasSynergyNoteEn?: string;
  deliverablesFr: string[];
  deliverablesEn: string[];
  iconName: string;
}

export interface CandidateMasterProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  legalStatus: 'EAD_WORK_PERMIT' | 'GREEN_CARD' | 'US_CITIZEN' | 'PENDING_STATUS';
  primaryDomain: 'LOGISTICS_SUPPLY_CHAIN' | 'ADMIN_OFFICE' | 'TECHNICAL_MAINTENANCE' | 'CUSTOMER_SERVICE' | 'HOSPITALITY_FOOD';
  experienceYears: number;
  languages: string[];
  certifications: string[]; // e.g., ["Forklift CACES", "OSHA 10", "First Aid"]
  targetHubs: string[]; // e.g. ["Amazon CVG Hub", "DHL Express Hub Hebron", "Cincinnati Logistics"]
  dispatchStatus: 'READY' | 'DISPATCHING' | 'DISPATCHED_SLA_48H';
  dispatchTimestamp?: string;
  matchedOffersCount: number;
  averageHourlyRateUsd: number;
  referralCode: string;
  referralCount: number;
}

export type CaseStudyPole = 1 | 2 | 3 | 'jaas' | 'baas' | 'paas';

export interface CaseStudyMetric {
  value: string;
  label: string;
  description: string;
  accentColor?: 'emerald' | 'blue' | 'amber';
}

export interface CaseStudyComparativeRow {
  criterion: string;
  traditional: string;
  omk: string;
}

export interface CaseStudyInspectorTab {
  id: string;
  label: string;
  originalTitle: string;
  originalMeta: string;
  originalContent: string;
  originalStatus: string;
  resolvedTitle: string;
  resolvedMeta: string;
  resolvedContent: string;
  resolvedStatus: string;
  rawJson?: Record<string, any>;
}

export interface CaseStudy {
  id: string;
  pole: CaseStudyPole;
  poleLabel: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  leadParagraph: string;
  clientReference: string;
  protocol: string;
  readTime: string;
  date: string;
  isFeatured?: boolean;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  highlightMetric: {
    value: string;
    label: string;
  };
  problem: {
    title: string;
    summary: string;
    quote?: string;
    breakdownTitle: string;
    breakdownItems: { title: string; desc: string }[];
    traditionalFirmComparison?: {
      title: string;
      desc: string;
    };
  };
  resolution: {
    title: string;
    summary: string;
    steps: {
      number: number;
      title: string;
      tag: string;
      description: string;
    }[];
    interactiveInspector?: {
      title: string;
      subtitle: string;
      badge: string;
      tabs: CaseStudyInspectorTab[];
    };
  };
  results: {
    title: string;
    metrics: CaseStudyMetric[];
    summary: string;
    comparativeTable?: {
      title: string;
      caseRef: string;
      columns: [string, string, string];
      rows: CaseStudyComparativeRow[];
    };
    cta: {
      title: string;
      description: string;
      primaryButtonText: string;
      secondaryButtonText?: string;
      targetServiceId?: string;
      targetPage?: PageView;
    };
  };
}


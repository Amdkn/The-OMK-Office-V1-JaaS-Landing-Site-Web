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

export interface ServiceSpecializationConfig {
  serviceId: string;
  poleId: 'POLE_1_LEGAL_ADMIN' | 'POLE_2_FINANCE_ACCOUNTING' | 'POLE_3_EDUCATION_JAAS';
  archetype: 'dossier_builder' | 'cash_matrix' | 'career_studio';
  titleFr: string;
  titleEn: string;
  validationSchemaName: string;
  defaultProperties: Record<string, any>;
  officialFormTemplateId?: string;
  estimatedMinutes: number;
}

const registry: Record<string, ServiceSpecializationConfig> = {
  '1.1-2': {
    serviceId: '1.1-2',
    poleId: 'POLE_1_LEGAL_ADMIN',
    archetype: 'dossier_builder',
    titleFr: 'Renouvellement EAD',
    titleEn: 'EAD Renewal',
    validationSchemaName: 'eadSchema',
    defaultProperties: {},
    estimatedMinutes: 30
  },
  'i589': {
    serviceId: 'i589',
    poleId: 'POLE_1_LEGAL_ADMIN',
    archetype: 'dossier_builder',
    titleFr: 'Pétition Asile & EAD (I-589 / I-765)',
    titleEn: 'Asylum & EAD Petition',
    validationSchemaName: 'i589Schema',
    defaultProperties: {},
    estimatedMinutes: 60
  },
  'tax1040': {
    serviceId: 'tax1040',
    poleId: 'POLE_2_FINANCE_ACCOUNTING',
    archetype: 'cash_matrix',
    titleFr: 'Déclaration Fiscale 1040',
    titleEn: '1040 Tax Return',
    validationSchemaName: 'tax1040Schema',
    defaultProperties: {},
    estimatedMinutes: 45
  }
};

export function getServiceSpecialization(serviceId: string): ServiceSpecializationConfig | undefined {
  return registry[serviceId];
}

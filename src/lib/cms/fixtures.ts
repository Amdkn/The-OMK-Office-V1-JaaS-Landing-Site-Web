import { EngramNode, CmsGraphSnapshot } from '../../types/cms';
import { CURRENT_CMS_SCHEMA_VERSION } from './schemaVersion';

export const canonicalPoleNode: EngramNode = {
  id: 'pole-legal',
  parentId: null,
  childrenIds: ['service-translate'],
  type: 'pole',
  slug: 'pole-1-legal',
  meta: {
    title: "Pôle 1 · Légal & Statut",
    description: "25 Actes · USCIS, Asile & EAD",
    status: 'published',
    tags: ['legal', 'uscis', 'asile'],
    updatedAt: "2026-09-16T12:00:00.000Z",
  },
  properties: {
    poleNumber: 1,
    leadOfficer: "M. Alexandre K.",
  },
};

export const canonicalServiceNode: EngramNode = {
  id: 'service-translate',
  parentId: 'pole-legal',
  childrenIds: ['step-intake'],
  type: 'service',
  slug: 'traduction-assermentee-8cfr',
  meta: {
    title: "Traduction Certifiée 8 CFR § 1003.33",
    description: "Traduction formelle anglais/français avec attestation assermentée",
    status: 'published',
    tags: ['traduction', '8cfr', 'notaire'],
    updatedAt: "2026-09-16T12:00:00.000Z",
  },
  properties: {
    priceUsd: 45,
    turnaroundHours: 24,
  },
};

export const canonicalStepNode: EngramNode = {
  id: 'step-intake',
  parentId: 'service-translate',
  childrenIds: ['field-passport-upload'],
  type: 'step',
  slug: 'step-intake-documents',
  meta: {
    title: "Étape 1 · Numérisation des Originaux",
    description: "Dépôt des scans d'état civil au guichet",
    status: 'published',
    tags: ['intake', 'upload'],
    updatedAt: "2026-09-16T12:00:00.000Z",
  },
  properties: {
    stepOrder: 1,
  },
};

export const canonicalFieldNode: EngramNode = {
  id: 'field-passport-upload',
  parentId: 'step-intake',
  childrenIds: [],
  type: 'field',
  slug: 'passport-scan-pdf',
  meta: {
    title: "Passeport / Acte de Naissance (PDF/Scan)",
    description: "Scan couleur haute définition 300 DPI",
    status: 'published',
    tags: ['field', 'file'],
    updatedAt: "2026-09-16T12:00:00.000Z",
  },
  properties: {
    fieldType: 'file',
    required: true,
    acceptedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  },
  validationSchema: 'z.string().min(1, "Document file is required")',
};

export const canonicalValidSnapshot: CmsGraphSnapshot = {
  schemaVersion: CURRENT_CMS_SCHEMA_VERSION,
  rootIds: ['pole-legal'],
  updatedAt: "2026-09-16T12:00:00.000Z",
  nodes: {
    'pole-legal': canonicalPoleNode,
    'service-translate': canonicalServiceNode,
    'step-intake': canonicalStepNode,
    'field-passport-upload': canonicalFieldNode,
  },
};

/**
 * PRD-000 & PRD-006: Canonical Types for OMK Office Zustand CMS Foundations
 */

export type NodeType =
  | 'pole'          // Pôle d'activité (Legal, Finance, Career...)
  | 'service'       // Service d'affaires (OMK Translate, Quick CashFlow...)
  | 'package'       // Pack commercial (Pack JOB ATS, Pack SARL...)
  | 'step'          // Étape de formulaire ou de workflow
  | 'field'         // Champ interactif (input Zod déterministe)
  | 'media_doc'     // Capsule d'onboarding vidéo 7D / Document juridique
  | 'repeater_item';// Élément de collection récursive

export type NodeStatus = 'draft' | 'published' | 'archived';

export type AvatarStyle = 'mannequin_3d' | 'cinematic' | 'voice_only';

export interface VisualSecretaryConfig {
  videoId?: string;
  scriptSummary?: string;
  avatarStyle: AvatarStyle;
}

export interface EngramNodeMeta {
  title: string;
  description: string;
  status: NodeStatus;
  tags: string[];
  updatedAt: string;
}

export interface EngramNode {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  type: NodeType;
  slug: string;
  meta: EngramNodeMeta;
  properties: Record<string, any>;
  visualSecretary?: VisualSecretaryConfig;
  validationSchema?: string;
}

export type CmsNodeId = string;

export interface CmsGraphSnapshot {
  schemaVersion: number;
  nodes: Record<string, EngramNode>;
  rootIds: string[];
  updatedAt: string;
}

export interface ValidationIssue {
  path: string[];
  message: string;
}

export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  errors?: ValidationIssue[];
}

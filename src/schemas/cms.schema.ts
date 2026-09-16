import { z } from 'zod';
import { ValidationResult } from '../types/cms';

export const nodeTypeSchema = z.enum([
  'pole',
  'service',
  'package',
  'step',
  'field',
  'media_doc',
  'repeater_item',
]);

export const nodeStatusSchema = z.enum(['draft', 'published', 'archived']);

export const avatarStyleSchema = z.enum(['mannequin_3d', 'cinematic', 'voice_only']);

export const visualSecretarySchema = z.object({
  videoId: z.string().optional(),
  scriptSummary: z.string().optional(),
  avatarStyle: avatarStyleSchema,
});

export const engramNodeMetaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: nodeStatusSchema,
  tags: z.array(z.string()),
  updatedAt: z.string().min(1, "UpdatedAt timestamp is required"),
});

export const engramNodeSchema = z.object({
  id: z.string().min(1, "ID is required"),
  parentId: z.string().nullable(),
  childrenIds: z.array(z.string()),
  type: nodeTypeSchema,
  slug: z.string().min(1, "Slug is required"),
  meta: engramNodeMetaSchema,
  properties: z.record(z.string(), z.any()),
  visualSecretary: visualSecretarySchema.optional(),
  validationSchema: z.string().optional(),
});

export const cmsGraphSnapshotSchema = z.object({
  schemaVersion: z.number().int().positive(),
  nodes: z.record(z.string(), engramNodeSchema),
  rootIds: z.array(z.string()),
  updatedAt: z.string().min(1),
});

/**
 * Helper to validate an EngramNode safely returning a typed ValidationResult
 */
export function validateEngramNode(data: unknown): ValidationResult {
  const parseResult = engramNodeSchema.safeParse(data);
  if (parseResult.success) {
    return {
      success: true,
      data: parseResult.data,
    };
  }
  return {
    success: false,
    errors: parseResult.error.issues.map(issue => ({
      path: issue.path.map(p => String(p)),
      message: issue.message,
    })),
  };
}

/**
 * Helper to validate a CMS Graph Snapshot safely
 */
export function validateCmsGraphSnapshot(data: unknown): ValidationResult {
  const parseResult = cmsGraphSnapshotSchema.safeParse(data);
  if (parseResult.success) {
    return {
      success: true,
      data: parseResult.data,
    };
  }
  return {
    success: false,
    errors: parseResult.error.issues.map(issue => ({
      path: issue.path.map(p => String(p)),
      message: issue.message,
    })),
  };
}

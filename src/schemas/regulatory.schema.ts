import { z } from 'zod';

export const regulatoryRuleClassificationSchema = z.enum([
  'canonical',
  'informational',
  'placeholder',
  'blocked'
]);

export const regulatoryBlockerCodeSchema = z.enum([
  'BLOCKER_REGULATORY_SOURCE_REQUIRED',
  'BLOCKER_FINANCIAL_RULE_REQUIRED',
  'BLOCKER_RULE_VERSION_EXPIRED'
]);

export const regulatoryRuleSchema = z.object({
  id: z.string(),
  classification: regulatoryRuleClassificationSchema,
  source: z.string().min(1),
  jurisdiction: z.string().min(1),
  effectiveDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  version: z.string().min(1),
  lastVerifiedAt: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/)),
  description: z.string(),
  isExpired: z.boolean().optional()
});

export type RegulatoryRuleDTO = z.infer<typeof regulatoryRuleSchema>;

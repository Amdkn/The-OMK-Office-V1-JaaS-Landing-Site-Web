export type RegulatoryRuleClassification = 'canonical' | 'informational' | 'placeholder' | 'blocked';

export type RegulatoryBlockerCode =
  | 'BLOCKER_REGULATORY_SOURCE_REQUIRED'
  | 'BLOCKER_FINANCIAL_RULE_REQUIRED'
  | 'BLOCKER_RULE_VERSION_EXPIRED';

export interface RegulatoryRule {
  id: string;
  classification: RegulatoryRuleClassification;
  source: string; // e.g., 'USCIS', 'IRS'
  jurisdiction: string;
  effectiveDate: string; // ISO format date
  version: string;
  lastVerifiedAt: string; // ISO format datetime
  description: string;
  isExpired?: boolean;
}

export class RegulatoryError extends Error {
  public code: RegulatoryBlockerCode;

  constructor(message: string, code: RegulatoryBlockerCode) {
    super(message);
    this.name = 'RegulatoryError';
    this.code = code;
  }
}

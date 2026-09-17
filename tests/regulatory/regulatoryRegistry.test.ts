import { describe, it, expect, beforeEach } from 'vitest';
import { regulatoryRegistry } from '../../src/lib/regulatory/registry';
import { RegulatoryRule, RegulatoryError } from '../../src/types/regulatory';

describe('Regulatory Registry', () => {
  beforeEach(() => {
    regulatoryRegistry.clear();
  });

  const validCanonicalRule: RegulatoryRule = {
    id: 'rule-1',
    classification: 'canonical',
    source: 'USCIS',
    jurisdiction: 'Federal',
    effectiveDate: '2023-01-01',
    version: '1.0',
    lastVerifiedAt: '2023-10-01T12:00:00Z',
    description: 'Valid USCIS rule',
    isExpired: false,
  };

  it('registers and retrieves a valid canonical rule', () => {
    regulatoryRegistry.registerRule(validCanonicalRule);
    const rule = regulatoryRegistry.getCanonicalRule('rule-1');
    expect(rule).toEqual(validCanonicalRule);
  });

  it('throws BLOCKER_REGULATORY_SOURCE_REQUIRED if source is missing or invented', () => {
    const ruleWithNoSource: RegulatoryRule = {
      ...validCanonicalRule,
      id: 'rule-2',
      source: '',
    };
    regulatoryRegistry.registerRule(ruleWithNoSource);

    try {
      regulatoryRegistry.getCanonicalRule('rule-2');
      expect.fail('Should have thrown an error');
    } catch (e) {
      expect(e).toBeInstanceOf(RegulatoryError);
      if (e instanceof RegulatoryError) {
        expect(e.code).toBe('BLOCKER_REGULATORY_SOURCE_REQUIRED');
      }
    }

    const inventedRule: RegulatoryRule = {
      ...validCanonicalRule,
      id: 'rule-3',
      source: 'Invented',
    };
    regulatoryRegistry.registerRule(inventedRule);

    try {
      regulatoryRegistry.getCanonicalRule('rule-3');
      expect.fail('Should have thrown an error');
    } catch (e) {
      expect(e).toBeInstanceOf(RegulatoryError);
      if (e instanceof RegulatoryError) {
        expect(e.code).toBe('BLOCKER_REGULATORY_SOURCE_REQUIRED');
      }
    }
  });

  it('throws BLOCKER_RULE_VERSION_EXPIRED if rule is expired', () => {
    const expiredRule: RegulatoryRule = {
      ...validCanonicalRule,
      id: 'rule-expired',
      isExpired: true,
    };
    regulatoryRegistry.registerRule(expiredRule);

    try {
      regulatoryRegistry.getCanonicalRule('rule-expired');
      expect.fail('Should have thrown an error');
    } catch (e) {
      expect(e).toBeInstanceOf(RegulatoryError);
      if (e instanceof RegulatoryError) {
        expect(e.code).toBe('BLOCKER_RULE_VERSION_EXPIRED');
      }
    }
  });

  it('throws BLOCKER_REGULATORY_SOURCE_REQUIRED if rule is a placeholder', () => {
    const placeholderRule: RegulatoryRule = {
      ...validCanonicalRule,
      id: 'rule-placeholder',
      classification: 'placeholder',
    };
    regulatoryRegistry.registerRule(placeholderRule);

    try {
      regulatoryRegistry.getCanonicalRule('rule-placeholder');
      expect.fail('Should have thrown an error');
    } catch (e) {
      expect(e).toBeInstanceOf(RegulatoryError);
      if (e instanceof RegulatoryError) {
        expect(e.code).toBe('BLOCKER_REGULATORY_SOURCE_REQUIRED');
      }
    }
  });

  it('throws BLOCKER_FINANCIAL_RULE_REQUIRED for financial/DTI rule without version', () => {
    const financialRule: RegulatoryRule = {
      ...validCanonicalRule,
      id: 'rule-fin',
      source: 'Finance IRS',
      version: '',
    };
    regulatoryRegistry.registerRule(financialRule);

    try {
      regulatoryRegistry.getCanonicalRule('rule-fin');
      expect.fail('Should have thrown an error');
    } catch (e) {
      expect(e).toBeInstanceOf(RegulatoryError);
      if (e instanceof RegulatoryError) {
        expect(e.code).toBe('BLOCKER_FINANCIAL_RULE_REQUIRED');
      }
    }
  });
});

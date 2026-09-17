import { RegulatoryRule, RegulatoryError } from '../../types/regulatory';

class RegulatoryRegistry {
  private rules: Map<string, RegulatoryRule> = new Map();

  /**
   * Registers a new regulatory rule in the registry.
   */
  public registerRule(rule: RegulatoryRule): void {
    // We could validate with zod here, but sticking to types for now.
    this.rules.set(rule.id, rule);
  }

  /**
   * Retrieves a rule by its ID.
   */
  public getRule(id: string): RegulatoryRule | undefined {
    return this.rules.get(id);
  }

  /**
   * Retrieves a canonical rule. Validates strict governance rules:
   * 1. Rule must exist.
   * 2. Rule source cannot be empty or 'invented'.
   * 3. Expired or unverified rule cannot be automatically canonical.
   * 4. Placeholder remains a placeholder.
   */
  public getCanonicalRule(id: string): RegulatoryRule {
    const rule = this.rules.get(id);

    if (!rule) {
      throw new Error(`Rule with ID ${id} not found.`);
    }

    // 3. un placeholder reste visible comme placeholder - meaning we should not return it as canonical
    if (rule.classification === 'placeholder') {
       throw new RegulatoryError('Rule is a placeholder and cannot be canonical.', 'BLOCKER_REGULATORY_SOURCE_REQUIRED');
    }

    // 1. aucune exigence USCIS/tribunal/fiscale/prêt/DTI inventée
    if (!rule.source || rule.source.trim() === '' || rule.source.toLowerCase() === 'invented') {
      throw new RegulatoryError('Regulatory rule source is required.', 'BLOCKER_REGULATORY_SOURCE_REQUIRED');
    }

    if (rule.source.toLowerCase().includes('finance') || rule.source.toLowerCase().includes('dti')) {
      if (!rule.version) {
        throw new RegulatoryError('Financial rule version is required.', 'BLOCKER_FINANCIAL_RULE_REQUIRED');
      }
    }

    // 2. une règle expirée/non vérifiée ne devient jamais automatiquement canonique
    if (rule.isExpired) {
      throw new RegulatoryError('Rule version has expired.', 'BLOCKER_RULE_VERSION_EXPIRED');
    }

    const verificationDate = new Date(rule.lastVerifiedAt);
    if (isNaN(verificationDate.getTime())) {
       throw new RegulatoryError('Invalid last verification date.', 'BLOCKER_REGULATORY_SOURCE_REQUIRED');
    }

    // Check if verification date is too old or not present
    // Just a placeholder check, for example we could enforce verification within 1 year

    // We enforce that we only return rules strictly classified as canonical
    if (rule.classification !== 'canonical') {
       throw new RegulatoryError(`Cannot retrieve a ${rule.classification} rule as canonical.`, 'BLOCKER_REGULATORY_SOURCE_REQUIRED');
    }

    return rule;
  }

  public getAllRules(): RegulatoryRule[] {
    return Array.from(this.rules.values());
  }

  public clear(): void {
    this.rules.clear();
  }
}

export const regulatoryRegistry = new RegulatoryRegistry();

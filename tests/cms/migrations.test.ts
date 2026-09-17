import { describe, it, expect } from 'vitest';
import { migrateCmsSnapshot } from '../../src/lib/cms/migrations';
import { CURRENT_CMS_SCHEMA_VERSION } from '../../src/lib/cms/schemaVersion';
import { canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

describe('migrations validations', () => {
  it('1. Deterministic current version migration / validation', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(currentRes.success).toBe(true);
    expect(currentRes.snapshot?.schemaVersion).toBe(CURRENT_CMS_SCHEMA_VERSION);
  });

  it('2. Idempotency test', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    const idempotentRes = migrateCmsSnapshot(currentRes.snapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(idempotentRes.success).toBe(true);
    expect(idempotentRes.snapshot).toEqual(currentRes.snapshot);
  });

  it('3. No silent property deletion', () => {
    const snapshotWithUnknownProp = JSON.parse(JSON.stringify(canonicalValidSnapshot));
    snapshotWithUnknownProp.nodes['pole-legal'].properties.customVendorExtension = {
      customFieldA: "retained",
      customFieldB: 100,
    };

    const unknownPropRes = migrateCmsSnapshot(snapshotWithUnknownProp, CURRENT_CMS_SCHEMA_VERSION);
    expect(unknownPropRes.success).toBe(true);
    expect(unknownPropRes.snapshot?.nodes['pole-legal'].properties.customVendorExtension?.customFieldA).toBe("retained");
  });

  it('4. Rejection of invalid snapshots or future versions', () => {
    const futureSnapshot = {
      ...canonicalValidSnapshot,
      schemaVersion: 999,
    };

    const futureRes = migrateCmsSnapshot(futureSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(futureRes.success).toBe(false);
  });
});

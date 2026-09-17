import { describe, it, expect } from 'vitest';
import { migrateCmsSnapshot } from '../../src/lib/cms/migrations';
import { CURRENT_CMS_SCHEMA_VERSION } from '../../src/lib/cms/schemaVersion';
import { canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

describe('CMS Migrations', () => {
  it('Deterministic current version migration / validation', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(currentRes.success).toBe(true);
    expect(currentRes.snapshot?.schemaVersion).toBe(CURRENT_CMS_SCHEMA_VERSION);
  });

  it('Idempotency test: repeating migration on already up-to-date snapshot returns identical result', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    if (!currentRes.snapshot) throw new Error("Snapshot missing");

    const idempotentRes = migrateCmsSnapshot(currentRes.snapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(idempotentRes.success).toBe(true);
    expect(idempotentRes.snapshot).toEqual(currentRes.snapshot);
  });

  it('No silent property deletion: custom/unknown node properties remain intact after migration', () => {
    const snapshotWithUnknownProp = JSON.parse(JSON.stringify(canonicalValidSnapshot));
    snapshotWithUnknownProp.nodes['pole-legal'].properties.customVendorExtension = {
      customFieldA: "retained",
      customFieldB: 100,
    };

    const unknownPropRes = migrateCmsSnapshot(snapshotWithUnknownProp, CURRENT_CMS_SCHEMA_VERSION);
    expect(unknownPropRes.success).toBe(true);
    expect(unknownPropRes.snapshot?.nodes['pole-legal'].properties.customVendorExtension?.customFieldA).toBe("retained");
  });

  it('Rejection of invalid snapshots or future versions', () => {
    const futureSnapshot = {
      ...canonicalValidSnapshot,
      schemaVersion: 999,
    };

    const futureRes = migrateCmsSnapshot(futureSnapshot as any, CURRENT_CMS_SCHEMA_VERSION);
    expect(futureRes.success).toBe(false);
  });
});

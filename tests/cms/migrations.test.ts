import { describe, it, expect } from 'vitest';
import { migrateCmsSnapshot } from '../../src/lib/cms/migrations';
import { CURRENT_CMS_SCHEMA_VERSION } from '../../src/lib/cms/schemaVersion';
import { canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

describe('CMS Graph Migrations', () => {
  it('should deterministically migrate and validate current version', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(currentRes.success).toBe(true);
    expect(currentRes.snapshot?.schemaVersion).toBe(CURRENT_CMS_SCHEMA_VERSION);
  });

  it('should be idempotent', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    const idempotentRes = migrateCmsSnapshot(currentRes.snapshot!, CURRENT_CMS_SCHEMA_VERSION);
    expect(idempotentRes.success).toBe(true);
    expect(JSON.stringify(idempotentRes.snapshot)).toBe(JSON.stringify(currentRes.snapshot));
  });

  it('should not silently delete custom/unknown node properties', () => {
    const snapshotWithUnknownProp = JSON.parse(JSON.stringify(canonicalValidSnapshot));
    snapshotWithUnknownProp.nodes['pole-legal'].properties.customVendorExtension = {
      customFieldA: "retained",
      customFieldB: 100,
    };

    const unknownPropRes = migrateCmsSnapshot(snapshotWithUnknownProp, CURRENT_CMS_SCHEMA_VERSION);
    expect(unknownPropRes.success).toBe(true);
    expect(unknownPropRes.snapshot?.nodes['pole-legal'].properties.customVendorExtension?.customFieldA).toBe("retained");
  });

  it('should reject invalid snapshots or future versions', () => {
    const futureSnapshot = {
      ...canonicalValidSnapshot,
      schemaVersion: 999,
    };

    const futureRes = migrateCmsSnapshot(futureSnapshot as any, CURRENT_CMS_SCHEMA_VERSION);
    expect(futureRes.success).toBe(false);
  });
});

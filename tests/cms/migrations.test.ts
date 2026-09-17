import { describe, test, expect } from 'vitest';
import { migrateCmsSnapshot } from '../../src/lib/cms/migrations';
import { CURRENT_CMS_SCHEMA_VERSION } from '../../src/lib/cms/schemaVersion';
import { canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

describe('CMS Migrations', () => {
  test('Current version snapshot migration should succeed', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(currentRes.success).toBe(true);
    expect(currentRes.snapshot?.schemaVersion).toBe(CURRENT_CMS_SCHEMA_VERSION);
  });

  test('Repeated migration must be idempotent and succeed', () => {
    const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
    const idempotentRes = migrateCmsSnapshot(currentRes.snapshot, CURRENT_CMS_SCHEMA_VERSION);
    expect(idempotentRes.success).toBe(true);
    expect(JSON.stringify(idempotentRes.snapshot)).toBe(JSON.stringify(currentRes.snapshot));
  });

  test('Snapshot with unknown properties must migrate successfully and retain properties', () => {
    const snapshotWithUnknownProp = JSON.parse(JSON.stringify(canonicalValidSnapshot));
    snapshotWithUnknownProp.nodes['pole-legal'].properties.customVendorExtension = {
      customFieldA: "retained",
      customFieldB: 100,
    };

    const unknownPropRes = migrateCmsSnapshot(snapshotWithUnknownProp, CURRENT_CMS_SCHEMA_VERSION);
    expect(unknownPropRes.success).toBe(true);
    expect(unknownPropRes.snapshot?.nodes['pole-legal'].properties.customVendorExtension?.customFieldA).toBe("retained");
  });

  test('Future schema version must be rejected', () => {
    const futureSnapshot = {
      ...canonicalValidSnapshot,
      schemaVersion: 999,
    };

    const futureRes = migrateCmsSnapshot(futureSnapshot as any, CURRENT_CMS_SCHEMA_VERSION);
    expect(futureRes.success).toBe(false);
  });
});

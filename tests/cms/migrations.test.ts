import { migrateCmsSnapshot } from '../../src/lib/cms/migrations';
import { CURRENT_CMS_SCHEMA_VERSION } from '../../src/lib/cms/schemaVersion';
import { canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

console.log("Running Migration Tests...");

// 1. Deterministic current version migration / validation
const currentRes = migrateCmsSnapshot(canonicalValidSnapshot, CURRENT_CMS_SCHEMA_VERSION);
assert(currentRes.success === true, "Current version snapshot migration should succeed");
assert(currentRes.snapshot?.schemaVersion === CURRENT_CMS_SCHEMA_VERSION, "Target schemaVersion must match");

// 2. Idempotency test: repeating migration on already up-to-date snapshot returns identical result
const idempotentRes = migrateCmsSnapshot(currentRes.snapshot, CURRENT_CMS_SCHEMA_VERSION);
assert(idempotentRes.success === true, "Repeated migration must be idempotent and succeed");
assert(JSON.stringify(idempotentRes.snapshot) === JSON.stringify(currentRes.snapshot), "Snapshots must be identical");

// 3. No silent property deletion: custom/unknown node properties remain intact after migration
const snapshotWithUnknownProp = JSON.parse(JSON.stringify(canonicalValidSnapshot));
snapshotWithUnknownProp.nodes['pole-legal'].properties.customVendorExtension = {
  customFieldA: "retained",
  customFieldB: 100,
};

const unknownPropRes = migrateCmsSnapshot(snapshotWithUnknownProp, CURRENT_CMS_SCHEMA_VERSION);
assert(unknownPropRes.success === true, "Snapshot with unknown properties must migrate successfully");
assert(
  unknownPropRes.snapshot?.nodes['pole-legal'].properties.customVendorExtension?.customFieldA === "retained",
  "Unknown properties must not be silently deleted during migration"
);

// 4. Rejection of invalid snapshots or future versions
const futureSnapshot = {
  ...canonicalValidSnapshot,
  schemaVersion: 999,
};

const futureRes = migrateCmsSnapshot(futureSnapshot, CURRENT_CMS_SCHEMA_VERSION);
assert(futureRes.success === false, "Future schema version must be rejected");

console.log("✅ All Migration Tests Passed!");

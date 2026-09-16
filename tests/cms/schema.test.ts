import { validateEngramNode, validateCmsGraphSnapshot } from '../../src/schemas/cms.schema';
import { canonicalPoleNode, canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

console.log("Running Schema Validation Tests...");

// 1. Validate valid node
const poleResult = validateEngramNode(canonicalPoleNode);
assert(poleResult.success === true, "Valid pole node should pass schema validation");

// 2. Reject node missing required fields (e.g. missing id, type, slug)
const invalidNode = {
  parentId: null,
  childrenIds: [],
  meta: { title: "Invalid", description: "", status: "draft", tags: [], updatedAt: "2026-01-01" },
  properties: {},
};

const invalidResult = validateEngramNode(invalidNode);
assert(invalidResult.success === false, "Node missing id, type, slug should fail schema validation");
assert(invalidResult.errors !== undefined && invalidResult.errors.length >= 3, "Should report errors for missing fields");

// 3. Test dynamic properties validation
const nodeWithDynamicProps = {
  ...canonicalPoleNode,
  properties: {
    customNumber: 42,
    customString: "test",
    customObject: { nestedKey: true },
    customArray: [1, 2, 3],
  },
};
const dynamicResult = validateEngramNode(nodeWithDynamicProps);
assert(dynamicResult.success === true, "Node with dynamic nested properties should pass schema validation");

// 4. Validate complete valid CMS graph snapshot
const snapshotResult = validateCmsGraphSnapshot(canonicalValidSnapshot);
assert(snapshotResult.success === true, "Canonical graph snapshot should pass schema validation");

console.log("✅ All Schema Validation Tests Passed!");

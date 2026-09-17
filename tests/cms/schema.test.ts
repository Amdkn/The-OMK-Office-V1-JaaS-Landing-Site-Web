import { describe, it, expect } from 'vitest';
import { validateEngramNode, validateCmsGraphSnapshot } from '../../src/schemas/cms.schema';
import { canonicalPoleNode, canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

describe('Schema Validation', () => {
  it('Valid pole node should pass schema validation', () => {
    const poleResult = validateEngramNode(canonicalPoleNode);
    expect(poleResult.success).toBe(true);
  });

  it('Node missing id, type, slug should fail schema validation', () => {
    const invalidNode = {
      parentId: null,
      childrenIds: [],
      meta: { title: "Invalid", description: "", status: "draft", tags: [], updatedAt: "2026-01-01" },
      properties: {},
    };

    const invalidResult = validateEngramNode(invalidNode);
    expect(invalidResult.success).toBe(false);
    expect(invalidResult.errors && invalidResult.errors.length >= 3).toBe(true);
  });

  it('Node with dynamic nested properties should pass schema validation', () => {
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
    expect(dynamicResult.success).toBe(true);
  });

  it('Canonical graph snapshot should pass schema validation', () => {
    const snapshotResult = validateCmsGraphSnapshot(canonicalValidSnapshot);
    expect(snapshotResult.success).toBe(true);
  });
});

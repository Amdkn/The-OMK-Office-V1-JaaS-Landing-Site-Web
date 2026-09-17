import { describe, it, expect } from 'vitest';
import { validateEngramNode, validateCmsGraphSnapshot } from '../../src/schemas/cms.schema';
import { canonicalPoleNode, canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

describe('Schema Validation', () => {
  it('Validate valid node', () => {
    const poleResult = validateEngramNode(canonicalPoleNode);
    expect(poleResult.success).toBe(true);
  });

  it('Reject node missing required fields', () => {
    const invalidNode = {
      parentId: null,
      childrenIds: [],
      meta: { title: "Invalid", description: "", status: "draft", tags: [], updatedAt: "2026-01-01" },
      properties: {},
    };

    const invalidResult = validateEngramNode(invalidNode);
    expect(invalidResult.success).toBe(false);
    expect(invalidResult.errors?.length).toBeGreaterThanOrEqual(3);
  });

  it('Test dynamic properties validation', () => {
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

  it('Validate complete valid CMS graph snapshot', () => {
    const snapshotResult = validateCmsGraphSnapshot(canonicalValidSnapshot);
    expect(snapshotResult.success).toBe(true);
  });
});

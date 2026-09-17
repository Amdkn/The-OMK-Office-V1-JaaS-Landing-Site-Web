import { describe, test, expect } from 'vitest';
import { checkGraphInvariants } from '../../src/lib/cms/invariants';
import { canonicalValidSnapshot, canonicalPoleNode } from '../../src/lib/cms/fixtures';
import { CmsGraphSnapshot, EngramNode } from '../../src/types/cms';

describe('CMS Invariants', () => {
  test('Healthy canonical graph should pass all invariants', () => {
    const validResult = checkGraphInvariants(canonicalValidSnapshot);
    expect(validResult.success).toBe(true);
  });

  test('Self-parenting node must be rejected by invariants check', () => {
    const selfParentNode: EngramNode = {
      ...canonicalPoleNode,
      id: 'node-self',
      parentId: 'node-self',
    };

    const selfParentSnapshot: CmsGraphSnapshot = {
      ...canonicalValidSnapshot,
      nodes: {
        ...canonicalValidSnapshot.nodes,
        'node-self': selfParentNode,
      },
    };

    const selfParentResult = checkGraphInvariants(selfParentSnapshot);
    expect(selfParentResult.success).toBe(false);
    expect(selfParentResult.errors?.some(e => e.message.includes("cannot be its own parent"))).toBe(true);
  });

  test('Graph with cycles must be rejected', () => {
    const cycleNodeA: EngramNode = {
      ...canonicalPoleNode,
      id: 'cycle-a',
      parentId: 'cycle-b',
      childrenIds: ['cycle-b'],
    };

    const cycleNodeB: EngramNode = {
      ...canonicalPoleNode,
      id: 'cycle-b',
      parentId: 'cycle-a',
      childrenIds: ['cycle-a'],
    };

    const cycleSnapshot: CmsGraphSnapshot = {
      ...canonicalValidSnapshot,
      nodes: {
        ...canonicalValidSnapshot.nodes,
        'cycle-a': cycleNodeA,
        'cycle-b': cycleNodeB,
      },
    };

    const cycleResult = checkGraphInvariants(cycleSnapshot);
    expect(cycleResult.success).toBe(false);
    expect(cycleResult.errors?.some(e => e.message.includes("Cycle detected"))).toBe(true);
  });

  test('Node pointing to non-existent parent must be rejected', () => {
    const orphanParentSnapshot: CmsGraphSnapshot = {
      ...canonicalValidSnapshot,
      nodes: {
        ...canonicalValidSnapshot.nodes,
        'orphan-child': {
          ...canonicalPoleNode,
          id: 'orphan-child',
          parentId: 'non-existent-parent-999',
        },
      },
    };

    const orphanResult = checkGraphInvariants(orphanParentSnapshot);
    expect(orphanResult.success).toBe(false);
  });
});

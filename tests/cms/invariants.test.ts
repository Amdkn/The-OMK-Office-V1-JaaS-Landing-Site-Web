import { checkGraphInvariants } from '../../src/lib/cms/invariants';
import { canonicalValidSnapshot, canonicalPoleNode } from '../../src/lib/cms/fixtures';
import { CmsGraphSnapshot, EngramNode } from '../../src/types/cms';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

console.log("Running Invariants Tests...");

// 1. Healthy graph check
const validResult = checkGraphInvariants(canonicalValidSnapshot);
assert(validResult.success === true, "Healthy canonical graph should pass all invariants");

// 2. Self-parenting invariant rejection
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
assert(selfParentResult.success === false, "Self-parenting node must be rejected by invariants check");
assert(
  selfParentResult.errors?.some(e => e.message.includes("cannot be its own parent")) === true,
  "Should report self-parenting error message"
);

// 3. Cycle detection rejection
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
assert(cycleResult.success === false, "Graph with cycles must be rejected");
assert(
  cycleResult.errors?.some(e => e.message.includes("Cycle detected")) === true,
  "Should report cycle detected error message"
);

// 4. Orphan reference rejection
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
assert(orphanResult.success === false, "Node pointing to non-existent parent must be rejected");

console.log("✅ All Invariants Tests Passed!");

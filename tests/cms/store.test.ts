import { describe, it, expect, beforeEach } from 'vitest';
import { useCmsStore } from '../../src/stores/cms.store';
import { EngramNode } from '../../src/types/cms';

describe('useCmsStore', () => {
  beforeEach(() => {
    useCmsStore.setState({
      nodes: {},
      rootIds: [],
      activeNodeId: null,
      history: { past: [], future: [] }
    });
  });

  const createTestNode = (id: string, type: any = 'pole'): Omit<EngramNode, 'childrenIds'> => ({
    id,
    type,
    parentId: null,
    slug: id,
    meta: {
      title: `Node ${id}`,
      description: `Description ${id}`,
      status: 'draft',
      tags: [],
      updatedAt: new Date().toISOString()
    },
    properties: {}
  });

  it('addNode inserts node and updates rootIds if no parent', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('root1'));

    const state = useCmsStore.getState();
    expect(state.nodes['root1']).toBeDefined();
    expect(state.nodes['root1'].parentId).toBeNull();
    expect(state.rootIds).toContain('root1');
  });

  it('addNode inserts node and updates childrenIds of parent', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('root1'));
    store.addNode(createTestNode('child1'), 'root1');

    const state = useCmsStore.getState();
    expect(state.nodes['child1']).toBeDefined();
    expect(state.nodes['child1'].parentId).toBe('root1');
    expect(state.nodes['root1'].childrenIds).toContain('child1');
    expect(state.rootIds).not.toContain('child1');
  });

  it('updateNodeProperties updates the properties and preserves others', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('n1'));
    store.updateNodeProperties('n1', { customProp: 'value1' });

    const state = useCmsStore.getState();
    expect(state.nodes['n1'].properties.customProp).toBe('value1');
  });

  it('moveNode moves node to new parent and preserves order', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('root1'));
    store.addNode(createTestNode('root2'));
    store.addNode(createTestNode('child1'), 'root1');

    store.moveNode('child1', 'root2');

    const state = useCmsStore.getState();
    expect(state.nodes['child1'].parentId).toBe('root2');
    expect(state.nodes['root1'].childrenIds).not.toContain('child1');
    expect(state.nodes['root2'].childrenIds).toContain('child1');
  });

  it('moveNode prevents cyclic moves', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('root1'));
    store.addNode(createTestNode('child1'), 'root1');
    store.addNode(createTestNode('child2'), 'child1');

    store.moveNode('root1', 'child2'); // This should fail and not change state

    const state = useCmsStore.getState();
    expect(state.nodes['root1'].parentId).toBeNull();
  });

  it('deleteNodeTree deletes recursively and cleans up references', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('root1'));
    store.addNode(createTestNode('child1'), 'root1');
    store.addNode(createTestNode('grandchild1'), 'child1');
    store.addNode(createTestNode('root2'));

    store.deleteNodeTree('child1');

    const state = useCmsStore.getState();
    expect(state.nodes['child1']).toBeUndefined();
    expect(state.nodes['grandchild1']).toBeUndefined();
    expect(state.nodes['root1'].childrenIds).not.toContain('child1');
    expect(state.nodes['root1']).toBeDefined();
    expect(state.nodes['root2']).toBeDefined();
  });

  it('undo and redo restore state correctly', () => {
    const store = useCmsStore.getState();
    store.addNode(createTestNode('root1')); // Step 1
    store.addNode(createTestNode('root2')); // Step 2

    expect(useCmsStore.getState().rootIds).toEqual(['root1', 'root2']);

    useCmsStore.getState().undo(); // Undo step 2
    expect(useCmsStore.getState().rootIds).toEqual(['root1']);
    expect(useCmsStore.getState().nodes['root2']).toBeUndefined();

    useCmsStore.getState().redo(); // Redo step 2
    expect(useCmsStore.getState().rootIds).toEqual(['root1', 'root2']);
    expect(useCmsStore.getState().nodes['root2']).toBeDefined();
  });
});

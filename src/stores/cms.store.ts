import { create } from 'zustand';
import { EngramNode } from '../types/cms';

export interface CmsStoreState {
  nodes: Record<string, EngramNode>;
  rootIds: string[];
  activeNodeId: string | null;
  history: {
    past: Array<{ nodes: Record<string, EngramNode>, rootIds: string[] }>;
    future: Array<{ nodes: Record<string, EngramNode>, rootIds: string[] }>;
  };

  // Actions
  addNode: (node: Omit<EngramNode, 'childrenIds'>, parentId?: string | null) => void;
  updateNodeProperties: (id: string, properties: Partial<Record<string, any>>) => void;
  moveNode: (id: string, targetParentId: string | null, targetIndex?: number) => void;
  deleteNodeTree: (id: string) => void;
  setActiveNodeId: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
}

export const useCmsStore = create<CmsStoreState>((set, get) => ({
  nodes: {},
  rootIds: [],
  activeNodeId: null,
  history: {
    past: [],
    future: []
  },

  setActiveNodeId: (id) => set({ activeNodeId: id }),

  addNode: (node, parentId = null) => {
    const state = get();
    const newNode: EngramNode = {
      ...node,
      parentId,
      childrenIds: []
    };

    const newNodes = { ...state.nodes, [newNode.id]: newNode };
    const newRootIds = [...state.rootIds];

    if (parentId && newNodes[parentId]) {
      const parent = newNodes[parentId];
      newNodes[parentId] = {
        ...parent,
        childrenIds: [...parent.childrenIds, newNode.id]
      };
    } else {
      newNode.parentId = null; // Ensure parentId is null
      newRootIds.push(newNode.id);
    }

    set({
      nodes: newNodes,
      rootIds: newRootIds,
      history: {
        past: [...state.history.past, { nodes: state.nodes, rootIds: state.rootIds }],
        future: []
      }
    });
  },

  updateNodeProperties: (id, properties) => {
    const state = get();
    if (!state.nodes[id]) return;

    const newNodes = {
      ...state.nodes,
      [id]: {
        ...state.nodes[id],
        properties: {
          ...state.nodes[id].properties,
          ...properties
        }
      }
    };

    set({
      nodes: newNodes,
      history: {
        past: [...state.history.past, { nodes: state.nodes, rootIds: state.rootIds }],
        future: []
      }
    });
  },

  moveNode: (id, targetParentId, targetIndex) => {
    const state = get();
    const node = state.nodes[id];
    if (!node) return;

    // Prevent cyclic moves
    let current: string | null = targetParentId;
    while (current !== null) {
      if (current === id) return; // Cycle detected
      current = state.nodes[current]?.parentId || null;
    }

    const newNodes = { ...state.nodes };
    let newRootIds = [...state.rootIds];
    const oldParentId = node.parentId;

    // Remove from old parent
    if (oldParentId && newNodes[oldParentId]) {
      newNodes[oldParentId] = {
        ...newNodes[oldParentId],
        childrenIds: newNodes[oldParentId].childrenIds.filter(childId => childId !== id)
      };
    } else {
      newRootIds = newRootIds.filter(childId => childId !== id);
    }

    // Update node's parentId
    newNodes[id] = { ...node, parentId: targetParentId };

    // Add to new parent
    if (targetParentId && newNodes[targetParentId]) {
      const newChildren = [...newNodes[targetParentId].childrenIds];
      if (targetIndex !== undefined && targetIndex >= 0) {
        newChildren.splice(targetIndex, 0, id);
      } else {
        newChildren.push(id);
      }
      newNodes[targetParentId] = {
        ...newNodes[targetParentId],
        childrenIds: newChildren
      };
    } else {
      newNodes[id].parentId = null;
      if (targetIndex !== undefined && targetIndex >= 0) {
        newRootIds.splice(targetIndex, 0, id);
      } else {
        newRootIds.push(id);
      }
    }

    set({
      nodes: newNodes,
      rootIds: newRootIds,
      history: {
        past: [...state.history.past, { nodes: state.nodes, rootIds: state.rootIds }],
        future: []
      }
    });
  },

  deleteNodeTree: (id) => {
    const state = get();
    if (!state.nodes[id]) return;

    const newNodes = { ...state.nodes };
    let newRootIds = [...state.rootIds];
    const nodeToDelete = newNodes[id];

    // Remove from parent
    if (nodeToDelete.parentId && newNodes[nodeToDelete.parentId]) {
      newNodes[nodeToDelete.parentId] = {
        ...newNodes[nodeToDelete.parentId],
        childrenIds: newNodes[nodeToDelete.parentId].childrenIds.filter(childId => childId !== id)
      };
    } else {
      newRootIds = newRootIds.filter(childId => childId !== id);
    }

    // Cascade delete
    const deleteRecursively = (nodeId: string) => {
      const node = newNodes[nodeId];
      if (!node) return;
      // Copy childrenIds because we will mutate during recursion
      const children = [...node.childrenIds];
      children.forEach(deleteRecursively);
      delete newNodes[nodeId];
    };

    deleteRecursively(id);

    set({
      nodes: newNodes,
      rootIds: newRootIds,
      history: {
        past: [...state.history.past, { nodes: state.nodes, rootIds: state.rootIds }],
        future: []
      }
    });
  },

  undo: () => {
    const state = get();
    if (state.history.past.length === 0) return;

    const newPast = [...state.history.past];
    const previousState = newPast.pop()!;

    set({
      nodes: previousState.nodes,
      rootIds: previousState.rootIds,
      history: {
        past: newPast,
        future: [{ nodes: state.nodes, rootIds: state.rootIds }, ...state.history.future]
      }
    });
  },

  redo: () => {
    const state = get();
    if (state.history.future.length === 0) return;

    const newFuture = [...state.history.future];
    const nextState = newFuture.shift()!;

    set({
      nodes: nextState.nodes,
      rootIds: nextState.rootIds,
      history: {
        past: [...state.history.past, { nodes: state.nodes, rootIds: state.rootIds }],
        future: newFuture
      }
    });
  }
}));

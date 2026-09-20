import { describe, it, expect, beforeEach } from 'vitest';
import { useDossierStore } from '../../../src/stores/dossier/dossierStore';

describe('Dossier Progress Deterministic Logic (PRD-043)', () => {
  beforeEach(() => {
    // Reset state before each test if necessary
    const store = useDossierStore.getState();
    store.setActiveDossier('i589');

    // We expect the store to be initialized with 5 steps for 'i589', where 2 are 'completed' by default
    // so progress is 40% (2/5 = 0.4)
  });

  it('calculates deterministic progress initially', () => {
    const store = useDossierStore.getState();
    const progress = store.getProgress('i589');
    expect(progress).toBe(40); // 2 out of 5 steps completed
  });

  it('updates step status deterministically and recalculates progress', () => {
    const store = useDossierStore.getState();

    // Mark step 3 as completed
    store.updateStepStatus('i589', 3, 'completed');

    const progress = useDossierStore.getState().getProgress('i589');
    expect(progress).toBe(60); // 3 out of 5 steps completed
  });

  it('handles cross-service isolation and gracefully handles unknown services', () => {
    const store = useDossierStore.getState();

    // Check progress of an unknown dossier
    const progress = store.getProgress('unknown-dossier');
    expect(progress).toBe(0);

    // Ensure updating unknown dossier does not crash
    store.updateStepStatus('unknown-dossier', 1, 'completed');
    expect(useDossierStore.getState().getProgress('unknown-dossier')).toBe(0);
  });
});

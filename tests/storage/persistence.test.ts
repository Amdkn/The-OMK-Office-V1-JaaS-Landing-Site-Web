import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { saveCmsSnapshot, loadCmsSnapshot } from '../../src/lib/storage/persistence';
import { clear } from 'idb-keyval';
import { CmsGraphSnapshot } from '../../src/types/cms';
import * as idb from 'idb-keyval';

vi.mock('idb-keyval', async (importOriginal) => {
    const mod = await importOriginal<typeof import('idb-keyval')>();
    return {
        ...mod,
    };
});

describe('Persistence module', () => {
  beforeEach(async () => {
    await clear();
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should save and load a snapshot successfully', async () => {
    const validSnapshot: CmsGraphSnapshot = {
      schemaVersion: 1,
      nodes: {
        'root-1': {
          id: 'root-1',
          parentId: null,
          childrenIds: [],
          type: 'pole',
          slug: 'root',
          meta: { title: 'Root', description: '', status: 'draft', tags: [], updatedAt: new Date().toISOString() },
          properties: {}
        }
      },
      rootIds: ['root-1'],
      updatedAt: new Date().toISOString()
    };

    const saveResult = await saveCmsSnapshot(validSnapshot);
    expect(saveResult).toBe('local_saved');

    const loadResult = await loadCmsSnapshot();
    expect(loadResult.state).toBe('local_saved');
    expect(loadResult.snapshot).toEqual(validSnapshot);
  });

  it('should handle QuotaExceededError when saving', async () => {
    const validSnapshot: CmsGraphSnapshot = {
      schemaVersion: 1,
      nodes: {},
      rootIds: [],
      updatedAt: new Date().toISOString()
    };

    vi.spyOn(idb, 'set').mockRejectedValueOnce({ name: 'QuotaExceededError' });

    const result = await saveCmsSnapshot(validSnapshot);
    expect(result).toBe('recovery_required');
  });

  it('should handle unavailable IDB (e.g. private browsing)', async () => {
    const validSnapshot: CmsGraphSnapshot = {
      schemaVersion: 1,
      nodes: {},
      rootIds: [],
      updatedAt: new Date().toISOString()
    };

    vi.spyOn(idb, 'set').mockRejectedValueOnce(new Error('UnknownError'));

    const result = await saveCmsSnapshot(validSnapshot);
    expect(result).toBe('sync_unavailable');
  });

  it('should handle migration failure on load', async () => {
    vi.spyOn(idb, 'get').mockResolvedValueOnce({
        schemaVersion: 999, // Future version cannot be migrated
        nodes: {},
        rootIds: [],
        updatedAt: new Date().toISOString()
    });

    const loadResult = await loadCmsSnapshot();
    expect(loadResult.state).toBe('recovery_required');
    expect(loadResult.snapshot).toBeNull();
  });

  it('should handle corrupt invariants on load', async () => {
    vi.spyOn(idb, 'get').mockResolvedValueOnce({
        schemaVersion: 1,
        nodes: {
            'node-1': {
                id: 'node-1',
                parentId: 'node-1', // cycle / self-parenting
                childrenIds: [],
                type: 'pole',
                slug: 'test',
                meta: { title: 'Test', description: '', status: 'draft', tags: [], updatedAt: new Date().toISOString() },
                properties: {}
            }
        },
        rootIds: ['node-1'],
        updatedAt: new Date().toISOString()
    });

    const loadResult = await loadCmsSnapshot();
    expect(loadResult.state).toBe('recovery_required');
    expect(loadResult.snapshot).toBeNull();
  });
});

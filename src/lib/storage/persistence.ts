import { get, set } from 'idb-keyval';
import { migrateCmsSnapshot } from '../cms/migrations';
import { checkGraphInvariants } from '../cms/invariants';
import { CmsGraphSnapshot } from '../../types/cms';

export type SyncState = 'local_saved' | 'sync_pending' | 'synced' | 'sync_unavailable' | 'recovery_required';

export interface StorageOptions {
  namespace: string;
}

export const CMS_STORAGE_KEY = 'omk:cms:snapshot';

export async function saveCmsSnapshot(snapshot: CmsGraphSnapshot): Promise<SyncState> {
  try {
    const serialized = JSON.parse(JSON.stringify(snapshot)); // Strip prototypes if any
    await set(CMS_STORAGE_KEY, serialized);
    return 'local_saved';
  } catch (err: any) {
    if (err.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      return 'recovery_required';
    }
    console.error('Failed to save to IDB', err);
    return 'sync_unavailable';
  }
}

export async function loadCmsSnapshot(): Promise<{ snapshot: CmsGraphSnapshot | null, state: SyncState }> {
  try {
    const rawData = await get(CMS_STORAGE_KEY);
    if (!rawData) {
      return { snapshot: null, state: 'local_saved' };
    }

    const migrationResult = migrateCmsSnapshot(rawData);
    if (!migrationResult.success || !migrationResult.snapshot) {
       console.error('Migration failed:', migrationResult.error);
       return { snapshot: null, state: 'recovery_required' };
    }

    const invariantResult = checkGraphInvariants(migrationResult.snapshot);
    if (!invariantResult.success) {
      console.error('Graph corrupted:', invariantResult.errors);
      return { snapshot: null, state: 'recovery_required' };
    }

    return { snapshot: invariantResult.data!, state: 'local_saved' };

  } catch (err) {
    console.error('Failed to load from IDB', err);
    return { snapshot: null, state: 'sync_unavailable' };
  }
}

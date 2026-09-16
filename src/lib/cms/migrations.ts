import { CURRENT_CMS_SCHEMA_VERSION } from './schemaVersion';
import { CmsGraphSnapshot, ValidationResult } from '../../types/cms';
import { validateCmsGraphSnapshot } from '../../schemas/cms.schema';

export interface MigrationResult {
  success: boolean;
  snapshot?: CmsGraphSnapshot;
  error?: string;
}

/**
 * PRD-007: Pure, deterministic migration function.
 * Transforms an arbitrary snapshot to the target version safely without losing unknown properties.
 */
export function migrateCmsSnapshot(
  rawSnapshot: any,
  targetVersion: number = CURRENT_CMS_SCHEMA_VERSION
): MigrationResult {
  if (!rawSnapshot || typeof rawSnapshot !== 'object') {
    return {
      success: false,
      error: 'Invalid raw snapshot: snapshot must be an object',
    };
  }

  const fromVersion = Number(rawSnapshot.schemaVersion);
  if (!Number.isInteger(fromVersion) || fromVersion < 1) {
    return {
      success: false,
      error: `Invalid or missing schemaVersion: ${rawSnapshot.schemaVersion}`,
    };
  }

  if (fromVersion > targetVersion) {
    return {
      success: false,
      error: `Future schemaVersion ${fromVersion} cannot be migrated backward to ${targetVersion}`,
    };
  }

  // Deep clone to preserve source snapshot
  let currentSnapshot: CmsGraphSnapshot = JSON.parse(JSON.stringify(rawSnapshot));

  // Step-by-step sequential migration loop
  let currentVersion = fromVersion;
  while (currentVersion < targetVersion) {
    if (currentVersion === 1) {
      // Example migration from v1 to v2 if defined in future
      // currentSnapshot = migrateV1ToV2(currentSnapshot);
      currentVersion++;
    } else {
      return {
        success: false,
        error: `No migration handler defined for version ${currentVersion}`,
      };
    }
  }

  currentSnapshot.schemaVersion = targetVersion;

  const validation: ValidationResult = validateCmsGraphSnapshot(currentSnapshot);
  if (!validation.success) {
    const issueMsgs = validation.errors?.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return {
      success: false,
      error: `Migrated snapshot failed schema validation: ${issueMsgs}`,
    };
  }

  return {
    success: true,
    snapshot: validation.data as CmsGraphSnapshot,
  };
}

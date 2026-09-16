import { describe, it, expect } from 'vitest';
import { resolvePath, buildBreadcrumb } from '../../src/lib/cms/path-resolver';
import { mockCmsApi } from '../mocks/cmsMock';
import { canonicalPoleNode, canonicalServiceNode, canonicalStepNode, canonicalFieldNode } from '../../src/lib/cms/fixtures';
import { ICmsPublicApi } from '../../src/contracts/cmsPublicApi';
import { EngramNode, ValidationResult } from '../../src/types/cms';

describe('path-resolver', () => {
  describe('resolvePath', () => {
    it('resolves a valid path successfully', () => {
      const path = ['pole-1-legal', 'traduction-assermentee-8cfr', 'step-intake-documents'];
      const result = resolvePath(mockCmsApi, path);

      expect(result.status).toBe('found');
      expect(result.node).toEqual(canonicalStepNode);
      expect(result.breadcrumb).toHaveLength(3);
      expect(result.breadcrumb[0]).toEqual(canonicalPoleNode);
      expect(result.breadcrumb[1]).toEqual(canonicalServiceNode);
      expect(result.breadcrumb[2]).toEqual(canonicalStepNode);
    });

    it('handles empty path string', () => {
      const result = resolvePath(mockCmsApi, '/');
      expect(result.status).toBe('invalid_path');
      expect(result.breadcrumb).toHaveLength(0);
    });

    it('handles empty array path', () => {
      const result = resolvePath(mockCmsApi, []);
      expect(result.status).toBe('invalid_path');
      expect(result.breadcrumb).toHaveLength(0);
    });

    it('returns not_found for non-existent root slug', () => {
      const result = resolvePath(mockCmsApi, ['non-existent-pole']);
      expect(result.status).toBe('not_found');
      expect(result.node).toBeUndefined();
      expect(result.breadcrumb).toHaveLength(0);
    });

    it('returns not_found for valid root but non-existent child slug', () => {
      const result = resolvePath(mockCmsApi, ['pole-1-legal', 'non-existent-service']);
      expect(result.status).toBe('not_found');
      expect(result.node).toBeUndefined();
      expect(result.breadcrumb).toHaveLength(1);
      expect(result.breadcrumb[0]).toEqual(canonicalPoleNode);
    });

    it('supports string paths as well as array paths', () => {
      const path = '/pole-1-legal/traduction-assermentee-8cfr/step-intake-documents/';
      const result = resolvePath(mockCmsApi, path);

      expect(result.status).toBe('found');
      expect(result.node).toEqual(canonicalStepNode);
      expect(result.breadcrumb).toHaveLength(3);
    });
  });

  describe('buildBreadcrumb', () => {
    it('builds a breadcrumb from a deeply nested node', () => {
      const breadcrumb = buildBreadcrumb(mockCmsApi, 'field-passport-upload');
      expect(breadcrumb).toHaveLength(4);
      expect(breadcrumb[0]).toEqual(canonicalPoleNode);
      expect(breadcrumb[1]).toEqual(canonicalServiceNode);
      expect(breadcrumb[2]).toEqual(canonicalStepNode);
      expect(breadcrumb[3]).toEqual(canonicalFieldNode);
    });

    it('builds a breadcrumb for a root node', () => {
      const breadcrumb = buildBreadcrumb(mockCmsApi, 'pole-legal');
      expect(breadcrumb).toHaveLength(1);
      expect(breadcrumb[0]).toEqual(canonicalPoleNode);
    });

    it('returns empty array for non-existent node', () => {
      const breadcrumb = buildBreadcrumb(mockCmsApi, 'non-existent-id');
      expect(breadcrumb).toHaveLength(0);
    });

    it('protects against infinite loops (cyclic dependencies)', () => {
      // Create a mock API that has a cycle
      const cyclicNodeA: EngramNode = { ...canonicalPoleNode, id: 'node-a', parentId: 'node-b' };
      const cyclicNodeB: EngramNode = { ...canonicalPoleNode, id: 'node-b', parentId: 'node-a' };

      const cycleMockApi: ICmsPublicApi = {
        getNodeById: (id: string) => {
          if (id === 'node-a') return cyclicNodeA;
          if (id === 'node-b') return cyclicNodeB;
          return undefined;
        },
        getChildrenNodes: () => [],
        mutateProperty: () => ({ success: true }),
        subscribeToNode: () => () => {},
      };

      const breadcrumb = buildBreadcrumb(cycleMockApi, 'node-a');
      expect(breadcrumb.length).toBe(2);
      expect(breadcrumb[0].id).toBe('node-b');
      expect(breadcrumb[1].id).toBe('node-a');
    });

    it('protects against depth exceeding 10', () => {
      const depthMockApi: ICmsPublicApi = {
        getNodeById: (id: string) => {
          const numId = parseInt(id.split('-')[1]);
          return {
            ...canonicalPoleNode,
            id,
            parentId: numId > 0 ? `node-${numId - 1}` : null,
          };
        },
        getChildrenNodes: () => [],
        mutateProperty: () => ({ success: true }),
        subscribeToNode: () => () => {},
      };

      // Query node-15, max depth is 10, so we should get nodes 6 to 15
      const breadcrumb = buildBreadcrumb(depthMockApi, 'node-15');
      expect(breadcrumb.length).toBe(10);
      expect(breadcrumb[0].id).toBe('node-6');
      expect(breadcrumb[9].id).toBe('node-15');
    });
  });
});

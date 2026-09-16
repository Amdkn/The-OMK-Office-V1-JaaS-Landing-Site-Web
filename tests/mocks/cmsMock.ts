import { ICmsPublicApi } from '../../src/contracts/cmsPublicApi';
import { EngramNode, ValidationResult } from '../../src/types/cms';
import { canonicalValidSnapshot } from '../../src/lib/cms/fixtures';

export class MockCmsPublicApi implements ICmsPublicApi {
  getNodeById(id: string): EngramNode | undefined {
    return canonicalValidSnapshot.nodes[id];
  }

  getChildrenNodes(parentId: string | null): EngramNode[] {
    if (parentId === null) {
      return canonicalValidSnapshot.rootIds.map(id => canonicalValidSnapshot.nodes[id]);
    }
    const node = this.getNodeById(parentId);
    if (!node) return [];
    return node.childrenIds.map(id => canonicalValidSnapshot.nodes[id]).filter(n => n !== undefined);
  }

  mutateProperty<T>(nodeId: string, propertyKey: string, value: T): ValidationResult {
    return { success: true };
  }

  subscribeToNode(nodeId: string, callback: (node: EngramNode) => void): () => void {
    return () => {};
  }
}

export const mockCmsApi = new MockCmsPublicApi();

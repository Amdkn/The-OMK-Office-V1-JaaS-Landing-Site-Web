import { ICmsPublicApi } from '../../contracts/cmsPublicApi';
import { EngramNode } from '../../types/cms';

export type PathResolveStatus = 'found' | 'not_found' | 'invalid_path';

export interface PathResolveResult {
  status: PathResolveStatus;
  node?: EngramNode;
  breadcrumb: EngramNode[];
}

export function resolvePath(api: ICmsPublicApi, path: string | string[]): PathResolveResult {
  const slugs = typeof path === 'string'
    ? path.split('/').filter(Boolean)
    : path.filter(Boolean);

  if (slugs.length === 0) {
    return { status: 'invalid_path', breadcrumb: [] };
  }

  let currentNode: EngramNode | undefined;
  const breadcrumb: EngramNode[] = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const parentId = currentNode ? currentNode.id : null;
    const children = api.getChildrenNodes(parentId);

    currentNode = children.find(child => child.slug === slug);

    if (!currentNode) {
      return { status: 'not_found', breadcrumb };
    }

    breadcrumb.push(currentNode);
  }

  return {
    status: 'found',
    node: currentNode,
    breadcrumb
  };
}

export function buildBreadcrumb(api: ICmsPublicApi, nodeId: string): EngramNode[] {
  const breadcrumb: EngramNode[] = [];
  let currentNode = api.getNodeById(nodeId);
  let depth = 0;
  const MAX_DEPTH = 10;
  const seenIds = new Set<string>();

  while (currentNode && depth < MAX_DEPTH) {
    if (seenIds.has(currentNode.id)) {
      // Cycle detected
      break;
    }
    seenIds.add(currentNode.id);
    breadcrumb.unshift(currentNode);
    if (!currentNode.parentId) {
      break;
    }
    currentNode = api.getNodeById(currentNode.parentId);
    depth++;
  }

  return breadcrumb;
}

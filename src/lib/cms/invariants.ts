import { EngramNode, CmsGraphSnapshot, ValidationResult, ValidationIssue } from '../../types/cms';
import { validateEngramNode, validateCmsGraphSnapshot } from '../../schemas/cms.schema';

/**
 * PRD-000 & PRD-006 Invariant Checker
 * Verifies graph adjacency, self-parenting prevention, cycle detection, and orphan checks.
 */
export function checkGraphInvariants(snapshot: CmsGraphSnapshot): ValidationResult<CmsGraphSnapshot> {
  const schemaValidation = validateCmsGraphSnapshot(snapshot);
  if (!schemaValidation.success) {
    return schemaValidation;
  }

  const issues: ValidationIssue[] = [];
  const nodes = snapshot.nodes;
  const nodeIds = new Set(Object.keys(nodes));

  // 1. Check parentId !== id and parent existence
  for (const [id, node] of Object.entries(nodes)) {
    if (node.parentId === id) {
      issues.push({
        path: ['nodes', id, 'parentId'],
        message: `Node '${id}' cannot be its own parent (self-parenting invariant violation)`,
      });
    }

    if (node.parentId !== null && !nodeIds.has(node.parentId)) {
      issues.push({
        path: ['nodes', id, 'parentId'],
        message: `Node '${id}' references non-existent parent '${node.parentId}'`,
      });
    }

    // Check children existence and parent-child consistency
    for (const childId of node.childrenIds) {
      if (!nodeIds.has(childId)) {
        issues.push({
          path: ['nodes', id, 'childrenIds'],
          message: `Node '${id}' references non-existent child '${childId}' (orphan reference)`,
        });
      } else {
        const childNode = nodes[childId];
        if (childNode.parentId !== id) {
          issues.push({
            path: ['nodes', childId, 'parentId'],
            message: `Child '${childId}' has parentId '${childNode.parentId}', expected '${id}'`,
          });
        }
      }
    }
  }

  // 2. Cycle detection using Depth First Search (DFS)
  const visited = new Set<string>();
  const inRecursionStack = new Set<string>();

  function hasCycleDFS(nodeId: string, pathStack: string[]): boolean {
    visited.add(nodeId);
    inRecursionStack.add(nodeId);
    pathStack.push(nodeId);

    const node = nodes[nodeId];
    if (node) {
      for (const childId of node.childrenIds) {
        if (!visited.has(childId)) {
          if (nodes[childId] && hasCycleDFS(childId, pathStack)) {
            return true;
          }
        } else if (inRecursionStack.has(childId)) {
          // Cycle detected!
          const cyclePath = pathStack.slice(pathStack.indexOf(childId)).concat(childId).join(' -> ');
          issues.push({
            path: ['nodes', nodeId],
            message: `Cycle detected in graph hierarchy: ${cyclePath}`,
          });
          return true;
        }
      }
    }

    inRecursionStack.delete(nodeId);
    pathStack.pop();
    return false;
  }

  for (const id of nodeIds) {
    if (!visited.has(id)) {
      hasCycleDFS(id, []);
    }
  }

  if (issues.length > 0) {
    return {
      success: false,
      errors: issues,
    };
  }

  return {
    success: true,
    data: snapshot,
  };
}

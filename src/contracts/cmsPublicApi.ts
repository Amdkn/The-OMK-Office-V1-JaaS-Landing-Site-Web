import { EngramNode, ValidationResult } from '../types/cms';
export interface ICmsPublicApi {
  getNodeById: (id: string) => EngramNode | undefined;
  getChildrenNodes: (parentId: string | null) => EngramNode[];
  mutateProperty: <T>(nodeId: string, propertyKey: string, value: T) => ValidationResult;
  subscribeToNode: (nodeId: string, callback: (node: EngramNode) => void) => () => void;
}

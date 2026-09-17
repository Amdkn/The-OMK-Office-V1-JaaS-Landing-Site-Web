import { migrateCmsSnapshot } from './src/lib/cms/migrations';
import { canonicalValidSnapshot } from './src/lib/cms/fixtures';

const v1Snapshot = {
  ...canonicalValidSnapshot,
  schemaVersion: 1,
  nodes: { ...canonicalValidSnapshot.nodes }
};

const nodeA = v1Snapshot.nodes['pole-legal'];
const { properties, ...nodeWithoutProps } = nodeA;
v1Snapshot.nodes['pole-legal'] = nodeWithoutProps as any;

const result = migrateCmsSnapshot(v1Snapshot);
console.log(result);

import { migrateCmsSnapshot } from './src/lib/cms/migrations.js';
import { canonicalValidSnapshot } from './src/lib/cms/fixtures.js';

const v1Snapshot = {
  ...canonicalValidSnapshot,
  schemaVersion: 1,
  nodes: { ...canonicalValidSnapshot.nodes }
};

const nodeA = v1Snapshot.nodes['pole-legal'];
const { properties, ...nodeWithoutProps } = nodeA;
v1Snapshot.nodes['pole-legal'] = nodeWithoutProps;

const result = migrateCmsSnapshot(v1Snapshot);
console.log(result);

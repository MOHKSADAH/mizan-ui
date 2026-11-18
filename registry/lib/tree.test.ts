import { expect, test } from 'bun:test';
import { findByFirstChar, flattenTree } from './tree';

type N = { id: string; children?: N[] };
const nodes: N[] = [
  { id: 'a', children: [{ id: 'a1' }, { id: 'a2', children: [{ id: 'a2x' }] }] },
  { id: 'b' },
];

test('collapsed parents hide their children', () => {
  const rows = flattenTree(nodes, new Set());
  expect(rows.map((r) => r.node.id)).toEqual(['a', 'b']);
  expect(rows[0].expanded).toBe(false);
  expect(rows[1].expanded).toBeUndefined();
});

test('expanded parents show children with level, set size and position', () => {
  const rows = flattenTree(nodes, new Set(['a', 'a2']));
  expect(rows.map((r) => r.node.id)).toEqual(['a', 'a1', 'a2', 'a2x', 'b']);
  expect(rows[2]).toMatchObject({ level: 2, setSize: 2, posInSet: 2, parentId: 'a', expanded: true });
  expect(rows[3]).toMatchObject({ level: 3, setSize: 1, posInSet: 1, parentId: 'a2' });
});

test('type-ahead finds the next match after the current row and wraps', () => {
  const texts = ['Apple', 'banana', 'Avocado', 'ملف'];
  expect(findByFirstChar(texts, 0, 'a')).toBe(2);
  expect(findByFirstChar(texts, 2, 'A')).toBe(0);
  expect(findByFirstChar(texts, 0, 'م')).toBe(3);
  expect(findByFirstChar(texts, 0, 'z')).toBe(-1);
});

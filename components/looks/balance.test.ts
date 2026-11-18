import { expect, test } from 'bun:test';
import { balance } from './balance';

const tallest = (h: number[], cols: number[], n: number) =>
  Math.max(...Array.from({ length: n }, (_, c) => h.reduce((s, x, i) => s + (cols[i] === c ? x : 0), 0)));

test('beats greedy shortest-column on the classic case', () => {
  const h = [3, 3, 2, 2, 2];
  // greedy ends at 7 (3+2+2 against 3+2); min-max is 6 (3+3 against 2+2+2).
  expect(tallest(h, balance(h, 2), 2)).toBe(6);
});

test('keeps one column per card for a single column and handles fewer cards than columns', () => {
  expect(balance([5, 5, 5], 1)).toEqual([0, 0, 0]);
  expect(balance([5, 5], 3)).toEqual([0, 1]);
});

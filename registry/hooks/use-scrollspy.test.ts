import { expect, test } from 'bun:test';
import { pickActive } from './use-scrollspy';

const ids = ['intro', 'usage', 'api'];

test('picks the last heading that has passed the line', () => {
  expect(pickActive(ids, [-400, -50, 300], 100)).toBe('usage');
  expect(pickActive(ids, [-400, -50, 90], 100)).toBe('api');
});

test('nothing is active before the first heading', () => {
  expect(pickActive(ids, [200, 500, 900], 100)).toBeUndefined();
});

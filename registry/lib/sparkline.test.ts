import { expect, test } from 'bun:test';
import { sparklinePoints } from './sparkline';

test('scales the series into the box with padding', () => {
  expect(sparklinePoints([0, 5, 10], 104, 24)).toBe('2.0,22.0 52.0,12.0 102.0,2.0');
});

test('flat series is a centered line, short series is empty', () => {
  expect(sparklinePoints([3, 3], 12, 10)).toBe('2.0,5.0 10.0,5.0');
  expect(sparklinePoints([3], 100, 24)).toBe('');
  expect(sparklinePoints([1, 2], 0, 24)).toBe('');
});

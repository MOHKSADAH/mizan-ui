import { expect, test } from 'bun:test';
import { countdownParts } from './countdown-parts';

test('splits seconds into days, hours, minutes and seconds', () => {
  expect(countdownParts(2 * 86400 + 3 * 3600 + 4 * 60 + 5)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 });
});

test('negative or fractional input is clamped and floored', () => {
  expect(countdownParts(-10)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  expect(countdownParts(59.9).seconds).toBe(59);
});

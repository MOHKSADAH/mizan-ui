import { expect, test } from 'bun:test';
import { SERIES as SERIES_FALLBACK } from '../registry/base/series';
import { contrast, deltaE, parseColor, seriesPass, type Rgb } from './contrast';

const hex = (h: string): Rgb => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;

test('contrast matches WCAG reference values', () => {
  expect(contrast([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 1);
  expect(contrast(hex('#767676'), [255, 255, 255])).toBeCloseTo(4.54, 1);
});

test('deltaE is zero for equal colors', () => {
  expect(deltaE(hex('#2a78d6'), hex('#2a78d6'))).toBe(0);
});

test('fallback palettes pass on white and on a dark card', () => {
  expect(seriesPass(SERIES_FALLBACK.light.map(hex), [255, 255, 255])).toBe(true);
  expect(seriesPass(SERIES_FALLBACK.dark.map(hex), hex('#171717'))).toBe(true);
});

test('a grayscale ramp fails the guard', () => {
  expect(seriesPass(['#dedede', '#8e8e8e', '#6b6b6b', '#575757', '#3b3b3b'].map(hex), [255, 255, 255])).toBe(false);
});

test('parseColor reads hex, oklch, rgb and hsl', () => {
  expect(parseColor('#2a78d6')).toEqual([42, 120, 214]);
  expect(parseColor('#fff')).toEqual([255, 255, 255]);
  expect(parseColor('oklch(1 0 0)')).toEqual([255, 255, 255]);
  expect(parseColor('oklch(0 0 0 / 10%)')).toEqual([0, 0, 0]);
  expect(parseColor('oklch(0.5 0.1 250)')).toEqual(parseColor('oklch(50% 0.1 250deg)'));
  expect(parseColor('rgb(10, 20, 30)')).toEqual([10, 20, 30]);
  expect(parseColor('hsl(0 100% 50%)')).toEqual([255, 0, 0]);
  expect(() => parseColor('banana')).toThrow();
});

test('oklch matches Tailwind reference colors', () => {
  expect(parseColor('oklch(0.577 0.245 27.325)')).toEqual([231, 0, 11]);
  expect(parseColor('oklch(0.623 0.214 259.815)')).toEqual([43, 127, 255]);
  expect(parseColor('oklch(0.205 0 0)')).toEqual([23, 23, 23]);
});

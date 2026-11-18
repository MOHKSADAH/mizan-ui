import { describe, expect, test } from 'bun:test';
import { hexToHsv, hexToRgb, hsvToHex, parseColor, rgbToHex, rgbToOklch, toOklchString } from './color';

const near = (a: string, b: string, tol = 1) => {
  const [x, y] = [hexToRgb(a)!, hexToRgb(b)!];
  return Math.max(Math.abs(x.r - y.r), Math.abs(x.g - y.g), Math.abs(x.b - y.b)) <= tol;
};

describe('color', () => {
  test('hex parsing and formatting', () => {
    expect(hexToRgb('#0af')).toEqual({ r: 0, g: 170, b: 255 });
    expect(hexToRgb('FF8800')).toEqual({ r: 255, g: 136, b: 0 });
    expect(hexToRgb('#12345')).toBeNull();
    expect(rgbToHex({ r: 255, g: 136, b: 0 })).toBe('#ff8800');
  });

  test('hsv round trips', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0000ff', '#336699', '#ffffff', '#000000', '#c0ffee']) {
      expect(near(hsvToHex(hexToHsv(hex)), hex)).toBe(true);
    }
    expect(hexToHsv('#ff0000')).toEqual({ h: 0, s: 100, v: 100 });
    expect(hsvToHex({ h: 120, s: 100, v: 100 })).toBe('#00ff00');
  });

  test('oklch values match the reference for red', () => {
    const { L, C, H } = rgbToOklch({ r: 255, g: 0, b: 0 });
    expect(L).toBeCloseTo(0.628, 2);
    expect(C).toBeCloseTo(0.258, 2);
    expect(H).toBeCloseTo(29.2, 0);
    expect(toOklchString('#ffffff')).toBe('oklch(1 0 0)');
  });

  test('parseColor accepts hex and oklch, rejects the rest', () => {
    expect(parseColor(' #ABC ')).toBe('#aabbcc');
    expect(near(parseColor('oklch(0.628 0.258 29.2)')!, '#ff0000')).toBe(true);
    expect(near(parseColor('oklch(62.8% 0.258 29.2)')!, '#ff0000')).toBe(true);
    expect(parseColor('oklch(1 0 0)')).toBe('#ffffff');
    expect(parseColor('red')).toBeNull();
    expect(parseColor('oklch(2 0 0)')).toBeNull();
    expect(near(parseColor(toOklchString('#336699'))!, '#336699')).toBe(true);
  });
});

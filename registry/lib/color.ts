export type Rgb = { r: number; g: number; b: number };
export type Hsv = { h: number; s: number; v: number };

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const toByte = (n: number) => Math.round(clamp(n, 0, 1) * 255);
const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.abs(c) ** (1 / 2.4) - 0.055);
const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

export function hexToRgb(hex: string): Rgb | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1];
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

export const rgbToHex = ({ r, g, b }: Rgb) =>
  `#${[r, g, b].map((c) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, '0')).join('')}`;

// h in 0..360, s and v in 0..100.
export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const [S, V] = [s / 100, v / 100];
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return V - V * S * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255 };
}

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const d = max - Math.min(R, G, B);
  const h = d === 0 ? 0 : max === R ? ((G - B) / d + 6) % 6 : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  return { h: h * 60, s: max === 0 ? 0 : (d / max) * 100, v: max * 100 };
}

export const hsvToHex = (hsv: Hsv) => rgbToHex(hsvToRgb(hsv));
export const hexToHsv = (hex: string) => rgbToHsv(hexToRgb(hex) ?? { r: 0, g: 0, b: 0 });

// L in 0..1, C about 0..0.4, H in degrees. Out-of-gamut colors are clipped.
export function oklchToRgb(L: number, C: number, H: number): Rgb {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return {
    r: toByte(encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    g: toByte(encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    b: toByte(encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  };
}

export function rgbToOklch({ r, g, b }: Rgb) {
  const [R, G, B] = [r, g, b].map((c) => decode(c / 255));
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B2);
  return { L, C, H: C < 1e-4 ? 0 : (Math.atan2(B2, A) * 180) / Math.PI + (B2 < 0 ? 360 : 0) };
}

export function toOklchString(hex: string) {
  const { L, C, H } = rgbToOklch(hexToRgb(hex) ?? { r: 0, g: 0, b: 0 });
  return `oklch(${+L.toFixed(3)} ${+C.toFixed(3)} ${+H.toFixed(1)})`;
}

const NUM = String.raw`(-?\d*\.?\d+)`;
const OKLCH = new RegExp(String.raw`^oklch\(\s*${NUM}(%?)\s+${NUM}(%?)\s+${NUM}(?:deg)?\s*(?:/\s*[\d.]+%?\s*)?\)$`, 'i');

// Accepts #rgb, #rrggbb and oklch(L C H) and returns a lowercase #rrggbb, or null.
export function parseColor(text: string): string | null {
  const rgb = hexToRgb(text);
  if (rgb) return rgbToHex(rgb);
  const m = OKLCH.exec(text.trim());
  if (!m) return null;
  const L = Number(m[1]) / (m[2] ? 100 : 1);
  const C = Number(m[3]) / (m[4] ? 250 : 1);
  return L < 0 || L > 1 || C < 0 ? null : rgbToHex(oklchToRgb(L, C, Number(m[5])));
}

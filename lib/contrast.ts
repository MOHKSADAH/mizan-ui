export type Rgb = [number, number, number];

const lin = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

export function luminance([r, g, b]: Rgb) {
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function oklab([r, g, b]: Rgb): Rgb {
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

// Euclidean distance in OKLab, scaled by 100 (about 2 is a just-noticeable difference).
export function deltaE(a: Rgb, b: Rgb) {
  const [x, y] = [oklab(a), oklab(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]) * 100;
}

export const MIN_SERIES_CONTRAST = 3;
export const MIN_ADJACENT_DELTA = 10;

export function seriesPass(series: Rgb[], background: Rgb) {
  return (
    series.every((c) => contrast(c, background) >= MIN_SERIES_CONTRAST) &&
    series.every((c, i) => i === 0 || deltaE(c, series[i - 1]) >= MIN_ADJACENT_DELTA)
  );
}

// Pairs a theme must meet for WCAG AA: text 4.5:1, UI parts 3:1.
export const AA_PAIRS: [string, string, number][] = [
  ['foreground', 'background', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['card-foreground', 'card', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['secondary-foreground', 'secondary', 4.5],
  ['primary', 'background', 3],
  ['destructive-foreground', 'destructive', 4.5],
  ['accent-foreground', 'accent', 4.5],
  ['sidebar-foreground', 'sidebar', 4.5],
  ['sidebar-primary-foreground', 'sidebar-primary', 4.5],
  ['muted-foreground', 'card', 4.5],
];

export function aaFailures(get: (token: string) => Rgb) {
  return AA_PAIRS.filter(([a, b, min]) => contrast(get(a), get(b)) < min).map(([a, b]) => `${a}/${b}`);
}

const byte = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255);
const encode = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.abs(v) ** (1 / 2.4) - 0.055);

function oklchToRgb(l: number, c: number, h: number): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const L = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const M = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const S = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ].map((v) => byte(encode(v))) as Rgb;
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [byte(f(0)), byte(f(8)), byte(f(4))];
}

// Pure parser for the formats themes use (hex, oklch, rgb, hsl); alpha is ignored. Runs without a browser.
export function parseColor(color: string): Rgb {
  const c = color.trim().toLowerCase();
  const hex = /^#([0-9a-f]{3,8})$/.exec(c)?.[1];
  if (hex && [3, 4, 6, 8].includes(hex.length)) {
    const full = hex.length < 5 ? [...hex].map((x) => x + x).join('') : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
  }
  const fn = /^(oklch|rgba?|hsla?)\(([^)]+)\)$/.exec(c);
  if (!fn) throw new Error(`Unsupported color: ${color}`);
  const parts = fn[2].split(/[\s,/]+/).filter(Boolean);
  const n = (i: number, pct = 1) => (parts[i]?.endsWith('%') ? (parseFloat(parts[i]) / 100) * pct : parseFloat(parts[i]) || 0);
  if (fn[1] === 'oklch') return oklchToRgb(n(0), n(1, 0.4), n(2));
  if (fn[1] === 'hsl' || fn[1] === 'hsla') return hslToRgb(n(0), n(1), n(2));
  return [0, 1, 2].map((i) => Math.round(n(i, 255))) as Rgb;
}

// Mizan-defined tokens that themes do not set (registry/base/tokens.css).
const MIZAN_TOKENS = {
  light: { 'destructive-foreground': 'oklch(0.985 0 0)' },
  dark: { 'destructive-foreground': 'oklch(0.18 0.03 25)' },
};

export const tokenReader = (tokens: Record<string, string>, mode: 'light' | 'dark') => (token: string) =>
  parseColor(tokens[token] ?? MIZAN_TOKENS[mode][token as 'destructive-foreground']);

let ctx: CanvasRenderingContext2D | null = null;

// Resolves any CSS color (oklch, hsl, hex) to sRGB bytes by painting one pixel.
export function toRgb(color: string): Rgb {
  ctx ??= Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', {
    willReadFrequently: true,
  });
  if (!ctx) return [0, 0, 0];
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

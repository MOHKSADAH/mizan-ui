import data from '../scripts/data/directions.json';

export type Direction = (typeof data.directions)[number];
export type DirectionFont = keyof typeof data.fonts;

export const directions: Direction[] = data.directions;
export const directionFonts: Record<string, { family: string; package: string; imports: string[]; variable: string; generic: string }> = data.fonts;
export const directionById = Object.fromEntries(directions.map((d) => [d.id, d]));

// Spacing multiplier (rem) the Customizer's spacing slider uses; 0.25 is Tailwind's default.
export const DENSITY: Record<string, number> = { dense: 0.23, normal: 0.25, airy: 0.27 };

type Pair = { latin: string; arabic: string };
type Font = { family: string; variable: string };
const TAIL = { serif: 'serif', monospace: 'ui-monospace, monospace', 'sans-serif': 'system-ui, sans-serif' } as Record<string, string>;

// Latin family first, then the Arabic one: each covers its own script, so a mixed line uses both.
// `later` names go after every `name`: next/font's variables end in a metric fallback face with no
// unicode-range, which would draw the next script in Arial if it came before the next real family.
export const fontStack = (pair: Pair, name: (font: Font) => string, later?: (font: Font) => string) => {
  const fonts = [...new Set([pair.latin, pair.arabic])].map((id) => directionFonts[id]);
  return [...fonts.map(name), ...(later ? fonts.map(later) : []), TAIL[directionFonts[pair.latin].generic]].join(', ');
};

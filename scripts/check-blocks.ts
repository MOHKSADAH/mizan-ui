import { Glob } from 'bun';

const exported = (name: string) =>
  new RegExp(String.raw`\bexport\s+(?:const|let|function)\s+${name}\b|\bexport\s*\{[^}]*\b${name}\b[^}]*\}`);
const DEFAULT_EXPORT = /\bexport\s+default\b|\bexport\s*\{[^}]*\bas\s+default\b[^}]*\}/;
const LAYOUT = /<(?:Section|Container)\b/;
const COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|\b(?:rgb|hsl)a?\(/;

// A hex-like href (href="#add") is an anchor, not a color.
export function checkBlock(source: string): string[] {
  const problems: string[] = [];
  if (!DEFAULT_EXPORT.test(source)) problems.push('missing export default');
  for (const name of ['labelsEn', 'labelsAr', 'demo']) if (!exported(name).test(source)) problems.push(`missing export ${name}`);
  if (!LAYOUT.test(source)) problems.push('does not use Section or Container');
  source.split('\n').forEach((line, i) => {
    if (!/href/.test(line) && COLOR.test(line)) problems.push(`color literal on line ${i + 1}`);
  });
  return problems;
}

// Visual house style (see "Visual rules" in AGENTS.md). A line may opt out with a mizan-allow-style comment.
const STYLE_RULES: [RegExp, string][] = [
  [/(?<![\w-])text-\[/, 'arbitrary text size (use the type scale, text-xs is the floor)'],
  [/(?<![\w-])text-[7-9]xl\b/, 'text size above text-6xl'],
  [/(?<![\w-])rounded(?:-[a-z]+)?-(?:2xl|3xl)\b/, 'radius above rounded-xl'],
  [/(?<![\w-])rounded(?:-[a-z]+)?-\[/, 'arbitrary radius'],
  [/(?<![\w-])(?:drop-|inset-|text-)?shadow-/, 'shadow utility (no shadows)'],
  [/(?<![\w-])font-(?:black|light|extralight|thin)\b/, 'light or black font weight (headings use font-semibold)'],
  [/(?<![\w-])bg-foreground\b/, 'bg-foreground slab'],
  [/data:image\//, 'data-URI image (use the bg-muted ImageIcon placeholder)'],
];
const HEADING_TAG = /<h[1-3]\b(?:[^>]|(?<==)>)*>/g;

export function checkStyle(source: string): string[] {
  const lines = source.split('\n');
  const found: [number, string][] = [];
  lines.forEach((line, i) => {
    for (const [pattern, rule] of STYLE_RULES) if (pattern.test(line)) found.push([i + 1, rule]);
  });
  for (const tag of source.matchAll(HEADING_TAG)) {
    const at = tag[0].search(/(?<![\w-])font-normal\b/);
    if (at >= 0) found.push([source.slice(0, tag.index + at).split('\n').length, 'heading with font-normal (headings use font-semibold)']);
  }
  return found
    .filter(([line]) => !lines[line - 1].includes('mizan-allow-style'))
    .sort((a, b) => a[0] - b[0])
    .map(([line, rule]) => `line ${line}: ${rule}`);
}

if (import.meta.main) {
  const violations: string[] = [];
  for await (const file of new Glob('registry/{blocks,pages}/**/*.{ts,tsx}').scan('.')) {
    const path = file.replaceAll('\\', '/');
    if (/\.test\.tsx?$/.test(path)) continue;
    const source = await Bun.file(file).text();
    if (path.startsWith('registry/blocks/')) for (const problem of checkBlock(source)) violations.push(`${path}: ${problem}`);
    for (const problem of checkStyle(source)) violations.push(`${path}: ${problem}`);
  }
  if (violations.length) {
    console.error(
      `Block violations (see "Blocks" and "Visual rules" in AGENTS.md; a line may opt out with mizan-allow-style):\n${violations.join('\n')}`,
    );
    process.exit(1);
  }
  console.log('All blocks follow the block contract and the visual rules.');
}

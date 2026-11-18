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

if (import.meta.main) {
  const violations: string[] = [];
  for await (const file of new Glob('registry/blocks/**/*.{ts,tsx}').scan('.')) {
    const path = file.replaceAll('\\', '/');
    if (/\.test\.tsx?$/.test(path)) continue;
    for (const problem of checkBlock(await Bun.file(file).text())) violations.push(`${path}: ${problem}`);
  }
  if (violations.length) {
    console.error(`Block contract violations (see "Blocks" in AGENTS.md):\n${violations.join('\n')}`);
    process.exit(1);
  }
  console.log('All blocks follow the block contract.');
}

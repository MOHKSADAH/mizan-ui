import { Glob } from 'bun';
import { readImports } from './build-registry';

const exported = (name: string) =>
  new RegExp(String.raw`\bexport\s+(?:const|let|function)\s+${name}\b|\bexport\s*\{[^}]*\b${name}\b[^}]*\}`);
const DEFAULT_EXPORT = /\bexport\s+default\b|\bexport\s*\{[^}]*\bas\s+default\b[^}]*\}/;
const LAYOUT = /<(?:Section|Container)\b/;
const COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|\b(?:rgb|hsl)a?\(/;
const PAGE_IMPORT = /^@\/registry\/(?:blocks|ui|lib|hooks)\//;
const PAGE_PATH = /^registry\/pages\/([\w-]+-page)\/\1-\d+\.tsx$/;

// A hex-like href (href="#add") is an anchor, not a color.
const colorProblems = (source: string) =>
  source.split('\n').flatMap((line, i) => (!/href/.test(line) && COLOR.test(line) ? [`color literal on line ${i + 1}`] : []));

export function checkBlock(source: string): string[] {
  const problems: string[] = [];
  if (!DEFAULT_EXPORT.test(source)) problems.push('missing export default');
  for (const name of ['labelsEn', 'labelsAr', 'demo']) if (!exported(name).test(source)) problems.push(`missing export ${name}`);
  if (!LAYOUT.test(source)) problems.push('does not use Section or Container');
  return [...problems, ...colorProblems(source)];
}

// A page composes section blocks. Its strings come from the sections, so it has no labels and no Section root.
export function checkPage(source: string): string[] {
  const problems: string[] = [];
  if (!DEFAULT_EXPORT.test(source)) problems.push('missing export default');
  if (!exported('demo').test(source)) problems.push('missing export demo');
  const imports = readImports(source);
  if (!imports.some((spec) => spec.startsWith('@/registry/blocks/'))) problems.push('imports no section block');
  for (const spec of imports) {
    if (spec.startsWith('@/') && !PAGE_IMPORT.test(spec)) problems.push(`import ${spec} is outside registry/blocks, ui, lib and hooks`);
  }
  return [...problems, ...colorProblems(source)];
}

if (import.meta.main) {
  const violations: string[] = [];
  for await (const file of new Glob('registry/blocks/**/*.{ts,tsx}').scan('.')) {
    const path = file.replaceAll('\\', '/');
    if (/\.test\.tsx?$/.test(path)) continue;
    for (const problem of checkBlock(await Bun.file(file).text())) violations.push(`${path}: ${problem}`);
  }
  for await (const file of new Glob('registry/pages/**/*.{ts,tsx}').scan('.')) {
    const path = file.replaceAll('\\', '/');
    if (/\.test\.tsx?$/.test(path)) continue;
    if (!PAGE_PATH.test(path)) violations.push(`${path}: path is not registry/pages/<family>-page/<family>-page-NN.tsx`);
    for (const problem of checkPage(await Bun.file(file).text())) violations.push(`${path}: ${problem}`);
  }
  if (violations.length) {
    console.error(`Block and page contract violations (see "Blocks" and "Pages" in AGENTS.md):\n${violations.join('\n')}`);
    process.exit(1);
  }
  console.log('All blocks and pages follow their contract.');
}

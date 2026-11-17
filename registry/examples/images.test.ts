import { expect, test } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dir);
const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => readFileSync(join(dir, f), 'utf8'));

test('example images are local files, never remote URLs', () => {
  for (const source of sources) expect(source).not.toMatch(/src:\s*[`'"]https?:/);
  const refs = sources.flatMap((s) => s.match(/\/examples\/[\w-]+\.svg/g) ?? []);
  expect(refs.length).toBeGreaterThan(0);
  for (const ref of refs) expect(existsSync(join(dir, '../../public', ref))).toBe(true);
});

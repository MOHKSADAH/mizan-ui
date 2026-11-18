import { expect, test } from 'bun:test';
import { readImports } from './build-registry';

// Registry files are copied into other apps, so they may not import docs-site code.
const FORBIDDEN = /^(next(\/|$)|fumadocs|@\/(app|lib|components)(\/|$))/;

test('registry files import no site-only modules', async () => {
  const bad: string[] = [];
  for await (const path of new Bun.Glob('registry/**/*.{ts,tsx}').scan('.')) {
    const file = path.replaceAll('\\', '/');
    if (/\.test\.tsx?$/.test(file) || file.startsWith('registry/examples/') || file.startsWith('registry/manifest')) continue;
    for (const spec of readImports(await Bun.file(file).text())) if (FORBIDDEN.test(spec)) bad.push(`${file}: ${spec}`);
  }
  expect(bad).toEqual([]);
});

test('the boundary pattern catches site imports and allows registry imports', () => {
  for (const spec of ['next/link', 'next', 'fumadocs-ui/page', '@/lib/strings', '@/components/x', '@/app/layout'])
    expect(FORBIDDEN.test(spec)).toBe(true);
  for (const spec of ['@/registry/ui/button', '@/registry/lib/utils', 'react', 'nextra-like', '@/library'])
    expect(FORBIDDEN.test(spec)).toBe(false);
});

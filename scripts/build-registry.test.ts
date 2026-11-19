import { expect, test } from 'bun:test';
import { manifest, type ManifestItem } from '../registry/manifest';
import { address, itemOf, readImports, toItem } from './build-registry';

test('reads static, re-export and dynamic imports', () => {
  const src = `import * as React from "react"\nimport { cn } from "@/registry/lib/utils"\nexport { x } from '@/registry/ui/button'\nconst l = () => import("shiki/langs/css.mjs")`;
  expect(readImports(src)).toEqual(['react', '@/registry/lib/utils', '@/registry/ui/button', 'shiki/langs/css.mjs']);
});

const dialog: ManifestItem = { name: 'dialog', type: 'registry:ui', files: ['registry/ui/dialog.tsx'] };
const versions = { '@base-ui/react': '1.9.0', '@phosphor-icons/react': '2.1.10' };

test('registry dependencies use the repo address by default', async () => {
  const saved = process.env.REGISTRY_BASE_URL;
  delete process.env.REGISTRY_BASE_URL;
  try {
    expect(address('button')).toBe('MOHKSADAH/mizan-ui/button');
    expect((await toItem(dialog, versions)).registryDependencies).toContain('MOHKSADAH/mizan-ui/button');
  } finally {
    if (saved !== undefined) process.env.REGISTRY_BASE_URL = saved;
  }
});

test('REGISTRY_BASE_URL turns registry dependencies into full item URLs', async () => {
  const saved = process.env.REGISTRY_BASE_URL;
  process.env.REGISTRY_BASE_URL = 'https://mizan.example/';
  try {
    expect(address('button')).toBe('https://mizan.example/r/button.json');
    const deps = (await toItem(dialog, versions)).registryDependencies;
    expect(deps).toContain('https://mizan.example/r/button.json');
    expect(deps?.some((d) => d.startsWith('MOHKSADAH'))).toBe(false);
  } finally {
    if (saved === undefined) delete process.env.REGISTRY_BASE_URL;
    else process.env.REGISTRY_BASE_URL = saved;
  }
});

test('a nested lib file resolves to its item name', () => {
  expect(itemOf('@/registry/lib/gulf/arabic-normalize')).toBe('arabic-normalize');
  expect(itemOf('@/registry/lib/gulf/validators')).toBe('gulf-validators');
  expect(itemOf('@/registry/ui/button')).toBe('button');
});

test('manifest-only fields stay out of the registry item', async () => {
  const item = await toItem({ ...dialog, kind: 'page', badge: 'new', family: 'x' }, versions);
  expect(Object.keys(item)).not.toContain('badge');
  expect(Object.keys(item)).not.toContain('kind');
  expect(Object.keys(item)).not.toContain('family');
});

test('a page lists every section it imports as a registry dependency', async () => {
  const home = manifest.find((i) => i.name === 'home-page-01')!;
  const sections = (await Bun.file(home.files[0]).text()).match(/@\/registry\/blocks\/[\w/-]+/g)!;
  const deps = (await toItem(home, { ...versions })).registryDependencies!;
  expect(sections.length).toBe(10);
  for (const spec of sections) expect(deps).toContain(address(itemOf(spec)!));
});

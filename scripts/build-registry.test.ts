import { expect, test } from 'bun:test';
import type { ManifestItem } from '../registry/manifest';
import { address, readImports, toItem } from './build-registry';

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

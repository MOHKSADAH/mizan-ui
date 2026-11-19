import { expect, test } from 'bun:test';
import type { ManifestItem } from '@/registry/manifest';
import { blockFamilies, blockItems, familiesOf, pageFamilies, sidebarNav } from './nav';

const item = (name: string, badge?: 'new' | 'updated'): ManifestItem => ({
  name,
  type: 'registry:block',
  family: name.slice(0, -3),
  files: [],
  badge,
});

test('a family is new when any variant is new, updated when none is new but one is updated', () => {
  const families = familiesOf([item('a-01'), item('a-02', 'new'), item('b-01', 'updated'), item('b-02'), item('c-01')]);
  expect(families.map((f) => [f.family, f.badge])).toEqual([
    ['a', 'new'],
    ['b', 'updated'],
    ['c', undefined],
  ]);
});

const link = (key: string, family: string) =>
  sidebarNav({}).find((g) => g.key === key)?.items.find((i) => i.href === `/blocks/${family}`);

test('pages are grouped apart from section blocks and carry their badge', () => {
  expect(pageFamilies.map((f) => f.family)).toContain('home-page');
  expect(blockFamilies.map((f) => f.family)).not.toContain('home-page');
  expect(link('pages', 'home-page')?.badge).toBe('new');
  expect(link('blocks', 'home-page')).toBeUndefined();
});

test('every -page family is made of kind page items', () => {
  for (const b of blockItems.filter((b) => b.family?.endsWith('-page'))) expect(b.kind).toBe('page');
  for (const b of blockItems.filter((b) => b.kind === 'page')) expect(b.family?.endsWith('-page')).toBe(true);
});

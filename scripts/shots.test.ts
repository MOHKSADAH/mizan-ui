import { expect, test } from 'bun:test';
import { parseShotArgs, resolveItems, shotName, urlOf } from './shots.mjs';

const registry = [
  { name: 'button', type: 'registry:ui' },
  { name: 'hero-01', type: 'registry:block' },
  { name: 'hero-02', type: 'registry:block' },
  { name: 'data-table-01', type: 'registry:block' },
];

test('parses items, families and overrides', () => {
  const a = parseShotArgs(['button', '--family', 'hero', '--themes', 'a,b', '--mobile']);
  expect(a.items).toEqual(['button']);
  expect(a.families).toEqual(['hero']);
  expect(a.themes).toEqual(['a', 'b']);
  expect(a.mobile).toBe(true);
  expect(a.out).toBe('.shots');
  expect(a.url).toBe('http://localhost:3000');
});

test('names shots item.theme.lang.png', () => {
  expect(shotName('hero-01', 'mizan-noir', 'ar')).toBe('hero-01.mizan-noir.ar.png');
  expect(shotName('hero-01', 'mizan-noir', 'en', true)).toBe('hero-01.mizan-noir.en.mobile.png');
});

test('blocks open in the view route, components in docs, a family expands to its variants', () => {
  expect(resolveItems(registry, ['button'], ['hero'])).toEqual([
    { name: 'button', path: '/docs/components/button' },
    { name: 'hero-01', path: '/blocks/view/hero-01' },
    { name: 'hero-02', path: '/blocks/view/hero-02' },
  ]);
  expect(resolveItems(registry, [], ['data-table']).map((i) => i.name)).toEqual(['data-table-01']);
  expect(() => resolveItems(registry, ['nope'], [])).toThrow();
  expect(urlOf('http://x', '/docs/components/button', 'ar')).toBe('http://x/ar/docs/components/button');
});

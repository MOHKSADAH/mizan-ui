import { expect, test } from 'bun:test';
import { checkBlock, checkPage } from './check-blocks';

const good = `
import { Section } from '@/registry/ui/section';
export const labelsEn = { title: 'Hello' };
export const labelsAr = { title: 'مرحبا' };
export function Hero01() { return <Section>x</Section>; }
export const demo = { en: {}, ar: {} };
export default Hero01;
`;

test('accepts a block that follows the contract', () => {
  expect(checkBlock(good)).toEqual([]);
});

test('accepts export lists and a Container root', () => {
  const source = `
    const labelsEn = {}; const labelsAr = {}; const demo = {};
    function Hero01() { return <Container>x</Container>; }
    export { labelsEn, labelsAr, demo, Hero01 as default };
  `;
  expect(checkBlock(source)).toEqual([]);
});

test('reports each missing export and the missing layout', () => {
  expect(checkBlock('export function A() { return null; }')).toEqual([
    'missing export default',
    'missing export labelsEn',
    'missing export labelsAr',
    'missing export demo',
    'does not use Section or Container',
  ]);
});

test.each(['className="bg-[#fff]"', 'const c = "#1a2b3c";', 'style={{ color: "rgb(1, 2, 3)" }}', 'fill="rgba(0,0,0,.5)"'])(
  'flags color literal %s',
  (line) => {
    expect(checkBlock(`${good}\n${line}`)).toEqual(['color literal on line 9']);
  },
);

test('ignores anchors and token classes', () => {
  expect(checkBlock(`${good}\nconst a = { href: '#add' };\nconst c = 'bg-primary text-primary-foreground';`)).toEqual([]);
});

const page = `
import { Hero01, demo as hero } from '@/registry/blocks/hero/hero-01';
import { cn } from '@/registry/lib/utils';
export function HomePage01() { return <main className={cn('flex')}><Hero01 {...hero.en} /></main>; }
export const demo = { en: {}, ar: {} };
export default HomePage01;
`;

test('accepts a page that composes blocks and has no labels or Section root', () => {
  expect(checkPage(page)).toEqual([]);
});

test('reports a page without a demo, a default export or a block import', () => {
  expect(checkPage(`import { cn } from '@/registry/lib/utils';\nexport function P() { return null; }`)).toEqual([
    'missing export default',
    'missing export demo',
    'imports no section block',
  ]);
});

test('flags page imports from outside the registry and color literals', () => {
  expect(checkPage(`${page}\nimport { x } from '@/components/x';\nconst c = '#fff000';`)).toEqual([
    'import @/components/x is outside registry/blocks, ui, lib and hooks',
    'color literal on line 9',
  ]);
});

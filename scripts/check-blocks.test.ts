import { expect, test } from 'bun:test';
import { checkBlock, checkPage, checkStyle } from './check-blocks';

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

const cls = (c: string) => `<p className="${c}">x</p>`;

test('accepts house-style classes', () => {
  const source = [
    cls('text-4xl font-semibold text-balance md:text-5xl lg:text-6xl'),
    cls('text-xs rounded-xl rounded-full border bg-muted bg-primary text-foreground'),
    cls('ring-foreground/10 font-normal font-medium'),
    '<h2 className="text-lg font-semibold">x</h2>',
    '<p className="font-normal">quote body</p>',
  ].join('\n');
  expect(checkStyle(source)).toEqual([]);
});

test.each([
  ['text-[13px]', 'arbitrary text size'],
  ['md:text-[clamp(1rem,2vw,2rem)]', 'arbitrary text size'],
  ['text-7xl', 'text size above text-6xl'],
  ['lg:text-8xl', 'text size above text-6xl'],
  ['text-9xl', 'text size above text-6xl'],
  ['rounded-2xl', 'radius above rounded-xl'],
  ['rounded-t-3xl', 'radius above rounded-xl'],
  ['rounded-[10px]', 'arbitrary radius'],
  ['shadow-sm', 'shadow utility'],
  ['hover:shadow-lg', 'shadow utility'],
  ['drop-shadow-md', 'shadow utility'],
  ['font-black', 'light or black font weight'],
  ['font-light', 'light or black font weight'],
  ['font-extralight', 'light or black font weight'],
  ['font-thin', 'light or black font weight'],
  ['bg-foreground', 'bg-foreground slab'],
  ['dark:bg-foreground', 'bg-foreground slab'],
])('flags %s', (utility, rule) => {
  expect(checkStyle(cls(utility))).toEqual([expect.stringContaining(`line 1: ${rule}`)]);
});

test('flags a data-URI image', () => {
  expect(checkStyle(`<img src="data:image/svg+xml;utf8,<svg/>" alt="" />`)).toEqual([
    'line 1: data-URI image (use the bg-muted ImageIcon placeholder)',
  ]);
});

test('flags font-normal on a heading, also across lines', () => {
  expect(checkStyle('<h2 className="text-2xl font-normal">x</h2>')).toEqual([
    'line 1: heading with font-normal (headings use font-semibold)',
  ]);
  expect(checkStyle('<div>\n  <h3\n    onClick={() => go()}\n    className="text-lg font-normal"\n  >x</h3>\n</div>')).toEqual([
    'line 4: heading with font-normal (headings use font-semibold)',
  ]);
});

test('reports the line number', () => {
  expect(checkStyle(`a\nb\n${cls('rounded-2xl shadow-md')}`)).toEqual([
    'line 3: radius above rounded-xl',
    'line 3: shadow utility (no shadows)',
  ]);
});

test('a mizan-allow-style comment opts a line out', () => {
  expect(checkStyle(`${cls('rounded-2xl shadow-md')} {/* mizan-allow-style */}`)).toEqual([]);
  expect(checkStyle('<h2\n  className="font-normal" // mizan-allow-style\n>x</h2>')).toEqual([]);
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

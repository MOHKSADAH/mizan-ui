import { expect, test } from 'bun:test';
import { checkBlock } from './check-blocks';

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

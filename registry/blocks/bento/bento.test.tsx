import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Bento01, { demo as Bento01Demo } from './bento-01';
import Bento02, { demo as Bento02Demo } from './bento-02';
import Bento03, { demo as Bento03Demo } from './bento-03';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;
const tiles = (html: string) => html.match(/data-slot="bento-tile"/g)?.length;

test('bento-01 renders five unequal tiles in English', () => {
  const html = renderToString(<Bento01 {...Bento01Demo.en} />);
  expect(tiles(html)).toBe(5);
  expect(html).toContain('lg:col-span-7 lg:row-span-2');
  expect(html).toContain('Orders as they arrive');
  expect(h1(html)).toBe(0);
});

test('bento-01 renders Saudi order data in Arabic', () => {
  const html = rtl(<Bento01 {...Bento01Demo.ar} />);
  expect(html).toContain('فهد القحطاني');
  expect(html).toContain('#10482');
  expect(html).toContain('مدفوع');
  expect(html).toContain('الرياض');
  expect(h1(html)).toBe(0);
});

test('bento-02 keeps every tile on a card or muted surface', () => {
  const html = renderToString(<Bento02 {...Bento02Demo.en} />);
  expect(tiles(html)).toBe(5);
  expect(html).not.toContain('bg-foreground');
  expect(html).not.toContain('bg-background/');
  expect(h1(html)).toBe(0);
});

test('bento-02 renders in Arabic with a sparkline that mirrors', () => {
  const html = rtl(<Bento02 {...Bento02Demo.ar} />);
  expect(html).toContain('إيراداتك بنظرة واحدة');
  expect(html).toContain('rtl:-scale-x-100');
  expect(html).toContain('وعليكم السلام');
});

test('bento-03 renders four tiles in English and Arabic', () => {
  const en = renderToString(<Bento03 {...Bento03Demo.en} />);
  expect(tiles(en)).toBe(4);
  expect(en).toContain('Stock that warns you');
  const ar = rtl(<Bento03 {...Bento03Demo.ar} />);
  expect(ar).toContain('مخزون ينبّهك');
  expect(ar).toContain('الخبر، حي الراكة');
  expect(h1(en) + h1(ar)).toBe(0);
});

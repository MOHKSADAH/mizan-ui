import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Hero09, { demo as Hero09Demo } from './hero-09';
import Hero10, { demo as Hero10Demo } from './hero-10';
import Hero11, { demo as Hero11Demo } from './hero-11';
import Hero12, { demo as Hero12Demo } from './hero-12';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;
const baselineH1 = 'text-4xl font-semibold text-balance md:text-5xl lg:text-6xl';

test('hero-09 renders the baseline title, the dashboard and the storefront in English', () => {
  const html = renderToString(<Hero09 {...Hero09Demo.en} />);
  expect(html).toContain(baselineH1);
  expect(h1(html)).toBe(1);
  expect(html).not.toContain('<strong>');
  expect(html).toContain('data-slot="stat-card"');
  expect(html).toContain('data-slot="product-card"');
  expect(html).toContain('data-status="shipped"');
  expect(html).not.toContain('<img');
});

test('hero-09 renders in Arabic with Arabic status labels and a goal percent', () => {
  const html = rtl(<Hero09 {...Hero09Demo.ar} />);
  expect(h1(html)).toBe(1);
  expect(html).toContain('تم الشحن');
  expect(html).toContain('83%');
  expect(html).toContain('#360243');
});

test('hero-10 renders in English with a dated meta row and the placeholder', () => {
  const html = renderToString(<Hero10 {...Hero10Demo.en} />);
  expect(html).toContain(baselineH1);
  expect(h1(html)).toBe(1);
  expect(html).toContain('dateTime="2026-11-18"');
  expect(html).toContain('aspect-ratio:4 / 3');
  expect(html).not.toContain('<img');
});

test('hero-10 renders an image when src is given', () => {
  const html = renderToString(<Hero10 {...Hero10Demo.en} media={{ ...Hero10Demo.en.media, src: '/a.jpg' }} />);
  expect(html).toContain('src="/a.jpg"');
  expect(html).toContain('width="4"');
});

test('hero-10 renders in Arabic and flips the arrow', () => {
  const html = rtl(<Hero10 {...Hero10Demo.ar} />);
  expect(h1(html)).toBe(1);
  expect(html).toContain('نوفمبر');
  expect(html).toContain('rtl:rotate-180');
});

test('hero-11 renders the image box first and the facts row in English', () => {
  const html = renderToString(<Hero11 {...Hero11Demo.en} />);
  expect(h1(html)).toBe(1);
  expect(html).toContain(baselineH1);
  expect(html.indexOf('aspect-video')).toBeLessThan(html.indexOf('<h1'));
  expect(html).toContain('Riyadh region');
  expect(html).not.toContain('absolute');
});

test('hero-11 renders in Arabic', () => {
  const html = rtl(<Hero11 {...Hero11Demo.ar} />);
  expect(html).toContain('منطقة الرياض');
  expect(html).toContain('<bdi>2027</bdi>');
  expect(h1(html)).toBe(1);
});

test('hero-12 renders the baseline heading and four cards in English', () => {
  const html = renderToString(<Hero12 {...Hero12Demo.en} />);
  expect(html).toContain('Awraq');
  expect(html).toContain(baselineH1);
  expect(h1(html)).toBe(1);
  expect(html.match(/data-slot="card"/g)?.length).toBe(4);
  expect(html).not.toContain('rotate');
});

test('hero-12 renders in Arabic', () => {
  const html = rtl(<Hero12 {...Hero12Demo.ar} />);
  expect(html).toContain('أوراق');
  expect(h1(html)).toBe(1);
});

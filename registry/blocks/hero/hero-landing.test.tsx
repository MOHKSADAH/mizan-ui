import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Hero09, { demo as Hero09Demo } from './hero-09';
import Hero10, { demo as Hero10Demo } from './hero-10';
import Hero11, { demo as Hero11Demo } from './hero-11';
import Hero12, { demo as Hero12Demo } from './hero-12';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('hero-09 renders a mixed-weight title, the dashboard and the storefront in English', () => {
  const html = renderToString(<Hero09 {...Hero09Demo.en} />);
  expect(html).toContain('<strong>Your online store</strong>');
  expect(h1(html)).toBe(1);
  expect(html).toContain('data-slot="stat-card"');
  expect(html).toContain('data-slot="product-card"');
  expect(html).toContain('data-status="shipped"');
});

test('hero-09 renders in Arabic with Arabic status labels and a goal percent', () => {
  const html = rtl(<Hero09 {...Hero09Demo.ar} />);
  expect(html).toContain('<strong>متجرك الإلكتروني</strong>');
  expect(h1(html)).toBe(1);
  expect(html).toContain('تم الشحن');
  expect(html).toContain('83%');
  expect(html).toContain('#360243');
});

test('hero-10 renders in English with a dated meta row and a media frame that follows the image', () => {
  const html = renderToString(<Hero10 {...Hero10Demo.en} />);
  expect(html).toContain('<strong>Riyadh</strong>');
  expect(h1(html)).toBe(1);
  expect(html).toContain('dateTime="2026-11-18"');
  expect(html).toContain('width="800"');
  expect(html).not.toContain('aspect-');
});

test('hero-10 renders in Arabic and flips the arrow', () => {
  const html = rtl(<Hero10 {...Hero10Demo.ar} />);
  expect(html).toContain('<strong>الرياض</strong>');
  expect(h1(html)).toBe(1);
  expect(html).toContain('نوفمبر');
  expect(html).toContain('rtl:rotate-180');
});

test('hero-11 renders the facts row over a full-bleed image in English', () => {
  const html = renderToString(<Hero11 {...Hero11Demo.en} />);
  expect(h1(html)).toBe(1);
  expect(html).toContain('absolute inset-0');
  expect(html).toContain('Riyadh region');
  expect(html).not.toContain('gradient');
});

test('hero-11 renders in Arabic', () => {
  const html = rtl(<Hero11 {...Hero11Demo.ar} />);
  expect(html).toContain('منطقة الرياض');
  expect(html).toContain('<bdi>2027</bdi>');
  expect(h1(html)).toBe(1);
});

test('hero-12 renders one giant heading and mirrored tilts in English', () => {
  const html = renderToString(<Hero12 {...Hero12Demo.en} />);
  expect(html).toContain('Awraq');
  expect(h1(html)).toBe(1);
  expect(html.match(/<li /g)?.length).toBe(4);
  expect(html).toContain('rtl:-rotate-(--tilt)');
  expect(html).toContain('--tilt:-6deg');
});

test('hero-12 renders in Arabic', () => {
  const html = rtl(<Hero12 {...Hero12Demo.ar} />);
  expect(html).toContain('أوراق');
  expect(h1(html)).toBe(1);
});

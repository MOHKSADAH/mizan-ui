import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Services01, { demo as demo01 } from './services-01';
import Services02, { demo as demo02 } from './services-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('services-01 numbers the rows with two digits and links the titles', () => {
  const html = renderToString(<Services01 {...demo01.en} />);
  expect(html.match(/<li/g)?.length).toBe(demo01.en.services.length);
  expect(html).toContain('<bdi>01</bdi>');
  expect(html).toContain('<bdi>04</bdi>');
  expect(html).toContain('href="#design"');
  expect(h1(html)).toBe(0);
});

test('services-01 renders in Arabic with Western digits and a mirrored arrow', () => {
  const html = rtl(<Services01 {...demo01.ar} />);
  expect(html).toContain('أربع خدمات وفريق واحد مسؤول');
  expect(html).toContain('<bdi>01</bdi>');
  expect(html).toContain('rtl:rotate-180');
  expect(html).not.toMatch(/[٠-٩]/);
});

test('services-01 leaves out the arrow when a service has no link', () => {
  const services = demo01.en.services.map(({ title, description }) => ({ title, description }));
  expect(renderToString(<Services01 {...demo01.en} services={services} />)).not.toContain('rtl:rotate-180');
});

test('services-02 has a sticky heading, a button and numbered rows', () => {
  const html = renderToString(<Services02 {...demo02.en} />);
  expect(html).toContain('lg:sticky');
  expect(html).toContain('Request a quote');
  expect(html).toContain('<bdi>05</bdi>');
  expect(html).toContain('aria-labelledby');
  expect(h1(html)).toBe(0);
});

test('services-02 renders in Arabic', () => {
  const html = rtl(<Services02 {...demo02.ar} />);
  expect(html).toContain('اطلب عرض سعر');
  expect(html).toContain('rtl:rotate-180');
  expect(html).not.toMatch(/[٠-٩]/);
});

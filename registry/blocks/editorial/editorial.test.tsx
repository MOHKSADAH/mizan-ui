import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Editorial01, { demo as Editorial01Demo } from './editorial-01';
import Editorial02, { demo as Editorial02Demo } from './editorial-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('editorial-01 renders a lead and one row per item in English', () => {
  const html = renderToString(<Editorial01 {...Editorial01Demo.en} />);
  expect(html).toContain('How a Jeddah perfume store doubled its sales');
  expect(html).not.toContain('font-normal');
  expect(html).not.toContain('<img');
  expect(html.match(/bg-muted/g)?.length).toBeGreaterThanOrEqual(1 + Editorial01Demo.en.items.length);
  expect(h1(html)).toBe(0);
  expect(html.match(/<article/g)?.length).toBe(1 + Editorial01Demo.en.items.length);
  expect(html).toContain('Reem Al-Ghamdi');
  expect(html).toContain('<time dateTime="2026-11-12">');
});

test('editorial-01 renders in Arabic with the author as a colored meta line', () => {
  const html = rtl(<Editorial01 {...Editorial01Demo.ar} />);
  expect(html).toContain('كيف ضاعف متجر عطور في جدة');
  expect(html).toContain('text-primary">ريم الغامدي');
  expect(html).toContain('rtl:rotate-180');
  expect(h1(html)).toBe(0);
});

test('editorial-01 shows the photo when an image has a src', () => {
  const image = { src: '/lead.jpg', alt: 'Lead photo', width: 400, height: 300 };
  const html = renderToString(<Editorial01 {...Editorial01Demo.en} lead={{ ...Editorial01Demo.en.lead, image }} />);
  expect(html).toContain('src="/lead.jpg"');
  expect(html.match(/<img/g)?.length).toBe(1);
});

test('editorial-02 numbers each row with two digits', () => {
  const html = renderToString(<Editorial02 {...Editorial02Demo.en} />);
  expect(html).toContain('<bdi>01</bdi>');
  expect(html).toContain('<bdi>04</bdi>');
  expect(html.match(/<li/g)?.length).toBe(4);
  expect(h1(html)).toBe(0);
});

test('editorial-02 renders in Arabic', () => {
  const html = rtl(<Editorial02 {...Editorial02Demo.ar} />);
  expect(html).toContain('أربع أدوات');
  expect(html).toContain('الفوترة');
  expect(html).toContain('rtl:rotate-180');
  expect(h1(html)).toBe(0);
});

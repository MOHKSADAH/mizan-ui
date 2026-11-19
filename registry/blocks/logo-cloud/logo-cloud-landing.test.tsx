import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import LogoCloud05, { demo as LogoCloud05Demo } from './logo-cloud-05';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('logo-cloud-05 renders text marks in one weight in a bordered grid', () => {
  const html = renderToString(<LogoCloud05 {...LogoCloud05Demo.en} />);
  expect(html).not.toContain('font-light');
  expect(html).not.toContain('font-black');
  expect(html).toContain('border-s');
  expect(html.match(/<li /g)?.length).toBe(8);
  expect(html).not.toContain('<img');
});

test('logo-cloud-05 renders in Arabic', () => {
  const html = rtl(<LogoCloud05 {...LogoCloud05Demo.ar} />);
  expect(html).toContain('عطور الدار');
  expect(html).toContain('border-e');
  expect(h1(html)).toBe(0);
});

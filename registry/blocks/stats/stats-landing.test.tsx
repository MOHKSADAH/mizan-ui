import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Stats05, { demo as Stats05Demo } from './stats-05';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('stats-05 sets the lead number apart and keeps a context sentence per number', () => {
  const html = renderToString(<Stats05 {...Stats05Demo.en} />);
  expect(html).toContain('lg:text-[11rem]');
  expect(html).toContain('<dl');
  expect(html).toContain('The median across chat and WhatsApp.');
  expect(h1(html)).toBe(0);
});

test('stats-05 renders in Arabic', () => {
  const html = rtl(<Stats05 {...Stats05Demo.ar} />);
  expect(html).toContain('متجر نشط');
  expect(html).toContain('<bdi>+12,000</bdi>');
  expect(h1(html)).toBe(0);
});

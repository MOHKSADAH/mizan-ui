import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Features01, { demo as demo01 } from './features-01';
import Features07, { demo as demo07 } from './features-07';

test('features-01 renders a list of titled cards in English', () => {
  const html = renderToString(<Features01 {...demo01.en} id="features" />);
  expect(html).toContain('aria-labelledby="features-heading"');
  expect(html).toContain('<h2 id="features-heading"');
  expect(html).toContain('<h3');
  expect(html).toContain('Inventory control');
  expect(html.match(/<li>/g)).toHaveLength(6);
});

test('features-01 renders in Arabic and nests headings under a level 3 section', () => {
  expect(renderToString(<Features01 {...demo01.ar} />)).toContain('إدارة المخزون');
  expect(renderToString(<Features01 {...demo01.en} headingLevel={3} />)).toContain('<h4');
});

test('features-07 renders a compact strip in both languages', () => {
  const en = renderToString(<Features07 {...demo07.en} id="strip" />);
  expect(en).toContain('aria-labelledby="strip-heading"');
  expect(en).toContain('py-6 md:py-8 lg:py-10');
  expect(en).toContain('Cash on delivery');
  expect(renderToString(<Features07 {...demo07.ar} />)).toContain('الدفع عند الاستلام');
});

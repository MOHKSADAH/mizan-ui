import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Features01, { demo as demo01 } from './features-01';

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

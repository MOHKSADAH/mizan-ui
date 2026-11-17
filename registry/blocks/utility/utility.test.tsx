import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Utility01, { demo as demo01 } from './utility-01';

test('utility-01 renders the 404 page with a labelled search in English', () => {
  const html = renderToString(<Utility01 {...demo01.en} id="nf" />);
  expect(html).toContain('<main id="main-content"');
  expect(html).toContain('<h1 id="nf-heading"');
  expect(html).toContain('<p dir="ltr"');
  expect(html).toContain('role="search"');
  expect(html).toContain('action="/search"');
  expect(html).toContain('for="nf-search"');
  expect(html).toContain('Back to home');
});

test('utility-01 renders in Arabic and omits the search without it', () => {
  const html = renderToString(<Utility01 {...demo01.ar} />);
  expect(html).toContain('الصفحة غير موجودة');
  expect(html).toContain('ابحث في الموقع');
  expect(renderToString(<Utility01 {...demo01.ar} search={undefined} />)).not.toContain('role="search"');
});

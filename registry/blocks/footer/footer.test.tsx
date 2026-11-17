import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Footer01, { demo as demo01 } from './footer-01';

test('footer-01 renders a footer with labelled link groups in English', () => {
  const html = renderToString(<Footer01 {...demo01.en} />);
  expect(html).toContain('<footer');
  expect(html.match(/<nav /g)).toHaveLength(3);
  expect(html).toContain('aria-label="Product"');
  expect(html).toContain('aria-label="X"');
  expect(html).toContain('<bdi dir="ltr"');
  expect(html).toContain('lg:col-span-4');
});

test('footer-01 renders in Arabic', () => {
  const html = renderToString(<Footer01 {...demo01.ar} />);
  expect(html).toContain('رافد');
  expect(html).toContain('aria-label="المنتج"');
  expect(html).toContain('جميع الحقوق محفوظة');
});

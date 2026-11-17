import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Footer01, { demo as demo01 } from './footer-01';
import Footer04, { demo as demo04 } from './footer-04';

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

test('footer-04 renders payment slots and isolates the CR and VAT numbers in English', () => {
  const html = renderToString(<Footer04 {...demo04.en} />);
  expect(html).toContain('<footer');
  expect(html).toContain('>Apple Pay<');
  expect(html).toContain('<bdi class="tabular-nums">1010123456</bdi>');
  expect(html).toContain('<bdi class="tabular-nums">300012345600003</bdi>');
  expect(html).toContain('Prices include VAT');
  expect(html.match(/<nav /g)).toHaveLength(4);
});

test('footer-04 renders in Arabic and omits optional rows', () => {
  const ar = renderToString(<Footer04 {...demo04.ar} />);
  expect(ar).toContain('الأسعار شاملة ضريبة القيمة المضافة');
  expect(ar).toContain('السجل التجاري');
  const bare = renderToString(<Footer04 {...demo04.en} features={undefined} payments={undefined} />);
  expect(bare).not.toContain('Payment methods');
});

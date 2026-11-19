import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import StoreTrust01, { demo, labelsAr } from './store-trust-01';

test('store-trust-01 renders the five trust points with the free shipping threshold', () => {
  const html = renderToString(<StoreTrust01 {...demo.en} />);
  expect(html).toContain('aria-label="Why shop with us"');
  expect(html).toContain('Free shipping');
  expect(html).toContain('200 Saudi riyals');
  expect(html).toContain('Return within 14 days');
  expect(html).toContain('Cash on delivery');
  expect(html).toContain('VAT included');
});

test('store-trust-01 shows only the points it is given', () => {
  const html = renderToString(<StoreTrust01 {...demo.en} show={['shipping', 'cod']} />);
  expect(html).toContain('Free shipping');
  expect(html).not.toContain('VAT included');
});

test('store-trust-01 renders in Arabic with an Arabic plural', () => {
  const html = renderToString(<StoreTrust01 {...demo.ar} />);
  expect(html).toContain('شحن مجاني');
  expect(html).toContain('استرجاع خلال 14 يومًا');
  expect(html).toContain('الدفع عند الاستلام');
  expect(labelsAr.returnsNote(2)).toBe('استرجاع خلال يومين');
});

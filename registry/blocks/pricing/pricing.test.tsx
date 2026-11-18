import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Pricing01, { demo as demo01 } from './pricing-01';

test('pricing-01 renders plans, the period toggle and the highlighted card in English', () => {
  const html = renderToString(<Pricing01 {...demo01.en} id="plans" />);
  expect(html).toContain('aria-labelledby="plans-heading"');
  expect(html).toContain('aria-label="Billing period"');
  expect(html).toContain('Save 17%');
  expect(html).toContain('ring-2 ring-primary');
  expect(html).toContain('Most popular');
  expect(html).toContain('per month');
  expect(html).toContain('Custom pricing');
  expect(html).toContain('<h3');
});

test('pricing-01 shows the yearly price when the period is yearly', () => {
  const html = renderToString(<Pricing01 {...demo01.en} period="year" />);
  expect(html).toContain('per year');
  expect(html).toContain('990');
});

test('pricing-01 renders in Arabic', () => {
  const html = renderToString(<Pricing01 {...demo01.ar} />);
  expect(html).toContain('باقات بسيطة تنمو مع أعمالك');
  expect(html).toContain('شهريًا');
  expect(html).toContain('الأكثر طلبًا');
});

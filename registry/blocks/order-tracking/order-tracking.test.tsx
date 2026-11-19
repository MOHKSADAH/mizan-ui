import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import OrderTracking01, { demo as tr01 } from './order-tracking-01';

test('order-tracking-01 shows the timeline, the courier, the copyable tracking number and the help link', () => {
  const html = renderToString(<OrderTracking01 {...tr01.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('Track your order');
  expect(html).toContain('360244');
  expect(html).toContain('data-status="shipped"');
  expect(html).toContain('SMSA Express');
  expect(html).toContain('SM4802917365');
  expect(html).toContain('Copy');
  expect(html).toContain('Arrives Thu, Nov 19');
  expect(html).toContain('href="#help"');
});

test('order-tracking-01 marks done, current and upcoming steps', () => {
  const html = renderToString(<OrderTracking01 {...tr01.en} />);
  expect((html.match(/data-status="success"/g) ?? []).length).toBe(4);
  expect((html.match(/data-status="info"/g) ?? []).length).toBe(1);
  expect((html.match(/data-status="muted"/g) ?? []).length).toBe(1);
  expect(html).toContain('aria-current="step"');
});

test('order-tracking-01 renders Arabic with an rtl root', () => {
  const html = renderToString(<OrderTracking01 {...tr01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('تتبّع طلبك');
  expect(html).toContain('مع المندوب');
  expect(html).toContain('تم الشحن');
  expect(html).toContain('نسخ');
});

test('order-tracking-01 explains that the tracking number comes later when no courier has the parcel', () => {
  const html = renderToString(<OrderTracking01 {...tr01.en} courier={undefined} />);
  expect(html).toContain('We send you the tracking number by text message');
  expect(html).not.toContain('SM4802917365');
  expect(html).not.toContain('Track on the courier site');
});

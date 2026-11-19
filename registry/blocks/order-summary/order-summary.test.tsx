import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import OrderSummary01, { demo as os01, labelsAr as os01Ar } from './order-summary-01';
import OrderSummary02, { demo as os02 } from './order-summary-02';
import OrderSummary03, { demo as os03, labelsAr as os03Ar } from './order-summary-03';

test('order-summary-01 collapses the lines on mobile behind a toggle that shows the total', () => {
  const html = renderToString(<OrderSummary01 {...os01.en} />);
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('Show order summary');
  expect(html).toContain('4 items');
  expect(html).toContain('max-lg:hidden');
  expect(html).toContain('lg:sticky');
  expect(html).toContain('1,038.40 Saudi riyals');
  expect(html).toContain('Cotton Thobe, Saudi Cut');
  expect(html).toContain('Discount');
});

test('order-summary-01 renders Arabic with an rtl root', () => {
  const html = renderToString(<OrderSummary01 {...os01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('عرض ملخص الطلب');
  expect(html).toContain('4 منتجات');
  expect(os01Ar.items(2)).toBe('منتجان');
});

test('order-summary-02 shows the delivery estimate and the installment schedule', () => {
  const html = renderToString(<OrderSummary02 {...os02.en} />);
  expect(html).toContain('Arrives Tue, Nov 24');
  expect(html).toContain('Riyadh');
  expect(html).toContain('away from free shipping');
  expect(html).toContain('Tabby');
  expect(html).toContain('4 payments of');
  expect(html).toContain('200.50 Saudi riyals');
});

test('order-summary-02 explains the range when the total is outside it', () => {
  const html = renderToString(<OrderSummary02 {...os02.en} installments={{ ...os02.en.installments, min: 2000 }} />);
  expect(html).not.toContain('4 payments of');
  expect(html).toContain('Installments are available for orders from');
});

test('order-summary-02 renders Arabic', () => {
  const html = renderToString(<OrderSummary02 {...os02.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('قسّمها على دفعات');
  expect(html).toContain('تابي');
  expect(html).toContain('الرياض');
});

test('order-summary-03 shows the order number, copy button, status badge and totals', () => {
  const html = renderToString(<OrderSummary03 {...os03.en} />);
  expect(html).toContain('Thank you, your order is confirmed');
  expect(html).toContain('360251');
  expect(html).toContain('Copy');
  expect(html).toContain('data-status="paid"');
  expect(html).toContain('Paid');
  expect(html).toContain('November 19, 2026');
  expect(html).toContain('1,038.40 Saudi riyals');
  expect(html).toContain('href="#track"');
});

test('order-summary-03 renders Arabic', () => {
  const html = renderToString(<OrderSummary03 {...os03.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('نسخ');
  expect(html).toContain('مدفوع');
  expect(html).toContain('360251');
  expect(os03Ar.items(11)).toBe('11 منتجًا');
});

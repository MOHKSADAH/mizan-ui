import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import OrderHistory01, { demo as oh01, labelsAr as oh01Ar } from './order-history-01';

test('order-history-01 lists each order with status, total, reorder and invoice', () => {
  const html = renderToString(<OrderHistory01 {...oh01.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('My orders');
  expect(html).toContain('360251');
  expect(html).toContain('data-status="delivered"');
  expect(html).toContain('1,038.40 Saudi riyals');
  expect((html.match(/Reorder the items of order/g) ?? []).length).toBe(6);
  expect(html).toContain('href="#invoice-360251"');
});

test('order-history-01 has no invoice for a cancelled order and tracks only a shipped one', () => {
  const html = renderToString(<OrderHistory01 {...oh01.en} />);
  expect(html).not.toContain('invoice-359977');
  expect((html.match(/Track order/g) ?? []).length).toBe(1);
});

test('order-history-01 offers a filter for the statuses present, with counts', () => {
  const html = renderToString(<OrderHistory01 {...oh01.en} />);
  expect(html).toContain('aria-label="Filter by status"');
  expect(html).toContain('All');
  expect(html).toContain('Cancelled');
  expect(html).not.toContain('>Pending<');
});

test('order-history-01 shows an empty state without orders', () => {
  const html = renderToString(<OrderHistory01 {...oh01.en} orders={[]} />);
  expect(html).toContain('You have no orders yet');
  expect(html).toContain('href="#shop"');
  expect(html).not.toContain('Filter by status');
});

test('order-history-01 renders Arabic with plural result counts', () => {
  const html = renderToString(<OrderHistory01 {...oh01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('طلباتي');
  expect(html).toContain('اطلب مرة أخرى');
  expect(html).toContain('ملغي');
  expect(oh01Ar.results(2)).toBe('طلبان');
  expect(oh01Ar.results(11)).toBe('11 طلبًا');
});

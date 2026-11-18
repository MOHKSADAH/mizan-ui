import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DataTable03, demo } from '@/registry/blocks/data-table/data-table-03';

test('renders the customers in English', () => {
  const html = renderToString(<DataTable03 {...demo.en} />);
  expect(html).toContain('Customers');
  expect(html).toContain('Abdullah Al-Qahtani');
  expect(html).toContain('Showing 1–8 of 10');
  expect(html).toContain('VIP');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<DataTable03 {...demo.ar} />);
  expect(html).toContain('العملاء');
  expect(html).toContain('عبدالله القحطاني');
  expect(html).toContain('عرض 1–8 من 10');
  expect(html).toContain('dir="rtl"');
});

test('sample customers add up: recent orders fit inside the totals', () => {
  for (const c of demo.en.customers) {
    expect(c.recent.length).toBeLessThanOrEqual(c.orders);
    expect(c.recent.reduce((sum, o) => sum + o.total, 0)).toBeLessThanOrEqual(c.spent);
    expect(c.lastOrder).toBe(c.recent[0].date);
  }
});

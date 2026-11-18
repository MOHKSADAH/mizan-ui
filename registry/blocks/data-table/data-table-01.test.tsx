import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DataTable01, demo } from '@/registry/blocks/data-table/data-table-01';

test('renders the first page in English', () => {
  const html = renderToString(<DataTable01 {...demo.en} />);
  expect(html).toContain('Orders');
  expect(html).toContain('#10482');
  expect(html).toContain('Showing 1–8 of 20');
  expect(html).toContain('Select all orders on this page');
  expect(html).toContain('Delivered');
  expect(html).not.toContain('#10474');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<DataTable01 {...demo.ar} />);
  expect(html).toContain('الطلبات');
  expect(html).toContain('عبدالله القحطاني');
  expect(html).toContain('عرض 1–8 من 20');
  expect(html).toContain('dir="rtl"');
});

test('selected count uses Arabic plural forms', async () => {
  const { labelsAr } = await import('@/registry/blocks/data-table/data-table-01');
  expect(labelsAr.selected(1)).toBe('تم تحديد طلب واحد');
  expect(labelsAr.selected(2)).toBe('تم تحديد طلبين');
  expect(labelsAr.selected(5)).toBe('تم تحديد 5 طلبات');
  expect(labelsAr.selected(11)).toBe('تم تحديد 11 طلبًا');
});

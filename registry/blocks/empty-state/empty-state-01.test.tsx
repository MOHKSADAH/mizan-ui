import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { EmptyState01, demo } from '@/registry/blocks/empty-state/empty-state-01';

test('renders English', () => {
  const html = renderToString(<EmptyState01 {...demo.en} />);
  expect(html).toContain('role="heading"');
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('No products yet');
});

test('renders Arabic', () => {
  const html = renderToString(<EmptyState01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('لا توجد منتجات بعد');
});

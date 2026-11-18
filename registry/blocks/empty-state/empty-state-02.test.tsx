import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { EmptyState02, demo } from '@/registry/blocks/empty-state/empty-state-02';

test('renders English', () => {
  const html = renderToString(<EmptyState02 {...demo.en} />);
  expect(html).toContain('role="heading"');
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('leather wallet');
});

test('renders Arabic', () => {
  const html = renderToString(<EmptyState02 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('محفظة جلدية');
});

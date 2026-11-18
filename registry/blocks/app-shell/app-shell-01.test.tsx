import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { AppShell01, demo } from '@/registry/blocks/app-shell/app-shell-01';

test('renders English with the sidebar on the left', () => {
  const html = renderToString(<AppShell01 {...demo.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('Orders');
  expect(html).toContain('aria-label="Main navigation"');
  expect(html).toContain('aria-current="page"');
  expect(html).toContain('data-side="left"');
});

test('renders Arabic with the sidebar on the right', () => {
  const html = renderToString(<AppShell01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('الطلبات');
  expect(html).toContain('data-side="right"');
});

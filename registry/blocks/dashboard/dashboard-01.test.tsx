import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Dashboard01, demo } from '@/registry/blocks/dashboard/dashboard-01';

test('renders English with KPIs, charts and the orders table', () => {
  const html = renderToString(<Dashboard01 {...demo.en} />);
  expect(html).toContain('Sales');
  expect(html).toContain('Average order value');
  expect(html).toContain('vs previous period');
  expect(html).toContain('Delivered');
  expect(html).toContain('#10482');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Dashboard01 {...demo.ar} />);
  expect(html).toContain('المبيعات');
  expect(html).toContain('مقارنة بالفترة السابقة');
  expect(html).toContain('عبدالله القحطاني');
  expect(html).toContain('dir="rtl"');
});

test('sample data is consistent: revenue is orders x aov and the categories add up', () => {
  const { daily } = demo.en;
  expect(daily).toHaveLength(180);
  const revenue = daily.slice(-30).reduce((sum, p) => sum + p.orders * p.aov, 0);
  const shares = demo.en.categories.reduce((sum, c) => sum + c.share, 0);
  expect(Number.isInteger(revenue)).toBe(true);
  expect(shares).toBeCloseTo(1, 10);
});

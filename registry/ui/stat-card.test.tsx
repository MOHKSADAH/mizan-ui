import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { StatCard, statCardLabelsAr } from './stat-card';

const spark = [3, 5, 4, 8, 9];

test('renders in en and ar', () => {
  const en = renderToString(<StatCard label="Revenue" value={12400} delta={12.44} showPrevious spark={spark} />);
  expect(en).toContain('12,400');
  expect(en).toContain('+12.4%');
  expect(en).toContain('Increase of');
  expect(en).toContain('vs previous period');
  const ar = renderToString(
    <StatCard lang="ar" label="الإيرادات" value={12400} delta={-3} labels={statCardLabelsAr} />,
  );
  expect(ar).toContain('انخفاض بمقدار');
});

test('zero delta is neutral without a sign', () => {
  const html = renderToString(<StatCard label="Orders" value={5} delta={0} />);
  expect(html).toContain('No change');
  expect(html).toContain('text-muted-foreground');
  expect(html).not.toContain('+0');
});

test('loading renders a busy skeleton', () => {
  const html = renderToString(<StatCard label="Orders" value={5} loading />);
  expect(html).toContain('aria-busy="true"');
  expect(html).not.toContain('Orders');
});

test('the sparkline renders on the server, mirrored in RTL', () => {
  const html = renderToString(<StatCard label="Revenue" value={1} delta={2} spark={spark} />);
  expect(html).toContain('data-slot="stat-card-spark"');
  expect(html).toContain('<polyline points="2.0,');
  expect(html).toContain('rtl:-scale-x-100');
});

test('a node value renders as is', () => {
  const html = renderToString(<StatCard label="Revenue" value={<b>SAR 5</b>} />);
  expect(html).toContain('<b>SAR 5</b>');
});

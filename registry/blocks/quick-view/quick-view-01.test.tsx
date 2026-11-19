import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import QuickView01, { QuickViewContent, demo } from './quick-view-01';

const Title = ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>;

test('quick-view-01 renders a tile and a named quick view button per product', () => {
  const html = renderToString(<QuickView01 {...demo.en} id="qv" />);
  expect(html).toContain('aria-labelledby="qv-heading"');
  expect(html).toContain('aria-label="Quick view: Oud Al Majlis eau de parfum"');
  expect(html).toContain('aria-haspopup="dialog"');
  expect(html).not.toContain('Add to cart');
});

test('quick-view-01 renders in Arabic', () => {
  const html = renderToString(<QuickView01 {...demo.ar} />);
  expect(html).toContain('الأكثر مبيعًا');
  expect(html).toContain('aria-label="نظرة سريعة: عطر عود المجلس"');
});

test('the quick view content shows the price, the variants and the actions', () => {
  const [thobe] = demo.en.products;
  const html = renderToString(<QuickViewContent product={thobe} Title={Title} />);
  expect(html).toContain('<h2>');
  expect(html).toContain('289 Saudi riyals');
  expect(html).toMatch(/Save .?17%/);
  expect(html).toContain('Only 6 left');
  expect(html).toContain('Add to cart');
  expect(html).toContain('View full details');
  expect(html).toContain('role="radiogroup"');
});

test('the quick view content in Arabic and with the item sold out', () => {
  const [thobe] = demo.ar.products;
  const html = renderToString(
    <QuickViewContent product={{ ...thobe, stock: { status: 'out' } }} lang="ar" Title={Title} labels={demo.ar.labels} />,
  );
  expect(html).toContain('نفدت الكمية');
  expect(html).toContain('عرض التفاصيل كاملة');
  expect(html).not.toContain('أضف إلى السلة');
});

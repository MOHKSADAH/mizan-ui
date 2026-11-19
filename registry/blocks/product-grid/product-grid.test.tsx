import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import ProductGrid01, { demo as demo01, labelsAr, labelsEn } from './product-grid-01';
import ProductGrid02, { demo as demo02 } from './product-grid-02';
import ProductGrid03, { demo as demo03 } from './product-grid-03';

test('product-grid-01 renders the sidebar filters, sort, count and first page in English', () => {
  const html = renderToString(<ProductGrid01 {...demo01.en} id="shop" />);
  expect(html).toContain('aria-labelledby="shop-heading"');
  expect(html).toContain('aria-label="Filter products"');
  expect(html).toContain('Price');
  expect(html).toContain('In stock only');
  expect(html).toContain('8 products');
  expect(html).toContain('Handmade leather tote');
  expect(html).toContain('<h3');
  expect(html).toContain('aria-label="Product pages"');
  expect(html).not.toContain('Wireless headphones');
});

test('product-grid-01 renders in Arabic with Arabic plural counts', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <ProductGrid01 {...demo01.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('شنطة جلد يدوية');
  expect(html).toContain('تصفية المنتجات');
  expect(html).toContain('8 منتجات');
  expect(labelsAr.results(1)).toBe('منتج واحد');
  expect(labelsAr.results(2)).toBe('منتجان');
  expect(labelsAr.results(11)).toBe('11 منتجًا');
  expect(labelsEn.showResults(0)).toBe('Show 0 products');
});

test('product-grid-01 shows a discount badge and a spoken original price', () => {
  const html = renderToString(<ProductGrid01 {...demo01.en} />);
  expect(html).toMatch(/15%.{0,2} off/);
  expect(html).toContain('Original price:');
});

test('product-grid-02 renders pills, filters and the result count', () => {
  const html = renderToString(<ProductGrid02 {...demo02.en} />);
  expect(html).toContain('aria-label="Product filters"');
  expect(html).toContain('On sale');
  expect(html).toContain('In stock');
  expect(html).toContain('8 results');
  expect(html).toContain('Add to cart');
});

test('product-grid-02 renders in Arabic', () => {
  const html = renderToString(<ProductGrid02 {...demo02.ar} />);
  expect(html).toContain('تسوّق منتجاتنا');
  expect(html).toContain('عروض وتخفيضات');
  expect(html).toContain('أضف للسلة');
});

test('product-grid-03 renders a carousel of product cards', () => {
  const html = renderToString(<ProductGrid03 {...demo03.en} id="best" />);
  expect(html).toContain('aria-roledescription="carousel"');
  expect(html).toContain('aria-roledescription="slide"');
  expect(html).toContain('Best sellers');
  expect(html).toContain('View all');
  expect(html).toContain('Previous products');
});

test('product-grid-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <ProductGrid03 {...demo03.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('الأكثر مبيعًا');
  expect(html).toContain('عرض الكل');
  expect(html).toContain('المنتجات السابقة');
});

test('the demo grids show placeholders, not drawn images', () => {
  for (const html of [
    renderToString(<ProductGrid01 {...demo01.en} />),
    renderToString(<ProductGrid02 {...demo02.en} />),
    renderToString(<ProductGrid03 {...demo03.en} />),
  ]) {
    expect(html).toContain('data-slot="product-card-image"');
    expect(html).not.toContain('<img');
  }
});

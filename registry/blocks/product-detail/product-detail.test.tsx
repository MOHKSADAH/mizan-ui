import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ProductDetail01, { demo as demo01 } from './product-detail-01';
import ProductDetail02, { demo as demo02 } from './product-detail-02';
import ProductDetail03, { demo as demo03 } from './product-detail-03';

test('product-detail-01 renders the buy box in English', () => {
  const html = renderToString(<ProductDetail01 {...demo01.en} id="p" />);
  expect(html).toContain('aria-labelledby="p-heading"');
  expect(html).toContain('Egyptian cotton thobe');
  expect(html).toContain('289 Saudi riyals');
  expect(html).toMatch(/Save .?17%/);
  expect(html).toContain('Price includes ');
  expect(html).toContain('4 payments of');
  expect(html).toContain('Only 6 left');
  expect(html).toContain('Add to cart');
  expect(html).toContain('Buy now');
  expect(html).toContain('aria-label="Save to wishlist"');
  expect(html).toContain('Arrives ');
  expect(html).toContain('away from free shipping');
});

test('product-detail-01 renders in Arabic with Arabic labels on every part', () => {
  const html = renderToString(<ProductDetail01 {...demo01.ar} />);
  expect(html).toContain('ثوب رجالي قطن مصري');
  expect(html).toContain('أضف إلى السلة');
  expect(html).toContain('اشترِ الآن');
  expect(html).toContain('وفّر ');
  expect(html).toContain('بقيت 6 قطع فقط');
  expect(html).toContain('aria-label="حفظ في المفضلة"');
  expect(html).toContain('الشحن والإرجاع');
});

test('product-detail-01 disables buying when the item is sold out', () => {
  const html = renderToString(<ProductDetail01 {...demo01.en} stock={{ status: 'out' }} />);
  expect(html).toContain('Sold out');
  expect(html).not.toContain('Add to cart');
});

test('product-detail-01 omits the saving without a compare-at price', () => {
  const html = renderToString(<ProductDetail01 {...demo01.en} compareAtPrice={undefined} />);
  expect(html).not.toContain('Save 17');
});

test('product-detail-02 renders a sticky buy box and a specifications table', () => {
  const html = renderToString(<ProductDetail02 {...demo02.en} id="e" />);
  expect(html).toContain('aria-labelledby="e-heading"');
  expect(html).toContain('lg:sticky');
  expect(html).toContain('scope="row"');
  expect(html).toContain('Cambodian oud, rose');
  expect(html).toContain('Add to cart');
  const ar = renderToString(<ProductDetail02 {...demo02.ar} />);
  expect(ar).toContain('عطر عود المجلس');
  expect(ar).toContain('المواصفات');
});

test('product-detail-03 puts add to cart in a sticky bar and hides the inline button on a phone', () => {
  const html = renderToString(<ProductDetail03 {...demo03.en} />);
  expect(html).toContain('data-slot="sticky-action-bar"');
  expect(html).toContain('max-md:hidden');
  const ar = renderToString(<ProductDetail03 {...demo03.ar} />);
  expect(ar).toContain('قهوة سعودية بالهيل والزعفران');
  expect(ar).toContain('aria-label="الإجراءات"');
});

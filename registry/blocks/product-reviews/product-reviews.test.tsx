import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ProductReviews01, { demo as demo01 } from './product-reviews-01';
import ProductReviews02, { demo as demo02 } from './product-reviews-02';

test('product-reviews-01 renders the summary, the first page and the pager in English', () => {
  const html = renderToString(<ProductReviews01 {...demo01.en} id="rv" />);
  expect(html).toContain('aria-labelledby="rv-heading"');
  expect(html).toContain('Customer reviews');
  expect(html).toContain('Based on 8 reviews');
  expect(html).toContain('Write a review');
  expect(html).toContain('Verified purchase');
  expect(html).toContain('Nayef Al-Otaibi');
  expect(html).not.toContain('Turki Al-Zahrani');
  expect(html).toContain('aria-current="page"');
  expect(html).toContain('aria-pressed="false"');
});

test('product-reviews-01 sorts by the chosen order and shows photos', () => {
  const lowest = renderToString(<ProductReviews01 {...demo01.en} defaultSort="lowest" />);
  expect(lowest).toContain('Turki Al-Zahrani');
  expect(lowest.indexOf('Turki Al-Zahrani')).toBeLessThan(lowest.indexOf('Haifa Al-Harbi'));
  expect(lowest).not.toContain('Noura Al-Shammari');
  const newest = renderToString(<ProductReviews01 {...demo01.en} />);
  expect(newest).toContain('data-slot="image-lightbox"');
});

test('product-reviews-01 hides the pager when everything fits on one page', () => {
  const html = renderToString(<ProductReviews01 {...demo01.en} pageSize={20} />);
  expect(html).not.toContain('data-slot="pagination"');
});

test('product-reviews-01 renders in Arabic with names and cities', () => {
  const html = renderToString(<ProductReviews01 {...demo01.ar} />);
  expect(html).toContain('تقييمات العملاء');
  expect(html).toContain('بناءً على 8 تقييمات');
  expect(html).toContain('نايف العتيبي');
  expect(html).toContain('الرياض');
  expect(html).toContain('مشترٍ موثّق');
  expect(html).toContain('اكتب تقييمك');
});

test('product-reviews-02 gives the first review the large card', () => {
  const html = renderToString(<ProductReviews02 {...demo02.en} id="hl" />);
  expect(html).toContain('aria-labelledby="hl-heading"');
  expect(html).toContain('lg:col-span-2 lg:row-span-2');
  expect(html).toContain('Read all 248 reviews');
  expect(html).toContain('Worth every riyal');
  const ar = renderToString(<ProductReviews02 {...demo02.ar} />);
  expect(ar).toContain('رأي المشترين');
  expect(ar).toContain('عرض كل التقييمات (248)');
});

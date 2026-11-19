import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Wishlist01, { demo, labelsAr } from './wishlist-01';

test('wishlist-01 lists saved items with move to cart and a named remove button', () => {
  const html = renderToString(<Wishlist01 {...demo.en} id="saved" />);
  expect(html).toContain('aria-labelledby="saved-heading"');
  expect(html).toContain('4 saved items');
  expect(html).toContain('data-orientation="horizontal"');
  expect(html).toContain('Move to cart');
  expect(html).toContain('aria-label="Remove Handmade leather tote from wishlist"');
  expect(html).toContain('Only 3 left');
});

test('wishlist-01 disables an out of stock item', () => {
  const html = renderToString(<Wishlist01 {...demo.en} />);
  expect(html).toContain('data-unavailable=""');
  expect(html).toContain('disabled');
});

test('wishlist-01 shows the empty state when there are no items', () => {
  const html = renderToString(<Wishlist01 {...demo.en} items={[]} />);
  expect(html).toContain('Your wishlist is empty');
  expect(html).toContain('Browse products');
  expect(html).toContain('0 saved items');
});

test('wishlist-01 renders in Arabic', () => {
  const html = renderToString(<Wishlist01 {...demo.ar} />);
  expect(html).toContain('المفضلة');
  expect(html).toContain('4 منتجات محفوظة');
  expect(html).toContain('انقل إلى السلة');
  expect(labelsAr.saved(2)).toBe('منتجان محفوظان');
});

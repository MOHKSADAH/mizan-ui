import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Cart01, { checkCoupon, demo as cart01, labelsAr as cart01Ar, labelsEn as cart01En } from './cart-01';
import Cart02, { demo as cart02, labelsAr as cart02Ar } from './cart-02';
import Cart03, { demo as cart03, labelsAr as cart03Ar } from './cart-03';

test('cart-01 renders lines, the coupon field and the VAT summary in English', () => {
  const html = renderToString(<Cart01 {...cart01.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('Shopping cart');
  expect(html).toContain('4 items');
  expect(html).toContain('Cotton Thobe, Saudi Cut');
  expect(html).toContain('Only 3 left');
  expect(html).toContain('Coupon code');
  expect(html).toContain('1,126.00 Saudi riyals');
  expect(html).toContain('Free');
  expect(html).toContain('included');
  expect(html).toContain('146.87 Saudi riyals');
  expect(html).toContain('href="#checkout"');
  expect(html).toContain('aria-label="Remove Royal Oud Perfume"');
});

test('cart-01 renders Arabic with an rtl root', () => {
  const html = renderToString(<Cart01 {...cart01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('سلة التسوق');
  expect(html).toContain('4 منتجات');
  expect(html).toContain('رمز القسيمة');
  expect(html).toContain('إتمام الطلب');
});

test('cart-01 shows shipping cost under the free shipping threshold', () => {
  const html = renderToString(<Cart01 {...cart01.en} shipping={{ fee: 25, freeFrom: 2000 }} />);
  expect(html).toContain('1,151.00 Saudi riyals');
  expect(html).not.toContain('>Free<');
});

test('cart-01 shows the empty state when there are no items', () => {
  const html = renderToString(<Cart01 {...cart01.en} items={[]} />);
  expect(html).toContain('Your cart is empty');
  expect(html).toContain('0 items');
  expect(html).toContain('href="#shop"');
  expect(html).not.toContain('Checkout');
});

test('cart labels use the Arabic plural forms', () => {
  expect(cart01En.items(1)).toBe('1 item');
  expect(cart01Ar.items(1)).toBe('منتج واحد');
  expect(cart01Ar.items(2)).toBe('منتجان');
  expect(cart01Ar.items(5)).toBe('5 منتجات');
  expect(cart01Ar.items(11)).toBe('11 منتجًا');
  expect(cart02Ar.items(3)).toBe('3 منتجات');
  expect(cart03Ar.more(2)).toBe('ومنتجان آخران');
});

test('cart-02 renders the trigger with the count in English and Arabic', () => {
  const en = renderToString(<Cart02 {...cart02.en} />);
  expect(en).toContain('aria-label="Open cart, 4 items"');
  expect(en).toContain('dir="ltr"');
  const ar = renderToString(<Cart02 {...cart02.ar} />);
  expect(ar).toContain('aria-label="فتح السلة، 4 منتجات"');
  expect(ar).toContain('dir="rtl"');
});

test('cart-03 renders the trigger with the count in English and Arabic', () => {
  const en = renderToString(<Cart03 {...cart03.en} />);
  expect(en).toContain('aria-label="Open cart, 5 items"');
  expect(en).toContain('Rafid');
  const ar = renderToString(<Cart03 {...cart03.ar} />);
  expect(ar).toContain('aria-label="فتح السلة، 5 منتجات"');
  expect(ar).toContain('رافد');
  expect(ar).toContain('dir="rtl"');
});

test('cart-01 coupon check moves to error when apply throws, rejects or returns null', async () => {
  expect(await checkCoupon('A', async () => 0.1)).toEqual({ status: 'success', code: 'A', rate: 0.1 });
  expect(await checkCoupon('A', async () => null)).toEqual({ status: 'error' });
  expect(await checkCoupon('A', async () => { throw new Error('network'); })).toEqual({ status: 'error' });
  expect(await checkCoupon('A', () => { throw new Error('sync'); })).toEqual({ status: 'error' });
});

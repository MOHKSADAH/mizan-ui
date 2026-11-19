import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import CheckoutPage01, { demo as cp01 } from './checkout-page/checkout-page-01';
import CheckoutPage02, { demo as cp02 } from './checkout-page/checkout-page-02';
import OrderConfirmationPage01, { demo as oc01 } from './order-confirmation-page/order-confirmation-page-01';
import ProductPage01, { demo as pp01 } from './product-page/product-page-01';
import StoreHomePage01, { demo as sh01 } from './store-home-page/store-home-page-01';

test('checkout-page-01 puts the summary first and sticky beside the form, with a main landmark', () => {
  const html = renderToString(<CheckoutPage01 {...cp01.en} />);
  expect(html).toContain('<main id="main-content"');
  expect(html.indexOf('Show order summary')).toBeLessThan(html.indexOf('Mobile number'));
  expect(html).toContain('lg:sticky');
  expect(html).toContain('Back to cart');
  expect(html).toContain('VAT number');
});

test('checkout-page-01 order total matches the total on the place order button', () => {
  const html = renderToString(<CheckoutPage01 {...cp01.en} />);
  expect(html.match(/1,038\.40 Saudi riyals/g)?.length).toBeGreaterThanOrEqual(2);
});

test('checkout-page-01 renders Arabic with Arabic store copy', () => {
  const html = renderToString(<CheckoutPage01 {...cp01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('العودة إلى السلة');
  expect(html).toContain('رقم الجوال');
  expect(html).toContain('الرقم الضريبي');
});

test('checkout-page-02 pairs the step form with the summary that shows the delivery date and installments', () => {
  const html = renderToString(<CheckoutPage02 {...cp02.en} />);
  expect(html).toContain('aria-current="step"');
  expect(html).toContain('Arrives Tue, Nov 24');
  expect(html).toContain('Tabby');
  expect(html).toContain('802.00 Saudi riyals');
});

test('checkout-page-02 renders Arabic', () => {
  const html = renderToString(<CheckoutPage02 {...cp02.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('المراجعة');
  expect(html).toContain('تابي');
});

test('order-confirmation-page-01 links the receipt to the tracking section and has no tracking number yet', () => {
  const html = renderToString(<OrderConfirmationPage01 {...oc01.en} />);
  expect(html).toContain('href="#track"');
  expect(html).toContain('id="track"');
  expect(html).toContain('Create an account with your mobile number');
  expect(html).toContain('We send you the tracking number by text message');
  expect(html).toContain('You may also like');
  expect(html).not.toContain('Wireless headphones');
});

test('order-confirmation-page-01 renders Arabic', () => {
  const html = renderToString(<OrderConfirmationPage01 {...oc01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('قد يعجبك أيضًا');
  expect(html).toContain('جارٍ تجهيز الطلب');
});

test('product-page-01 links the rating to the reviews section and lists related products', () => {
  const html = renderToString(<ProductPage01 {...pp01.en} />);
  expect(html).toContain('href="#reviews"');
  expect(html).toContain('id="reviews"');
  expect(html).toContain('To go with your thobe');
  expect(html).toContain('Free shipping');
});

test('product-page-01 renders Arabic', () => {
  const html = renderToString(<ProductPage01 {...pp01.ar} />);
  expect(html).toContain('منتجات تكمّل ثوبك');
  expect(html).toContain('الأسعار شاملة ضريبة القيمة المضافة');
});

test('store-home-page-01 has every section the navbar links point to', () => {
  const html = renderToString(<StoreHomePage01 {...sh01.en} />);
  for (const link of sh01.en.navbar.links) expect(html).toContain(`id="${link.href.slice(1)}"`);
  expect(html).toContain('Most ordered this week');
  expect(html).toContain('<h1');
});

test('store-home-page-01 renders Arabic copy first', () => {
  const html = renderToString(<StoreHomePage01 {...sh01.ar} />);
  expect(html).toContain('ثياب وعود ودلال قهوة، من الرياض إلى باب بيتك');
  expect(html).toContain('الأكثر طلبًا هذا الأسبوع');
  expect(html).toContain('رأي المشترين');
});

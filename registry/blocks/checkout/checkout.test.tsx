import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Checkout01, { demo as co01, labelsAr as co01Ar } from './checkout-01';
import Checkout02, { demo as co02 } from './checkout-02';
import Checkout03, { demo as co03 } from './checkout-03';

test('checkout-01 puts the phone before the name and leads with the card form', () => {
  const html = renderToString(<Checkout01 {...co01.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html.indexOf('Mobile number')).toBeLessThan(html.indexOf('Full name'));
  expect(html).toContain('Card number');
  expect(html).toContain('National short address');
  expect(html).not.toContain('Order summary');
});

test('checkout-01 lists the shipping dates and prices and puts cash on delivery last', () => {
  const html = renderToString(<Checkout01 {...co01.en} />);
  expect(html).toContain('Arrives Tue, Nov 24');
  expect(html).toContain('Arrives Sun, Nov 22');
  expect(html).toContain('Free');
  expect(html.indexOf('Apple Pay')).toBeLessThan(html.indexOf('mada or credit card'));
  expect(html.lastIndexOf('Cash on delivery')).toBeGreaterThan(html.indexOf('Tamara'));
  expect(html).toContain('Fee');
});

test('checkout-01 collapses each section on mobile and states that the VAT is included', () => {
  const html = renderToString(<Checkout01 {...co01.en} />);
  expect(html).toContain('aria-expanded="true"');
  expect(html).toContain('lg:hidden');
  expect(html).toContain('Prices include');
  expect(html).toContain('1,038.40 Saudi riyals');
});

test('checkout-01 shows the failed payment notice and the pending state', () => {
  const failed = renderToString(<Checkout01 {...co01.en} paymentFailed />);
  expect(failed).toContain('The payment did not go through');
  const pending = renderToString(<Checkout01 {...co01.en} paymentFailed status="pending" />);
  expect(pending).toContain('Processing your payment');
  expect(pending).toContain('disabled');
  expect(pending).not.toContain('The payment did not go through');
});

test('checkout-01 disables Tabby and Tamara outside the order range', () => {
  const html = renderToString(<Checkout01 {...co01.en} installments={{ min: 2000, max: 5000 }} />);
  expect(html).toContain('Available for orders from');
});

test('checkout-01 renders Arabic with an rtl root', () => {
  const html = renderToString(<Checkout01 {...co01.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('رقم الجوال');
  expect(html).toContain('الدفع عند الاستلام');
  expect(html).toContain('الأسعار شاملة ضريبة القيمة المضافة');
  expect(co01Ar.arrives('الثلاثاء')).toBe('يصل الثلاثاء');
});

test('checkout-02 opens on the first step of five and keeps the other steps hidden', () => {
  const html = renderToString(<Checkout02 {...co02.en} />);
  expect(html).toContain('aria-current="step"');
  expect(html).toContain('Continue');
  expect(html).not.toContain('Back');
  expect((html.match(/hidden=""/g) ?? []).length).toBe(4);
  expect(html).toContain('Review');
});

test('checkout-02 opens on the review step with back and place order', () => {
  const html = renderToString(<Checkout02 {...co02.en} defaultStep="review" />);
  expect(html).toContain('Back');
  expect(html).toContain('Place order');
  expect(html).toContain('Edit');
  expect(html).toContain('Prices include');
});

test('checkout-02 renders Arabic', () => {
  const html = renderToString(<Checkout02 {...co02.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('المراجعة');
  expect(html).toContain('متابعة');
});

test('checkout-03 shows three express text buttons, the divider and the compact form', () => {
  const html = renderToString(<Checkout03 {...co03.en} />);
  expect(html).toContain('Apple Pay');
  expect(html).toContain('>mada<');
  expect(html).toContain('STC Pay');
  expect(html).toContain('or pay another way');
  expect(html).toContain('Mobile number');
  expect(html).toContain('Continue to payment');
  expect(html).not.toContain('<img');
});

test('checkout-03 hides a method and disables every button while one is pending', () => {
  const html = renderToString(<Checkout03 {...co03.en} express={['mada', 'stc-pay']} pendingMethod="stc-pay" />);
  expect(html).not.toContain('Apple Pay');
  expect(html).toContain('Waiting for your confirmation');
  expect(html).toContain('aria-busy="true"');
});

test('checkout-03 renders Arabic', () => {
  const html = renderToString(<Checkout03 {...co03.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('أو ادفع بطريقة أخرى');
  expect(html).toContain('>مدى<');
});

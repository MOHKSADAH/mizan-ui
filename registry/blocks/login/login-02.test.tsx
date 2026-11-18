import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Login02, demo, normalizeSaudiMobile } from '@/registry/blocks/login/login-02';

test('renders English with the +966 prefix', () => {
  const html = renderToString(<Login02 {...demo.en} />);
  expect(html).toContain('Sign in with your phone');
  expect(html).toContain('+966');
  expect(html).toContain('Send code on WhatsApp');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Login02 {...demo.ar} />);
  expect(html).toContain('تسجيل الدخول برقم الجوال');
  expect(html).toContain('إرسال رمز التحقق عبر واتساب');
  expect(html).toContain('dir="rtl"');
});

test('normalizes the accepted Saudi mobile formats', () => {
  for (const input of ['0501234567', '501234567', '+966 50 123 4567', '00966501234567', '٠٥٠١٢٣٤٥٦٧']) {
    expect(normalizeSaudiMobile(input)).toBe('501234567');
  }
  for (const input of ['', '0401234567', '50123456', '5012345678']) {
    expect(normalizeSaudiMobile(input)).toBeNull();
  }
});

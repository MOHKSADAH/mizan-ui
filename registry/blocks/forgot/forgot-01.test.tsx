import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Forgot01, demo } from '@/registry/blocks/forgot/forgot-01';

test('renders the request form in English', () => {
  const html = renderToString(<Forgot01 {...demo.en} />);
  expect(html).toContain('Reset your password');
  expect(html).toContain('Send reset link');
  expect(html).toContain('Back to sign in');
  expect(html).toContain('rtl:rotate-180');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Forgot01 {...demo.ar} />);
  expect(html).toContain('إعادة تعيين كلمة المرور');
  expect(html).toContain('العودة إلى تسجيل الدخول');
  expect(html).toContain('dir="rtl"');
});

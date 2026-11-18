import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Login01, demo } from '@/registry/blocks/login/login-01';

test('renders English', () => {
  const html = renderToString(<Login01 {...demo.en} />);
  expect(html).toContain('Sign in to your store');
  expect(html).toContain('current-password');
  expect(html).toContain('aria-pressed="false"');
  expect(html).toContain('Continue with Nafath');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Login01 {...demo.ar} />);
  expect(html).toContain('تسجيل الدخول إلى متجرك');
  expect(html).toContain('نسيت كلمة المرور؟');
  expect(html).toContain('dir="rtl"');
});

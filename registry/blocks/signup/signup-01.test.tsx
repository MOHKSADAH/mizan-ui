import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Signup01, demo } from '@/registry/blocks/signup/signup-01';

test('renders English with a required terms checkbox', () => {
  const html = renderToString(<Signup01 {...demo.en} />);
  expect(html).toContain('Create your store account');
  expect(html).toContain('new-password');
  expect(html).toContain('I agree to the');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Signup01 {...demo.ar} />);
  expect(html).toContain('أنشئ حساب متجرك');
  expect(html).toContain('أوافق على');
  expect(html).toContain('dir="rtl"');
});

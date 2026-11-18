import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Otp01, demo, labelsAr, labelsEn } from '@/registry/blocks/otp/otp-01';

test('renders English with the countdown and a polite live region', () => {
  const html = renderToString(<Otp01 {...demo.en} />);
  expect(html).toContain('Enter the verification code');
  expect(html).toContain('Resend code in 60 seconds');
  expect(html).toContain('role="status"');
  expect(html).toContain('one-time-code');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Otp01 {...demo.ar} />);
  expect(html).toContain('أدخل رمز التحقق');
  expect(html).toContain('إعادة الإرسال بعد 60 ثانية');
  expect(html).toContain('dir="rtl"');
});

test('countdown text uses plural forms in both languages', () => {
  expect(labelsEn.resendIn(1)).toBe('Resend code in 1 second');
  expect(labelsAr.resendIn(2)).toBe('إعادة الإرسال بعد ثانيتين');
  expect(labelsAr.resendIn(5)).toBe('إعادة الإرسال بعد 5 ثوانٍ');
});

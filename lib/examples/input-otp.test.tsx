import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { SmsCodeDemo } from '@/registry/examples/input-otp.client';

describe('input-otp sms example', () => {
  test('renders in en and ar with the countdown and a locked resend button', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<SmsCodeDemo lang={lang} />);
      expect(html).toContain('autoComplete="one-time-code"');
      expect(html).toContain(lang === 'ar' ? 'إعادة إرسال الرمز' : 'Resend code');
      expect(html).toContain('disabled');
      expect(html).toContain('dir="ltr"');
    }
  });
});

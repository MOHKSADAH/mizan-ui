import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import {
  CookieConsent,
  CookiePreferences,
  cookieConsentCategoriesAr,
  cookieConsentLabelsAr,
} from './cookie-consent';

test('banner renders as a non-modal labelled dialog with three equal choices in en', () => {
  const html = renderToString(<CookieConsent policyHref="https://example.com/cookies" />);
  expect(html).toContain('role="dialog"');
  expect(html).toContain('aria-modal="false"');
  for (const text of ['Accept all', 'Reject optional', 'Customize', 'Read the cookie policy']) expect(html).toContain(text);
});

test('renders in ar and hides when open is false', () => {
  const ar = renderToString(<CookieConsent categories={cookieConsentCategoriesAr} labels={cookieConsentLabelsAr} />);
  expect(ar).toContain('قبول الكل');
  expect(renderToString(<CookieConsent open={false} />)).toBe('');
});

test('preferences dialog renders nothing while closed', () => {
  expect(renderToString(<CookiePreferences open={false} onOpenChange={() => {}} onSave={() => {}} />)).toBe('');
});

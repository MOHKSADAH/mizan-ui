import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import {
  CookieConsent,
  CookiePreferences,
  cookieConsentCategoriesAr,
  cookieConsentLabelsAr,
} from './cookie-consent';

test('banner renders as a labelled region, not a dialog, with three equal choices in en', () => {
  const html = renderToString(<CookieConsent policyHref="https://example.com/cookies" />);
  expect(html).toStartWith('<section');
  expect(html).not.toContain('role="dialog"');
  const id = html.match(/aria-labelledby="([^"]+)"/)?.[1];
  expect(html).toContain(`id="${id}" class="font-medium">Cookies</p>`);
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

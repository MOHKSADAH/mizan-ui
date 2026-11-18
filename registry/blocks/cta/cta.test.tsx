import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Cta04, { demo as demo04 } from './cta-04';

test('cta-04 renders the WhatsApp button and an isolated phone number in English', () => {
  const html = renderToString(<Cta04 {...demo04.en} id="talk" />);
  expect(html).toContain('aria-labelledby="talk-heading"');
  expect(html).toContain('href="https://wa.me/966505550142?text=');
  expect(html).toContain('href="tel:+966505550142"');
  expect(html).toContain('<bdi dir="ltr"');
  expect(html).toContain('We usually reply within minutes');
});

test('cta-04 renders in Arabic', () => {
  const html = renderToString(<Cta04 {...demo04.ar} />);
  expect(html).toContain('تحدث مع فريقنا الآن');
  expect(html).toContain('(يفتح واتساب)');
  expect(html).toContain('اتصل بنا');
});

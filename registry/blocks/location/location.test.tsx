import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Location01, { demo as demo01 } from './location-01';

// Sunday 2026-12-06, 10:00 in Riyadh.
const now = new Date('2026-12-06T07:00:00Z');

test('location-01 renders the address, phone, hours, directions and WhatsApp in English', () => {
  const html = renderToString(<Location01 {...demo01.en} id="loc" now={now} />);
  expect(html).toContain('aria-labelledby="loc-heading"');
  expect(html).toContain('href="tel:+966115550187"');
  expect(html).toContain('href="https://wa.me/966505550187');
  expect(html).toContain('href="https://maps.google.com/?q=Al+Malqa+Riyadh"');
  expect(html).toContain('rel="noopener"');
  expect(html).toContain('Open now');
  expect(html).toContain('rtl:-scale-x-100');
});

test('location-01 renders in Arabic and shows a map placeholder unless a map is passed', () => {
  const html = renderToString(<Location01 {...demo01.ar} now={now} />);
  expect(html).toContain('موقع العيادة');
  expect(html).toContain('مفتوح الآن');
  expect(html).toContain('تواصل عبر واتساب');
  expect(html).toContain('size-16');
  const withMap = renderToString(<Location01 {...demo01.ar} now={now} map={<iframe title="الخريطة" src="about:blank" />} />);
  expect(withMap).toContain('<iframe');
  expect(withMap).not.toContain('size-16');
});

test('location-01 leaves out the WhatsApp button without a number', () => {
  expect(renderToString(<Location01 {...demo01.en} now={now} whatsapp={undefined} />)).not.toContain('wa.me');
});

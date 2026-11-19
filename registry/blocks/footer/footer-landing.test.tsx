import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Footer05, { demo as demo05 } from './footer-05';
import Footer06, { demo as demo06 } from './footer-06';
import Footer07, { demo as demo07 } from './footer-07';

test('footer-05 isolates the CR, VAT, licence and phone numbers and shows country codes as text', () => {
  const html = renderToString(<Footer05 {...demo05.ar} />);
  expect(html).toContain('<bdi class="tabular-nums">1010987654</bdi>');
  expect(html).toContain('<bdi class="tabular-nums">300098765400003</bdi>');
  expect(html).toContain('<bdi class="tabular-nums">61/202401</bdi>');
  expect(html).toContain('<bdi dir="ltr" class="tabular-nums">920 012 345</bdi>');
  expect(html).toContain('href="tel:920012345"');
  expect(html).toContain('href="https://wa.me/966505550142?text=');
  expect(html).toContain('>SA</span>');
  expect(html).toContain('السعودية');
  expect(html).toContain('<bdi dir="ltr" class="text-sm font-semibold">App Store</bdi>');
  expect(html.match(/<nav /g)).toHaveLength(4);
  expect(html).toContain('ترخيص رقم');
});

test('footer-05 renders in English and omits every optional row', () => {
  const html = renderToString(<Footer05 {...demo05.en} />);
  expect(html).toContain('Licensed by the Saudi Central Bank');
  expect(html).toContain('Download from');
  const bare = renderToString(
    <Footer05
      {...demo05.en}
      support={undefined}
      country={undefined}
      apps={undefined}
      legal={{ text: 'x', links: [] }}
    />,
  );
  expect(bare).not.toContain('Customer support');
  expect(bare).not.toContain('Get the app');
  expect(bare).not.toContain('Commercial registration');
});

test('footer-06 renders the wordmark for the width fit, with no letter spacing', () => {
  const ar = renderToString(<Footer06 {...demo06.ar} />);
  expect(ar).toContain('رواق');
  expect(ar).toContain('tracking-normal');
  expect(ar).not.toMatch(/tracking-(tight|tighter|wide|wider|widest)/);
  expect(ar).toContain('aria-hidden="true"');
  expect(ar.match(/<nav /g)).toHaveLength(1);
  const en = renderToString(<Footer06 {...demo06.en} />);
  expect(en).toContain('>Rewaq<');
  expect(en).toContain('aria-label="Footer"');
});

test('footer-07 joins the call to action band to the sitemap and isolates the numbers', () => {
  const html = renderToString(<Footer07 {...demo07.ar} />);
  expect(html).toContain('<strong>أصدر أول فاتورة إلكترونية</strong>');
  expect(html).toContain('href="#start"');
  expect(html).toContain('href="#demo"');
  expect(html).toContain('rtl:rotate-180');
  expect(html).toContain('<bdi class="tabular-nums">300045678900003</bdi>');
  expect(html.match(/<nav /g)).toHaveLength(3);
  const bare = renderToString(
    <Footer07 {...demo07.en} secondaryCta={undefined} description={undefined} legal={{ text: 'x', links: [] }} />,
  );
  expect(bare).not.toContain('Book a demo');
  expect(bare).not.toContain('VAT:');
});

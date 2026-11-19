import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Newsletter01, { demo } from './newsletter-01';

test('newsletter-01 renders the form, the consent line and the last three issues in Arabic', () => {
  const html = renderToString(<Newsletter01 {...demo.ar} id="news" />);
  expect(html).toContain('aria-labelledby="news-heading"');
  expect(html).toContain('type="email"');
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('href="#privacy"');
  expect(html).toContain('سياسة الخصوصية');
  expect(html.match(/<time /g)).toHaveLength(3);
  expect(html).toContain('<bdi>#128</bdi>');
  expect(html).toContain('<bdi class="tabular-nums">12,400</bdi>');
  expect(html).toContain('12 نوفمبر 2026');
});

test('newsletter-01 renders in English and omits the optional parts', () => {
  const html = renderToString(<Newsletter01 {...demo.en} eyebrow={undefined} description={undefined} readers={undefined} />);
  expect(html).toContain('November 12, 2026');
  expect(html).toContain('Subscribe');
  expect(html).not.toContain('readers get it');
  expect(html).not.toContain('Weekly newsletter');
});

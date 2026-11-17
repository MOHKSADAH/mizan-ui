import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Legal01, { demo as demo01 } from './legal-01';

test('legal-01 renders the title, anchored sections and the table of contents in English', () => {
  const html = renderToString(<Legal01 {...demo01.en} id="privacy" />);
  expect(html).toContain('<h1 id="privacy-heading"');
  expect(html).toContain('aria-labelledby="privacy-heading"');
  expect(html).toContain('id="rights"');
  expect(html).toContain('href="#rights"');
  expect(html).toContain('aria-label="On this page"');
  expect(html).toContain('lg:col-span-8');
  expect(html).toContain('Download PDF');
});

test('legal-01 renders in Arabic and hides the download button without a link', () => {
  const html = renderToString(<Legal01 {...demo01.ar} />);
  expect(html).toContain('سياسة الخصوصية');
  expect(html).toContain('في هذه الصفحة');
  expect(renderToString(<Legal01 {...demo01.ar} downloadHref={undefined} />)).not.toContain('تنزيل نسخة PDF');
});

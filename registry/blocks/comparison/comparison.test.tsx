import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Comparison01, { demo as demo01 } from './comparison-01';

test('comparison-01 renders a table with scoped headers, text for icons and a sticky first column', () => {
  const html = renderToString(<Comparison01 {...demo01.en} id="cmp" />);
  expect(html).toContain('aria-labelledby="cmp-heading"');
  expect(html).toContain('scope="col"');
  expect(html).toContain('scope="row"');
  expect(html).toContain('sticky start-0');
  expect(html).toContain('<span class="sr-only">Included</span>');
  expect(html).toContain('<span class="sr-only">Not included</span>');
  expect(html).toContain('Recommended');
  expect(html).toContain('href="#start"');
});

test('comparison-01 renders in Arabic and leaves out the button row without a cta', () => {
  const html = renderToString(<Comparison01 {...demo01.ar} />);
  expect(html).toContain('لماذا تنتقل الفرق إلى رافد');
  expect(html).toContain('متوفر');
  expect(html).toContain('غير متوفر');
  expect(html).toContain('<bdi>99 ر.س شهريًا</bdi>');
  const columns = demo01.ar.columns.map((c) => ({ ...c, cta: undefined }));
  expect(renderToString(<Comparison01 {...demo01.ar} columns={columns} />)).not.toContain('ابدأ تجربتك المجانية');
});

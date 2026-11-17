import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Faq02, { demo as demo02 } from './faq-02';

test('faq-02 renders the heading column and every question in English', () => {
  const html = renderToString(<Faq02 {...demo02.en} id="faq" />);
  expect(html).toContain('aria-labelledby="faq-heading"');
  expect(html).toContain('lg:col-span-4');
  expect(html).toContain('lg:col-span-8');
  expect(html).toContain('Can I cancel at any time?');
  expect(html).toContain('<h3');
  expect(html).toContain('aria-expanded');
  expect(html).toContain('(opens WhatsApp)');
});

test('faq-02 renders in Arabic', () => {
  const html = renderToString(<Faq02 {...demo02.ar} />);
  expect(html).toContain('الأسئلة الشائعة');
  expect(html).toContain('هل تدعم المنصة الفوترة الإلكترونية؟');
  expect(html).toContain('تحدث معنا');
});

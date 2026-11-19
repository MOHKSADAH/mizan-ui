import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Faq03, { demo as demo03 } from './faq-03';

test('faq-03 renders category tabs above an accordion of the first category in English', () => {
  const html = renderToString(<Faq03 {...demo03.en} id="faq" />);
  expect(html).toContain('aria-labelledby="faq-heading"');
  expect(html).toContain('role="tablist"');
  expect(html).toContain('aria-label="Question categories"');
  expect(html).toContain('Support');
  expect(html).toContain('Which payment methods do you accept?');
  expect(html).toContain('aria-expanded');
  expect(html).toContain('href="#contact"');
});

test('faq-03 renders in Arabic and leaves out the contact block without it', () => {
  const html = renderToString(<Faq03 {...demo03.ar} />);
  expect(html).toContain('إجابات حسب الموضوع');
  expect(html).toContain('ما طرق الدفع المتاحة؟');
  expect(html).toContain('تحدث مع فريقنا');
  const bare = renderToString(<Faq03 {...demo03.ar} contactText={undefined} contactCta={undefined} />);
  expect(bare).not.toContain('تحدث مع فريقنا');
});

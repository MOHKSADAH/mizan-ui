import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Testimonials02, { demo as demo02 } from './testimonials-02';

test('testimonials-02 renders figures with captions and rating labels in English', () => {
  const html = renderToString(<Testimonials02 {...demo02.en} id="reviews" />);
  expect(html).toContain('aria-labelledby="reviews-heading"');
  expect(html.match(/<figure/g)).toHaveLength(3);
  expect(html).toContain('<blockquote');
  expect(html).toContain('<figcaption');
  expect(html).toContain('aria-label="5 out of 5"');
  expect(html).toContain('Sara Al-Otaibi');
});

test('testimonials-02 renders in Arabic', () => {
  const html = renderToString(<Testimonials02 {...demo02.ar} />);
  expect(html).toContain('ماذا يقول عملاؤنا');
  expect(html).toContain('aria-label="4 من 5"');
});

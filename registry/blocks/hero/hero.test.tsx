import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Hero01, { demo as demo01 } from './hero-01';

test('hero-01 renders in English', () => {
  const html = renderToString(<Hero01 {...demo01.en} id="hero" />);
  expect(html).toContain('<h1 id="hero-heading"');
  expect(html).toContain('aria-labelledby="hero-heading"');
  expect(html).toContain('Run your business with clarity and ease');
  expect(html).toContain('href="https://wa.me/966505550142');
});

test('hero-01 renders in Arabic', () => {
  const html = renderToString(<Hero01 {...demo01.ar} />);
  expect(html).toContain('أدر أعمالك بكل وضوح وسهولة');
  expect(html).toContain('(يفتح واتساب)');
});

test('hero-01 uses the requested heading level', () => {
  expect(renderToString(<Hero01 {...demo01.en} headingLevel={2} />)).toContain('<h2');
});

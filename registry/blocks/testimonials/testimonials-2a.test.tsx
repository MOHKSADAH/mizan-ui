import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Testimonials01, { demo as Testimonials01Demo } from './testimonials-01';

test('testimonials-01 renders in English', () => {
  const html = renderToString(<Testimonials01 {...Testimonials01Demo.en} />);
  expect(html).toContain("We closed our books in two days");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<blockquote");
});

test('testimonials-01 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Testimonials01 {...Testimonials01Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("أصبحنا نقفل حساباتنا في يومين");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<blockquote");
});

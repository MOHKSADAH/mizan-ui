import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Testimonials01, { demo as Testimonials01Demo } from './testimonials-01';
import Testimonials03, { demo as Testimonials03Demo } from './testimonials-03';
import Testimonials04, { demo as Testimonials04Demo } from './testimonials-04';

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

test('testimonials-03 renders in English', () => {
  const html = renderToString(<Testimonials03 {...Testimonials03Demo.en} />);
  expect(html).toContain("Teams that stopped chasing spreadsheets");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("break-inside-avoid");
});

test('testimonials-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Testimonials03 {...Testimonials03Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("فرق تخلّصت من ملاحقة الجداول");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("break-inside-avoid");
});

test('testimonials-04 renders in English', () => {
  const html = renderToString(<Testimonials04 {...Testimonials04Demo.en} />);
  expect(html).toContain("What our customers say");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("aria-roledescription=\"carousel\"");
  expect(html).toContain("Previous testimonials");
});

test('testimonials-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Testimonials04 {...Testimonials04Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("ماذا يقول عملاؤنا");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("الآراء السابقة");
});

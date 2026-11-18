import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Hero04, { demo as Hero04Demo } from './hero-04';
import Hero05, { demo as Hero05Demo } from './hero-05';
import Hero06, { demo as Hero06Demo } from './hero-06';
import Hero07, { demo as Hero07Demo } from './hero-07';

test('hero-04 renders in English', () => {
  const html = renderToString(<Hero04 {...Hero04Demo.en} />);
  expect(html).toContain("Run your business with clarity");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
  expect(html).toContain("<dl");
});

test('hero-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Hero04 {...Hero04Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("أدر أعمالك بوضوح وثقة");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
  expect(html).toContain("<dl");
});

test('hero-05 renders in English', () => {
  const html = renderToString(<Hero05 {...Hero05Demo.en} />);
  expect(html).toContain("See your whole business");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
});

test('hero-05 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Hero05 {...Hero05Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("شاهد أعمالك كاملة");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
});

test('hero-06 renders in English', () => {
  const html = renderToString(<Hero06 {...Hero06Demo.en} />);
  expect(html).toContain("Find the right property");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
  expect(html).toContain("role=\"search\"");
});

test('hero-06 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Hero06 {...Hero06Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("اعثر على العقار المناسب");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
  expect(html).toContain("role=\"search\"");
});

test('hero-07 renders in English', () => {
  const html = renderToString(<Hero07 {...Hero07Demo.en} />);
  expect(html).toContain("See Rafid at work");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
  expect(html).toContain("aria-label=\"Play video: Rafid product tour\"");
});

test('hero-07 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Hero07 {...Hero07Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("شاهد رافد في العمل");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(1);
  expect(html).toContain("aria-label=\"تشغيل الفيديو: جولة في منتج رافد\"");
});

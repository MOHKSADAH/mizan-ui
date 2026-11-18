import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Hero04, { demo as Hero04Demo } from './hero-04';
import Hero05, { demo as Hero05Demo } from './hero-05';

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

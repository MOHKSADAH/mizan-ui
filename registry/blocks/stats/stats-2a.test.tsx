import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Stats02, { demo as Stats02Demo } from './stats-02';
import Stats03, { demo as Stats03Demo } from './stats-03';
import Stats04, { demo as Stats04Demo } from './stats-04';

test('stats-02 renders in English', () => {
  const html = renderToString(<Stats02 {...Stats02Demo.en} />);
  expect(html).toContain("Numbers we are proud of");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("border-s");
});

test('stats-02 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Stats02 {...Stats02Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("أرقام نفخر بها");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("border-s");
});

test('stats-03 renders in English', () => {
  const html = renderToString(<Stats03 {...Stats03Demo.en} />);
  expect(html).toContain("This quarter at a glance");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("+12%");
});

test('stats-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Stats03 {...Stats03Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("نظرة على هذا الربع");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("+12%");
});

test('stats-04 renders in English', () => {
  const html = renderToString(<Stats04 {...Stats04Demo.en} />);
  expect(html).toContain("Companies on the platform");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("md:grid-flow-col");
});

test('stats-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Stats04 {...Stats04Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("شركة تعمل على المنصة");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("md:grid-flow-col");
});

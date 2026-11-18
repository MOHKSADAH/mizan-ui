import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Features02, { demo as Features02Demo } from './features-02';
import Features03, { demo as Features03Demo } from './features-03';
import Features04, { demo as Features04Demo } from './features-04';
import Features05, { demo as Features05Demo } from './features-05';
import Features06, { demo as Features06Demo } from './features-06';

test('features-02 renders in English', () => {
  const html = renderToString(<Features02 {...Features02Demo.en} />);
  expect(html).toContain("Stock you can trust");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("order-last");
});

test('features-02 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Features02 {...Features02Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("مخزون تثق بأرقامه");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("order-last");
});

test('features-03 renders in English', () => {
  const html = renderToString(<Features03 {...Features03Demo.en} />);
  expect(html).toContain("One platform, every back-office task");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("lg:col-span-8");
});

test('features-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Features03 {...Features03Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("منصة واحدة لكل مهام الإدارة الخلفية");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("lg:col-span-8");
});

test('features-04 renders in English', () => {
  const html = renderToString(<Features04 {...Features04Demo.en} />);
  expect(html).toContain("Everything a growing company needs");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("lg:sticky");
});

test('features-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Features04 {...Features04Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("كل ما تحتاجه شركة متنامية");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("lg:sticky");
});

test('features-05 renders in English', () => {
  const html = renderToString(<Features05 {...Features05Demo.en} />);
  expect(html).toContain("Pick the module that fits your day");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("role=\"tablist\"");
});

test('features-05 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Features05 {...Features05Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("اختر الوحدة التي تناسب يومك");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("role=\"tablist\"");
});

test('features-06 renders in English', () => {
  const html = renderToString(<Features06 {...Features06Demo.en} />);
  expect(html).toContain("Up and running in four steps");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<ol");
});

test('features-06 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Features06 {...Features06Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("ابدأ العمل في أربع خطوات");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<ol");
});

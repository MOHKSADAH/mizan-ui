import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Pricing02, { demo as Pricing02Demo } from './pricing-02';
import Pricing03, { demo as Pricing03Demo } from './pricing-03';
import Pricing04, { demo as Pricing04Demo } from './pricing-04';
import Pricing05, { demo as Pricing05Demo } from './pricing-05';

test('pricing-02 renders in English', () => {
  const html = renderToString(<Pricing02 {...Pricing02Demo.en} />);
  expect(html).toContain("Find the plan that fits your team");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("role=\"region\"");
  expect(html).toContain("scope=\"row\"");
});

test('pricing-02 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Pricing02 {...Pricing02Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("اعثر على الباقة التي تناسب فريقك");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("role=\"region\"");
});

test('pricing-03 renders in English', () => {
  const html = renderToString(<Pricing03 {...Pricing03Demo.en} />);
  expect(html).toContain("A single package for your clinic");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("Clinic package");
});

test('pricing-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Pricing03 {...Pricing03Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("باقة واحدة لعيادتك");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("باقة العيادة");
});

test('pricing-04 renders in English', () => {
  const html = renderToString(<Pricing04 {...Pricing04Demo.en} />);
  expect(html).toContain("Plans with clear VAT");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("aria-live=\"polite\"");
});

test('pricing-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Pricing04 {...Pricing04Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("باقات بضريبة واضحة");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("aria-live=\"polite\"");
});

test('pricing-05 renders in English', () => {
  const html = renderToString(<Pricing05 {...Pricing05Demo.en} />);
  expect(html).toContain("Packages for every stage");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("Starting from");
});

test('pricing-05 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Pricing05 {...Pricing05Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("باقات لكل مرحلة");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("ابتداءً من");
});

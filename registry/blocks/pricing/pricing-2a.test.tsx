import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Pricing02, { demo as Pricing02Demo } from './pricing-02';

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

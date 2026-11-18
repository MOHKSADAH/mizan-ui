import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Features02, { demo as Features02Demo } from './features-02';

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

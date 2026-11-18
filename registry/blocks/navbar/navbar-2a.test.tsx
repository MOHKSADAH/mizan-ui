import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Navbar02, { demo as Navbar02Demo } from './navbar-02';
import Navbar03, { demo as Navbar03Demo } from './navbar-03';

test('navbar-02 renders in English', () => {
  const html = renderToString(<Navbar02 {...Navbar02Demo.en} />);
  expect(html).toContain("Rafid");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<header");
  expect(html).toContain("aria-label=\"Primary\"");
});

test('navbar-02 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Navbar02 {...Navbar02Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("رافد");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("aria-label=\"فتح القائمة\"");
});

test('navbar-03 renders in English', () => {
  const html = renderToString(<Navbar03 {...Navbar03Demo.en} />);
  expect(html).toContain("Products");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<header");
  expect(html).toContain("aria-label=\"Primary\"");
});

test('navbar-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Navbar03 {...Navbar03Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("المنتجات");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("aria-label=\"فتح القائمة\"");
});

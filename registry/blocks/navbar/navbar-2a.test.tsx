import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Navbar02, { demo as Navbar02Demo } from './navbar-02';

test('navbar-02 renders in English', () => {
  const html = renderToString(<Navbar02 {...Navbar02Demo.en} />);
  expect(html).toContain("Rafid");
  expect(html.match(/<h1[s>]/g)?.length ?? 0).toBe(0);
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
  expect(html.match(/<h1[s>]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("aria-label=\"فتح القائمة\"");
});

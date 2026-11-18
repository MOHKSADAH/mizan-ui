import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import LogoCloud02, { demo as LogoCloud02Demo } from './logo-cloud-02';
import LogoCloud03, { demo as LogoCloud03Demo, labelsAr } from './logo-cloud-03';
import LogoCloud04, { demo as LogoCloud04Demo } from './logo-cloud-04';

test('logo-cloud-02 renders in English', () => {
  const html = renderToString(<LogoCloud02 {...LogoCloud02Demo.en} />);
  expect(html).toContain("Trusted by growing companies");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("Haya");
});

test('logo-cloud-02 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <LogoCloud02 {...LogoCloud02Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("شركات متنامية تثق بنا");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("هيا");
});

test('logo-cloud-03 renders in English', () => {
  const html = renderToString(<LogoCloud03 {...LogoCloud03Demo.en} />);
  expect(html).toContain("Trusted by growing companies");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("mizan-marquee");
  expect(html).toContain("aria-hidden=\"true\"");
});

test('logo-cloud-03 repeats image logos as images in the loop copy', () => {
  const logos = [{ name: 'Najd Trading', src: '/examples/najd.svg' }];
  const html = renderToString(<LogoCloud03 title="Trusted" logos={logos} />);
  expect(html.match(/<img /g)).toHaveLength(2);
});

test('logo-cloud-03 has a pause button for the moving row', () => {
  const html = renderToString(<LogoCloud03 {...LogoCloud03Demo.en} />);
  expect(html).toMatch(/<button[^>]*type="button"[^>]*>.*Pause logos<\/button>/);
  const ar = renderToString(<LogoCloud03 {...LogoCloud03Demo.ar} labels={labelsAr} />);
  expect(ar).toContain('إيقاف الشعارات');
});

test('logo-cloud-03 sets direction in css and pads each list so the loop has no jump', () => {
  const html = renderToString(<LogoCloud03 {...LogoCloud03Demo.en} />);
  expect(html).toContain('rtl:[--mizan-dir:-1]');
  expect(html).not.toContain('--mizan-dir:1;');
  expect(html.match(/<ul[^>]*\bpe-10\b/g)).toHaveLength(2);
});

test('logo-cloud-03 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <LogoCloud03 {...LogoCloud03Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("شركات متنامية تثق بنا");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("mizan-marquee");
});

test('logo-cloud-04 renders in English', () => {
  const html = renderToString(<LogoCloud04 {...LogoCloud04Demo.en} />);
  expect(html).toContain("Trusted by growing companies");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("lg:col-span-2");
});

test('logo-cloud-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <LogoCloud04 {...LogoCloud04Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("شركات متنامية تثق بنا");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("lg:col-span-2");
});

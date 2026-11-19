import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import CaseStack01, { demo } from './case-stack-01';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('case-stack-01 renders every case in full with a growing sticky offset', () => {
  const html = renderToString(<CaseStack01 {...demo.en} />);
  expect(html.match(/<li /g)).toHaveLength(demo.en.items.length);
  expect(html.match(/<h3 /g)).toHaveLength(demo.en.items.length);
  for (const item of demo.en.items) {
    expect(html).toContain(item.title);
    expect(html).toContain(item.summary);
  }
  const offsets = [...html.matchAll(/--case-stack-top, 5rem\) \+ (\d+)rem/g)].map((m) => Number(m[1]));
  expect(offsets).toEqual([0, 3, 6, 9]);
  expect(h1(html)).toBe(0);
});

test('case-stack-01 pins only on wide screens with motion allowed, so it reads as a plain list otherwise', () => {
  const html = renderToString(<CaseStack01 {...demo.en} />);
  expect(html).toContain('md:motion-safe:sticky');
  expect(html).not.toMatch(/class="[^"]*(?<![:\w-])sticky/);
});

test('case-stack-01 shows the placeholder without media and the image with it', () => {
  expect(renderToString(<CaseStack01 {...demo.en} />)).not.toContain('<img');
  const items = demo.en.items.map((item, i) => (i === 0 ? { ...item, media: { src: 'https://example.com/a.jpg', alt: 'Dashboard', width: 800, height: 600 } } : item));
  expect(renderToString(<CaseStack01 {...demo.en} items={items} />)).toContain('alt="Dashboard"');
});

test('case-stack-01 renders in Arabic with LTR stat values and a client-named link', () => {
  const html = rtl(<CaseStack01 {...demo.ar} />);
  expect(html).toContain('نتائج حقيقية من متاجر وأعمال سعودية');
  expect(html).toContain('<bdi dir="ltr">+38%</bdi>');
  expect(html).toContain('مطاعم سدرة<!-- -->)</span>');
  expect(html).toContain('rtl:rotate-180');
  expect(h1(html)).toBe(0);
});

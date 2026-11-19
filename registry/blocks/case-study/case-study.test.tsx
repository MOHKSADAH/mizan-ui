import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import CaseStudy01, { demo } from './case-study-01';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('case-study-01 shows the client, the results as a definition list and the link', () => {
  const html = renderToString(<CaseStudy01 {...demo.en} />);
  expect(html).toContain('Al Rawabi Real Estate, Riyadh');
  expect(html.match(/<dt/g)?.length).toBe(demo.en.results.length);
  expect(html).toContain('<bdi>100%</bdi>');
  expect(html).toContain('href="#al-rawabi"');
  expect(h1(html)).toBe(0);
});

test('case-study-01 uses the placeholder without a src and the photo with one', () => {
  expect(renderToString(<CaseStudy01 {...demo.en} />)).not.toContain('<img');
  expect(renderToString(<CaseStudy01 {...demo.en} image={{ ...demo.en.image, src: '/c.jpg' }} />)).toContain('src="/c.jpg"');
});

test('case-study-01 renders in Arabic with Western digits and a mirrored arrow', () => {
  const html = rtl(<CaseStudy01 {...demo.ar} />);
  expect(html).toContain('اقرأ دراسة الحالة');
  expect(html).toContain('<bdi>18</bdi>');
  expect(html).toContain('rtl:rotate-180');
  expect(html).not.toMatch(/[٠-٩]/);
});

test('case-study-01 leaves out the link when none is given', () => {
  expect(renderToString(<CaseStudy01 {...demo.en} link={undefined} />)).not.toContain('Read the case study');
});

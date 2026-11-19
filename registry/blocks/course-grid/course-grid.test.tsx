import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import CourseGrid01, { demo, labelsAr } from './course-grid-01';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('course-grid-01 shows duration, level, start date and a SAR price', () => {
  const html = renderToString(<CourseGrid01 {...demo.en} />);
  expect(html.match(/<article/g)?.length).toBe(demo.en.courses.length);
  expect(html).toContain('12 weeks');
  expect(html).toContain('Beginner');
  expect(html).toContain('Starts');
  expect(html).toContain('SAR');
  expect(h1(html)).toBe(0);
});

test('course-grid-01 shows Free instead of a price for a free course', () => {
  const html = renderToString(<CourseGrid01 {...demo.en} />);
  expect(html).toContain('>Free<');
  expect(html.match(/SAR/g)?.length).toBe(demo.en.courses.filter((c) => c.price > 0).length);
});

test('course-grid-01 renders in Arabic with Western digits and Arabic plural forms', () => {
  const html = rtl(<CourseGrid01 {...demo.ar} />);
  expect(html).toContain('معسكر تدريبي');
  expect(html).toContain('<bdi>12 أسبوعًا</bdi>');
  expect(html).toContain('>مجاني<');
  expect(html).not.toMatch(/[٠-٩]/);
  expect([1, 2, 3, 12].map((n) => labelsAr.weeks(n))).toEqual(['أسبوع واحد', 'أسبوعان', '3 أسابيع', '12 أسبوعًا']);
});

test('course-grid-01 uses the placeholder without a src and the photo with one', () => {
  expect(renderToString(<CourseGrid01 {...demo.en} />)).not.toContain('<img');
  const courses = demo.en.courses.map((c) => ({ ...c, image: { ...c.image, src: '/c.jpg' } }));
  expect(renderToString(<CourseGrid01 {...demo.en} courses={courses} />)).toContain('src="/c.jpg"');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import ProjectGrid01, { demo as demo01, labelsAr } from './project-grid-01';
import ProjectGrid02, { demo as demo02 } from './project-grid-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('project-grid-01 renders a card with status, city and units per project', () => {
  const html = renderToString(<ProjectGrid01 {...demo01.en} />);
  expect(html.match(/<article/g)?.length).toBe(demo01.en.projects.length);
  expect(html).toContain('Under construction');
  expect(html).toContain('120 units');
  expect(html).toContain('<h3');
  expect(h1(html)).toBe(0);
});

test('project-grid-01 shows the placeholder without a src and the photo with one', () => {
  expect(renderToString(<ProjectGrid01 {...demo01.en} />)).not.toContain('<img');
  const projects = demo01.en.projects.map((p) => ({ ...p, image: { ...p.image, src: '/p.jpg' } }));
  expect(renderToString(<ProjectGrid01 {...demo01.en} projects={projects} />)).toContain('src="/p.jpg"');
});

test('project-grid-01 renders in Arabic with Western digits and Arabic plural forms', () => {
  const html = rtl(<ProjectGrid01 {...demo01.ar} />);
  expect(html).toContain('قيد الإنشاء');
  expect(html).toContain('<bdi>120 وحدة</bdi>');
  expect(html).not.toMatch(/[٠-٩]/);
  expect([1, 2, 5, 11].map((n) => labelsAr.units(n))).toEqual(['وحدة واحدة', 'وحدتان', '5 وحدات', '11 وحدة']);
});

test('project-grid-02 lists every project and a filter row per city and type', () => {
  const html = renderToString(<ProjectGrid02 {...demo02.en} />);
  expect(html.match(/<article/g)?.length).toBe(demo02.en.projects.length);
  expect(html.match(/data-slot="toggle-group"/g)?.length).toBe(2);
  expect(html).toContain('6 projects');
  expect(h1(html)).toBe(0);
});

test('project-grid-02 renders in Arabic', () => {
  const html = rtl(<ProjectGrid02 {...demo02.ar} />);
  expect(html).toContain('اعثر على مشروعك في مدينتك');
  expect(html).toContain('الرياض');
  expect(html).not.toMatch(/[٠-٩]/);
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Team01, { demo as demo01 } from './team-01';
import Team02, { demo as demo02 } from './team-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('team-01 shows name, role, bio and labelled social links', () => {
  const html = renderToString(<Team01 {...demo01.en} />);
  expect(html).toContain('Faisal Al-Otaibi');
  expect(html).toContain('Eleven years building');
  expect(html).toContain('aria-label="Faisal Al-Otaibi on LinkedIn"');
  expect(h1(html)).toBe(0);
});

test('team-01 hides the bio and the social list when they are missing', () => {
  const people = demo01.en.people.map(({ id, name, role, photo }) => ({ id, name, role, photo }));
  const html = renderToString(<Team01 {...demo01.en} people={people} />);
  expect(html).not.toContain('Eleven years building');
  expect(html).not.toContain('aria-label=');
});

test('team-01 renders in Arabic with Arabic network names', () => {
  const html = rtl(<Team01 {...demo01.ar} />);
  expect(html).toContain('فيصل العتيبي');
  expect(html).toContain('aria-label="فيصل العتيبي على لينكدإن"');
});

test('team-02 renders a compact row per person with a placeholder avatar', () => {
  const html = renderToString(<Team02 {...demo02.en} />);
  expect(html).toContain('Khalid Al-Shehri');
  expect(html.match(/data-slot="avatar"/g)?.length).toBe(demo02.en.people.length);
  expect(h1(html)).toBe(0);
});

test('team-02 renders in Arabic', () => {
  const html = rtl(<Team02 {...demo02.ar} />);
  expect(html).toContain('الأشخاص خلف مشروعك');
  expect(html).toContain('aria-label="ريم القحطاني على إنستغرام"');
});

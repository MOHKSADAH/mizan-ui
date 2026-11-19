import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import RealEstatePage01, { demo as re01 } from './real-estate-page/real-estate-page-01';
import TourismPage01, { demo as tr01 } from './tourism-page/tourism-page-01';

const navIds = (links: { href: string }[]) => links.map((l) => l.href.slice(1));

test('real-estate-page-01 has every section the navbar links point to and one main landmark', () => {
  const html = renderToString(<RealEstatePage01 {...re01.en} />);
  expect(html).toContain('<main id="main-content"');
  for (const id of navIds(re01.en.navbar.links)) expect(html).toContain(`id="${id}"`);
  expect(html).toContain('id="visit"');
  expect(html).toContain('Villas in Diriyah and north Riyadh');
});

test('real-estate-page-01 renders Arabic brand copy with a placeholder for every image', () => {
  const html = renderToString(<RealEstatePage01 {...re01.ar} />);
  expect(html).toContain('فلل الدرعية وشمال الرياض، وسعر المتر معلن');
  expect(html).toContain('واحة الدرعية');
  expect(html).toContain('مرخّصة من الهيئة العامة للعقار');
  expect(html).not.toContain('<img');
});

test('tourism-page-01 has every section the navbar links point to', () => {
  const html = renderToString(<TourismPage01 {...tr01.en} />);
  expect(html).toContain('<main id="main-content"');
  for (const id of navIds(tr01.en.navbar.links)) expect(html).toContain(`id="${id}"`);
  expect(html).toContain('Sleep in a mud-brick house');
  expect(html).toContain('Next date');
});

test('tourism-page-01 renders Arabic with experience durations in hours', () => {
  const html = renderToString(<TourismPage01 {...tr01.ar} />);
  expect(html).toContain('نم في بيت طيني، واستيقظ على واحة العُلا');
  expect(html).toContain('3 ساعات');
  expect(html).toContain('أقرب موعد');
  expect(html).not.toContain('<img');
});


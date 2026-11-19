import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ClinicPage01, { demo as clinic } from './clinic-page/clinic-page-01';
import EducationPage01, { demo as education } from './education-page/education-page-01';
import RestaurantPage01, { demo as restaurant } from './restaurant-page/restaurant-page-01';

type Lang = 'en' | 'ar';
const pages = [
  {
    name: 'restaurant-page-01',
    render: (lang: Lang) => renderToString(<RestaurantPage01 {...restaurant[lang]} />),
    links: (lang: Lang) => restaurant[lang].navbar.links,
  },
  {
    name: 'clinic-page-01',
    render: (lang: Lang) => renderToString(<ClinicPage01 {...clinic[lang]} />),
    links: (lang: Lang) => clinic[lang].navbar.links,
  },
  {
    name: 'education-page-01',
    render: (lang: Lang) => renderToString(<EducationPage01 {...education[lang]} />),
    links: (lang: Lang) => education[lang].navbar.links,
  },
];

for (const { name, render, links } of pages) {
  for (const lang of ['en', 'ar'] as const) {
    test(`${name} (${lang}) has a main landmark, one h1 and an id for every navbar link`, () => {
      const html = render(lang);
      expect(html).toContain('<main id="main-content"');
      expect(html.match(/<h1[ >]/g)).toHaveLength(1);
      for (const link of links(lang)) expect(html).toContain(`id="${link.href.slice(1)}"`);
    });

    test(`${name} (${lang}) shows the image placeholder in every image slot`, () => {
      const html = render(lang);
      expect(html).not.toContain('<img');
      expect(html).toContain('bg-muted');
    });
  }
}

test('restaurant-page-01 carries the cafe copy through the sections in both languages', () => {
  const en = renderToString(<RestaurantPage01 {...restaurant.en} />);
  for (const text of ['Coffee the way Riyadh likes it', 'The Rakwa menu', 'Order before you arrive', 'Al Malqa']) {
    expect(en).toContain(text);
  }
  const ar = renderToString(<RestaurantPage01 {...restaurant.ar} />);
  expect(ar).toContain('قهوة على ذوق الرياض');
  expect(ar).toContain('قائمة ركوة');
  expect(ar).toContain('اطلب قبل أن تصل');
});

test('restaurant-page-01 closes on Friday for the prayer: two shifts on Friday, one on the other days', () => {
  const week = restaurant.ar.location.hours.week;
  expect(week[5]).toHaveLength(2);
  expect([0, 1, 2, 3, 4, 6].every((d) => week[d].length === 1)).toBe(true);
});

test('clinic-page-01 books through the booking block and ends with the licence line', () => {
  const en = renderToString(<ClinicPage01 {...clinic.en} />);
  expect(en).toContain('Book your appointment in a minute');
  expect(en).toContain('Dr. Hind Al-Ghamdi');
  expect(en).toContain('Before you visit');
  expect(en).toContain('licensed by the Ministry of Health');
  const ar = renderToString(<ClinicPage01 {...clinic.ar} />);
  expect(ar).toContain('طبيب يعرف عائلتك');
  expect(ar).toContain('احجز موعدك في دقيقة');
  expect(ar).toContain('مرخّصة من وزارة الصحة');
});

test('clinic-page-01 relabels the other-customers list of the quote block for patients', () => {
  expect(renderToString(<ClinicPage01 {...clinic.ar} />)).toContain('عائلات أخرى تراجعنا');
  expect(renderToString(<ClinicPage01 {...clinic.en} />)).toContain('Other families who visit us');
});

test('education-page-01 puts the partner strip directly under the hero and ends on the footer call', () => {
  const en = renderToString(<EducationPage01 {...education.en} />);
  expect(en.indexOf('Marfa Tech')).toBeGreaterThan(en.indexOf('From your first line of code'));
  expect(en.indexOf('Marfa Tech')).toBeLessThan(en.indexOf('We learn by building'));
  expect(en).toContain('Full-stack web development');
  expect(en).toContain('Take the first step this month');
  const ar = renderToString(<EducationPage01 {...education.ar} />);
  expect(ar).toContain('من أول سطر برمجي إلى أول وظيفة');
  expect(ar).toContain('تطوير الويب المتكامل');
  expect(ar).toContain('ابدأ أول خطوة هذا الشهر');
});

test('the three pages use different section sequences', () => {
  const sequences = pages.map(({ render }) =>
    [...render('en').matchAll(/<section[^>]*id="([^"]+)"/g)].map((m) => m[1]).join('|'),
  );
  expect(new Set(sequences).size).toBe(3);
});

test('footer link lists have unique hrefs, because the footer blocks key each link by href', () => {
  for (const demo of [restaurant, clinic, education]) {
    for (const lang of ['en', 'ar'] as const) {
      for (const column of demo[lang].footer.columns) {
        const hrefs = column.links.map((link) => link.href);
        expect(new Set(hrefs).size).toBe(hrefs.length);
      }
    }
  }
});

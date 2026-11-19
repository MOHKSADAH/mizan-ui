import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Testimonials05, { demo as Testimonials05Demo } from './testimonials-05';

test('testimonials-05 shows the quote with name, role, company and city', () => {
  const html = renderToString(<Testimonials05 {...Testimonials05Demo.en} />);
  expect(html).toContain('<blockquote');
  for (const text of ['Sara Al-Otaibi', 'Finance Director', 'Najd Trading', 'Riyadh']) expect(html).toContain(text);
  expect(html).toContain('Also growing with us');
  expect(html.match(/<li/g)?.length).toBe(Testimonials05Demo.en.others?.length);
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
});

test('testimonials-05 renders in Arabic with the city and the others row', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Testimonials05 {...Testimonials05Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('سارة العتيبي');
  expect(html).toContain('الرياض');
  expect(html).toContain('ينمون معنا أيضًا');
});

test('testimonials-05 uses the photo when given and an initial otherwise', () => {
  const photo = { src: '/p.jpg', alt: '', width: 96, height: 96 };
  const withPhoto = renderToString(<Testimonials05 item={{ ...Testimonials05Demo.en.item, photo }} />);
  expect(withPhoto).toContain('src="/p.jpg"');
  const without = renderToString(<Testimonials05 item={Testimonials05Demo.en.item} />);
  expect(without).not.toContain('<img');
  expect(without).not.toContain('Also growing with us');
});

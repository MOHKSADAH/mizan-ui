import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Navbar01, { demo as demo01 } from './navbar-01';
import Navbar04, { demo as demo04 } from './navbar-04';

test('navbar-01 renders in English', () => {
  const html = renderToString(<Navbar01 {...demo01.en} />);
  expect(html).toContain('<header');
  expect(html).toContain('Rafid');
  expect(html).toContain('aria-label="Primary"');
  expect(html).toContain('aria-current="page"');
  expect(html).toContain('Skip to content');
});

test('navbar-01 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Navbar01 {...demo01.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('رافد');
  expect(html).toContain('aria-label="فتح القائمة"');
  expect(html).toContain('aria-label="التنقل الرئيسي"');
});

test('navbar-04 renders the utility bar in English', () => {
  const html = renderToString(<Navbar04 {...demo04.en} />);
  expect(html).toContain('<bdi dir="ltr"');
  expect(html).toContain('+966 11 555 0142');
  expect(html).toContain('href="tel:+966115550142"');
  expect(html).toContain('(opens WhatsApp)');
});

test('navbar-04 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Navbar04 {...demo04.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('تواصل معنا');
  expect(html).toContain('(يفتح واتساب)');
});

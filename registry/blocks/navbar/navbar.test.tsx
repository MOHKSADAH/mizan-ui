import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Navbar01, { demo as demo01 } from './navbar-01';

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

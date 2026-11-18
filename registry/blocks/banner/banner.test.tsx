import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Banner01, { demo as demo01 } from './banner-01';

test('banner-01 renders a labelled region with a dismiss button in English', () => {
  const html = renderToString(<Banner01 {...demo01.en} />);
  expect(html).toContain('role="region"');
  expect(html).toContain('aria-label="Announcement"');
  expect(html).not.toContain('role="alert"');
  expect(html).toContain('Free shipping on every order this week');
  expect(html).toContain('aria-label="Dismiss announcement"');
});

test('banner-01 renders in Arabic and hides the dismiss button when not dismissible', () => {
  expect(renderToString(<Banner01 {...demo01.ar} />)).toContain('شحن مجاني على جميع الطلبات هذا الأسبوع');
  expect(renderToString(<Banner01 {...demo01.ar} dismissible={false} />)).not.toContain('إغلاق الإعلان');
});

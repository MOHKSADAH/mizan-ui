import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AppDownload01, { demo as demo01 } from './app-download-01';

test('app-download-01 renders a labelled QR code, store links and the rating in English', () => {
  const html = renderToString(<AppDownload01 {...demo01.en} id="app" />);
  expect(html).toContain('aria-labelledby="app-heading"');
  expect(html).toContain('role="img"');
  expect(html).toContain('aria-label="QR code to download the app"');
  expect(html).toContain('href="#app-store"');
  expect(html).toContain('Google Play');
  expect(html).toContain('Rated 4.8 out of 5');
  expect(html).toContain('12,400 ratings');
});

test('app-download-01 renders in Arabic and leaves out the store buttons and rating without them', () => {
  const html = renderToString(<AppDownload01 {...demo01.ar} />);
  expect(html).toContain('خذ رافد معك أينما كنت');
  expect(html).toContain('رمز QR لتحميل التطبيق');
  expect(html).toContain('12,400 تقييم');
  const bare = renderToString(<AppDownload01 {...demo01.ar} appStore={undefined} googlePlay={undefined} rating={undefined} />);
  expect(bare).not.toContain('App Store');
  expect(bare).not.toContain('تقييم');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { BackToTop, backToTopLabelsAr } from './back-to-top';

test('renders nothing on the server in en and ar, so it never flashes before scrolling', () => {
  expect(renderToString(<BackToTop />)).toBe('');
  expect(renderToString(<BackToTop labels={backToTopLabelsAr} />)).toBe('');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { CopyButton, copyButtonLabelsAr } from './copy-button';
import { ShareButton, shareButtonLabelsAr } from './share-button';

test('copy button renders in en and ar with a live region', () => {
  const en = renderToString(<CopyButton value="SA0380000000608010167519" />);
  expect(en).toContain('Copy');
  expect(en).toContain('role="status"');
  const ar = renderToString(<CopyButton value="SA0380000000608010167519" labels={copyButtonLabelsAr} />);
  expect(ar).toContain('نسخ');
});

test('share button renders the fallback trigger on the server in en and ar', () => {
  const en = renderToString(<ShareButton url="https://example.com" title="Store" />);
  expect(en).toContain('Share');
  expect(en).toContain('aria-haspopup="dialog"');
  const ar = renderToString(<ShareButton url="https://example.com" labels={shareButtonLabelsAr} />);
  expect(ar).toContain('مشاركة');
});

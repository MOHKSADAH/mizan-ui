import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { QrCode } from './qr-code';

test('renders in en and ar without mirroring', () => {
  for (const label of ['Menu link', 'رابط القائمة']) {
    const html = renderToString(<QrCode value="https://example.com/menu" label={label} />);
    expect(html).toContain(`aria-label="${label}"`);
    expect(html).toContain('dir="ltr"');
    expect(html).toContain('currentColor');
    expect(html).toContain('bg-white text-black');
    expect(html).not.toContain('bg-card');
  }
});

test('logo slot renders and the same value gives the same path', () => {
  const a = renderToString(<QrCode value="abc" label="x" logo={<span>L</span>} />);
  expect(a).toContain('data-slot="qr-code-logo"');
  expect(a).not.toContain('bg-card');
  const path = (s: string) => s.match(/ d="([^"]+)"/)?.[1];
  expect(path(renderToString(<QrCode value="abc" label="x" ecc="H" />))).toBe(path(a));
});

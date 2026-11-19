import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Gallery01, { demo as demo01 } from './gallery-01';
import Gallery02, { demo as demo02 } from './gallery-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;
const withSrc = <T extends { alt: string }>(photos: T[]) => photos.map((p, i) => ({ ...p, src: `/g${i}.jpg` }));

test('gallery-01 shows one placeholder tile per photo when photos have no src', () => {
  const html = renderToString(<Gallery01 {...demo01.en} />);
  expect(html.match(/<li/g)?.length).toBe(demo01.en.photos.length);
  expect(html).not.toContain('<img');
  expect(html).not.toContain('data-slot="image-lightbox"');
  expect(h1(html)).toBe(0);
});

test('gallery-01 opens real photos in the image lightbox', () => {
  const html = renderToString(<Gallery01 {...demo01.en} photos={withSrc(demo01.en.photos)} />);
  expect(html).toContain('data-slot="image-lightbox"');
  expect(html.match(/aria-haspopup="dialog"/g)?.length).toBe(demo01.en.photos.length);
});

test('gallery-01 renders in Arabic', () => {
  const html = rtl(<Gallery01 {...demo01.ar} />);
  expect(html).toContain('لقطات من مواقعنا');
  expect(html).not.toMatch(/[٠-٩]/);
});

test('gallery-02 has an All tab plus one tab per category', () => {
  const html = renderToString(<Gallery02 {...demo02.en} />);
  expect(html.match(/role="tab"/g)?.length).toBe(demo02.en.categories.length + 1);
  expect(html).toContain('>All<');
  expect(html.match(/<li/g)?.length).toBe(demo02.en.photos.length);
  expect(h1(html)).toBe(0);
});

test('gallery-02 opens real photos in the image lightbox', () => {
  const html = renderToString(<Gallery02 {...demo02.en} photos={withSrc(demo02.en.photos)} />);
  expect(html).toContain('data-slot="image-lightbox"');
});

test('gallery-02 renders in Arabic', () => {
  const html = rtl(<Gallery02 {...demo02.ar} />);
  expect(html).toContain('أعمالنا حسب التصنيف');
  expect(html).toContain('>الكل<');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import CategoryGrid01, { demo as demo01, labelsAr } from './category-grid-01';
import CategoryGrid02, { demo as demo02 } from './category-grid-02';

test('category-grid-01 renders linked tiles with a name and an item count', () => {
  const html = renderToString(<CategoryGrid01 {...demo01.en} />);
  expect(html).toContain('Shop by category');
  expect(html).toContain('href="#fragrance"');
  expect(html).toContain('86 items');
  expect(html).toContain('col-span-2 md:row-span-2');
});

test('category-grid-01 renders in Arabic with plural counts', () => {
  const html = renderToString(<CategoryGrid01 {...demo01.ar} />);
  expect(html).toContain('العطور والعود');
  expect(html).toContain('86 منتجًا');
  expect(labelsAr.items(3)).toBe('3 منتجات');
});

test('category-grid-02 renders a named nav with the current category', () => {
  const html = renderToString(<CategoryGrid02 {...demo02.en} />);
  expect(html).toContain('aria-label="Product categories"');
  expect(html).toContain('aria-current="page"');
  expect(html).toContain('Fragrance');
});

test('category-grid-02 renders in Arabic', () => {
  const html = renderToString(<CategoryGrid02 {...demo02.ar} />);
  expect(html).toContain('أقسام المتجر');
  expect(html).toContain('الإلكترونيات');
});

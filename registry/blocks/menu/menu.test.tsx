import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Menu01, { demo as demo01 } from './menu-01';

test('menu-01 renders category tabs, the first category and text tags in English', () => {
  const html = renderToString(<Menu01 {...demo01.en} id="menu" />);
  expect(html).toContain('aria-labelledby="menu-heading"');
  expect(html).toContain('role="tablist"');
  expect(html).toContain('aria-label="Menu categories"');
  expect(html).toContain('Breakfast');
  expect(html).toContain('V60 filter');
  expect(html).toContain('>New</span>');
  expect(html).toContain('22 Saudi riyals');
});

test('menu-01 renders in Arabic and draws the image slot only when asked', () => {
  const html = renderToString(<Menu01 {...demo01.ar} />);
  expect(html).toContain('قهوة ومعجنات وفطور');
  expect(html).toContain('ديرتي لاتيه');
  expect(html).toContain('>جديد</span>');
  expect(html).toContain('size-20');
  expect(renderToString(<Menu01 {...demo01.ar} images={false} />)).not.toContain('size-20');
});

test('menu-01 shows an item photo when it has one', () => {
  const categories = [
    { id: 'c', label: 'Coffee', items: [{ id: 'a', name: 'Latte', price: 20, image: { src: '/latte.jpg', alt: 'Latte', width: 80, height: 80 } }] },
  ];
  const html = renderToString(<Menu01 title="Menu" categories={categories} images />);
  expect(html).toContain('src="/latte.jpg"');
});

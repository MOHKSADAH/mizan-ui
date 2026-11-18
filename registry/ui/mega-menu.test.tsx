import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { MegaMenu, megaMenuLabelsAr } from './mega-menu';

const items = [
  {
    label: 'Shop',
    columns: [{ title: 'Men', links: [{ label: 'Shirts', href: 'https://example.com/shirts' }] }],
    featured: <p>New season</p>,
  },
  { label: 'Sale', href: 'https://example.com/sale' },
];

test('renders the desktop menu and the mobile accordion in en', () => {
  const html = renderToString(<MegaMenu items={items} />);
  expect(html).toContain('aria-label="Main"');
  expect(html).toContain('hidden md:flex');
  expect(html).toContain('md:hidden');
  expect(html.match(/Shop/g)?.length).toBeGreaterThanOrEqual(2);
  expect(html).toContain('href="https://example.com/sale"');
});

test('renders in ar', () => {
  const html = renderToString(<MegaMenu items={[{ label: 'المتجر', href: 'https://example.com' }]} labels={megaMenuLabelsAr} />);
  expect(html).toContain('aria-label="الرئيسية"');
});

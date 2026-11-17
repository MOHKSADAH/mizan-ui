import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { BottomNav, bottomNavLabelsAr } from './bottom-nav';

const items = [
  { href: 'https://example.com/', icon: <svg />, label: 'Home' },
  { href: 'https://example.com/cart', icon: <svg />, label: 'Cart', badge: 3 },
  { href: 'https://example.com/more', icon: <svg />, label: 'Alerts', badge: 120 },
];

test('renders in en with aria-current, spoken badge counts and a capped badge', () => {
  const html = renderToString(<BottomNav items={items} value="https://example.com/cart" />);
  expect(html.match(/aria-current="page"/g)).toHaveLength(1);
  expect(html).toContain('aria-label="Main"');
  expect(html).toContain('3 new items');
  expect(html).toContain('99+');
  expect(html).toContain('safe-area-inset-bottom');
});

test('renders in ar with Arabic labels and Arabic digits', () => {
  const html = renderToString(
    <BottomNav lang="ar" digits="arab" items={items} labels={bottomNavLabelsAr} value="https://example.com/" />,
  );
  expect(html).toContain('aria-label="الرئيسية"');
  expect(html).toContain('٣ عناصر جديدة');
});

test('renderLink swaps the anchor', () => {
  const html = renderToString(<BottomNav items={items} renderLink={(p) => <a data-router {...p} />} />);
  expect(html).toContain('data-router');
});

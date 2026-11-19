import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ActionDock, type DockItem } from './action-dock';
import { bottomNavLabelsAr } from './bottom-nav';

const items: DockItem[] = [
  { id: 'home', href: 'https://example.com/', icon: <svg />, label: 'Home' },
  { id: 'search', icon: <svg />, label: 'Search', tray: <input type="search" aria-label="Find" /> },
  {
    id: 'new',
    icon: <svg />,
    label: 'New',
    badge: 2,
    actions: [
      { id: 'order', icon: <svg />, label: 'New order', href: 'https://example.com/new-order' },
      { id: 'invoice', icon: <svg />, label: 'Invoice' },
    ],
  },
];

test('renders links as anchors and tray items as closed buttons', () => {
  const html = renderToString(<ActionDock items={items} value="https://example.com/" />);
  expect(html).toContain('href="https://example.com/"');
  expect(html.match(/data-dock-trigger/g)).toHaveLength(2);
  expect(html.match(/aria-expanded="false"/g)).toHaveLength(2);
  expect(html).toContain('aria-current="page"');
  expect(html).not.toContain('role="region"');
  expect(html).not.toContain('New order');
});

test('defaultOpen opens a labelled tray above the dock and marks its trigger', () => {
  const html = renderToString(<ActionDock items={items} defaultOpen="search" />);
  expect(html).toContain('role="region"');
  expect(html).toContain('aria-label="Search"');
  expect(html).toContain('aria-label="Find"');
  expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
  expect(html).toContain('aria-controls=');
  expect(html).toContain('safe-area-inset-bottom');
});

test('the action list opens at the inline end with links and buttons', () => {
  const html = renderToString(<ActionDock items={items} defaultOpen="new" />);
  expect(html).toContain('justify-end');
  expect(html).toContain('<a href="https://example.com/new-order"');
  expect(html).toContain('Invoice');
  expect(html).toContain('motion-safe:animate-in');
  expect(html).not.toContain('role="region"');
});

test('renders in ar through the bottom nav labels and takes a tray class override', () => {
  const html = renderToString(
    <ActionDock items={items} lang="ar" labels={bottomNavLabelsAr} defaultOpen="search" trayClassName="absolute" />,
  );
  expect(html).toContain('aria-label="الرئيسية"');
  expect(html).toContain('absolute');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ViewItems, ViewSwitcher, viewClasses, viewSwitcherLabelsAr } from './view-switcher';

test('renders a labelled group of three toggle buttons with text names, list pressed first', () => {
  const html = renderToString(<ViewSwitcher />);
  expect(html).toContain('aria-label="Layout"');
  expect(html.match(/aria-pressed="/g)).toHaveLength(3);
  expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
  for (const name of ['List', 'Grid', 'Compact']) expect(html).toContain(`>${name}</span>`);
});

test('renders in ar and honours defaultValue and views', () => {
  const html = renderToString(<ViewSwitcher labels={viewSwitcherLabelsAr} views={['grid', 'list']} defaultValue="grid" />);
  expect(html).toContain('aria-label="طريقة العرض"');
  expect(html).toContain('>شبكة</span>');
  expect(html).not.toContain('مضغوط');
  expect(html.match(/aria-pressed="/g)).toHaveLength(2);
});

test('ViewItems lays the items out per view and names each for view transitions', () => {
  const items = [{ id: 'a b', n: 'A' }, { id: 'c', n: 'C' }];
  for (const view of ['list', 'grid', 'compact'] as const) {
    const html = renderToString(
      <ViewItems view={view} items={items} getKey={(i) => i.id}>
        {(i, v) => <span>{`${i.n}-${v}`}</span>}
      </ViewItems>,
    );
    expect(html).toContain(`data-view="${view}"`);
    expect(html).toContain(viewClasses[view]);
    expect(html).toContain(`A-${view}`);
    expect(html.match(/view-transition-name:vs-[\w-]+/g)).toHaveLength(2);
  }
});

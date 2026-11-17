import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { TreeView } from './tree-view';

const nodes = [
  { id: 'src', label: 'src', children: [{ id: 'ui', label: 'ui' }] },
  { id: 'readme', label: 'README' },
];

test('renders tree roles, levels and a single tab stop in en', () => {
  const html = renderToString(<TreeView label="Files" nodes={nodes} defaultExpanded={['src']} defaultSelected="ui" />);
  expect(html).toContain('role="tree"');
  expect(html).toContain('aria-label="Files"');
  expect(html.match(/role="treeitem"/g)).toHaveLength(3);
  expect(html).toContain('aria-level="2"');
  expect(html).toContain('aria-expanded="true"');
  expect(html).toContain('aria-selected="true"');
  expect(html.match(/tabindex="0"/g)).toHaveLength(1);
});

test('collapsed parents hide children, and ar renders', () => {
  const html = renderToString(<TreeView label="الملفات" nodes={[{ id: 'a', label: 'مجلد', children: [{ id: 'b', label: 'ملف' }] }]} />);
  expect(html).toContain('aria-expanded="false"');
  expect(html).not.toContain('ملف<');
});

const tabStop = (html: string) => html.split('<li').find((li) => li.includes('tabindex="0"'))?.replace(/^[^>]*>|<[^>]+>/g, '');

test('the tab stop starts on the selected node and falls back to the first row when it is hidden', () => {
  expect(tabStop(renderToString(<TreeView label="Files" nodes={nodes} defaultExpanded={['src']} defaultSelected="ui" />))).toBe('ui');
  const hidden = renderToString(<TreeView label="Files" nodes={nodes} defaultSelected="ui" />);
  expect(hidden.match(/tabindex="0"/g)).toHaveLength(1);
  expect(tabStop(hidden)).toBe('src');
});

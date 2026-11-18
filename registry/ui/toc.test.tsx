import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Toc, tocLabelsAr } from './toc';

test('renders a labelled nav with links to heading ids in en', () => {
  const html = renderToString(
    <Toc
      items={[
        { id: 'intro', label: 'Intro' },
        { id: 'usage', label: 'Usage', level: 3 },
      ]}
    />,
  );
  expect(html).toContain('aria-label="On this page"');
  expect(html).toContain('href="#intro"');
  expect(html).toContain('ps-6');
});

test('keeps Arabic ids and labels in ar', () => {
  const html = renderToString(<Toc labels={tocLabelsAr} items={[{ id: 'مقدمة', label: 'مقدمة' }]} />);
  expect(html).toContain('aria-label="في هذه الصفحة"');
  expect(html).toContain('href="#مقدمة"');
});

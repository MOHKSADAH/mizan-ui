import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Suggestions, suggestionsLabelsAr } from './suggestions';

test('chips render in a labelled group, each with dir auto', () => {
  const html = renderToString(
    <Suggestions suggestions={['لخّص مبيعات الأسبوع', { label: 'Late orders', prompt: 'Which orders are late?' }]} labels={suggestionsLabelsAr} />,
  );
  expect(html).toContain('role="group"');
  expect(html).toContain('aria-label="اقتراحات"');
  expect(html.match(/<span dir="auto">/g)).toHaveLength(2);
  expect(html).toContain('لخّص مبيعات الأسبوع');
});

test('the scroll layout keeps one row', () => {
  const html = renderToString(<Suggestions suggestions={['a']} layout="scroll" />);
  expect(html).toContain('overflow-x-auto');
  expect(html).not.toContain('flex-wrap');
});

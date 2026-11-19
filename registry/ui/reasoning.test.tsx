import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Reasoning, reasoningLabelsAr } from './reasoning';

test('a running reasoning shimmers and is open', () => {
  const html = renderToString(<Reasoning status="running">Checking the totals.</Reasoning>);
  expect(html).toContain('Thinking');
  expect(html).toContain('data-status="running"');
  expect(html).toContain('aria-expanded="true"');
  expect(html).toContain('animate-spin');
});

test('a finished reasoning is closed and shows the duration', () => {
  const html = renderToString(<Reasoning duration={1}>Checking the totals.</Reasoning>);
  expect(html).toContain('Thought for 1 second');
  expect(html).toContain('aria-expanded="false"');
});

test('Arabic duration uses the Arabic plural forms', () => {
  expect(reasoningLabelsAr.thoughtFor(1)).toBe('فكّر لمدة ثانية واحدة');
  expect(reasoningLabelsAr.thoughtFor(2)).toBe('فكّر لمدة ثانيتين');
  expect(reasoningLabelsAr.thoughtFor(4)).toBe('فكّر لمدة 4 ثوانٍ');
  expect(reasoningLabelsAr.thoughtFor(12)).toBe('فكّر لمدة 12 ثانية');
});

test('each paragraph of a string follows its own direction', () => {
  const html = renderToString(
    <Reasoning defaultOpen labels={reasoningLabelsAr}>
      {'أحتاج التقرير.\n\nI will rank the products.'}
    </Reasoning>,
  );
  expect(html.match(/<p dir="auto">/g)).toHaveLength(2);
});

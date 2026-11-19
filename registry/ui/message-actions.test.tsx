import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { MessageActions, messageActionsLabelsAr } from './message-actions';

test('each button shows only when its handler or data is given', () => {
  expect(renderToString(<MessageActions />)).not.toContain('<button');
  const html = renderToString(<MessageActions text="hello" onRegenerate={() => {}} onFeedback={() => {}} />);
  expect(html).toContain('aria-label="Copy"');
  expect(html).toContain('aria-label="Regenerate"');
  expect(html).toContain('aria-label="Good response"');
  expect(html).toContain('aria-label="Bad response"');
});

test('feedback is exposed with aria-pressed', () => {
  const html = renderToString(<MessageActions feedback="like" onFeedback={() => {}} />);
  expect(html).toMatch(/aria-label="Good response"[^>]*aria-pressed="true"/);
  expect(html).toMatch(/aria-label="Bad response"[^>]*aria-pressed="false"/);
});

test('the pager shows 1/3, disables the first previous and flips its arrows in RTL', () => {
  const html = renderToString(<MessageActions branch={{ index: 1, count: 3 }} labels={messageActionsLabelsAr} />);
  expect(html).toContain('aria-label="الإجابة 1 من 3"');
  expect(html).toMatch(/aria-label="الإجابة السابقة"[^>]*disabled/);
  expect(html.match(/rtl:rotate-180/g)).toHaveLength(2);
});

test('a single response has no pager', () => {
  expect(renderToString(<MessageActions branch={{ index: 1, count: 1 }} />)).not.toContain('Next response');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ChatThread01, { demo, labelsAr, labelsEn } from './chat-thread-01';

test('chat-thread-01 renders every part in English with an ltr root', () => {
  const html = renderToString(<ChatThread01 {...demo.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('role="log"');
  expect(html).toContain('Summarize this week&#x27;s sales');
  expect(html).toContain('Thought for 4 seconds');
  expect(html).toContain('get_sales_report');
  expect(html).toContain('Used 3 sources');
  expect(html).toContain('weekly-sales.csv');
  expect(html).toContain('aria-label="Source 1: Sales report, last 7 days"');
  expect(html).toContain('aria-label="Regenerate"');
  expect(html).toContain('aria-label="Response 1 of 3"');
});

test('chat-thread-01 renders Arabic with an rtl root and an English code block that stays ltr', () => {
  const html = renderToString(<ChatThread01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('لخّص مبيعات الأسبوع');
  expect(html).toContain('فكّر لمدة 4 ثوانٍ');
  expect(html).toContain('48,320 ر.س');
  expect(html).toContain('aria-label="المصدر 1: تقرير المبيعات لآخر 7 أيام"');
  expect(html).toContain('استند إلى 3 مصادر');
  expect(html).toContain('<pre data-slot="code-block-content"');
  expect(html).toMatch(/<pre data-slot="code-block-content"[^>]*dir="ltr"/);
});

test('every paragraph and list item follows its own direction, and citations leave no marker text', () => {
  const html = renderToString(<ChatThread01 {...demo.ar} />);
  expect(html.match(/<p dir="auto"/g)).toHaveLength(3);
  expect(html.match(/<li dir="auto">/g)).toHaveLength(3);
  expect(html).not.toContain('[1]');
  expect(html).not.toContain('[2]');
});

test('thread labels exist in both languages', () => {
  expect(labelsEn.assistant).toBe('Assistant');
  expect(labelsAr.assistant).toBe('المساعد');
});

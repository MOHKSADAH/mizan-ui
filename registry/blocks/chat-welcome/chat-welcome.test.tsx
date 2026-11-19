import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ChatWelcome01, { demo, labelsAr, labelsEn } from './chat-welcome-01';

test('chat-welcome-01 renders the greeting, the input and the chips in English', () => {
  const html = renderToString(<ChatWelcome01 {...demo.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('Hello Khalid, what should we work on?');
  expect(html).toContain('placeholder="Ask about your store"');
  expect(html).toContain('Summarize this week&#x27;s sales');
  expect(html).toContain('aria-label="Suggested prompts"');
  expect(html).toContain('aria-label="Send"');
});

test('chat-welcome-01 renders Arabic with an rtl root', () => {
  const html = renderToString(<ChatWelcome01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('أهلًا خالد، من أين نبدأ؟');
  expect(html).toContain('لخّص مبيعات الأسبوع');
  expect(html).toContain('aria-label="إرسال"');
  expect(html).toContain('aria-label="اقتراحات"');
});

test('the greeting takes the name', () => {
  expect(labelsEn.greeting('Sara')).toBe('Hello Sara, what should we work on?');
  expect(labelsAr.greeting('سارة')).toBe('أهلًا سارة، من أين نبدأ؟');
});

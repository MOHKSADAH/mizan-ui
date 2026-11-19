import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ChatPage01, { demo } from './chat-page-01';

test('chat-page-01 puts the history, the thread and the prompt input together in English', () => {
  const html = renderToString(<ChatPage01 {...demo.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('<main id="main-content"');
  expect(html).toContain('aria-label="Chat history"');
  expect(html).toContain('role="log"');
  expect(html).toContain('aria-label="Send"');
  expect(html).toContain('aria-label="Model: Mizan Lite"');
  expect(html).toContain('Context window, ');
});

test('chat-page-01 renders Arabic with an rtl root and Arabic controls', () => {
  const html = renderToString(<ChatPage01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('سجل المحادثات');
  expect(html).toContain('لخّص مبيعات الأسبوع');
  expect(html).toContain('aria-label="إرسال"');
  expect(html).toContain('aria-label="النموذج: Mizan Lite"');
  expect(html).toContain('نافذة السياق');
});

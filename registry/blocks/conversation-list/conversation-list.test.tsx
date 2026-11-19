import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import ConversationList01, { demo, labelsAr } from './conversation-list-01';

test('conversation-list-01 groups the history by date in English', () => {
  const html = renderToString(<ConversationList01 {...demo.en} />);
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('aria-label="Chat history"');
  for (const group of ['Today', 'Yesterday', 'Previous 7 days', 'Older']) expect(html).toContain(`>${group}<`);
  expect(html).toContain('aria-current="true"');
  expect(html).toContain('Search chats');
  expect(html).toContain('New chat');
});

test('conversation-list-01 renders Arabic with an rtl root and Arabic group names', () => {
  const html = renderToString(<ConversationList01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  for (const group of ['اليوم', 'أمس', 'آخر 7 أيام', 'أقدم']) expect(html).toContain(`>${group}<`);
  expect(html).toContain('لخّص مبيعات الأسبوع');
  expect(html).toContain('محادثة جديدة');
});

test('the groups count calendar days in the time zone, not 24 hour steps', () => {
  const conversations = [
    { id: 'a', title: 'late night', updatedAt: '2026-11-18T23:50:00+03:00' },
    { id: 'b', title: 'seven days', updatedAt: '2026-11-12T10:00:00+03:00' },
    { id: 'c', title: 'eight days', updatedAt: '2026-11-11T10:00:00+03:00' },
  ];
  const html = renderToString(
    <ConversationList01 {...demo.en} conversations={conversations} now="2026-11-19T00:10:00+03:00" />,
  );
  const group = (title: string) => html.slice(0, html.indexOf(title)).match(/aria-label="([^"]+)"><h3/g)?.at(-1);
  expect(group('late night')).toContain('Yesterday');
  expect(group('seven days')).toContain('Previous 7 days');
  expect(group('eight days')).toContain('Older');
});

test('every row has an options button named after the chat', () => {
  const html = renderToString(<ConversationList01 {...demo.ar} />);
  expect(html).toContain('aria-label="خيارات المحادثة: لخّص مبيعات الأسبوع"');
  expect(labelsAr.deleteTitle('خطة رمضان')).toBe('حذف «خطة رمضان»؟');
});

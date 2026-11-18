import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Notifications01, demo, labelsAr, labelsEn } from '@/registry/blocks/notifications/notifications-01';

test('renders English with the unread count in the bell name', () => {
  const html = renderToString(<Notifications01 {...demo.en} />);
  expect(html).toContain('aria-label="Notifications, 3 unread"');
  expect(html).toContain('role="status"');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Notifications01 {...demo.ar} />);
  expect(html).toContain('الإشعارات، 3 إشعارات غير مقروءة');
  expect(html).toContain('dir="rtl"');
});

test('bell name has no count when everything is read and uses Arabic plural forms', () => {
  expect(labelsEn.bell(0)).toBe('Notifications');
  expect(labelsAr.bell(1)).toBe('الإشعارات، إشعار واحد غير مقروء');
  expect(labelsAr.bell(2)).toBe('الإشعارات، إشعاران غير مقروءين');
  expect(labelsAr.bell(11)).toBe('الإشعارات، 11 إشعارًا غير مقروء');
});

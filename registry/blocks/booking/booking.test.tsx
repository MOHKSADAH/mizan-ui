import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Booking01, { demo as demo01 } from './booking-01';

test('booking-01 renders the service select, the day strip and a disabled confirm button in English', () => {
  const html = renderToString(<Booking01 {...demo01.en} id="book" />);
  expect(html).toContain('aria-labelledby="book-heading"');
  expect(html).toContain('for="book-service"');
  expect(html).toContain('Choose a service');
  expect(html).toContain('role="radiogroup"');
  expect(html).toContain('Pick a day to see the available times.');
  expect(html).toContain('Choose a service, a day and a time');
  expect(html).toMatch(/<button[^>]*disabled[^>]*>Confirm booking/);
  expect(html).toContain('role="status"');
});

test('booking-01 renders in Arabic with the Arabic slot labels', () => {
  const html = renderToString(<Booking01 {...demo01.ar} />);
  expect(html).toContain('احجز زيارتك في دقيقة');
  expect(html).toContain('اختر يوماً لعرض الأوقات المتاحة.');
  expect(html).toContain('تأكيد الحجز');
  expect(html).toContain('الدفع في العيادة');
});

test('booking-01 closes Friday in the demo week', () => {
  const friday = demo01.en.slots['2026-12-11'];
  expect(friday).toEqual([]);
  expect(demo01.en.slots['2026-12-06'].length).toBeGreaterThan(0);
});

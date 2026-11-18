import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Contact01, { demo as demo01 } from './contact-01';

test('contact-01 renders info cards and a labelled form in English', () => {
  const html = renderToString(<Contact01 {...demo01.en} id="contact" />);
  expect(html).toContain('aria-labelledby="contact-heading"');
  expect(html).toContain('href="tel:+966115550142"');
  expect(html).toContain('href="https://wa.me/966505550142"');
  expect(html).toContain('href="mailto:hello@rafid.example"');
  expect(html).toContain('for="contact-name"');
  expect(html).toContain('for="contact-message"');
  expect(html).toContain('type="tel"');
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('role="status"');
  expect(html).toContain('Send message');
});

test('contact-01 renders in Arabic and leaves out the topic field without topics', () => {
  const ar = renderToString(<Contact01 {...demo01.ar} />);
  expect(ar).toContain('يسعدنا مساعدتك');
  expect(ar).toContain('إرسال الرسالة');
  expect(ar).toContain('الموضوع');
  expect(renderToString(<Contact01 {...demo01.ar} topics={undefined} />)).not.toContain('الموضوع');
});

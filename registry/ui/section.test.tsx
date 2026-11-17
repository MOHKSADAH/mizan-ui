import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Section, SectionHeader } from '@/registry/ui/section';

test('section is named by its heading', () => {
  const html = renderToString(
    <Section id="faq">
      <SectionHeader id="faq" title="Questions" eyebrow="FAQ" description="Short answers" actions={<span>All</span>} />
    </Section>,
  );
  expect(html).toContain('<section');
  expect(html).toContain('id="faq"');
  expect(html).toContain('aria-labelledby="faq-heading"');
  expect(html).toContain('<h2 id="faq-heading"');
  expect(html).toContain('py-12 md:py-16 lg:py-24');
});

test('div section has no aria-labelledby, heading level and align apply', () => {
  const html = renderToString(
    <Section as="div" id="x" spacing="hero">
      <SectionHeader id="x" title="T" headingLevel={3} align="center" />
    </Section>,
  );
  expect(html).toContain('<div');
  expect(html).not.toContain('aria-labelledby');
  expect(html).toContain('<h3 id="x-heading"');
  expect(html).toContain('items-center text-center');
  expect(html).toContain('py-16 md:py-24 lg:py-32');
});

test('renders Arabic content', () => {
  expect(renderToString(<SectionHeader title="الأسئلة الشائعة" dir="rtl" />)).toContain('الأسئلة الشائعة');
});

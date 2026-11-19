import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Cta05, { demo as demo05 } from './cta-05';
import Cta06, { demo as demo06 } from './cta-06';

test('cta-05 renders the benefit list and a phone mock with isolated order numbers in Arabic', () => {
  const html = renderToString(<Cta05 {...demo05.ar} id="app" />);
  expect(html).toContain('aria-labelledby="app-heading"');
  expect(html).toContain('<strong>أدر متجرك</strong>');
  expect(html.match(/<li class="flex items-start gap-3">/g)).toHaveLength(3);
  expect(html).toContain('<bdi class="tabular-nums">#360243</bdi>');
  expect(html).toContain('data-status="pending"');
  expect(html).toContain('قيد الانتظار');
  expect(html).toContain('عطور حياة');
});

test('cta-05 renders in English and omits the secondary button', () => {
  const html = renderToString(<Cta05 {...demo05.en} secondaryCta={undefined} />);
  expect(html).toContain('Today&#x27;s sales');
  expect(html).toContain('Pending');
  expect(html).not.toContain('See how it works');
});

test('cta-06 renders one heading with a real bold span and one button', () => {
  const html = renderToString(<Cta06 {...demo06.ar} />);
  expect(html).toContain('<strong>متجرك الأول</strong>');
  expect(html.match(/<a /g)).toHaveLength(1);
  expect(html).toContain('rtl:rotate-180');
  expect(html).toContain('bg-secondary');
  const en = renderToString(<Cta06 {...demo06.en} headingLevel={3} />);
  expect(en).toContain('<h3');
});

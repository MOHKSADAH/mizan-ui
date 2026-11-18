import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Stats01, { demo as demo01 } from './stats-01';

test('stats-01 renders a definition list with the value after the label in the DOM', () => {
  const html = renderToString(<Stats01 {...demo01.en} id="stats" />);
  expect(html).toContain('<dl');
  expect(html).toContain('<dt class="text-base text-muted-foreground">Platform uptime</dt>');
  expect(html).toContain('<bdi>99.9%</bdi>');
  expect(html).toContain('lg:grid-cols-4');
  expect(html).toContain('aria-labelledby="stats-heading"');
});

test('stats-01 formats numbers and renders Arabic', () => {
  const html = renderToString(<Stats01 {...demo01.ar} />);
  expect(html).toContain('أرقام نفخر بها');
  expect(html).toContain('<bdi>15</bdi>');
});

test('stats-01 lays out three items in three columns and drops the section without a title', () => {
  const html = renderToString(<Stats01 items={demo01.en.items.slice(0, 3)} />);
  expect(html).toContain('sm:grid-cols-3');
  expect(html).not.toContain('<section');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Marquee, marqueeLabelsAr } from './marquee';

test('renders a group with a pause button and an inert aria-hidden copy in en', () => {
  const html = renderToString(
    <Marquee>
      <a href="https://example.com/a">Acme</a>
      <a href="https://example.com/b">Globex</a>
    </Marquee>,
  );
  expect(html).toContain('role="group"');
  expect(html).toContain('aria-label="Pause scrolling"');
  expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(1);
  expect(html).toContain('inert');
  expect(html.match(/Acme/g)).toHaveLength(2);
});

test('renders in ar with Arabic labels', () => {
  const html = renderToString(
    <Marquee labels={marqueeLabelsAr}>
      <span>شركة</span>
    </Marquee>,
  );
  expect(html).toContain('aria-label="إيقاف الحركة"');
});

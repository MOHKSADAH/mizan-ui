import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Stats02, { demo as Stats02Demo } from './stats-02';

test('stats-02 renders in English', () => {
  const html = renderToString(<Stats02 {...Stats02Demo.en} />);
  expect(html).toContain("Numbers we are proud of");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("border-s");
});

test('stats-02 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Stats02 {...Stats02Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("أرقام نفخر بها");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("border-s");
});

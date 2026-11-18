import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import BlogList01, { demo as BlogList01Demo } from './blog-list-01';

test('blog-list-01 renders in English', () => {
  const html = renderToString(<BlogList01 {...BlogList01Demo.en} />);
  expect(html).toContain("Ideas for growing your business");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<article");
  expect(html).toContain("min read");
});

test('blog-list-01 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <BlogList01 {...BlogList01Demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain("أفكار لتنمية أعمالك");
  expect(html.match(/<h1[ >]/g)?.length ?? 0).toBe(0);
  expect(html).toContain("<article");
  expect(html).toContain("قراءة");
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Container } from '@/registry/ui/container';

test.each(['prose', 'narrow', 'default', 'wide'] as const)('renders size %s', (size) => {
  const html = renderToString(<Container size={size}>x</Container>);
  expect(html).toContain('mx-auto w-full px-4');
  expect(html).toContain({ prose: 'max-w-3xl', narrow: 'max-w-5xl', default: 'max-w-7xl', wide: 'max-w-screen-2xl' }[size]);
});

test('merges className and props', () => {
  const html = renderToString(<Container className="py-2" dir="rtl">x</Container>);
  expect(html).toContain('py-2');
  expect(html).toContain('dir="rtl"');
});

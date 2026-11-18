import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import LogoCloud01, { demo as demo01 } from './logo-cloud-01';

test('logo-cloud-01 renders the group heading and logos', () => {
  const html = renderToString(<LogoCloud01 {...demo01.en} id="clients" />);
  expect(html).toContain('<h2 id="clients-heading"');
  expect(html).toContain('Trusted by growing companies');
  expect(html.match(/<li /g)).toHaveLength(6);
  expect(renderToString(<LogoCloud01 {...demo01.ar} />)).toContain('شركات متنامية تثق بنا');
});

test('logo-cloud-01 renders an image logo with alt text', () => {
  const html = renderToString(
    <LogoCloud01 title="Clients" logos={[{ name: 'Acme', src: '/acme.svg', width: 96, href: '/acme' }]} />,
  );
  expect(html).toContain('alt="Acme"');
  expect(html).toContain('href="/acme"');
});

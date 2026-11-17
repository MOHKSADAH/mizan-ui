import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Hero01, { demo as demo01 } from './hero-01';
import Hero02, { demo as demo02 } from './hero-02';
import Hero08, { demo as demo08 } from './hero-08';

test('hero-01 renders in English', () => {
  const html = renderToString(<Hero01 {...demo01.en} id="hero" />);
  expect(html).toContain('<h1 id="hero-heading"');
  expect(html).toContain('aria-labelledby="hero-heading"');
  expect(html).toContain('Run your business with clarity and ease');
  expect(html).toContain('href="https://wa.me/966505550142');
});

test('hero-01 renders in Arabic', () => {
  const html = renderToString(<Hero01 {...demo01.ar} />);
  expect(html).toContain('أدر أعمالك بكل وضوح وسهولة');
  expect(html).toContain('(يفتح واتساب)');
});

test('hero-01 uses the requested heading level', () => {
  expect(renderToString(<Hero01 {...demo01.en} headingLevel={2} />)).toContain('<h2');
});

test('hero-02 renders text and media slot in both languages', () => {
  const en = renderToString(<Hero02 {...demo02.en} />);
  expect(en).toContain('Everything your company needs in one place');
  expect(en).toContain('aspect-[4/3]');
  const ar = renderToString(<Hero02 {...demo02.ar} />);
  expect(ar).toContain('كل ما تحتاجه شركتك في مكان واحد');
});

test('hero-02 renders a Media object as an image', () => {
  const html = renderToString(
    <Hero02 {...demo02.en} media={{ src: '/a.png', alt: 'Dashboard', width: 800, height: 600 }} />,
  );
  expect(html).toContain('alt="Dashboard"');
  expect(html).toContain('width="800"');
});

test('hero-08 renders labelled slides in English', () => {
  const html = renderToString(<Hero08 {...demo08.en} id="banner" />);
  expect(html).toContain('aria-roledescription="carousel"');
  expect(html).toContain('aria-label="1 / 3"');
  expect(html).toContain('New season collection');
  expect(html).toContain('>Previous slide<');
});

test('hero-08 renders in Arabic', () => {
  const html = renderToString(<Hero08 {...demo08.ar} />);
  expect(html).toContain('تشكيلة الموسم الجديد');
  expect(html).toContain('>الشريحة التالية<');
});

import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import FeatureCarousel01, { demo } from './feature-carousel-01';

const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('feature-carousel-01 renders the chips as tabs with the first one selected', () => {
  const html = renderToString(<FeatureCarousel01 {...demo.en} />);
  expect(html).toContain('role="tablist"');
  expect(html).toContain('aria-orientation="vertical"');
  expect(html.match(/role="tab"/g)?.length).toBe(demo.en.features.length);
  expect(html.match(/aria-selected="true"/g)?.length).toBe(1);
  expect(html.match(/role="tabpanel"/g)?.length).toBe(1);
  expect(h1(html)).toBe(0);
});

test('feature-carousel-01 shows the placeholder when a feature has no src', () => {
  const html = renderToString(<FeatureCarousel01 {...demo.en} />);
  expect(html).not.toContain('<img');
  expect(html).toContain('bg-muted');
  expect(html).toContain('<svg');
});

test('feature-carousel-01 shows the picture when src is set', () => {
  const features = demo.en.features.map((f, i) =>
    i === 0 ? { ...f, media: { src: '/shot.png', alt: 'Orders list', width: 1280, height: 720 } } : f,
  );
  const html = renderToString(<FeatureCarousel01 {...demo.en} features={features} />);
  expect(html).toContain('src="/shot.png"');
  expect(html).toContain('alt="Orders list"');
});

test('feature-carousel-01 offers a pause button while autoplay can run, and none without it', () => {
  expect(renderToString(<FeatureCarousel01 {...demo.en} />)).toContain('Pause the slideshow');
  expect(renderToString(<FeatureCarousel01 {...demo.en} autoplay={false} />)).not.toContain('Pause the slideshow');
});

test('feature-carousel-01 can start on another chip', () => {
  const html = renderToString(<FeatureCarousel01 {...demo.en} defaultFeature="invoices" />);
  expect(html).toMatch(/aria-selected="true"[^>]*>[^]*?E-invoices/);
});

test('feature-carousel-01 renders in Arabic with the Arabic pause label', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <FeatureCarousel01 {...demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('مساحة عمل واحدة للمتجر كله');
  expect(html).toContain('الطلبات والتوصيل');
  expect(html).toContain('إيقاف العرض مؤقتًا');
  expect(h1(html)).toBe(0);
});

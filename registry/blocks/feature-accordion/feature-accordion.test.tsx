import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import FeatureAccordion01, { demo } from './feature-accordion-01';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('feature-accordion-01 renders numbered accordion triggers with only the first open', () => {
  const html = renderToString(<FeatureAccordion01 {...demo.en} />);
  expect(html.match(/data-slot="accordion-trigger"/g)).toHaveLength(demo.en.items.length);
  expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
  expect(html).toContain('01');
  expect(html).toContain('04');
  expect(html).toContain('Follow sales and stock');
  expect(html).not.toContain('ZATCA rules');
  expect(h1(html)).toBe(0);
});

test('feature-accordion-01 shows the image placeholder when no media is passed, and the image when it is', () => {
  const none = renderToString(<FeatureAccordion01 {...demo.en} />);
  expect(none).not.toContain('<img');
  expect(none).toContain('bg-muted');
  const items = demo.en.items.map((item, i) => (i === 0 ? { ...item, media: { src: 'https://example.com/a.jpg', alt: 'Dashboard', width: 800, height: 600 } } : item));
  const some = renderToString(<FeatureAccordion01 {...demo.en} items={items} />);
  expect(some).toContain('alt="Dashboard"');
});

test('feature-accordion-01 can start on another item and renders in Arabic with Western-digit numerals', () => {
  const html = rtl(<FeatureAccordion01 {...demo.ar} defaultItem="payments" />);
  expect(html).toContain('كل ما يحتاجه متجرك');
  expect(html).toContain('مدفوعات يثق بها عملاؤك');
  expect(html).toContain('تمارا');
  expect(html).not.toContain('هيئة الزكاة');
  expect(h1(html)).toBe(0);
});

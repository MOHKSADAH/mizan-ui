import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import TestimonialStage01, { demo, shouldAutoplay } from './testimonial-stage-01';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('testimonial-stage-01 shows one testimonial with its stat pair and a thumbnail rail of tabs', () => {
  const html = renderToString(<TestimonialStage01 {...demo.en} />);
  expect(html).toContain('role="tablist"');
  expect(html).toContain('aria-label="Choose a testimonial"');
  expect(html.match(/role="tab"/g)).toHaveLength(demo.en.items.length);
  expect(html.match(/role="tabpanel"/g)).toHaveLength(1);
  expect(html.match(/aria-selected="true"/g)).toHaveLength(1);
  expect(html).toContain('answer orders by hand on WhatsApp');
  expect(html).not.toContain('Six branches and six different tools');
  expect(html.match(/<bdi dir="ltr">/g)).toHaveLength(2);
  expect(html).toContain('text-lg');
  expect(h1(html)).toBe(0);
});

test('testimonial-stage-01 can start on another testimonial and uses the image placeholder without a portrait', () => {
  const html = renderToString(<TestimonialStage01 {...demo.en} defaultItem="layla" />);
  expect(html).toContain('Reminders reach patients on WhatsApp');
  expect(html).not.toContain('<img');
  const items = demo.en.items.map((item, i) => (i === 0 ? { ...item, portrait: { src: 'https://example.com/p.jpg', alt: 'Sara', width: 400, height: 500 } } : item));
  const some = renderToString(<TestimonialStage01 {...demo.en} items={items} />);
  expect(some).toContain('alt="Sara"');
  expect(some).toContain('alt=""');
});

test('testimonial-stage-01 offers a pause button in the auto variant only', () => {
  expect(renderToString(<TestimonialStage01 {...demo.en} />)).toContain('aria-label="Pause automatic switching"');
  expect(renderToString(<TestimonialStage01 {...demo.en} variant="static" />)).not.toContain('automatic switching');
});

test('shouldAutoplay pauses on hover, focus, a manual pause and reduced motion, and stays off for static or one item', () => {
  const on = { variant: 'auto', count: 3, hovered: false, focused: false, stopped: false, reduced: false } as const;
  expect(shouldAutoplay(on)).toBe(true);
  expect(shouldAutoplay({ ...on, hovered: true })).toBe(false);
  expect(shouldAutoplay({ ...on, focused: true })).toBe(false);
  expect(shouldAutoplay({ ...on, stopped: true })).toBe(false);
  expect(shouldAutoplay({ ...on, reduced: true })).toBe(false);
  expect(shouldAutoplay({ ...on, variant: 'static' })).toBe(false);
  expect(shouldAutoplay({ ...on, count: 1 })).toBe(false);
});

test('testimonial-stage-01 renders in Arabic with LTR stats and Arabic labels', () => {
  const html = rtl(<TestimonialStage01 {...demo.ar} />);
  expect(html).toContain('متاجر وفرق نمت معنا');
  expect(html).toContain('aria-label="اختر شهادة عميل"');
  expect(html).toContain('aria-label="إيقاف التبديل التلقائي"');
  expect(html).toContain('<bdi dir="ltr">+38%</bdi>');
  expect(h1(html)).toBe(0);
});

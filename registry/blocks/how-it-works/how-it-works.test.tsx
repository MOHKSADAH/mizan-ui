import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import HowItWorks01, { demo as HowItWorks01Demo } from './how-it-works-01';
import HowItWorks02, { demo as HowItWorks02Demo } from './how-it-works-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('how-it-works-01 numbers the steps and draws a rule after each but the last', () => {
  const html = renderToString(<HowItWorks01 {...HowItWorks01Demo.en} />);
  const steps = HowItWorks01Demo.en.steps.length;
  expect(html.match(/<li/g)?.length).toBe(steps);
  expect(html.match(/me-4 h-px flex-1 bg-border/g)?.length).toBe(steps - 1);
  expect(html).toContain('<bdi>01</bdi>');
  expect(h1(html)).toBe(0);
});

test('how-it-works-01 renders in Arabic with Western digits', () => {
  const html = rtl(<HowItWorks01 {...HowItWorks01Demo.ar} />);
  expect(html).toContain('من التسجيل إلى أول فاتورة');
  expect(html).toContain('<bdi>01</bdi>');
  expect(html).not.toMatch(/[٠-٩]/);
  expect(h1(html)).toBe(0);
});

test('how-it-works-02 has a sticky heading and a line between steps', () => {
  const html = renderToString(<HowItWorks02 {...HowItWorks02Demo.en} />);
  expect(html).toContain('lg:sticky');
  expect(html.match(/before:w-px/g)?.length).toBe(HowItWorks02Demo.en.steps.length - 1);
  expect(html).toContain('aria-labelledby');
  expect(h1(html)).toBe(0);
});

test('how-it-works-02 renders in Arabic and mirrors the arrow', () => {
  const html = rtl(<HowItWorks02 {...HowItWorks02Demo.ar} />);
  expect(html).toContain('من سلة عميلك');
  expect(html).toContain('rtl:rotate-180');
  expect(h1(html)).toBe(0);
});

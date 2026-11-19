import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import FeatureSwitcher01, { demo as Switcher01Demo } from './feature-switcher-01';
import FeatureSwitcher02, { demo as Switcher02Demo } from './feature-switcher-02';

const rtl = (node: React.ReactNode) => renderToString(<DirectionProvider direction="rtl">{node}</DirectionProvider>);
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('feature-switcher-01 renders vertical tabs with the first panel selected', () => {
  const html = renderToString(<FeatureSwitcher01 {...Switcher01Demo.en} />);
  expect(html).toContain('role="tablist"');
  expect(html).toContain('aria-orientation="vertical"');
  expect(html.match(/role="tab"/g)?.length).toBe(Switcher01Demo.en.items.length);
  expect(html.match(/aria-selected="true"/g)?.length).toBe(1);
  expect(html).toContain('role="tabpanel"');
  expect(html).toContain('INV-2041');
  expect(h1(html)).toBe(0);
});

test('feature-switcher-01 renders the invoice panel from registry components in Arabic', () => {
  const html = rtl(<FeatureSwitcher01 {...Switcher01Demo.ar} />);
  expect(html).toContain('كل شيء في شاشة واحدة');
  expect(html).toContain('فاتورة ضريبية');
  expect(html).toContain('مدفوع');
  expect(h1(html)).toBe(0);
});

test('feature-switcher-01 can start on another row', () => {
  const html = renderToString(<FeatureSwitcher01 {...Switcher01Demo.en} defaultItem="stock" />);
  expect(html).toContain('Cambodian oud oil');
  expect(html).not.toContain('INV-2041');
});

test('feature-switcher-02 renders horizontal tabs and a caption', () => {
  const html = renderToString(<FeatureSwitcher02 {...Switcher02Demo.en} />);
  expect(html).toContain('role="tablist"');
  expect(html).not.toContain('aria-orientation="vertical"');
  expect(html.match(/role="tab"/g)?.length).toBe(Switcher02Demo.en.tabs.length);
  expect(html).toContain('Sales before your first coffee');
  expect(h1(html)).toBe(0);
});

test('feature-switcher-02 renders in Arabic', () => {
  const html = rtl(<FeatureSwitcher02 {...Switcher02Demo.ar} />);
  expect(html).toContain('مبيعاتك قبل قهوة الصباح');
  expect(html).toContain('مبيعات اليوم');
  expect(h1(html)).toBe(0);
});

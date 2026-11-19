import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import Pricing06, { demo } from './pricing-06';

const plain = (html: string) => html.replace(/[⁦⁩]/g, '');
const h1 = (html: string) => html.match(/<h1[ >]/g)?.length ?? 0;

test('pricing-06 renders the plans as radios with the selected plan expanded', () => {
  const html = renderToString(<Pricing06 {...demo.en} />);
  expect(html).toContain('role="radiogroup"');
  expect(html.match(/role="radio"/g)).toHaveLength(3);
  expect(html.match(/aria-checked="true"/g)).toHaveLength(1);
  expect(html.match(/data-selected/g)).toHaveLength(1);
  expect(html).toContain('Pick the plan for your team');
  expect(html).toContain('WhatsApp order updates');
  expect(h1(html)).toBe(0);
});

test('pricing-06 collapses the features of the other plans', () => {
  const html = renderToString(<Pricing06 {...demo.en} />);
  expect(html.match(/inert/g)).toHaveLength(2);
  expect(html).toContain('motion-reduce:transition-none');
});

test('pricing-06 shows the period toggle, the seats stepper and the VAT note', () => {
  const html = plain(renderToString(<Pricing06 {...demo.en} />));
  expect(html).toContain('aria-label="Billing period"');
  expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
  expect(html).toContain('Save 20%');
  expect(html).toContain('aria-label="Seats"');
  expect(html).toContain('VAT (15%)');
  expect(html).toContain('Prices exclude 15% VAT');
});

test('pricing-06 adds VAT to the subtotal: 3 seats at 99 SAR is 341.55 SAR', () => {
  const html = renderToString(<Pricing06 {...demo.en} />);
  expect(html).toContain('297');
  expect(html).toContain('44.55');
  expect(html).toContain('341.55');
});

test('pricing-06 renders in Arabic', () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <Pricing06 {...demo.ar} />
    </DirectionProvider>,
  );
  expect(html).toContain('اختر الباقة المناسبة لفريقك');
  expect(html).toContain('الأكثر اختيارًا');
  expect(html).toContain('وفّر');
  expect(html).toContain('ضريبة القيمة المضافة');
  expect(h1(html)).toBe(0);
});

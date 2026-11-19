import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Calculator01, { demo as demo01, estimate } from './calculator-01';

test('estimate returns an annuity installment', () => {
  const { monthly, total, profit } = estimate(1_200_000, 20, 0.055);
  expect(Math.round(monthly)).toBe(8255);
  expect(Math.round(total)).toBe(Math.round(monthly * 240));
  expect(Math.round(profit)).toBe(Math.round(total - 1_200_000));
  expect(estimate(120_000, 10, 0).monthly).toBe(1000);
});

test('calculator-01 renders a labelled slider, number field and live result in English', () => {
  const html = renderToString(<Calculator01 {...demo01.en} id="calc" />);
  expect(html).toContain('aria-labelledby="calc-heading"');
  expect(html).toContain('for="calc-amount"');
  expect(html).toContain('aria-live="polite"');
  expect(html).toContain('Monthly installment');
  expect(html).toContain('8,255 Saudi riyals');
  expect(html).toContain('20 years');
});

test('calculator-01 renders in Arabic and leaves out the button without a cta', () => {
  const html = renderToString(<Calculator01 {...demo01.ar} />);
  expect(html).toContain('قدّر قسطك الشهري');
  expect(html).toContain('القسط الشهري');
  expect(html).toContain('20 سنة');
  expect(html).toContain('اطلب التمويل');
  expect(renderToString(<Calculator01 {...demo01.ar} cta={undefined} />)).not.toContain('اطلب التمويل');
});

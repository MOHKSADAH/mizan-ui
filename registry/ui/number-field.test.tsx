import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { NumberField } from './number-field';

describe('number-field', () => {
  test('renders in en and ar with stepper labels and formatted value', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(
        <NumberField lang={lang} defaultValue={1250} min={0} max={5000} step={50} format={{ style: 'currency', currency: 'SAR' }} aria-label="Amount" />,
      );
      expect(html).toContain('data-slot="number-field"');
      expect(html).toContain(lang === 'ar' ? 'زيادة' : 'Increase');
      expect(html).toContain('1,250');
    }
  });

  test('digits option selects the numbering system', () => {
    const html = renderToString(<NumberField lang="ar" digits="arab" defaultValue={12} aria-label="n" />);
    expect(html).toContain('١٢');
  });
});

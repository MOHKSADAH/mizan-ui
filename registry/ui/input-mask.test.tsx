import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { InputMask } from './input-mask';

describe('input-mask', () => {
  test('renders each preset formatted, LTR, in en and ar', () => {
    const cases = [
      ['phone', '0501234567', '050 123 4567'],
      ['card', '4111111111111111', '4111 1111 1111 1111'],
      ['date', '01012024', '01/01/2024'],
      ['iban', 'sa0380000000608010167519', 'SA03 8000 0000 6080 1016 7519'],
    ] as const;
    for (const dir of ['ltr', 'rtl']) {
      for (const [preset, input, shown] of cases) {
        const html = renderToString(
          <div dir={dir}>
            <InputMask preset={preset} defaultValue={input} aria-label={preset} />
          </div>,
        );
        expect(html).toContain('dir="ltr"');
        expect(html).toContain(`value="${shown}"`);
      }
    }
  });

  test('numeric keyboard for digit masks, text for IBAN, custom mask works', () => {
    expect(renderToString(<InputMask preset="card" aria-label="c" />)).toContain('inputMode="numeric"');
    expect(renderToString(<InputMask preset="iban" aria-label="i" />)).toContain('inputMode="text"');
    expect(renderToString(<InputMask mask="(999) 99" value="٥٥٥١٢" aria-label="x" />)).toContain('value="(555) 12"');
  });
});

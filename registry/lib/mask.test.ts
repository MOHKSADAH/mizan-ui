import { describe, expect, test } from 'bun:test';
import { MASK_PRESETS, applyMask, backspaceOverLiteral, caretAfter, slotsBefore, toAsciiDigits } from './mask';

describe('mask', () => {
  test('formats digits and drops characters a slot rejects', () => {
    expect(applyMask('0501234567', MASK_PRESETS.phone).formatted).toBe('050 123 4567');
    expect(applyMask('05a0-123', MASK_PRESETS.phone).formatted).toBe('050 123');
    expect(applyMask('050123456789', MASK_PRESETS.phone).raw).toBe('0501234567');
  });

  test('does not emit a trailing literal until more input arrives', () => {
    expect(applyMask('050', MASK_PRESETS.phone).formatted).toBe('050');
    expect(applyMask('0501', MASK_PRESETS.phone).formatted).toBe('050 1');
    expect(applyMask('', MASK_PRESETS.phone).formatted).toBe('');
  });

  test('accepts already formatted and pasted input', () => {
    expect(applyMask('4111 1111 1111 1111', MASK_PRESETS.card).raw).toBe('4111111111111111');
    expect(applyMask('(555) 123', '(999) 999').formatted).toBe('(555) 123');
    expect(applyMask('555123', '(999) 999').formatted).toBe('(555) 123');
  });

  test('converts Arabic-Indic and Persian digits', () => {
    expect(toAsciiDigits('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹')).toBe('01234567890123456789');
    expect(applyMask('٠٥٠١٢٣٤٥٦٧', MASK_PRESETS.phone).formatted).toBe('050 123 4567');
    expect(applyMask('٠١٠١٢٠٢٤', MASK_PRESETS.date).formatted).toBe('01/01/2024');
  });

  test('iban upper-cases and groups', () => {
    expect(applyMask('sa0380000000608010167519', MASK_PRESETS.iban).formatted).toBe('SA03 8000 0000 6080 1016 7519');
    expect(applyMask('sa03 8000', MASK_PRESETS.iban).formatted).toBe('SA03 8000');
  });

  test('literal letters in a pattern are added for the user', () => {
    expect(applyMask('1234', 'ID-999 9').formatted).toBe('ID-123 4');
    expect(applyMask('ID-123', 'ID-999 9').formatted).toBe('ID-123');
  });

  test('caret follows the same slot after reformatting', () => {
    const p = MASK_PRESETS.phone;
    const { formatted } = applyMask('0501', p);
    expect(formatted).toBe('050 1');
    expect(caretAfter(p, formatted, 3)).toBe(3);
    expect(caretAfter(p, formatted, 4)).toBe(5);
    expect(caretAfter(p, formatted, 0)).toBe(0);
    expect(slotsBefore('0501234', 4, p)).toBe(4);
  });

  test('backspace over a literal deletes the previous digit', () => {
    const p = MASK_PRESETS.phone;
    expect(backspaceOverLiteral('0501', 3, p, '050 1')).toEqual({ formatted: '051', raw: '051', caret: 2 });
    expect(backspaceOverLiteral('050 ', 4, p, '050 1')).toBeNull();
  });
});

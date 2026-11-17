import { describe, expect, test } from 'bun:test';
import { includesText, normalizeText } from './normalize-text';

describe('normalizeText', () => {
  test('ignores case, Latin accents and extra spaces', () => {
    expect(normalizeText('  Café   AU Lait ')).toBe('cafe au lait');
  });

  test('ignores tashkeel and tatweel', () => {
    expect(normalizeText('مُحَمَّد')).toBe(normalizeText('محمد'));
    expect(normalizeText('الكـتاب')).toBe('الكتاب');
  });

  test('folds hamza forms, alef maqsura, ta marbuta and ya', () => {
    expect(normalizeText('أحمد')).toBe(normalizeText('احمد'));
    expect(normalizeText('إسلام')).toBe(normalizeText('اسلام'));
    expect(normalizeText('مدرسة')).toBe(normalizeText('مدرسه'));
    expect(normalizeText('على')).toBe(normalizeText('علي'));
    expect(normalizeText('مؤمن')).toBe(normalizeText('مومن'));
  });

  test('maps Arabic-Indic and Persian digits to ASCII', () => {
    expect(normalizeText('١٢٣')).toBe('123');
    expect(normalizeText('۴۵۶')).toBe('456');
  });

  test('includesText searches on normalized text', () => {
    expect(includesText('الرياض', 'رياض')).toBe(true);
    expect(includesText('Riyadh', 'RIY')).toBe(true);
    expect(includesText('Jeddah', 'riy')).toBe(false);
  });
});

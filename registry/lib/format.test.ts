import { describe, expect, test } from 'bun:test';
import {
  formatCompact,
  formatDate,
  formatMoney,
  formatMoneyName,
  formatMoneySymbol,
  formatNumber,
  formatPercent,
  formatSigned,
  localeTag,
  plural,
} from './format';

const en = { lang: 'en' } as const;
const ar = { lang: 'ar', digits: 'latn' } as const;
const arab = { lang: 'ar', digits: 'arab' } as const;

describe('format', () => {
  test('locale tag carries calendar and digits', () => {
    expect(localeTag(en)).toBe('en-US-u-ca-gregory-nu-latn');
    expect(localeTag({ lang: 'ar', digits: 'arab', calendar: 'islamic-umalqura' })).toBe(
      'ar-SA-u-ca-islamic-umalqura-nu-arab',
    );
  });

  test('Arabic-Indic group separator becomes U+202F and bidi marks go', () => {
    const s = formatNumber(1234567, arab);
    expect(s).toBe('١ ٢٣٤ ٥٦٧');
    expect(s).not.toMatch(/[٬‎‏؜]/);
  });

  test('ar-SA with Latin digits keeps Latin digits', () => {
    expect(formatNumber(1234.5, ar)).toMatch(/^1.234.5$/);
  });

  test('compact', () => {
    expect(formatCompact(12400, en)).toBe('12.4K');
    expect(formatCompact(1500000, en)).toBe('1.5M');
  });

  test('every percent is isolated LTR', () => {
    expect(formatPercent(0.152, en)).toBe('⁦15.2%⁩');
    expect(formatPercent(0.15, ar)).toBe('⁦15%⁩');
    expect(formatPercent(0.15, arab).startsWith('⁦')).toBe(true);
  });

  test('signed values use a real minus and stay isolated', () => {
    expect(formatSigned(-3.2, en, { maximumFractionDigits: 1 })).toBe('⁦−3.2⁩');
    expect(formatSigned(4, en)).toBe('⁦+4⁩');
    expect(formatSigned(0, en)).toBe('⁦0⁩');
  });

  test('explicit calendar', () => {
    const d = new Date(Date.UTC(2026, 10, 17, 12));
    expect(formatDate(d, en, { year: 'numeric', month: 'short', day: 'numeric' })).toBe('Nov 17, 2026');
    expect(formatDate(d, { lang: 'en', calendar: 'islamic-umalqura' }, { year: 'numeric' })).toMatch(/1448/);
  });

  test('time zone defaults to UTC for en and Asia/Riyadh for ar, and can be set', () => {
    const d = new Date(Date.UTC(2026, 10, 17, 22, 30));
    const time = { hour: 'numeric', minute: '2-digit', hourCycle: 'h23' } as const;
    expect(formatDate(d, en, time)).toBe('22:30');
    expect(formatDate(d, ar, time)).toBe('01:30');
    expect(formatDate(d, { ...en, timeZone: 'Asia/Dubai' }, time)).toBe('02:30');
  });

  test('negative numbers use U+2212 and are isolated LTR', () => {
    expect(formatNumber(-489, en)).toBe('⁦−489⁩');
    expect(formatNumber(-489, ar)).toBe('⁦−489⁩');
    expect(formatNumber(-1234.5, arab)).toBe('⁦−١ ٢٣٤٫٥⁩');
    expect(formatNumber(489, ar)).toBe('489');
  });

  test('negative money and percent', () => {
    expect(formatMoney(-489, ar, { currency: 'SAR' })).toBe('⁦−489⁩');
    expect(formatMoney(-12.5, en, { currency: 'KWD' })).toBe('⁦−12.500⁩');
    expect(formatMoneySymbol(-10, en, { currency: 'USD' })).toBe('⁦−$10⁩');
    expect(formatMoneySymbol(-10, ar, { currency: 'USD' })).toContain('−');
    expect(formatPercent(-0.152, en)).toBe('⁦−15.2%⁩');
    expect(formatPercent(-0.15, ar)).toBe('⁦−15%⁩');
  });

  test('zero has no sign', () => {
    expect(formatMoney(0, en, { currency: 'SAR' })).toBe('0');
    expect(formatMoney(-0, en, { currency: 'SAR' })).toBe('0');
    expect(formatMoney(-0.4, en, { currency: 'SAR' })).toBe('0');
    expect(formatPercent(0, en)).toBe('⁦0%⁩');
    expect(formatPercent(-0.0001, en)).toBe('⁦0%⁩');
    expect(formatSigned(-0.4, en, { maximumFractionDigits: 0 })).toBe('⁦0⁩');
    expect(formatSigned(0.4, en, { maximumFractionDigits: 0 })).toBe('⁦0⁩');
  });

  test('NaN and Infinity give an em dash', () => {
    for (const n of [NaN, Infinity, -Infinity]) {
      expect(formatNumber(n, en)).toBe('—');
      expect(formatPercent(n, ar)).toBe('—');
      expect(formatSigned(n, en)).toBe('—');
      expect(formatMoney(n, en, { currency: 'SAR' })).toBe('—');
      expect(formatMoneySymbol(n, en, { currency: 'USD' })).toBe('—');
    }
  });

  test('Arabic compact', () => {
    expect(formatCompact(12400, ar)).toMatch(/^12.4/);
    expect(formatCompact(12400, arab)).toMatch(/^١٢٫٤/);
    expect(formatCompact(12400, ar)).not.toBe(formatCompact(12400, en));
  });

  test('Arabic-Indic digits with KWD keep 3 decimals', () => {
    expect(formatMoney(12.5, arab, { currency: 'KWD' })).toBe('١٢٫٥٠٠');
    expect(formatMoney(-12.5, arab, { currency: 'KWD' })).toBe('⁦−١٢٫٥٠٠⁩');
  });

  test('plural replaces every {n}', () => {
    expect(plural(3, { other: '{n} of {n}' }, en)).toBe('3 of 3');
  });

  test('plurals follow Intl.PluralRules', () => {
    const forms = { zero: 'لا تقييمات', one: 'تقييم واحد', two: 'تقييمان', few: '{n} تقييمات', many: '{n} تقييمًا', other: '{n} تقييم' };
    expect(plural(0, forms, ar)).toBe('لا تقييمات');
    expect(plural(2, forms, ar)).toBe('تقييمان');
    expect(plural(5, forms, ar)).toBe('5 تقييمات');
    expect(plural(126, forms, ar)).toBe('126 تقييمًا');
    expect(plural(1, { one: '{n} review', other: '{n} reviews' }, en)).toBe('1 review');
  });

  test('money digits follow minor units', () => {
    expect(formatMoney(489, en, { currency: 'SAR' })).toBe('489');
    expect(formatMoney(489, en, { currency: 'SAR', decimals: true })).toBe('489.00');
    expect(formatMoney(12.5, en, { currency: 'KWD' })).toBe('12.500');
    expect(formatMoney(12400, en, { currency: 'KWD', compact: true })).toBe('12.4K');
    expect(formatMoneyName(489, en, { currency: 'SAR' })).toBe('489 Saudi riyals');
  });

  test('symbols: $ and £ in Arabic', () => {
    expect(formatMoneySymbol(10, ar, { currency: 'USD' })).toContain('$');
    expect(formatMoneySymbol(10, ar, { currency: 'USD' })).not.toContain('US$');
    expect(formatMoneySymbol(10, ar, { currency: 'GBP' })).not.toContain('UK£');
  });
});

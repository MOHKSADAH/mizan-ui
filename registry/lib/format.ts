export type Lang = 'en' | 'ar';
export type Digits = 'latn' | 'arab';
export type Calendar = 'gregory' | 'islamic-umalqura';
// timeZone defaults to Asia/Riyadh for ar and UTC for en, so dates do not depend on the runtime zone.
export type Locale = { lang: Lang; digits?: Digits; calendar?: Calendar; timeZone?: string };
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

const BIDI_MARKS = /[‎‏؜]/g;
const ARABIC_GROUP = /٬/g;
const LRI = '⁦';
const PDI = '⁩';
const MINUS = '−';
const NONE = '—';

const cache = new Map<string, unknown>();
function cached<T>(kind: string, tag: string, options: object | undefined, make: () => T): T {
  const key = `${kind}|${tag}|${JSON.stringify(options)}`;
  if (!cache.has(key)) cache.set(key, make());
  return cache.get(key) as T;
}

export function localeTag({ lang, digits = 'latn', calendar = 'gregory' }: Locale) {
  return `${lang === 'ar' ? 'ar-SA' : 'en-US'}-u-ca-${calendar}-nu-${digits}`;
}

// Intl adds bidi marks and the Arabic thousands separator (U+066C), which some fonts draw badly.
const clean = (s: string) => s.replace(BIDI_MARKS, '').replace(ARABIC_GROUP, ' ');

export const isolateLtr = (s: string) => `${LRI}${s}${PDI}`;

// The one place a sign is handled: a real minus (U+2212), and no sign for values that round to zero.
function format(n: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  const tag = localeTag(locale);
  const o = { signDisplay: 'negative', ...options } as Intl.NumberFormatOptions;
  const s = clean(cached('n', tag, o, () => new Intl.NumberFormat(tag, o)).format(n));
  return s.replace(/^-/, MINUS);
}

// A signed result is isolated LTR so the minus never lands after the digits in Arabic text.
export function formatNumber(n: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  if (!Number.isFinite(n)) return NONE;
  const s = format(n, locale, options);
  return s.startsWith(MINUS) ? isolateLtr(s) : s;
}

export function formatCompact(n: number, locale: Locale) {
  return formatNumber(n, locale, { notation: 'compact', maximumFractionDigits: 1 });
}

// Every percent is isolated LTR so the sign and digits never reorder inside Arabic text.
export function formatPercent(n: number, locale: Locale, { max = 1, min = 0 } = {}) {
  if (!Number.isFinite(n)) return NONE;
  let s = format(n, locale, { style: 'percent', maximumFractionDigits: max, minimumFractionDigits: min });
  if (locale.lang === 'ar' && (locale.digits ?? 'latn') === 'latn') s = s.replace('٪', '%');
  return isolateLtr(s);
}

export function formatSigned(n: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  if (!Number.isFinite(n)) return NONE;
  return isolateLtr(format(n, locale, { ...options, signDisplay: 'exceptZero' }));
}

export function formatDate(date: Date, locale: Locale, options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }) {
  const tag = localeTag(locale);
  const o = { timeZone: locale.timeZone ?? (locale.lang === 'ar' ? 'Asia/Riyadh' : 'UTC'), ...options };
  return clean(cached('d', tag, o, () => new Intl.DateTimeFormat(tag, o)).format(date));
}

export function plural(n: number, forms: PluralForms, locale: Locale) {
  const rule = cached('p', locale.lang, undefined, () => new Intl.PluralRules(locale.lang)).select(n);
  return (forms[rule] ?? forms.other).replaceAll('{n}', formatNumber(n, locale));
}

export function minorUnits(currency: string) {
  const o = { style: 'currency', currency } as const;
  return cached('n', 'en', o, () => new Intl.NumberFormat('en', o)).resolvedOptions().maximumFractionDigits ?? 2;
}

export type MoneyOptions = { currency: string; compact?: boolean; decimals?: boolean };

// Compact money: 0 to 1 fraction digits. Full money: minor units when asked or when the currency has 3, else none.
export function moneyDigits({ currency, compact, decimals }: MoneyOptions): Intl.NumberFormatOptions {
  if (compact) return { notation: 'compact', minimumFractionDigits: 0, maximumFractionDigits: 1 };
  const units = minorUnits(currency);
  const digits = decimals || units === 3 ? units : 0;
  return { minimumFractionDigits: digits, maximumFractionDigits: digits };
}

export function formatMoney(amount: number, locale: Locale, money: MoneyOptions) {
  return formatNumber(amount, locale, moneyDigits(money));
}

// Spoken form for screen readers: "489 Saudi riyals".
export function formatMoneyName(amount: number, locale: Locale, money: MoneyOptions) {
  return formatNumber(amount, { ...locale, digits: 'latn' }, {
    style: 'currency',
    currency: money.currency,
    currencyDisplay: 'name',
    ...moneyDigits(money),
  });
}

export function formatMoneySymbol(amount: number, locale: Locale, money: MoneyOptions) {
  return formatNumber(amount, locale, {
    style: 'currency',
    currency: money.currency,
    currencyDisplay: 'symbol',
    ...moneyDigits(money),
  })
    .replace('US$', '$')
    .replace('UK£', '£');
}

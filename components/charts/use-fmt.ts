'use client';

import { formatCompact, formatDate, formatNumber, formatPercent, formatSigned, type Lang, type Locale } from '@/registry/lib/format';
import { useSettings } from '@/components/settings';
import type { T } from '@/lib/strings';

export type An = (typeof T)[Lang]['an'];

// Number, money and date formatting bound to the page language and the user's settings.
export function useFmt(lang: Lang) {
  const { currency, digits } = useSettings();
  const locale: Locale = { lang, digits };
  const pct = (n: number, d = 1) => formatPercent(n, locale, { min: d, max: d });
  return {
    lang,
    locale,
    currency,
    digits,
    rtl: lang === 'ar',
    dir: lang === 'ar' ? ('rtl' as const) : ('ltr' as const),
    num: (n: number) => formatNumber(n, locale),
    compact: (n: number) => formatCompact(n, locale),
    pct,
    date: (d: Date, options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }) => formatDate(d, locale, options),
    // Strings carry {n:12} number tokens and named slots such as {w}.
    tx: (s: string, slots: Record<string, number> = {}) =>
      s
        .replace(/\{n:(\d+)\}/g, (_, n) => formatNumber(Number(n), locale))
        .replace(/\{(\w+)\}/g, (m, k) => (k in slots ? formatNumber(slots[k], locale) : m)),
    signedPct: (n: number) => {
      const s = formatSigned(n, locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });
      return lang === 'ar' && digits === 'latn' ? s.replace('٪', '%') : s;
    },
    signedPts: (n: number) => formatSigned(n * 100, locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  };
}

export type Fmt = ReturnType<typeof useFmt>;

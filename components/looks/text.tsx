'use client';

import * as React from 'react';
import { formatNumber, type Locale } from '@/registry/lib/format';
import type { Lang } from '@/lib/strings';
import { useSettings } from '@/components/settings';

export function useLooks(lang: Lang) {
  const { digits, currency } = useSettings();
  const locale: Locale = React.useMemo(() => ({ lang, digits }), [lang, digits]);
  return { lang, digits, currency, locale, sep: lang === 'ar' ? '، ' : ', ' };
}

// Latin runs (brand names, IDs) inside Arabic text are isolated so they keep their own direction.
const LATIN = /[A-Za-z][A-Za-z0-9-]*(?: [A-Za-z0-9][A-Za-z0-9-]*)*/g;

export function bidi(text: string, lang: Lang): React.ReactNode {
  if (lang !== 'ar') return text;
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LATIN)) {
    out.push(text.slice(last, m.index));
    out.push(
      <bdi key={m.index} lang="en">
        {m[0]}
      </bdi>,
    );
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

// Resolves {n:8} number tokens in the digits of the current settings, then isolates Latin runs.
export function rich(text: string, locale: Locale): React.ReactNode {
  return text
    .split(/\{n:(\d+)\}/)
    .map((part, i) =>
      i % 2 ? formatNumber(Number(part), locale, { useGrouping: false }) : <React.Fragment key={i}>{bidi(part, locale.lang)}</React.Fragment>,
    );
}

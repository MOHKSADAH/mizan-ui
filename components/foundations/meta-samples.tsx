'use client';

import { Badge } from '@/registry/ui/badge';
import { Price } from '@/registry/ui/price';
import { formatDate, formatNumber } from '@/registry/lib/format';
import { T, type Lang } from '@/lib/strings';
import { useSettings } from '@/components/settings';

const DATE = new Date(Date.UTC(2026, 10, 18));

// Meta role: the body family with tabular numbers. Follows the numerals and currency settings.
export function MetaSamples({ lang }: { lang: Lang }) {
  const { digits, currency } = useSettings();
  const locale = { lang, digits } as const;
  const keys = T[lang].metaKeys;
  const hijri = formatDate(DATE, { ...locale, calendar: 'islamic-umalqura' });
  const rows: [string, React.ReactNode][] = [
    [keys[0], <Price key="p" amount={4299} currency={currency} lang={lang} digits={digits} decimals />],
    [keys[1], formatDate(DATE, locale)],
    [keys[2], hijri],
    [keys[3], <bdi key="o" dir="ltr">MZ-20481</bdi>],
    [keys[4], formatNumber(1284, locale)],
    [keys[5], <Badge key="b" className="bg-success text-success-foreground">{keys[6]}</Badge>],
  ];
  return (
    <dl lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-sm tabular-nums">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="m-0 font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

'use client';

import type { Lang } from '@/lib/strings';
import { ChartCard, DataTable } from './chart-card';
import { metrics, payments, type Range } from './data';
import { useFmt, type An } from './use-fmt';

// Latin brand names stay isolated inside Arabic text.
const LATIN = new Set(['Apple Pay', 'STC Pay']);
const Name = ({ name }: { name: string }) => (LATIN.has(name) ? <bdi lang="en">{name}</bdi> : <>{name}</>);

export function PaymentsCard({ lang, range, t }: { lang: Lang; range: Range; t: An }) {
  const fmt = useFmt(lang);
  const { dir, rtl } = fmt;
  const rows = payments(metrics(range).cur.orders).map((p, i) => ({ ...p, name: t.payments[i], color: `var(--series-${i + 1})` }));
  const summary = `${t.payTitle}: ${rows.map((r) => `${r.name} ${fmt.pct(r.share)}`).join(rtl ? '، ' : ', ')}`;

  return (
    <ChartCard
      title={t.payTitle}
      description={t.payDesc}
      viewTable={t.viewTable}
      chart={({ mounted }) => (
        <div className="grid gap-4">
          <div role="img" aria-label={summary} className="flex h-8 gap-0.5 overflow-hidden rounded-md">
            {rows.map((r) => (
              <span
                key={r.name}
                className={`h-full min-w-0 ${mounted ? 'scale-x-100' : 'scale-x-0'} motion-safe:transition-transform motion-safe:duration-500`}
                style={{ flex: r.share, background: r.color, transformOrigin: rtl ? 'right' : 'left' }}
              />
            ))}
          </div>
          <ul className="grid gap-2 text-sm">
            {rows.map((r) => (
              <li key={r.name} className="flex items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-[2px]" style={{ background: r.color }} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">
                  <Name name={r.name} />
                </span>
                <span className="tabular-nums text-muted-foreground">{fmt.num(r.count)}</span>
                <span className="w-14 text-end font-medium tabular-nums">{fmt.pct(r.share)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      table={
        <DataTable
          dir={dir}
          caption={t.payTitle}
          head={[t.method, t.orders, t.share]}
          rows={rows.map((r) => [<Name key={r.name} name={r.name} />, fmt.num(r.count), fmt.pct(r.share)])}
        />
      }
    />
  );
}

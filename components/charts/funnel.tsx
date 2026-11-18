'use client';

import type { Lang } from '@/lib/strings';
import { ChartCard, DataTable } from './chart-card';
import { metrics, type Range } from './data';
import { useFmt, type An } from './use-fmt';

export function FunnelCard({ lang, range, t }: { lang: Lang; range: Range; t: An }) {
  const fmt = useFmt(lang);
  const { dir, rtl } = fmt;
  const { cur, steps } = metrics(range);
  const rows = steps.map((v, i) => ({ v, label: t.funnel[i], share: v / steps[0], conv: i ? v / steps[i - 1] : null }));

  return (
    <ChartCard
      className="mx-auto w-full max-w-[980px]"
      title={t.funnelTitle}
      description={t.funnelDesc}
      viewTable={t.viewTable}
      chart={({ mounted }) => (
        <div className="grid gap-4">
          <ol className="grid gap-3">
            {rows.map((r, i) => (
              <li key={r.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(120px,180px)_minmax(0,1fr)_minmax(96px,auto)]">
                <div className="grid min-w-0">
                  <span className="font-medium">{r.label}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">{fmt.num(r.v)}</span>
                </div>
                <div className="order-last col-span-2 flex h-7 min-w-0 items-center gap-2 sm:order-none sm:col-span-1">
                  <span
                    aria-hidden="true"
                    className={`h-full min-w-0.5 flex-none rounded-e ${mounted ? 'scale-x-100' : 'scale-x-0'} motion-safe:transition-transform motion-safe:duration-500`}
                    style={{
                      width: `calc((100% - 5em) * ${r.share.toFixed(4)})`,
                      background: `color-mix(in oklab, var(--series-1) ${100 - i * 11.25}%, var(--card))`,
                      transformOrigin: rtl ? 'right' : 'left',
                    }}
                  />
                  <span className="text-sm font-semibold whitespace-nowrap tabular-nums">
                    {fmt.pct(r.share)}
                    <span className="sr-only"> {t.ofSessions}</span>
                  </span>
                </div>
                <div className="flex flex-col text-xs text-muted-foreground">
                  {r.conv !== null && (
                    <>
                      <strong className="text-sm font-semibold text-foreground tabular-nums">{fmt.pct(r.conv)}</strong>
                      <span>{t.stepConv}</span>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="text-xs text-muted-foreground">
            {t.overall}: {fmt.pct(cur.conv)}
          </p>
        </div>
      )}
      table={
        <DataTable
          dir={dir}
          caption={t.funnelTitle}
          head={[t.funnelTitle, t.share, t.stepConv]}
          rows={rows.map((r) => [
            <>
              {r.label}
              <span className="block text-xs font-normal text-muted-foreground tabular-nums">{fmt.num(r.v)}</span>
            </>,
            fmt.pct(r.share),
            r.conv === null ? '—' : fmt.pct(r.conv),
          ])}
        />
      }
    />
  );
}

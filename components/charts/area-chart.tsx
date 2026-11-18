'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/registry/ui/chart';
import { Price } from '@/registry/ui/price';
import type { Lang } from '@/lib/strings';
import { ChartCard, DataTable } from './chart-card';
import { areaData, type Range } from './data';
import { useFmt, type An } from './use-fmt';

export function AreaCard({ lang, range, t }: { lang: Lang; range: Range; t: An }) {
  const fmt = useFmt(lang);
  const { currency, digits, rtl, dir } = fmt;
  const data = areaData(range);
  const config = {
    cur: { label: t.thisPeriod, color: 'var(--series-1)' },
    prev: { label: t.prevPeriod, color: 'var(--series-2)' },
  } satisfies ChartConfig;
  const money = (v: number) => <Price amount={v} currency={currency} lang={lang} digits={digits} />;
  const longDate = (d: Date) => fmt.date(d, { dateStyle: 'medium' });

  return (
    <ChartCard
      title={t.revTitle}
      description={t.revDesc}
      viewTable={t.viewTable}
      chart={({ mounted, animate, drawMs }) => (
        <div className="grid gap-3">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-series-1" aria-hidden="true" />
              {t.thisPeriod}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-4 border-t-2 border-dashed border-series-2" aria-hidden="true" />
              {t.prevPeriod}
            </li>
          </ul>
          <div dir="ltr" className="h-64" role="img" aria-label={`${t.revTitle}: ${t.thisPeriod}, ${t.prevPeriod}`}>
            {mounted && (
              <ChartContainer config={config} className="aspect-auto h-64 w-full">
                <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" reversed={rtl} tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} tickFormatter={(d: Date) => fmt.date(d)} />
                  <YAxis orientation={rtl ? 'right' : 'left'} width={rtl ? 64 : 48} tickLine={false} axisLine={false} tickFormatter={(v: number) => fmt.compact(v)} />
                  <ChartTooltip
                    content={({ active, payload, label }) => (
                      <div dir={dir}>
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          label={label}
                          labelFormatter={(_, p) => longDate(p[0].payload.date)}
                          formatter={(value, name, item) => (
                            <>
                              <span className="size-2.5 shrink-0 rounded-[2px]" style={{ background: item.color }} aria-hidden="true" />
                              <span className="flex-1 text-muted-foreground">
                                {config[name as 'cur' | 'prev'].label}
                                {name === 'prev' && <span className="block text-[11px]">{longDate(item.payload.prevDate)}</span>}
                              </span>
                              <span className="font-medium tabular-nums">{money(Number(value))}</span>
                            </>
                          )}
                        />
                      </div>
                    )}
                  />
                  <Area dataKey="prev" type="monotone" stroke="var(--series-2)" strokeWidth={2} strokeDasharray="4 4" fill="none" isAnimationActive={false} />
                  <Area dataKey="cur" type="monotone" stroke="var(--series-1)" strokeWidth={2} fill="var(--series-1)" fillOpacity={0.15} isAnimationActive={animate} animationDuration={drawMs} />
                </AreaChart>
              </ChartContainer>
            )}
          </div>
        </div>
      )}
      table={
        <DataTable
          dir={dir}
          caption={t.revTitle}
          head={[t.date, t.thisPeriod, t.prevPeriod, t.change]}
          rows={data.map((r) => [longDate(r.date), money(r.cur), money(r.prev), fmt.signedPct(r.cur / r.prev - 1)])}
        />
      }
    />
  );
}

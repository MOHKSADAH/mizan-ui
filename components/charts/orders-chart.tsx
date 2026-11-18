'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/registry/ui/chart';
import type { Lang } from '@/lib/strings';
import { ChartCard, DataTable } from './chart-card';
import { CHANNELS } from './data';
import { useFmt, type An } from './use-fmt';

const KEYS = ['web', 'app', 'social'] as const;

export function OrdersCard({ lang, t }: { lang: Lang; t: An }) {
  const fmt = useFmt(lang);
  const { rtl, dir } = fmt;
  const config = Object.fromEntries(KEYS.map((k, i) => [k, { label: t.channels[i], color: `var(--series-${i + 1})` }])) as ChartConfig;
  const data = CHANNELS.map((c, i) => ({ week: i + 1, ...c, total: c.web + c.app + c.social }));
  const weekN = (w: number) => fmt.tx(t.weekN, { w });

  return (
    <ChartCard
      title={t.ordersTitle}
      description={fmt.tx(t.ordersDesc)}
      viewTable={t.viewTable}
      chart={({ mounted, animate, drawMs }) => (
        <div dir="ltr" className="h-72" role="img" aria-label={t.ordersTitle}>
          {mounted && (
            <ChartContainer config={config} className="aspect-auto h-72 w-full">
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" reversed={rtl} tickLine={false} axisLine={false} tickMargin={8} minTickGap={8} tickFormatter={weekN} />
                <YAxis orientation={rtl ? 'right' : 'left'} width={rtl ? 64 : 48} tickLine={false} axisLine={false} tickFormatter={(v: number) => fmt.compact(v)} />
                <ChartTooltip
                  content={({ active, payload, label }) => (
                    <div dir={dir}>
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        label={label}
                        labelFormatter={(_, p) => weekN(p[0].payload.week)}
                        formatter={(value, name, item) => (
                          <>
                            <span className="size-2.5 shrink-0 rounded-[2px]" style={{ background: item.color }} aria-hidden="true" />
                            <span className="flex-1 text-muted-foreground">{config[name as string].label}</span>
                            <span className="font-medium tabular-nums">{fmt.num(Number(value))}</span>
                          </>
                        )}
                      />
                    </div>
                  )}
                />
                <ChartLegend content={({ payload, verticalAlign }) => <div dir={dir}><ChartLegendContent payload={payload} verticalAlign={verticalAlign} className="flex-wrap" /></div>} />
                {KEYS.map((k, i) => (
                  <Bar
                    key={k}
                    dataKey={k}
                    stackId="orders"
                    fill={`var(--series-${i + 1})`}
                    stroke="var(--card)"
                    strokeWidth={1}
                    radius={i === KEYS.length - 1 ? [3, 3, 0, 0] : 0}
                    isAnimationActive={animate}
                    animationDuration={drawMs}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          )}
        </div>
      )}
      table={
        <DataTable
          dir={dir}
          caption={t.ordersTitle}
          head={[t.week, ...t.channels, t.total]}
          rows={data.map((r) => [weekN(r.week), fmt.num(r.web), fmt.num(r.app), fmt.num(r.social), fmt.num(r.total)])}
        />
      }
    />
  );
}

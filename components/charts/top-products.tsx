'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/registry/ui/chart';
import { Price } from '@/registry/ui/price';
import { plural } from '@/registry/lib/format';
import type { Lang } from '@/lib/strings';
import { ChartCard, DataTable } from './chart-card';
import { metrics, topProducts, type Range } from './data';
import { useFmt, type An } from './use-fmt';

export function TopProductsCard({ lang, range, t }: { lang: Lang; range: Range; t: An }) {
  const fmt = useFmt(lang);
  const { currency, digits, rtl, dir, locale } = fmt;
  const config = { revenue: { label: t.kpis.revenue, color: 'var(--series-1)' } } satisfies ChartConfig;
  const rows = topProducts(metrics(range).cur.rev);
  const data = rows.map((r, i) => ({ name: fmt.tx(t.products[i]), ...r }));
  const money = (v: number) => <Price amount={v} currency={currency} lang={lang} digits={digits} />;
  const units = (n: number) => plural(n, t.units, locale);

  return (
    <ChartCard
      title={t.topTitle}
      description={t.topDesc}
      viewTable={t.viewTable}
      chart={({ mounted, animate, drawMs }) => (
        <div dir="ltr" className="h-72" role="img" aria-label={t.topTitle}>
          {mounted && (
            <ChartContainer config={config} className="aspect-auto h-72 w-full">
              <BarChart data={data} layout="vertical" margin={{ top: 0, right: rtl ? 0 : 8, bottom: 0, left: rtl ? 8 : 0 }} barCategoryGap="22%" accessibilityLayer>
                <XAxis type="number" hide reversed={rtl} domain={[0, (max: number) => max * 1.25]} />
                <YAxis type="category" dataKey="name" orientation={rtl ? 'right' : 'left'} width={112} tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload, label }) => (
                    <div dir={dir}>
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        label={label}
                        hideIndicator
                        formatter={(value, _n, item) => (
                          <div className="grid flex-1 gap-1">
                            <span className="font-medium">{item.payload.name}</span>
                            <span className="font-medium tabular-nums">{money(Number(value))}</span>
                            <span className="text-muted-foreground">{units(item.payload.units)}</span>
                          </div>
                        )}
                      />
                    </div>
                  )}
                />
                <Bar dataKey="revenue" fill="var(--series-1)" radius={4} isAnimationActive={animate} animationDuration={drawMs}>
                  <LabelList dataKey="revenue" position={rtl ? 'left' : 'right'} offset={6} className="fill-foreground tabular-nums" fontSize={12} formatter={(v: unknown) => fmt.compact(Number(v))} />
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </div>
      )}
      table={
        <DataTable
          dir={dir}
          caption={t.topTitle}
          head={[t.topTitle, t.kpis.revenue]}
          rows={data.map((r) => [
            <>
              {r.name}
              <span className="block text-xs font-normal text-muted-foreground">{units(r.units)}</span>
            </>,
            money(r.revenue),
          ])}
        />
      }
    />
  );
}

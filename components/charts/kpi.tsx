'use client';

import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { TrendDownIcon, TrendUpIcon } from '@phosphor-icons/react';
import { Card, CardContent } from '@/registry/ui/card';
import { ChartContainer } from '@/registry/ui/chart';
import { Price } from '@/registry/ui/price';
import { cn } from '@/registry/lib/utils';
import type { Lang } from '@/lib/strings';
import { metrics, type Range, type Spark } from './data';
import { useFmt, type An, type Fmt } from './use-fmt';
import { useReveal } from './use-reveal';

const config = { v: { label: 'v', color: 'var(--series-1)' } };

// Domain never narrower than +-5% around the mean, so a flat series stays flat.
function domain(vals: number[]): [number, number] {
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  return [Math.min(...vals, mean * 0.95), Math.max(...vals, mean * 1.05)];
}

function Sparkline({ values, fmt }: { values: number[]; fmt: Fmt }) {
  const { ref, mounted, animate, drawMs } = useReveal();
  const data = values.map((v, i) => ({ i, v }));
  const last = data.length - 1;
  return (
    <div ref={ref} dir="ltr" aria-hidden="true" className="h-10">
      {mounted && (
        <ChartContainer config={config} className="aspect-auto h-10 w-full">
          <LineChart data={data} margin={{ top: 6, right: 6, bottom: 6, left: 6 }} accessibilityLayer={false}>
            <XAxis dataKey="i" hide reversed={fmt.rtl} />
            <YAxis hide domain={domain(values)} />
            <Line
              dataKey="v"
              type="monotone"
              stroke="var(--series-1)"
              strokeWidth={2}
              isAnimationActive={animate}
              animationDuration={drawMs}
              dot={({ cx, cy, index }) =>
                index === last ? (
                  <circle key={index} cx={cx} cy={cy} r={3.5} fill="var(--series-1)" stroke="var(--card)" strokeWidth={2} />
                ) : (
                  <g key={index} />
                )
              }
              activeDot={false}
            />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
}

function Delta({ value, label, rounded }: { value: number; label: string; rounded: number }) {
  const zero = rounded === 0;
  const up = value > 0;
  const Icon = up ? TrendUpIcon : TrendDownIcon;
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium tabular-nums', zero ? 'text-muted-foreground' : up ? 'text-success' : 'text-destructive')}>
      {!zero && <Icon weight="bold" aria-hidden="true" className="size-3.5" />}
      {label}
    </span>
  );
}

export function KpiCards({ lang, range, t, sparks }: { lang: Lang; range: Range; t: An; sparks: Spark }) {
  const fmt = useFmt(lang);
  const { cur, prev } = metrics(range);
  const { currency, digits } = fmt;
  const rel = (c: number, p: number) => {
    const d = c / p - 1;
    return <Delta value={d} rounded={Math.round(d * 1000)} label={fmt.signedPct(d)} />;
  };
  const dConv = cur.conv - prev.conv;
  const items = [
    { key: 'revenue', label: t.kpis.revenue, value: <Price amount={cur.rev} currency={currency} lang={lang} digits={digits} />, delta: rel(cur.rev, prev.rev) },
    { key: 'orders', label: t.kpis.orders, value: fmt.num(cur.orders), delta: rel(cur.orders, prev.orders) },
    {
      key: 'conversion',
      label: t.kpis.conversion,
      value: fmt.pct(cur.conv, 2),
      delta: <Delta value={dConv} rounded={Math.round(dConv * 1e4)} label={`${fmt.signedPts(dConv)} ${t.pp}`} />,
    },
    { key: 'aov', label: t.kpis.aov, value: <Price amount={cur.aov} currency={currency} lang={lang} digits={digits} decimals />, delta: rel(cur.aov, prev.aov) },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 xl:grid-cols-4">
      {items.map((k) => (
        <Card key={k.key} size="sm">
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">{k.label}</p>
              {k.delta}
            </div>
            <p className="text-2xl font-semibold tabular-nums">{k.value}</p>
            <Sparkline values={sparks[k.key]} fmt={fmt} />
            <p className="text-xs text-muted-foreground">{t.vsPrev}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

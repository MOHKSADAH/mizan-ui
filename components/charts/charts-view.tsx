'use client';

import * as React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group';
import type { Lang } from '@/lib/strings';
import { sparkData, type Range } from './data';
import { useFmt, type An } from './use-fmt';
import { KpiCards } from './kpi';
import { AreaCard } from './area-chart';
import { PaymentsCard } from './payments';
import { OrdersCard } from './orders-chart';
import { TopProductsCard } from './top-products';
import { FunnelCard } from './funnel';

const RANGES = [7, 30, 90] as const;

export function ChartsView({ lang, t }: { lang: Lang; t: An }) {
  const [range, setRange] = React.useState<Range>(30);
  const fmt = useFmt(lang);
  const sparks = React.useMemo(() => sparkData(range), [range]);
  const label = { 7: t.r7, 30: t.r30, 90: t.r90 };

  return (
    <div className="grid min-w-0 gap-6">
      <ToggleGroup
        aria-label={t.range}
        variant="outline"
        spacing={1}
        value={[String(range)]}
        onValueChange={(v) => v[0] && setRange(Number(v[0]) as Range)}
      >
        {RANGES.map((r) => (
          <ToggleGroupItem key={r} value={String(r)} className="aria-pressed:border-field-border aria-pressed:font-semibold">
            {fmt.tx(label[r])}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <KpiCards lang={lang} range={range} t={t} sparks={sparks} />
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <AreaCard lang={lang} range={range} t={t} />
        <PaymentsCard lang={lang} range={range} t={t} />
        <OrdersCard lang={lang} t={t} />
        <TopProductsCard lang={lang} range={range} t={t} />
      </div>
      <FunnelCard lang={lang} range={range} t={t} />
    </div>
  );
}

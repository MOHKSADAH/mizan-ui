'use client';

import * as React from 'react';
import { YAxis } from 'recharts';
import { formatCompact, type Lang } from '@/registry/lib/format';

// Recharts parts are client components: re-export them so the server example can compose them.
export { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts';

// The tick formatter is a function, so it lives here. In RTL the axis moves to the inline end.
export function CompactYAxis({ lang }: { lang: Lang }) {
  return (
    <YAxis
      orientation={lang === 'ar' ? 'right' : 'left'}
      tickLine={false}
      axisLine={false}
      width={lang === 'ar' ? 64 : 44}
      tickFormatter={(value: number) => formatCompact(value, { lang })}
    />
  );
}

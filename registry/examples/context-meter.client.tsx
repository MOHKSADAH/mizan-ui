'use client';

import { ContextMeter, contextMeterLabelsAr, type ContextUsage } from '@/registry/ui/context-meter';
import type { ExampleProps } from '@/registry/examples/types';

const USAGE: Record<'en' | 'ar', ContextUsage[]> = {
  en: [
    { id: 'input', label: 'Input', tokens: 98400, cost: 0.2952 },
    { id: 'output', label: 'Output', tokens: 21300, cost: 0.3195 },
    { id: 'cached', label: 'Cached', tokens: 14200, cost: 0.0043 },
  ],
  ar: [
    { id: 'input', label: 'المدخلات', tokens: 98400, cost: 0.2952 },
    { id: 'output', label: 'المخرجات', tokens: 21300, cost: 0.3195 },
    { id: 'cached', label: 'المخزّنة مؤقتًا', tokens: 14200, cost: 0.0043 },
  ],
};

export function ContextMeterDemo({ lang, used = 133900 }: ExampleProps & { used?: number }) {
  return (
    <ContextMeter
      used={used}
      max={200000}
      usage={USAGE[lang]}
      lang={lang}
      labels={lang === 'ar' ? contextMeterLabelsAr : undefined}
    />
  );
}

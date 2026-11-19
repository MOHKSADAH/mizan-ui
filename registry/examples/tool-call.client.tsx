'use client';

import { ToolCall, toolCallLabelsAr } from '@/registry/ui/tool-call';
import type { ExampleProps } from '@/registry/examples/types';

const INPUT = { period: 'last_7_days', compare: true, currency: 'SAR' };
const OUTPUT = { total: 48320, orders: 164, average_cart: 294.6 };

export function ToolCallStates({ lang }: ExampleProps) {
  const labels = lang === 'ar' ? toolCallLabelsAr : undefined;
  return (
    <div className="grid w-full max-w-md gap-2">
      <ToolCall name="get_sales_report" state="input-streaming" input={'{ "period": "last_7_'} labels={labels} defaultOpen />
      <ToolCall name="get_sales_report" state="running" input={INPUT} labels={labels} />
      <ToolCall name="get_sales_report" state="done" input={INPUT} output={OUTPUT} labels={labels} defaultOpen />
      <ToolCall
        name="get_sales_report"
        state="error"
        input={INPUT}
        errorText="403: the store token has no access to reports."
        labels={labels}
      />
    </div>
  );
}

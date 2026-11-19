'use client';

import * as React from 'react';
import { Reasoning, reasoningLabelsAr } from '@/registry/ui/reasoning';
import type { ExampleProps } from '@/registry/examples/types';

const TEXT = {
  en: 'I need the sales of the last 7 days and the week before.\n\nI will pull the report from the store, then rank the products by revenue.',
  ar: 'أحتاج مبيعات آخر 7 أيام ومقارنتها بالأسبوع السابق.\n\nسأجلب التقرير من المتجر ثم أرتّب المنتجات حسب الإيراد.',
};

export function ReasoningDone({ lang }: ExampleProps) {
  return (
    <Reasoning className="max-w-md" duration={4} labels={lang === 'ar' ? reasoningLabelsAr : undefined}>
      {TEXT[lang]}
    </Reasoning>
  );
}

// The thinking phase lasts three seconds. When it ends the panel closes by itself.
export function ReasoningLive({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const [status, setStatus] = React.useState<'running' | 'done'>('running');
  React.useEffect(() => {
    if (status !== 'running') return;
    const timer = setTimeout(() => setStatus('done'), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="grid max-w-md gap-3">
      <Reasoning status={status} duration={3} labels={ar ? reasoningLabelsAr : undefined}>
        {TEXT[lang]}
      </Reasoning>
      <button
        type="button"
        className="w-fit text-sm text-primary underline underline-offset-4"
        onClick={() => setStatus('running')}
      >
        {ar ? 'إعادة التشغيل' : 'Run again'}
      </button>
    </div>
  );
}

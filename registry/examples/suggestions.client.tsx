'use client';

import * as React from 'react';
import { ChartLineUpIcon, PackageIcon, ReceiptIcon } from '@phosphor-icons/react';
import { PromptInput, promptInputLabelsAr } from '@/registry/ui/prompt-input';
import { Suggestions, suggestionsLabelsAr, type Suggestion } from '@/registry/ui/suggestions';
import type { ExampleProps } from '@/registry/examples/types';

const ITEMS: Record<'en' | 'ar', Suggestion[]> = {
  en: [
    { label: 'Summarize this week sales', icon: <ChartLineUpIcon data-icon="inline-start" /> },
    { label: 'Which products are almost out of stock?', icon: <PackageIcon data-icon="inline-start" /> },
    { label: 'Draft a reply to a late order', icon: <ReceiptIcon data-icon="inline-start" /> },
  ],
  ar: [
    { label: 'لخّص مبيعات الأسبوع', icon: <ChartLineUpIcon data-icon="inline-start" /> },
    { label: 'أي المنتجات أوشكت على النفاد؟', icon: <PackageIcon data-icon="inline-start" /> },
    { label: 'اكتب ردًا على عميل تأخّر طلبه', icon: <ReceiptIcon data-icon="inline-start" /> },
  ],
};

// A chip fills the input and moves the focus there. It never sends.
export function SuggestionsDemo({ lang, layout }: ExampleProps & { layout?: 'wrap' | 'scroll' }) {
  const ar = lang === 'ar';
  const [value, setValue] = React.useState('');
  const input = React.useRef<HTMLTextAreaElement>(null);
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Suggestions
        suggestions={ITEMS[lang]}
        layout={layout}
        labels={ar ? suggestionsLabelsAr : undefined}
        onSelect={(prompt) => {
          setValue(prompt);
          input.current?.focus();
        }}
      />
      <PromptInput
        value={value}
        onValueChange={setValue}
        textareaRef={input}
        labels={ar ? promptInputLabelsAr : undefined}
        onSubmit={() => setValue('')}
      />
    </div>
  );
}

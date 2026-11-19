'use client';

import * as React from 'react';
import { GlobeIcon, PaperclipIcon } from '@phosphor-icons/react';
import { Button } from '@/registry/ui/button';
import { ModelPicker, modelPickerLabelsAr, type Model } from '@/registry/ui/model-picker';
import {
  PromptInput,
  promptInputLabelsAr,
  type PromptInputAttachment,
  type PromptInputStatus,
} from '@/registry/ui/prompt-input';
import type { ExampleProps } from '@/registry/examples/types';

const MODELS: Model[] = [
  { id: 'lite', name: 'Mizan Lite', provider: 'Mizan', context: 128000, price: { input: 0.15, output: 0.6 } },
  { id: 'pro', name: 'Mizan Pro', provider: 'Mizan', context: 200000, price: { input: 3, output: 15 } },
];

const FILE: Record<'en' | 'ar', PromptInputAttachment> = {
  en: { id: 'f1', name: 'weekly-orders.csv', description: '48 KB' },
  ar: { id: 'f1', name: 'طلبات-الأسبوع.csv', description: '48 KB' },
};

// Sending starts a fake stream for two seconds: the send button turns into stop.
export function PromptInputDemo({ lang, withTools = false }: ExampleProps & { withTools?: boolean }) {
  const ar = lang === 'ar';
  const [value, setValue] = React.useState('');
  const [files, setFiles] = React.useState<PromptInputAttachment[]>(withTools ? [FILE[lang]] : []);
  const [status, setStatus] = React.useState<PromptInputStatus>('ready');
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="w-full max-w-xl">
      <PromptInput
        value={value}
        onValueChange={setValue}
        status={status}
        attachments={files}
        onRemoveAttachment={(id) => setFiles((current) => current.filter((file) => file.id !== id))}
        labels={ar ? promptInputLabelsAr : undefined}
        placeholder={ar ? 'اسأل عن مبيعاتك أو طلباتك' : 'Ask about your sales or orders'}
        onSubmit={() => {
          setValue('');
          setFiles([]);
          setStatus('streaming');
          timer.current = setTimeout(() => setStatus('ready'), 2000);
        }}
        onStop={() => {
          clearTimeout(timer.current);
          setStatus('ready');
        }}
        tools={
          withTools ? (
            <>
              <Button variant="ghost" size="icon-sm" aria-label={ar ? 'إرفاق ملف' : 'Attach a file'}>
                <PaperclipIcon />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <GlobeIcon data-icon="inline-start" />
                {ar ? 'بحث' : 'Search'}
              </Button>
            </>
          ) : undefined
        }
        model={
          withTools ? (
            <ModelPicker models={MODELS} lang={lang} labels={ar ? modelPickerLabelsAr : undefined} />
          ) : undefined
        }
      />
    </div>
  );
}

'use client';

import * as React from 'react';
import { ModelPicker, modelPickerLabelsAr, type Model } from '@/registry/ui/model-picker';
import type { ExampleProps } from '@/registry/examples/types';

const MODELS: Record<'en' | 'ar', Model[]> = {
  en: [
    { id: 'lite', name: 'Mizan Lite', provider: 'Mizan', context: 128000, price: { input: 0.15, output: 0.6 } },
    { id: 'pro', name: 'Mizan Pro', provider: 'Mizan', context: 200000, price: { input: 3, output: 15 } },
    { id: 'atlas', name: 'Atlas 70B', provider: 'Open weights', context: 128000, price: { input: 0.9, output: 0.9 } },
    { id: 'noor', name: 'Noor Mini', provider: 'Open weights', context: 32000, price: { input: 0.05, output: 0.2 } },
  ],
  ar: [
    { id: 'lite', name: 'Mizan Lite', provider: 'ميزان', context: 128000, price: { input: 0.15, output: 0.6 } },
    { id: 'pro', name: 'Mizan Pro', provider: 'ميزان', context: 200000, price: { input: 3, output: 15 } },
    { id: 'atlas', name: 'Atlas 70B', provider: 'نماذج مفتوحة', context: 128000, price: { input: 0.9, output: 0.9 } },
    { id: 'noor', name: 'Noor Mini', provider: 'نماذج مفتوحة', context: 32000, price: { input: 0.05, output: 0.2 } },
  ],
};

export function ModelPickerDemo({ lang }: ExampleProps) {
  const [value, setValue] = React.useState('pro');
  return (
    <ModelPicker
      models={MODELS[lang]}
      value={value}
      onValueChange={setValue}
      lang={lang}
      labels={lang === 'ar' ? modelPickerLabelsAr : undefined}
    />
  );
}

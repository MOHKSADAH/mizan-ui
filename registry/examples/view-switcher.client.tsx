'use client';

import * as React from 'react';
import { ImageIcon } from '@phosphor-icons/react';
import { ViewItems, ViewSwitcher, viewSwitcherLabelsAr, type ViewMode } from '@/registry/ui/view-switcher';
import { Card } from '@/registry/ui/card';
import { Price } from '@/registry/ui/price';
import type { ExampleProps } from '@/registry/examples/types';

const products = [
  { id: 'sukkari', en: 'Sukkari dates, 1 kg', ar: 'تمر سكري، ١ كجم', price: 85 },
  { id: 'coffee', en: 'Saudi coffee with cardamom', ar: 'قهوة سعودية بالهيل', price: 64 },
  { id: 'oud', en: 'Royal oud perfume', ar: 'عطر عود ملكي', price: 650 },
  { id: 'incense', en: 'Maamoul incense', ar: 'بخور معمول', price: 120 },
  { id: 'dallah', en: 'Brass dallah, medium', ar: 'دلة نحاسية وسط', price: 240 },
  { id: 'honey', en: 'Sidr honey, 500 g', ar: 'عسل سدر، ٥٠٠ جم', price: 190 },
];

const thumb = (
  <span aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon weight="duotone" className="size-8" />
  </span>
);

export function ViewSwitcherDemo({ lang, defaultView = 'list' }: ExampleProps & { defaultView?: ViewMode }) {
  const ar = lang === 'ar';
  const [view, setView] = React.useState<ViewMode>(defaultView);
  return (
    <div className="grid w-full max-w-3xl gap-4">
      <div className="flex justify-end">
        <ViewSwitcher value={view} onValueChange={setView} labels={ar ? viewSwitcherLabelsAr : undefined} />
      </div>
      <ViewItems view={view} items={products} getKey={(p) => p.id}>
        {(p, v) => {
          const name = ar ? p.ar : p.en;
          if (v === 'grid') {
            return (
              <Card className="h-full gap-0 py-0">
                <div className="aspect-[4/3] w-full">{thumb}</div>
                <div className="grid gap-1 p-3">
                  <span className="font-medium">{name}</span>
                  <Price amount={p.price} lang={lang} />
                </div>
              </Card>
            );
          }
          if (v === 'compact') {
            return (
              <div className="flex items-center justify-between gap-3 border-b px-1 py-1.5 text-sm">
                <span>{name}</span>
                <Price amount={p.price} lang={lang} className="text-muted-foreground" />
              </div>
            );
          }
          return (
            <Card className="flex-row items-center gap-3 py-0 pe-4">
              <div className="size-16 shrink-0 overflow-hidden">{thumb}</div>
              <span className="flex-1 font-medium">{name}</span>
              <Price amount={p.price} lang={lang} />
            </Card>
          );
        }}
      </ViewItems>
    </div>
  );
}

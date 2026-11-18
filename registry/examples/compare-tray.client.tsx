'use client';

import * as React from 'react';
import { CompareTray, compareTrayLabelsAr, type CompareItem } from '@/registry/ui/compare-tray';
import type { ExampleProps } from '@/registry/examples/types';

const swatch = (lightness: number) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect width="8" height="8" fill="oklch(${lightness} 0.02 250)"/></svg>`)}`;

export function CompareTrayDemo({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const [items, setItems] = React.useState<CompareItem[]>([
    { id: 'a', name: ar ? 'هاتف ألفا' : 'Alpha phone', image: swatch(0.85) },
    { id: 'b', name: ar ? 'هاتف بيتا' : 'Beta phone', image: swatch(0.75) },
  ]);
  return (
    <div className="w-full max-w-2xl">
      <CompareTray
        className="rounded-xl"
        items={items}
        lang={lang}
        labels={ar ? compareTrayLabelsAr : undefined}
        onRemove={(id) => setItems((all) => all.filter((item) => item.id !== id))}
        onClear={() => setItems([])}
        onCompare={() => {}}
      />
    </div>
  );
}

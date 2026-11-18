'use client';

import * as React from 'react';
import { FilterChips, filterChipsLabelsAr, type FilterChip } from '@/registry/ui/filter-chips';
import type { ExampleProps } from '@/registry/examples/types';

const initial = (lang: ExampleProps['lang']): FilterChip[] => [
  { id: 'color', label: lang === 'ar' ? 'اللون: أحمر' : 'Color: Red' },
  { id: 'size', label: lang === 'ar' ? 'المقاس: M' : 'Size: M' },
  { id: 'price', label: lang === 'ar' ? 'السعر: حتى 200' : 'Price: up to 200' },
  { id: 'brand', label: lang === 'ar' ? 'العلامة: ميزان' : 'Brand: Mizan' },
  { id: 'ship', label: lang === 'ar' ? 'شحن مجاني' : 'Free shipping' },
];

export function FilterChipsDemo({ lang }: ExampleProps) {
  const [filters, setFilters] = React.useState(() => initial(lang));
  return (
    <div className="w-full max-w-sm">
      <FilterChips
        lang={lang}
        labels={lang === 'ar' ? filterChipsLabelsAr : undefined}
        filters={filters}
        resultCount={Math.max(0, 240 - filters.length * 37)}
        onRemove={(id) => setFilters((all) => all.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
      />
    </div>
  );
}

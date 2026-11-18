'use client';

import * as React from 'react';
import { Carousel, type CarouselApi, type CarouselLabels } from '@/registry/ui/carousel';
import { formatNumber, type Lang } from '@/registry/lib/format';

// Tracks the selected slide with setApi and announces it politely.
export function CarouselWithCounter({
  lang,
  labels,
  children,
}: {
  lang: Lang;
  labels?: Partial<CarouselLabels>;
  children: React.ReactNode;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const sync = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    sync();
    api.on('select', sync).on('reInit', sync);
    return () => {
      api.off('select', sync).off('reInit', sync);
    };
  }, [api]);

  const locale = { lang };
  const text =
    lang === 'ar'
      ? `الشريحة ${formatNumber(current, locale)} من ${formatNumber(count, locale)}`
      : `Slide ${current} of ${count}`;

  return (
    <div className="grid gap-3">
      <Carousel setApi={setApi} labels={labels} className="w-full">
        {children}
      </Carousel>
      <p aria-live="polite" className="text-center text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

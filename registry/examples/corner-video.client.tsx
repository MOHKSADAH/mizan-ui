'use client';

import * as React from 'react';
import { CornerVideo, cornerVideoLabelsAr } from '@/registry/ui/corner-video';
import { Button } from '@/registry/ui/button';
import type { ExampleProps } from '@/registry/examples/types';

// Docked inside a frame (absolute) so the demo does not cover the docs page. The button brings the card back after Close.
export function CornerVideoDemo({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const [open, setOpen] = React.useState(true);
  return (
    <div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border bg-background">
      {!open && (
        <Button variant="outline" className="m-3" onClick={() => setOpen(true)}>
          {ar ? 'إظهار الفيديو' : 'Show the video'}
        </Button>
      )}
      <CornerVideo
        className="absolute end-3 bottom-3"
        open={open}
        onClose={() => setOpen(false)}
        title={ar ? 'جولة في متجرنا بالرياض' : 'Tour of our Riyadh store'}
        description={ar ? 'نعرض لك الفرع والمنتجات في دقيقتين.' : 'The branch and the products in two minutes.'}
        labels={ar ? cornerVideoLabelsAr : undefined}
      />
    </div>
  );
}

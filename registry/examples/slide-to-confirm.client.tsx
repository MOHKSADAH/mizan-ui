'use client';

import * as React from 'react';
import { SlideToConfirm, slideToConfirmLabelsAr } from '@/registry/ui/slide-to-confirm';
import { Button } from '@/registry/ui/button';
import type { ExampleProps } from '@/registry/examples/types';

// The demo confirms after a short wait, as a payment call would, and can be reset to try again.
export function SlideToConfirmDemo({ lang, fallbackButton }: ExampleProps & { fallbackButton?: boolean }) {
  const ar = lang === 'ar';
  const [round, setRound] = React.useState(0);
  const [done, setDone] = React.useState(false);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <SlideToConfirm
        key={round}
        fallbackButton={fallbackButton}
        labels={
          ar
            ? { ...slideToConfirmLabelsAr, track: 'اسحب لدفع ٣٤٩ ر.س', button: 'ادفع بدون سحب' }
            : { track: 'Slide to pay SAR 349', button: 'Pay without sliding' }
        }
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 700)).then(() => setDone(true))}
      />
      {done && (
        <Button
          variant="ghost"
          onClick={() => {
            setDone(false);
            setRound((n) => n + 1);
          }}
        >
          {ar ? 'إعادة التجربة' : 'Try again'}
        </Button>
      )}
    </div>
  );
}

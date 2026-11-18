'use client';

import * as React from 'react';
import { QuantityStepper, quantityStepperLabelsAr } from '@/registry/ui/quantity-stepper';
import type { ExampleProps } from '@/registry/examples/types';

export function RemovableDemo({ lang }: ExampleProps) {
  const [removed, setRemoved] = React.useState(false);
  if (removed) {
    return (
      <button className="text-sm underline" onClick={() => setRemoved(false)}>
        {lang === 'ar' ? 'تمت الإزالة. تراجع' : 'Removed. Undo'}
      </button>
    );
  }
  return (
    <QuantityStepper
      lang={lang}
      labels={lang === 'ar' ? quantityStepperLabelsAr : undefined}
      defaultValue={1}
      onRemove={() => setRemoved(true)}
    />
  );
}

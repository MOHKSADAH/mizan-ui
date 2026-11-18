'use client';

import * as React from 'react';
import { CouponInput, couponInputLabelsAr, type CouponStatus } from '@/registry/ui/coupon-input';
import type { ExampleProps } from '@/registry/examples/types';

export function CouponInputDemo({ lang }: ExampleProps) {
  const [status, setStatus] = React.useState<CouponStatus>('idle');
  const [applied, setApplied] = React.useState<string>();
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="w-full max-w-sm">
      <CouponInput
        status={status}
        appliedCode={applied}
        labels={lang === 'ar' ? couponInputLabelsAr : undefined}
        message={
          status === 'error' ? (lang === 'ar' ? 'جرّب RAMADAN20' : 'Try RAMADAN20') : undefined
        }
        onApply={(code) => {
          setStatus('pending');
          timer.current = setTimeout(() => {
            if (code.toUpperCase() === 'RAMADAN20') {
              setApplied(code.toUpperCase());
              setStatus('success');
            } else setStatus('error');
          }, 800);
        }}
        onRemove={() => {
          setApplied(undefined);
          setStatus('idle');
        }}
      />
    </div>
  );
}

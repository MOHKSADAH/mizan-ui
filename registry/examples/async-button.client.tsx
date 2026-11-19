'use client';

import { AsyncButton, asyncButtonLabelsAr } from '@/registry/ui/async-button';
import type { ExampleProps } from '@/registry/examples/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function AsyncButtonDemo({ lang, fail }: ExampleProps & { fail?: boolean }) {
  const ar = lang === 'ar';
  return (
    <AsyncButton
      labels={ar ? asyncButtonLabelsAr : undefined}
      onAction={async () => {
        await wait(1200);
        if (fail) throw new Error('failed');
      }}
    >
      {ar ? 'حفظ التغييرات' : 'Save changes'}
    </AsyncButton>
  );
}

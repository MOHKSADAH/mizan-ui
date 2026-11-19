'use client';

import * as React from 'react';
import { Button } from '@/registry/ui/button';
import { UndoButton, undoButtonLabelsAr } from '@/registry/ui/undo-button';
import type { ExampleProps } from '@/registry/examples/types';

export function UndoButtonDemo({ lang, seconds }: ExampleProps & { seconds?: number }) {
  const ar = lang === 'ar';
  const [round, setRound] = React.useState(0);
  const [deleted, setDeleted] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <UndoButton
        key={round}
        lang={lang}
        seconds={seconds}
        labels={ar ? undoButtonLabelsAr : undefined}
        onConfirm={() => setDeleted(true)}
      >
        {ar ? 'حذف الحساب' : 'Delete account'}
      </UndoButton>
      {deleted ? (
        <Button
          variant="ghost"
          onClick={() => {
            setDeleted(false);
            setRound((n) => n + 1);
          }}
        >
          {ar ? 'إعادة التجربة' : 'Try again'}
        </Button>
      ) : null}
    </div>
  );
}

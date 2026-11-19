'use client';

import * as React from 'react';
import { MessageActions, messageActionsLabelsAr, type Feedback } from '@/registry/ui/message-actions';
import type { ExampleProps } from '@/registry/examples/types';

export function MessageActionsDemo({ lang }: ExampleProps) {
  const [feedback, setFeedback] = React.useState<Feedback | null>(null);
  const [index, setIndex] = React.useState(1);
  return (
    <MessageActions
      text={lang === 'ar' ? 'بلغت مبيعات الأسبوع 48,320 ر.س' : 'This week sales reached SAR 48,320'}
      onRegenerate={() => setIndex((i) => Math.min(i + 1, 3))}
      feedback={feedback}
      onFeedback={setFeedback}
      branch={{ index, count: 3 }}
      onBranchChange={setIndex}
      labels={lang === 'ar' ? messageActionsLabelsAr : undefined}
    />
  );
}

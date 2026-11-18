'use client';

import * as React from 'react';
import { Questionnaire, QuestionnaireProgress } from '@/registry/ui/questionnaire';
import type { ExampleProps } from '@/registry/examples/types';

// Examples submit nowhere: reset the form so the demo returns to the first question.
export function QuestionnaireForm(props: React.ComponentProps<typeof Questionnaire>) {
  return (
    <Questionnaire
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
      }}
      {...props}
    />
  );
}

export function LocalizedProgress({ lang }: ExampleProps) {
  return (
    <QuestionnaireProgress
      render={(props, state) => {
        const text = lang === 'ar' ? `السؤال ${state.current} من ${state.total}` : `Question ${state.current} of ${state.total}`;
        return (
          <div {...props} aria-label={lang === 'ar' ? 'تقدم الاستبيان' : 'Questionnaire progress'} aria-valuetext={text}>
            {text}
          </div>
        );
      }}
    />
  );
}

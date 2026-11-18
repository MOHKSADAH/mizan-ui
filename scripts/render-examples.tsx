import type * as React from 'react';
import { renderToString } from 'react-dom/server';
import type { ExampleDoc, ExampleProps } from '../registry/examples/types';

type ExampleModule = { doc: ExampleDoc } & Record<string, unknown>;

// Smoke test helper: renders every example of a docs module in en and ar, and returns the HTML.
export function renderExamples(mod: ExampleModule) {
  return (['en', 'ar'] as const).flatMap((lang) =>
    Object.keys(mod.doc.examples).map((name) =>
      renderToString((mod[name] as (props: ExampleProps) => React.ReactNode)({ lang })),
    ),
  );
}

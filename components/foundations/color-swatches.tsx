'use client';

import * as React from 'react';

const TOKENS = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
  'accent', 'accent-foreground', 'destructive', 'border', 'input', 'ring', 'field-border',
  'success', 'warning', 'info', 'series-1', 'series-2', 'series-3', 'series-4', 'series-5',
];

const read = () => {
  const css = getComputedStyle(document.documentElement);
  return TOKENS.map((t) => css.getPropertyValue(`--${t}`).trim()).join('|');
};

// Theme, mode, font and fine tuning all change attributes on <html>, so one observer covers them.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
  return () => observer.disconnect();
}

export function ColorSwatches() {
  const values = React.useSyncExternalStore(subscribe, read, () => '').split('|');
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {TOKENS.map((t, i) => (
        <li key={t} className="grid min-w-0 gap-2">
          <div className="h-12 rounded-md border" style={{ background: `var(--${t})` }} aria-hidden="true" />
          <span dir="ltr" className="truncate text-sm font-medium">
            {t}
          </span>
          <code dir="ltr" title={values[i]} className="block min-h-5 truncate rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            {values[i]}
          </code>
        </li>
      ))}
    </ul>
  );
}

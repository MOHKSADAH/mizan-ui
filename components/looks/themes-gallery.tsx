'use client';

import type { CSSProperties } from 'react';
import { CheckIcon, WarningIcon } from '@phosphor-icons/react';
import { cn } from '@/registry/lib/utils';
import { themes } from '@/lib/settings';
import { SITE, type Lang } from '@/lib/strings';
import aa from '@/lib/themes/aa.json';
import { useSettings } from '@/components/settings';
import { Swatches } from '@/components/theme-combobox';

const GROUPS = ['mizan', 'shadcn-base', 'shadcn-accent', 'tweakcn'] as const;

// Tokens of one theme for each mode, as inline CSS variables, so a card shows that theme whatever the page uses.
export type ThemePreviews = Record<string, { light: CSSProperties; dark: CSSProperties }>;

const failsIn = (id: string, mode: 'light' | 'dark') =>
  (aa as Record<string, Record<'light' | 'dark', string[]>>)[id]?.[mode]?.length > 0;

function Preview({ style, className }: { style: CSSProperties; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn('flex items-center gap-2 rounded-lg border bg-background p-3 text-foreground', className)}
    >
      <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">Aa</span>
      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">Tag</span>
      <span className="ms-auto size-3 rounded-full bg-accent ring-1 ring-border" />
    </span>
  );
}

export function ThemesGallery({ lang, previews }: { lang: Lang; previews: ThemePreviews }) {
  const t = SITE[lang];
  const { theme, update } = useSettings();
  return (
    <div className="grid grid-cols-1 gap-10">
      {GROUPS.map((group) => (
        <section key={group} aria-labelledby={`themes-${group}`} className="grid grid-cols-1 gap-4">
          <h2 id={`themes-${group}`} className="text-lg font-semibold">
            {t.themeGroups[group]}
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
            {themes
              .filter((x) => x.group === group)
              .map((x) => {
                const flag = (mode: 'light' | 'dark') =>
                  failsIn(x.id, mode) && (
                    <span role="img" aria-label={t.failsAA} title={t.failsAA} className={cn('items-center', mode === 'light' ? 'flex dark:hidden' : 'hidden dark:flex')}>
                      <WarningIcon weight="fill" aria-hidden="true" className="size-4 text-warning" />
                    </span>
                  );
                return (
                  <li key={x.id}>
                    <button
                      type="button"
                      aria-pressed={theme === x.id}
                      onClick={() => update({ theme: x.id })}
                      className="grid grid-cols-1 w-full gap-3 rounded-xl border p-3 text-start outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-field-border aria-pressed:ring-1 aria-pressed:ring-field-border"
                    >
                      <span className="flex items-center gap-2">
                        <Swatches theme={x} />
                        <span className="min-w-0 flex-1 truncate font-medium">{x.name}</span>
                        {flag('light')}
                        {flag('dark')}
                        {theme === x.id && <CheckIcon weight="bold" aria-hidden="true" className="size-4" />}
                      </span>
                      <Preview style={previews[x.id].light} className="dark:hidden" />
                      <Preview style={previews[x.id].dark} className="hidden dark:flex" />
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}

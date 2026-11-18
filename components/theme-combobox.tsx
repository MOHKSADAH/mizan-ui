'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { CaretDownIcon, MagnifyingGlassIcon, WarningIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from '@/registry/ui/combobox';
import { Button } from '@/registry/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/ui/tooltip';
import { cn } from '@/registry/lib/utils';
import { themes, themeById, type ThemeMeta } from '@/lib/settings';
import { CH, SITE, type Lang } from '@/lib/strings';
import { aaOf, useSettings } from '@/components/settings';

const AA_LABEL = {
  en: 'Fails WCAG AA contrast in this mode',
  ar: 'لا يحقق تباين WCAG AA في هذا الوضع',
};

const GROUPS = ['mizan', 'shadcn-base', 'shadcn-accent', 'tweakcn'] as const;

// Three-swatch preview: primary, secondary, background, for the current mode.
export function Swatches({ theme, className }: { theme: ThemeMeta; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('flex shrink-0 -space-x-1', className)}>
      {(['light', 'dark'] as const).map((mode) =>
        theme.swatches[mode].map((c, i) => (
          <span
            key={mode + i}
            className={cn(
              'size-3.5 rounded-full ring-1 ring-foreground/20',
              mode === 'light' ? 'dark:hidden' : 'hidden dark:block',
            )}
            style={{ background: c }}
          />
        )),
      )}
    </span>
  );
}

export function ThemeCombobox({ lang, className }: { lang: Lang; className?: string }) {
  const t = SITE[lang];
  const c = CH[lang];
  const { theme, update } = useSettings();
  const mode = useTheme().resolvedTheme === 'dark' ? 'dark' : 'light';
  const current = themeById[theme] ?? themes[0];
  const groups = React.useMemo(
    () => GROUPS.map((g) => ({ value: t.themeGroups[g], items: themes.filter((x) => x.group === g) })),
    [t],
  );

  return (
    <Combobox
      items={groups}
      value={current}
      onValueChange={(v) => v && update({ theme: (v as ThemeMeta).id })}
      itemToStringLabel={(v: ThemeMeta) => v.name}
      isItemEqualToValue={(a: ThemeMeta, b: ThemeMeta) => a.id === b.id}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <ComboboxPrimitive.Trigger
              render={<Button variant="outline" size="lg" className={cn('max-w-44 gap-2 px-2 sm:px-2.5', className)} />}
              aria-label={`${c.theme}: ${current.name}`}
            />
          }
        >
          <Swatches theme={current} />
          <span data-slot="theme-label" className="hidden truncate sm:inline">{current.name}</span>
          <CaretDownIcon data-slot="theme-label" className="hidden size-3.5 text-muted-foreground sm:block" />
        </TooltipTrigger>
        <TooltipContent>{c.theme}</TooltipContent>
      </Tooltip>
      <ComboboxContent align="end" className="w-80 max-w-[calc(100vw-1.5rem)]">
        <div className="flex items-center gap-2 border-b px-2.5">
          <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" />
          <ComboboxPrimitive.Input
            placeholder={c.search}
            aria-label={c.search}
            className="h-9 w-full bg-transparent text-sm outline-offset-[-2px] placeholder:text-muted-foreground"
          />
        </div>
        <ComboboxEmpty>{c.noResults}</ComboboxEmpty>
        <ComboboxList className="max-h-80 [scrollbar-width:thin]">
          {(group: (typeof groups)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: ThemeMeta) => (
                  <ComboboxItem key={item.id} value={item}>
                    <Swatches theme={item} />
                    <span className="truncate">{item.name}</span>
                    {aaOf(item.id, mode).length > 0 && (
                      <span role="img" aria-label={AA_LABEL[lang]} title={AA_LABEL[lang]} className="ms-auto flex">
                        <WarningIcon aria-hidden="true" className="size-4 text-warning" />
                      </span>
                    )}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

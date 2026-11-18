'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { Button } from '@/registry/ui/button';
import { Kbd } from '@/registry/ui/kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/ui/tooltip';
import { CH, type Lang } from '@/lib/strings';
import { withViewTransition } from '@/components/settings';
import { useReducedMotion } from '@/components/use-reduced-motion';

const noop = () => () => {};

export function ModeToggle({ lang }: { lang: Lang }) {
  const c = CH[lang];
  const { resolvedTheme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  // The mode is unknown on the server, so the label waits for hydration to avoid a mismatch.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const dark = resolvedTheme === 'dark';
  const label = !mounted ? c.mode : dark ? c.toLight : c.toDark;

  // The class flips inside the view transition; next-themes then stores the choice.
  const toggle = () =>
    withViewTransition(() => {
      document.documentElement.classList.toggle('dark', !dark);
      document.documentElement.style.colorScheme = dark ? 'light' : 'dark';
      setTheme(dark ? 'light' : 'dark');
    }, reduced);

  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="ghost" size="icon-lg" aria-label={label} onClick={toggle} className="relative" />}
      >
        <SunIcon className="absolute size-5 scale-60 -rotate-90 opacity-0 transition-[opacity,scale,rotate] duration-200 ease-out dark:scale-100 dark:rotate-0 dark:opacity-100" />
        <MoonIcon className="absolute size-5 transition-[opacity,scale,rotate] duration-200 ease-out dark:scale-60 dark:rotate-90 dark:opacity-0" />
      </TooltipTrigger>
      <TooltipContent>
        {label} <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}

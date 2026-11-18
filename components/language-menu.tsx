'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { CheckIcon, GlobeIcon } from '@phosphor-icons/react';
import { Button } from '@/registry/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/ui/tooltip';
import { localePath, stripLocale } from '@/lib/nav';
import { CH, type Lang } from '@/lib/strings';
import { useReducedMotion } from '@/components/use-reduced-motion';

const LANGS: { lang: Lang; label: string }[] = [
  { lang: 'en', label: 'English' },
  { lang: 'ar', label: 'العربية' },
];
const SPLASH_MS = 1000;

export function LanguageMenu({ lang }: { lang: Lang }) {
  const c = CH[lang];
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [splash, setSplash] = React.useState(false);

  React.useEffect(() => {
    if (!splash) return;
    const html = document.documentElement;
    // Hiding overflow lets the fixed splash cover the scrollbar; the stable gutter keeps the layout still.
    html.style.overflow = 'hidden';
    const id = setTimeout(() => setSplash(false), SPLASH_MS);
    return () => {
      clearTimeout(id);
      html.style.overflow = '';
    };
  }, [splash]);

  const choose = (next: Lang) => {
    if (next === lang) return;
    const href = localePath(next, stripLocale(pathname)) + window.location.hash;
    if (!reduced) setSplash(true);
    // A full load: the language is a root-layout param, so a client navigation would remount <html>
    // and React would re-create the pre-paint <script> in the browser, where it never runs.
    window.location.assign(href);
  };

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={<DropdownMenuTrigger render={<Button variant="ghost" size="icon-lg" aria-label={c.language} />} />}
          >
            <GlobeIcon className="size-5" />
          </TooltipTrigger>
          <TooltipContent>{c.language}</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="min-w-36">
          {LANGS.map((l) => (
            <DropdownMenuItem
              key={l.lang}
              onClick={() => choose(l.lang)}
              lang={l.lang}
              dir={l.lang === 'ar' ? 'rtl' : 'ltr'}
              aria-current={l.lang === lang ? 'true' : undefined}
            >
              {l.label}
              {l.lang === lang && <CheckIcon className="ms-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {splash &&
        createPortal(
          <div aria-hidden="true" className="fixed inset-0 z-[100] grid place-items-center bg-background text-foreground">
            <span
              dir="ltr"
              className="ps-[0.32em] font-[family-name:var(--font-geist)] text-[clamp(28px,6vw,44px)] font-semibold tracking-[0.32em]"
            >
              MIZAN<sup className="relative -top-[0.9em] ms-[0.1em] align-baseline text-[0.42em] tracking-normal">©</sup>
            </span>
          </div>,
          document.body,
        )}
    </>
  );
}

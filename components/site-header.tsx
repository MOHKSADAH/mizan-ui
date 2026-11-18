'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GithubLogoIcon, ListIcon } from '@phosphor-icons/react';
import { Badge } from '@/registry/ui/badge';
import { Button } from '@/registry/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/registry/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/ui/tooltip';
import { cn } from '@/registry/lib/utils';
import { gitConfig } from '@/lib/shared';
import { localePath, stripLocale, topNav } from '@/lib/nav';
import { SITE, type Lang } from '@/lib/strings';
import { CommandMenu } from '@/components/command-menu';
import { ThemeCombobox } from '@/components/theme-combobox';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageMenu } from '@/components/language-menu';
import { SidebarNav } from '@/components/sidebar-nav';
import { useReducedMotion } from '@/components/use-reduced-motion';

export const VERSION = 'v0.1';

function TopNav({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const path = stripLocale(usePathname());
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pill, setPill] = React.useState<{ x: number; w: number } | null>(null);
  const reduced = useReducedMotion();
  const active = topNav.filter((n) => path === n.match || path.startsWith(n.match + '/')).sort((a, b) => b.match.length - a.match.length)[0]?.key;

  // The pill is placed from measured rects, so it mirrors in RTL by measurement.
  React.useLayoutEffect(() => {
    const list = listRef.current;
    const measure = () => {
      const el = list?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!list || !el) return setPill(null);
      const box = list.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setPill({ x: r.left - box.left + list.scrollLeft, w: r.width });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (list) ro.observe(list);
    return () => ro.disconnect();
  }, [active, lang]);

  return (
    <nav aria-label={t.nav.docs} className="hidden min-w-0 min-[900px]:flex">
      <div ref={listRef} className="relative flex items-center gap-0.5">
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 h-8 rounded-md bg-muted',
            !reduced && 'transition-[transform,width,opacity] duration-200 ease-out',
            !pill && 'opacity-0',
          )}
          // Measured from the physical left edge, so the anchor stays physical too.
          style={{ left: 0, width: pill?.w ?? 0, transform: `translate(${pill?.x ?? 0}px, -50%)` }}
        />
        {topNav.map((n) => (
          <Link
            key={n.key}
            href={localePath(lang, n.href)}
            aria-current={active === n.key ? 'page' : undefined}
            className={cn(
              'relative z-10 inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-muted-foreground outline-offset-[-2px] transition-colors duration-150 ease-out hover:text-foreground aria-[current=page]:text-foreground',
            )}
          >
            {t.nav[n.key]}
            {n.dot && (
              <span className="size-1.5 rounded-full bg-info" role="img" aria-label={t.newBadge} />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MobileMenu({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="min-[900px]:hidden" aria-label={t.menu} />}>
        <ListIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-[min(20rem,85vw)] gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>{t.name}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto overscroll-contain p-3 [scrollbar-width:thin]">
          <nav aria-label={t.nav.docs} className="mb-4 grid gap-0.5">
            {topNav.map((n) => (
              <Link
                key={n.key}
                href={localePath(lang, n.href)}
                className="flex h-9 items-center rounded-md px-2 text-sm font-medium hover:bg-muted"
              >
                {t.nav[n.key]}
              </Link>
            ))}
          </nav>
          <SidebarNav lang={lang} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 h-14 border-b border-transparent bg-background/85 backdrop-blur-md backdrop-saturate-150 transition-colors duration-200 ease-out data-scrolled:border-border"
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-2 px-3 sm:gap-4 sm:px-6">
        <MobileMenu lang={lang} />
        <Link
          href={localePath(lang, '/')}
          className="flex min-h-6 shrink-0 items-center gap-2 rounded-md py-1 font-semibold outline-offset-2"
        >
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-md bg-foreground text-xs font-bold text-background"
          >
            M
          </span>
          <span>{t.name}</span>
          <Badge variant="secondary" className="hidden font-mono text-[0.7rem] min-[420px]:inline-flex" dir="ltr">
            {VERSION}
          </Badge>
        </Link>
        <TopNav lang={lang} />
        <div className="ms-auto flex min-w-0 items-center gap-1 sm:gap-1.5">
          <CommandMenu lang={lang} />
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="hidden sm:inline-flex"
                  aria-label={t.github}
                  nativeButton={false}
                  render={<a href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} target="_blank" rel="noreferrer" />}
                />
              }
            >
              <GithubLogoIcon className="size-5" />
            </TooltipTrigger>
            <TooltipContent>{t.github}</TooltipContent>
          </Tooltip>
          <ThemeCombobox lang={lang} />
          <ModeToggle lang={lang} />
          <LanguageMenu lang={lang} />
        </div>
      </div>
    </header>
  );
}

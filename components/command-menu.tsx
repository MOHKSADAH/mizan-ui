'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Button } from '@/registry/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/registry/ui/command';
import { Kbd, KbdGroup } from '@/registry/ui/kbd';
import { localePath, sidebarNav, topNav } from '@/lib/nav';
import { CH, SITE, type Lang } from '@/lib/strings';

export function CommandMenu({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const nav = sidebarNav(t.pages);
  const groups = [
      { title: t.nav.docs, items: topNav.map((n) => ({ title: t.nav[n.key], href: n.href })) },
      ...nav.flatMap((g) => [
        ...(g.items.length ? [{ title: t.groups[g.key as keyof typeof t.groups], items: g.items }] : []),
        ...(g.children ?? []).map((c) => ({ title: t.groups[c.key], items: c.items })),
      ]),
  ];

  const go = (href: string) => {
    setOpen(false);
    router.push(localePath(lang, href));
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpen(true)}
        aria-label={t.search}
        aria-keyshortcuts="Control+K Meta+K"
        className="w-9 justify-start px-0 text-muted-foreground sm:w-40 sm:px-2.5 lg:w-56 max-sm:justify-center"
      >
        <MagnifyingGlassIcon className="size-4" />
        <span className="hidden truncate sm:inline">{t.search}…</span>
        <KbdGroup className="ms-auto hidden sm:inline-flex" dir="ltr">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title={t.search} description={t.searchPh}>
        <CommandInput placeholder={t.searchPh} />
        <CommandList className="[scrollbar-width:thin]">
          <CommandEmpty>{CH[lang].noResults}</CommandEmpty>
          {groups.map((g) => (
            <CommandGroup key={g.title} heading={g.title}>
              {g.items.map((item) => (
                <CommandItem key={g.title + item.href} value={`${g.title} ${item.title}`} onSelect={() => go(item.href)}>
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CaretDownIcon } from '@phosphor-icons/react';
import { Badge } from '@/registry/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/registry/ui/collapsible';
import { cn } from '@/registry/lib/utils';
import { localePath, sidebarNav, stripLocale, type NavItem } from '@/lib/nav';
import { SITE, type Lang } from '@/lib/strings';

function ItemLink({ item, lang, active }: { item: NavItem; lang: Lang; active: boolean }) {
  const t = SITE[lang];
  return (
    <Link
      href={localePath(lang, item.href)}
      aria-current={active ? 'page' : undefined}
      className="flex h-8 items-center gap-2 rounded-md px-2 text-sm text-muted-foreground outline-offset-[-2px] transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
    >
      <span className="truncate">{item.title}</span>
      {item.badge && (
        <Badge variant={item.badge === 'new' ? 'default' : 'outline'} className="ms-auto h-4 px-1.5 text-[0.65rem]">
          {item.badge === 'new' ? t.newBadge : t.updatedBadge}
        </Badge>
      )}
    </Link>
  );
}

function Group({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/nav">
      <CollapsibleTrigger className="flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-medium text-foreground outline-offset-[-2px] hover:bg-muted">
        {title}
        <CaretDownIcon className="size-3.5 text-muted-foreground transition-transform duration-150 ease-out group-data-[open]/nav:rotate-0 -rotate-90 rtl:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent className="grid gap-0.5 pb-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export function SidebarNav({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const path = stripLocale(usePathname());
  const groups = React.useMemo(() => sidebarNav(t.pages), [t]);

  return (
    <nav aria-label={t.groups.components} className="grid gap-1 text-sm">
      {groups.filter((g) => g.items.length || g.children?.length).map((g) => (
        <Group key={g.key} title={t.groups[g.key as keyof typeof t.groups]}>
          {g.items.map((item) => (
            <ItemLink key={item.href} item={item} lang={lang} active={path === item.href} />
          ))}
          {g.children?.map((c) => (
            <div key={c.key} className="ps-2">
              <Group title={t.groups[c.key]}>
                {c.items.map((item) => (
                  <ItemLink key={item.href} item={item} lang={lang} active={path === item.href} />
                ))}
              </Group>
            </div>
          ))}
        </Group>
      ))}
    </nav>
  );
}

const SCROLL_KEY = 'mizan-sidebar-scroll';

// Inline-start sidebar. Keeps its scroll position across language switches, which remount the layout.
export function DocsSidebar({ lang }: { lang: Lang }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = Number(sessionStorage.getItem(SCROLL_KEY) || 0);
    const save = () => sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop));
    el.addEventListener('scroll', save, { passive: true });
    return () => el.removeEventListener('scroll', save);
  }, []);
  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 border-e min-[900px]:block">
      <div ref={ref} className={cn('h-full overflow-y-auto overscroll-contain px-3 py-6 [scrollbar-width:thin]')}>
        <SidebarNav lang={lang} />
      </div>
    </aside>
  );
}

import { ViewTransition } from 'react';
import type { Lang } from '@/lib/strings';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { DocsSidebar } from '@/components/sidebar-nav';

export function SiteShell({ lang, sidebar, children }: { lang: Lang; sidebar?: boolean; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader lang={lang} />
      <div className="mx-auto flex w-full max-w-[1440px] flex-1">
        {sidebar && <DocsSidebar lang={lang} />}
        <ViewTransition>
          <main id="content" className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
            {children}
          </main>
        </ViewTransition>
      </div>
      <SiteFooter lang={lang} />
    </>
  );
}

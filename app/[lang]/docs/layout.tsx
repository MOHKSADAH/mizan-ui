import { SiteShell } from '@/components/docs-shell';
import type { Lang } from '@/lib/strings';

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;
  return (
    <SiteShell lang={lang as Lang} sidebar>
      {children}
    </SiteShell>
  );
}

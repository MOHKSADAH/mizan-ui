import { SiteShell } from '@/components/docs-shell';
import type { Lang } from '@/lib/strings';

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  return <SiteShell lang={lang as Lang}>{children}</SiteShell>;
}

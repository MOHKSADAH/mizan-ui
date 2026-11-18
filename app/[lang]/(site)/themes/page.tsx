import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { themes } from '@/lib/settings';
import { CH, SITE, type Lang } from '@/lib/strings';
import tokens from '@/lib/themes/tokens.json';
import { PageHeader } from '@/components/page-header';
import { Customizer } from '@/components/looks/customizer';
import { ThemesGallery, type ThemePreviews } from '@/components/looks/themes-gallery';

const VARS = ['background', 'foreground', 'card', 'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'accent', 'border'];

type Entry = { light: Record<string, string>; dark: Record<string, string>; radius?: string };

const previews: ThemePreviews = Object.fromEntries(
  themes.map(({ id }) => {
    const t = (tokens as Record<string, Entry>)[id];
    const style = (mode: 'light' | 'dark') =>
      Object.fromEntries([...VARS.map((v) => [`--${v}`, t[mode][v]]), ['--radius', t.radius ?? '0.5rem']]) as CSSProperties;
    return [id, { light: style('light'), dark: style('dark') }];
  }),
);

export default async function Page(props: PageProps<'/[lang]/themes'>) {
  const lang = (await props.params).lang as Lang;
  return (
    <div className="grid grid-cols-1 min-w-0 gap-8">
      <PageHeader title={SITE[lang].pages.themes} description={CH[lang].sub} />
      <Customizer lang={lang} />
      <ThemesGallery lang={lang} previews={previews} />
    </div>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]/themes'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.themes, description: CH[lang].sub };
}

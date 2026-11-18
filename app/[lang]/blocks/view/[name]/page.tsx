import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n } from '@/lib/i18n';
import { blockItems } from '@/lib/nav';
import type { Lang } from '@/lib/strings';
import { BlockView, FrameHeight } from '@/components/blocks/block-view';

// A block alone, without the site shell: the /blocks frames load this in an iframe for real breakpoints.
export default async function Page(props: PageProps<'/[lang]/blocks/view/[name]'>) {
  const { lang, name } = await props.params;
  const item = blockItems.find((b) => b.name === name);
  if (!item) notFound();
  return (
    <main id="content" className="bg-background">
      <Suspense>
        <BlockView name={name} lang={lang as Lang} />
      </Suspense>
      <FrameHeight />
    </main>
  );
}

export function generateStaticParams() {
  return i18n.languages.flatMap((lang) => blockItems.map((b) => ({ lang, name: b.name })));
}

export async function generateMetadata(props: PageProps<'/[lang]/blocks/view/[name]'>): Promise<Metadata> {
  const { name } = await props.params;
  return { title: name, robots: { index: false } };
}

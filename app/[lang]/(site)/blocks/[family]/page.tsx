import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { i18n } from '@/lib/i18n';
import { blockFamilies, componentTitle } from '@/lib/nav';
import { SITE, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';
import { BlockFrame } from '@/components/blocks/block-frame';

export default async function Page(props: PageProps<'/[lang]/blocks/[family]'>) {
  const { lang: l, family } = await props.params;
  const lang = l as Lang;
  const group = blockFamilies.find((f) => f.family === family);
  if (!group) notFound();
  const sources = await Promise.all(
    group.items.map((b) => readFile(path.join(process.cwd(), b.files[0]), 'utf8').catch(() => '')),
  );

  return (
    <div className="grid min-w-0 gap-12">
      <PageHeader
        title={componentTitle(family)}
        description={`${SITE[lang].pages.blocks} · ${group.items.length}`}
      />
      {group.items.map((b, i) => (
        <BlockFrame
          key={b.name}
          name={b.name}
          title={b.title ?? componentTitle(b.name)}
          lang={lang}
          code={<ServerCodeBlock code={sources[i]} lang="tsx" codeblock={{ dir: 'ltr' }} />}
        />
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return i18n.languages.flatMap((lang) => blockFamilies.map((f) => ({ lang, family: f.family })));
}

export async function generateMetadata(props: PageProps<'/[lang]/blocks/[family]'>): Promise<Metadata> {
  const { family } = await props.params;
  return { title: componentTitle(family) };
}

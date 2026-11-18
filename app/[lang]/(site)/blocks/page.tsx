import type { Metadata } from 'next';
import Link from 'next/link';
import { SquaresFourIcon } from '@phosphor-icons/react/ssr';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/registry/ui/empty';
import { blockFamilies, componentTitle, localePath } from '@/lib/nav';
import { SITE, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';

const COPY = {
  en: {
    description: 'Page sections built from the components. Every block has English and Arabic labels and installs on its own.',
    empty: 'No blocks yet',
    emptyHint: 'Blocks appear here as soon as they are added to the registry manifest.',
    variants: (n: number) => `${n} ${n === 1 ? 'variant' : 'variants'}`,
  },
  ar: {
    description: 'أقسام صفحات مبنية من المكوّنات. لكل قالب تسميات بالعربية والإنجليزية، ويُثبَّت منفصلًا.',
    empty: 'لا توجد قوالب بعد',
    emptyHint: 'تظهر القوالب هنا فور إضافتها إلى ملف السجل.',
    variants: (n: number) => (n === 1 ? 'نموذج واحد' : n === 2 ? 'نموذجان' : n <= 10 ? `${n} نماذج` : `${n} نموذجًا`),
  },
};

export default async function Page(props: PageProps<'/[lang]/blocks'>) {
  const lang = (await props.params).lang as Lang;
  const c = COPY[lang];

  return (
    <div className="grid min-w-0 gap-8">
      <PageHeader title={SITE[lang].pages.blocks} description={c.description} />
      {blockFamilies.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SquaresFourIcon weight="regular" />
            </EmptyMedia>
            <EmptyTitle>{c.empty}</EmptyTitle>
            <EmptyDescription>{c.emptyHint}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {blockFamilies.map(({ family, items }) => (
            <li key={family}>
              <Link
                href={localePath(lang, `/blocks/${family}`)}
                className="group grid gap-3 rounded-xl border p-3 transition-colors duration-150 ease-out hover:bg-muted/50"
              >
                {/* Live thumbnail: the first variant at a quarter of desktop width. */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-background" aria-hidden="true">
                  <iframe
                    src={localePath(lang, `/blocks/view/${items[0].name}`)}
                    title=""
                    tabIndex={-1}
                    loading="lazy"
                    className="pointer-events-none absolute top-0 h-[400%] w-[400%] origin-top-left scale-25 border-0 ltr:left-0 rtl:right-0 rtl:origin-top-right"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-2 px-1">
                  <span className="font-medium">{componentTitle(family)}</span>
                  <span className="text-sm text-muted-foreground">{c.variants(items.length)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]/blocks'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.blocks, description: COPY[lang].description };
}

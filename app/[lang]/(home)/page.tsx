import type { Metadata } from 'next';
import { CH, SITE, T, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';
import { Customizer } from '@/components/looks/customizer';
import { Examples } from '@/components/looks/examples';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const lang = (await params).lang as Lang;
  const [title, description] = T[lang].sec.examples;

  return (
    <div className="mx-auto grid w-full min-w-0 gap-10">
      <div className="grid grid-cols-1 gap-6">
        <PageHeader title={CH[lang].h1} description={CH[lang].sub} />
        <Customizer lang={lang} />
      </div>
      <section id="examples" aria-labelledby="examples-title" className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-1">
          <h2 id="examples-title" className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Examples lang={lang} />
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return { title: SITE[lang].pages.home, description: CH[lang].sub };
}

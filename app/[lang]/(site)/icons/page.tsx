import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { SITE, T, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';
import { BrandMark, brandList } from '@/components/brand-mark';
import { InterfaceIcons } from '@/components/foundations/interface-icons';

const SLOTS = [
  { slug: 'mada', en: 'mada', ar: 'مدى' },
  { slug: 'tabby', en: 'Tabby', ar: 'تابي' },
  { slug: 'tamara', en: 'Tamara', ar: 'تمارا' },
  { slug: 'stcpay', en: 'STC Pay', ar: 'STC Pay' },
];
const D3 = ['bell', 'camera', 'chart', 'dollar', 'heart', 'lock', 'mobile', 'rocket', 'wallet'];

const COPY = {
  en: {
    slotNote: 'mada, Tabby, Tamara and STC Pay are text slots. Use the official artwork from each brand kit.',
  },
  ar: {
    slotNote: 'مدى وتابي وتمارا وSTC Pay مساحات نصية. استخدم الشعار الرسمي من دليل هوية كل علامة.',
  },
};

function Chip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <li className="grid min-w-0 gap-2">
      <div className="flex h-14 items-center justify-center overflow-hidden rounded-lg border bg-white px-2" aria-hidden="true">
        {children}
      </div>
      <bdi className="block truncate text-center text-xs text-muted-foreground">{label}</bdi>
    </li>
  );
}

export default async function Page(props: PageProps<'/[lang]/icons'>) {
  const lang = (await props.params).lang as Lang;
  const t = T[lang];
  const c = COPY[lang];
  const [title, desc] = t.sec.icons;
  const [uiTitle, uiDesc, stylesLabel, d3Title, d3Desc, brandTitle, brandDesc] = t.icons;

  return (
    <div className="grid min-w-0 gap-8">
      <PageHeader title={title} description={desc} />
      <Card>
        <CardHeader>
          <CardTitle>{uiTitle}</CardTitle>
          <CardDescription>{uiDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <InterfaceIcons lang={lang} stylesLabel={stylesLabel} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{brandTitle}</CardTitle>
          <CardDescription>{brandDesc}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {brandList.map((b) => (
              <Chip key={b.slug} label={lang === 'ar' ? b.nameAr : b.name}>
                <BrandMark slug={b.slug} className="h-6 max-w-full" />
              </Chip>
            ))}
            {SLOTS.map((s) => (
              <Chip key={s.slug} label={s[lang]}>
                <BrandMark slug={s.slug} className="text-sm" />
              </Chip>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{c.slotNote}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{d3Title}</CardTitle>
          <CardDescription>{d3Desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
            {D3.map((name) => (
              <li key={name} className="grid justify-items-center gap-1">
                <Image src={`/3d/${name}-clay.webp`} alt="" width={160} height={160} className="size-16 object-contain md:size-full" />
                <span dir="ltr" className="text-xs text-muted-foreground">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]/icons'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.icons, description: T[lang].sec.icons[1] };
}

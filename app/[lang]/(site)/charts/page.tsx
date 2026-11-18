import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { ChartsView } from '@/components/charts/charts-view';
import { SITE, T, type Lang } from '@/lib/strings';

const DESCRIPTION = {
  en: 'Recharts through the shadcn chart component: sample store analytics with range control, table views and a funnel. Series colors follow the selected theme.',
  ar: 'مخططات Recharts عبر مكوّن الرسم في shadcn: تحليلات متجر تجريبية مع تحديد الفترة وعرض الجدول وقمع التحويل. تتبع ألوان السلاسل الثيم المختار.',
};

export default async function Page(props: PageProps<'/[lang]/charts'>) {
  const lang = (await props.params).lang as Lang;
  return (
    <div className="grid min-w-0 gap-2">
      <PageHeader title={SITE[lang].pages.charts} description={DESCRIPTION[lang]} />
      <ChartsView lang={lang} t={T[lang].an} />
    </div>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]/charts'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.charts, description: DESCRIPTION[lang] };
}

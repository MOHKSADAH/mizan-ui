'use client';

import { SourceCitation, Sources, sourcesLabelsAr, type Source } from '@/registry/ui/sources';
import type { ExampleProps } from '@/registry/examples/types';

const SOURCES: Record<'en' | 'ar', Source[]> = {
  en: [
    { title: 'Sales report, last 7 days', url: 'https://mystore.example/admin/reports/sales', snippet: 'Orders, revenue and average cart by day.' },
    { title: 'Orders by city', url: 'https://mystore.example/admin/reports/cities', snippet: 'Riyadh and Jeddah lead the orders this week.' },
    { title: 'Stock report', url: 'https://mystore.example/admin/reports/stock' },
  ],
  ar: [
    { title: 'تقرير المبيعات لآخر 7 أيام', url: 'https://mystore.example/admin/reports/sales', snippet: 'الطلبات والإيرادات ومتوسط السلة حسب اليوم.' },
    { title: 'الطلبات حسب المدينة', url: 'https://mystore.example/admin/reports/cities', snippet: 'تتصدر الرياض وجدة الطلبات هذا الأسبوع.' },
    { title: 'تقرير المخزون', url: 'https://mystore.example/admin/reports/stock' },
  ],
};

export function SourcesList({ lang }: ExampleProps) {
  return <Sources className="w-full max-w-md" sources={SOURCES[lang]} labels={lang === 'ar' ? sourcesLabelsAr : undefined} />;
}

export function SourcesCitation({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const labels = ar ? sourcesLabelsAr : undefined;
  return (
    <p dir="auto" className="max-w-md leading-relaxed">
      {ar ? 'ارتفعت المبيعات 12% عن الأسبوع الماضي' : 'Sales rose 12% over last week'}
      <SourceCitation index={1} source={SOURCES[lang][0]} labels={labels} />
      {ar ? ' وأغلب الطلبات من الرياض وجدة' : ', and most orders came from Riyadh and Jeddah'}
      <SourceCitation index={2} source={SOURCES[lang][1]} labels={labels} />.
    </p>
  );
}

import { Installments, installmentsLabelsAr } from '@/registry/ui/installments';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A "4 payments of X" widget with the payment schedule. Dates and money come from the format helpers. The eligibility range is a prop, and the provider logo is a slot.',
    ar: 'أداة "4 دفعات بقيمة X" مع جدول الدفعات. تأتي التواريخ والمبالغ من دوال التنسيق. نطاق الأهلية خاصية، وشعار المزوّد خانة.',
  },
  usage: `import { Installments } from "@/components/ui/installments"\n\n<Installments total={499} min={100} max={5000} provider={<TabbyLogo />} />`,
  examples: {
    Default: { en: 'Four payments', ar: 'أربع دفعات' },
    Outside: { en: 'Outside the eligible range', ar: 'خارج النطاق المؤهل' },
  },
  accessibility: [
    {
      en: 'The schedule is an ordered list. Amounts are read in full, for example "125 Saudi riyals".',
      ar: 'الجدول قائمة مرتبة. تُقرأ المبالغ كاملة، مثل "125 ريالًا سعوديًا".',
    },
    {
      en: 'The widget renders nothing outside min and max, so no hidden or disabled content is left behind.',
      ar: 'لا تعرض الأداة شيئًا خارج الحد الأدنى والأقصى فلا يبقى محتوى مخفي أو معطل.',
    },
  ],
};

const start = new Date('2026-11-22T00:00:00Z');

export function Default({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <Installments
        total={499}
        startDate={start}
        lang={lang}
        labels={lang === 'ar' ? installmentsLabelsAr : undefined}
        provider={<span className="rounded-md border border-border px-2 py-1 text-xs">{lang === 'ar' ? 'شعار المزوّد' : 'Provider logo'}</span>}
      />
    </div>
  );
}

export function Outside({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
      <Installments total={40} min={100} lang={lang} />
      <p>{lang === 'ar' ? 'الإجمالي 40 أقل من الحد الأدنى 100، فلا شيء يظهر أعلاه.' : 'The total 40 is below the minimum 100, so nothing renders above.'}</p>
    </div>
  );
}

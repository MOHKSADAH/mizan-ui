import { Badge } from '@/registry/ui/badge';
import { Price } from '@/registry/ui/price';
import { formatPercent } from '@/registry/lib/format';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An amount with its currency. Official Saudi, Emirati and Omani signs, symbols for the rest, Arabic-Indic digits on request.',
    ar: 'مبلغ مع عملته. الرموز الرسمية للريال السعودي والدرهم الإماراتي والريال العماني، ورموز لبقية العملات، وأرقام هندية عند الطلب.',
  },
  usage: `import { Price } from "@/components/ui/price"

<Price amount={489} currency="SAR" lang="ar" digits="arab" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Currencies: { en: 'Currencies', ar: 'العملات' },
    Digits: { en: 'Compact, decimals and Arabic-Indic digits', ar: 'مختصر وكسور وأرقام هندية' },
    Sale: { en: 'Sale price', ar: 'سعر التخفيض' },
  },
  accessibility: [
    { en: 'The visible amount is hidden from screen readers; they hear the amount with the currency name, such as "489 Saudi riyals".', ar: 'المبلغ المرئي مخفي عن قارئات الشاشة؛ فتسمع المبلغ مع اسم العملة مثل "489 ريالًا سعوديًا".' },
    { en: 'The price is an isolated LTR run, so the sign and digits never reorder inside Arabic text.', ar: 'السعر مقطع معزول من اليسار إلى اليمين، فلا يتغير ترتيب الرمز والأرقام داخل النص العربي.' },
    { en: 'Wrap an old price in del with an sr-only "Original price:" prefix so the strike-through is not color or style alone.', ar: 'لفّ السعر القديم بـ del مع بادئة sr-only "السعر الأصلي:" كي لا يعتمد الشطب على الشكل وحده.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <Price amount={489} currency="SAR" lang={lang} className="text-2xl font-semibold" />;
}

const CURRENCIES = [
  { code: 'SAR', amount: 489, name: { en: 'Saudi riyal', ar: 'ريال سعودي' } },
  { code: 'AED', amount: 489, name: { en: 'UAE dirham', ar: 'درهم إماراتي' } },
  { code: 'OMR', amount: 48.9, name: { en: 'Omani rial (3 decimals)', ar: 'ريال عماني (3 منازل)' } },
  { code: 'KWD', amount: 48.9, name: { en: 'Kuwaiti dinar (3 decimals)', ar: 'دينار كويتي (3 منازل)' } },
  { code: 'USD', amount: 489, name: { en: 'US dollar', ar: 'دولار أمريكي' } },
  { code: 'EUR', amount: 489, name: { en: 'Euro', ar: 'يورو' } },
] as const;

export function Currencies({ lang }: ExampleProps) {
  return (
    <dl className="grid w-full max-w-sm grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 text-sm">
      {CURRENCIES.map((c) => (
        <div key={c.code} className="col-span-2 grid grid-cols-subgrid items-center border-b pb-2 last:border-0 last:pb-0">
          <dt className="text-muted-foreground">
            <bdi dir="ltr">{c.code}</bdi> · {c.name[lang]}
          </dt>
          <dd>
            <Price amount={c.amount} currency={c.code} lang={lang} className="text-base font-medium" />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Digits({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const rows = [
    { label: ar ? 'مختصر' : 'Compact', price: <Price amount={1250000} lang={lang} compact /> },
    { label: ar ? 'مع الكسور' : 'With decimals', price: <Price amount={489.5} lang={lang} decimals /> },
    { label: ar ? 'أرقام هندية' : 'Arabic-Indic digits', price: <Price amount={1250.75} lang="ar" digits="arab" decimals /> },
    { label: ar ? 'هندية ومختصر' : 'Arabic-Indic, compact', price: <Price amount={1250000} lang="ar" digits="arab" compact /> },
  ];
  return (
    <dl className="grid w-full max-w-sm grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 text-sm">
      {rows.map((r) => (
        <div key={r.label} className="col-span-2 grid grid-cols-subgrid items-center border-b pb-2 last:border-0 last:pb-0">
          <dt className="text-muted-foreground">{r.label}</dt>
          <dd className="text-base font-medium">{r.price}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Sale({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-baseline justify-center gap-3">
      <Price amount={349} lang={lang} className="text-2xl font-semibold" />
      <del className="text-muted-foreground">
        <span className="sr-only">{ar ? 'السعر الأصلي:' : 'Original price:'}</span>
        <Price amount={489} lang={lang} />
      </del>
      <Badge className="bg-success text-success-foreground">
        {ar ? 'خصم ' : 'Save '}
        {formatPercent(0.29, { lang })}
      </Badge>
    </div>
  );
}

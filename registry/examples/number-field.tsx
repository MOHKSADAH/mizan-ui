import { NumberField, numberFieldLabelsAr } from '@/registry/ui/number-field';

const labels = (lang: 'en' | 'ar') => (lang === 'ar' ? numberFieldLabelsAr : undefined);
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A number input with stepper buttons, min, max and step. It formats with Intl (currency, unit, percent) and accepts Arabic-Indic and Persian digits when typed or pasted.',
    ar: 'حقل رقمي بأزرار زيادة وإنقاص وحدّ أدنى وأقصى وخطوة. ينسّق عبر Intl (عملة، وحدة، نسبة) ويقبل الأرقام الهندية والفارسية عند الكتابة أو اللصق.',
  },
  usage: `import { NumberField } from "@/components/ui/number-field"\n\n<NumberField min={0} max={10} step={1} defaultValue={1} aria-label="Quantity" />`,
  examples: {
    Default: { en: 'Quantity, 0 to 10', ar: 'الكمية، من 0 إلى 10' },
    Currency: { en: 'Currency in Saudi riyals', ar: 'عملة بالريال السعودي' },
    Unit: { en: 'Unit (kilograms)', ar: 'وحدة (كيلوغرام)' },
  },
  accessibility: [
    {
      en: 'The input is a spinbutton: arrow keys step, Page Up and Page Down take larger steps, Home and End jump to min and max.',
      ar: 'الحقل من نوع spinbutton: تزيد مفاتيح الأسهم أو تنقص بخطوة، وتأخذ Page Up وPage Down خطوات أكبر، وتنتقل Home وEnd إلى الحد الأدنى والأقصى.',
    },
    {
      en: 'The stepper buttons have text labels and are at least 32px. The value is an LTR island so digits and signs keep their order in Arabic pages.',
      ar: 'لأزرار الزيادة والإنقاص تسميات نصية وحجمها 32 بكسل على الأقل. القيمة جزيرة LTR فتبقى الأرقام والإشارات بترتيبها في الصفحات العربية.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <NumberField lang={lang} labels={labels(lang)} min={0} max={10} step={1} defaultValue={1} aria-label={lang === 'ar' ? 'الكمية' : 'Quantity'} />;
}

export function Currency({ lang }: ExampleProps) {
  return (
    <NumberField
      lang={lang}
      labels={labels(lang)}
      min={0}
      step={50}
      defaultValue={1250}
      format={{ style: 'currency', currency: 'SAR', currencyDisplay: 'code' }}
      aria-label={lang === 'ar' ? 'المبلغ' : 'Amount'}
    />
  );
}

export function Unit({ lang }: ExampleProps) {
  return (
    <NumberField
      lang={lang}
      labels={labels(lang)}
      min={0}
      step={0.5}
      defaultValue={2.5}
      format={{ style: 'unit', unit: 'kilogram', unitDisplay: 'short' }}
      aria-label={lang === 'ar' ? 'الوزن' : 'Weight'}
    />
  );
}

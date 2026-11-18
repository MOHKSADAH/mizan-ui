import { VatSummary, vatSummaryLabelsAr } from '@/registry/ui/vat-summary';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An order summary: subtotal, discount, shipping, cash on delivery fee, VAT and total. The VAT rate is a prop, and amounts can include VAT or not. Every line uses Price.',
    ar: 'ملخص الطلب: المجموع الفرعي والخصم والشحن ورسوم الدفع عند الاستلام والضريبة والإجمالي. نسبة الضريبة خاصية، ويمكن أن تشمل المبالغ الضريبة أو لا. كل سطر يستخدم Price.',
  },
  usage: `import { VatSummary } from "@/components/ui/vat-summary"\n\n<VatSummary subtotal={460} discount={46} shipping="free" vat={{ rate: 0.15, included: true }} />`,
  examples: {
    Inclusive: { en: 'VAT included in prices', ar: 'الأسعار شاملة الضريبة' },
    Exclusive: { en: 'VAT added on top', ar: 'الضريبة تُضاف' },
  },
  accessibility: [
    {
      en: 'A description list: each label is paired with its amount. Amounts have a spoken currency name, and the discount reads as a negative amount.',
      ar: 'قائمة وصف: يقترن كل عنوان بمبلغه. للمبالغ اسم عملة منطوق، ويُقرأ الخصم كمبلغ سالب.',
    },
    {
      en: 'The VAT line says whether it is included or added, in text.',
      ar: 'يذكر سطر الضريبة نصًا إن كانت مشمولة أو مضافة.',
    },
  ],
};

const labels = (lang: ExampleProps['lang']) => (lang === 'ar' ? vatSummaryLabelsAr : undefined);

export function Inclusive({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <VatSummary
        subtotal={460}
        discount={46}
        shipping="free"
        codFee={10}
        vat={{ rate: 0.15, included: true }}
        lang={lang}
        labels={labels(lang)}
      />
    </div>
  );
}

export function Exclusive({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <VatSummary subtotal={460} shipping={25} vat={{ rate: 0.15, included: false }} lang={lang} labels={labels(lang)} />
    </div>
  );
}

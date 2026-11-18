import { Field, FieldLabel } from '@/registry/ui/field';
import { VatInput, vatInputLabelsAr } from '@/registry/ui/vat-input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A Saudi VAT registration number field. It shows the 15 digits in groups of 4, always in LTR order, accepts Arabic-Indic digits, checks the format on blur, and has a copy button. A passing value is well-formed, not proof that the registration exists.',
    ar: 'حقل الرقم الضريبي السعودي. يعرض الأرقام الـ 15 في مجموعات من 4 خانات وبترتيب LTR دائماً، ويقبل الأرقام الهندية، ويتحقق من الصيغة عند مغادرة الحقل، وفيه زر نسخ. القيمة الصحيحة سليمة الصيغة فقط، وليست دليلاً على وجود التسجيل.',
  },
  usage: `import { VatInput } from "@/components/ui/vat-input"\n\n<VatInput onValueChange={(vat, valid) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a value', ar: 'بقيمة' },
  },
  accessibility: [
    {
      en: 'The copy button has an accessible name, and a polite status message confirms the copy. The error is text with an icon, never color alone.',
      ar: 'لزر النسخ اسم متاح، وتؤكد رسالة حالة مهذبة اكتمال النسخ. الخطأ نص مع أيقونة وليس لوناً فقط.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="vat">{lang === 'ar' ? 'الرقم الضريبي' : 'VAT number'}</FieldLabel>
      <VatInput id="vat" placeholder="3000 0000 0000 003" labels={lang === 'ar' ? vatInputLabelsAr : undefined} />
    </Field>
  );
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="vat-value">{lang === 'ar' ? 'الرقم الضريبي' : 'VAT number'}</FieldLabel>
      <VatInput id="vat-value" defaultValue="300000000000003" labels={lang === 'ar' ? vatInputLabelsAr : undefined} />
    </Field>
  );
}

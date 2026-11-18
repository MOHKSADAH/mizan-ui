import { Field, FieldLabel } from '@/registry/ui/field';
import { IbanInput, ibanInputLabelsAr } from '@/registry/ui/iban-input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A Saudi IBAN field. It shows the number in groups of 4, always in LTR order, checks the format and the mod-97 digit on blur, and has a copy button. A passing value is well-formed, not proof that the account exists.',
    ar: 'حقل آيبان سعودي. يعرض الرقم في مجموعات من 4 خانات وبترتيب LTR دائماً، ويتحقق من الصيغة ورقم التحقق mod-97 عند مغادرة الحقل، وفيه زر نسخ. القيمة الصحيحة سليمة الصيغة فقط، وليست دليلاً على وجود الحساب.',
  },
  usage: `import { IbanInput } from "@/components/ui/iban-input"\n\n<IbanInput onValueChange={(iban, valid) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a value', ar: 'بقيمة' },
  },
  accessibility: [
    {
      en: 'The copy button has an accessible name, and a polite status message confirms the copy. The error is text with an icon, never color alone.',
      ar: 'لزر النسخ اسم متاح، وتؤكد رسالة حالة مهذبة اكتمال النسخ. الخطأ نص مع أيقونة وليس لوناً فقط.',
    },
    {
      en: 'The copy button copies the IBAN without spaces.',
      ar: 'يَنسخ زر النسخ الآيبان بدون مسافات.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="iban">{lang === 'ar' ? 'رقم الآيبان' : 'IBAN'}</FieldLabel>
      <IbanInput id="iban" placeholder="SA00 0000 0000 0000 0000 0000" labels={lang === 'ar' ? ibanInputLabelsAr : undefined} />
    </Field>
  );
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="iban-value">{lang === 'ar' ? 'رقم الآيبان' : 'IBAN'}</FieldLabel>
      <IbanInput id="iban-value" defaultValue="SA0380000000608010167519" labels={lang === 'ar' ? ibanInputLabelsAr : undefined} />
    </Field>
  );
}

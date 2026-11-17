import { Field, FieldLabel } from '@/registry/ui/field';
import { SaudiIdInput, saudiIdInputLabelsAr } from '@/registry/ui/saudi-id-input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A 10-digit national ID or Iqama field. It accepts Arabic-Indic digits, keeps the number in LTR order on RTL pages, and checks the format with a Luhn test on blur. A passing value is well-formed, not proof that the ID exists.',
    ar: 'حقل لرقم الهوية الوطنية أو الإقامة من 10 أرقام. يقبل الأرقام الهندية، ويُبقي الرقم من اليسار إلى اليمين في الصفحات العربية، ويتحقق من الصيغة عند مغادرة الحقل. القيمة الصحيحة سليمة الصيغة فقط، وليست دليلاً على وجود الهوية.',
  },
  usage: `import { SaudiIdInput } from "@/components/ui/saudi-id-input"\n\n<SaudiIdInput showHint onValueChange={(digits, valid) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithHint: { en: 'Citizen or resident hint', ar: 'تلميح مواطن أو مقيم' },
  },
  accessibility: [
    {
      en: 'The error is text with an icon and aria-invalid, never color alone, and it sits in a polite live region.',
      ar: 'الخطأ نص مع أيقونة وخاصية aria-invalid وليس لوناً فقط، ويوجد في منطقة حية مهذبة.',
    },
    {
      en: 'The input is labelled by the surrounding Field label. The numeric keypad opens on mobile.',
      ar: 'يُسمّى الحقل بتسمية Field المحيطة. تظهر لوحة الأرقام على الجوال.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="saudi-id">{lang === 'ar' ? 'رقم الهوية أو الإقامة' : 'National ID or Iqama number'}</FieldLabel>
      <SaudiIdInput id="saudi-id" labels={lang === 'ar' ? saudiIdInputLabelsAr : undefined} />
    </Field>
  );
}

export function WithHint({ lang }: ExampleProps) {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="saudi-id-hint">{lang === 'ar' ? 'رقم الهوية أو الإقامة' : 'National ID or Iqama number'}</FieldLabel>
      <SaudiIdInput id="saudi-id-hint" showHint defaultValue="2" labels={lang === 'ar' ? saudiIdInputLabelsAr : undefined} />
    </Field>
  );
}

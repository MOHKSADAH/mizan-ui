import { PhoneInput, phoneInputLabelsAr } from '@/registry/ui/phone-input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A country selector and a national number field. The country list puts the GCC countries first and defaults to Saudi Arabia (+966). It formats the number as you type with libphonenumber-js and reports E.164 through onValueChange.',
    ar: 'قائمة دول وحقل للرقم المحلي. تأتي دول الخليج أولاً والافتراضي السعودية (+966). ينسّق الرقم أثناء الكتابة بمكتبة libphonenumber-js ويُرجع الصيغة الدولية E.164 عبر onValueChange.',
  },
  usage: `import { PhoneInput } from "@/components/ui/phone-input"\n\n<PhoneInput label="Mobile" onValueChange={(e164, valid) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a value in another country', ar: 'قيمة من دولة أخرى' },
  },
  accessibility: [
    {
      en: 'The calling code is visible in the country button and is added to the label as screen reader only text, so it is read with the field name.',
      ar: 'رمز الدولة ظاهر في زر الدولة ويُضاف إلى التسمية كنص لقارئ الشاشة فقط، فيُقرأ مع اسم الحقل.',
    },
    {
      en: 'The country list is a searchable combobox. Search ignores Arabic diacritics and alef forms. The error is text with an icon, never color alone.',
      ar: 'قائمة الدول مربع تحرير وسرد قابل للبحث. يتجاهل البحث التشكيل وأشكال الألف. الخطأ نص مع أيقونة وليس لوناً فقط.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <div className="max-w-sm">
      <PhoneInput
        lang={lang}
        label={lang === 'ar' ? 'رقم الجوال' : 'Mobile number'}
        labels={lang === 'ar' ? phoneInputLabelsAr : undefined}
      />
    </div>
  );
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <div className="max-w-sm">
      <PhoneInput
        lang={lang}
        defaultValue="+971501234567"
        label={lang === 'ar' ? 'رقم الجوال' : 'Mobile number'}
        labels={lang === 'ar' ? phoneInputLabelsAr : undefined}
      />
    </div>
  );
}

import { SaudiAddressForm, saudiAddressFormLabelsAr } from '@/registry/ui/saudi-address-form';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A composed Saudi address form: region and city, district, street, building number (4 digits), postal code (5 digits), additional number (4 digits) and the national short address (4 letters and 4 digits). The short address is a format check only, it does not look the address up. Number fields accept Arabic-Indic digits.',
    ar: 'نموذج عنوان سعودي مركّب: المنطقة والمدينة، الحي، الشارع، رقم المبنى (4 أرقام)، الرمز البريدي (5 أرقام)، الرقم الإضافي (4 أرقام)، والعنوان الوطني المختصر (4 أحرف و4 أرقام). العنوان المختصر تحقق من الصيغة فقط ولا يبحث عن العنوان. تقبل حقول الأرقام الأرقام الهندية.',
  },
  usage: `import { SaudiAddressForm } from "@/components/ui/saudi-address-form"\n\n<SaudiAddressForm lang="ar" onValueChange={(address, valid) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a value', ar: 'بقيمة' },
  },
  accessibility: [
    {
      en: 'Every field has a visible label. An error is text with an icon and aria-invalid, announced as an alert, never color alone.',
      ar: 'لكل حقل تسمية ظاهرة. الخطأ نص مع أيقونة وخاصية aria-invalid ويُعلن كتنبيه، وليس لوناً فقط.',
    },
    {
      en: 'Number fields stay in LTR order inside Arabic pages and open the numeric keypad on mobile.',
      ar: 'تبقى حقول الأرقام بترتيب LTR داخل الصفحات العربية وتفتح لوحة الأرقام على الجوال.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SaudiAddressForm lang={lang} labels={lang === 'ar' ? saudiAddressFormLabelsAr : undefined} className="max-w-2xl" />;
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <SaudiAddressForm
      lang={lang}
      labels={lang === 'ar' ? saudiAddressFormLabelsAr : undefined}
      defaultValue={{
        region: 'SA-01',
        city: 'Riyadh',
        district: lang === 'ar' ? 'العليا' : 'Al Olaya',
        buildingNumber: '8228',
        postalCode: '12611',
        additionalNumber: '2121',
        shortAddress: 'RRRD2929',
      }}
      className="max-w-2xl"
    />
  );
}

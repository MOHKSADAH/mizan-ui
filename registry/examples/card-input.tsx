import type * as React from 'react';
import { CreditCardIcon } from '@phosphor-icons/react/ssr';
import { CardInput, cardInputLabelsAr, type CardBrand } from '@/registry/ui/card-input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A card number, expiry and security code. The brand shows as text as you type (Visa, Mastercard, Amex), the number is grouped for the brand, and each field is checked on blur: Luhn for the number, a real month and a future date for the expiry, 3 or 4 digits for the code. Digits stay left to right in Arabic pages.',
    ar: 'رقم البطاقة وتاريخ الانتهاء ورمز الأمان. تظهر العلامة نصًا أثناء الكتابة (فيزا وماستركارد وأمريكان إكسبريس)، ويُقسَّم الرقم بحسب العلامة، ويُفحص كل حقل عند مغادرته: خوارزمية لون للرقم، وشهر صحيح وتاريخ مستقبلي للانتهاء، و3 أو 4 أرقام للرمز. تبقى الأرقام من اليسار إلى اليمين في الصفحات العربية.',
  },
  usage: `import { CardInput } from "@/components/ui/card-input"\n\n<CardInput\n  madaBins={madaBins}\n  brandIcons={{ visa: <VisaLogo /> }}\n  onValueChange={(value, { brand, valid }) => {}}\n/>`,
  examples: {
    Default: { en: 'Card fields with brand detection', ar: 'حقول البطاقة مع اكتشاف العلامة' },
    Mada: { en: 'mada, with your BIN list', ar: 'مدى، مع قائمة BIN الخاصة بك' },
  },
  accessibility: [
    {
      en: 'Each field has a visible label and the right autocomplete token (cc-number, cc-exp, cc-csc), so browsers and password managers can fill it. The keyboard is numeric.',
      ar: 'لكل حقل عنوان ظاهر ورمز الإكمال التلقائي المناسب (cc-number وcc-exp وcc-csc) ليملأه المتصفح ومدير كلمات المرور. لوحة المفاتيح رقمية.',
    },
    {
      en: 'A failed check sets aria-invalid and links the message with aria-describedby. The message has an icon and text, so it never relies on color. The brand name is linked to the number field the same way.',
      ar: 'يضبط الفحص الفاشل aria-invalid ويربط الرسالة عبر aria-describedby. للرسالة أيقونة ونص فلا تعتمد على اللون. ويرتبط اسم العلامة بحقل الرقم بالطريقة نفسها.',
    },
    {
      en: 'Arabic-Indic digits are accepted and stored as Latin digits. A passing value is well-formed: it does not prove the card exists or has funds.',
      ar: 'تُقبل الأرقام الهندية العربية وتُخزَّن لاتينية. القيمة الصحيحة سليمة الصيغة فقط: لا تثبت وجود البطاقة أو رصيدها.',
    },
  ],
};

// Mizan ships no brand logos (trademarks): pass your own. A neutral icon stands in here.
const icons: Partial<Record<CardBrand, React.ReactNode>> = Object.fromEntries(
  (['visa', 'mastercard', 'amex', 'mada'] as const).map((brand) => [brand, <CreditCardIcon key={brand} weight="regular" className="size-5" />]),
);

// Example prefixes only. Use the current list from your acquirer.
const madaBins = ['446404', '457865', '968208'];

export function Default({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <CardInput brandIcons={icons} labels={lang === 'ar' ? cardInputLabelsAr : undefined} />
    </div>
  );
}

export function Mada({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <CardInput
        madaBins={madaBins}
        brandIcons={icons}
        defaultValue={{ number: '4464041234567894' }}
        labels={lang === 'ar' ? cardInputLabelsAr : undefined}
      />
    </div>
  );
}

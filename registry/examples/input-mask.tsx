import { InputMask } from '@/registry/ui/input-mask';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A text input that formats as you type with a pattern: phone, card, date, IBAN, or your own mask. Arabic-Indic digits are converted to ASCII.',
    ar: 'حقل نصي ينسّق أثناء الكتابة وفق نمط: هاتف أو بطاقة أو تاريخ أو IBAN أو قناع خاص بك. تُحوَّل الأرقام الهندية إلى أرقام لاتينية.',
  },
  usage: `import { InputMask } from "@/components/ui/input-mask"\n\n<InputMask preset="iban" aria-label="IBAN" onValueChange={(raw, formatted) => {}} />\n<InputMask mask="999-999" aria-label="Code" />`,
  examples: {
    Phone: { en: 'Phone', ar: 'هاتف' },
    Card: { en: 'Card number', ar: 'رقم البطاقة' },
    DateMask: { en: 'Date', ar: 'تاريخ' },
    Iban: { en: 'IBAN', ar: 'IBAN' },
  },
  accessibility: [
    {
      en: 'It is a plain text input: the label, aria-invalid and aria-describedby come from the surrounding Field. The caret stays on the same digit when the text is reformatted, and Backspace after a separator deletes the digit before it.',
      ar: 'حقل نصي عادي: تأتي التسمية وaria-invalid وaria-describedby من Field المحيط. يبقى المؤشر عند الرقم نفسه عند إعادة التنسيق، ويحذف Backspace بعد الفاصل الرقم الذي قبله.',
    },
    {
      en: 'The field is an LTR island with numeric keyboard hints, so numbers keep their order in Arabic pages.',
      ar: 'الحقل جزيرة LTR مع تلميح لوحة مفاتيح رقمية، فتبقى الأرقام بترتيبها في الصفحات العربية.',
    },
  ],
};

const label = (lang: 'en' | 'ar', en: string, ar: string) => (lang === 'ar' ? ar : en);

export function Phone({ lang }: ExampleProps) {
  return <InputMask preset="phone" placeholder="050 123 4567" aria-label={label(lang, 'Phone', 'الهاتف')} />;
}

export function Card({ lang }: ExampleProps) {
  return <InputMask preset="card" placeholder="4111 1111 1111 1111" aria-label={label(lang, 'Card number', 'رقم البطاقة')} />;
}

export function DateMask({ lang }: ExampleProps) {
  return <InputMask preset="date" placeholder="DD/MM/YYYY" aria-label={label(lang, 'Date', 'التاريخ')} />;
}

export function Iban({ lang }: ExampleProps) {
  return <InputMask preset="iban" placeholder="SA03 8000 0000 6080 1016 7519" aria-label={label(lang, 'IBAN', 'رقم الآيبان')} />;
}

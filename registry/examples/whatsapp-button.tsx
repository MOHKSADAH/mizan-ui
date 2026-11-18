import { WhatsAppButton, whatsappButtonLabelsAr } from '@/registry/ui/whatsapp-button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A link that opens a WhatsApp chat with a prefilled message. It has a floating variant for the end-bottom corner.',
    ar: 'رابط يفتح محادثة واتساب برسالة جاهزة. له نسخة عائمة في الزاوية السفلية.',
  },
  usage: `import { WhatsAppButton } from "@/components/ui/whatsapp-button"\n\n<WhatsAppButton phone="+966501234567" message="Hello, I would like to order." />\n\n// Floating: lift it above a sticky bar by setting --mizan-float-offset on a parent\n<WhatsAppButton phone="+966501234567" floating />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Variants: { en: 'Variants', ar: 'الأنواع' },
  },
  accessibility: [
    {
      en: 'The accessible name is the label plus "(opens WhatsApp)". The link opens a new tab with rel="noopener". Icon-only and floating variants keep the same name.',
      ar: 'الاسم المتاح هو النص مع "(يفتح واتساب)". يفتح الرابط تبويبًا جديدًا مع rel="noopener". النسختان الأيقونية والعائمة تحتفظان بالاسم نفسه.',
    },
    {
      en: 'The phone number must be international, with the country code first. Local formats such as 05x are not converted.',
      ar: 'يجب أن يكون الرقم دوليًا ويبدأ برمز الدولة. الصيغ المحلية مثل 05x لا تُحوَّل.',
    },
  ],
};

const message = {
  en: 'Hello, I would like to order this product.',
  ar: 'مرحبًا، أود طلب هذا المنتج.',
};

export function Default({ lang }: ExampleProps) {
  return (
    <WhatsAppButton
      phone="+966501234567"
      message={message[lang]}
      labels={lang === 'ar' ? whatsappButtonLabelsAr : undefined}
    />
  );
}

export function Variants({ lang }: ExampleProps) {
  const labels = lang === 'ar' ? whatsappButtonLabelsAr : undefined;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(['primary', 'secondary', 'outline', 'icon'] as const).map((variant) => (
        <WhatsAppButton key={variant} phone="+966501234567" message={message[lang]} variant={variant} labels={labels} />
      ))}
    </div>
  );
}

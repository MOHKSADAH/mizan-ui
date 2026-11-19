import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';
import { SlideToConfirmDemo } from './slide-to-confirm.client';

export const doc: ExampleDoc = {
  description: {
    en: 'A handle you drag toward the inline end to confirm a payment or an order. Enter, Space and the arrow keys work too, and a plain button can sit beside it.',
    ar: 'مقبض تسحبه نحو نهاية السطر لتأكيد دفعة أو طلب. تعمل مفاتيح Enter وSpace والأسهم أيضًا، ويمكن إضافة زر عادي بجانبه.',
  },
  usage: `import { SlideToConfirm } from "@/components/ui/slide-to-confirm"\n\n<SlideToConfirm labels={{ track: "Slide to pay SAR 349" }} onConfirm={() => pay()} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithButton: { en: 'With a plain button', ar: 'مع زر عادي' },
  },
  accessibility: [
    {
      en: 'The handle is a button named by the track text and described by a hint. Enter or Space confirms. Right and Left move it one quarter toward or away from the end (inverted in RTL), End confirms and Home resets.',
      ar: 'المقبض زر يُسمّى بنص المسار ويُوصف بتلميح. يؤكد Enter أو Space. يحركه اليمين واليسار ربعًا نحو النهاية أو بعيدًا عنها (معكوس في RTL)، ويؤكد End ويعيد Home الضبط.',
    },
    {
      en: 'A pointer tap without a drag does nothing, so an accidental tap cannot confirm. Set fallbackButton for people who cannot drag. Progress and the result go to a polite live region.',
      ar: 'النقر بالمؤشر دون سحب لا يفعل شيئًا، فلا يؤكد نقر عرضي. فعّل fallbackButton لمن لا يستطيع السحب. يذهب التقدم والنتيجة إلى منطقة حية مهذبة.',
    },
    {
      en: 'The drag direction follows the page direction: the handle always travels toward the inline end. The slide back is a short transition that is off under reduced motion.',
      ar: 'يتبع اتجاه السحب اتجاه الصفحة: يتحرك المقبض دائمًا نحو نهاية السطر. العودة انتقال قصير يُعطَّل عند تقليل الحركة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SlideToConfirmDemo lang={lang} />;
}

export function WithButton({ lang }: ExampleProps) {
  return <SlideToConfirmDemo lang={lang} fallbackButton />;
}

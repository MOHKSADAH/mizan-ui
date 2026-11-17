import { FloatingContact, floatingContactLabelsAr } from '@/registry/ui/floating-contact';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A floating launcher with WhatsApp, call and chat actions, opened from one button. It sits at the inline end, lifts by --sticky-bar-height to clear a sticky buy bar, and keeps clear of device safe areas.',
    ar: 'مشغّل عائم بإجراءات واتساب والاتصال والمحادثة يُفتح من زر واحد. يقع عند نهاية السطر، ويرتفع بقيمة --sticky-bar-height ليتجاوز شريط الشراء الثابت، ويحترم المناطق الآمنة للجهاز.',
  },
  usage: `import { FloatingContact } from "@/components/ui/floating-contact"\n\n<FloatingContact whatsapp={{ phone: "+966501234567", message: "Hello" }} phone="+966112345678" />`,
  examples: { Default: { en: 'Open launcher', ar: 'مشغّل مفتوح' } },
  accessibility: [
    {
      en: 'A disclosure button with aria-expanded and aria-controls. Escape closes it and returns focus to the button. A click outside closes it too.',
      ar: 'زر إفصاح مع aria-expanded وaria-controls. يغلقه Escape ويعيد التركيز إلى الزر. ويغلقه النقر خارجه أيضًا.',
    },
    {
      en: 'The WhatsApp link says it opens in a new tab. The action buttons are at least 36px tall.',
      ar: 'يذكر رابط واتساب أنه يفتح في تبويب جديد. ارتفاع أزرار الإجراءات 36px على الأقل.',
    },
    {
      en: 'Set --sticky-bar-height on the page when a sticky bar is visible, for example on :root.',
      ar: 'اضبط --sticky-bar-height في الصفحة عند ظهور شريط ثابت، مثلًا على :root.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border">
      <FloatingContact
        defaultOpen
        className="absolute"
        whatsapp={{ phone: '+966501234567', message: lang === 'ar' ? 'مرحبًا، أحتاج مساعدة' : 'Hello, I need help' }}
        phone="+966112345678"
        labels={lang === 'ar' ? floatingContactLabelsAr : undefined}
      />
    </div>
  );
}

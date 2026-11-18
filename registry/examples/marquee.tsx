import { Marquee, marqueeLabelsAr } from '@/registry/ui/marquee';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A scrolling strip for partner logos or short announcements. It pauses on hover and focus, has a pause button, and is a static wrapped row when the user prefers reduced motion.',
    ar: 'شريط متحرك لشعارات الشركاء أو إعلانات قصيرة. يتوقف عند التمرير والتركيز، وفيه زر إيقاف، ويصبح صفا ثابتا ملتفا عندما يفضل المستخدم تقليل الحركة.',
  },
  usage: `import { Marquee } from "@/components/ui/marquee"\n\n<Marquee speed={40}>\n  <img src="/acme.svg" alt="Acme" />\n  <img src="/globex.svg" alt="Globex" />\n</Marquee>`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'A visible pause button meets WCAG 2.2.2. Hover or keyboard focus on the entries also pauses the motion.',
      ar: 'زر إيقاف مرئي يحقق WCAG 2.2.2. كما يوقف التمرير أو تركيز لوحة المفاتيح على العناصر الحركة.',
    },
    {
      en: 'The repeated copy is hidden from screen readers and from the tab order. The motion follows the reading direction.',
      ar: 'النسخة المكررة مخفية عن قارئات الشاشة وعن ترتيب Tab. وتتبع الحركة اتجاه القراءة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const names = ar
    ? ['متجر النخيل', 'شركة الواحة', 'مؤسسة الرمال', 'دار الميزان', 'بيت القهوة']
    : ['Palm Store', 'Oasis Co', 'Sands Group', 'Mizan House', 'Coffee House'];
  return (
    <Marquee className="w-full max-w-xl" labels={ar ? marqueeLabelsAr : undefined}>
      {names.map((name) => (
        <a key={name} href="#" className="rounded-lg border px-4 py-2 text-sm whitespace-nowrap">
          {name}
        </a>
      ))}
    </Marquee>
  );
}

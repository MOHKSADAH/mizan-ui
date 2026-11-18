import { Toc, tocLabelsAr } from '@/registry/ui/toc';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A table of contents that marks the heading you are reading. It uses an IntersectionObserver through the use-scrollspy hook.',
    ar: 'جدول محتويات يحدد العنوان الذي تقرأه. يستخدم IntersectionObserver عبر الخطاف use-scrollspy.',
  },
  usage: `import { Toc } from "@/components/ui/toc"\n\n<Toc items={[{ id: "intro", label: "Intro" }, { id: "usage", label: "Usage", level: 3 }]} />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'A nav landmark with a label. The active link has aria-current="location", a heavier weight and a bar at the inline start, so it is not marked by color alone.',
      ar: 'معلم تنقل له تسمية. الرابط النشط عليه aria-current="location" ووزن أثقل وخط عند بداية السطر، فلا يتميز باللون وحده.',
    },
    {
      en: 'Heading ids can keep Arabic letters. Place the rail at the inline end of the page.',
      ar: 'يمكن أن تحتفظ معرفات العناوين بالحروف العربية. ضع الشريط عند نهاية السطر في الصفحة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Toc
      className="w-56"
      labels={ar ? tocLabelsAr : undefined}
      items={
        ar
          ? [
              { id: 'مقدمة', label: 'مقدمة' },
              { id: 'الاستخدام', label: 'الاستخدام' },
              { id: 'أمثلة', label: 'أمثلة', level: 3 },
            ]
          : [
              { id: 'intro', label: 'Introduction' },
              { id: 'usage', label: 'Usage' },
              { id: 'examples', label: 'Examples', level: 3 },
            ]
      }
    />
  );
}

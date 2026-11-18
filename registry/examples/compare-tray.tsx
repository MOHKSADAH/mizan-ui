import { CompareTrayDemo } from '@/registry/examples/compare-tray.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A tray of the products chosen for comparison, with a live count, remove buttons, clear all and a compare button that waits for the minimum. Place it yourself, for example fixed to the bottom.',
    ar: 'صينية بالمنتجات المختارة للمقارنة، مع عدد حي وأزرار إزالة ومسح الكل وزر مقارنة ينتظر الحد الأدنى. ضعها بنفسك، مثلًا ثابتة أسفل الصفحة.',
  },
  usage: `import { CompareTray } from "@/components/ui/compare-tray"\n\n<CompareTray className="fixed inset-x-0 bottom-0 z-40" items={items} onRemove={remove} onClear={clear} onCompare={open} />`,
  examples: { Default: { en: 'Two products chosen', ar: 'منتجان مختاران' } },
  accessibility: [
    {
      en: 'The tray is a named region. The count is a polite live region, so adding or removing a product is announced.',
      ar: 'الصينية منطقة مسمّاة. العدد منطقة حية مهذبة فيُعلن إضافة المنتج أو إزالته.',
    },
    {
      en: 'The compare button is disabled below the minimum, and a text hint says how many more are needed.',
      ar: 'زر المقارنة معطل تحت الحد الأدنى ويذكر نص توضيحي كم منتجًا إضافيًا مطلوبًا.',
    },
    {
      en: 'Each remove button names its product. Thumbnails are decorative because the name is text.',
      ar: 'كل زر إزالة يسمّي منتجه. الصور المصغّرة زخرفية لأن الاسم نص.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <CompareTrayDemo lang={lang} />;
}

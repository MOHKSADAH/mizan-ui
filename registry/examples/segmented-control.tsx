import { SegmentedControl } from '@/registry/ui/segmented-control';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Joined buttons for one choice. A sliding indicator shows the selection, and it is replaced by a background on the selected item when reduced motion is on.',
    ar: 'أزرار متصلة لاختيار واحد. يعرض مؤشر منزلق الاختيار، ويُستبدل بخلفية على العنصر المختار عند تفعيل تقليل الحركة.',
  },
  usage: `import { SegmentedControl } from "@/components/ui/segmented-control"\n\n<SegmentedControl aria-label="Range" options={[{ value: "day", label: "Day" }]} onValueChange={setRange} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
  },
  accessibility: [
    {
      en: 'Built on the toggle group: Tab enters the group, arrow keys move between items (they follow the reading direction), Space or Enter selects. One item is always selected.',
      ar: 'مبني على مجموعة التبديل: يدخل Tab المجموعة، وتنتقل مفاتيح الأسهم بين العناصر (وتتبع اتجاه القراءة)، ويختار Space أو Enter. يبقى عنصر واحد مختارًا دائمًا.',
    },
    {
      en: 'The indicator is decoration only: the selection is exposed with aria-pressed, so it does not rely on motion or color.',
      ar: 'المؤشر للزينة فقط: يُكشف الاختيار عبر aria-pressed فلا يعتمد على الحركة أو اللون.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const label = (en: string, ar: string) => (lang === 'ar' ? ar : en);
  return (
    <SegmentedControl
      lang={lang}
      aria-label={label('Range', 'النطاق')}
      defaultValue="week"
      options={[
        { value: 'day', label: label('Day', 'يوم') },
        { value: 'week', label: label('Week', 'أسبوع') },
        { value: 'month', label: label('Month', 'شهر') },
      ]}
    />
  );
}

import { SegmentedBar } from '@/registry/ui/segmented-bar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'One bar split into parts, such as a budget split by agent. Parts start at the inline-start side and the empty remainder stays muted. A legend repeats every part as text.',
    ar: 'شريط واحد مقسوم إلى أجزاء، مثل ميزانية موزعة على الوكلاء. تبدأ الأجزاء من جهة البداية ويبقى المتبقي بلون خافت. وتكرر وسيلة الإيضاح كل جزء كنص.',
  },
  usage: `import { SegmentedBar } from "@/components/ui/segmented-bar"\n\n<SegmentedBar total={25} legend segments={[{ id: "a", value: 8, label: "Invoices" }, { id: "b", value: 5, label: "Support" }]} />`,
  examples: {
    Default: { en: 'Budget split by agent', ar: 'ميزانية موزعة على الوكلاء' },
    Tones: { en: 'Status tones, no legend', ar: 'ألوان الحالة بلا وسيلة إيضاح' },
  },
  accessibility: [
    {
      en: 'With a legend, the legend is the text alternative and the bar is hidden from screen readers. Without one, pass aria-label and the bar is one image.',
      ar: 'مع وسيلة الإيضاح تكون هي البديل النصي ويُخفى الشريط عن قارئات الشاشة. وبدونها مرر aria-label ليصبح الشريط صورة واحدة.',
    },
    {
      en: 'Parts are told apart by the legend, not by color alone.',
      ar: 'تُميَّز الأجزاء بوسيلة الإيضاح وليس باللون وحده.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="w-full max-w-md">
      <SegmentedBar
        total={25}
        legend
        size="lg"
        segments={[
          { id: 'inv', value: 8.4, label: ar ? 'وكيل الفواتير' : 'Invoice agent', valueLabel: '$8.40' },
          { id: 'sup', value: 5.9, label: ar ? 'وكيل الدعم' : 'Support agent', valueLabel: '$5.90' },
          { id: 'stk', value: 4.1, label: ar ? 'وكيل المخزون' : 'Stock agent', valueLabel: '$4.10' },
        ]}
      />
    </div>
  );
}

export function Tones({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-md gap-4">
      <SegmentedBar
        aria-label={ar ? 'استُهلك 62% من الرصيد' : '62% of credits used'}
        total={100}
        segments={[{ id: 'used', value: 62, tone: 'primary' }]}
      />
      <SegmentedBar
        aria-label={ar ? 'تجاوز التقدير الرصيد' : 'The estimate is over the balance'}
        total={40}
        segments={[{ id: 'over', value: 52, tone: 'warning' }]}
      />
    </div>
  );
}

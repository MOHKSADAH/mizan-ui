import { ContextMeterDemo } from '@/registry/examples/context-meter.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A small ring with the percent of the context window used. The popover shows the exact tokens, a bar, and the cost of input, output and cached tokens.',
    ar: 'حلقة صغيرة بنسبة نافذة السياق المستخدمة. تعرض النافذة المنبثقة الرموز بدقة وشريطًا وتكلفة المدخلات والمخرجات والرموز المخزّنة مؤقتًا.',
  },
  usage: `import { ContextMeter } from "@/components/ui/context-meter"

<ContextMeter used={133900} max={200000} usage={rows} currency="USD" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Full: { en: 'Nearly full', ar: 'شبه ممتلئة' },
  },
  accessibility: [
    { en: 'The trigger is named "Context window, 67% used". The ring is decorative.', ar: 'اسم الزر "نافذة السياق، 67% مستخدم". الحلقة للزينة.' },
    { en: 'At 90% the ring turns to the destructive color, and the percent is also written, so color is never the only signal.', ar: 'عند 90% تتحول الحلقة إلى لون الخطر، وتُكتب النسبة أيضًا، فلا يكون اللون الإشارة الوحيدة.' },
    { en: 'The ring fills the other way in RTL. Numbers and costs stay left to right.', ar: 'تمتلئ الحلقة بالاتجاه المعاكس في RTL. تبقى الأرقام والتكاليف من اليسار إلى اليمين.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <ContextMeterDemo lang={lang} />;
}

export function Full({ lang }: ExampleProps) {
  return <ContextMeterDemo lang={lang} used={186000} />;
}

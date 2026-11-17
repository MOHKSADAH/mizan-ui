import { ColorPicker } from '@/registry/ui/color-picker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A compact color picker: a saturation and brightness area, a hue strip, swatches, and a text field that takes hex or oklch.',
    ar: 'منتقي ألوان مضغوط: منطقة للتشبع والسطوع وشريط للصبغة وألوان جاهزة وحقل نصي يقبل hex أو oklch.',
  },
  usage: `import { ColorPicker } from "@/components/ui/color-picker"\n\n<ColorPicker defaultValue="#3366cc" swatches={["#3366cc", "#cc3333"]} onValueChange={setColor} />`,
  examples: {
    Default: { en: 'With swatches', ar: 'مع ألوان جاهزة' },
    Oklch: { en: 'oklch text field', ar: 'حقل نصي بصيغة oklch' },
  },
  accessibility: [
    {
      en: 'The area is a slider with a text value for both axes: Left and Right change saturation, Up and Down change brightness, Shift or Page Up and Page Down take steps of 10, Home and End set saturation to its minimum and maximum.',
      ar: 'المنطقة شريط تمرير بقيمة نصية للمحورين: يغيّر السهمان يمينًا ويسارًا التشبع، ويغيّر السهمان لأعلى وأسفل السطوع، وتأخذ Shift أو Page Up وPage Down خطوات من 10، وتضبط Home وEnd التشبع على حدّيه.',
    },
    {
      en: 'The hue strip is a standard slider. The text field is the keyboard alternative for the whole picker and reports invalid input with text. The pads stay left to right in Arabic pages.',
      ar: 'شريط الصبغة شريط تمرير قياسي. الحقل النصي هو البديل بلوحة المفاتيح للمنتقي كله ويبلغ عن الإدخال غير الصالح بنص. تبقى اللوحات من اليسار إلى اليمين في الصفحات العربية.',
    },
    {
      en: 'Swatches are buttons named by their color value, with aria-pressed for the current one.',
      ar: 'الألوان الجاهزة أزرار تحمل قيمة اللون كاسم، مع aria-pressed للون الحالي.',
    },
  ],
};

const swatches = ['#1d4ed8', '#047857', '#b45309', '#b91c1c', '#7e22ce', '#0f172a'];

export function Default({ lang }: ExampleProps) {
  return <ColorPicker lang={lang} defaultValue="#1d4ed8" swatches={swatches} />;
}

export function Oklch({ lang }: ExampleProps) {
  return <ColorPicker lang={lang} defaultValue="#047857" format="oklch" />;
}

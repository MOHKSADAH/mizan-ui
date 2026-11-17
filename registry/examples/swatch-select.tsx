import { SwatchSelect, swatchSelectLabelsAr, type SwatchOption } from '@/registry/ui/swatch-select';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Color, size and image swatches as a radio group. The selected name shows next to the label, and out-of-stock options are crossed out and named in text.',
    ar: 'خيارات الألوان والمقاسات والصور كمجموعة اختيار. يظهر اسم الخيار المحدد بجانب العنوان، وتُشطب الخيارات غير المتوفرة وتُسمّى نصيًا.',
  },
  usage: `import { SwatchSelect } from "@/components/ui/swatch-select"\n\n<SwatchSelect\n  label="Color"\n  options={[{ value: "red", label: "Red", color: "#b91c1c" }]}\n  defaultValue="red"\n/>`,
  examples: {
    Color: { en: 'Color swatches', ar: 'ألوان' },
    Size: { en: 'Sizes with out of stock', ar: 'مقاسات مع نفاد' },
    Image: { en: 'Image swatches', ar: 'صور' },
  },
  accessibility: [
    {
      en: 'A radio group with arrow-key movement that follows the reading direction. Each swatch has a text name, and out-of-stock swatches add "Out of stock" to it.',
      ar: 'مجموعة اختيار تتحرك بمفاتيح الأسهم وفق اتجاه القراءة. لكل خيار اسم نصي، ويضيف غير المتوفر عبارة "غير متوفر" إلى اسمه.',
    },
    {
      en: 'Out-of-stock options are crossed out and a text legend explains it, so the state never relies on color.',
      ar: 'تُشطب الخيارات غير المتوفرة ويشرح ذلك نص توضيحي، فلا تعتمد الحالة على اللون.',
    },
  ],
};

const labels = (lang: ExampleProps['lang']) => (lang === 'ar' ? swatchSelectLabelsAr : undefined);
const t = (lang: ExampleProps['lang'], en: string, ar: string) => (lang === 'ar' ? ar : en);

export function Color({ lang }: ExampleProps) {
  const options: SwatchOption[] = [
    { value: 'sand', label: t(lang, 'Sand', 'رملي'), color: 'oklch(0.85 0.05 85)' },
    { value: 'olive', label: t(lang, 'Olive', 'زيتي'), color: 'oklch(0.5 0.08 125)' },
    { value: 'navy', label: t(lang, 'Navy', 'كحلي'), color: 'oklch(0.3 0.08 260)', outOfStock: true },
  ];
  return <SwatchSelect label={t(lang, 'Color', 'اللون')} options={options} defaultValue="olive" labels={labels(lang)} />;
}

export function Size({ lang }: ExampleProps) {
  const options: SwatchOption[] = ['S', 'M', 'L', 'XL'].map((size) => ({ value: size, label: size, outOfStock: size === 'XL' }));
  return <SwatchSelect label={t(lang, 'Size', 'المقاس')} options={options} defaultValue="M" labels={labels(lang)} />;
}

export function Image({ lang }: ExampleProps) {
  const pattern = (hue: number) =>
    `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="oklch(0.9 0.04 ${hue})"/><rect width="4" height="4" fill="oklch(0.55 0.1 ${hue})"/></svg>`)}`;
  const options: SwatchOption[] = [
    { value: 'check', label: t(lang, 'Check', 'مربعات'), image: pattern(30) },
    { value: 'weave', label: t(lang, 'Weave', 'نسيج'), image: pattern(200) },
  ];
  return <SwatchSelect label={t(lang, 'Fabric', 'القماش')} options={options} defaultValue="check" labels={labels(lang)} />;
}

import { RegionCitySelect, regionCitySelectLabelsAr } from '@/registry/ui/region-city-select';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Two linked comboboxes for the region and the city, from a curated list of the 13 Saudi regions with their main cities (not a complete city list). Names show in Arabic or English by lang. Search matches both languages and ignores Arabic diacritics and alef forms. Changing the region clears the city.',
    ar: 'مربعا تحرير وسرد مرتبطان للمنطقة والمدينة، من قائمة منتقاة للمناطق السعودية الـ 13 ومدنها الرئيسية (وليست قائمة كاملة بالمدن). تظهر الأسماء بالعربية أو الإنجليزية حسب lang. يطابق البحث اللغتين ويتجاهل التشكيل وأشكال الألف. تغيير المنطقة يمسح المدينة.',
  },
  usage: `import { RegionCitySelect } from "@/components/ui/region-city-select"\n\n<RegionCitySelect lang="ar" onValueChange={({ region, city }) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a value', ar: 'بقيمة' },
  },
  accessibility: [
    {
      en: 'Each field is a combobox with a visible label. The city field stays disabled until a region is chosen.',
      ar: 'كل حقل مربع تحرير وسرد بتسمية ظاهرة. يبقى حقل المدينة معطلاً حتى تُختار المنطقة.',
    },
    {
      en: 'Arrow keys move through the list, Enter selects, and Escape closes it.',
      ar: 'تتنقل مفاتيح الأسهم في القائمة، ويحدد Enter العنصر، ويغلقها Escape.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <RegionCitySelect lang={lang} labels={lang === 'ar' ? regionCitySelectLabelsAr : undefined} className="max-w-lg" />;
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <RegionCitySelect
      lang={lang}
      defaultValue={{ region: 'SA-04', city: 'Dammam' }}
      labels={lang === 'ar' ? regionCitySelectLabelsAr : undefined}
      className="max-w-lg"
    />
  );
}

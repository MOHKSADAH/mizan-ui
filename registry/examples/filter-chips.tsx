import { FilterChipsDemo } from '@/registry/examples/filter-chips.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Removable chips for the active product filters, a clear-all button and a live result count. The row scrolls sideways when it overflows.',
    ar: 'شرائح قابلة للإزالة لفلاتر المنتجات المفعّلة، وزر مسح الكل، وعدد نتائج حي. يتمرر الصف أفقيًا عند الفيضان.',
  },
  usage: `import { FilterChips } from "@/components/ui/filter-chips"\n\n<FilterChips\n  filters={filters}\n  resultCount={42}\n  onRemove={remove}\n  onClearAll={clear}\n/>`,
  examples: { Default: { en: 'Active filters', ar: 'الفلاتر المفعّلة' } },
  accessibility: [
    {
      en: 'The chips are a list. Each remove button names its filter. The result count is a polite live region, so changes are announced after a filter is removed.',
      ar: 'الشرائح قائمة. يسمّي كل زر إزالة فلتره. عدد النتائج منطقة حية مهذبة فيُعلن التغيير بعد إزالة فلتر.',
    },
    {
      en: 'The scrolling row can take focus, so keyboard users can scroll it with the arrow keys. The edge is a hard clip, because gradients are not used.',
      ar: 'يمكن للصف المتمرر أخذ التركيز فيتمرر بمفاتيح الأسهم. الحافة قص حاد لأن التدرجات غير مستخدمة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <FilterChipsDemo lang={lang} />;
}

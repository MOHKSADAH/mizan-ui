import { MultiSelect, multiSelectLabelsAr, type MultiSelectOption } from '@/registry/ui/multi-select';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Pick several options from a searchable list. Selected options show as removable chips in the input. Search ignores case, diacritics and Arabic spelling variants.',
    ar: 'اختيار عدة خيارات من قائمة قابلة للبحث. تظهر الخيارات المختارة كرقائق قابلة للإزالة داخل الحقل. يتجاهل البحث حالة الأحرف والتشكيل وصيغ الإملاء العربية.',
  },
  usage: `import { MultiSelect } from "@/components/ui/multi-select"\n\n<MultiSelect options={[{ value: "ruh", label: "Riyadh" }]} aria-label="Cities" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Grouped: { en: 'Grouped options', ar: 'خيارات مجمّعة' },
  },
  accessibility: [
    {
      en: 'Follows the APG combobox pattern with a listbox popup: type to filter, arrow keys move through options, Enter selects, Escape closes, Backspace on an empty input removes the last chip.',
      ar: 'يتبع نمط APG لصندوق التحرير والسرد مع قائمة منبثقة: اكتب للتصفية، وتتنقل مفاتيح الأسهم بين الخيارات، ويختار Enter، ويغلق Escape، ويزيل Backspace في الحقل الفارغ آخر رقاقة.',
    },
    {
      en: 'Each chip has a remove button named with the option label.',
      ar: 'لكل رقاقة زر إزالة يحمل اسم الخيار.',
    },
  ],
};

const cities = (lang: 'en' | 'ar'): MultiSelectOption[] => [
  { value: 'ruh', label: lang === 'ar' ? 'الرياض' : 'Riyadh', group: lang === 'ar' ? 'الوسطى' : 'Central' },
  { value: 'dmm', label: lang === 'ar' ? 'الدمام' : 'Dammam', group: lang === 'ar' ? 'الشرقية' : 'Eastern' },
  { value: 'jed', label: lang === 'ar' ? 'جدة' : 'Jeddah', group: lang === 'ar' ? 'الغربية' : 'Western' },
  { value: 'mak', label: lang === 'ar' ? 'مكة المكرمة' : 'Makkah', group: lang === 'ar' ? 'الغربية' : 'Western' },
];

export function Default({ lang }: ExampleProps) {
  return (
    <MultiSelect
      labels={lang === 'ar' ? multiSelectLabelsAr : undefined}
      options={cities(lang).map(({ group: _g, ...o }) => o)}
      defaultValue={['ruh']}
      placeholder={lang === 'ar' ? 'اختر المدن' : 'Select cities'}
      aria-label={lang === 'ar' ? 'المدن' : 'Cities'}
    />
  );
}

export function Grouped({ lang }: ExampleProps) {
  return <MultiSelect labels={lang === 'ar' ? multiSelectLabelsAr : undefined} options={cities(lang)} aria-label={lang === 'ar' ? 'المدن' : 'Cities'} />;
}

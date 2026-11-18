import { TagsInputDemo } from '@/registry/examples/tags-input.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Free-text tags. Enter or a comma adds a tag, Backspace removes the last one, and pasted text is split into several tags.',
    ar: 'وسوم بنص حر. يضيف Enter أو الفاصلة وسمًا، ويحذف Backspace آخر وسم، ويُقسَّم النص الملصوق إلى عدة وسوم.',
  },
  usage: `import { TagsInput } from "@/components/ui/tags-input"\n\n<TagsInput aria-label="Keywords" max={5} onValueChange={setTags} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Max: { en: 'At most 3 tags, with initial values', ar: 'ثلاثة وسوم كحد أقصى، مع قيم ابتدائية' },
  },
  accessibility: [
    {
      en: 'Enter, comma, Arabic comma and semicolon add a tag. Enter is ignored while an IME composition is active.',
      ar: 'يضيف Enter والفاصلة والفاصلة العربية والفاصلة المنقوطة وسمًا. يتجاهل Enter أثناء تركيب نص IME.',
    },
    {
      en: 'Duplicates are detected without regard to case, diacritics or common Arabic spelling variants. Add, remove, duplicate and limit messages go to a polite live region and are also shown as text.',
      ar: 'يُكتشف التكرار دون اعتبار لحالة الأحرف أو التشكيل أو صيغ الإملاء العربية الشائعة. تذهب رسائل الإضافة والإزالة والتكرار والحد إلى منطقة حية مهذبة وتظهر أيضًا نصًا.',
    },
    {
      en: 'Each tag has a remove button named with the tag text.',
      ar: 'لكل وسم زر إزالة يحمل نص الوسم.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <TagsInputDemo lang={lang} aria-label={lang === 'ar' ? 'الكلمات المفتاحية' : 'Keywords'} placeholder={lang === 'ar' ? 'اكتب واضغط Enter' : 'Type and press Enter'} />;
}

export function Max({ lang }: ExampleProps) {
  return (
    <TagsInputDemo
      lang={lang}
      max={3}
      defaultValue={lang === 'ar' ? ['الرياض', 'جدة'] : ['Riyadh', 'Jeddah']}
      aria-label={lang === 'ar' ? 'المدن' : 'Cities'}
    />
  );
}

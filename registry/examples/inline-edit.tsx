import { InlineEdit } from '@/registry/ui/inline-edit';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Text that turns into an input on click or Enter. Enter or leaving the field saves, Escape discards, and the result is announced.',
    ar: 'نص يتحول إلى حقل إدخال عند النقر أو Enter. يحفظ Enter أو مغادرة الحقل، ويتجاهل Escape التغييرات، وتُعلَن النتيجة.',
  },
  usage: `import { InlineEdit } from "@/components/ui/inline-edit"\n\n<InlineEdit defaultValue="Palm Restaurant" aria-label="Name" onValueChange={save} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Empty: { en: 'Empty with a placeholder', ar: 'فارغ مع نص إرشادي' },
  },
  accessibility: [
    {
      en: 'The display state is a button: Enter or Space starts editing. In the field, Enter saves and Escape cancels, then focus returns to the button. Enter is ignored during IME composition.',
      ar: 'حالة العرض زر: يبدأ Enter أو Space التعديل. في الحقل يحفظ Enter ويلغي Escape ثم يعود التركيز إلى الزر. يُتجاهل Enter أثناء تركيب نص IME.',
    },
    {
      en: 'Saved and discarded results go to a polite live region. The value uses dir auto, so Arabic and Latin text align correctly.',
      ar: 'تذهب نتائج الحفظ والتجاهل إلى منطقة حية مهذبة. تستخدم القيمة dir auto فيُحاذى النص العربي واللاتيني بشكل صحيح.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <InlineEdit lang={lang} defaultValue={lang === 'ar' ? 'مطعم النخيل' : 'Palm Restaurant'} aria-label={lang === 'ar' ? 'الاسم' : 'Name'} />;
}

export function Empty({ lang }: ExampleProps) {
  return <InlineEdit lang={lang} placeholder={lang === 'ar' ? 'أضف عنوانًا' : 'Add a title'} aria-label={lang === 'ar' ? 'العنوان' : 'Title'} />;
}

import { SuggestionsDemo } from '@/registry/examples/suggestions.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Prompt chips for an empty chat or under an answer. A chip puts its text in the input and leaves the sending to the user.',
    ar: 'شرائح اقتراحات لمحادثة فارغة أو أسفل إجابة. تضع الشريحة نصها في الحقل وتترك الإرسال للمستخدم.',
  },
  usage: `import { Suggestions } from "@/components/ui/suggestions"

<Suggestions suggestions={["Summarize this week sales"]} onSelect={(prompt) => setValue(prompt)} />`,
  examples: {
    Default: { en: 'Fills the input', ar: 'تملأ الحقل' },
    Scroll: { en: 'One scrolling row', ar: 'صف واحد قابل للتمرير' },
  },
  accessibility: [
    { en: 'The chips are buttons inside a labelled group. A chip never sends the message, so the user can edit the text first.', ar: 'الشرائح أزرار داخل مجموعة لها تسمية. لا ترسل الشريحة الرسالة، فيعدّل المستخدم النص أولًا.' },
    { en: 'Each chip has dir="auto", so an Arabic chip and an English chip both read right in the same row.', ar: 'لكل شريحة dir="auto"، فتُقرأ الشريحة العربية والإنجليزية بشكل صحيح في الصف نفسه.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SuggestionsDemo lang={lang} />;
}

export function Scroll({ lang }: ExampleProps) {
  return <SuggestionsDemo lang={lang} layout="scroll" />;
}

import { ReasoningDone, ReasoningLive } from '@/registry/examples/reasoning.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A collapsible "thinking" line. It opens and shimmers while the model thinks, then closes and shows how long it took. Strings render as paragraphs that follow their own direction.',
    ar: 'سطر "تفكير" قابل للطي. يُفتح ويلمع أثناء تفكير النموذج، ثم يُغلق ويعرض المدة. تُعرض النصوص كفقرات تتبع اتجاهها.',
  },
  usage: `import { Reasoning } from "@/components/ui/reasoning"

<Reasoning status="done" duration={4}>
  {reasoningText}
</Reasoning>`,
  examples: {
    Default: { en: 'Finished', ar: 'منتهٍ' },
    Live: { en: 'Thinking, then done', ar: 'يفكّر ثم ينتهي' },
  },
  accessibility: [
    { en: 'The line is a real button with aria-expanded. The title says "Thinking" or "Thought for 4 seconds", so the state never relies on the shimmer.', ar: 'السطر زر حقيقي مع aria-expanded. يقول العنوان "يفكّر" أو "فكّر لمدة 4 ثوانٍ"، فلا تعتمد الحالة على اللمعان.' },
    { en: 'The shimmer and the spinner stop when the user prefers reduced motion.', ar: 'يتوقف اللمعان والمؤشر عندما يفضّل المستخدم تقليل الحركة.' },
    { en: 'Each paragraph has dir="auto", so a mixed Arabic and English text keeps the right direction per paragraph.', ar: 'لكل فقرة dir="auto"، فيحافظ النص المختلط بين العربية والإنجليزية على الاتجاه الصحيح في كل فقرة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <ReasoningDone lang={lang} />;
}

export function Live({ lang }: ExampleProps) {
  return <ReasoningLive lang={lang} />;
}

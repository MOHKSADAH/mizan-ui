import { MessageActionsDemo } from '@/registry/examples/message-actions.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The row under an assistant message: copy, regenerate, like and dislike, and a 1/3 pager to move between regenerated responses. A button shows only when you give it a handler.',
    ar: 'الصف أسفل رسالة المساعد: نسخ وإعادة توليد وإعجاب وعدم إعجاب، ومنقّل 1/3 للتنقل بين الإجابات المعاد توليدها. يظهر الزر فقط عند تمرير معالجه.',
  },
  usage: `import { MessageActions } from "@/components/ui/message-actions"

<MessageActions
  text={answer}
  onRegenerate={regenerate}
  feedback={feedback}
  onFeedback={setFeedback}
  branch={{ index: 1, count: 3 }}
  onBranchChange={setIndex}
/>`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    { en: 'Every button is an icon with an aria-label. Like and dislike use aria-pressed, and the active one is filled.', ar: 'كل زر أيقونة مع aria-label. يستخدم الإعجاب وعدم الإعجاب aria-pressed، ويمتلئ الزر النشط.' },
    { en: 'The pager reads "Response 1 of 3" and announces a change politely. The arrows flip in RTL, so "previous" is on the right.', ar: 'يقرأ المنقّل "الإجابة 1 من 3" ويعلن التغيير بهدوء. تنقلب الأسهم في RTL فيكون "السابق" على اليمين.' },
    { en: 'The copy button announces "Copied" in a live region.', ar: 'يعلن زر النسخ "تم النسخ" في منطقة حية.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <MessageActionsDemo lang={lang} />;
}

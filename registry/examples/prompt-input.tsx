import { PromptInputDemo } from '@/registry/examples/prompt-input.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A chat input: a textarea that follows the direction of what you type, an attachment strip, slots for tools and a model, and a send button that turns into stop while the answer streams.',
    ar: 'مربع إدخال للمحادثة: حقل نص يتبع اتجاه ما تكتبه، وشريط مرفقات، وخانات للأدوات والنموذج، وزر إرسال يتحول إلى إيقاف أثناء كتابة الإجابة.',
  },
  usage: `import { PromptInput } from "@/components/ui/prompt-input"

<PromptInput
  value={value}
  onValueChange={setValue}
  status={status}
  onSubmit={send}
  onStop={stop}
  attachments={files}
  onRemoveAttachment={remove}
  tools={<AttachButton />}
  model={<ModelPicker models={models} />}
/>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Slots: { en: 'With attachments, tools and a model', ar: 'مع مرفقات وأدوات ونموذج' },
  },
  accessibility: [
    { en: 'Enter sends and Shift+Enter adds a line. Enter does nothing while an input method (Arabic or Chinese keyboards) is composing.', ar: 'يرسل Enter ويضيف Shift+Enter سطرًا. لا يفعل Enter شيئًا أثناء تركيب النص بطريقة إدخال.' },
    { en: 'The textarea has dir="auto": it takes the direction of the first strong character, so Arabic and English both read right.', ar: 'للحقل dir="auto": يأخذ اتجاه أول حرف قوي، فتُقرأ العربية والإنجليزية كلتاهما بشكل صحيح.' },
    { en: 'The send button is disabled while the box is empty. While streaming it is a stop button with its own label.', ar: 'زر الإرسال معطّل والحقل فارغ. أثناء الكتابة يصبح زر إيقاف بتسمية خاصة.' },
    { en: 'The send arrow flips in RTL. Every attachment has a remove button named after the file.', ar: 'ينقلب سهم الإرسال في RTL. ولكل مرفق زر إزالة باسم الملف.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <PromptInputDemo lang={lang} />;
}

export function Slots({ lang }: ExampleProps) {
  return <PromptInputDemo lang={lang} withTools />;
}

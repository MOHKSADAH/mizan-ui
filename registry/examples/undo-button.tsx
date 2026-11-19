import { UndoButtonDemo } from '@/registry/examples/undo-button.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A destructive button that turns into "Undo (5)". The action waits for the countdown and runs at 0. Press the button again or Escape to cancel. A thin bar shows the time left.',
    ar: 'زر خطر يتحول إلى "تراجع (5)". ينتظر الإجراء العد التنازلي وينفذ عند 0. اضغط الزر مرة أخرى أو Escape للإلغاء. يعرض شريط رفيع الوقت المتبقي.',
  },
  usage: `import { UndoButton } from "@/components/ui/undo-button"\n\n<UndoButton seconds={5} onConfirm={deleteAccount}>Delete account</UndoButton>`,
  examples: {
    Default: { en: 'Five seconds', ar: 'خمس ثوان' },
    Short: { en: 'Three seconds', ar: 'ثلاث ثوان' },
  },
  accessibility: [
    {
      en: 'A polite live region announces the start ("Deleting in 5 seconds. Press to undo."), the result and the cancel. It does not announce every second.',
      ar: 'تعلن منطقة حية مهذبة عن البدء ("سيتم الحذف بعد 5 ثوان. اضغط للتراجع.") والنتيجة والإلغاء. ولا تعلن كل ثانية.',
    },
    {
      en: 'Keyboard focus stays on the button through every state. Escape undoes. The bar is hidden under reduced motion, and the number carries the countdown.',
      ar: 'يبقى تركيز لوحة المفاتيح على الزر في كل الحالات. يتراجع Escape عن الإجراء. يُخفى الشريط عند تقليل الحركة ويحمل الرقم العد التنازلي.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <UndoButtonDemo lang={lang} />;
}

export function Short({ lang }: ExampleProps) {
  return <UndoButtonDemo lang={lang} seconds={3} />;
}

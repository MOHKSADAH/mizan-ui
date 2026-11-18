import { SignaturePad, signaturePadLabelsAr } from '@/registry/ui/signature-pad';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Draw a signature with a mouse, pen or finger, with undo and clear. It exports a PNG data URL, and a typed-name mode is the keyboard alternative.',
    ar: 'ارسم توقيعًا بالفأرة أو القلم أو الإصبع مع تراجع ومسح. يصدّر رابط بيانات PNG، ووضع كتابة الاسم هو البديل بلوحة المفاتيح.',
  },
  usage: `import { SignaturePad } from "@/components/ui/signature-pad"\n\n<SignaturePad name="signature" onValueChange={(png) => setSignature(png)} />`,
  examples: {
    Default: { en: 'Draw or type', ar: 'رسم أو كتابة' },
  },
  accessibility: [
    {
      en: 'Drawing needs a pointer, so the Type mode is a full keyboard alternative: the typed name is rendered in the same area and exported the same way.',
      ar: 'يحتاج الرسم إلى مؤشر، لذا فوضع الكتابة بديل كامل بلوحة المفاتيح: يُعرض الاسم المكتوب في المنطقة نفسها ويُصدَّر بالطريقة نفسها.',
    },
    {
      en: 'The canvas has role img with a label and a hint linked by aria-describedby. Undo and Clear are buttons, and their results are announced in a polite live region.',
      ar: 'للوحة الرسم الدور img مع تسمية وتلميح مرتبط عبر aria-describedby. التراجع والمسح زرّان وتُعلَن نتيجتهما في منطقة حية مهذبة.',
    },
    {
      en: 'The ink uses currentColor, so it follows the theme. Pass penColor to export a fixed ink color.',
      ar: 'يستخدم الحبر currentColor فيتبع السمة. مرّر penColor لتصدير لون حبر ثابت.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SignaturePad labels={lang === 'ar' ? signaturePadLabelsAr : undefined} />;
}

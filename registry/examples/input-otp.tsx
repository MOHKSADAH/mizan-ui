import { SmsCodeDemo } from '@/registry/examples/input-otp.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A one-time code field in an SMS flow: six digits, paste support, automatic verification when complete, and a resend button that unlocks after a countdown.',
    ar: 'حقل رمز لمرة واحدة في تدفق الرسائل النصية: ستة أرقام ودعم اللصق وتحقق تلقائي عند الاكتمال وزر إعادة إرسال يُفتح بعد عدّ تنازلي.',
  },
  usage: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"\n\n<InputOTP maxLength={6} autoComplete="one-time-code" onComplete={verify}>\n  <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>\n</InputOTP>`,
  examples: {
    SmsCode: { en: 'SMS code with resend countdown', ar: 'رمز الرسالة النصية مع عدّ تنازلي لإعادة الإرسال' },
  },
  accessibility: [
    {
      en: 'The code is one text input with autocomplete one-time-code, so the keyboard and the browser can fill it. The slots are decoration. Pasted Arabic-Indic digits are converted to ASCII.',
      ar: 'الرمز حقل نصي واحد مع autocomplete بقيمة one-time-code فيمكن للوحة المفاتيح والمتصفح تعبئته. الخانات للعرض فقط. تُحوَّل الأرقام الهندية الملصوقة إلى لاتينية.',
    },
    {
      en: 'Errors and the sent confirmation go to a polite live region, and a wrong code also sets aria-invalid. The countdown is plain text, not a live region, so it does not interrupt screen readers every second.',
      ar: 'تذهب الأخطاء وتأكيد الإرسال إلى منطقة حية مهذبة، ويضبط الرمز الخاطئ aria-invalid أيضًا. العدّ التنازلي نص عادي وليس منطقة حية فلا يقاطع قارئات الشاشة كل ثانية.',
    },
  ],
};

export function SmsCode({ lang }: ExampleProps) {
  return <SmsCodeDemo lang={lang} />;
}

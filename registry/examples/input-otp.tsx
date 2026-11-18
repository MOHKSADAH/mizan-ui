import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/registry/ui/input-otp';
import { SmsCodeDemo } from '@/registry/examples/input-otp.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A one-time code field with one slot per character. Paste, autofill and backspace work as in a single input.',
    ar: 'حقل رمز لمرة واحدة بخانة لكل حرف. يعمل اللصق والتعبئة التلقائية والحذف كما في حقل واحد.',
  },
  usage: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

<InputOTP maxLength={4} pattern="^[0-9]+$" aria-label="Verification code">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    FourDigits: { en: 'Four digits', ar: 'أربعة أرقام' },
    Invalid: { en: 'Invalid', ar: 'غير صالح' },
    Disabled: { en: 'Disabled', ar: 'معطّل' },
    SmsCode: { en: 'SMS code with resend countdown', ar: 'رمز الرسالة النصية مع عدّ تنازلي لإعادة الإرسال' },
  },
  accessibility: [
    { en: 'One real input sits behind the slots, so screen readers and autofill see a single field. Name it with aria-label.', ar: 'يوجد حقل حقيقي واحد خلف الخانات، فيرى قارئ الشاشة والتعبئة التلقائية حقلًا واحدًا. سمِّه بـ aria-label.' },
    { en: 'Wrap the code in dir="ltr": digits always read left to right, also in Arabic.', ar: 'ضع الرمز داخل dir="ltr": تُقرأ الأرقام دائمًا من اليسار إلى اليمين، حتى في العربية.' },
    { en: 'Set autoComplete="one-time-code" and inputMode="numeric" for SMS autofill and the number pad.', ar: 'اضبط autoComplete="one-time-code" وinputMode="numeric" لتعبئة الرسائل ولوحة الأرقام.' },
    {
      en: 'Errors and the sent confirmation go to a polite live region, and a wrong code also sets aria-invalid. The countdown is plain text, not a live region, so it does not interrupt screen readers every second.',
      ar: 'تذهب الأخطاء وتأكيد الإرسال إلى منطقة حية مهذبة، ويضبط الرمز الخاطئ aria-invalid أيضًا. العدّ التنازلي نص عادي وليس منطقة حية فلا يقاطع قارئات الشاشة كل ثانية.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="otp-default">{ar ? 'رمز التحقق' : 'Verification code'}</FieldLabel>
      <div dir="ltr">
        <InputOTP id="otp-default" maxLength={6} pattern="^[0-9]+$" inputMode="numeric" autoComplete="one-time-code">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <FieldDescription>{ar ? 'أدخل الرمز المرسل إلى جوالك على +966.' : 'Enter the code sent to your phone on +966.'}</FieldDescription>
    </Field>
  );
}

export function FourDigits({ lang }: ExampleProps) {
  return (
    <div dir="ltr" className="w-fit">
      <InputOTP maxLength={4} pattern="^[0-9]+$" inputMode="numeric" aria-label={lang === 'ar' ? 'رمز PIN' : 'PIN code'}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

export function Invalid({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field data-invalid="true" className="w-fit">
      <div dir="ltr">
        <InputOTP maxLength={4} value="1234" readOnly inputMode="numeric" aria-invalid aria-describedby="otp-invalid-error" aria-label={ar ? 'رمز التحقق' : 'Verification code'}>
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid />
            <InputOTPSlot index={1} aria-invalid />
            <InputOTPSlot index={2} aria-invalid />
            <InputOTPSlot index={3} aria-invalid />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <FieldError id="otp-invalid-error" className="flex items-center gap-1.5">
        <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
        {ar ? 'الرمز غير صحيح. حاول مرة أخرى.' : 'The code is wrong. Try again.'}
      </FieldError>
    </Field>
  );
}

export function Disabled({ lang }: ExampleProps) {
  return (
    <div dir="ltr" className="w-fit">
      <InputOTP maxLength={4} disabled aria-label={lang === 'ar' ? 'رمز التحقق، معطّل' : 'Verification code, disabled'}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

export function SmsCode({ lang }: ExampleProps) {
  return <SmsCodeDemo lang={lang} />;
}

import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/ui/field';
import { Textarea } from '@/registry/ui/textarea';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A multi-line text field that grows with its content.',
    ar: 'حقل نصي متعدد الأسطر يكبر مع محتواه.',
  },
  usage: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Type your message here." />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithLabel: { en: 'With label and hint', ar: 'مع تسمية وتلميح' },
    States: { en: 'Disabled and invalid', ar: 'معطّل وغير صالح' },
    WithButton: { en: 'With button', ar: 'مع زر' },
  },
  accessibility: [
    { en: 'Give every textarea a label or an aria-label.', ar: 'امنح كل حقل نصي تسمية أو aria-label.' },
    { en: 'Text starts at the inline start, so Arabic text aligns right automatically.', ar: 'يبدأ النص من بداية السطر، فيُحاذى النص العربي إلى اليمين تلقائيًا.' },
    { en: 'An invalid state needs error text with an icon, linked with aria-describedby.', ar: 'الحالة غير الصالحة تحتاج نص خطأ مع أيقونة، مرتبطًا عبر aria-describedby.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return <Textarea className="max-w-sm" placeholder={ar ? 'اكتب رسالتك هنا.' : 'Type your message here.'} aria-label={ar ? 'الرسالة' : 'Message'} />;
}

export function WithLabel({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-label">{ar ? 'ملاحظات الطلب' : 'Order notes'}</FieldLabel>
      <Textarea id="textarea-label" placeholder={ar ? 'أي تعليمات للتوصيل؟' : 'Any delivery instructions?'} />
      <FieldDescription>{ar ? 'تصل ملاحظاتك إلى فريق التوصيل.' : 'The delivery team receives your notes.'}</FieldDescription>
    </Field>
  );
}

export function States({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field data-disabled="true">
        <FieldLabel htmlFor="textarea-disabled">{ar ? 'التعليق' : 'Comment'}</FieldLabel>
        <Textarea id="textarea-disabled" disabled defaultValue={ar ? 'التعليقات مغلقة لهذا الطلب.' : 'Comments are closed for this order.'} />
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="textarea-invalid">{ar ? 'سبب الإرجاع' : 'Return reason'}</FieldLabel>
        <Textarea id="textarea-invalid" aria-invalid aria-describedby="textarea-invalid-error" />
        <FieldError id="textarea-invalid-error" className="flex items-center gap-1.5">
          <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
          {ar ? 'اكتب سبب الإرجاع للمتابعة.' : 'Enter a return reason to continue.'}
        </FieldError>
      </Field>
    </div>
  );
}

export function WithButton({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Textarea placeholder={ar ? 'اكتب رسالتك هنا.' : 'Type your message here.'} aria-label={ar ? 'الرسالة' : 'Message'} />
      <Button>{ar ? 'إرسال الرسالة' : 'Send message'}</Button>
    </div>
  );
}

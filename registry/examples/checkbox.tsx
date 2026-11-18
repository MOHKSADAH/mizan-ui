import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Checkbox } from '@/registry/ui/checkbox';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/registry/ui/field';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A control that toggles one option on or off. Built on Base UI Checkbox.',
    ar: 'عنصر يفعّل خيارًا واحدًا أو يعطّله. مبني على Checkbox من Base UI.',
  },
  usage: `import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

<Field orientation="horizontal">
  <Checkbox id="terms" />
  <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
</Field>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithDescription: { en: 'With description', ar: 'مع وصف' },
    Disabled: { en: 'Disabled', ar: 'معطّل' },
    Invalid: { en: 'Invalid', ar: 'غير صالح' },
  },
  accessibility: [
    { en: 'Pair every checkbox with a label through id and htmlFor.', ar: 'اربط كل خانة اختيار بتسمية عبر id وhtmlFor.' },
    { en: 'Space toggles the checkbox when it has focus.', ar: 'يبدّل مفتاح Space الحالة عند التركيز على الخانة.' },
    { en: 'An invalid state needs error text with an icon, never a red border alone.', ar: 'الحالة غير الصالحة تحتاج نص خطأ مع أيقونة، وليس حدًا أحمر فقط.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox id="checkbox-default" />
      <FieldLabel htmlFor="checkbox-default">{lang === 'ar' ? 'أوافق على الشروط والأحكام' : 'Accept terms and conditions'}</FieldLabel>
    </Field>
  );
}

export function WithDescription({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="checkbox-description" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="checkbox-description">{ar ? 'أوافق على الشروط والأحكام' : 'Accept terms and conditions'}</FieldLabel>
        <FieldDescription>
          {ar ? 'بالمتابعة، تقر بأنك قرأت سياسة الخصوصية.' : 'By continuing you confirm that you read the privacy policy.'}
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

export function Disabled({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid gap-3">
      <Field orientation="horizontal" className="w-fit" data-disabled="true">
        <Checkbox id="checkbox-disabled-off" disabled />
        <FieldLabel htmlFor="checkbox-disabled-off">{ar ? 'خيار غير متاح' : 'Unavailable option'}</FieldLabel>
      </Field>
      <Field orientation="horizontal" className="w-fit" data-disabled="true">
        <Checkbox id="checkbox-disabled-on" defaultChecked disabled />
        <FieldLabel htmlFor="checkbox-disabled-on">{ar ? 'خيار مفعّل ومقفل' : 'Locked option, on'}</FieldLabel>
      </Field>
    </div>
  );
}

export function Invalid({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field data-invalid="true" className="max-w-sm">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-invalid" aria-invalid aria-describedby="checkbox-invalid-error" />
        <FieldLabel htmlFor="checkbox-invalid">{ar ? 'أوافق على الشروط والأحكام' : 'Accept terms and conditions'}</FieldLabel>
      </div>
      <FieldError id="checkbox-invalid-error" className="flex items-center gap-1.5">
        <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
        {ar ? 'يجب الموافقة على الشروط للمتابعة.' : 'You must accept the terms to continue.'}
      </FieldError>
    </Field>
  );
}

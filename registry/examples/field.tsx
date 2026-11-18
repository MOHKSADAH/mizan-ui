import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/registry/ui/field';
import { Input } from '@/registry/ui/input';
import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group';
import { Switch } from '@/registry/ui/switch';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Lays out a form control with its label, description and error. Group fields with FieldGroup and FieldSet.',
    ar: 'ينظّم عنصر النموذج مع تسميته ووصفه ورسالة الخطأ. جمّع الحقول عبر FieldGroup وFieldSet.',
  },
  usage: `import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<FieldGroup>
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input id="name" />
    <FieldDescription>Your public name.</FieldDescription>
  </Field>
</FieldGroup>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Invalid: { en: 'Invalid', ar: 'غير صالح' },
    Fieldset: { en: 'Fieldset with radio group', ar: 'مجموعة حقول مع أزرار اختيار' },
    Horizontal: { en: 'Horizontal', ar: 'أفقي' },
  },
  accessibility: [
    { en: 'FieldLabel renders a label: connect it with htmlFor and the control id.', ar: 'يعرض FieldLabel عنصر label: اربطه بـ htmlFor ومعرّف العنصر.' },
    { en: 'FieldError has role="alert", so screen readers announce it. Link it with aria-describedby.', ar: 'لـ FieldError الدور role="alert" فيعلنه قارئ الشاشة. اربطه عبر aria-describedby.' },
    { en: 'Use FieldSet and FieldLegend to name a group of related controls.', ar: 'استخدم FieldSet وFieldLegend لتسمية مجموعة عناصر مترابطة.' },
    { en: 'Error text carries an icon, so the state never relies on red alone.', ar: 'يحمل نص الخطأ أيقونة، فلا تعتمد الحالة على اللون الأحمر وحده.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-name">{ar ? 'الاسم الكامل' : 'Full name'}</FieldLabel>
        <Input id="field-name" autoComplete="name" placeholder={ar ? 'مثال: نورة العتيبي' : 'For example: Noura Alotaibi'} />
      </Field>
      <Field>
        <FieldLabel htmlFor="field-phone">{ar ? 'رقم الجوال' : 'Mobile number'}</FieldLabel>
        <Input id="field-phone" dir="ltr" type="tel" inputMode="tel" autoComplete="tel" placeholder="+966 5X XXX XXXX" className="text-start" />
        <FieldDescription>{ar ? 'نرسل رمز التحقق إلى هذا الرقم.' : 'We send the verification code to this number.'}</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button>{ar ? 'حفظ' : 'Save'}</Button>
        <Button variant="outline">{ar ? 'إلغاء' : 'Cancel'}</Button>
      </Field>
    </FieldGroup>
  );
}

export function Invalid({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="field-email">{ar ? 'البريد الإلكتروني' : 'Email'}</FieldLabel>
      <Input id="field-email" type="email" aria-invalid aria-describedby="field-email-error" defaultValue="noura@example" />
      <FieldError id="field-email-error" className="flex items-center gap-1.5">
        <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
        {ar ? 'أدخل بريدًا إلكترونيًا صالحًا.' : 'Enter a valid email address.'}
      </FieldError>
    </Field>
  );
}

export function Fieldset({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>{ar ? 'التوصيل' : 'Delivery'}</FieldLegend>
      <FieldDescription>{ar ? 'اختر وقت وصول الطلب.' : 'Choose when your order arrives.'}</FieldDescription>
      <RadioGroup defaultValue="today">
        <Field orientation="horizontal">
          <RadioGroupItem value="today" id="field-today" />
          <FieldLabel htmlFor="field-today">{ar ? 'اليوم' : 'Today'}</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="tomorrow" id="field-tomorrow" />
          <FieldLabel htmlFor="field-tomorrow">{ar ? 'غدًا' : 'Tomorrow'}</FieldLabel>
        </Field>
      </RadioGroup>
      <FieldSeparator>{ar ? 'أو' : 'or'}</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="field-pickup">{ar ? 'موعد مخصص' : 'Custom time'}</FieldLabel>
        <Input id="field-pickup" placeholder={ar ? 'مثال: بعد العصر' : 'For example: after 4 pm'} />
      </Field>
    </FieldSet>
  );
}

export function Horizontal({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="field-marketing">{ar ? 'رسائل تسويقية' : 'Marketing emails'}</FieldLabel>
        <FieldDescription>{ar ? 'عروض وأخبار المنتجات مرة في الأسبوع.' : 'Offers and product news once a week.'}</FieldDescription>
      </FieldContent>
      <Switch id="field-marketing" />
    </Field>
  );
}

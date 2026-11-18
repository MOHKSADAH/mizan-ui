import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from '@/registry/ui/field';
import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A set of options where only one can be selected. Arrow keys move the selection.',
    ar: 'مجموعة خيارات يمكن اختيار واحد منها فقط. تنقل مفاتيح الأسهم الاختيار.',
  },
  usage: `import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="standard">
  <Field orientation="horizontal">
    <RadioGroupItem value="standard" id="standard" />
    <FieldLabel htmlFor="standard">Standard</FieldLabel>
  </Field>
</RadioGroup>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithDescription: { en: 'Cards with description', ar: 'بطاقات مع وصف' },
    Disabled: { en: 'Disabled', ar: 'معطّل' },
    Invalid: { en: 'Invalid', ar: 'غير صالح' },
  },
  accessibility: [
    { en: 'The group has role="radiogroup". Name it with a legend or aria-label.', ar: 'للمجموعة role="radiogroup". سمِّها بعنوان fieldset أو aria-label.' },
    { en: 'Only the selected item is in the tab order. Arrow keys move and select.', ar: 'العنصر المحدد وحده ضمن ترتيب Tab. تنقل الأسهم وتحدد.' },
    { en: 'In RTL the left and right arrows follow the visual order.', ar: 'في RTL يتبع السهمان الأيمن والأيسر الترتيب المرئي.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <RadioGroup defaultValue="standard" aria-label={ar ? 'طريقة الشحن' : 'Shipping method'} className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="standard" id="radio-default-standard" />
        <FieldLabel htmlFor="radio-default-standard">{ar ? 'شحن عادي' : 'Standard shipping'}</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="express" id="radio-default-express" />
        <FieldLabel htmlFor="radio-default-express">{ar ? 'شحن سريع' : 'Express shipping'}</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="pickup" id="radio-default-pickup" />
        <FieldLabel htmlFor="radio-default-pickup">{ar ? 'استلام من الفرع' : 'Store pickup'}</FieldLabel>
      </Field>
    </RadioGroup>
  );
}

export function WithDescription({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">{ar ? 'الخطة' : 'Plan'}</FieldLegend>
      <RadioGroup defaultValue="monthly">
        <FieldLabel htmlFor="radio-card-monthly">
          <Field orientation="horizontal">
            <FieldContent>
              <span className="font-medium">{ar ? 'شهري' : 'Monthly'}</span>
              <FieldDescription>{ar ? 'تُجدَّد كل شهر ويمكن إلغاؤها في أي وقت.' : 'Renews every month. Cancel at any time.'}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="monthly" id="radio-card-monthly" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="radio-card-yearly">
          <Field orientation="horizontal">
            <FieldContent>
              <span className="font-medium">{ar ? 'سنوي' : 'Yearly'}</span>
              <FieldDescription>{ar ? 'ادفع مرة واحدة واحصل على شهرين مجانًا.' : 'Pay once and get two months free.'}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="yearly" id="radio-card-yearly" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    </FieldSet>
  );
}

export function Disabled({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <RadioGroup defaultValue="email" aria-label={ar ? 'قناة الإشعار' : 'Notification channel'} className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="email" id="radio-disabled-email" />
        <FieldLabel htmlFor="radio-disabled-email">{ar ? 'البريد الإلكتروني' : 'Email'}</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-disabled="true">
        <RadioGroupItem value="sms" id="radio-disabled-sms" disabled />
        <FieldLabel htmlFor="radio-disabled-sms">{ar ? 'رسالة نصية (غير متاحة)' : 'SMS (unavailable)'}</FieldLabel>
      </Field>
    </RadioGroup>
  );
}

export function Invalid({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <FieldSet className="max-w-sm" data-invalid="true">
      <FieldLegend variant="label">{ar ? 'طريقة الدفع' : 'Payment method'}</FieldLegend>
      <RadioGroup aria-describedby="radio-invalid-error" aria-invalid>
        <Field orientation="horizontal" data-invalid="true">
          <RadioGroupItem value="card" id="radio-invalid-card" aria-invalid />
          <FieldLabel htmlFor="radio-invalid-card">{ar ? 'بطاقة مصرفية' : 'Bank card'}</FieldLabel>
        </Field>
        <Field orientation="horizontal" data-invalid="true">
          <RadioGroupItem value="cod" id="radio-invalid-cod" aria-invalid />
          <FieldLabel htmlFor="radio-invalid-cod">{ar ? 'الدفع عند الاستلام' : 'Cash on delivery'}</FieldLabel>
        </Field>
      </RadioGroup>
      <FieldError id="radio-invalid-error" className="flex items-center gap-1.5">
        <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
        {ar ? 'اختر طريقة دفع للمتابعة.' : 'Choose a payment method to continue.'}
      </FieldError>
    </FieldSet>
  );
}

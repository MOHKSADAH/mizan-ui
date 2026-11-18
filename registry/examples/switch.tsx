import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/registry/ui/field';
import { Switch } from '@/registry/ui/switch';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A control that turns a setting on or off right away. The thumb moves toward the inline end when on.',
    ar: 'عنصر يفعّل إعدادًا أو يعطّله فورًا. تتحرك المقبض نحو نهاية السطر عند التفعيل.',
  },
  usage: `import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

<Field orientation="horizontal">
  <Switch id="airplane" />
  <FieldLabel htmlFor="airplane">Airplane mode</FieldLabel>
</Field>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithDescription: { en: 'With description', ar: 'مع وصف' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    States: { en: 'Disabled and invalid', ar: 'معطّل وغير صالح' },
  },
  accessibility: [
    { en: 'The switch has role="switch". Space toggles it.', ar: 'للمفتاح role="switch". يبدّله مفتاح Space.' },
    { en: 'Use a switch for settings that apply at once; use a checkbox when a form submit applies them.', ar: 'استخدم المفتاح للإعدادات الفورية، وخانة الاختيار عندما يطبّقها إرسال النموذج.' },
    { en: 'The thumb mirrors in RTL, and the state never depends on color alone.', ar: 'ينعكس المقبض في RTL، ولا تعتمد الحالة على اللون وحده.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Switch id="switch-default" />
      <FieldLabel htmlFor="switch-default">{lang === 'ar' ? 'وضع الطيران' : 'Airplane mode'}</FieldLabel>
    </Field>
  );
}

export function WithDescription({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field orientation="horizontal" className="max-w-sm justify-between rounded-lg border p-3">
      <FieldContent>
        <FieldLabel htmlFor="switch-description">{ar ? 'إشعارات الطلبات' : 'Order notifications'}</FieldLabel>
        <FieldDescription>{ar ? 'أرسل لي رسالة عند كل طلب جديد.' : 'Send me a message for every new order.'}</FieldDescription>
      </FieldContent>
      <Switch id="switch-description" defaultChecked />
    </Field>
  );
}

export function Sizes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid gap-3">
      <Field orientation="horizontal" className="w-fit">
        <Switch id="switch-sm" size="sm" defaultChecked />
        <FieldLabel htmlFor="switch-sm">{ar ? 'صغير' : 'Small'}</FieldLabel>
      </Field>
      <Field orientation="horizontal" className="w-fit">
        <Switch id="switch-md" defaultChecked />
        <FieldLabel htmlFor="switch-md">{ar ? 'افتراضي' : 'Default'}</FieldLabel>
      </Field>
    </div>
  );
}

export function States({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid gap-4">
      <Field orientation="horizontal" className="w-fit" data-disabled="true">
        <Switch id="switch-disabled" disabled />
        <FieldLabel htmlFor="switch-disabled">{ar ? 'معطّل' : 'Disabled'}</FieldLabel>
      </Field>
      <Field data-invalid="true" className="max-w-sm">
        <div className="flex items-center gap-2">
          <Switch id="switch-invalid" aria-invalid aria-describedby="switch-invalid-error" />
          <FieldLabel htmlFor="switch-invalid">{ar ? 'تفعيل التحقق بخطوتين' : 'Enable two-step verification'}</FieldLabel>
        </div>
        <FieldError id="switch-invalid-error" className="flex items-center gap-1.5">
          <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
          {ar ? 'هذا الإعداد مطلوب لحسابات المسؤولين.' : 'This setting is required for admin accounts.'}
        </FieldError>
      </Field>
    </div>
  );
}

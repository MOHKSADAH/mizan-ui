import { Checkbox } from '@/registry/ui/checkbox';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Names a form control. Clicking the label focuses or toggles its control.',
    ar: 'يسمّي عنصر نموذج. النقر على التسمية يركّز على العنصر أو يبدّل حالته.',
  },
  usage: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Required: { en: 'Required field', ar: 'حقل مطلوب' },
    WithCheckbox: { en: 'With checkbox and disabled', ar: 'مع خانة اختيار ومعطّل' },
  },
  accessibility: [
    { en: 'htmlFor must match the control id.', ar: 'يجب أن يطابق htmlFor قيمة id للعنصر.' },
    { en: 'Mark required fields with text or an asterisk and set required on the control.', ar: 'علّم الحقول المطلوبة بنص أو بنجمة واضبط required على العنصر.' },
    { en: 'A label next to a disabled peer control dims with it.', ar: 'تتعتّم التسمية المجاورة لعنصر معطّل معه.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="label-default">{ar ? 'البريد الإلكتروني' : 'Email'}</Label>
      <Input id="label-default" type="email" placeholder="name@example.com" />
    </div>
  );
}

export function Required({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="label-required">
        {ar ? 'اسم الشركة' : 'Company name'}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
        <span className="sr-only">{ar ? '(مطلوب)' : '(required)'}</span>
      </Label>
      <Input id="label-required" required placeholder={ar ? 'اسم الشركة' : 'Company name'} />
    </div>
  );
}

export function WithCheckbox({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms">{ar ? 'أوافق على الشروط' : 'Accept terms'}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-disabled" disabled />
        <Label htmlFor="label-disabled">{ar ? 'خيار معطّل' : 'Disabled option'}</Label>
      </div>
    </div>
  );
}

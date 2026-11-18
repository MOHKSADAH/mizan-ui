import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/ui/field';
import { Input } from '@/registry/ui/input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A single-line text field. Pair it with Field for a label, a hint and an error.',
    ar: 'حقل نصي من سطر واحد. استخدمه مع Field لإضافة تسمية وتلميح ورسالة خطأ.',
  },
  usage: `import { Input } from "@/components/ui/input"

<Input type="email" placeholder="name@example.com" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithLabel: { en: 'With label and hint', ar: 'مع تسمية وتلميح' },
    Phone: { en: 'Phone number', ar: 'رقم الجوال' },
    States: { en: 'Disabled and invalid', ar: 'معطّل وغير صالح' },
    WithButton: { en: 'With button', ar: 'مع زر' },
  },
  accessibility: [
    { en: 'Every input needs a visible label or an aria-label.', ar: 'كل حقل يحتاج تسمية ظاهرة أو aria-label.' },
    { en: 'Set the right type, inputMode and autoComplete so mobile keyboards and autofill work.', ar: 'اضبط type وinputMode وautoComplete ليعمل لوح المفاتيح والتعبئة التلقائية.' },
    { en: 'Numbers such as phone numbers keep their order: set dir="ltr" on the input.', ar: 'تبقى الأرقام مثل أرقام الجوال من اليسار إلى اليمين: اضبط dir="ltr" على الحقل.' },
    { en: 'An invalid input needs error text with an icon, linked with aria-describedby.', ar: 'الحقل غير الصالح يحتاج نص خطأ مع أيقونة، مرتبطًا عبر aria-describedby.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return <Input type="email" className="max-w-sm" placeholder="name@example.com" aria-label={ar ? 'البريد الإلكتروني' : 'Email'} />;
}

export function WithLabel({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-label">{ar ? 'اسم المتجر' : 'Store name'}</FieldLabel>
      <Input id="input-label" placeholder={ar ? 'مثال: متجر الندى' : 'For example: Nada Store'} />
      <FieldDescription>{ar ? 'يظهر هذا الاسم للعملاء في الفاتورة.' : 'Customers see this name on their invoice.'}</FieldDescription>
    </Field>
  );
}

export function Phone({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-phone">{ar ? 'رقم الجوال' : 'Mobile number'}</FieldLabel>
      <Input id="input-phone" dir="ltr" type="tel" inputMode="tel" autoComplete="tel" placeholder="+966 5X XXX XXXX" className="text-start" />
      <FieldDescription>{ar ? 'أدخل الرقم مع مفتاح الدولة +966.' : 'Enter the number with the +966 country code.'}</FieldDescription>
    </Field>
  );
}

export function States({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field data-disabled="true">
        <FieldLabel htmlFor="input-disabled">{ar ? 'رقم الطلب' : 'Order number'}</FieldLabel>
        <Input id="input-disabled" disabled defaultValue="1042" />
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="input-invalid">{ar ? 'البريد الإلكتروني' : 'Email'}</FieldLabel>
        <Input id="input-invalid" type="email" aria-invalid aria-describedby="input-invalid-error" defaultValue="name@example" />
        <FieldError id="input-invalid-error" className="flex items-center gap-1.5">
          <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
          {ar ? 'أدخل بريدًا إلكترونيًا صالحًا.' : 'Enter a valid email address.'}
        </FieldError>
      </Field>
    </div>
  );
}

export function WithButton({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="name@example.com" aria-label={ar ? 'البريد الإلكتروني' : 'Email'} />
      <Button>{ar ? 'اشتراك' : 'Subscribe'}</Button>
    </div>
  );
}

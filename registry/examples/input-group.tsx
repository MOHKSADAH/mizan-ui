import { CopyIcon, MagnifyingGlassIcon, PaperPlaneRightIcon, WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { FieldError } from '@/registry/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/registry/ui/input-group';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Adds icons, text and buttons to the inline start or end of an input. Addons swap sides in RTL.',
    ar: 'يضيف أيقونات ونصوصًا وأزرارًا إلى بداية الحقل أو نهايته. تتبدل جهة الإضافات في RTL.',
  },
  usage: `import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

<InputGroup>
  <InputGroupInput placeholder="Search" aria-label="Search" />
  <InputGroupAddon>
    <MagnifyingGlassIcon />
  </InputGroupAddon>
</InputGroup>`,
  examples: {
    Default: { en: 'With icon and counter', ar: 'مع أيقونة وعدّاد' },
    TextAndButton: { en: 'Text and button', ar: 'نص وزر' },
    Textarea: { en: 'Textarea', ar: 'حقل نصي متعدد الأسطر' },
    States: { en: 'Phone, disabled and invalid', ar: 'الجوال ومعطّل وغير صالح' },
  },
  accessibility: [
    { en: 'The group has role="group". Label the inner input with aria-label or a Field label.', ar: 'للمجموعة role="group". سمِّ الحقل الداخلي بـ aria-label أو بتسمية Field.' },
    { en: 'Decorative icons need no text. Buttons inside the group need an aria-label.', ar: 'الأيقونات الزخرفية لا تحتاج نصًا. أزرار المجموعة تحتاج aria-label.' },
    { en: 'Put aria-invalid on the input, then add error text with an icon.', ar: 'ضع aria-invalid على الحقل، ثم أضف نص خطأ مع أيقونة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder={ar ? 'ابحث…' : 'Search…'} aria-label={ar ? 'بحث' : 'Search'} />
        <InputGroupAddon>
          <MagnifyingGlassIcon weight="regular" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">{ar ? '12 نتيجة' : '12 results'}</InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function TextAndButton({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup dir="ltr">
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" aria-label={ar ? 'عنوان الموقع' : 'Website address'} />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput dir="ltr" readOnly defaultValue="https://mizan.example/invite" aria-label={ar ? 'رابط الدعوة' : 'Invite link'} />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label={ar ? 'نسخ الرابط' : 'Copy link'}>
            <CopyIcon weight="regular" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function Textarea({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <InputGroup className="max-w-sm">
      <InputGroupTextarea placeholder={ar ? 'اكتب رسالتك…' : 'Write your message…'} aria-label={ar ? 'الرسالة' : 'Message'} />
      <InputGroupAddon align="block-end">
        <InputGroupText>{ar ? '0 من 280' : '0 of 280'}</InputGroupText>
        <InputGroupButton variant="default" size="sm" className="ms-auto">
          {ar ? 'إرسال' : 'Send'}
          <PaperPlaneRightIcon weight="regular" data-icon="inline-end" className="rtl:-scale-x-100" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export function States({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup dir="ltr">
        <InputGroupAddon>
          <InputGroupText>+966</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="tel" inputMode="tel" autoComplete="tel-national" placeholder="5X XXX XXXX" aria-label={ar ? 'رقم الجوال' : 'Mobile number'} />
      </InputGroup>
      <InputGroup>
        <InputGroupInput disabled defaultValue={ar ? 'غير متاح' : 'Not available'} aria-label={ar ? 'حقل معطّل' : 'Disabled field'} />
        <InputGroupAddon>
          <MagnifyingGlassIcon weight="regular" />
        </InputGroupAddon>
      </InputGroup>
      <div className="grid gap-2">
        <InputGroup dir="ltr">
          <InputGroupInput aria-invalid aria-describedby="input-group-error" defaultValue="5X" aria-label={ar ? 'رقم الجوال' : 'Mobile number'} />
          <InputGroupAddon>
            <InputGroupText>+966</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldError id="input-group-error" className="flex items-center gap-1.5">
          <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
          {ar ? 'رقم الجوال غير مكتمل.' : 'The mobile number is incomplete.'}
        </FieldError>
      </div>
    </div>
  );
}

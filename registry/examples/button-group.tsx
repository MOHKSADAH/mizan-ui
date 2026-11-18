import { CaretDownIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/registry/ui/button-group';
import { Input } from '@/registry/ui/input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Joins related buttons, inputs and text into one control. Corners and borders follow the reading direction.',
    ar: 'يجمع أزرارًا وحقولًا ونصوصًا مترابطة في عنصر واحد. تتبع الزوايا والحدود اتجاه القراءة.',
  },
  usage: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button variant="outline">Archive</Button>
  <Button variant="outline">Report</Button>
</ButtonGroup>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Vertical: { en: 'Vertical', ar: 'عمودي' },
    WithInput: { en: 'With input and text', ar: 'مع حقل ونص' },
    Split: { en: 'Split button', ar: 'زر مقسوم' },
  },
  accessibility: [
    { en: 'The group has role="group". Add aria-label to name it.', ar: 'للمجموعة role="group". أضف aria-label لتسميتها.' },
    { en: 'Icon-only buttons in a group need an aria-label.', ar: 'الأزرار التي تحتوي أيقونة فقط داخل المجموعة تحتاج aria-label.' },
    { en: 'Visual order follows the document direction, so the first button sits at the inline start.', ar: 'يتبع الترتيب المرئي اتجاه المستند، فيقع الزر الأول عند بداية السطر.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ButtonGroup aria-label={ar ? 'إجراءات الرسالة' : 'Message actions'}>
      <Button variant="outline">{ar ? 'أرشفة' : 'Archive'}</Button>
      <Button variant="outline">{ar ? 'إبلاغ' : 'Report'}</Button>
      <Button variant="outline">{ar ? 'تأجيل' : 'Snooze'}</Button>
    </ButtonGroup>
  );
}

export function Vertical({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ButtonGroup orientation="vertical" aria-label={ar ? 'التكبير' : 'Zoom'}>
      <Button variant="outline" size="icon" aria-label={ar ? 'تكبير' : 'Zoom in'}>
        <PlusIcon weight="regular" />
      </Button>
      <Button variant="outline" size="icon" aria-label={ar ? 'تصغير' : 'Zoom out'}>
        <MinusIcon weight="regular" />
      </Button>
    </ButtonGroup>
  );
}

export function WithInput({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ButtonGroup className="w-full">
        <Input placeholder={ar ? 'ابحث…' : 'Search…'} aria-label={ar ? 'بحث' : 'Search'} />
        <Button variant="outline" size="icon" aria-label={ar ? 'بحث' : 'Search'}>
          <MagnifyingGlassIcon weight="regular" />
        </Button>
      </ButtonGroup>
      <ButtonGroup dir="ltr" className="w-full">
        <ButtonGroupText>+966</ButtonGroupText>
        <Input type="tel" inputMode="tel" placeholder="5X XXX XXXX" aria-label={ar ? 'رقم الجوال' : 'Mobile number'} />
      </ButtonGroup>
    </div>
  );
}

export function Split({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ButtonGroup aria-label={ar ? 'إرسال' : 'Send'}>
      <Button variant="secondary">{ar ? 'إرسال' : 'Send'}</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="icon" aria-label={ar ? 'خيارات الإرسال' : 'Send options'}>
        <CaretDownIcon weight="regular" />
      </Button>
    </ButtonGroup>
  );
}

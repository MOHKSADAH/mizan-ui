import { ArrowRightIcon, PlusIcon, ShoppingCartIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Triggers an action. Six variants and seven sizes, all from theme tokens.',
    ar: 'يشغّل إجراءً. ستة أنواع وسبعة مقاسات، كلها من رموز الثيم.',
  },
  usage: `import { Button } from "@/components/ui/button"

<Button variant="outline">Continue</Button>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Variants: { en: 'Variants', ar: 'الأنواع' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    WithIcon: { en: 'With icon and disabled', ar: 'مع أيقونة ومعطّل' },
  },
  accessibility: [
    { en: 'Renders a native button, so Enter and Space work.', ar: 'يعرض زرًا أصليًا، فيعمل Enter وSpace.' },
    { en: 'Icon-only buttons need an aria-label.', ar: 'الأزرار التي تحتوي أيقونة فقط تحتاج aria-label.' },
    { en: 'Directional icons get rtl:rotate-180.', ar: 'الأيقونات الاتجاهية تأخذ rtl:rotate-180.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <Button>{lang === 'ar' ? 'متابعة' : 'Continue'}</Button>;
}

const VARIANTS = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
const VARIANT_LABELS = {
  en: ['Primary', 'Secondary', 'Outline', 'Ghost', 'Delete', 'Link'],
  ar: ['أساسي', 'ثانوي', 'بإطار', 'شفاف', 'حذف', 'رابط'],
};

export function Variants({ lang }: ExampleProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {VARIANTS.map((v, i) => (
        <Button key={v} variant={v}>
          {VARIANT_LABELS[lang][i]}
        </Button>
      ))}
    </div>
  );
}

export function Sizes({ lang }: ExampleProps) {
  const label = lang === 'ar' ? 'إضافة' : 'Add';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="xs">{label}</Button>
      <Button size="sm">{label}</Button>
      <Button>{label}</Button>
      <Button size="lg">{label}</Button>
      <Button size="icon" aria-label={label}>
        <PlusIcon weight="regular" />
      </Button>
    </div>
  );
}

export function WithIcon({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>
        <ShoppingCartIcon weight="regular" data-icon="inline-start" />
        {ar ? 'أضف إلى السلة' : 'Add to cart'}
      </Button>
      <Button variant="outline">
        {ar ? 'التالي' : 'Next'}
        <ArrowRightIcon weight="regular" data-icon="inline-end" className="rtl:rotate-180" />
      </Button>
      <Button disabled>{ar ? 'معطّل' : 'Disabled'}</Button>
    </div>
  );
}

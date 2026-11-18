import { Separator } from '@/registry/ui/separator';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A thin line that visually or semantically separates content, horizontal or vertical.',
    ar: 'خط رفيع يفصل المحتوى بصريًا أو دلاليًا، أفقيًا أو عموديًا.',
  },
  usage: `import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Vertical: { en: 'Vertical', ar: 'عمودي' },
    WithLabel: { en: 'With a label', ar: 'مع تسمية' },
  },
  accessibility: [
    {
      en: 'Exposes role="separator" with aria-orientation. For a purely visual rule, it is skipped by screen readers.',
      ar: 'يعرض role="separator" مع aria-orientation. للخط البصري البحت تتجاوزه قارئات الشاشة.',
    },
    {
      en: 'A vertical separator needs a parent with a height and flex alignment to be visible.',
      ar: 'يحتاج الفاصل العمودي إلى أب له ارتفاع ومحاذاة flex ليظهر.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="grid gap-1">
        <h4 className="text-sm leading-none font-medium">{ar ? 'ميزان' : 'Mizan UI'}</h4>
        <p className="text-sm text-muted-foreground">
          {ar ? 'مكوّنات مفتوحة المصدر تعمل بالعربية والإنجليزية.' : 'Open-source components that work in Arabic and English.'}
        </p>
      </div>
      <Separator className="my-4" />
      <p className="text-sm">{ar ? 'مبني فوق Base UI وTailwind.' : 'Built on Base UI and Tailwind.'}</p>
    </div>
  );
}

export function Vertical({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex h-5 items-center justify-center gap-4 text-sm">
      <span>{ar ? 'المدونة' : 'Blog'}</span>
      <Separator orientation="vertical" />
      <span>{ar ? 'التوثيق' : 'Docs'}</span>
      <Separator orientation="vertical" />
      <span>{ar ? 'المصدر' : 'Source'}</span>
    </div>
  );
}

export function WithLabel({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="mx-auto flex w-full max-w-sm items-center gap-3 text-xs text-muted-foreground">
      <Separator className="flex-1" />
      {ar ? 'أو' : 'or'}
      <Separator className="flex-1" />
    </div>
  );
}

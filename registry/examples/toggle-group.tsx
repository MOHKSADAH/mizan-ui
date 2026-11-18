import { ListIcon, SquaresFourIcon, TextBIcon, TextItalicIcon, TextUnderlineIcon } from '@phosphor-icons/react/ssr';
import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A set of toggles. Pick one value, or allow several with the multiple prop.',
    ar: 'مجموعة أزرار تبديل. اختر قيمة واحدة، أو اسمح بعدة قيم عبر الخاصية multiple.',
  },
  usage: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup multiple variant="outline" spacing={0} aria-label="Text style">
  <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
</ToggleGroup>`,
  examples: {
    Default: { en: 'Multiple', ar: 'اختيار متعدد' },
    Single: { en: 'Single', ar: 'اختيار واحد' },
    Spacing: { en: 'Spacing and sizes', ar: 'التباعد والمقاسات' },
    Vertical: { en: 'Vertical and disabled', ar: 'عمودي ومعطّل' },
  },
  accessibility: [
    { en: 'The group has role="group". Name it with aria-label.', ar: 'للمجموعة role="group". سمِّها بـ aria-label.' },
    { en: 'Arrow keys move focus between items; Space or Enter toggles one.', ar: 'تنقل الأسهم التركيز بين العناصر، ويبدّل Space أو Enter العنصر.' },
    { en: 'Icon-only items need an aria-label each.', ar: 'العناصر التي تحتوي أيقونة فقط تحتاج aria-label لكل منها.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ToggleGroup multiple variant="outline" spacing={0} defaultValue={['bold']} aria-label={ar ? 'نمط النص' : 'Text style'}>
      <ToggleGroupItem value="bold" aria-label={ar ? 'غليظ' : 'Bold'}>
        <TextBIcon weight="regular" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label={ar ? 'مائل' : 'Italic'}>
        <TextItalicIcon weight="regular" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label={ar ? 'تسطير' : 'Underline'}>
        <TextUnderlineIcon weight="regular" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Single({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ToggleGroup variant="outline" spacing={0} defaultValue={['list']} aria-label={ar ? 'طريقة العرض' : 'View'}>
      <ToggleGroupItem value="list">
        <ListIcon weight="regular" data-icon="inline-start" />
        {ar ? 'قائمة' : 'List'}
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <SquaresFourIcon weight="regular" data-icon="inline-start" />
        {ar ? 'شبكة' : 'Grid'}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Spacing({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const items = ar ? ['صغير', 'متوسط', 'كبير'] : ['Small', 'Medium', 'Large'];
  return (
    <div className="grid gap-4">
      <ToggleGroup variant="outline" size="sm" spacing={2} defaultValue={['m']} aria-label={ar ? 'المقاس، صغير' : 'Size, small'}>
        <ToggleGroupItem value="s">{items[0]}</ToggleGroupItem>
        <ToggleGroupItem value="m">{items[1]}</ToggleGroupItem>
        <ToggleGroupItem value="l">{items[2]}</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" size="lg" spacing={2} defaultValue={['m']} aria-label={ar ? 'المقاس، كبير' : 'Size, large'}>
        <ToggleGroupItem value="s">{items[0]}</ToggleGroupItem>
        <ToggleGroupItem value="m">{items[1]}</ToggleGroupItem>
        <ToggleGroupItem value="l">{items[2]}</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export function Vertical({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-start gap-6">
      <ToggleGroup orientation="vertical" variant="outline" spacing={0} defaultValue={['list']} aria-label={ar ? 'طريقة العرض' : 'View'}>
        <ToggleGroupItem value="list" aria-label={ar ? 'قائمة' : 'List'}>
          <ListIcon weight="regular" />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label={ar ? 'شبكة' : 'Grid'}>
          <SquaresFourIcon weight="regular" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" spacing={0} disabled defaultValue={['list']} aria-label={ar ? 'طريقة العرض، معطّل' : 'View, disabled'}>
        <ToggleGroupItem value="list" aria-label={ar ? 'قائمة' : 'List'}>
          <ListIcon weight="regular" />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label={ar ? 'شبكة' : 'Grid'}>
          <SquaresFourIcon weight="regular" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

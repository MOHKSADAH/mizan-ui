import { SpeakerHighIcon, SpeakerNoneIcon } from '@phosphor-icons/react/ssr';
import { Slider } from '@/registry/ui/slider';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Picks a value or a range by dragging a thumb. The fill starts at the inline start, so it grows from the right in Arabic.',
    ar: 'يختار قيمة أو نطاقًا بسحب المقبض. يبدأ التعبئة من بداية السطر، فينمو من اليمين في العربية.',
  },
  usage: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Range: { en: 'Range', ar: 'نطاق' },
    WithIcons: { en: 'With icons', ar: 'مع أيقونات' },
    Vertical: { en: 'Vertical and disabled', ar: 'عمودي ومعطّل' },
  },
  accessibility: [
    { en: 'Each thumb is a slider with aria-valuenow. Arrow keys change the value by one step; Home and End jump to the ends.', ar: 'كل مقبض عنصر slider بقيمة aria-valuenow. تغيّر الأسهم القيمة بخطوة، وHome وEnd تنتقلان إلى الطرفين.' },
    { en: 'Give the slider a name with aria-label or aria-labelledby.', ar: 'سمِّ المنزلق عبر aria-label أو aria-labelledby.' },
    { en: 'In RTL the track and the arrow keys mirror: the right arrow lowers the value.', ar: 'في RTL ينعكس المسار والأسهم: السهم الأيمن يخفض القيمة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <Slider defaultValue={[50]} max={100} step={1} className="max-w-sm" aria-label={lang === 'ar' ? 'مستوى الصوت' : 'Volume'} />;
}

export function Range({ lang }: ExampleProps) {
  return <Slider defaultValue={[25, 75]} max={100} step={5} className="max-w-sm" aria-label={lang === 'ar' ? 'نطاق السعر' : 'Price range'} />;
}

export function WithIcons({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <SpeakerNoneIcon weight="regular" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <Slider defaultValue={[35]} max={100} step={1} aria-label={ar ? 'مستوى الصوت' : 'Volume'} />
      <SpeakerHighIcon weight="regular" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

export function Vertical({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex h-40 items-center gap-8">
      <Slider orientation="vertical" defaultValue={[60]} max={100} step={1} aria-label={ar ? 'السطوع' : 'Brightness'} />
      <Slider orientation="vertical" defaultValue={[30]} max={100} step={1} disabled aria-label={ar ? 'السطوع، معطّل' : 'Brightness, disabled'} />
    </div>
  );
}

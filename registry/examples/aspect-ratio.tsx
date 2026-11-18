import { AspectRatio } from '@/registry/ui/aspect-ratio';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Keeps its content at a fixed width-to-height ratio, for images, video and maps.',
    ar: 'يحافظ على محتواه بنسبة ثابتة بين العرض والارتفاع، للصور والفيديو والخرائط.',
  },
  usage: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <img src="/photo.jpg" alt="Photo" className="size-full rounded-lg object-cover" />
</AspectRatio>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Ratios: { en: 'Common ratios', ar: 'نسب شائعة' },
  },
  accessibility: [
    {
      en: 'AspectRatio is a layout wrapper with no role. Give the image or video inside it a text alternative.',
      ar: 'AspectRatio غلاف تخطيط بلا دور. أعطِ الصورة أو الفيديو بداخله بديلًا نصيًا.',
    },
    {
      en: 'Reserving the space avoids layout shift while media loads.',
      ar: 'حجز المساحة يمنع قفزة التخطيط أثناء تحميل الوسائط.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        <bdi>16 : 9</bdi>
        <span className="sr-only">{lang === 'ar' ? 'مساحة محجوزة بنسبة 16 إلى 9' : 'Placeholder at 16 to 9'}</span>
      </AspectRatio>
    </div>
  );
}

const RATIOS = [
  { label: '1 : 1', ratio: 1 },
  { label: '4 : 3', ratio: 4 / 3 },
  { label: '16 : 9', ratio: 16 / 9 },
  { label: '21 : 9', ratio: 21 / 9 },
];

export function Ratios({ lang }: ExampleProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {RATIOS.map((r) => (
        <AspectRatio key={r.label} ratio={r.ratio} className="flex items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
          <bdi>{r.label}</bdi>
          <span className="sr-only">{lang === 'ar' ? 'نسبة' : 'Ratio'}</span>
        </AspectRatio>
      ))}
    </div>
  );
}

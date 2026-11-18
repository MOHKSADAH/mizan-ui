import { ScrollArea, ScrollBar } from '@/registry/ui/scroll-area';
import { Separator } from '@/registry/ui/separator';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A scroll container with a styled scrollbar that keeps native scrolling behavior.',
    ar: 'حاوية تمرير بشريط تمرير منسّق تحافظ على سلوك التمرير الأصلي.',
  },
  usage: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-56 w-48 rounded-md border">
  <div className="p-4">Long content</div>
</ScrollArea>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Horizontal: { en: 'Horizontal', ar: 'أفقي' },
  },
  accessibility: [
    {
      en: 'The viewport is focusable, so keyboard users can scroll it with the arrow keys, Page Up and Page Down.',
      ar: 'منطقة العرض قابلة للتركيز، فيتمكن مستخدمو لوحة المفاتيح من تمريرها بالأسهم وPage Up وPage Down.',
    },
    {
      en: 'Touch, wheel and trackpad scrolling stay native. The scrollbar mirrors to the start side in RTL.',
      ar: 'يبقى التمرير باللمس والعجلة ولوحة اللمس أصليًا. ينعكس شريط التمرير في RTL.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ScrollArea className="mx-auto h-56 w-56 rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm leading-none font-medium">{ar ? 'الوسوم' : 'Tags'}</h4>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>
            <div className="text-sm">
              {ar ? 'الإصدار ' : 'v'}
              <bdi>1.2.{20 - i}</bdi>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function Horizontal({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ScrollArea className="mx-auto w-72 rounded-md border sm:w-96">
      <div className="flex w-max gap-3 p-4">
        {Array.from({ length: 10 }, (_, i) => (
          <figure key={i} className="grid shrink-0 gap-2">
            <div className="h-28 w-36 rounded-md bg-muted" />
            <figcaption className="text-xs text-muted-foreground">
              {ar ? 'عمل فني ' : 'Artwork '}
              <bdi>{i + 1}</bdi>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

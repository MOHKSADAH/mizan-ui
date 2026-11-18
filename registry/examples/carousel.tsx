import { Card, CardContent } from '@/registry/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/registry/ui/carousel';
import { formatNumber } from '@/registry/lib/format';
import { CarouselWithCounter } from '@/registry/examples/carousel.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A swipeable slide list built on Embla. Arrows, swipe direction and arrow keys all swap in RTL.',
    ar: 'قائمة شرائح قابلة للسحب مبنية على Embla. الأسهم واتجاه السحب ومفاتيح الأسهم كلها تنعكس في RTL.',
  },
  usage: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>1</CarouselItem>
    <CarouselItem>2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Multiple: { en: 'Several slides per view', ar: 'عدة شرائح في العرض' },
    WithCounter: { en: 'With slide counter', ar: 'مع عدّاد الشرائح' },
  },
  accessibility: [
    { en: 'The root is a region with aria-roledescription "carousel"; each slide is a group with "slide".', ar: 'الجذر منطقة بـ aria-roledescription "carousel"، وكل شريحة مجموعة بـ "slide".' },
    { en: 'Arrow keys move between slides: Left and Right swap in RTL.', ar: 'مفاتيح الأسهم تنقل بين الشرائح: اليمين واليسار يتبادلان في RTL.' },
    { en: 'Pass Arabic button labels through the labels prop.', ar: 'مرّر تسميات الأزرار بالعربية عبر الخاصية labels.' },
  ],
};

const labelsAr = { previous: 'الشريحة السابقة', next: 'الشريحة التالية' };
const SLIDES = [1, 2, 3, 4, 5];

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="w-full max-w-sm px-12 [contain:inline-size]">
      <Carousel labels={ar ? labelsAr : undefined}>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center text-4xl font-semibold">
                  <bdi>{formatNumber(n, { lang })}</bdi>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export function Multiple({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="w-full max-w-md px-12 [contain:inline-size]">
      <Carousel opts={{ align: 'start' }} labels={ar ? labelsAr : undefined}>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n} className="basis-1/2">
              <Card size="sm">
                <CardContent className="flex aspect-square items-center justify-center text-2xl font-semibold">
                  <bdi>{formatNumber(n, { lang })}</bdi>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export function WithCounter({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="w-full max-w-sm px-12 [contain:inline-size]">
      <CarouselWithCounter lang={lang} labels={ar ? labelsAr : undefined}>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n}>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center text-4xl font-semibold">
                  <bdi>{formatNumber(n, { lang })}</bdi>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselWithCounter>
    </div>
  );
}

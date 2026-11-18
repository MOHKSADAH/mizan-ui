import { Skeleton } from '@/registry/ui/skeleton';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A placeholder with the shape of the content that is loading.',
    ar: 'عنصر نائب بشكل المحتوى الذي يجري تحميله.',
  },
  usage: `import { Skeleton } from "@/components/ui/skeleton"

<div role="status" aria-busy="true">
  <Skeleton className="h-4 w-48" />
  <span className="sr-only">Loading</span>
</div>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Card: { en: 'Card', ar: 'بطاقة' },
    List: { en: 'List', ar: 'قائمة' },
  },
  accessibility: [
    { en: 'Skeletons are blank to assistive tech. Wrap them in role="status" with aria-busy and add a screen-reader-only label.', ar: 'الهياكل فارغة للتقنيات المساعدة. لفّها بـ role="status" مع aria-busy وأضف تسمية لقارئ الشاشة فقط.' },
    { en: 'Match the final layout to avoid shifts when content arrives.', ar: 'طابق التخطيط النهائي لتجنب القفزات عند وصول المحتوى.' },
    { en: 'The pulse is functional feedback. Remove the animation for users who prefer reduced motion.', ar: 'النبض ملاحظة وظيفية. أزل الحركة للمستخدمين الذين يفضلون تقليل الحركة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <div role="status" aria-busy="true" className="flex items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
      <span className="sr-only">{lang === 'ar' ? 'جارٍ التحميل' : 'Loading'}</span>
    </div>
  );
}

export function Card({ lang }: ExampleProps) {
  return (
    <div role="status" aria-busy="true" className="grid w-full max-w-xs gap-3">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <span className="sr-only">{lang === 'ar' ? 'جارٍ تحميل البطاقة' : 'Loading card'}</span>
    </div>
  );
}

export function List({ lang }: ExampleProps) {
  return (
    <div role="status" aria-busy="true" className="grid w-full max-w-sm gap-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-9 shrink-0 rounded-lg" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3.5 w-full" />
          </div>
        </div>
      ))}
      <span className="sr-only">{lang === 'ar' ? 'جارٍ تحميل القائمة' : 'Loading list'}</span>
    </div>
  );
}

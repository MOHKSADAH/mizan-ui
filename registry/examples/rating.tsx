import { Rating, ratingLabelsAr } from '@/registry/ui/rating';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A read-only star display for product ratings. Partial fills start at the inline start, so they mirror in RTL. The accessible name reads the value, the maximum and the review count.',
    ar: 'عرض نجوم للقراءة فقط لتقييمات المنتجات. يبدأ التعبئة الجزئي من بداية السطر فينعكس في RTL. يقرأ الاسم المتاح القيمة والحد الأقصى وعدد التقييمات.',
  },
  usage: `import { Rating } from "@/components/ui/rating"\n\n<Rating value={4.8} count={1280} showValue />`,
  examples: {
    Default: { en: 'Value and count', ar: 'القيمة والعدد' },
    Partial: { en: 'Partial fills', ar: 'تعبئة جزئية' },
  },
  accessibility: [
    {
      en: 'The stars are one image with a text name such as "4.8 out of 5, 1,280 reviews". The visible number and count are hidden from screen readers to avoid repeating it.',
      ar: 'النجوم صورة واحدة باسم نصي مثل "4.8 من 5، 1280 تقييم". الرقم والعدد المرئيان مخفيان عن قارئات الشاشة لتجنب التكرار.',
    },
    {
      en: 'Filled and empty stars differ in shape (fill versus outline), not only in color.',
      ar: 'تختلف النجوم الممتلئة والفارغة في الشكل (تعبئة مقابل حدود) وليس باللون فقط.',
    },
  ],
};

const labels = (lang: ExampleProps['lang']) => (lang === 'ar' ? ratingLabelsAr : undefined);

export function Default({ lang }: ExampleProps) {
  return <Rating value={4.8} count={1280} showValue lang={lang} labels={labels(lang)} />;
}

export function Partial({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col gap-2">
      {[5, 4.5, 3.2, 1].map((value) => (
        <Rating key={value} value={value} showValue lang={lang} labels={labels(lang)} />
      ))}
    </div>
  );
}

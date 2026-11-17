import { RatingInput } from '@/registry/ui/rating-input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A star rating input built on radio buttons. It supports half stars, and the fill starts from the inline start, so it mirrors in Arabic.',
    ar: 'مُدخل تقييم بالنجوم مبني على أزرار الاختيار. يدعم أنصاف النجوم، ويبدأ التعبئة من بداية السطر فينعكس في العربية.',
  },
  usage: `import { RatingInput } from "@/components/ui/rating-input"\n\n<RatingInput half showValue aria-label="Rating" onValueChange={setRating} />`,
  examples: {
    Default: { en: 'Whole stars', ar: 'نجوم كاملة' },
    Half: { en: 'Half stars with the value shown', ar: 'أنصاف نجوم مع عرض القيمة' },
  },
  accessibility: [
    {
      en: 'It is a radio group (APG radio group pattern): Tab enters the group, arrow keys move and select, and the arrow direction follows the page direction. A hidden No rating radio lets keyboard users clear the value.',
      ar: 'مجموعة أزرار اختيار (نمط APG): يدخل Tab المجموعة، وتحرّك مفاتيح الأسهم الاختيار وتحدده، ويتبع اتجاه الأسهم اتجاه الصفحة. يتيح زر اختيار مخفي بعنوان بدون تقييم لمستخدمي لوحة المفاتيح مسح القيمة.',
    },
    {
      en: 'Each radio is named with the labels prop, for example 4.5 out of 5, so the value does not depend on color or the star shape.',
      ar: 'كل زر اختيار له اسم من خاصية labels، مثل 4.5 من 5، فلا تعتمد القيمة على اللون أو شكل النجمة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <RatingInput lang={lang} defaultValue={3} aria-label={lang === 'ar' ? 'التقييم' : 'Rating'} />;
}

export function Half({ lang }: ExampleProps) {
  return <RatingInput lang={lang} half showValue defaultValue={4.5} aria-label={lang === 'ar' ? 'التقييم' : 'Rating'} />;
}

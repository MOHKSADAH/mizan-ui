import { RatingSummary, ratingSummaryLabelsAr } from '@/registry/ui/rating-summary';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The average score, the review total and a bar for each star level, from five stars to one. The bars fill from the inline start, so they mirror in RTL. The component has no text of its own: pass labels for your language.',
    ar: 'متوسط التقييم وعدد المراجعات وشريط لكل مستوى من النجوم، من خمس نجوم إلى نجمة واحدة. تمتلئ الأشرطة من بداية السطر فتنعكس في RTL. لا يحمل المكوّن نصًا خاصًا به: مرّر التسميات للغتك.',
  },
  usage: `import { RatingSummary } from "@/components/ui/rating-summary"\n\n<RatingSummary average={4.6} distribution={[820, 310, 90, 40, 20]} />`,
  examples: {
    Default: { en: 'Average and distribution', ar: 'المتوسط والتوزيع' },
    Sparse: { en: 'Few reviews', ar: 'مراجعات قليلة' },
  },
  accessibility: [
    {
      en: 'The stars are one image named "4.6 out of 5". Each bar row has a spoken sentence such as "5 stars: 820 reviews", and the visible numbers are hidden from screen readers to avoid repeating it.',
      ar: 'النجوم صورة واحدة باسم "4.6 من 5". لكل صف شريط جملة منطوقة مثل "5 نجوم: 820 تقييم"، وتُخفى الأرقام المرئية عن قارئات الشاشة لتجنب التكرار.',
    },
    {
      en: 'A bar shows a share of the total, so its meaning never depends on color alone: the count sits next to it.',
      ar: 'يعرض الشريط حصة من الإجمالي، فلا يعتمد معناه على اللون وحده: العدد بجانبه.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <RatingSummary
      className="w-full max-w-lg"
      average={4.6}
      distribution={[820, 310, 90, 40, 20]}
      lang={lang}
      labels={lang === 'ar' ? ratingSummaryLabelsAr : undefined}
    />
  );
}

export function Sparse({ lang }: ExampleProps) {
  return (
    <RatingSummary
      className="w-full max-w-lg"
      average={3.7}
      distribution={[2, 1, 1, 1, 0]}
      lang={lang}
      labels={lang === 'ar' ? ratingSummaryLabelsAr : undefined}
    />
  );
}

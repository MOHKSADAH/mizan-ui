import { ComparisonSlider, comparisonSliderLabelsAr } from '@/registry/ui/comparison-slider';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Two images with a draggable handle that reveals the before image from the inline start edge.',
    ar: 'صورتان بمقبض قابل للسحب يكشف صورة قبل من حافة بداية السطر.',
  },
  usage: `import { ComparisonSlider } from "@/components/ui/comparison-slider"\n\n<ComparisonSlider before={{ src: "/before.jpg", alt: "Room before", caption: "Before" }} after={{ src: "/after.jpg", alt: "Room after", caption: "After" }} />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'The handle has the slider role with a label and a spoken value. Left and Right move 1 percent, Up and Down move 1, Page Up and Page Down move 10, Home and End go to the ends.',
      ar: 'للمقبض دور شريط التمرير مع تسمية وقيمة منطوقة. يحرك اليسار واليمين 1 بالمئة، ويحرك الأعلى والأسفل 1، وتحرك Page Up وPage Down 10، وتذهب Home وEnd إلى الطرفين.',
    },
    {
      en: 'In RTL the before image sits on the right and the arrow keys are inverted, so Right always moves the handle to the right.',
      ar: 'في RTL تكون صورة قبل على اليمين وتنعكس مفاتيح الأسهم، فيحرك مفتاح اليمين المقبض دائما إلى اليمين.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ComparisonSlider
      className="max-w-lg"
      lang={lang}
      labels={ar ? comparisonSliderLabelsAr : undefined}
      before={{ src: 'https://picsum.photos/id/1015/1200/675?grayscale', alt: ar ? 'النهر قبل' : 'River before', caption: ar ? 'قبل' : 'Before' }}
      after={{ src: 'https://picsum.photos/id/1015/1200/675', alt: ar ? 'النهر بعد' : 'River after', caption: ar ? 'بعد' : 'After' }}
    />
  );
}

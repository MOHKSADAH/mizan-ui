import { BackToTop, backToTopLabelsAr } from '@/registry/ui/back-to-top';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A button that shows after the page is scrolled and returns to the top. It rises above a StickyActionBar through --sticky-bar-height.',
    ar: 'زر يظهر بعد تمرير الصفحة ويعيد إلى الأعلى. يرتفع فوق StickyActionBar عبر --sticky-bar-height.',
  },
  usage: `import { BackToTop } from "@/components/ui/back-to-top"\n\n<BackToTop threshold={600} />`,
  examples: { Default: { en: 'Default (scroll the page to see it)', ar: 'افتراضي (مرر الصفحة لرؤيته)' } },
  accessibility: [
    {
      en: 'A real button with a label. It sits at the inline end and scrolls instantly when the user prefers reduced motion.',
      ar: 'زر حقيقي له تسمية. يقع عند نهاية السطر ويمرر فورا عندما يفضل المستخدم تقليل الحركة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <BackToTop threshold={200} labels={lang === 'ar' ? backToTopLabelsAr : undefined} />;
}

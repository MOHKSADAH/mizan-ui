import { Button } from '@/registry/ui/button';
import { Price } from '@/registry/ui/price';
import { StickyActionBar, stickyActionBarLabelsAr } from '@/registry/ui/sticky-action-bar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A bottom bar for phones with a price and one primary action. It clears the device safe area and sets --sticky-bar-height on the document.',
    ar: 'شريط سفلي للهواتف بسعر وإجراء رئيسي واحد. يتجنب المنطقة الآمنة في الجهاز ويضبط --sticky-bar-height على المستند.',
  },
  usage: `import { StickyActionBar } from "@/components/ui/sticky-action-bar"\n\n<StickyActionBar price={<Price amount={489} />} action={<Button>Add to cart</Button>} />\n\n/* Lift a floating button above the bar */\n<button className="fixed end-4 bottom-[calc(1rem+var(--sticky-bar-height,0px))]" />`,
  examples: { Default: { en: 'Default (visible below 768px)', ar: 'افتراضي (يظهر تحت 768 بكسل)' } },
  accessibility: [
    {
      en: 'The bar is a labelled region in the normal tab order. Add padding-bottom: var(--sticky-bar-height) to the page so the bar never covers the last content or a focused field.',
      ar: 'الشريط منطقة لها تسمية ضمن ترتيب Tab العادي. أضف padding-bottom: var(--sticky-bar-height) للصفحة لكي لا يغطي الشريط آخر المحتوى أو حقلا في التركيز.',
    },
    {
      en: 'The price is at the inline start and the action at the inline end, so the order mirrors in RTL.',
      ar: 'السعر عند بداية السطر والإجراء عند نهايته، فيُعكس الترتيب في RTL.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="relative h-24 w-full max-w-sm overflow-hidden rounded-xl border">
      <StickyActionBar
        className="absolute md:flex"
        labels={ar ? stickyActionBarLabelsAr : undefined}
        price={<Price amount={489} lang={lang} />}
        action={<Button>{ar ? 'أضف إلى السلة' : 'Add to cart'}</Button>}
      />
    </div>
  );
}

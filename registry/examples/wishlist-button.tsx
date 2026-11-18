import { WishlistButton, wishlistButtonLabelsAr } from '@/registry/ui/wishlist-button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A heart toggle to save a product to the wishlist. It is a pressed button, and each change is announced.',
    ar: 'زر قلب لحفظ المنتج في المفضلة. هو زر قابل للضغط، ويُعلن كل تغيير.',
  },
  usage: `import { WishlistButton } from "@/components/ui/wishlist-button"\n\n<WishlistButton pressed={saved} onPressedChange={setSaved} />`,
  examples: { Default: { en: 'Unsaved and saved', ar: 'غير محفوظ ومحفوظ' } },
  accessibility: [
    {
      en: 'The button name stays "Save to wishlist" and aria-pressed carries the state, as the toggle button pattern asks. A polite live region says "Added to wishlist" or "Removed from wishlist".',
      ar: 'يبقى اسم الزر "حفظ في المفضلة" وتحمل aria-pressed الحالة كما يطلب نمط زر التبديل. تقول منطقة حية مهذبة "تمت الإضافة إلى المفضلة" أو "تمت الإزالة من المفضلة".',
    },
    {
      en: 'The state shows as a filled heart, not only as color.',
      ar: 'تظهر الحالة كقلب ممتلئ وليس باللون فقط.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const labels = lang === 'ar' ? wishlistButtonLabelsAr : undefined;
  return (
    <div className="flex gap-2">
      <WishlistButton labels={labels} />
      <WishlistButton defaultPressed labels={labels} />
    </div>
  );
}

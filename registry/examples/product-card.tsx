import { Badge } from '@/registry/ui/badge';
import { Button } from '@/registry/ui/button';
import {
  ProductCard,
  ProductCardAction,
  ProductCardBadges,
  ProductCardBody,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardSwatches,
  ProductCardTitle,
  ProductCardVendor,
} from '@/registry/ui/product-card';
import { Rating, ratingLabelsAr } from '@/registry/ui/rating';
import { WishlistButton, wishlistButtonLabelsAr } from '@/registry/ui/wishlist-button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A product card built from parts: media with badges and an action slot, a title link that covers the card, vendor, rating, price with compare-at, swatches and a footer. It holds no text of its own, and it lays out as a column or as a list row.',
    ar: 'بطاقة منتج مبنية من أجزاء: وسائط مع شارات وخانة إجراء، ورابط عنوان يغطي البطاقة، والبائع والتقييم والسعر مع السعر القديم والألوان وتذييل. لا تحمل نصًا من عندها، وتُعرض كعمود أو كصف قائمة.',
  },
  usage: `import {
  ProductCard, ProductCardMedia, ProductCardImage, ProductCardBody, ProductCardTitle, ProductCardPrice,
} from "@/components/ui/product-card"

<ProductCard>
  <ProductCardMedia>
    <ProductCardImage src="/tote.jpg" alt="Leather tote" />
  </ProductCardMedia>
  <ProductCardBody>
    <ProductCardTitle href="/p/tote">Leather tote</ProductCardTitle>
    <ProductCardPrice amount={389} compareAt={459} compareAtLabel="Original price:" />
  </ProductCardBody>
</ProductCard>`,
  examples: {
    Default: { en: 'Vertical card', ar: 'بطاقة عمودية' },
    List: { en: 'List row', ar: 'صف قائمة' },
    Unavailable: { en: 'Out of stock', ar: 'نفدت الكمية' },
  },
  accessibility: [
    {
      en: 'The card is an article. The title link is stretched over the whole card, so the card has one tab stop for navigation. The wishlist button and the footer actions sit above it and keep their own tab stops.',
      ar: 'البطاقة عنصر article. يمتد رابط العنوان على كامل البطاقة، فتكون للتنقل نقطة تركيز واحدة. زر المفضلة وإجراءات التذييل فوقه ولكل منها نقطة تركيز خاصة.',
    },
    {
      en: 'Every image needs alt text. Swatches are named in text, and the old price is a del with a spoken prefix, so neither relies on color or strike-through alone.',
      ar: 'كل صورة تحتاج نصًا بديلًا. الألوان مسمّاة نصيًا، والسعر القديم داخل del مع بادئة منطوقة، فلا يعتمدان على اللون أو الشطب وحدهما.',
    },
    {
      en: 'Give the title the heading level that fits the page with the as prop.',
      ar: 'امنح العنوان مستوى العنوان المناسب للصفحة عبر الخاصية as.',
    },
  ],
};

const shop = (n: number) => `/examples/shop-${n}.svg`;
const t = (lang: ExampleProps['lang'], en: string, ar: string) => (lang === 'ar' ? ar : en);

const colors = (lang: ExampleProps['lang']) => [
  { label: t(lang, 'Brown', 'بني'), color: 'oklch(0.45 0.07 55)' },
  { label: t(lang, 'Black', 'أسود'), color: 'oklch(0.25 0 0)' },
];

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ProductCard className="w-56">
      <ProductCardMedia>
        <ProductCardImage src={shop(1)} alt={t(lang, 'Handmade leather tote', 'شنطة جلد يدوية')} />
        <ProductCardBadges>
          <Badge variant="destructive">{t(lang, '15% off', 'خصم 15%')}</Badge>
        </ProductCardBadges>
        <ProductCardAction>
          <WishlistButton labels={ar ? wishlistButtonLabelsAr : undefined} />
        </ProductCardAction>
      </ProductCardMedia>
      <ProductCardBody>
        <ProductCardVendor>{t(lang, 'Najd Workshop', 'مشغل نجد')}</ProductCardVendor>
        <ProductCardTitle href="#tote">{t(lang, 'Handmade leather tote', 'شنطة جلد يدوية')}</ProductCardTitle>
        <Rating value={4.7} count={128} lang={lang} labels={ar ? ratingLabelsAr : undefined} className="text-xs" />
        <ProductCardPrice amount={389} compareAt={459} lang={lang} compareAtLabel={t(lang, 'Original price:', 'السعر قبل الخصم:')} />
        <ProductCardSwatches swatches={colors(lang)} aria-label={t(lang, 'Colors', 'الألوان')} />
        <ProductCardFooter>
          <Button variant="outline" size="lg" className="h-10 w-full">
            {t(lang, 'Add to cart', 'أضف للسلة')}
          </Button>
        </ProductCardFooter>
      </ProductCardBody>
    </ProductCard>
  );
}

export function List({ lang }: ExampleProps) {
  return (
    <ProductCard orientation="horizontal" className="w-full max-w-md rounded-xl border p-3">
      <ProductCardMedia>
        <ProductCardImage src={shop(2)} alt={t(lang, 'Cambodian oud oil', 'دهن عود كمبودي')} />
      </ProductCardMedia>
      <ProductCardBody>
        <ProductCardVendor>{t(lang, 'Dar Al Tayeb', 'دار الطيب')}</ProductCardVendor>
        <ProductCardTitle href="#oud">{t(lang, 'Cambodian oud oil, 12 g', 'دهن عود كمبودي 12 جم')}</ProductCardTitle>
        <ProductCardPrice amount={520} lang={lang} />
        <ProductCardFooter>
          <Button size="lg" className="h-10 flex-1">
            {t(lang, 'Add to cart', 'أضف للسلة')}
          </Button>
        </ProductCardFooter>
      </ProductCardBody>
    </ProductCard>
  );
}

export function Unavailable({ lang }: ExampleProps) {
  return (
    <ProductCard unavailable className="w-56">
      <ProductCardMedia>
        <ProductCardImage src={shop(7)} alt={t(lang, 'Embroidered majlis cushion', 'مخدة مجلس مطرزة')} />
        <ProductCardBadges>
          <Badge variant="secondary">{t(lang, 'Out of stock', 'نفدت الكمية')}</Badge>
        </ProductCardBadges>
      </ProductCardMedia>
      <ProductCardBody>
        <ProductCardTitle href="#cushion">{t(lang, 'Embroidered majlis cushion', 'مخدة مجلس مطرزة')}</ProductCardTitle>
        <ProductCardPrice amount={89} lang={lang} />
        <ProductCardFooter>
          <Button variant="outline" size="lg" className="h-10 w-full" disabled>
            {t(lang, 'Out of stock', 'نفدت الكمية')}
          </Button>
        </ProductCardFooter>
      </ProductCardBody>
    </ProductCard>
  );
}

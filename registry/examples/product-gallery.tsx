import { carouselLabelsAr } from '@/registry/ui/carousel';
import { ProductGallery, productGalleryLabelsAr, type GalleryImage } from '@/registry/ui/product-gallery';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A product image gallery: a swipeable main image with thumbnails, built on Embla. Arrow keys follow the reading direction. Zoom opens the image in a dialog. Alt text is required for every image.',
    ar: 'معرض صور المنتج: صورة رئيسية قابلة للسحب مع صور مصغّرة، مبني على Embla. تتبع مفاتيح الأسهم اتجاه القراءة. يفتح التكبير الصورة في نافذة. النص البديل مطلوب لكل صورة.',
  },
  usage: `import { ProductGallery } from "@/components/ui/product-gallery"\n\n<ProductGallery zoom images={[{ src: "/p-1.jpg", alt: "Front view" }]} />`,
  examples: {
    Default: { en: 'Gallery with zoom', ar: 'معرض مع تكبير' },
  },
  accessibility: [
    {
      en: 'A carousel region with a named slide per image. Thumbnails are buttons named by the image alt, and the selected one has aria-current.',
      ar: 'منطقة عرض متحركة بشريحة مسمّاة لكل صورة. الصور المصغّرة أزرار باسم النص البديل، وللمحددة aria-current.',
    },
    {
      en: 'With zoom, the main image is a button that opens a dialog. The dialog traps focus and closes with Escape.',
      ar: 'مع التكبير تصبح الصورة الرئيسية زرًا يفتح نافذة. تحبس النافذة التركيز وتُغلق بمفتاح Escape.',
    },
    {
      en: 'Wrap the page in a DirectionProvider so swipe and arrow keys follow RTL.',
      ar: 'غلّف الصفحة بـ DirectionProvider ليتبع السحب ومفاتيح الأسهم اتجاه RTL.',
    },
  ],
};

const placeholder = (lightness: number, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="oklch(${lightness} 0.02 250)"/><text x="200" y="215" font-size="64" text-anchor="middle" fill="oklch(0.4 0.02 250)" font-family="sans-serif">${label}</text></svg>`,
  )}`;

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const images: GalleryImage[] = [
    { src: placeholder(0.9, '1'), alt: ar ? 'منظر أمامي للمنتج' : 'Front view of the product' },
    { src: placeholder(0.84, '2'), alt: ar ? 'منظر جانبي للمنتج' : 'Side view of the product' },
    { src: placeholder(0.78, '3'), alt: ar ? 'منظر خلفي للمنتج' : 'Back view of the product' },
    { src: placeholder(0.72, '4'), alt: ar ? 'تفصيل القماش' : 'Fabric detail' },
  ];
  return (
    <div className="w-full max-w-sm">
      <ProductGallery
        images={images}
        zoom
        lang={lang}
        labels={ar ? productGalleryLabelsAr : undefined}
        carouselLabels={ar ? carouselLabelsAr : undefined}
      />
    </div>
  );
}

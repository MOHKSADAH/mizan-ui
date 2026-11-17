import { ImageLightbox, imageLightboxLabelsAr } from '@/registry/ui/image-lightbox';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A thumbnail grid that opens each image in a dialog, with previous and next buttons, an image counter and optional zoom.',
    ar: 'شبكة صور مصغرة تفتح كل صورة في حوار، مع زري السابق والتالي وعداد للصور وتكبير اختياري.',
  },
  usage: `import { ImageLightbox } from "@/components/ui/image-lightbox"\n\n<ImageLightbox zoom images={[{ src: "/a.jpg", alt: "Front view" }]} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Zoom: { en: 'With zoom', ar: 'مع التكبير' },
  },
  accessibility: [
    {
      en: 'Alt text is required: it names each thumbnail and titles the dialog. Escape closes and focus returns to the thumbnail you were on.',
      ar: 'النص البديل مطلوب: يسمي كل صورة مصغرة ويكون عنوان الحوار. يغلق Escape ويعود التركيز إلى الصورة المصغرة التي كنت عليها.',
    },
    {
      en: 'The arrow keys follow the reading direction: in RTL, Right goes to the previous image. Zoom works with the wheel, a pinch, the + and - keys, and two buttons.',
      ar: 'مفاتيح الأسهم تتبع اتجاه القراءة: في RTL ينتقل اليمين إلى الصورة السابقة. يعمل التكبير بالعجلة والقرص ومفتاحي + و - وزرين.',
    },
  ],
};

const make = (ar: boolean) => [
  { src: '/examples/lightbox-front.svg', alt: ar ? 'منظر أمامي' : 'Front view' },
  { src: '/examples/lightbox-side.svg', alt: ar ? 'منظر جانبي' : 'Side view' },
  { src: '/examples/lightbox-back.svg', alt: ar ? 'منظر خلفي' : 'Back view' },
];

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return <ImageLightbox className="w-full max-w-md" lang={lang} images={make(ar)} labels={ar ? imageLightboxLabelsAr : undefined} />;
}

export function Zoom({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return <ImageLightbox zoom className="w-full max-w-md" lang={lang} images={make(ar)} labels={ar ? imageLightboxLabelsAr : undefined} />;
}

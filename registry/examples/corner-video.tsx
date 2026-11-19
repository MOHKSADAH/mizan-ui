import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';
import { CornerVideoDemo } from './corner-video.client';

export const doc: ExampleDoc = {
  description: {
    en: 'A small video card docked at the bottom inline end. It starts muted, with play, mute, expand and close. Expand opens a larger player in a dialog. With no src it shows the poster or an image placeholder.',
    ar: 'بطاقة فيديو صغيرة مثبتة عند نهاية السطر أسفل الشاشة. تبدأ صامتة، وفيها تشغيل وكتم وتكبير وإغلاق. يفتح التكبير مشغلًا أكبر في نافذة حوار. وبلا src تعرض الصورة المصغّرة أو مكان صورة.',
  },
  usage: `import { CornerVideo } from "@/components/ui/corner-video"\n\n<CornerVideo src="/tour.mp4" poster="/tour.jpg" title="Tour of our Riyadh store" onClose={() => remember("tour-closed")} />`,
  examples: { Default: { en: 'Without a video file (placeholder)', ar: 'دون ملف فيديو (مكان الصورة)' } },
  accessibility: [
    {
      en: 'The card is a labelled region. Play, mute, expand and close are icon buttons with text names that change with the state. The video is muted until the visitor unmutes it.',
      ar: 'البطاقة منطقة لها تسمية. التشغيل والكتم والتكبير والإغلاق أزرار أيقونات بأسماء نصية تتغير مع الحالة. يبقى الفيديو صامتًا حتى يشغّل الزائر الصوت.',
    },
    {
      en: 'Under reduced motion the video does not start by itself. The expanded player is a dialog: focus stays inside, Escape closes it, and the card video pauses while it plays.',
      ar: 'عند تقليل الحركة لا يبدأ الفيديو من تلقاء نفسه. المشغل الموسّع نافذة حوار: يبقى التركيز داخلها ويغلقها Escape، ويتوقف فيديو البطاقة أثناء تشغيله.',
    },
    {
      en: 'The card docks to the inline end (left in Arabic) and clears the device safe area. It has no animation.',
      ar: 'تثبت البطاقة عند نهاية السطر (اليسار في العربية) وتتجنب المنطقة الآمنة في الجهاز. وليس لها حركة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <CornerVideoDemo lang={lang} />;
}

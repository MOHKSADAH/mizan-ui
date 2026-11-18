import { AvatarStack, avatarStackLabelsAr } from '@/registry/ui/avatar-group';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Overlapping avatars with a +N counter for the rest. It is built on the Avatar group styles, so the overlap mirrors in RTL.',
    ar: 'صور رمزية متداخلة مع عداد +N للباقي. مبنية على أنماط مجموعة Avatar، فينعكس التداخل في RTL.',
  },
  usage: `import { AvatarStack } from "@/components/ui/avatar-group"\n\n<AvatarStack max={3} people={[{ name: "Sara Ali" }, { name: "Omar Khan", src: "/omar.jpg" }]} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sizes: { en: 'Sizes', ar: 'الأحجام' },
  },
  accessibility: [
    {
      en: 'The group is labelled with the total, such as "6 people". Each avatar has the person name as its alt text or hidden text. The counter reads "and 2 more".',
      ar: 'للمجموعة تسمية بالعدد الكلي مثل "6 أشخاص". ولكل صورة رمزية اسم الشخص كنص بديل أو نص مخفي. ويقرأ العداد "وشخصان آخران".',
    },
  ],
};

const names = {
  en: ['Sara Ali', 'Omar Khan', 'Lina Hassan', 'Yusuf Nasser', 'Huda Salem', 'Faisal Qahtani'],
  ar: ['سارة علي', 'عمر خان', 'لينا حسن', 'يوسف ناصر', 'هدى سالم', 'فيصل القحطاني'],
};

export function Default({ lang }: ExampleProps) {
  return (
    <AvatarStack
      lang={lang}
      max={4}
      labels={lang === 'ar' ? avatarStackLabelsAr : undefined}
      people={names[lang].map((name) => ({ name }))}
    />
  );
}

export function Sizes({ lang }: ExampleProps) {
  const people = names[lang].map((name) => ({ name }));
  const labels = lang === 'ar' ? avatarStackLabelsAr : undefined;
  return (
    <div className="flex flex-col gap-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <AvatarStack key={size} lang={lang} size={size} max={3} labels={labels} people={people} />
      ))}
    </div>
  );
}

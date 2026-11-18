import {
  OpeningHours,
  OpeningHoursEditor,
  openingHoursLabelsAr,
  type OpeningHoursValue,
  type Week,
} from '@/registry/ui/opening-hours';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A weekly opening hours table with an "open now" status, and an editor. A day can have a split shift, for example a gap on Friday for the prayer. A Ramadan override replaces the regular hours between two dates. The status uses Intl in an explicit timeZone, Asia/Riyadh by default, so it does not depend on the visitor time zone. A shift cannot run past midnight: end it at 24:00.',
    ar: 'جدول ساعات العمل الأسبوعي مع حالة "مفتوح الآن"، ومحرر. يمكن أن يكون لليوم فترتان، مثل فجوة يوم الجمعة لأداء الصلاة. تستبدل ساعات رمضان الساعات العادية بين تاريخين. تعتمد الحالة على Intl في منطقة زمنية صريحة هي Asia/Riyadh افتراضياً، فلا تتأثر بمنطقة الزائر. لا يمتد الدوام بعد منتصف الليل: أنهِه عند 24:00.',
  },
  usage: `import { OpeningHours } from "@/components/ui/opening-hours"\n\n<OpeningHours value={{ week, ramadan: { from: "2026-02-18", to: "2026-03-19", week: ramadanWeek } }} timeZone="Asia/Riyadh" />`,
  examples: {
    Default: { en: 'With a Friday gap and Ramadan hours', ar: 'مع فجوة الجمعة وساعات رمضان' },
    Editor: { en: 'Editor', ar: 'المحرر' },
  },
  accessibility: [
    {
      en: 'The hours are a table with a row header for each day. Today is marked with aria-current. The status is text with a dot, never color alone, and sits in a polite live region.',
      ar: 'الساعات جدول فيه رأس صف لكل يوم. اليوم الحالي معلَّم بـ aria-current. الحالة نص مع نقطة وليست لوناً فقط، وتوجد في منطقة حية مهذبة.',
    },
    {
      en: 'In the editor, each time field is a select with a label that names the day, and each day has an open switch.',
      ar: 'في المحرر، كل حقل وقت قائمة اختيار بتسمية تذكر اليوم، ولكل يوم مفتاح فتح.',
    },
  ],
};

const days = (...intervals: [string, string][]) => intervals.map(([open, close]) => ({ open, close }));
const week = (): Week => [
  days(['09:00', '22:00']),
  days(['09:00', '22:00']),
  days(['09:00', '22:00']),
  days(['09:00', '22:00']),
  days(['09:00', '22:00']),
  days(['09:00', '11:30'], ['13:30', '22:00']),
  [],
];
const ramadan = (): Week => [
  days(['10:00', '15:00'], ['20:00', '24:00']),
  days(['10:00', '15:00'], ['20:00', '24:00']),
  days(['10:00', '15:00'], ['20:00', '24:00']),
  days(['10:00', '15:00'], ['20:00', '24:00']),
  days(['10:00', '15:00'], ['20:00', '24:00']),
  days(['20:00', '24:00']),
  days(['20:00', '24:00']),
];
const value: OpeningHoursValue = { week: week(), ramadan: { from: '2026-02-18', to: '2026-03-19', week: ramadan() } };

export function Default({ lang }: ExampleProps) {
  return <OpeningHours lang={lang} value={value} labels={lang === 'ar' ? openingHoursLabelsAr : undefined} className="max-w-md" />;
}

export function Editor({ lang }: ExampleProps) {
  return (
    <OpeningHoursEditor
      lang={lang}
      defaultValue={{ week: week() }}
      labels={lang === 'ar' ? openingHoursLabelsAr : undefined}
      className="max-w-2xl"
    />
  );
}

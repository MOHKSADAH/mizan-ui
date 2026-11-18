import { SlotPicker, slotPickerLabelsAr } from '@/registry/ui/slot-picker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A day strip and time chips for booking. The strip shows the next days, with Friday and Saturday styled as the weekend. Times are grouped into morning, afternoon and evening, and show AM or PM (ص or م in Arabic). A day or a time can be disabled. The default time zone is Asia/Riyadh.',
    ar: 'شريط أيام وأزرار أوقات للحجز. يعرض الشريط الأيام القادمة مع تمييز الجمعة والسبت كعطلة نهاية الأسبوع. تُجمع الأوقات في صباح وظهر وعصر ومساء، وتظهر بصيغة ص أو م. يمكن تعطيل يوم أو وقت. المنطقة الزمنية الافتراضية Asia/Riyadh.',
  },
  usage: `import { SlotPicker } from "@/components/ui/slot-picker"\n\n<SlotPicker slots={{ "2026-03-04": [{ time: "09:00" }, { time: "09:30", disabled: true }] }} onValueChange={(value) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a selection', ar: 'مع اختيار' },
  },
  accessibility: [
    {
      en: 'The days and the times are radio groups. Arrow keys move between options and skip disabled ones.',
      ar: 'الأيام والأوقات مجموعات أزرار اختيار. تتنقل مفاتيح الأسهم بين الخيارات وتتخطى المعطلة.',
    },
    {
      en: 'A disabled time is struck through and marked disabled, not only dimmed. The times area is a polite live region.',
      ar: 'الوقت المعطل مشطوب ومعلَّم كمعطل وليس باهتاً فقط. منطقة الأوقات منطقة حية مهذبة.',
    },
  ],
};

const START = '2026-03-02';
const times = (disabled: string[] = []) =>
  ['09:00', '09:30', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'].map((time) => ({
    time,
    disabled: disabled.includes(time),
  }));
const slots = {
  '2026-03-02': times(['09:30', '14:30']),
  '2026-03-03': times(),
  '2026-03-04': times(['09:00', '09:30', '10:00']),
  '2026-03-05': times(),
  '2026-03-08': times(),
};

export function Default({ lang }: ExampleProps) {
  return <SlotPicker lang={lang} startDate={START} slots={slots} labels={lang === 'ar' ? slotPickerLabelsAr : undefined} className="max-w-xl" />;
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <SlotPicker
      lang={lang}
      startDate={START}
      slots={slots}
      defaultValue={{ date: '2026-03-04', time: '11:30' }}
      labels={lang === 'ar' ? slotPickerLabelsAr : undefined}
      className="max-w-xl"
    />
  );
}

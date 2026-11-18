import { DateRangePicker, dateRangePickerLabelsAr } from '@/registry/ui/date-range-picker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A range picker built on the Calendar in range mode, with presets (today, last 7 days, last 30 days, this month, custom). A nights variant shows the stay length for bookings and needs at least one night. An optional Hijri display shows the Umm al-Qura date in the trigger and under each day. Note: Hijri dates can differ by one day from the officially announced date.',
    ar: 'منتقي نطاق مبني على التقويم في وضع النطاق، مع نطاقات جاهزة (اليوم، آخر 7 أيام، آخر 30 يوماً، هذا الشهر، مخصص). نسخة الليالي تعرض مدة الإقامة للحجوزات وتتطلب ليلة واحدة على الأقل. عرض هجري اختياري يُظهر تاريخ أم القرى في الزر وتحت كل يوم. ملاحظة: قد تختلف التواريخ الهجرية بيوم واحد عن التاريخ المعلن رسمياً.',
  },
  usage: `import { DateRangePicker } from "@/components/ui/date-range-picker"\n\n<DateRangePicker nights onValueChange={(range) => {}} />`,
  examples: {
    Default: { en: 'With presets', ar: 'مع نطاقات جاهزة' },
    Nights: { en: 'Booking, with nights count', ar: 'حجز مع عدد الليالي' },
    Hijri: { en: 'With Hijri dates', ar: 'مع التواريخ الهجرية' },
  },
  accessibility: [
    {
      en: 'The calendar grid supports arrow keys, Page Up and Page Down, Home and End. Presets are buttons with aria-pressed.',
      ar: 'تدعم شبكة التقويم مفاتيح الأسهم وPage Up وPage Down وHome وEnd. النطاقات الجاهزة أزرار بخاصية aria-pressed.',
    },
    {
      en: 'The Hijri day number under each day is hidden from screen readers, so the day is read once.',
      ar: 'رقم اليوم الهجري تحت كل يوم مخفي عن قارئات الشاشة، فيُقرأ اليوم مرة واحدة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <DateRangePicker lang={lang} labels={lang === 'ar' ? dateRangePickerLabelsAr : undefined} className="max-w-sm" />;
}

export function Nights({ lang }: ExampleProps) {
  return (
    <DateRangePicker
      lang={lang}
      nights
      presets={[]}
      numberOfMonths={2}
      disabledDays={{ before: new Date(2026, 0, 1) }}
      labels={lang === 'ar' ? dateRangePickerLabelsAr : undefined}
      className="max-w-sm"
    />
  );
}

export function Hijri({ lang }: ExampleProps) {
  return <DateRangePicker lang={lang} hijri labels={lang === 'ar' ? dateRangePickerLabelsAr : undefined} className="max-w-md" />;
}

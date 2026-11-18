import { HijriDatePicker, hijriDatePickerLabelsAr } from '@/registry/ui/hijri-date-picker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A date picker that shows both dates in the trigger, for example "Ramadan 15, 1447 AH · Mar 4, 2026", and opens a Hijri or Gregorian month grid. The value is a Gregorian ISO string. Note: Umm al-Qura dates are computed from tables and can differ by one day from the date officially announced for Ramadan, Eid and other months. Check the announced date before using them for a deadline.',
    ar: 'منتقي تاريخ يعرض التاريخين في الزر، مثل "15 رمضان 1447 هـ · 4 مارس 2026"، ويفتح شبكة شهر هجرية أو ميلادية. القيمة نص ISO ميلادي. ملاحظة: تواريخ أم القرى محسوبة من جداول وقد تختلف بيوم واحد عن التاريخ المعلن رسمياً لرمضان والعيدين وغيرها من الشهور. تحقق من التاريخ المعلن قبل استخدامها في موعد نهائي.',
  },
  usage: `import { HijriDatePicker } from "@/components/ui/hijri-date-picker"\n\n<HijriDatePicker lang="ar" onValueChange={(iso) => {}} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithValue: { en: 'With a value', ar: 'بقيمة' },
    GregorianFirst: { en: 'Gregorian first', ar: 'الميلادي أولاً' },
  },
  accessibility: [
    {
      en: 'The trigger is a button that opens a popover with the calendar grid. Escape closes it and returns focus to the trigger.',
      ar: 'الزر يفتح نافذة منبثقة فيها شبكة التقويم. يغلقها Escape ويعيد التركيز إلى الزر.',
    },
    {
      en: 'The calendar toggle is a group of two buttons with a label, and the pressed one is marked.',
      ar: 'مفتاح التقويم مجموعة من زرين بتسمية، والزر المضغوط معلَّم.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <HijriDatePicker lang={lang} labels={lang === 'ar' ? hijriDatePickerLabelsAr : undefined} className="max-w-xs" />;
}

export function WithValue({ lang }: ExampleProps) {
  return (
    <HijriDatePicker
      lang={lang}
      defaultValue="2026-03-04"
      labels={lang === 'ar' ? hijriDatePickerLabelsAr : undefined}
      className="max-w-xs"
    />
  );
}

export function GregorianFirst({ lang }: ExampleProps) {
  return (
    <HijriDatePicker
      lang={lang}
      defaultValue="2026-03-04"
      defaultCalendar="gregory"
      labels={lang === 'ar' ? hijriDatePickerLabelsAr : undefined}
      className="max-w-xs"
    />
  );
}

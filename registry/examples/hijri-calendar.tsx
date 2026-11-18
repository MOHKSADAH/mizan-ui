import { HijriCalendar, hijriCalendarLabelsAr } from '@/registry/ui/hijri-calendar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A month grid with a Hijri (Umm al-Qura) and Gregorian toggle. It follows the APG date grid pattern, with arrow keys that follow the reading direction. Dates are Gregorian ISO strings. Note: Umm al-Qura dates are computed from tables and can differ by one day from the date officially announced for Ramadan, Eid and other months. Do not use them for legal or religious deadlines without checking the announced date.',
    ar: 'شبكة شهر مع مفتاح تبديل بين التقويم الهجري (أم القرى) والميلادي. تتبع نمط شبكة التاريخ في APG، ومفاتيح الأسهم تتبع اتجاه القراءة. التواريخ نصوص ISO ميلادية. ملاحظة: تواريخ أم القرى محسوبة من جداول وقد تختلف بيوم واحد عن التاريخ المعلن رسمياً لرمضان والعيدين وغيرها من الشهور. لا تعتمد عليها في مواعيد نظامية أو شرعية قبل التحقق من التاريخ المعلن.',
  },
  usage: `import { HijriCalendar } from "@/components/ui/hijri-calendar"\n\n<HijriCalendar lang="ar" weekend="fri-sat" onValueChange={(iso) => {}} />`,
  examples: {
    Default: { en: 'Hijri grid', ar: 'شبكة هجرية' },
    Gregorian: { en: 'Gregorian grid', ar: 'شبكة ميلادية' },
    NoWeekend: { en: 'Without weekend styling', ar: 'بدون تمييز العطلة' },
  },
  accessibility: [
    {
      en: 'The month is a grid. Arrow keys move by day or week (Left and Right follow the reading direction), Home and End go to the week start and end, Page Up and Page Down change the month, and Shift with them changes the year. Enter or Space selects.',
      ar: 'الشهر شبكة. تتنقل مفاتيح الأسهم بين الأيام والأسابيع (اليمين واليسار يتبعان اتجاه القراءة)، ويذهب Home وEnd إلى بداية الأسبوع ونهايته، ويغير Page Up وPage Down الشهر، ومع Shift تغير السنة. يحدد Enter أو Space التاريخ.',
    },
    {
      en: 'Each day button is named with the weekday, the Hijri date and the Gregorian date. The current day has aria-current="date".',
      ar: 'يحمل كل زر يوم اسماً يتضمن اليوم والتاريخ الهجري والتاريخ الميلادي. اليوم الحالي يحمل aria-current="date".',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <HijriCalendar lang={lang} labels={lang === 'ar' ? hijriCalendarLabelsAr : undefined} className="rounded-lg border" />;
}

export function Gregorian({ lang }: ExampleProps) {
  return (
    <HijriCalendar
      lang={lang}
      defaultCalendar="gregory"
      labels={lang === 'ar' ? hijriCalendarLabelsAr : undefined}
      className="rounded-lg border"
    />
  );
}

export function NoWeekend({ lang }: ExampleProps) {
  return (
    <HijriCalendar
      lang={lang}
      weekend="none"
      labels={lang === 'ar' ? hijriCalendarLabelsAr : undefined}
      className="rounded-lg border"
    />
  );
}

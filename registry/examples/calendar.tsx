import { DisabledCalendar, DropdownCalendar, RangeCalendar, SingleCalendar } from '@/registry/examples/calendar.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A date grid built on React Day Picker. Pass a locale and dir so month names and the week order match the language.',
    ar: 'شبكة تواريخ مبنية على React Day Picker. مرّر locale وdir لتطابق أسماء الأشهر وترتيب الأسبوع اللغة.',
  },
  usage: `import * as React from "react"
import { ar, enUS } from "react-day-picker/locale"
import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 17))

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={ar}
  dir="rtl"
/>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Range: { en: 'Date range', ar: 'نطاق تواريخ' },
    Disabled: { en: 'Disabled days', ar: 'أيام معطّلة' },
    Dropdown: { en: 'Month and year dropdown', ar: 'قائمة الشهر والسنة' },
  },
  accessibility: [
    { en: 'The grid is keyboard friendly: arrow keys move by day, Page Up and Page Down by month, Enter selects.', ar: 'الشبكة تدعم لوحة المفاتيح: الأسهم للأيام، وPage Up وPage Down للأشهر، وEnter للاختيار.' },
    { en: 'Pass dir="rtl" in Arabic so the arrow keys and the week order mirror.', ar: 'مرّر dir="rtl" في العربية لتنعكس الأسهم وترتيب الأسبوع.' },
    { en: 'Selected and disabled days differ by more than color: the selected day has a filled background, and disabled days are dimmed and not focusable.', ar: 'يختلف اليوم المحدد والمعطّل بأكثر من اللون: للمحدد خلفية ممتلئة، والمعطّل باهت ولا يقبل التركيز.' },
    { en: 'Use fixed dates in examples and tests to avoid server and client mismatches.', ar: 'استخدم تواريخ ثابتة في الأمثلة والاختبارات لتجنب اختلاف الخادم والعميل.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SingleCalendar lang={lang} />;
}

export function Range({ lang }: ExampleProps) {
  return <RangeCalendar lang={lang} />;
}

export function Disabled({ lang }: ExampleProps) {
  return <DisabledCalendar lang={lang} />;
}

export function Dropdown({ lang }: ExampleProps) {
  return <DropdownCalendar lang={lang} />;
}

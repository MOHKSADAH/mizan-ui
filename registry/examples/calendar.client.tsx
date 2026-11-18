'use client';

import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { ar, enUS } from 'react-day-picker/locale';
import { Calendar } from '@/registry/ui/calendar';
import type { ExampleProps } from '@/registry/examples/types';

const MONTH = new Date(2026, 10, 1);

// Arabic weekday names are long, so show the narrow form to keep seven columns readable.
function localeProps(lang: ExampleProps['lang']) {
  return lang === 'ar'
    ? { locale: ar, dir: 'rtl', formatters: { formatWeekdayName: (d: Date) => d.toLocaleDateString('ar', { weekday: 'narrow' }) } }
    : { locale: enUS, dir: 'ltr' };
}

export function SingleCalendar({ lang }: ExampleProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 17));
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={MONTH}
      {...localeProps(lang)}
      className="rounded-lg border"
    />
  );
}

export function RangeCalendar({ lang }: ExampleProps) {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 10, 17), to: new Date(2026, 10, 22) });
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={MONTH}
      {...localeProps(lang)}
      className="rounded-lg border"
    />
  );
}

export function DisabledCalendar({ lang }: ExampleProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 24));
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={MONTH}
      disabled={[{ before: new Date(2026, 10, 10) }, { dayOfWeek: [5] }]}
      {...localeProps(lang)}
      className="rounded-lg border"
    />
  );
}

export function DropdownCalendar({ lang }: ExampleProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 17));
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={MONTH}
      captionLayout="dropdown"
      startMonth={new Date(2024, 0)}
      endMonth={new Date(2028, 11)}
      {...localeProps(lang)}
      className="rounded-lg border"
    />
  );
}

"use client"

import * as React from "react"
import { CalendarBlankIcon } from "@phosphor-icons/react"
import type { DateRange, Matcher } from "react-day-picker"
import { arSA } from "react-day-picker/locale"
import { cn } from "@/registry/lib/utils"
import { formatDate, plural, type Calendar as CalendarId, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Calendar, CalendarDayButton } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type PresetId = "today" | "last7Days" | "last30Days" | "thisMonth"

type DateRangePickerLabels = {
  placeholder: string
  presets: string
  today: string
  last7Days: string
  last30Days: string
  thisMonth: string
  custom: string
  nights: (n: number) => string
}

const dateRangePickerLabels: DateRangePickerLabels = {
  placeholder: "Pick a date range",
  presets: "Presets",
  today: "Today",
  last7Days: "Last 7 days",
  last30Days: "Last 30 days",
  thisMonth: "This month",
  custom: "Custom",
  nights: (n) => plural(n, { one: "{n} night", other: "{n} nights" }, { lang: "en" }),
}

const dateRangePickerLabelsAr: DateRangePickerLabels = {
  placeholder: "اختر نطاق التاريخ",
  presets: "نطاقات جاهزة",
  today: "اليوم",
  last7Days: "آخر 7 أيام",
  last30Days: "آخر 30 يوماً",
  thisMonth: "هذا الشهر",
  custom: "مخصص",
  nights: (n) =>
    plural(
      n,
      { zero: "{n} ليلة", one: "ليلة", two: "ليلتان", few: "{n} ليالٍ", many: "{n} ليلة", other: "{n} ليلة" },
      { lang: "ar" },
    ),
}

// react-day-picker's range `min` counts nights (calendar days between the ends), so 1 allows a one-night stay.
const MIN_NIGHTS = 1

const day = (y: number, m: number, d: number) => new Date(y, m, d)

function rangePreset(id: PresetId, now = new Date()): DateRange {
  const y = now.getFullYear()
  const m = now.getMonth()
  const d = now.getDate()
  const to = day(y, m, d)
  if (id === "today") return { from: to, to }
  if (id === "last7Days") return { from: day(y, m, d - 6), to }
  if (id === "last30Days") return { from: day(y, m, d - 29), to }
  return { from: day(y, m, 1), to: day(y, m + 1, 0) }
}

// Counts calendar days between the two dates, so a daylight saving change never skews the result.
function nightsBetween(range?: DateRange) {
  if (!range?.from || !range.to) return undefined
  const utc = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
  return Math.round((utc(range.to) - utc(range.from)) / 864e5)
}

// Intl runs in UTC on the date parts, so the runtime time zone never moves the day.
const utcDate = (d: Date) => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))

const DigitsContext = React.createContext<Digits>("latn")

function HijriDayButton(props: React.ComponentProps<typeof CalendarDayButton>) {
  const digits = React.useContext(DigitsContext)
  const hijriDay = formatDate(
    utcDate(props.day.date),
    { lang: "en", digits, calendar: "islamic-umalqura", timeZone: "UTC" },
    { day: "numeric" }
  )
  return (
    <CalendarDayButton {...props}>
      {props.children}
      <span aria-hidden="true">{hijriDay}</span>
    </CalendarDayButton>
  )
}

const sameDay = (a?: Date, b?: Date) => !!a && !!b && a.toDateString() === b.toDateString()
const sameRange = (a?: DateRange, b?: DateRange) => sameDay(a?.from, b?.from) && sameDay(a?.to, b?.to)

type DateRangePickerProps = {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  presets?: PresetId[]
  nights?: boolean
  hijri?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<DateRangePickerLabels>
  disabledDays?: Matcher | Matcher[]
  numberOfMonths?: number
  id?: string
  disabled?: boolean
  className?: string
}

// Dates are local-midnight Date objects. `nights` needs at least one night, so the end day must differ from the start.
function DateRangePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  presets = ["today", "last7Days", "last30Days", "thisMonth"],
  nights,
  hijri,
  lang = "en",
  digits = "latn",
  labels,
  disabledDays,
  numberOfMonths = 2,
  id,
  disabled,
  className,
}: DateRangePickerProps) {
  const text = { ...dateRangePickerLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const [month, setMonth] = React.useState(valueProp?.from ?? defaultValue?.from ?? new Date())
  const value = valueProp ?? inner
  const show = (d: Date, calendar: CalendarId) =>
    formatDate(utcDate(d), { lang, digits, calendar, timeZone: "UTC" }, { day: "numeric", month: "short", year: "numeric" })
  const dates = (calendar: CalendarId) =>
    [value?.from, value?.to]
      .filter((d): d is Date => !!d)
      .map((d, i) => (
        <React.Fragment key={i}>
          {i > 0 && " – "}
          <bdi>{show(d, calendar)}</bdi>
        </React.Fragment>
      ))
  const count = nights ? nightsBetween(value) : undefined

  const change = (next: DateRange | undefined) => {
    setInner(next)
    onValueChange?.(next)
  }

  const matched = presets.find((p) => sameRange(value, rangePreset(p)))

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" />}
        id={id}
        disabled={disabled}
        className={cn("w-full justify-start font-normal", !value?.from && "text-muted-foreground", className)}
      >
        <CalendarBlankIcon aria-hidden="true" data-icon="inline-start" />
        {value?.from ? (
          <span>
            {dates("gregory")}
            {hijri && <> · {dates("islamic-umalqura")}</>}
            {count !== undefined && <> · {text.nights(count)}</>}
          </span>
        ) : (
          text.placeholder
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto flex-col gap-2 p-0 sm:flex-row">
        {presets.length > 0 && (
          <div role="group" aria-label={text.presets} className="flex flex-wrap gap-1 p-2 sm:w-36 sm:flex-col">
            {presets.map((p) => (
              <Button
                key={p}
                variant={matched === p ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={matched === p}
                className="justify-start"
                onClick={() => {
                  const next = rangePreset(p)
                  setMonth(next.from!)
                  change(next)
                }}
              >
                {text[p]}
              </Button>
            ))}
            <Button
              variant={value && !matched ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={!!value && !matched}
              className="justify-start"
              onClick={() => change(undefined)}
            >
              {text.custom}
            </Button>
          </div>
        )}
        <DigitsContext.Provider value={digits}>
        <Calendar
          mode="range"
          dir={lang === "ar" ? "rtl" : "ltr"}
          locale={lang === "ar" ? arSA : undefined}
          numerals={digits}
          numberOfMonths={numberOfMonths}
          month={month}
          onMonthChange={setMonth}
          selected={value}
          onSelect={change}
          min={nights ? MIN_NIGHTS : undefined}
          disabled={disabledDays}
          className={hijri ? "[--cell-size:--spacing(10)]" : undefined}
          components={hijri ? { DayButton: HijriDayButton } : undefined}
        />
        </DigitsContext.Provider>
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker, MIN_NIGHTS, dateRangePickerLabels, dateRangePickerLabelsAr, nightsBetween, rangePreset }
export type { DateRangePickerLabels, DateRangePickerProps, PresetId }

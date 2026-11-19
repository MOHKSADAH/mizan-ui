"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { localeTag, plural, type Digits, type Lang, type PluralForms } from "@/registry/lib/format"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

type DayPickerFrequency = "daily" | "weekly" | "monthly"

// Weekdays are numbers from 0 (Sunday) to 6 (Saturday), the same as Date.getDay().
type DayPickerValue = { frequency: DayPickerFrequency; days: number[] }

type DayPickerLabels = {
  legend: string
  daily: string
  weekly: string
  monthly: string
  days: string
  // The summary line. {days} is the list of chosen weekdays and {n} their count.
  weeklySummary: PluralForms
  dailySummary: string
  monthlySummary: string
  noDays: string
}

const defaultLabels: DayPickerLabels = {
  legend: "Repeat",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  days: "Days of the week",
  weeklySummary: { one: "Weekly on {days}", other: "Weekly on {days}" },
  dailySummary: "Every day",
  monthlySummary: "Every month",
  noDays: "Choose at least one day.",
}

const dayPickerLabelsAr: DayPickerLabels = {
  legend: "التكرار",
  daily: "يوميًا",
  weekly: "أسبوعيًا",
  monthly: "شهريًا",
  days: "أيام الأسبوع",
  weeklySummary: {
    one: "أسبوعيًا يوم {days}",
    two: "أسبوعيًا يومي {days}",
    few: "أسبوعيًا أيام {days}",
    many: "أسبوعيًا أيام {days}",
    other: "أسبوعيًا أيام {days}",
  },
  dailySummary: "كل يوم",
  monthlySummary: "كل شهر",
  noDays: "اختر يومًا واحدًا على الأقل.",
}

// Saturday for Arabic and Gulf locales, Sunday for English.
const defaultWeekStart = (lang: Lang) => (lang === "ar" ? 6 : 0)

// The seven weekdays in display order, starting at weekStart.
const weekdayOrder = (weekStart: number) => Array.from({ length: 7 }, (_, i) => (weekStart + i) % 7)

// 2024-01-07 was a Sunday, so day 0 is Sunday.
const weekdayName = (day: number, locale: { lang: Lang; digits?: Digits }, width: "short" | "long") =>
  new Intl.DateTimeFormat(localeTag(locale), { weekday: width, timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 7 + day)))

function summarize(value: DayPickerValue, t: DayPickerLabels, locale: { lang: Lang; digits?: Digits }, weekStart: number) {
  if (value.frequency === "daily") return t.dailySummary
  if (value.frequency === "monthly") return t.monthlySummary
  const chosen = weekdayOrder(weekStart).filter((d) => value.days.includes(d))
  if (!chosen.length) return t.noDays
  const list = new Intl.ListFormat(localeTag(locale), { style: "long", type: "conjunction" })
  return plural(chosen.length, t.weeklySummary, locale).replace(
    "{days}",
    list.format(chosen.map((d) => weekdayName(d, locale, "long")))
  )
}

type DayPickerProps = Omit<React.ComponentProps<"fieldset">, "value" | "defaultValue" | "onChange"> & {
  value?: DayPickerValue
  defaultValue?: DayPickerValue
  onValueChange?: (value: DayPickerValue) => void
  // First day of the week, 0 (Sunday) to 6 (Saturday). Defaults to Saturday for ar and Sunday for en.
  weekStart?: number
  lang?: Lang
  digits?: Digits
  labels?: Partial<DayPickerLabels>
}

function DayPicker({
  value,
  defaultValue = { frequency: "daily", days: [] },
  onValueChange,
  weekStart,
  lang = "en",
  digits = "latn",
  labels,
  className,
  ...props
}: DayPickerProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const start = weekStart ?? defaultWeekStart(lang)
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const weekly = current.frequency === "weekly"

  function change(next: DayPickerValue) {
    setInner(next)
    onValueChange?.(next)
  }

  return (
    <fieldset data-slot="day-picker" className={cn("grid min-w-0 gap-3", className)} {...props}>
      <legend className="mb-3 text-sm font-medium">{t.legend}</legend>
      <ToggleGroup
        variant="outline"
        spacing={0}
        className="w-full"
        value={[current.frequency]}
        onValueChange={(next) => {
          const frequency = next[0] as DayPickerFrequency | undefined
          if (frequency) change({ ...current, frequency })
        }}
      >
        {(["daily", "weekly", "monthly"] as const).map((frequency) => (
          <ToggleGroupItem
            key={frequency}
            value={frequency}
            className="h-9 flex-1 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
          >
            {t[frequency]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div
        inert={!weekly}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
          weekly ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="-m-1 min-h-0 overflow-hidden">
          <ToggleGroup
            multiple
            aria-label={t.days}
            spacing={1}
            className="w-full flex-wrap p-1"
            value={current.days.map(String)}
            onValueChange={(next) => change({ ...current, days: next.map(Number).sort((a, b) => a - b) })}
          >
            {weekdayOrder(start).map((day) => (
              <ToggleGroupItem
                key={day}
                value={String(day)}
                variant="outline"
                size="sm"
                aria-label={weekdayName(day, locale, "long")}
                className="aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
              >
                {weekdayName(day, locale, "short")}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {summarize(current, t, locale, start)}
      </p>
    </fieldset>
  )
}

export { DayPicker, dayPickerLabelsAr, defaultWeekStart, summarize, weekdayName, weekdayOrder }
export type { DayPickerFrequency, DayPickerLabels, DayPickerValue }

"use client"

import * as React from "react"
import { parseDate } from "@internationalized/date"
import { CalendarBlankIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatDate, type Calendar as CalendarId } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import {
  HijriCalendar,
  hijriCalendarLabels,
  hijriCalendarLabelsAr,
  type HijriCalendarLabels,
  type HijriCalendarProps,
} from "@/registry/ui/hijri-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type HijriDatePickerLabels = HijriCalendarLabels & { placeholder: string }

const hijriDatePickerLabels: HijriDatePickerLabels = { ...hijriCalendarLabels, placeholder: "Pick a date" }

const hijriDatePickerLabelsAr: HijriDatePickerLabels = { ...hijriCalendarLabelsAr, placeholder: "اختر تاريخاً" }

type HijriDatePickerProps = Omit<HijriCalendarProps, "labels" | "className" | "id"> & {
  labels?: Partial<HijriDatePickerLabels>
  id?: string
  name?: string
  disabled?: boolean
  className?: string
}

// The trigger shows both dates, the selected calendar first: "Ramadan 15, 1447 AH · Mar 4, 2026" (in Arabic, "15 رمضان 1447 هـ · 4 مارس 2026").
function HijriDatePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  calendar: calendarProp,
  defaultCalendar = "islamic-umalqura",
  onCalendarChange,
  lang = "en",
  digits = "latn",
  timeZone = "Asia/Riyadh",
  labels,
  id,
  name,
  disabled,
  className,
  ...calendarProps
}: HijriDatePickerProps) {
  const text = { ...hijriDatePickerLabels, ...labels }
  const [innerValue, setInnerValue] = React.useState(defaultValue)
  const [innerCalendar, setInnerCalendar] = React.useState(defaultCalendar)
  const [open, setOpen] = React.useState(false)
  const value = valueProp === undefined ? innerValue : valueProp
  const calendar = calendarProp ?? innerCalendar

  const show = (id: CalendarId, options: Intl.DateTimeFormatOptions) =>
    formatDate(parseDate(value!).toDate(timeZone), { lang, digits, calendar: id, timeZone }, options)
  const hijri = value && show("islamic-umalqura", { day: "numeric", month: "long", year: "numeric" })
  const gregorian = value && show("gregory", { day: "numeric", month: "short", year: "numeric" })
  const dates = calendar === "gregory" ? [gregorian, hijri] : [hijri, gregorian]

  return (
    <>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={<Button variant="outline" />}
          id={id}
          disabled={disabled}
          className={cn("w-full justify-start font-normal", !value && "text-muted-foreground", className)}
        >
          <CalendarBlankIcon aria-hidden="true" data-icon="inline-start" />
          {value ? (
            <span>
              <bdi>{dates[0]}</bdi> · <bdi>{dates[1]}</bdi>
            </span>
          ) : (
            text.placeholder
          )}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <HijriCalendar
            {...calendarProps}
            lang={lang}
            digits={digits}
            timeZone={timeZone}
            labels={text}
            value={value}
            onValueChange={(iso) => {
              setInnerValue(iso)
              onValueChange?.(iso)
              setOpen(false)
            }}
            calendar={calendar}
            onCalendarChange={(next) => {
              setInnerCalendar(next)
              onCalendarChange?.(next)
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export { HijriDatePicker, hijriDatePickerLabels, hijriDatePickerLabelsAr }
export type { HijriDatePickerLabels, HijriDatePickerProps }

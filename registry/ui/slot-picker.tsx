"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "@/registry/lib/utils"
import { formatDate, formatNumber, type Digits, type Lang } from "@/registry/lib/format"

type SlotPickerLabels = {
  day: string
  time: string
  morning: string
  afternoon: string
  evening: string
  pickDay: string
  noSlots: string
}

const slotPickerLabels: SlotPickerLabels = {
  day: "Day",
  time: "Time",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  pickDay: "Pick a day to see the available times.",
  noSlots: "No times are available on this day.",
}

const slotPickerLabelsAr: SlotPickerLabels = {
  day: "اليوم",
  time: "الوقت",
  morning: "صباحاً",
  afternoon: "ظهراً وعصراً",
  evening: "مساءً",
  pickDay: "اختر يوماً لعرض الأوقات المتاحة.",
  noSlots: "لا توجد أوقات متاحة في هذا اليوم.",
}

type Slot = { time: string; disabled?: boolean }
type SlotValue = { date: string; time: string }

type SlotPickerProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  // Available slots by Gregorian ISO date (YYYY-MM-DD). `time` is 24-hour HH:mm. A day without slots is disabled.
  slots: Record<string, Slot[]>
  value?: SlotValue | null
  defaultValue?: SlotValue | null
  onValueChange?: (value: SlotValue | null) => void
  days?: number
  startDate?: string
  weekend?: "fri-sat" | "none"
  lang?: Lang
  digits?: Digits
  timeZone?: string
  labels?: Partial<SlotPickerLabels>
}

const chip =
  "flex flex-col items-center justify-center gap-0.5 rounded-lg border border-input px-3 py-2 text-sm outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"

const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 864e5)
const toIso = (d: Date) => d.toISOString().slice(0, 10)

// The weekend is styled, not blocked: whether a day can be booked comes from `slots`.
function SlotPicker({
  slots,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  days = 7,
  startDate,
  weekend = "fri-sat",
  lang = "en",
  digits = "latn",
  timeZone = "Asia/Riyadh",
  labels,
  className,
  ...props
}: SlotPickerProps) {
  const text = { ...slotPickerLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp === undefined ? inner : valueProp
  const first = startDate ?? new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date())
  const locale = { lang, digits, timeZone: "UTC" }
  const fmt = (d: Date, options: Intl.DateTimeFormatOptions) => formatDate(d, locale, options)

  const change = (next: SlotValue | null) => {
    setInner(next)
    onValueChange?.(next)
  }

  const open = (iso: string) => (slots[iso] ?? []).filter((s) => !s.disabled)
  const times = value ? (slots[value.date] ?? []) : []
  const groups = [
    { id: "morning", label: text.morning, hours: [0, 12] },
    { id: "afternoon", label: text.afternoon, hours: [12, 17] },
    { id: "evening", label: text.evening, hours: [17, 24] },
  ].map((g) => ({ ...g, slots: times.filter((s) => Number(s.time.slice(0, 2)) >= g.hours[0] && Number(s.time.slice(0, 2)) < g.hours[1]) }))

  return (
    <div data-slot="slot-picker" className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <RadioGroupPrimitive
        aria-label={text.day}
        value={value?.date ?? ""}
        onValueChange={(date) => change({ date: String(date), time: "" })}
        className="flex gap-2 overflow-x-auto p-1"
      >
        {Array.from({ length: days }, (_, i) => {
          const d = addDays(first, i)
          const iso = toIso(d)
          const dow = d.getUTCDay()
          return (
            <RadioPrimitive.Root
              key={iso}
              value={iso}
              disabled={open(iso).length === 0}
              data-weekend={weekend === "fri-sat" && (dow === 5 || dow === 6)}
              aria-label={fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              className={cn(chip, "min-w-16 shrink-0 data-[weekend=true]:text-muted-foreground data-checked:data-[weekend=true]:text-primary-foreground")}
            >
              <span className="text-xs">{fmt(d, { weekday: "short" })}</span>
              <span className="text-base font-medium tabular-nums">{formatNumber(d.getUTCDate(), locale)}</span>
              <span className="text-xs">{fmt(d, { month: "short" })}</span>
            </RadioPrimitive.Root>
          )
        })}
      </RadioGroupPrimitive>
      <div aria-live="polite" className="flex flex-col gap-3">
        {!value && <p className="text-sm text-muted-foreground">{text.pickDay}</p>}
        {value && times.length === 0 && <p className="text-sm text-muted-foreground">{text.noSlots}</p>}
        {value && times.length > 0 && (
          <RadioGroupPrimitive
            aria-label={text.time}
            value={value.time}
            onValueChange={(time) => change({ date: value.date, time: String(time) })}
            className="flex flex-col gap-3"
          >
            {groups
              .filter((g) => g.slots.length > 0)
              .map((g) => (
                <div key={g.id} role="group" aria-label={g.label} className="flex flex-col gap-2">
                  <div className="text-sm font-medium">{g.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {g.slots.map((s) => {
                      const [h, m] = s.time.split(":").map(Number)
                      return (
                        <RadioPrimitive.Root
                          key={s.time}
                          value={s.time}
                          disabled={s.disabled}
                          className={cn(chip, "min-w-20 tabular-nums data-disabled:line-through")}
                        >
                          <bdi>{fmt(new Date(Date.UTC(2000, 0, 1, h, m)), { hour: "numeric", minute: "2-digit", hour12: true })}</bdi>
                        </RadioPrimitive.Root>
                      )
                    })}
                  </div>
                </div>
              ))}
          </RadioGroupPrimitive>
        )}
      </div>
    </div>
  )
}

export { SlotPicker, slotPickerLabels, slotPickerLabelsAr }
export type { Slot, SlotPickerLabels, SlotPickerProps, SlotValue }

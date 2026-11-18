"use client"

import * as React from "react"
import {
  GregorianCalendar,
  IslamicUmalquraCalendar,
  getDayOfWeek,
  parseDate,
  toCalendar,
  today,
  type CalendarDate,
} from "@internationalized/date"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatDate, formatNumber, type Calendar as CalendarId, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

type HijriCalendarLabels = {
  previousMonth: string
  nextMonth: string
  hijri: string
  gregorian: string
  calendarType: string
}

const hijriCalendarLabels: HijriCalendarLabels = {
  previousMonth: "Previous month",
  nextMonth: "Next month",
  hijri: "Hijri",
  gregorian: "Gregorian",
  calendarType: "Calendar type",
}

const hijriCalendarLabelsAr: HijriCalendarLabels = {
  previousMonth: "الشهر السابق",
  nextMonth: "الشهر التالي",
  hijri: "هجري",
  gregorian: "ميلادي",
  calendarType: "نوع التقويم",
}

const systems = { gregory: new GregorianCalendar(), "islamic-umalqura": new IslamicUmalquraCalendar() }
const SUNDAY = Date.UTC(2024, 0, 7)

type HijriCalendarProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  lang?: Lang
  digits?: Digits
  timeZone?: string
  // Dates are Gregorian ISO strings (YYYY-MM-DD). The calendar prop only changes how the grid is laid out.
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (iso: string) => void
  calendar?: CalendarId
  defaultCalendar?: CalendarId
  onCalendarChange?: (calendar: CalendarId) => void
  weekend?: "fri-sat" | "none"
  weekStartsOn?: number
  min?: string
  max?: string
  isDateUnavailable?: (iso: string) => boolean
  labels?: Partial<HijriCalendarLabels>
}

// Umm al-Qura dates here come from @internationalized/date. They can differ by one day from the officially announced date.
function HijriCalendar({
  lang = "en",
  digits = "latn",
  timeZone = "Asia/Riyadh",
  value: valueProp,
  defaultValue = null,
  onValueChange,
  calendar: calendarProp,
  defaultCalendar = "islamic-umalqura",
  onCalendarChange,
  weekend = "fri-sat",
  weekStartsOn = 0,
  min,
  max,
  isDateUnavailable,
  labels,
  className,
  ...props
}: HijriCalendarProps) {
  const text = { ...hijriCalendarLabels, ...labels }
  const [innerValue, setInnerValue] = React.useState(defaultValue)
  const [innerCalendar, setInnerCalendar] = React.useState(defaultCalendar)
  const value = valueProp === undefined ? innerValue : valueProp
  const calendar = calendarProp ?? innerCalendar
  const system = systems[calendar]
  const todayIso = today(timeZone).toString()
  const [focusIso, setFocusIso] = React.useState(value ?? todayIso)
  const keyboard = React.useRef(false)
  const grid = React.useRef<HTMLTableElement>(null)
  const captionId = React.useId()

  React.useEffect(() => {
    if (!keyboard.current) return
    keyboard.current = false
    grid.current?.querySelector<HTMLElement>(`[data-iso="${focusIso}"]`)?.focus()
  }, [focusIso])

  const toIso = (d: CalendarDate) => toCalendar(d, systems.gregory).toString()
  const column = (iso: string) => (getDayOfWeek(parseDate(iso), "en-US") - weekStartsOn + 7) % 7
  const locale = { lang, digits, calendar, timeZone }
  const long = (iso: string, id: CalendarId, options: Intl.DateTimeFormatOptions) =>
    formatDate(parseDate(iso).toDate(timeZone), { ...locale, calendar: id }, options)

  const focus = toCalendar(parseDate(focusIso), system)
  const first = focus.set({ day: 1 })
  const lead = column(toIso(first))
  const days = system.getDaysInMonth(focus)
  const cells = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => ({ iso: toIso(first.set({ day: i + 1 })), day: i + 1 })),
  ]
  const rows = Array.from({ length: Math.ceil(cells.length / 7) }, (_, i) => cells.slice(i * 7, i * 7 + 7))

  const outOfRange = (iso: string) => (!!min && iso < min) || (!!max && iso > max) || !!isDateUnavailable?.(iso)

  const move = (next: CalendarDate) => {
    const iso = toIso(next)
    keyboard.current = true
    setFocusIso(min && iso < min ? min : max && iso > max ? max : iso)
  }

  const select = (iso: string) => {
    if (outOfRange(iso)) return
    setInnerValue(iso)
    setFocusIso(iso)
    onValueChange?.(iso)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    const next = getComputedStyle(e.currentTarget).direction === "rtl" ? 1 : -1
    const moves: Record<string, () => CalendarDate> = {
      ArrowRight: () => focus.add({ days: -next }),
      ArrowLeft: () => focus.add({ days: next }),
      ArrowDown: () => focus.add({ days: 7 }),
      ArrowUp: () => focus.add({ days: -7 }),
      Home: () => focus.add({ days: -column(focusIso) }),
      End: () => focus.add({ days: 6 - column(focusIso) }),
      PageDown: () => focus.add(e.shiftKey ? { years: 1 } : { months: 1 }),
      PageUp: () => focus.add(e.shiftKey ? { years: -1 } : { months: -1 }),
    }
    if (!moves[e.key]) return
    e.preventDefault()
    move(moves[e.key]())
  }

  const weekdays = Array.from({ length: 7 }, (_, c) => new Date(SUNDAY + ((weekStartsOn + c) % 7) * 864e5))
  const gregorianLocale = { ...locale, calendar: "gregory" as const, timeZone: "UTC" }

  return (
    <div
      data-slot="hijri-calendar"
      className={cn(
        "group/calendar flex w-fit flex-col gap-3 bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=popover-content]:bg-transparent",
        className
      )}
      {...props}
    >
      <ToggleGroup
        aria-label={text.calendarType}
        variant="outline"
        size="sm"
        spacing={0}
        value={[calendar]}
        onValueChange={([next]) => {
          if (!next) return
          setInnerCalendar(next as CalendarId)
          onCalendarChange?.(next as CalendarId)
        }}
      >
        {(["islamic-umalqura", "gregory"] as const).map((id) => (
          <ToggleGroupItem
            key={id}
            value={id}
            className="data-pressed:bg-primary data-pressed:text-primary-foreground"
          >
            {id === "gregory" ? text.gregorian : text.hijri}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="flex items-center justify-between gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label={text.previousMonth}
          className="size-(--cell-size)"
          onClick={() => setFocusIso(toIso(focus.add({ months: -1 })))}
        >
          <CaretLeftIcon aria-hidden="true" className="rtl:rotate-180" />
        </Button>
        <div id={captionId} aria-live="polite" className="text-sm font-medium select-none">
          {long(toIso(focus.set({ day: 15 })), calendar, { month: "long", year: "numeric" })}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={text.nextMonth}
          className="size-(--cell-size)"
          onClick={() => setFocusIso(toIso(focus.add({ months: 1 })))}
        >
          <CaretRightIcon aria-hidden="true" className="rtl:rotate-180" />
        </Button>
      </div>
      <table ref={grid} role="grid" aria-labelledby={captionId} onKeyDown={onKeyDown} className="w-full border-collapse">
        <thead>
          <tr>
            {weekdays.map((d) => (
              <th
                key={d.getTime()}
                scope="col"
                abbr={formatDate(d, gregorianLocale, { weekday: "long" })}
                className="size-(--cell-size) text-[0.8rem] font-normal text-muted-foreground select-none"
              >
                {formatDate(d, gregorianLocale, { weekday: "short" })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                if (!cell) return <td key={c} />
                const { iso, day } = cell
                const selected = iso === value
                const weekendDay = weekend === "fri-sat" && [5, 6].includes((weekStartsOn + c) % 7)
                const unavailable = outOfRange(iso)
                return (
                  <td key={iso} role="gridcell" aria-selected={selected} className="p-0 pt-1 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      data-iso={iso}
                      data-selected={selected}
                      data-today={iso === todayIso}
                      data-weekend={weekendDay}
                      tabIndex={iso === focusIso ? 0 : -1}
                      aria-current={iso === todayIso ? "date" : undefined}
                      aria-disabled={unavailable || undefined}
                      aria-label={`${long(iso, "islamic-umalqura", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} (${long(iso, "gregory", { day: "numeric", month: "long", year: "numeric" })})`}
                      className="relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) rounded-(--cell-radius) border-0 leading-none font-normal data-[today=true]:bg-muted data-[today=true]:text-foreground data-[weekend=true]:text-muted-foreground data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:hover:text-foreground"
                      onFocus={() => setFocusIso(iso)}
                      onClick={() => select(iso)}
                    >
                      <bdi>{formatNumber(day, locale)}</bdi>
                    </Button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { HijriCalendar, hijriCalendarLabels, hijriCalendarLabelsAr }
export type { HijriCalendarLabels, HijriCalendarProps }

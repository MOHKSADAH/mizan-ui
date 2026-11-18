"use client"

import * as React from "react"
import { PlusIcon, XIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatDate, type Calendar as CalendarId, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { DateRangePicker, dateRangePickerLabelsAr } from "@/registry/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Switch } from "@/registry/ui/switch"

type Interval = { open: string; close: string }
// Index 0 is Sunday. An empty list means closed, two intervals are a split shift. Times are 24-hour HH:mm, "24:00" ends the day.
type Week = Interval[][]
// The Ramadan week replaces the regular week on every date from `from` to `to` (Gregorian ISO dates, inclusive).
type OpeningHoursValue = { week: Week; ramadan?: { from: string; to: string; week: Week } }

type OpeningHoursLabels = {
  closed: string
  openNow: string
  closesAt: (time: string) => string
  opensAt: (time: string) => string
  opensTomorrowAt: (time: string) => string
  opensOnAt: (day: string, time: string) => string
  regularHours: string
  ramadanHours: string
  openOn: (day: string) => string
  from: string
  to: string
  addSplit: string
  removeShift: (day: string) => string
  ramadanOverride: string
  ramadanDates: string
}

const openingHoursLabels: OpeningHoursLabels = {
  closed: "Closed",
  openNow: "Open now",
  closesAt: (t) => `Closes at ${t}`,
  opensAt: (t) => `Opens at ${t}`,
  opensTomorrowAt: (t) => `Opens tomorrow at ${t}`,
  opensOnAt: (d, t) => `Opens ${d} at ${t}`,
  regularHours: "Opening hours",
  ramadanHours: "Ramadan hours",
  openOn: (d) => `Open on ${d}`,
  from: "From",
  to: "To",
  addSplit: "Add split shift",
  removeShift: (d) => `Remove shift on ${d}`,
  ramadanOverride: "Different hours in Ramadan",
  ramadanDates: "Ramadan dates",
}

const openingHoursLabelsAr: OpeningHoursLabels = {
  closed: "مغلق",
  openNow: "مفتوح الآن",
  closesAt: (t) => `يغلق ${t}`,
  opensAt: (t) => `يفتح ${t}`,
  opensTomorrowAt: (t) => `يفتح غداً ${t}`,
  opensOnAt: (d, t) => `يفتح ${d} ${t}`,
  regularHours: "ساعات العمل",
  ramadanHours: "ساعات رمضان",
  openOn: (d) => `مفتوح يوم ${d}`,
  from: "من",
  to: "إلى",
  addSplit: "إضافة فترة ثانية",
  removeShift: (d) => `حذف الفترة يوم ${d}`,
  ramadanOverride: "ساعات مختلفة في رمضان",
  ramadanDates: "تواريخ رمضان",
}

const emptyWeek = (): Week => Array.from({ length: 7 }, () => [])

const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5))
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// The date, weekday and minute of day in the given time zone, so the status never depends on the visitor's zone.
function zonedNow(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)!.value
  return {
    iso: `${get("year")}-${get("month")}-${get("day")}`,
    day: WEEKDAYS.indexOf(get("weekday")),
    minute: Number(get("hour")) * 60 + Number(get("minute")),
  }
}

const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10)

function weekFor(value: OpeningHoursValue, iso: string) {
  const r = value.ramadan
  return r && iso >= r.from && iso <= r.to ? r.week : value.week
}

type OpenStatus = { open: true; closesAt: string } | { open: false; next?: { daysAhead: number; day: number; time: string } }

// An overnight shift is not supported: `close` must be later than `open` on the same day.
function openStatus(value: OpeningHoursValue, now: Date, timeZone = "Asia/Riyadh"): OpenStatus {
  const { iso, day, minute } = zonedNow(now, timeZone)
  const current = weekFor(value, iso)[day].find((i) => minutes(i.open) <= minute && minute < minutes(i.close))
  if (current) return { open: true, closesAt: current.close }
  for (let ahead = 0; ahead <= 7; ahead++) {
    const intervals = weekFor(value, addDays(iso, ahead))[(day + ahead) % 7]
    const next = intervals.find((i) => ahead > 0 || minutes(i.open) > minute)
    if (next) return { open: false, next: { daysAhead: ahead, day: (day + ahead) % 7, time: next.open } }
  }
  return { open: false }
}

type Format = { lang: Lang; digits: Digits }

const formatTime = (time: string, { lang, digits }: Format) =>
  formatDate(
    new Date(Date.UTC(2000, 0, 1, Number(time.slice(0, 2)), Number(time.slice(3, 5)))),
    { lang, digits, timeZone: "UTC" },
    { hour: "numeric", minute: "2-digit", hour12: true }
  )

const weekdayName = (day: number, { lang, digits }: Format) =>
  formatDate(new Date(Date.UTC(2024, 0, 7 + day)), { lang, digits, timeZone: "UTC" }, { weekday: "long" })

const dayOrder = (weekStartsOn: number) => Array.from({ length: 7 }, (_, i) => (weekStartsOn + i) % 7)

type CommonProps = {
  lang?: Lang
  digits?: Digits
  weekStartsOn?: number
  labels?: Partial<OpeningHoursLabels>
}

type OpeningHoursProps = Omit<React.ComponentProps<"div">, "children"> &
  CommonProps & {
    value: OpeningHoursValue
    timeZone?: string
    // Pass a fixed `now` for tests or server rendering. Without it the status appears after mount and updates every minute.
    now?: Date
  }

function Hours({ week, format, labels, today, weekStartsOn }: {
  week: Week
  format: Format
  labels: OpeningHoursLabels
  today?: number
  weekStartsOn: number
}) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {dayOrder(weekStartsOn).map((day) => (
          <tr key={day} className={cn("border-b border-border last:border-0", day === today && "font-semibold")}>
            <th scope="row" aria-current={day === today ? "date" : undefined} className="py-1.5 pe-4 text-start font-[inherit]">
              {weekdayName(day, format)}
            </th>
            <td className="py-1.5 text-end">
              {week[day].length === 0 ? (
                <span className="text-muted-foreground">{labels.closed}</span>
              ) : (
                week[day].map((i, n) => (
                  <React.Fragment key={i.open}>
                    {n > 0 && " · "}
                    <bdi>{formatTime(i.open, format)}</bdi> – <bdi>{formatTime(i.close, format)}</bdi>
                  </React.Fragment>
                ))
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const subscribeMinute = (notify: () => void) => {
  const timer = setInterval(notify, 60_000)
  return () => clearInterval(timer)
}
const currentMinute = () => Math.floor(Date.now() / 60_000)

function OpeningHours({
  value,
  lang = "en",
  digits = "latn",
  weekStartsOn = 0,
  timeZone = "Asia/Riyadh",
  now: nowProp,
  labels,
  className,
  ...props
}: OpeningHoursProps) {
  const text = { ...openingHoursLabels, ...labels }
  const format = { lang, digits }
  const minute = React.useSyncExternalStore(subscribeMinute, currentMinute, () => null)
  const now = nowProp ?? (minute === null ? undefined : new Date(minute * 60_000))
  const status = now && openStatus(value, now, timeZone)
  const today = now && zonedNow(now, timeZone).day
  const detail =
    status &&
    (status.open
      ? text.closesAt(formatTime(status.closesAt, format))
      : status.next &&
        (status.next.daysAhead === 0
          ? text.opensAt(formatTime(status.next.time, format))
          : status.next.daysAhead === 1
            ? text.opensTomorrowAt(formatTime(status.next.time, format))
            : text.opensOnAt(weekdayName(status.next.day, format), formatTime(status.next.time, format))))
  const r = value.ramadan
  const range = (calendar: CalendarId) =>
    [r?.from, r?.to].map((iso) => formatDate(new Date(`${iso}T00:00:00Z`), { lang, digits, calendar, timeZone: "UTC" }, { day: "numeric", month: "short", year: "numeric" }))

  return (
    <div data-slot="opening-hours" className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {status && (
        <p aria-live="polite" className="flex flex-wrap items-center gap-x-2 text-sm">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span
              aria-hidden="true"
              className={cn("size-2 rounded-full", status.open ? "bg-success" : "border border-muted-foreground")}
            />
            {status.open ? text.openNow : text.closed}
          </span>
          {detail && <span className="text-muted-foreground">{detail}</span>}
        </p>
      )}
      <section aria-label={text.regularHours} className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">{text.regularHours}</h3>
        <Hours week={value.week} format={format} labels={text} today={today} weekStartsOn={weekStartsOn} />
      </section>
      {r && (
        <section aria-label={text.ramadanHours} className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">{text.ramadanHours}</h3>
          <p className="text-sm text-muted-foreground">
            <bdi>{range("gregory")[0]}</bdi> – <bdi>{range("gregory")[1]}</bdi>
            {" · "}
            <bdi>{range("islamic-umalqura")[0]}</bdi> – <bdi>{range("islamic-umalqura")[1]}</bdi>
          </p>
          <Hours week={r.week} format={format} labels={text} today={today} weekStartsOn={weekStartsOn} />
        </section>
      )}
    </div>
  )
}

const steps = Array.from({ length: 49 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`)

const SHIFTS = 2

function WeekEditor({ week, onChange, format, labels, weekStartsOn }: {
  week: Week
  onChange: (week: Week) => void
  format: Format
  labels: OpeningHoursLabels
  weekStartsOn: number
}) {
  const setDay = (day: number, intervals: Interval[]) => onChange(week.map((d, i) => (i === day ? intervals : d)))

  const timeSelect = (day: number, intervals: Interval[], n: number, key: keyof Interval) => {
    const options =
      key === "open"
        ? steps.filter((t) => t < intervals[n].close && (n === 0 || t >= intervals[n - 1].close))
        : steps.filter((t) => t > intervals[n].open && (n === intervals.length - 1 || t <= intervals[n + 1].open))
    return (
      <Select
        items={Object.fromEntries(options.map((t) => [t, formatTime(t, format)]))}
        value={intervals[n][key]}
        onValueChange={(t) => t && setDay(day, intervals.map((iv, i) => (i === n ? { ...iv, [key]: t } : iv)))}
      >
        <SelectTrigger size="sm" aria-label={`${weekdayName(day, format)}: ${key === "open" ? labels.from : labels.to}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((t) => (
            <SelectItem key={t} value={t}>
              {formatTime(t, format)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {dayOrder(weekStartsOn).map((day) => {
        const intervals = week[day]
        const name = weekdayName(day, format)
        const last = intervals.at(-1)
        return (
          <div key={day} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2">
            <div className="flex w-36 items-center gap-2 text-sm">
              <Switch
                size="sm"
                aria-label={labels.openOn(name)}
                checked={intervals.length > 0}
                onCheckedChange={(on) => setDay(day, on ? [{ open: "09:00", close: "17:00" }] : [])}
              />
              <span>{name}</span>
            </div>
            {intervals.length === 0 ? (
              <span className="text-sm text-muted-foreground">{labels.closed}</span>
            ) : (
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {intervals.map((iv, n) => (
                  <div key={n} className="flex items-center gap-1.5">
                    {timeSelect(day, intervals, n, "open")}
                    <span aria-hidden="true">–</span>
                    {timeSelect(day, intervals, n, "close")}
                    {n > 0 && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={labels.removeShift(name)}
                        onClick={() => setDay(day, intervals.slice(0, n))}
                      >
                        <XIcon aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                ))}
                {intervals.length < SHIFTS && last && last.close <= "22:30" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const open = steps[steps.indexOf(last.close) + 2]
                      const close = steps[Math.min(steps.indexOf(open) + 8, 48)]
                      setDay(day, [...intervals, { open, close }])
                    }}
                  >
                    <PlusIcon aria-hidden="true" data-icon="inline-start" />
                    {labels.addSplit}
                  </Button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

type OpeningHoursEditorProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> &
  CommonProps & {
    value?: OpeningHoursValue
    defaultValue?: OpeningHoursValue
    onValueChange?: (value: OpeningHoursValue) => void
  }

const toDate = (iso: string) => new Date(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)))
const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

function OpeningHoursEditor({
  value: valueProp,
  defaultValue = { week: emptyWeek() },
  onValueChange,
  lang = "en",
  digits = "latn",
  weekStartsOn = 0,
  labels,
  className,
  ...props
}: OpeningHoursEditorProps) {
  const text = { ...openingHoursLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const format = { lang, digits }
  const r = value.ramadan

  const change = (next: OpeningHoursValue) => {
    setInner(next)
    onValueChange?.(next)
  }

  return (
    <div data-slot="opening-hours-editor" className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <WeekEditor
        week={value.week}
        onChange={(week) => change({ ...value, week })}
        format={format}
        labels={text}
        weekStartsOn={weekStartsOn}
      />
      <div className="flex items-center gap-2 text-sm font-medium">
        <Switch
          size="sm"
          aria-label={text.ramadanOverride}
          checked={!!r}
          onCheckedChange={(on) =>
            change({ ...value, ramadan: on ? { from: toIso(new Date()), to: toIso(new Date()), week: value.week } : undefined })
          }
        />
        {text.ramadanOverride}
      </div>
      {r && (
        <div className="flex flex-col gap-3">
          <div className="flex max-w-md flex-col gap-1.5">
            <span className="text-sm">{text.ramadanDates}</span>
            <DateRangePicker
              lang={lang}
              digits={digits}
              hijri
              presets={[]}
              labels={lang === "ar" ? dateRangePickerLabelsAr : undefined}
              value={{ from: toDate(r.from), to: toDate(r.to) }}
              onValueChange={(range) =>
                range?.from && change({ ...value, ramadan: { ...r, from: toIso(range.from), to: toIso(range.to ?? range.from) } })
              }
            />
          </div>
          <WeekEditor
            week={r.week}
            onChange={(week) => change({ ...value, ramadan: { ...r, week } })}
            format={format}
            labels={text}
            weekStartsOn={weekStartsOn}
          />
        </div>
      )}
    </div>
  )
}

export { OpeningHours, OpeningHoursEditor, openStatus, openingHoursLabels, openingHoursLabelsAr }
export type { Interval, OpenStatus, OpeningHoursEditorProps, OpeningHoursLabels, OpeningHoursProps, OpeningHoursValue, Week }

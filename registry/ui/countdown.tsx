"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { countdownParts } from "@/registry/lib/countdown-parts"
import { formatDate, formatNumber, plural, type Digits, type Lang, type PluralForms } from "@/registry/lib/format"

type CountdownLabels = {
  days: string
  hours: string
  minutes: string
  seconds: string
  // Spoken forms with {n}, used in the minute announcement.
  spoken: { days: PluralForms; hours: PluralForms; minutes: PluralForms }
  // Contains {time}.
  remaining: string
  ended: string
}

const defaultLabels: CountdownLabels = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  spoken: {
    days: { one: "{n} day", other: "{n} days" },
    hours: { one: "{n} hour", other: "{n} hours" },
    minutes: { one: "{n} minute", other: "{n} minutes" },
  },
  remaining: "{time} remaining",
  ended: "Ended",
}

const countdownLabelsAr: CountdownLabels = {
  days: "أيام",
  hours: "ساعات",
  minutes: "دقائق",
  seconds: "ثوان",
  spoken: {
    days: { zero: "{n} يوم", one: "يوم", two: "يومان", few: "{n} أيام", many: "{n} يوما", other: "{n} يوم" },
    hours: { zero: "{n} ساعة", one: "ساعة", two: "ساعتان", few: "{n} ساعات", many: "{n} ساعة", other: "{n} ساعة" },
    minutes: { zero: "{n} دقيقة", one: "دقيقة", two: "دقيقتان", few: "{n} دقائق", many: "{n} دقيقة", other: "{n} دقيقة" },
  },
  remaining: "المتبقي {time}",
  ended: "انتهى",
}

const listeners = new Set<() => void>()
let interval: ReturnType<typeof setInterval> | undefined

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  interval ??= setInterval(() => listeners.forEach((fn) => fn()), 1000)
  return () => {
    listeners.delete(onChange)
    if (!listeners.size) {
      clearInterval(interval)
      interval = undefined
    }
  }
}

const serverNow = () => null

type CountdownProps = Omit<React.ComponentProps<"div">, "children"> & {
  to: Date | number | string
  onComplete?: () => void
  lang?: Lang
  digits?: Digits
  labels?: Partial<CountdownLabels>
}

function Countdown({ to, onComplete, lang = "en", digits = "latn", labels, className, ...props }: CountdownProps) {
  const l = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const target = new Date(to)
  const end = Math.floor(target.getTime() / 1000)
  // Capped at the end, so an ended countdown stops re-rendering on every tick.
  const now = React.useSyncExternalStore(subscribe, () => Math.min(end, Math.floor(Date.now() / 1000)), serverNow)
  const left = now === null ? null : end - now

  const complete = React.useRef(onComplete)
  React.useEffect(() => {
    complete.current = onComplete
  })
  React.useEffect(() => {
    if (left === 0) complete.current?.()
  }, [left])

  if (left === null) {
    return (
      <div data-slot="countdown" className={cn("text-sm tabular-nums", className)} {...props}>
        <time dateTime={target.toISOString()}>
          {formatDate(target, locale, { dateStyle: "medium", timeStyle: "short" })}
        </time>
      </div>
    )
  }

  const parts = countdownParts(left)
  const minuteParts = countdownParts(Math.floor(left / 60) * 60)
  const time = new Intl.ListFormat(lang, { type: "conjunction" }).format(
    (["days", "hours", "minutes"] as const)
      .filter((unit) => minuteParts[unit] > 0 || (unit === "minutes" && !minuteParts.days && !minuteParts.hours))
      .map((unit) => plural(minuteParts[unit], l.spoken[unit], locale))
  )
  const units = ["days", "hours", "minutes", "seconds"] as const
  return (
    <div data-slot="countdown" className={cn("inline-flex flex-col", className)} {...props}>
      <div dir="ltr" aria-hidden="true" className="flex items-start gap-3 tabular-nums">
        {units.map((unit) => (
          <div key={unit} className="flex min-w-10 flex-col items-center">
            <bdi className="text-lg font-semibold">
              {formatNumber(parts[unit], locale, { minimumIntegerDigits: 2 })}
            </bdi>
            <span dir={lang === "ar" ? "rtl" : "ltr"} className="text-xs text-muted-foreground">
              {l[unit]}
            </span>
          </div>
        ))}
      </div>
      <span aria-live="polite" role="status" className="sr-only">
        {left === 0 ? l.ended : l.remaining.replace("{time}", time)}
      </span>
    </div>
  )
}

export { Countdown, countdownLabelsAr }
export type { CountdownLabels }

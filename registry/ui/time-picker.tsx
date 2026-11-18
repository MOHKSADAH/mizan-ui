"use client"

import * as React from "react"
import { ClockIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits } from "@/registry/lib/format"
import { normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type TimePickerLabels = {
  hour: string
  minute: string
  period: string
  am: string
  pm: string
  empty: string
  placeholder: string
}

const timePickerLabels: TimePickerLabels = {
  hour: "Hour",
  minute: "Minute",
  period: "AM or PM",
  am: "AM",
  pm: "PM",
  empty: "Not set",
  placeholder: "Select time",
}

const timePickerLabelsAr: TimePickerLabels = {
  hour: "الساعة",
  minute: "الدقيقة",
  period: "ص أو م",
  am: "ص",
  pm: "م",
  empty: "غير محدد",
  placeholder: "اختر الوقت",
}

type Time = { h: number; m: number }

const pad = (n: number) => String(n).padStart(2, "0")

function parseTime(value?: string): Time | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value ?? "")
  if (!match) return null
  const [h, m] = [Number(match[1]), Number(match[2])]
  return h < 24 && m < 60 ? { h, m } : null
}

const formatTime = ({ h, m }: Time) => `${pad(h)}:${pad(m)}`
const to12 = (h: number) => h % 12 || 12
const from12 = (h12: number, pm: boolean) => (h12 % 12) + (pm ? 12 : 0)
const wrap = (n: number, size: number, base = 0) => ((((n - base) % size) + size) % size) + base

type Kind = "hour" | "minute" | "period"

type TimeLimits = { min?: string; max?: string; isTimeDisabled?: (value: string) => boolean }
type StepOptions = TimeLimits & { minuteStep?: number; twelve?: boolean }

function isTimeAllowed(t: Time, { min, max, isTimeDisabled }: TimeLimits) {
  const v = formatTime(t)
  const lo = parseTime(min)
  const hi = parseTime(max)
  return (!lo || v >= formatTime(lo)) && (!hi || v <= formatTime(hi)) && !isTimeDisabled?.(v)
}

// The first allowed time on the minute grid within the given hours.
function firstAllowed(hours: number[], o: StepOptions): Time | null {
  for (const h of hours) for (let m = 0; m < 60; m += o.minuteStep ?? 1) if (isTimeAllowed({ h, m }, o)) return { h, m }
  return null
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const halfDay = (pm: boolean) => HOURS.slice(pm ? 12 : 0, pm ? 24 : 12)
const fitTime = (t: Time, o: StepOptions) => (isTimeAllowed(t, o) ? t : firstAllowed([t.h], o))

// Arrow keys skip times that are out of range or disabled. A new hour keeps the minute when it can.
function stepTime(time: Time | null, kind: Kind, delta: number, o: StepOptions): Time | null {
  if (!time) return firstAllowed(HOURS, o)
  if (kind === "period") return fitTime({ ...time, h: wrap(time.h + 12, 24) }, o) ?? firstAllowed(halfDay(time.h < 12), o)
  let next = time
  for (let i = 0; i < 60; i++) {
    next =
      kind === "minute"
        ? { ...next, m: wrap(next.m + delta * (o.minuteStep ?? 1), 60) }
        : { ...next, h: o.twelve ? from12(wrap(to12(next.h) + delta, 12, 1), next.h >= 12) : wrap(next.h + delta, 24) }
    const fitted = kind === "minute" ? (isTimeAllowed(next, o) ? next : null) : fitTime(next, o)
    if (fitted) return fitted
  }
  return null
}

type TimePickerProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  hourCycle?: 12 | 24
  minuteStep?: number
  variant?: "segments" | "list"
  min?: string
  max?: string
  isTimeDisabled?: (value: string) => boolean
  name?: string
  disabled?: boolean
  digits?: Digits
  labels?: Partial<TimePickerLabels>
  className?: string
  "aria-label"?: string
}

function TimePicker({
  value,
  defaultValue,
  onValueChange,
  hourCycle = 24,
  minuteStep = 1,
  variant = "segments",
  min,
  max,
  isTimeDisabled,
  name,
  disabled,
  digits = "latn",
  labels,
  className,
  "aria-label": ariaLabel,
}: TimePickerProps) {
  const l = { ...timePickerLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue ?? "")
  const time = parseTime(value ?? inner)
  const twelve = hourCycle === 12
  const pm = !!time && time.h >= 12
  const num = (n: number) => formatNumber(n, { lang: "en", digits }, { minimumIntegerDigits: 2, useGrouping: false })
  const hourText = time ? num(twelve ? to12(time.h) : time.h) : "--"
  const minuteText = time ? num(time.m) : "--"
  const periodText = pm ? l.pm : l.am
  const o: StepOptions = { min, max, isTimeDisabled, minuteStep, twelve }
  const invalid = !!time && !isTimeAllowed(time, o)

  const set = (next: Time) => {
    const v = formatTime(next)
    if (value === undefined) setInner(v)
    onValueChange?.(v)
  }

  const step = (kind: Kind, delta: number) => {
    const next = stepTime(time, kind, delta, o)
    if (next) set(next)
  }

  const hidden = name !== undefined && <input type="hidden" name={name} value={time ? formatTime(time) : ""} />

  if (variant === "list") {
    const hours = twelve ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
    const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep)
    const base = time ?? firstAllowed(HOURS, o) ?? { h: 0, m: 0 }
    const hourTarget = (h: number) => fitTime({ h: twelve ? from12(h, base.h >= 12) : h, m: base.m }, o)
    const minuteTarget = (m: number) => (isTimeAllowed({ h: base.h, m }, o) ? { h: base.h, m } : null)
    const periodTarget = (p: number) =>
      fitTime({ h: from12(to12(base.h), p === 1), m: base.m }, o) ?? firstAllowed(halfDay(p === 1), o)
    const pick = (t: Time | null) => t && set(t)
    return (
      <Popover>
        <PopoverTrigger
          disabled={disabled}
          aria-invalid={invalid || undefined}
          render={<Button type="button" variant="outline" className={cn("w-40 justify-start font-normal", className)} />}
          data-slot="time-picker"
        >
          <ClockIcon aria-hidden="true" data-icon="inline-start" />
          <bdi dir="ltr" className={cn("tabular-nums", !time && "text-muted-foreground")}>
            {time ? `${hourText}:${minuteText}${twelve ? ` ${periodText}` : ""}` : l.placeholder}
          </bdi>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-1">
          <div dir="ltr" role="group" aria-label={ariaLabel} className="flex gap-1">
            <Column
              label={l.hour}
              options={hours.map((h) => ({ key: h, text: num(h), disabled: !hourTarget(h) }))}
              selected={time ? (twelve ? to12(time.h) : time.h) : undefined}
              onSelect={(h) => pick(hourTarget(h))}
            />
            <Column
              label={l.minute}
              options={minutes.map((m) => ({ key: m, text: num(m), disabled: !minuteTarget(m) }))}
              selected={time?.m}
              onSelect={(m) => pick(minuteTarget(m))}
            />
            {twelve && (
              <Column
                label={l.period}
                options={[
                  { key: 0, text: l.am, disabled: !periodTarget(0) },
                  { key: 1, text: l.pm, disabled: !periodTarget(1) },
                ]}
                selected={time ? Number(pm) : undefined}
                onSelect={(p) => pick(periodTarget(p))}
              />
            )}
          </div>
        </PopoverContent>
        {hidden}
      </Popover>
    )
  }

  return (
    <div
      dir="ltr"
      role="group"
      aria-label={ariaLabel}
      data-slot="time-picker"
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      className={cn(
        "inline-flex h-8 w-fit items-center gap-0.5 rounded-lg border border-input px-1.5 text-base transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40",
        className
      )}
    >
      <Segment
        kind="hour"
        label={l.hour}
        text={hourText}
        now={time ? (twelve ? to12(time.h) : time.h) : undefined}
        min={twelve ? 1 : 0}
        max={twelve ? 12 : 23}
        empty={l.empty}
        invalid={invalid}
        disabled={disabled}
        digits={twelve ? 12 : 23}
        onStep={step}
        onType={(n) => set({ h: twelve ? from12(n, pm) : n, m: time?.m ?? 0 })}
      />
      <span aria-hidden="true">:</span>
      <Segment
        kind="minute"
        label={l.minute}
        text={minuteText}
        now={time?.m}
        min={0}
        max={59}
        empty={l.empty}
        invalid={invalid}
        disabled={disabled}
        digits={59}
        onStep={step}
        onType={(n) => set({ h: time?.h ?? 0, m: n })}
      />
      {twelve && (
        <Segment
          kind="period"
          label={l.period}
          text={periodText}
          now={time ? Number(pm) : undefined}
          min={0}
          max={1}
          empty={l.empty}
          invalid={invalid}
          disabled={disabled}
          onStep={step}
          onType={(n) => time && n !== Number(pm) && step("period", 1)}
          letters={{ [l.am.toLowerCase()]: 0, [l.pm.toLowerCase()]: 1, a: 0, p: 1 }}
        />
      )}
      {hidden}
    </div>
  )
}

type SegmentProps = {
  kind: Kind
  label: string
  text: string
  now?: number
  min: number
  max: number
  empty: string
  invalid?: boolean
  disabled?: boolean
  digits?: number
  letters?: Record<string, number>
  onStep: (kind: Kind, delta: number) => void
  onType: (n: number) => void
}

// Typed digits fill the segment and move on once the value cannot take another digit.
function Segment({ kind, label, text, now, min, max, empty, invalid, disabled, digits, letters, onStep, onType }: SegmentProps) {
  const buffer = React.useRef("")
  const focusSibling = (el: HTMLElement, dir: 1 | -1) => {
    const all = Array.from(el.parentElement?.querySelectorAll<HTMLElement>("[role=spinbutton]") ?? [])
    all[all.indexOf(el) + dir]?.focus()
  }
  return (
    <div
      role="spinbutton"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={now}
      aria-valuetext={now === undefined ? empty : text}
      aria-invalid={invalid || undefined}
      data-slot="time-picker-segment"
      onBlur={() => (buffer.current = "")}
      onKeyDown={(e) => {
        if (disabled) return
        const el = e.currentTarget
        const key = e.key.length === 1 ? normalizeArabic(e.key) || e.key : e.key
        const handled = () => e.preventDefault()
        if (key === "ArrowUp" || key === "ArrowDown") {
          handled()
          onStep(kind, key === "ArrowUp" ? 1 : -1)
        } else if (key === "ArrowRight" || key === "ArrowLeft") {
          handled()
          focusSibling(el, key === "ArrowRight" ? 1 : -1)
        } else if (key === "Home" || key === "End") {
          handled()
          onType(key === "Home" ? min : max)
        } else if (/^[0-9]$/.test(key) && digits !== undefined) {
          handled()
          let next = buffer.current + key
          if (Number(next) > digits) next = key
          const n = Number(next)
          if (n < min) {
            buffer.current = next
            return
          }
          onType(n)
          if (next.length === 2 || n * 10 > digits) {
            buffer.current = ""
            focusSibling(el, 1)
          } else buffer.current = next
        } else if (letters && key.toLowerCase() in letters) {
          handled()
          onType(letters[key.toLowerCase()])
        }
      }}
      className="min-w-6 rounded-sm px-0.5 text-center tabular-nums outline-none focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {text}
    </div>
  )
}

type ColumnProps = {
  label: string
  options: { key: number; text: string; disabled?: boolean }[]
  selected?: number
  onSelect: (key: number) => void
}

function Column({ label, options, selected, onSelect }: ColumnProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    ref.current?.querySelector<HTMLElement>("[aria-selected=true]")?.scrollIntoView({ block: "nearest" })
  }, [])
  const anchor = options.some((o) => o.key === selected) ? selected : options[0].key
  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={label}
      className="flex max-h-48 min-w-12 flex-col gap-0.5 overflow-y-auto"
      onKeyDown={(e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
        e.preventDefault()
        const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[role=option]"))
        const at = items.indexOf(document.activeElement as HTMLElement)
        items[wrap(at + (e.key === "ArrowDown" ? 1 : -1), items.length)]?.focus()
      }}
    >
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="option"
          aria-selected={o.key === selected}
          aria-disabled={o.disabled || undefined}
          tabIndex={o.key === anchor ? 0 : -1}
          onClick={() => !o.disabled && onSelect(o.key)}
          className="h-7 rounded-md px-2 text-sm tabular-nums outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-selected:bg-primary aria-selected:text-primary-foreground"
        >
          {o.text}
        </button>
      ))}
    </div>
  )
}

export { TimePicker, timePickerLabels, timePickerLabelsAr, parseTime, formatTime, to12, from12, isTimeAllowed, stepTime }
export type { TimePickerLabels, TimePickerProps }

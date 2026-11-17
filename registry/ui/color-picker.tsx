"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, type Lang } from "@/registry/lib/format"
import { hexToHsv, hsvToHex, hsvToRgb, parseColor, toOklchString, type Hsv } from "@/registry/lib/color"
import { Input } from "@/registry/ui/input"

type ColorPickerLabels = {
  area: string
  areaValue: string
  hue: string
  hueValue: string
  input: string
  invalid: string
  swatches: string
}

const colorPickerLabels: ColorPickerLabels = {
  area: "Saturation and brightness",
  areaValue: "Saturation {s}%, brightness {v}%",
  hue: "Hue",
  hueValue: "{h} degrees",
  input: "Color value",
  invalid: "Enter a hex or oklch color",
  swatches: "Swatches",
}

const colorPickerLabelsAr: ColorPickerLabels = {
  area: "التشبع والسطوع",
  areaValue: "التشبع {s}%، السطوع {v}%",
  hue: "الصبغة",
  hueValue: "{h} درجة",
  input: "قيمة اللون",
  invalid: "أدخل لونًا بصيغة hex أو oklch",
  swatches: "ألوان جاهزة",
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "")

type PadProps = {
  label: string
  valueText: string
  now: number
  min: number
  max: number
  thumb: { x: number; y: number }
  onPoint: (x: number, y: number) => void
  onKey: (e: React.KeyboardEvent) => void
  draw: (canvas: HTMLCanvasElement) => void
  drawKey: string
  className?: string
}

// A canvas of solid pixels with a thumb. Left and right stay physical: the pads are an LTR island.
function Pad({ label, valueText, now, min, max, thumb, onPoint, onKey, draw, drawKey, className }: PadProps) {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    if (canvas.current) draw(canvas.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawKey])
  const point = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    onPoint(clamp((e.clientX - box.left) / box.width, 0, 1), clamp((e.clientY - box.top) / box.height, 0, 1))
  }
  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={now}
      aria-valuetext={valueText}
      data-slot="color-picker-pad"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        point(e)
      }}
      onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && point(e)}
      onKeyDown={onKey}
      className={cn(
        "relative touch-none rounded-lg border border-input outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <canvas ref={canvas} width={64} height={64} aria-hidden="true" className="size-full rounded-[inherit]" />
      <span
        aria-hidden="true"
        style={{ insetInlineStart: `${thumb.x * 100}%`, top: `${thumb.y * 100}%` }}
        className="pointer-events-none absolute -mt-2 -ms-2 size-4 rounded-full border-2 border-background ring-1 ring-foreground"
      />
    </div>
  )
}

function paint(canvas: HTMLCanvasElement, color: (x: number, y: number) => Hsv) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const { width, height } = canvas
  const image = ctx.createImageData(width, height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const { r, g, b } = hsvToRgb(color(x / (width - 1), y / (height - 1)))
      image.data.set([r, g, b, 255], (y * width + x) * 4)
    }
  }
  ctx.putImageData(image, 0, 0)
}

type ColorPickerProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (hex: string) => void
  swatches?: string[]
  format?: "hex" | "oklch"
  lang?: Lang
  labels?: Partial<ColorPickerLabels>
  className?: string
}

function ColorPicker({
  value,
  defaultValue = "#000000",
  onValueChange,
  swatches = [],
  format = "hex",
  lang = "en",
  labels,
  className,
}: ColorPickerProps) {
  const l = { ...(lang === "ar" ? colorPickerLabelsAr : colorPickerLabels), ...labels }
  const id = React.useId()
  const [inner, setInner] = React.useState<Hsv>(() => hexToHsv(parseColor(defaultValue) ?? "#000000"))
  const [draft, setDraft] = React.useState<string | null>(null)
  const hsv = value !== undefined && parseColor(value) !== hsvToHex(inner) ? hexToHsv(parseColor(value) ?? "#000000") : inner
  const hex = hsvToHex(hsv)
  const n = (x: number) => formatNumber(Math.round(x), { lang })
  const shown = format === "oklch" ? toOklchString(hex) : hex
  const invalid = draft !== null && parseColor(draft) === null

  const commit = (next: Hsv) => {
    setInner(next)
    onValueChange?.(hsvToHex(next))
  }
  const step = (e: React.KeyboardEvent) => (e.shiftKey || e.key.startsWith("Page") ? 10 : 1)

  return (
    <div data-slot="color-picker" className={cn("flex w-64 max-w-full flex-col gap-3", className)}>
      <div dir="ltr" className="flex flex-col gap-3">
        <Pad
          label={l.area}
          valueText={fill(l.areaValue, { s: n(hsv.s), v: n(hsv.v) })}
          now={Math.round(hsv.s)}
          min={0}
          max={100}
          thumb={{ x: hsv.s / 100, y: 1 - hsv.v / 100 }}
          drawKey={String(Math.round(hsv.h))}
          draw={(c) => paint(c, (x, y) => ({ h: hsv.h, s: x * 100, v: (1 - y) * 100 }))}
          onPoint={(x, y) => commit({ ...hsv, s: x * 100, v: (1 - y) * 100 })}
          onKey={(e) => {
            const d = step(e)
            const next = { ...hsv }
            if (e.key === "ArrowLeft") next.s = clamp(hsv.s - d, 0, 100)
            else if (e.key === "ArrowRight") next.s = clamp(hsv.s + d, 0, 100)
            else if (e.key === "ArrowUp" || e.key === "PageUp") next.v = clamp(hsv.v + d, 0, 100)
            else if (e.key === "ArrowDown" || e.key === "PageDown") next.v = clamp(hsv.v - d, 0, 100)
            else if (e.key === "Home") next.s = 0
            else if (e.key === "End") next.s = 100
            else return
            e.preventDefault()
            commit(next)
          }}
          className="h-32 w-full"
        />
        <Pad
          label={l.hue}
          valueText={fill(l.hueValue, { h: n(hsv.h) })}
          now={Math.round(hsv.h)}
          min={0}
          max={360}
          thumb={{ x: hsv.h / 360, y: 0.5 }}
          drawKey="hue"
          draw={(c) => paint(c, (x) => ({ h: x * 360, s: 100, v: 100 }))}
          onPoint={(x) => commit({ ...hsv, h: x * 360 })}
          onKey={(e) => {
            const d = step(e)
            let h = hsv.h
            if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageDown") h -= d
            else if (e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "PageUp") h += d
            else if (e.key === "Home") h = 0
            else if (e.key === "End") h = 360
            else return
            e.preventDefault()
            commit({ ...hsv, h: clamp(h, 0, 360) })
          }}
          className="h-4 w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          style={{ backgroundColor: hex }}
          className="size-8 shrink-0 rounded-lg border border-input"
        />
        <Input
          dir="ltr"
          aria-label={l.input}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className="text-start tabular-nums"
          value={draft ?? shown}
          onChange={(e) => {
            setDraft(e.target.value)
            const parsed = parseColor(e.target.value)
            if (parsed) commit(hexToHsv(parsed))
          }}
          onBlur={() => setDraft(null)}
        />
      </div>
      {invalid && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {l.invalid}
        </p>
      )}
      {swatches.length > 0 && (
        <div role="group" aria-label={l.swatches} className="flex flex-wrap gap-1.5">
          {swatches.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={s}
              aria-pressed={parseColor(s) === hex}
              style={{ backgroundColor: s }}
              onClick={() => {
                setDraft(null)
                commit(hexToHsv(parseColor(s) ?? "#000000"))
              }}
              className="size-6 rounded-md border border-input outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-1 aria-pressed:ring-offset-background"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { ColorPicker, colorPickerLabels, colorPickerLabelsAr }
export type { ColorPickerLabels, ColorPickerProps }

"use client"

import * as React from "react"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"

type ComparisonSliderLabels = {
  slider: string
  // Contains {n}, the percent of the before image shown.
  valueText: string
}

const defaultLabels: ComparisonSliderLabels = {
  slider: "Comparison position",
  valueText: "{n}% before image",
}

const comparisonSliderLabelsAr: ComparisonSliderLabels = {
  slider: "موضع المقارنة",
  valueText: "{n}% من صورة قبل",
}

type ComparisonImage = { src: string; alt: string; caption?: string }

const clamp = (n: number) => Math.min(100, Math.max(0, n))

type ComparisonSliderProps = Omit<React.ComponentProps<"div">, "children" | "defaultValue"> & {
  before: ComparisonImage
  after: ComparisonImage
  // Percent of the before image shown, from the inline start edge.
  defaultValue?: number
  onValueChange?: (value: number) => void
  lang?: Lang
  digits?: Digits
  labels?: Partial<ComparisonSliderLabels>
}

function ComparisonSlider({
  before,
  after,
  defaultValue = 50,
  onValueChange,
  lang = "en",
  digits = "latn",
  labels,
  className,
  ...props
}: ComparisonSliderProps) {
  const l = { ...defaultLabels, ...labels }
  const [value, setValueState] = React.useState(clamp(defaultValue))
  const root = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const setValue = (next: number) => {
    const v = clamp(next)
    setValueState(v)
    onValueChange?.(v)
  }

  function fromPointer(clientX: number) {
    const el = root.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const fraction = (clientX - rect.left) / rect.width
    setValue((getComputedStyle(el).direction === "rtl" ? 1 - fraction : fraction) * 100)
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const rtl = root.current ? getComputedStyle(root.current).direction === "rtl" : false
    const steps: Record<string, number> = {
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
      ArrowUp: 1,
      ArrowDown: -1,
      PageUp: 10,
      PageDown: -10,
    }
    if (event.key === "Home") setValue(0)
    else if (event.key === "End") setValue(100)
    else if (event.key in steps) setValue(value + steps[event.key])
    else return
    event.preventDefault()
  }

  return (
    <div
      ref={root}
      data-slot="comparison-slider"
      className={cn("@container relative aspect-video w-full touch-pan-y overflow-hidden rounded-xl select-none", className)}
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        fromPointer(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after.src} alt={after.alt} draggable={false} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${value}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before.src}
          alt={before.alt}
          draggable={false}
          className="absolute inset-y-0 start-0 h-full max-w-none object-cover"
          style={{ width: "100cqw" }}
        />
      </div>
      {before.caption && (
        <span className="absolute start-2 top-2 rounded-md bg-background/90 px-2 py-0.5 text-xs text-foreground">
          {before.caption}
        </span>
      )}
      {after.caption && (
        <span className="absolute end-2 top-2 rounded-md bg-background/90 px-2 py-0.5 text-xs text-foreground">
          {after.caption}
        </span>
      )}
      <div
        className="pointer-events-none absolute inset-y-0 -ms-4 flex w-8 justify-center"
        style={{ insetInlineStart: `${value}%` }}
      >
        <div className="w-0.5 bg-background" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={l.slider}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
          aria-valuetext={l.valueText.replace("{n}", formatNumber(Math.round(value), { lang, digits }))}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 flex size-8 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-background text-foreground shadow-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <CaretLeftIcon aria-hidden="true" className="size-3" />
          <CaretRightIcon aria-hidden="true" className="size-3" />
        </div>
      </div>
    </div>
  )
}

export { ComparisonSlider, comparisonSliderLabelsAr }
export type { ComparisonImage, ComparisonSliderLabels }

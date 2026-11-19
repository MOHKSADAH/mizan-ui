import * as React from "react"

import { cn } from "@/registry/lib/utils"

type BarTone =
  | "series-1"
  | "series-2"
  | "series-3"
  | "series-4"
  | "series-5"
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"

const toneClass: Record<BarTone, string> = {
  "series-1": "bg-series-1",
  "series-2": "bg-series-2",
  "series-3": "bg-series-3",
  "series-4": "bg-series-4",
  "series-5": "bg-series-5",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
}

const seriesTones: BarTone[] = ["series-1", "series-2", "series-3", "series-4", "series-5"]

type BarSegment = {
  id: string
  value: number
  label?: React.ReactNode
  // Shown next to the label in the legend, for example a formatted price.
  valueLabel?: React.ReactNode
  tone?: BarTone
}

type SegmentedBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  segments: BarSegment[]
  // The full width. Leave it out to fill the bar with the segments. A total below the sum is raised to the sum.
  total?: number
  legend?: boolean
  size?: "sm" | "md" | "lg"
}

const heights = { sm: "h-1.5", md: "h-2", lg: "h-3" }

// Segments start at the inline-start side, so the bar mirrors in RTL. Without a legend, pass aria-label: the bar is then one image.
function SegmentedBar({ segments, total, legend = false, size = "md", className, ...props }: SegmentedBarProps) {
  const sum = segments.reduce((acc, s) => acc + Math.max(s.value, 0), 0)
  const whole = Math.max(total ?? sum, sum)
  const shown = segments.map((s, i) => ({ ...s, tone: s.tone ?? seriesTones[i % seriesTones.length] }))
  return (
    <div
      data-slot="segmented-bar"
      role={legend ? undefined : "img"}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <div
        data-slot="segmented-bar-track"
        aria-hidden="true"
        className={cn("flex w-full gap-0.5 overflow-hidden rounded-full bg-muted", heights[size])}
      >
        {shown.map(
          (s) =>
            s.value > 0 && (
              <span
                key={s.id}
                data-slot="segmented-bar-segment"
                style={{ width: `${(s.value / whole) * 100}%` }}
                className={cn("h-full", toneClass[s.tone])}
              />
            )
        )}
      </div>
      {legend && (
        <ul data-slot="segmented-bar-legend" className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {shown.map((s) => (
            <li key={s.id} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", toneClass[s.tone])} />
              <span>{s.label}</span>
              {s.valueLabel !== undefined && <span className="text-muted-foreground tabular-nums">{s.valueLabel}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { SegmentedBar }
export type { BarSegment, BarTone, SegmentedBarProps }

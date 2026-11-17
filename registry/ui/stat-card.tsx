"use client"

import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { formatCompact, formatNumber, formatSigned, type Digits, type Lang } from "@/registry/lib/format"
import { sparklinePoints } from "@/registry/lib/sparkline"
import { Card } from "@/registry/ui/card"
import { Skeleton } from "@/registry/ui/skeleton"

type StatCardLabels = {
  increase: string
  decrease: string
  noChange: string
  vsPrevious: string
}

const defaultLabels: StatCardLabels = {
  increase: "Increase of",
  decrease: "Decrease of",
  noChange: "No change",
  vsPrevious: "vs previous period",
}

const statCardLabelsAr: StatCardLabels = {
  increase: "زيادة بمقدار",
  decrease: "انخفاض بمقدار",
  noChange: "بدون تغيير",
  vsPrevious: "مقارنة بالفترة السابقة",
}

type Tone = "positive" | "negative" | "neutral"

const toneClass: Record<Tone, string> = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
}

const toneIcon = { positive: ArrowUpIcon, negative: ArrowDownIcon, neutral: MinusIcon }

const SPARK_HEIGHT = 32

function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} data-slot="stat-card-spark" className={cn("h-8 w-full", className)} aria-hidden="true">
      {width > 0 && (
        <svg width={width} height={SPARK_HEIGHT} className="overflow-visible rtl:-scale-x-100">
          <polyline
            points={sparklinePoints(values, width, SPARK_HEIGHT)}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

type StatCardProps = Omit<React.ComponentProps<typeof Card>, "children"> & {
  label: React.ReactNode
  value: number
  compact?: boolean
  formatOptions?: Intl.NumberFormatOptions
  // Change in percent, for example 12.4. Zero is neutral.
  delta?: number
  deltaTone?: Tone
  showPrevious?: boolean
  spark?: number[]
  loading?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<StatCardLabels>
}

function StatCard({
  label,
  value,
  compact,
  formatOptions,
  delta,
  deltaTone,
  showPrevious,
  spark,
  loading,
  lang = "en",
  digits = "latn",
  labels,
  className,
  ...props
}: StatCardProps) {
  const l = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  if (loading) {
    return (
      <Card data-slot="stat-card" aria-busy="true" className={cn("gap-2 px-4", className)} {...props}>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-20" />
      </Card>
    )
  }
  const rounded = delta === undefined ? undefined : Number(delta.toFixed(1))
  const tone: Tone = deltaTone ?? (!rounded ? "neutral" : rounded > 0 ? "positive" : "negative")
  const Icon = toneIcon[!rounded ? "neutral" : rounded > 0 ? "positive" : "negative"]
  const spoken = !rounded ? l.noChange : `${rounded > 0 ? l.increase : l.decrease} ${formatNumber(Math.abs(rounded) / 100, locale, { style: "percent", maximumFractionDigits: 1 })}`
  const signed =
    rounded === undefined ? "" : formatSigned(rounded / 100, locale, { style: "percent", maximumFractionDigits: 1 }).replace("٪", "%")
  return (
    <Card data-slot="stat-card" className={cn("gap-2 px-4", className)} {...props}>
      <p data-slot="stat-card-label" className="text-sm text-muted-foreground">
        {label}
      </p>
      <p data-slot="stat-card-value" className="text-2xl font-semibold tabular-nums">
        <bdi dir="ltr">
          {compact ? formatCompact(value, locale) : formatNumber(value, locale, formatOptions)}
        </bdi>
      </p>
      {rounded !== undefined && (
        <p data-slot="stat-card-delta" className={cn("flex items-center gap-1 text-sm", toneClass[tone])}>
          <Icon aria-hidden="true" weight="bold" className="size-3.5 shrink-0" />
          <span className="sr-only">{spoken}</span>
          <bdi dir="ltr" aria-hidden="true" className="tabular-nums">
            {signed}
          </bdi>
          {showPrevious && <span className="text-muted-foreground">{l.vsPrevious}</span>}
        </p>
      )}
      {spark && spark.length > 1 && <Sparkline values={spark} className={toneClass[tone]} />}
    </Card>
  )
}

export { StatCard, statCardLabelsAr }
export type { StatCardLabels }

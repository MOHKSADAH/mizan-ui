"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import {
  formatMoneySymbol,
  formatNumber,
  formatPercent,
  type Lang,
} from "@/registry/lib/format"

import { Button } from "@/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover"
import { Progress } from "@/registry/ui/progress"

type ContextUsage = {
  id: string
  label: string
  tokens: number
  // Cost of these tokens, in the currency of the meter.
  cost?: number
}

type ContextMeterLabels = {
  trigger: (percent: string) => string
  title: string
  description: (used: string, max: string) => string
  tokens: string
  total: string
}

const defaultLabels: ContextMeterLabels = {
  trigger: (percent) => `Context window, ${percent} used`,
  title: "Context window",
  description: (used, max) => `${used} of ${max} tokens used`,
  tokens: "tokens",
  total: "Total cost",
}

const contextMeterLabelsAr: ContextMeterLabels = {
  trigger: (percent) => `نافذة السياق، ${percent} مستخدم`,
  title: "نافذة السياق",
  description: (used, max) => `${used} من ${max} رمز مستخدم`,
  tokens: "رمز",
  total: "التكلفة الكلية",
}

type ContextMeterProps = {
  used: number
  max: number
  // Rows of the popover: input, output, cached tokens, with their cost.
  usage?: ContextUsage[]
  lang?: Lang
  // ISO 4217 code of the costs.
  currency?: string
  labels?: Partial<ContextMeterLabels>
  className?: string
}

const RADIUS = 6
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// A ring with the percent used. The popover has the exact tokens and the cost.
function ContextMeter({
  used,
  max,
  usage = [],
  lang = "en",
  currency = "USD",
  labels,
  className,
}: ContextMeterProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang }
  const ratio = max > 0 ? Math.min(used / max, 1) : 0
  const percent = formatPercent(ratio, locale)
  const costs = usage.flatMap((row) => (row.cost === undefined ? [] : [row.cost]))
  const money = (amount: number) =>
    formatMoneySymbol(amount, { lang: "en" }, { currency, decimals: true })

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            data-slot="context-meter"
            aria-label={t.trigger(percent)}
            className={cn("text-muted-foreground tabular-nums", className)}
          />
        }
      >
        <span className="rtl:-scale-x-100">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-4 -rotate-90 fill-none stroke-2"
          >
            <circle cx="8" cy="8" r={RADIUS} className="stroke-muted" />
            <circle
              cx="8"
              cy="8"
              r={RADIUS}
              strokeDasharray={`${ratio * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              className={ratio >= 0.9 ? "stroke-destructive" : "stroke-primary"}
            />
          </svg>
        </span>
        <span aria-hidden="true">{percent}</span>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-72">
        <PopoverHeader>
          <PopoverTitle>{t.title}</PopoverTitle>
          <PopoverDescription>
            {t.description(
              formatNumber(used, locale),
              formatNumber(max, locale)
            )}
          </PopoverDescription>
        </PopoverHeader>
        <Progress value={ratio * 100} aria-label={t.title} />
        {usage.length > 0 && (
          <dl className="flex flex-col gap-1.5 text-xs">
            {usage.map((row) => (
              <div key={row.id} className="flex items-baseline gap-2">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="ms-auto tabular-nums">
                  <bdi>{formatNumber(row.tokens, locale)}</bdi>
                </dd>
                <dd className="w-16 text-end text-muted-foreground tabular-nums">
                  <bdi dir="ltr">
                    {row.cost === undefined ? "" : money(row.cost)}
                  </bdi>
                </dd>
              </div>
            ))}
            {costs.length > 0 && (
              <div className="flex items-baseline gap-2 border-t pt-1.5 font-medium">
                <dt>{t.total}</dt>
                <dd className="ms-auto tabular-nums">
                  <bdi dir="ltr">
                    {money(costs.reduce((sum, cost) => sum + cost, 0))}
                  </bdi>
                </dd>
              </div>
            )}
          </dl>
        )}
      </PopoverContent>
    </Popover>
  )
}

export {
  ContextMeter,
  contextMeterLabelsAr,
  type ContextMeterLabels,
  type ContextMeterProps,
  type ContextUsage,
}

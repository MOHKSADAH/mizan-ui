import * as React from "react"
import { CheckCircleIcon, WarningIcon, XCircleIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { plural, type Digits, type Lang, type Locale } from "@/registry/lib/format"

type StockStatus = "in" | "low" | "out"

type StockIndicatorLabels = {
  in: string
  low: string
  lowCount: (n: number, locale?: Locale) => string
  out: string
}

const defaultLabels: StockIndicatorLabels = {
  in: "In stock",
  low: "Low stock",
  lowCount: (n, locale = { lang: "en" }) => plural(n, { one: "Only {n} left", other: "Only {n} left" }, locale),
  out: "Out of stock",
}

const stockIndicatorLabelsAr: StockIndicatorLabels = {
  in: "متوفر",
  low: "الكمية محدودة",
  lowCount: (n, locale = { lang: "ar" }) =>
    plural(
      n,
      {
        one: "بقيت قطعة واحدة فقط",
        two: "بقيت قطعتان فقط",
        few: "بقيت {n} قطع فقط",
        many: "بقيت {n} قطعة فقط",
        other: "بقيت {n} قطعة فقط",
      },
      locale
    ),
  out: "غير متوفر",
}

const icons = {
  in: <CheckCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0 text-success" />,
  low: <WarningIcon weight="fill" aria-hidden="true" className="size-4 shrink-0 text-warning" />,
  out: <XCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0 text-destructive" />,
}

type StockIndicatorProps = Omit<React.ComponentProps<"p">, "children"> & {
  status: StockStatus
  // Remaining units, shown when the status is low. Pass real stock only.
  count?: number
  lang?: Lang
  digits?: Digits
  labels?: Partial<StockIndicatorLabels>
}

function StockIndicator({ status, count, lang = "en", digits, labels, className, ...props }: StockIndicatorProps) {
  const t = { ...defaultLabels, ...labels }
  const text = status === "low" && count !== undefined ? t.lowCount(count, { lang, digits }) : t[status]
  return (
    <p
      data-slot="stock-indicator"
      data-status={status}
      role="status"
      className={cn("inline-flex items-center gap-1.5 text-sm font-medium", className)}
      {...props}
    >
      {icons[status]}
      {text}
    </p>
  )
}

export { StockIndicator, stockIndicatorLabelsAr }
export type { StockIndicatorLabels, StockStatus }

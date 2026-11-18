import * as React from "react"
import { StarIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { formatNumber, plural, type Digits, type Lang, type Locale } from "@/registry/lib/format"

type RatingLabels = {
  value: (value: string, max: string) => string
  count: (n: number, locale?: Locale) => string
}

const defaultLabels: RatingLabels = {
  value: (value, max) => `${value} out of ${max}`,
  count: (n, locale = { lang: "en" }) => plural(n, { one: "{n} review", other: "{n} reviews" }, locale),
}

const ratingLabelsAr: RatingLabels = {
  value: (value, max) => `${value} من ${max}`,
  count: (n, locale = { lang: "ar" }) =>
    plural(
      n,
      { zero: "لا تقييمات", one: "تقييم واحد", two: "تقييمان", few: "{n} تقييمات", many: "{n} تقييمًا", other: "{n} تقييم" },
      locale
    ),
}

type RatingProps = Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  max?: number
  count?: number
  showValue?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<RatingLabels>
}

// Each star has its own fill width from the inline start, so partial fills mirror in RTL.
function Rating({
  value,
  max = 5,
  count,
  showValue,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: RatingProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const shown = formatNumber(value, locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const total = formatNumber(max, locale)
  const text = t.value(shown, total)
  const label = count === undefined ? text : `${text}, ${t.count(count, locale)}`

  return (
    <span
      data-slot="rating"
      className={cn("inline-flex items-center gap-1.5 text-sm", className)}
      {...props}
    >
      <span role="img" aria-label={label} className="inline-flex text-warning">
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className="relative inline-flex">
            <StarIcon weight="regular" className="size-4 text-muted-foreground" aria-hidden="true" />
            <span
              className="absolute inset-y-0 start-0 overflow-hidden"
              style={{ width: `${Math.min(Math.max(value - i, 0), 1) * 100}%` }}
            >
              <StarIcon weight="fill" className="size-4 max-w-none" aria-hidden="true" />
            </span>
          </span>
        ))}
      </span>
      {showValue && (
        <bdi className="font-medium tabular-nums" aria-hidden="true">
          {shown}
        </bdi>
      )}
      {count !== undefined && (
        <bdi className="text-muted-foreground" aria-hidden="true">
          ({formatNumber(count, locale)})
        </bdi>
      )}
    </span>
  )
}

export { Rating, ratingLabelsAr }
export type { RatingLabels }

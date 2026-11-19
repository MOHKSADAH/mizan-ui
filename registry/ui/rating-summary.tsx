import * as React from "react"
import { StarIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { formatNumber, plural, type Digits, type Lang, type Locale } from "@/registry/lib/format"
import { Rating } from "@/registry/ui/rating"

type RatingSummaryLabels = {
  // The spoken name of the stars: "4.8 out of 5".
  value: (value: string, max: string) => string
  total: (n: number, locale?: Locale) => string
  // The spoken form of one distribution row.
  row: (stars: number, count: number, locale?: Locale) => string
  distribution: string
}

const defaultLabels: RatingSummaryLabels = {
  value: (value, max) => `${value} out of ${max}`,
  total: (n, locale = { lang: "en" }) => plural(n, { one: "Based on {n} review", other: "Based on {n} reviews" }, locale),
  row: (stars, count, locale = { lang: "en" }) =>
    `${plural(stars, { one: "{n} star", other: "{n} stars" }, locale)}: ${plural(count, { one: "{n} review", other: "{n} reviews" }, locale)}`,
  distribution: "Reviews by stars",
}

const ratingSummaryLabelsAr: RatingSummaryLabels = {
  value: (value, max) => `${value} من ${max}`,
  total: (n, locale = { lang: "ar" }) =>
    plural(
      n,
      { zero: "لا تقييمات بعد", one: "بناءً على تقييم واحد", two: "بناءً على تقييمين", few: "بناءً على {n} تقييمات", many: "بناءً على {n} تقييمًا", other: "بناءً على {n} تقييم" },
      locale
    ),
  row: (stars, count, locale = { lang: "ar" }) =>
    `${plural(stars, { one: "نجمة واحدة", two: "نجمتان", few: "{n} نجوم", many: "{n} نجمة", other: "{n} نجمة" }, locale)}: ${plural(
      count,
      { zero: "لا تقييمات", one: "تقييم واحد", two: "تقييمان", few: "{n} تقييمات", many: "{n} تقييمًا", other: "{n} تقييم" },
      locale
    )}`,
  distribution: "التقييمات حسب النجوم",
}

type RatingSummaryProps = Omit<React.ComponentProps<"div">, "children"> & {
  average: number
  // Review counts from the highest star to the lowest: [five, four, three, two, one].
  distribution: number[]
  // Defaults to the sum of the distribution.
  count?: number
  lang?: Lang
  digits?: Digits
  labels?: Partial<RatingSummaryLabels>
}

// The bars are block boxes that fill from the inline start, so they mirror in RTL.
function RatingSummary({
  average,
  distribution,
  count,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: RatingSummaryProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const max = distribution.length
  const total = count ?? distribution.reduce((sum, n) => sum + n, 0)

  return (
    <div
      data-slot="rating-summary"
      className={cn("grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8", className)}
      {...props}
    >
      <div className="flex flex-col items-start gap-1.5">
        <bdi aria-hidden="true" className="text-5xl leading-none font-semibold tabular-nums">
          {formatNumber(average, locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </bdi>
        <Rating value={average} max={max} lang={lang} digits={digits} labels={{ value: t.value }} />
        <p className="text-sm text-muted-foreground">{t.total(total, locale)}</p>
      </div>
      <ul aria-label={t.distribution} className="flex min-w-0 flex-col gap-2">
        {distribution.map((n, i) => {
          const stars = max - i
          return (
            <li key={stars} className="flex items-center gap-2 text-sm">
              <span aria-hidden="true" className="flex w-8 shrink-0 items-center gap-1">
                <bdi className="tabular-nums">{formatNumber(stars, locale)}</bdi>
                <StarIcon weight="fill" className="size-3.5 text-warning" />
              </span>
              <span aria-hidden="true" className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-warning"
                  style={{ width: `${total > 0 ? (n / total) * 100 : 0}%` }}
                />
              </span>
              <bdi aria-hidden="true" className="w-10 shrink-0 text-end text-muted-foreground tabular-nums">
                {formatNumber(n, locale)}
              </bdi>
              <span className="sr-only">{t.row(stars, n, locale)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { RatingSummary, ratingSummaryLabelsAr }
export type { RatingSummaryLabels }

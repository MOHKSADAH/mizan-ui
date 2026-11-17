import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { formatDate, minorUnits, plural, type Digits, type Lang, type Locale } from "@/registry/lib/format"
import { Price } from "@/registry/ui/price"

type InstallmentsLabels = {
  payments: (n: number, locale?: Locale) => string
  today: string
  schedule: string
}

const defaultLabels: InstallmentsLabels = {
  payments: (n, locale = { lang: "en" }) => plural(n, { one: "{n} payment of", other: "{n} payments of" }, locale),
  today: "Today",
  schedule: "Payment schedule",
}

const installmentsLabelsAr: InstallmentsLabels = {
  payments: (n, locale = { lang: "ar" }) =>
    plural(
      n,
      { one: "دفعة واحدة بقيمة", two: "دفعتان بقيمة", few: "{n} دفعات بقيمة", many: "{n} دفعة بقيمة", other: "{n} دفعة بقيمة" },
      locale
    ),
  today: "اليوم",
  schedule: "جدول الدفعات",
}

// The first payment takes the rounding remainder, so the parts always add up to the total.
function splitInstallments(total: number, count: number, currency: string) {
  const unit = 10 ** minorUnits(currency)
  const cents = Math.round(total * unit)
  const base = Math.floor(cents / count)
  return Array.from({ length: count }, (_, i) => (base + (i === 0 ? cents - base * count : 0)) / unit)
}

type InstallmentsProps = Omit<React.ComponentProps<"div">, "children"> & {
  total: number
  count?: number
  currency?: string
  // Days between payments. The first payment is on startDate.
  intervalDays?: number
  startDate?: Date
  // The widget renders nothing outside this range.
  min?: number
  max?: number
  // Your provider logo (Tabby, Tamara). Mizan ships no provider logos.
  provider?: React.ReactNode
  showSchedule?: boolean
  timeZone?: string
  lang?: Lang
  digits?: Digits
  labels?: Partial<InstallmentsLabels>
  // Extra content under the schedule, such as a learn more link or a provider script container.
  children?: React.ReactNode
}

function Installments({
  total,
  count = 4,
  currency = "SAR",
  intervalDays = 30,
  startDate,
  min,
  max,
  provider,
  showSchedule = true,
  timeZone,
  lang = "en",
  digits,
  labels,
  className,
  children,
  ...props
}: InstallmentsProps) {
  if ((min !== undefined && total < min) || (max !== undefined && total > max)) return null

  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits, timeZone }
  const start = startDate ?? new Date()
  const parts = splitInstallments(total, count, currency)
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} digits={digits} decimals />

  return (
    <div
      data-slot="installments"
      className={cn("flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-sm text-card-foreground", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex flex-wrap items-baseline gap-x-1 font-medium">
          {t.payments(count, locale)} {price(parts[1] ?? parts[0])}
        </p>
        {provider && <span className="flex shrink-0 items-center">{provider}</span>}
      </div>
      {showSchedule && (
        <ol aria-label={t.schedule} className="flex flex-col gap-1 text-xs text-muted-foreground">
          {parts.map((amount, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <span>
                {i === 0 && !startDate
                  ? t.today
                  : formatDate(new Date(start.getTime() + i * intervalDays * 86_400_000), locale, {
                      day: "numeric",
                      month: "short",
                    })}
              </span>
              {price(amount)}
            </li>
          ))}
        </ol>
      )}
      {children}
    </div>
  )
}

export { Installments, installmentsLabelsAr, splitInstallments }
export type { InstallmentsLabels }

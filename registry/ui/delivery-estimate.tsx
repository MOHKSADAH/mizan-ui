import * as React from "react"
import { CheckCircleIcon, TruckIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { formatDate, type Digits, type Lang } from "@/registry/lib/format"
import { Price } from "@/registry/ui/price"
import { Progress, ProgressLabel } from "@/registry/ui/progress"

type DeliveryEstimateLabels = {
  arrives: (date: string) => string
  deliverTo: string
  away: (amount: React.ReactNode) => React.ReactNode
  freeReached: string
}

const defaultLabels: DeliveryEstimateLabels = {
  arrives: (date) => `Arrives ${date}`,
  deliverTo: "Deliver to",
  away: (amount) => <>{amount} away from free shipping</>,
  freeReached: "You get free shipping",
}

const deliveryEstimateLabelsAr: DeliveryEstimateLabels = {
  arrives: (date) => `يصل ${date}`,
  deliverTo: "التوصيل إلى",
  away: (amount) => <>تبقّى {amount} للحصول على شحن مجاني</>,
  freeReached: "طلبك مؤهل للشحن المجاني",
}

type FreeShipping = {
  threshold: number
  // The current cart subtotal.
  subtotal: number
}

type DeliveryEstimateProps = Omit<React.ComponentProps<"div">, "children"> & {
  date: Date
  // Any IANA zone. The day shown is the day in this zone.
  timeZone?: string
  // Your city picker (a Select or a button that opens one). It follows the "Deliver to" label.
  city?: React.ReactNode
  freeShipping?: FreeShipping
  currency?: string
  lang?: Lang
  digits?: Digits
  labels?: Partial<DeliveryEstimateLabels>
}

function DeliveryEstimate({
  date,
  timeZone = "Asia/Riyadh",
  city,
  freeShipping,
  currency = "SAR",
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: DeliveryEstimateProps) {
  const t = { ...defaultLabels, ...labels }
  const when = formatDate(date, { lang, digits, timeZone }, { weekday: "short", day: "numeric", month: "short" })
  const missing = freeShipping ? freeShipping.threshold - freeShipping.subtotal : 0
  const reached = freeShipping !== undefined && missing <= 0

  return (
    <div data-slot="delivery-estimate" className={cn("flex flex-col gap-3 text-sm", className)} {...props}>
      <p className="flex items-center gap-2 font-medium">
        <TruckIcon aria-hidden="true" weight="regular" className="size-5 shrink-0 rtl:-scale-x-100" />
        {t.arrives(when)}
      </p>
      {city && (
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          {t.deliverTo}
          {city}
        </div>
      )}
      {freeShipping &&
        (reached ? (
          <p className="flex items-center gap-2">
            <CheckCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0 text-success" />
            {t.freeReached}
          </p>
        ) : (
          <Progress value={Math.round((freeShipping.subtotal / freeShipping.threshold) * 100)}>
            <ProgressLabel className="font-normal">
              {t.away(<Price amount={missing} currency={currency} lang={lang} digits={digits} decimals />)}
            </ProgressLabel>
          </Progress>
        ))}
    </div>
  )
}

export { DeliveryEstimate, deliveryEstimateLabelsAr }
export type { DeliveryEstimateLabels, FreeShipping }

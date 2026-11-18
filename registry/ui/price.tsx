import * as React from "react"

import { cn } from "@/registry/lib/utils"
import {
  formatMoney,
  formatMoneyName,
  formatMoneySymbol,
  type Digits,
  type Lang,
} from "@/registry/lib/format"

// Official currency signs (SAMA, CBUAE, CBO). Each sits to the left of the number in both directions.
const SIGNS: Record<string, { viewBox: string; d: string }> = {
  SAR: {
    viewBox: "0 0 1124.14 1256.39",
    d: "M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24ZM1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
  },
  AED: {
    viewBox: "0 0 344.84 299.91",
    d: "M342.14,140.96l2.7,2.54v-7.72c0-17-11.92-30.84-26.56-30.84h-23.41C278.49,36.7,222.69,0,139.68,0c-52.86,0-59.65,0-109.71,0,0,0,15.03,12.63,15.03,52.4v52.58h-27.68c-5.38,0-10.43-2.08-14.61-6.01l-2.7-2.54v7.72c0,17.01,11.92,30.84,26.56,30.84h18.44s0,29.99,0,29.99h-27.68c-5.38,0-10.43-2.07-14.61-6.01l-2.7-2.54v7.71c0,17,11.92,30.82,26.56,30.82h18.44s0,54.89,0,54.89c0,38.65-15.03,50.06-15.03,50.06h109.71c85.62,0,139.64-36.96,155.38-104.98h32.46c5.38,0,10.43,2.07,14.61,6l2.7,2.54v-7.71c0-17-11.92-30.83-26.56-30.83h-18.9c.32-4.88.49-9.87.49-15s-.18-10.11-.51-14.99h28.17c5.37,0,10.43,2.07,14.61,6.01ZM89.96,15.01h45.86c61.7,0,97.44,27.33,108.1,89.94l-153.96.02V15.01ZM136.21,284.93h-46.26v-89.98l153.87-.02c-9.97,56.66-42.07,88.38-107.61,90ZM247.34,149.96c0,5.13-.11,10.13-.34,14.99l-157.04.02v-29.99l157.05-.02c.22,4.84.33,9.83.33,15Z"
  },
  OMR: {
    viewBox: "1200.5 338.09 346.4 232.01",
    d: "M1342.7,466.8c-.8-1.3-1.7-2.7-2.5-4-7.6-12.7-13.9-26.6-16.4-41.2-2.3-13.2-1-27.5,3.2-40.5,8.7-8.9,20-14.7,32.6-16.4,9.3-1.2,18.3-.3,27,3.3,8.9,3.8,16.9,9.6,24.1,16,8.2,7.3,22.3,24.1,22.3,24.1l15-26c-9.4-11.8-19.8-23.1-32.1-31.9-6.1-4.3-12.7-8-19.8-10.2-6.8-2.1-13.8-2.3-20.9-1.4-12.3,1.5-23.8,6.8-32.6,15.7-5.4,5.5-9.3,12-13.2,18.7-6,10.3-12.8,20.6-16.8,32-4.1,11.6-5.9,24.6-4.8,36.9.8,8.6,3.1,17,6.3,25h-53.8l-15,26h82.1c10.3,16.3,23.4,31,37.9,43.5,3.1,2.7,6.3,5.3,9.6,7.7h-159.4l-15,26h286.6l15-26h-50.8c-30.4-2.6-58.3-20.9-79.7-41.6-3.2-3.1-6.3-6.3-9.3-9.6h169.5l15.1-26h-204.4.2ZM1331,371c.2-.4.4-.7.5-1.1,3.1-6.2,8.5-12.7-2.3,5.2.6-1.4,1.2-2.7,1.8-4.1Z"
  }
}

type PriceProps = Omit<React.ComponentProps<"bdi">, "children"> & {
  amount: number
  currency?: string
  lang?: Lang
  digits?: Digits
  compact?: boolean
  decimals?: boolean
}

function Price({
  amount,
  currency = "SAR",
  lang = "en",
  digits = "latn",
  compact,
  decimals,
  className,
  ...props
}: PriceProps) {
  const locale = { lang, digits }
  const money = { currency, compact, decimals }
  const sign = SIGNS[currency]
  return (
    <bdi
      data-slot="price"
      dir={sign ? "ltr" : lang === "ar" ? "rtl" : "ltr"}
      className={cn("inline-flex items-baseline gap-[0.2em] whitespace-nowrap tabular-nums", className)}
      {...props}
    >
      <span className="sr-only">{formatMoneyName(amount, locale, money)}</span>
      {sign ? (
        <>
          <svg
            viewBox={sign.viewBox}
            fill="currentColor"
            aria-hidden="true"
            className="h-[0.8em] w-auto shrink-0 self-center"
          >
            <path d={sign.d} />
          </svg>
          <span aria-hidden="true">{formatMoney(amount, locale, money)}</span>
        </>
      ) : (
        <span aria-hidden="true">{formatMoneySymbol(amount, locale, money)}</span>
      )}
    </bdi>
  )
}

export { Price }

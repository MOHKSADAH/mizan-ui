import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { formatPercent, minorUnits, type Digits, type Lang } from "@/registry/lib/format"
import { Price } from "@/registry/ui/price"

type VatSummaryLabels = {
  subtotal: string
  discount: string
  shipping: string
  free: string
  codFee: string
  vat: (rate: string, included: boolean) => string
  total: string
}

const defaultLabels: VatSummaryLabels = {
  subtotal: "Subtotal",
  discount: "Discount",
  shipping: "Shipping",
  free: "Free",
  codFee: "Cash on delivery fee",
  vat: (rate, included) => (included ? `VAT (${rate}) included` : `VAT (${rate})`),
  total: "Total",
}

const vatSummaryLabelsAr: VatSummaryLabels = {
  subtotal: "المجموع الفرعي",
  discount: "الخصم",
  shipping: "الشحن",
  free: "مجاني",
  codFee: "رسوم الدفع عند الاستلام",
  vat: (rate, included) => (included ? `منها ضريبة القيمة المضافة (${rate})` : `ضريبة القيمة المضافة (${rate})`),
  total: "الإجمالي",
}

type Vat = {
  // A fraction: 0.15 for 15 percent.
  rate: number
  // True when the amounts you pass already include VAT.
  included: boolean
}

type VatTotals = { base: number; vat: number; total: number }

// Rounds to the currency's minor unit. Inclusive prices pull VAT out of the base, exclusive prices add it.
function computeVat(base: number, { rate, included }: Vat, currency: string): VatTotals {
  const unit = 10 ** minorUnits(currency)
  const round = (n: number) => Math.round(n * unit) / unit
  const vat = round(included ? (base * rate) / (1 + rate) : base * rate)
  return { base, vat, total: included ? base : round(base + vat) }
}

type VatSummaryProps = Omit<React.ComponentProps<"dl">, "children"> & {
  subtotal: number
  discount?: number
  // A number, or "free".
  shipping?: number | "free"
  codFee?: number
  vat: Vat
  currency?: string
  lang?: Lang
  digits?: Digits
  labels?: Partial<VatSummaryLabels>
}

function VatSummary({
  subtotal,
  discount,
  shipping,
  codFee,
  vat,
  currency = "SAR",
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: VatSummaryProps) {
  const t = { ...defaultLabels, ...labels }
  const shippingCost = typeof shipping === "number" ? shipping : 0
  const { vat: vatAmount, total } = computeVat(subtotal - (discount ?? 0) + shippingCost + (codFee ?? 0), vat, currency)
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} digits={digits} decimals />
  const row = (key: string, label: string, value: React.ReactNode, strong?: boolean) => (
    <div key={key} className={cn("flex items-baseline justify-between gap-3", strong && "border-t border-border pt-2 font-semibold")}>
      <dt className={strong ? undefined : "text-muted-foreground"}>{label}</dt>
      <dd>{value}</dd>
    </div>
  )

  return (
    <dl data-slot="vat-summary" className={cn("flex flex-col gap-2 text-sm", className)} {...props}>
      {row("subtotal", t.subtotal, price(subtotal))}
      {discount ? row("discount", t.discount, price(-discount)) : null}
      {shipping !== undefined && row("shipping", t.shipping, shipping === "free" ? t.free : price(shipping))}
      {codFee ? row("cod", t.codFee, price(codFee)) : null}
      {vat.rate > 0 && row("vat", t.vat(formatPercent(vat.rate, { lang, digits }), vat.included), price(vatAmount))}
      {row("total", t.total, price(total), true)}
    </dl>
  )
}

export { VatSummary, vatSummaryLabelsAr, computeVat }
export type { Vat, VatSummaryLabels, VatTotals }

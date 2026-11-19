import * as React from "react"

import type { BlockBase, Currency, Lang, Plural, Vat } from "@/registry/lib/block-types"
import { formatDate, formatNumber, plural } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { CopyButton, copyButtonLabelsAr } from "@/registry/ui/copy-button"
import { PaymentResult } from "@/registry/ui/payment-result"
import { Price } from "@/registry/ui/price"
import { Section } from "@/registry/ui/section"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"
import { VatSummary, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

export type OrderSummary03Labels = {
  thanks: string
  thanksDescription: string
  receipt: string
  orderNumber: string
  status: string
  date: string
  payment: string
  deliverTo: string
  items: Plural
  list: string
  track: string
  continueShopping: string
}

export const labelsEn: OrderSummary03Labels = {
  thanks: "Thank you, your order is confirmed",
  thanksDescription: "We sent the confirmation to your email.",
  receipt: "Order receipt",
  orderNumber: "Order number",
  status: "Status",
  date: "Date",
  payment: "Payment",
  deliverTo: "Deliver to",
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
  list: "Items in your order",
  track: "Track order",
  continueShopping: "Continue shopping",
}

export const labelsAr: OrderSummary03Labels = {
  thanks: "شكرًا لك، تم استلام طلبك",
  thanksDescription: "أرسلنا تفاصيل الطلب إلى بريدك الإلكتروني.",
  receipt: "إيصال الطلب",
  orderNumber: "رقم الطلب",
  status: "حالة الطلب",
  date: "التاريخ",
  payment: "طريقة الدفع",
  deliverTo: "عنوان التوصيل",
  items: (n) =>
    plural(
      n,
      { one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" },
      { lang: "ar" }
    ),
  list: "منتجات الطلب",
  track: "تتبّع الطلب",
  continueShopping: "متابعة التسوق",
}

export type ReceiptLine = {
  id: string
  title: string
  variant?: string
  // Unit price, in the same VAT mode as `vat`.
  price: number
  quantity: number
}

export type OrderSummary03Props = BlockBase & {
  lang?: Lang
  labels?: Partial<OrderSummary03Labels>
  order: {
    number: string
    // An ISO date.
    date: string
    status: OrderStatus
    // For example "mada ending 4521".
    paymentMethod: string
    address: string
  }
  items: ReceiptLine[]
  currency?: Currency
  vat?: Vat
  discount?: number
  shipping?: number | "free"
  trackHref?: string
  continueHref?: string
}

export function OrderSummary03({
  lang = "en",
  labels,
  order,
  items,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  discount,
  shipping,
  trackHref,
  continueHref,
  headingLevel = 2,
  className,
}: OrderSummary03Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Heading = `h${headingLevel + 1}` as "h3" | "h4"
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const count = items.reduce((sum, line) => sum + line.quantity, 0)
  const meta = [
    { label: t.status, value: <StatusBadge status={order.status} labels={lang === "ar" ? statusBadgeLabelsAr : undefined} /> },
    { label: t.date, value: formatDate(new Date(order.date), { lang }, { day: "numeric", month: "long", year: "numeric" }) },
    { label: t.payment, value: <bdi>{order.paymentMethod}</bdi> },
    { label: t.deliverTo, value: <bdi>{order.address}</bdi> },
  ]

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="flex max-w-lg flex-col items-center gap-6">
        <PaymentResult status="success" title={t.thanks} description={t.thanksDescription} headingLevel={headingLevel} />
        <Card className="w-full gap-5 px-4">
          <Heading className="sr-only">{t.receipt}</Heading>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">{t.orderNumber}</span>
              <bdi dir="ltr" className="text-lg font-semibold tabular-nums">
                #{order.number}
              </bdi>
            </div>
            <CopyButton value={order.number} size="sm" labels={lang === "ar" ? copyButtonLabelsAr : undefined} />
          </div>
          <dl className="grid gap-x-4 gap-y-3 border-t border-dashed border-border pt-5 text-sm sm:grid-cols-2">
            {meta.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-start gap-1">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 border-t border-dashed border-border pt-5">
            <p className="text-sm text-muted-foreground">{t.items(count)}</p>
            <ul aria-label={t.list} className="flex flex-col gap-2 text-sm">
              {items.map((line) => (
                <li key={line.id} className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0">
                    <span className="text-muted-foreground tabular-nums">{formatNumber(line.quantity, { lang })} ×</span>{" "}
                    {line.title}
                    {line.variant && (
                      <span className="text-muted-foreground">
                        {" "}
                        · <bdi>{line.variant}</bdi>
                      </span>
                    )}
                  </span>
                  <Price amount={line.price * line.quantity} currency={currency} lang={lang} className="shrink-0" />
                </li>
              ))}
            </ul>
          </div>
          <VatSummary
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            vat={vat}
            currency={currency}
            lang={lang}
            labels={lang === "ar" ? vatSummaryLabelsAr : undefined}
            className="border-t border-dashed border-border pt-5"
          />
        </Card>
        {(trackHref || continueHref) && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trackHref && (
              <Button nativeButton={false} render={<a href={trackHref} />}>
                {t.track}
              </Button>
            )}
            {continueHref && (
              <Button variant="outline" nativeButton={false} render={<a href={continueHref} />}>
                {t.continueShopping}
              </Button>
            )}
          </div>
        )}
      </Container>
    </Section>
  )
}

export default OrderSummary03

export const demo: { en: OrderSummary03Props; ar: OrderSummary03Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    order: {
      number: "360251",
      date: "2026-11-19",
      status: "paid",
      paymentMethod: "mada ending 4521",
      address: "Al Yasmin District, Riyadh 13325",
    },
    items: [
      { id: "oud", title: "Royal Oud Perfume", variant: "50 ml", price: 349, quantity: 1 },
      { id: "thobe", title: "Cotton Thobe, Saudi Cut", variant: "White · Size 56", price: 289, quantity: 2 },
      { id: "dallah", title: "Arabic Coffee Dallah with 6 Cups", variant: "Brass", price: 199, quantity: 1 },
    ],
    discount: 112.6,
    shipping: 25,
    trackHref: "#track",
    continueHref: "#shop",
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    order: {
      number: "360251",
      date: "2026-11-19",
      status: "paid",
      paymentMethod: "بطاقة مدى تنتهي بـ 4521",
      address: "حي الياسمين، الرياض 13325",
    },
    items: [
      { id: "oud", title: "عطر عود ملكي", variant: "50 مل", price: 349, quantity: 1 },
      { id: "thobe", title: "ثوب قطني قصّة سعودية", variant: "أبيض · مقاس 56", price: 289, quantity: 2 },
      { id: "dallah", title: "دلّة قهوة عربية مع 6 فناجين", variant: "نحاسي", price: 199, quantity: 1 },
    ],
    discount: 112.6,
    shipping: 25,
    trackHref: "#track",
    continueHref: "#shop",
  },
}

import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Currency, Lang, Media, Plural, Vat } from "@/registry/lib/block-types"
import { formatNumber, plural } from "@/registry/lib/format"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"
import { Installments, installmentsLabelsAr } from "@/registry/ui/installments"
import { Price } from "@/registry/ui/price"
import { Section } from "@/registry/ui/section"
import { VatSummary, computeVat, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

export type OrderSummary02Labels = {
  title: string
  items: Plural
  list: string
  quantity: (quantity: string) => string
  delivery: string
  payLater: string
  installmentsRange: (min: React.ReactNode, max: React.ReactNode) => React.ReactNode
}

export const labelsEn: OrderSummary02Labels = {
  title: "Order summary",
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
  list: "Items in your order",
  quantity: (quantity) => `Qty ${quantity}`,
  delivery: "Delivery",
  payLater: "Pay in installments",
  installmentsRange: (min, max) => (
    <>
      Installments are available for orders from {min} to {max}.
    </>
  ),
}

export const labelsAr: OrderSummary02Labels = {
  title: "ملخص الطلب",
  items: (n) =>
    plural(
      n,
      { one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" },
      { lang: "ar" }
    ),
  list: "منتجات الطلب",
  quantity: (quantity) => `الكمية ${quantity}`,
  delivery: "التوصيل",
  payLater: "قسّمها على دفعات",
  installmentsRange: (min, max) => (
    <>
      التقسيط متاح للطلبات من {min} إلى {max}.
    </>
  ),
}

export type OrderLine = {
  id: string
  title: string
  variant?: string
  // Unit price, in the same VAT mode as `vat`.
  price: number
  quantity: number
  image?: Media
}

export type OrderSummary02Props = BlockBase & {
  lang?: Lang
  labels?: Partial<OrderSummary02Labels>
  items: OrderLine[]
  currency?: Currency
  vat?: Vat
  // freeFrom: the subtotal from which shipping is free.
  shipping: { fee: number; freeFrom: number }
  deliveryDate: Date
  // The delivery city, shown after "Deliver to".
  city?: string
  // The order total must fall between min and max for installments to show.
  installments: { provider: string; min: number; max: number; count?: number; startDate?: Date }
}

function Thumb({ image }: { image?: Media }) {
  return (
    <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
      {image ? (
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
          <ImageIcon weight="duotone" className="size-5" />
        </div>
      )}
    </div>
  )
}

export function OrderSummary02({
  lang = "en",
  labels,
  items,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  shipping,
  deliveryDate,
  city,
  installments,
  id,
  headingLevel = 2,
  className,
}: OrderSummary02Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const Sub = `h${headingLevel + 1}` as "h3" | "h4"
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const count = items.reduce((sum, line) => sum + line.quantity, 0)
  const free = subtotal >= shipping.freeFrom
  const total = computeVat(subtotal + (free ? 0 : shipping.fee), vat, currency).total
  const eligible = total >= installments.min && total <= installments.max
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} />

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="max-w-md">
        <aside aria-labelledby={`${sid}-title`}>
          <Card className="gap-5 px-4">
            <div className="flex items-baseline justify-between gap-3">
              <Heading id={`${sid}-title`} className="text-base font-semibold">
                {t.title}
              </Heading>
              <span className="text-sm text-muted-foreground">{t.items(count)}</span>
            </div>
            <ul aria-label={t.list} className="flex flex-col gap-3">
              {items.map((line) => (
                <li key={line.id} className="flex items-center gap-3">
                  <Thumb image={line.image} />
                  <div className="flex min-w-0 flex-1 flex-col text-sm">
                    <span className="font-medium text-balance">{line.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {line.variant && (
                        <>
                          <bdi>{line.variant}</bdi> ·{" "}
                        </>
                      )}
                      {t.quantity(formatNumber(line.quantity, { lang }))}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-medium">{price(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <section aria-label={t.delivery} className="border-t border-border pt-5">
              <DeliveryEstimate
                date={deliveryDate}
                city={city && <span className="font-medium text-foreground">{city}</span>}
                freeShipping={{ threshold: shipping.freeFrom, subtotal }}
                currency={currency}
                lang={lang}
                labels={lang === "ar" ? deliveryEstimateLabelsAr : undefined}
              />
            </section>
            <VatSummary
              subtotal={subtotal}
              shipping={free ? "free" : shipping.fee}
              vat={vat}
              currency={currency}
              lang={lang}
              labels={lang === "ar" ? vatSummaryLabelsAr : undefined}
              className="border-t border-border pt-5"
            />
            <section className="flex flex-col gap-2 border-t border-border pt-5">
              <Sub className="text-sm font-medium">{t.payLater}</Sub>
              {eligible ? (
                <Installments
                  total={total}
                  count={installments.count}
                  currency={currency}
                  startDate={installments.startDate}
                  min={installments.min}
                  max={installments.max}
                  provider={<span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{installments.provider}</span>}
                  lang={lang}
                  labels={lang === "ar" ? installmentsLabelsAr : undefined}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{t.installmentsRange(price(installments.min), price(installments.max))}</p>
              )}
            </section>
          </Card>
        </aside>
      </Container>
    </Section>
  )
}

export default OrderSummary02

export const demo: { en: OrderSummary02Props; ar: OrderSummary02Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    items: [
      { id: "thobe", title: "Cotton Thobe, Saudi Cut", variant: "White · Size 56", price: 289, quantity: 2 },
      { id: "dallah", title: "Arabic Coffee Dallah with 6 Cups", variant: "Brass", price: 199, quantity: 1 },
    ],
    shipping: { fee: 25, freeFrom: 1000 },
    deliveryDate: new Date("2026-11-24T09:00:00Z"),
    city: "Riyadh",
    installments: { provider: "Tabby", min: 100, max: 5000, count: 4, startDate: new Date("2026-11-19T09:00:00Z") },
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    items: [
      { id: "thobe", title: "ثوب قطني قصّة سعودية", variant: "أبيض · مقاس 56", price: 289, quantity: 2 },
      { id: "dallah", title: "دلّة قهوة عربية مع 6 فناجين", variant: "نحاسي", price: 199, quantity: 1 },
    ],
    shipping: { fee: 25, freeFrom: 1000 },
    deliveryDate: new Date("2026-11-24T09:00:00Z"),
    city: "الرياض",
    installments: { provider: "تابي", min: 100, max: 5000, count: 4, startDate: new Date("2026-11-19T09:00:00Z") },
  },
}

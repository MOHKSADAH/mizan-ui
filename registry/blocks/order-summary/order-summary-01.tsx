"use client"

import * as React from "react"
import { CaretDownIcon, ImageIcon, ShoppingCartIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { BlockBase, Currency, Lang, Media, Plural, Vat } from "@/registry/lib/block-types"
import { formatNumber, plural } from "@/registry/lib/format"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section } from "@/registry/ui/section"
import { VatSummary, computeVat, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

export type OrderSummary01Labels = {
  title: string
  show: string
  hide: string
  items: Plural
  list: string
  quantity: (quantity: string) => string
}

export const labelsEn: OrderSummary01Labels = {
  title: "Order summary",
  show: "Show order summary",
  hide: "Hide order summary",
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
  list: "Items in your order",
  quantity: (quantity) => `Quantity ${quantity}`,
}

export const labelsAr: OrderSummary01Labels = {
  title: "ملخص الطلب",
  show: "عرض ملخص الطلب",
  hide: "إخفاء ملخص الطلب",
  items: (n) =>
    plural(
      n,
      { one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" },
      { lang: "ar" }
    ),
  list: "منتجات الطلب",
  quantity: (quantity) => `الكمية ${quantity}`,
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

export type OrderSummary01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<OrderSummary01Labels>
  items: OrderLine[]
  currency?: Currency
  vat?: Vat
  discount?: number
  shipping?: number | "free"
}

function Thumb({ image, quantity }: { image?: Media; quantity: string }) {
  return (
    <div className="relative size-14 shrink-0">
      <div className="size-full overflow-hidden rounded-lg bg-muted">
        {image ? (
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="size-full object-cover" />
        ) : (
          <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
            <ImageIcon weight="duotone" className="size-5" />
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute -top-2 -end-2 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs leading-5 text-primary-foreground tabular-nums"
      >
        {quantity}
      </span>
    </div>
  )
}

// A checkout aside. From the lg breakpoint it stays in view while the form scrolls. Below it, the lines collapse behind a toggle that shows the total.
export function OrderSummary01({
  lang = "en",
  labels,
  items,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  discount,
  shipping,
  id,
  headingLevel = 2,
  className,
}: OrderSummary01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const [open, setOpen] = React.useState(false)
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const count = items.reduce((sum, line) => sum + line.quantity, 0)
  const base = subtotal - (discount ?? 0) + (typeof shipping === "number" ? shipping : 0)
  const total = computeVat(base, vat, currency).total

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="max-w-md">
        <aside aria-labelledby={`${sid}-title`} className="lg:sticky lg:top-6">
          <Card className="gap-0 py-0">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${sid}-panel`}
              onClick={() => setOpen((value) => !value)}
              className="flex w-full items-center justify-between gap-3 rounded-xl p-4 text-start text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
            >
              <span className="flex items-center gap-2">
                <ShoppingCartIcon aria-hidden="true" className="size-4" />
                {open ? t.hide : t.show}
                <span className="text-muted-foreground">{t.items(count)}</span>
                <CaretDownIcon aria-hidden="true" className={cn("size-4", open && "rotate-180")} />
              </span>
              <Price amount={total} currency={currency} lang={lang} />
            </button>
            <div id={`${sid}-panel`} className={cn("flex flex-col gap-4 p-4 max-lg:border-t", !open && "max-lg:hidden")}>
              <Heading id={`${sid}-title`} className="text-base font-semibold max-lg:sr-only">
                {t.title}
              </Heading>
              <ul aria-label={t.list} className="flex flex-col gap-4">
                {items.map((line) => (
                  <li key={line.id} className="flex items-center gap-3">
                    <Thumb image={line.image} quantity={formatNumber(line.quantity, { lang })} />
                    <div className="flex min-w-0 flex-1 flex-col text-sm">
                      <span className="font-medium text-balance">{line.title}</span>
                      {line.variant && (
                        <span className="text-xs text-muted-foreground">
                          <bdi>{line.variant}</bdi>
                        </span>
                      )}
                      <span className="sr-only">{t.quantity(formatNumber(line.quantity, { lang }))}</span>
                    </div>
                    <span className="shrink-0 text-sm font-medium">
                      <Price amount={line.price * line.quantity} currency={currency} lang={lang} />
                    </span>
                  </li>
                ))}
              </ul>
              <VatSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                vat={vat}
                currency={currency}
                lang={lang}
                labels={lang === "ar" ? vatSummaryLabelsAr : undefined}
                className="border-t border-border pt-4"
              />
            </div>
          </Card>
        </aside>
      </Container>
    </Section>
  )
}

export default OrderSummary01

export const demo: { en: OrderSummary01Props; ar: OrderSummary01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    items: [
      { id: "oud", title: "Royal Oud Perfume", variant: "50 ml", price: 349, quantity: 1 },
      { id: "thobe", title: "Cotton Thobe, Saudi Cut", variant: "White · Size 56", price: 289, quantity: 2 },
      { id: "dallah", title: "Arabic Coffee Dallah with 6 Cups", variant: "Brass", price: 199, quantity: 1 },
    ],
    discount: 112.6,
    shipping: 25,
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    items: [
      { id: "oud", title: "عطر عود ملكي", variant: "50 مل", price: 349, quantity: 1 },
      { id: "thobe", title: "ثوب قطني قصّة سعودية", variant: "أبيض · مقاس 56", price: 289, quantity: 2 },
      { id: "dallah", title: "دلّة قهوة عربية مع 6 فناجين", variant: "نحاسي", price: 199, quantity: 1 },
    ],
    discount: 112.6,
    shipping: 25,
  },
}

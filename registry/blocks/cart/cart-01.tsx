"use client"

import * as React from "react"
import { ImageIcon, ShoppingCartIcon, TrashIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Media, Plural, Vat } from "@/registry/lib/block-types"
import { minorUnits, plural } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { CouponInput, couponInputLabelsAr, type CouponStatus } from "@/registry/ui/coupon-input"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import { Price } from "@/registry/ui/price"
import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StockIndicator, stockIndicatorLabelsAr } from "@/registry/ui/stock-indicator"
import { VatSummary, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

export type Cart01Labels = {
  title: string
  items: Plural
  list: string
  each: (price: React.ReactNode) => React.ReactNode
  remove: string
  removeItem: (title: string) => string
  removed: (title: string) => string
  summary: string
  checkout: string
  continueShopping: string
  emptyTitle: string
  emptyDescription: string
}

export const labelsEn: Cart01Labels = {
  title: "Shopping cart",
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
  list: "Items in your cart",
  each: (price) => <>{price} each</>,
  remove: "Remove",
  removeItem: (title) => `Remove ${title}`,
  removed: (title) => `${title} removed from your cart`,
  summary: "Order summary",
  checkout: "Checkout",
  continueShopping: "Continue shopping",
  emptyTitle: "Your cart is empty",
  emptyDescription: "Add a product to see it here.",
}

export const labelsAr: Cart01Labels = {
  title: "سلة التسوق",
  items: (n) =>
    plural(
      n,
      { one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" },
      { lang: "ar" }
    ),
  list: "المنتجات في السلة",
  each: (price) => <>{price} للقطعة</>,
  remove: "حذف",
  removeItem: (title) => `حذف ${title}`,
  removed: (title) => `تم حذف ${title} من السلة`,
  summary: "ملخص الطلب",
  checkout: "إتمام الطلب",
  continueShopping: "متابعة التسوق",
  emptyTitle: "سلة التسوق فارغة",
  emptyDescription: "تصفّح المنتجات وأضف ما يعجبك.",
}

export type CartLine = {
  id: string
  title: string
  variant?: string
  // Unit price, VAT included.
  price: number
  quantity: number
  maxQuantity?: number
  // Set when the stock is low: shows "Only n left".
  lowStock?: number
  image?: Media
}

export type Cart01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<Cart01Labels>
  items: CartLine[]
  currency?: Currency
  vat?: Vat
  // freeFrom: the subtotal (after the discount) from which shipping is free.
  shipping?: { fee: number; freeFrom?: number }
  checkoutHref: string
  continueHref?: string
  onQuantityChange?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
  // Checks a coupon code on your server. Returns the discount as a fraction of the subtotal (0.1 for 10%), or null for an invalid code.
  onApplyCoupon?: (code: string) => Promise<number | null>
}

type Coupon = { status: CouponStatus; code?: string; rate?: number }

function Thumb({ image }: { image?: Media }) {
  return (
    <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24">
      {image ? (
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
          <ImageIcon weight="duotone" className="size-8" />
        </div>
      )}
    </div>
  )
}

export function Cart01({
  lang = "en",
  labels,
  items,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  shipping,
  checkoutHref,
  continueHref,
  onQuantityChange,
  onRemove,
  onApplyCoupon,
  headingLevel = 2,
  id,
  className,
}: Cart01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Sub = `h${headingLevel + 1}` as "h3" | "h4"
  const uid = React.useId()
  const sid = id ?? uid
  const [lines, setLines] = React.useState(items)
  const [coupon, setCoupon] = React.useState<Coupon>({ status: "idle" })
  const [announcement, setAnnouncement] = React.useState("")
  const focusTarget = React.useRef<HTMLDivElement>(null)
  const removedRef = React.useRef(false)

  // The row that held focus is gone, so focus moves to the list (or the empty message).
  React.useEffect(() => {
    if (!removedRef.current) return
    removedRef.current = false
    focusTarget.current?.focus()
  }, [lines.length])

  const unit = 10 ** minorUnits(currency)
  const round = (n: number) => Math.round(n * unit) / unit
  const count = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = round(lines.reduce((sum, line) => sum + line.price * line.quantity, 0))
  const discount = coupon.rate ? round(subtotal * coupon.rate) : 0
  const freeShipping = shipping?.freeFrom !== undefined && subtotal - discount >= shipping.freeFrom
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} />

  async function applyCoupon(code: string) {
    setCoupon({ status: "pending" })
    const rate = await onApplyCoupon?.(code)
    setCoupon(rate ? { status: "success", code, rate } : { status: "error" })
  }

  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container dir={dir}>
        <SectionHeader
          id={sid}
          title={t.title}
          description={t.items(count)}
          headingLevel={headingLevel}
          className="mb-6 md:mb-8"
        />
        {lines.length === 0 ? (
          <div ref={focusTarget} tabIndex={-1} className="outline-none">
            <Card className="py-16">
              <Empty className="p-0">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <ShoppingCartIcon aria-hidden="true" weight="regular" />
                  </EmptyMedia>
                  <EmptyTitle role="heading" aria-level={headingLevel + 1} className="text-base">
                    {t.emptyTitle}
                  </EmptyTitle>
                  <EmptyDescription>{t.emptyDescription}</EmptyDescription>
                </EmptyHeader>
                {continueHref && (
                  <EmptyContent>
                    <Button nativeButton={false} render={<a href={continueHref} />}>
                      {t.continueShopping}
                    </Button>
                  </EmptyContent>
                )}
              </Empty>
            </Card>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div ref={focusTarget} tabIndex={-1} className="outline-none">
              <ul aria-label={t.list} className="flex flex-col divide-y divide-border">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4 py-4 first:pt-0">
                    <Thumb image={line.image} />
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="font-medium text-balance">{line.title}</p>
                          {line.variant && (
                            <p className="text-sm text-muted-foreground">
                              <bdi>{line.variant}</bdi>
                            </p>
                          )}
                          {line.lowStock !== undefined && (
                            <StockIndicator
                              status="low"
                              count={line.lowStock}
                              lang={lang}
                              labels={lang === "ar" ? stockIndicatorLabelsAr : undefined}
                              className="text-xs"
                            />
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-0.5 text-end">
                          <span className="font-medium">{price(line.price * line.quantity)}</span>
                          {line.quantity > 1 && <span className="text-xs text-muted-foreground">{t.each(price(line.price))}</span>}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <QuantityStepper
                          value={line.quantity}
                          min={1}
                          max={line.maxQuantity}
                          lang={lang}
                          labels={lang === "ar" ? quantityStepperLabelsAr : undefined}
                          onValueChange={(quantity) => {
                            setLines((current) => current.map((l) => (l.id === line.id ? { ...l, quantity } : l)))
                            onQuantityChange?.(line.id, quantity)
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={t.removeItem(line.title)}
                          onClick={() => {
                            removedRef.current = true
                            setLines((current) => current.filter((l) => l.id !== line.id))
                            setAnnouncement(t.removed(line.title))
                            onRemove?.(line.id)
                          }}
                        >
                          <TrashIcon aria-hidden="true" data-icon="inline-start" />
                          {t.remove}
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <aside aria-labelledby={`${sid}-summary`} className="lg:sticky lg:top-6">
              <Card className="gap-4 px-4">
                <Sub id={`${sid}-summary`} className="text-base font-semibold">
                  {t.summary}
                </Sub>
                {onApplyCoupon && (
                  <CouponInput
                    className="[&>p:empty]:hidden"
                    status={coupon.status}
                    appliedCode={coupon.status === "success" ? coupon.code : undefined}
                    labels={lang === "ar" ? couponInputLabelsAr : undefined}
                    onApply={applyCoupon}
                    onRemove={() => setCoupon({ status: "idle" })}
                  />
                )}
                <VatSummary
                  subtotal={subtotal}
                  discount={discount || undefined}
                  shipping={shipping ? (freeShipping ? "free" : shipping.fee) : undefined}
                  vat={vat}
                  currency={currency}
                  lang={lang}
                  labels={lang === "ar" ? vatSummaryLabelsAr : undefined}
                />
                <Button size="lg" className="w-full" nativeButton={false} render={<a href={checkoutHref} />}>
                  {t.checkout}
                </Button>
                {continueHref && (
                  <Button variant="link" className="w-full" nativeButton={false} render={<a href={continueHref} />}>
                    {t.continueShopping}
                  </Button>
                )}
              </Card>
            </aside>
          </div>
        )}
        <p role="status" className="sr-only">
          {announcement}
        </p>
      </Container>
    </Section>
  )
}

export default Cart01

const en: CartLine[] = [
  { id: "oud", title: "Royal Oud Perfume", variant: "50 ml", price: 349, quantity: 1 },
  { id: "thobe", title: "Cotton Thobe, Saudi Cut", variant: "White · Size 56", price: 289, quantity: 2, maxQuantity: 5, lowStock: 3 },
  { id: "dallah", title: "Arabic Coffee Dallah with 6 Cups", variant: "Brass", price: 199, quantity: 1 },
]

const ar: CartLine[] = [
  { id: "oud", title: "عطر عود ملكي", variant: "50 مل", price: 349, quantity: 1 },
  { id: "thobe", title: "ثوب قطني قصّة سعودية", variant: "أبيض · مقاس 56", price: 289, quantity: 2, maxQuantity: 5, lowStock: 3 },
  { id: "dallah", title: "دلّة قهوة عربية مع 6 فناجين", variant: "نحاسي", price: 199, quantity: 1 },
]

// Accepts the code MIZAN10 for 10% off.
const applyCoupon = async (code: string) => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return code.trim().toUpperCase() === "MIZAN10" ? 0.1 : null
}

export const demo: { en: Cart01Props; ar: Cart01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    items: en,
    shipping: { fee: 25, freeFrom: 500 },
    checkoutHref: "#checkout",
    continueHref: "#shop",
    onApplyCoupon: applyCoupon,
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    items: ar,
    shipping: { fee: 25, freeFrom: 500 },
    checkoutHref: "#checkout",
    continueHref: "#shop",
    onApplyCoupon: applyCoupon,
  },
}

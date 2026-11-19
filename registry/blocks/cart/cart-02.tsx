"use client"

import * as React from "react"
import { ImageIcon, ShoppingCartIcon, TrashIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Media, Plural, Vat } from "@/registry/lib/block-types"
import { minorUnits, plural } from "@/registry/lib/format"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import { Price } from "@/registry/ui/price"
import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"
import { Section } from "@/registry/ui/section"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet"
import { VatSummary, vatSummaryLabelsAr } from "@/registry/ui/vat-summary"

export type Cart02Labels = {
  cart: string
  openCart: Plural
  close: string
  title: string
  items: Plural
  list: string
  removeItem: (title: string) => string
  removed: (title: string) => string
  shippingNote: string
  checkout: string
  viewCart: string
  continueShopping: string
  emptyTitle: string
  emptyDescription: string
}

export const labelsEn: Cart02Labels = {
  cart: "Cart",
  openCart: (n) => `Open cart, ${plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" })}`,
  close: "Close cart",
  title: "Your cart",
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
  list: "Items in your cart",
  removeItem: (title) => `Remove ${title}`,
  removed: (title) => `${title} removed from your cart`,
  shippingNote: "Shipping is calculated at checkout.",
  checkout: "Checkout",
  viewCart: "View cart",
  continueShopping: "Continue shopping",
  emptyTitle: "Your cart is empty",
  emptyDescription: "Add a product to see it here.",
}

const itemsAr: Plural = (n) =>
  plural(n, { one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" }, { lang: "ar" })

export const labelsAr: Cart02Labels = {
  cart: "السلة",
  openCart: (n) => `فتح السلة، ${itemsAr(n)}`,
  close: "إغلاق السلة",
  title: "سلتك",
  items: itemsAr,
  list: "المنتجات في السلة",
  removeItem: (title) => `حذف ${title}`,
  removed: (title) => `تم حذف ${title} من السلة`,
  shippingNote: "تُحتسب رسوم الشحن عند إتمام الطلب.",
  checkout: "إتمام الطلب",
  viewCart: "عرض السلة",
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
  image?: Media
}

export type Cart02Props = BlockBase & {
  lang?: Lang
  labels?: Partial<Cart02Labels>
  items: CartLine[]
  currency?: Currency
  vat?: Vat
  // The cart subtotal from which shipping is free. Drives the progress bar.
  freeShippingFrom: number
  // Estimated arrival date.
  deliveryDate: Date
  checkoutHref: string
  cartHref?: string
  continueHref?: string
  defaultOpen?: boolean
  onQuantityChange?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
}

function Thumb({ image }: { image?: Media }) {
  return (
    <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
      {image ? (
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
          <ImageIcon weight="duotone" className="size-6" />
        </div>
      )}
    </div>
  )
}

export function Cart02({
  lang = "en",
  labels,
  items,
  currency = "SAR",
  vat = { rate: 0.15, included: true },
  freeShippingFrom,
  deliveryDate,
  checkoutHref,
  cartHref,
  continueHref,
  defaultOpen,
  onQuantityChange,
  onRemove,
  id,
  className,
}: Cart02Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const [lines, setLines] = React.useState(items)
  const [announcement, setAnnouncement] = React.useState("")
  const list = React.useRef<HTMLDivElement>(null)
  const removedRef = React.useRef(false)

  // The row that held focus is gone, so focus moves to the list.
  React.useEffect(() => {
    if (!removedRef.current) return
    removedRef.current = false
    list.current?.focus()
  }, [lines.length])

  const unit = 10 ** minorUnits(currency)
  const count = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = Math.round(lines.reduce((sum, line) => sum + line.price * line.quantity, 0) * unit) / unit
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} />

  return (
    <Section as="div" id={id} spacing="compact" className={className}>
      <Container dir={dir} className="flex min-h-[36rem] items-start justify-end">
        <Sheet defaultOpen={defaultOpen}>
          <SheetTrigger render={<Button variant="outline" aria-label={t.openCart(count)} />}>
            <ShoppingCartIcon aria-hidden="true" data-icon="inline-start" />
            {t.cart}
            <span aria-hidden="true" className="rounded-full bg-primary px-1.5 text-xs text-primary-foreground tabular-nums">
              {count}
            </span>
          </SheetTrigger>
          <SheetContent
            side={dir === "rtl" ? "left" : "right"}
            dir={dir}
            initialFocus={list}
            labels={{ close: t.close }}
            className="gap-0 data-[side=left]:w-full data-[side=right]:w-full"
          >
            <SheetHeader className="border-b pe-12">
              <SheetTitle>{t.title}</SheetTitle>
              <SheetDescription>{t.items(count)}</SheetDescription>
            </SheetHeader>
            {lines.length > 0 && (
              <div className="border-b p-4">
                <DeliveryEstimate
                  date={deliveryDate}
                  freeShipping={{ threshold: freeShippingFrom, subtotal }}
                  currency={currency}
                  lang={lang}
                  labels={lang === "ar" ? deliveryEstimateLabelsAr : undefined}
                />
              </div>
            )}
            <div ref={list} tabIndex={-1} className="flex-1 overflow-y-auto p-4 outline-none">
              {lines.length === 0 ? (
                <Empty className="p-0 py-10">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <ShoppingCartIcon aria-hidden="true" weight="regular" />
                    </EmptyMedia>
                    <EmptyTitle role="heading" aria-level={3} className="text-base">
                      {t.emptyTitle}
                    </EmptyTitle>
                    <EmptyDescription>{t.emptyDescription}</EmptyDescription>
                  </EmptyHeader>
                  {continueHref && (
                    <EmptyContent>
                      <SheetClose nativeButton={false} render={<a href={continueHref} className={buttonVariants()} />}>
                        {t.continueShopping}
                      </SheetClose>
                    </EmptyContent>
                  )}
                </Empty>
              ) : (
                <ul aria-label={t.list} className="flex flex-col divide-y divide-border">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <Thumb image={line.image} />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-balance">{line.title}</p>
                            {line.variant && (
                              <p className="text-xs text-muted-foreground">
                                <bdi>{line.variant}</bdi>
                              </p>
                            )}
                          </div>
                          <span className="shrink-0 text-sm font-medium">{price(line.price * line.quantity)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
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
                            size="icon"
                            aria-label={t.removeItem(line.title)}
                            onClick={() => {
                              removedRef.current = true
                              setLines((current) => current.filter((l) => l.id !== line.id))
                              setAnnouncement(t.removed(line.title))
                              onRemove?.(line.id)
                            }}
                          >
                            <TrashIcon aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {lines.length > 0 && (
              <SheetFooter className="gap-3 border-t bg-popover">
                <VatSummary
                  subtotal={subtotal}
                  vat={vat}
                  currency={currency}
                  lang={lang}
                  labels={lang === "ar" ? vatSummaryLabelsAr : undefined}
                />
                <p className="text-xs text-muted-foreground">{t.shippingNote}</p>
                <Button size="lg" nativeButton={false} render={<a href={checkoutHref} />}>
                  {t.checkout}
                </Button>
                {cartHref && (
                  <Button variant="outline" size="lg" nativeButton={false} render={<a href={cartHref} />}>
                    {t.viewCart}
                  </Button>
                )}
              </SheetFooter>
            )}
            <p role="status" className="sr-only">
              {announcement}
            </p>
          </SheetContent>
        </Sheet>
      </Container>
    </Section>
  )
}

export default Cart02

const en: CartLine[] = [
  { id: "oud", title: "Royal Oud Perfume", variant: "50 ml", price: 349, quantity: 1 },
  { id: "dallah", title: "Arabic Coffee Dallah with 6 Cups", variant: "Brass", price: 199, quantity: 1 },
  { id: "dates", title: "Premium Sukkari Dates", variant: "Box, 1 kg", price: 95, quantity: 2, maxQuantity: 6 },
]

const ar: CartLine[] = [
  { id: "oud", title: "عطر عود ملكي", variant: "50 مل", price: 349, quantity: 1 },
  { id: "dallah", title: "دلّة قهوة عربية مع 6 فناجين", variant: "نحاسي", price: 199, quantity: 1 },
  { id: "dates", title: "تمر سكري فاخر", variant: "علبة 1 كجم", price: 95, quantity: 2, maxQuantity: 6 },
]

const deliveryDate = new Date("2026-11-24T09:00:00Z")

export const demo: { en: Cart02Props; ar: Cart02Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    items: en,
    freeShippingFrom: 900,
    deliveryDate,
    checkoutHref: "#checkout",
    cartHref: "#cart",
    continueHref: "#shop",
    defaultOpen: true,
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    items: ar,
    freeShippingFrom: 900,
    deliveryDate,
    checkoutHref: "#checkout",
    cartHref: "#cart",
    continueHref: "#shop",
    defaultOpen: true,
  },
}

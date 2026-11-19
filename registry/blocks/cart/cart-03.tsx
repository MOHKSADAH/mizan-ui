"use client"

import * as React from "react"
import { ImageIcon, ShoppingCartIcon, TrashIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Media, Plural } from "@/registry/lib/block-types"
import { formatNumber, minorUnits, plural } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/registry/ui/popover"
import { Price } from "@/registry/ui/price"

export type Cart03Labels = {
  openCart: Plural
  title: string
  items: Plural
  list: string
  quantity: (quantity: string) => string
  removeItem: (title: string) => string
  removed: (title: string) => string
  more: Plural
  subtotal: string
  note: string
  viewCart: string
  checkout: string
  emptyTitle: string
  emptyDescription: string
}

export const labelsEn: Cart03Labels = {
  openCart: (n) => `Open cart, ${plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" })}`,
  title: "Your cart",
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
  list: "Items in your cart",
  quantity: (quantity) => `Qty ${quantity}`,
  removeItem: (title) => `Remove ${title}`,
  removed: (title) => `${title} removed from your cart`,
  more: (n) => plural(n, { one: "and {n} more item", other: "and {n} more items" }, { lang: "en" }),
  subtotal: "Subtotal",
  note: "VAT included. Shipping is calculated at checkout.",
  viewCart: "View cart",
  checkout: "Checkout",
  emptyTitle: "Your cart is empty",
  emptyDescription: "Add a product to see it here.",
}

const itemsAr: Plural = (n) =>
  plural(n, { one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" }, { lang: "ar" })

export const labelsAr: Cart03Labels = {
  openCart: (n) => `فتح السلة، ${itemsAr(n)}`,
  title: "سلتك",
  items: itemsAr,
  list: "المنتجات في السلة",
  quantity: (quantity) => `الكمية ${quantity}`,
  removeItem: (title) => `حذف ${title}`,
  removed: (title) => `تم حذف ${title} من السلة`,
  more: (n) =>
    plural(
      n,
      { one: "ومنتج آخر", two: "ومنتجان آخران", few: "و{n} منتجات أخرى", many: "و{n} منتجًا آخر", other: "و{n} منتج آخر" },
      { lang: "ar" }
    ),
  subtotal: "المجموع الفرعي",
  note: "الأسعار شاملة ضريبة القيمة المضافة. تُحتسب رسوم الشحن عند إتمام الطلب.",
  viewCart: "عرض السلة",
  checkout: "إتمام الطلب",
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
  image?: Media
}

export type Cart03Props = BlockBase & {
  lang?: Lang
  labels?: Partial<Cart03Labels>
  // Your brand name, shown at the inline start of the bar.
  brand: string
  items: CartLine[]
  currency?: Currency
  // How many lines show before "and n more".
  maxVisible?: number
  cartHref: string
  checkoutHref: string
  defaultOpen?: boolean
  onRemove?: (id: string) => void
}

function Thumb({ image }: { image?: Media }) {
  return (
    <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
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

export function Cart03({
  lang = "en",
  labels,
  brand,
  items,
  currency = "SAR",
  maxVisible = 3,
  cartHref,
  checkoutHref,
  defaultOpen,
  onRemove,
  id,
  className,
}: Cart03Props) {
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
  const shown = lines.slice(0, maxVisible)
  const hidden = lines.length - shown.length
  const price = (amount: number) => <Price amount={amount} currency={currency} lang={lang} />

  return (
    <Container id={id} dir={dir} className={className}>
      <div className="flex min-h-[32rem] items-start justify-between py-3">
        <span className="font-semibold">{brand}</span>
        <Popover defaultOpen={defaultOpen}>
          <PopoverTrigger render={<Button variant="ghost" size="icon-lg" className="relative" aria-label={t.openCart(count)} />}>
            <ShoppingCartIcon aria-hidden="true" className="size-5" />
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -end-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] leading-4 text-primary-foreground tabular-nums"
              >
                {formatNumber(count, { lang })}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent align="end" dir={dir} initialFocus={list} className="w-[min(22rem,calc(100vw-2rem))] gap-3 p-3">
            <PopoverHeader>
              <PopoverTitle>{t.title}</PopoverTitle>
              <PopoverDescription>{t.items(count)}</PopoverDescription>
            </PopoverHeader>
            <div ref={list} tabIndex={-1} className="outline-none">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center gap-1 py-6 text-center">
                  <ShoppingCartIcon aria-hidden="true" weight="regular" className="size-6 text-muted-foreground" />
                  <p className="font-medium">{t.emptyTitle}</p>
                  <p className="text-muted-foreground">{t.emptyDescription}</p>
                </div>
              ) : (
                <>
                  <ul aria-label={t.list} className="flex flex-col divide-y divide-border">
                    {shown.map((line) => (
                      <li key={line.id} className="flex gap-3 py-3 first:pt-0">
                        <Thumb image={line.image} />
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <p className="line-clamp-2 font-medium">{line.title}</p>
                          {line.variant && (
                            <p className="text-xs text-muted-foreground">
                              <bdi>{line.variant}</bdi>
                            </p>
                          )}
                          <p className="mt-auto flex items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
                            <span>{t.quantity(formatNumber(line.quantity, { lang }))}</span>
                            <span className="text-sm font-medium text-foreground">{price(line.price * line.quantity)}</span>
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
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
                      </li>
                    ))}
                  </ul>
                  {hidden > 0 && <p className="border-t border-border pt-3 text-muted-foreground">{t.more(hidden)}</p>}
                </>
              )}
            </div>
            {lines.length > 0 && (
              <>
                <div className="flex flex-col gap-1 border-t border-border pt-3">
                  <p className="flex items-baseline justify-between gap-3 font-semibold">
                    <span>{t.subtotal}</span>
                    {price(subtotal)}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.note}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="lg" nativeButton={false} render={<a href={cartHref} />}>
                    {t.viewCart}
                  </Button>
                  <Button size="lg" nativeButton={false} render={<a href={checkoutHref} />}>
                    {t.checkout}
                  </Button>
                </div>
              </>
            )}
            <p role="status" className="sr-only">
              {announcement}
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </Container>
  )
}

export default Cart03

const en: CartLine[] = [
  { id: "oud", title: "Royal Oud Perfume", variant: "50 ml", price: 349, quantity: 1 },
  { id: "thobe", title: "Cotton Thobe, Saudi Cut", variant: "White · Size 56", price: 289, quantity: 2 },
  { id: "dallah", title: "Arabic Coffee Dallah with 6 Cups", variant: "Brass", price: 199, quantity: 1 },
  { id: "dates", title: "Premium Sukkari Dates", variant: "Box, 1 kg", price: 95, quantity: 1 },
]

const ar: CartLine[] = [
  { id: "oud", title: "عطر عود ملكي", variant: "50 مل", price: 349, quantity: 1 },
  { id: "thobe", title: "ثوب قطني قصّة سعودية", variant: "أبيض · مقاس 56", price: 289, quantity: 2 },
  { id: "dallah", title: "دلّة قهوة عربية مع 6 فناجين", variant: "نحاسي", price: 199, quantity: 1 },
  { id: "dates", title: "تمر سكري فاخر", variant: "علبة 1 كجم", price: 95, quantity: 1 },
]

export const demo: { en: Cart03Props; ar: Cart03Props } = {
  en: { lang: "en", labels: labelsEn, brand: "Rafid", items: en, cartHref: "#cart", checkoutHref: "#checkout", defaultOpen: true },
  ar: { lang: "ar", labels: labelsAr, brand: "رافد", items: ar, cartHref: "#cart", checkoutHref: "#checkout", defaultOpen: true },
}

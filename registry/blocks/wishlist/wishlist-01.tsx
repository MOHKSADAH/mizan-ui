"use client"

import * as React from "react"
import { HeartIcon, ShoppingCartSimpleIcon, TrashIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Currency, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import {
  ProductCard,
  ProductCardBody,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
  ProductCardVendor,
} from "@/registry/ui/product-card"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StockIndicator, stockIndicatorLabelsAr, type StockIndicatorLabels } from "@/registry/ui/stock-indicator"

type WishlistItem = {
  id: string
  name: string
  vendor?: string
  href: string
  image: { src?: string; alt: string; width?: number; height?: number }
  price: number
  compareAt?: number
  stock: "in" | "low" | "out"
  // Units left, shown with the low stock status.
  stockCount?: number
}

type Wishlist01Labels = {
  saved: Plural
  moveToCart: string
  outOfStock: string
  remove: string
  moved: string
  removed: string
  originalPrice: string
  emptyTitle: string
  emptyDescription: string
  stock: Partial<StockIndicatorLabels>
}

type Wishlist01Props = BlockBase & {
  lang?: Lang
  title: string
  items: WishlistItem[]
  currency?: Currency
  shop?: Action
  onMoveToCart?: (id: string) => void
  onRemove?: (id: string) => void
  labels?: Partial<Wishlist01Labels>
}

const labelsEn: Wishlist01Labels = {
  saved: (n) => plural(n, { one: "{n} saved item", other: "{n} saved items" }, { lang: "en" }),
  moveToCart: "Move to cart",
  outOfStock: "Out of stock",
  remove: "Remove {name} from wishlist",
  moved: "{name} moved to cart",
  removed: "{name} removed from wishlist",
  originalPrice: "Original price:",
  emptyTitle: "Your wishlist is empty",
  emptyDescription: "Tap the heart on any product to keep it here for later.",
  stock: {},
}

const labelsAr: Wishlist01Labels = {
  saved: (n) =>
    plural(
      n,
      { zero: "لا توجد منتجات محفوظة", one: "منتج واحد محفوظ", two: "منتجان محفوظان", few: "{n} منتجات محفوظة", many: "{n} منتجًا محفوظًا", other: "{n} منتج محفوظ" },
      { lang: "ar" },
    ),
  moveToCart: "انقل إلى السلة",
  outOfStock: "نفدت الكمية",
  remove: "إزالة {name} من المفضلة",
  moved: "تم نقل {name} إلى السلة",
  removed: "تمت إزالة {name} من المفضلة",
  originalPrice: "السعر قبل الخصم:",
  emptyTitle: "مفضلتك فارغة",
  emptyDescription: "اضغط على القلب في أي منتج ليبقى هنا إلى وقت لاحق.",
  stock: { ...stockIndicatorLabelsAr, out: "نفدت الكمية" },
}

function Wishlist01({
  lang = "en",
  title,
  items,
  currency = "SAR",
  shop,
  onMoveToCart,
  onRemove,
  headingLevel = 2,
  labels,
  id,
  className,
}: Wishlist01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const [saved, setSaved] = React.useState(items)
  const [message, setMessage] = React.useState("")
  const body = React.useRef<HTMLDivElement>(null)

  // The button that was pressed unmounts with its row, so focus moves to the list.
  const leave = (item: WishlistItem, text: string, callback?: (id: string) => void) => {
    setSaved((list) => list.filter((i) => i.id !== item.id))
    setMessage(text.replace("{name}", item.name))
    body.current?.focus()
    callback?.(item.id)
  }

  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader id={sid} title={title} description={t.saved(saved.length)} headingLevel={headingLevel} />
        <p role="status" className="sr-only">
          {message}
        </p>
        <div ref={body} tabIndex={-1} className="outline-none">
          {saved.length ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {saved.map((item) => {
                const unavailable = item.stock === "out"
                return (
                  <li key={item.id}>
                    <Card size="sm" className="h-full">
                      <CardContent>
                        <ProductCard orientation="horizontal" unavailable={unavailable}>
                          <ProductCardMedia>
                            <ProductCardImage {...item.image} />
                          </ProductCardMedia>
                          <ProductCardBody>
                            {item.vendor ? <ProductCardVendor>{item.vendor}</ProductCardVendor> : null}
                            <ProductCardTitle as={ItemHeading} href={item.href}>
                              {item.name}
                            </ProductCardTitle>
                            <ProductCardPrice amount={item.price} compareAt={item.compareAt} currency={currency} lang={lang} compareAtLabel={t.originalPrice} />
                            <StockIndicator status={item.stock} count={item.stockCount} lang={lang} labels={t.stock} className="text-xs" />
                            <ProductCardFooter>
                              <Button
                                variant="default"
                                size="lg"
                                className="h-10 flex-1"
                                disabled={unavailable}
                                onClick={() => leave(item, t.moved, onMoveToCart)}
                              >
                                <ShoppingCartSimpleIcon aria-hidden="true" weight="regular" />
                                {unavailable ? t.outOfStock : t.moveToCart}
                              </Button>
                              <Button
                                variant="outline"
                                size="icon-lg"
                                className="size-10"
                                aria-label={t.remove.replace("{name}", item.name)}
                                onClick={() => leave(item, t.removed, onRemove)}
                              >
                                <TrashIcon aria-hidden="true" weight="regular" />
                              </Button>
                            </ProductCardFooter>
                          </ProductCardBody>
                        </ProductCard>
                      </CardContent>
                    </Card>
                  </li>
                )
              })}
            </ul>
          ) : (
            <Empty className="border py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HeartIcon aria-hidden="true" weight="regular" />
                </EmptyMedia>
                <EmptyTitle>{t.emptyTitle}</EmptyTitle>
                <EmptyDescription>{t.emptyDescription}</EmptyDescription>
              </EmptyHeader>
              {shop ? (
                <EmptyContent>
                  <a href={shop.href} className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}>
                    {shop.label}
                  </a>
                </EmptyContent>
              ) : null}
            </Empty>
          )}
        </div>
      </Container>
    </Section>
  )
}

const catalog = [
  { id: "tote", price: 389, compareAt: 459, stock: "in", en: ["Handmade leather tote", "Najd Workshop"], ar: ["شنطة جلد يدوية", "مشغل نجد"] },
  { id: "glasses", price: 245, stock: "low", stockCount: 3, en: ["Metal frame sunglasses", "Zill"], ar: ["نظارة شمسية بإطار معدني", "ظل"] },
  { id: "cushion", price: 89, compareAt: 119, stock: "out", en: ["Embroidered majlis cushion", "Sadu House"], ar: ["مخدة مجلس مطرزة", "بيت السدو"] },
  { id: "oud", price: 520, stock: "in", en: ["Cambodian oud oil, 12 g", "Dar Al Tayeb"], ar: ["دهن عود كمبودي 12 جم", "دار الطيب"] },
] as const

const build = (lang: Lang): Wishlist01Props => ({
  lang,
  title: lang === "ar" ? "المفضلة" : "Wishlist",
  items: catalog.map(({ id, en, ar, ...rest }) => {
    const [name, vendor] = lang === "ar" ? ar : en
    return { ...rest, id, name, vendor, href: `#${id}`, image: { alt: name } }
  }),
  shop: { label: lang === "ar" ? "تصفح المنتجات" : "Browse products", href: "#shop" },
  labels: lang === "ar" ? labelsAr : labelsEn,
})

const demo: { en: Wishlist01Props; ar: Wishlist01Props } = { en: build("en"), ar: build("ar") }

export { Wishlist01, labelsEn, labelsAr, demo }
export type { Wishlist01Props, Wishlist01Labels, WishlistItem }
export default Wishlist01

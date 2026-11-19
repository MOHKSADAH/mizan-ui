"use client"

import * as React from "react"
import { ShoppingCartIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { useIsMobile } from "@/registry/hooks/use-mobile"
import { Badge } from "@/registry/ui/badge"
import { Button, buttonVariants } from "@/registry/ui/button"
import { carouselLabelsAr } from "@/registry/ui/carousel"
import { Container } from "@/registry/ui/container"
import { Dialog, DialogContent, dialogLabelsAr, DialogTitle } from "@/registry/ui/dialog"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/ui/drawer"
import { Price } from "@/registry/ui/price"
import { ProductGallery, productGalleryLabelsAr, type GalleryImage } from "@/registry/ui/product-gallery"
import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StockIndicator, stockIndicatorLabelsAr, type StockStatus } from "@/registry/ui/stock-indicator"
import { SwatchSelect, swatchSelectLabelsAr, type SwatchOption } from "@/registry/ui/swatch-select"

type ProductOption = {
  id: string
  label: string
  items: SwatchOption[]
  // Defaults to the first option in stock.
  defaultValue?: string
}

type QuickViewProduct = {
  id: string
  title: string
  brand?: string
  images: GalleryImage[]
  price: number
  compareAtPrice?: number
  currency?: Currency
  rating?: { value: number; count: number }
  options?: ProductOption[]
  stock: { status: StockStatus; count?: number }
  // The full product page.
  href: string
}

type QuickViewSelection = { options: Record<string, string>; quantity: number }

type QuickView01Labels = {
  title: string
  quickView: string
  quickViewOf: (name: string) => string
  was: string
  save: (percent: string) => string
  quantity: string
  addToCart: string
  soldOut: string
  viewDetails: string
}

type QuickView01Props = BlockBase & {
  lang?: Lang
  products: QuickViewProduct[]
  onAddToCart?: (product: QuickViewProduct, selection: QuickViewSelection) => void
  labels?: Partial<QuickView01Labels>
}

const labelsEn: QuickView01Labels = {
  title: "Best sellers",
  quickView: "Quick view",
  quickViewOf: (name) => `Quick view: ${name}`,
  was: "Was",
  save: (percent) => `Save ${percent}`,
  quantity: "Quantity",
  addToCart: "Add to cart",
  soldOut: "Sold out",
  viewDetails: "View full details",
}

const labelsAr: QuickView01Labels = {
  title: "الأكثر مبيعًا",
  quickView: "نظرة سريعة",
  quickViewOf: (name) => `نظرة سريعة: ${name}`,
  was: "السعر قبل الخصم",
  save: (percent) => `وفّر ${percent}`,
  quantity: "الكمية",
  addToCart: "أضف إلى السلة",
  soldOut: "نفدت الكمية",
  viewDetails: "عرض التفاصيل كاملة",
}

type TitleComponent = React.ComponentType<{ className?: string; children?: React.ReactNode }>

// The content of the dialog and of the drawer. Use it to put a quick view in your own container.
function QuickViewContent({
  product,
  lang = "en",
  Title,
  labels,
  onAddToCart,
}: {
  product: QuickViewProduct
  lang?: Lang
  Title: TitleComponent
  labels?: Partial<QuickView01Labels>
  onAddToCart?: (selection: QuickViewSelection) => void
}) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const { options = [], stock, currency = "SAR", compareAtPrice, price } = product
  const [chosen, setChosen] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((o) => [o.id, o.defaultValue ?? o.items.find((i) => !i.outOfStock)?.value ?? ""]))
  )
  const [quantity, setQuantity] = React.useState(1)
  const out = stock.status === "out"
  const saving = compareAtPrice && compareAtPrice > price ? 1 - price / compareAtPrice : 0

  return (
    <div className="grid min-w-0 gap-5 md:grid-cols-2 md:gap-6">
      <ProductGallery
        images={product.images}
        lang={lang}
        labels={ar ? productGalleryLabelsAr : undefined}
        carouselLabels={ar ? carouselLabelsAr : undefined}
      />
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          {product.brand ? <p className="text-sm text-muted-foreground">{product.brand}</p> : null}
          <Title className="text-xl font-semibold text-balance">{product.title}</Title>
          {product.rating ? (
            <Rating
              value={product.rating.value}
              count={product.rating.count}
              showValue
              lang={lang}
              labels={ar ? ratingLabelsAr : undefined}
            />
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Price amount={price} currency={currency} lang={lang} className="text-2xl font-semibold" />
          {saving > 0 ? (
            <>
              <span className="text-base text-muted-foreground">
                <span className="sr-only">{t.was}</span>
                <Price amount={compareAtPrice!} currency={currency} lang={lang} className="line-through" />
              </span>
              <Badge variant="destructive">{t.save(formatPercent(saving, { lang }, { max: 0 }))}</Badge>
            </>
          ) : null}
        </div>
        {options.map((option) => (
          <SwatchSelect
            key={option.id}
            label={option.label}
            options={option.items}
            value={chosen[option.id]}
            onValueChange={(value) => setChosen((prev) => ({ ...prev, [option.id]: value }))}
            labels={ar ? swatchSelectLabelsAr : undefined}
          />
        ))}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-sm font-medium">{t.quantity}</span>
          <QuantityStepper
            value={quantity}
            max={stock.status === "low" ? stock.count : undefined}
            onValueChange={setQuantity}
            disabled={out}
            lang={lang}
            labels={ar ? quantityStepperLabelsAr : undefined}
          />
          <StockIndicator
            status={stock.status}
            count={stock.count}
            lang={lang}
            labels={ar ? stockIndicatorLabelsAr : undefined}
          />
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Button size="lg" className="h-10 w-full text-sm" disabled={out} onClick={() => onAddToCart?.({ options: chosen, quantity })}>
            <ShoppingCartIcon aria-hidden="true" data-icon="inline-start" />
            {out ? t.soldOut : t.addToCart}
          </Button>
          <a href={product.href} className={cn(buttonVariants({ variant: "link" }), "h-9 text-sm")}>
            {t.viewDetails}
          </a>
        </div>
      </div>
    </div>
  )
}

// A Dialog on desktop and a bottom Drawer on a phone.
function QuickViewDialog({
  product,
  open,
  onOpenChange,
  lang = "en",
  labels,
  onAddToCart,
}: {
  product: QuickViewProduct
  open: boolean
  onOpenChange: (open: boolean) => void
  lang?: Lang
  labels?: Partial<QuickView01Labels>
  onAddToCart?: (product: QuickViewProduct, selection: QuickViewSelection) => void
}) {
  const mobile = useIsMobile()
  const add = (selection: QuickViewSelection) => {
    onAddToCart?.(product, selection)
    onOpenChange(false)
  }

  if (mobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-6">
            <QuickViewContent
              key={product.id}
              product={product}
              lang={lang}
              Title={DrawerTitle as TitleComponent}
              labels={labels}
              onAddToCart={add}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent labels={lang === "ar" ? dialogLabelsAr : undefined} className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:max-w-3xl">
        <QuickViewContent
          key={product.id}
          product={product}
          lang={lang}
          Title={DialogTitle as TitleComponent}
          labels={labels}
          onAddToCart={add}
        />
      </DialogContent>
    </Dialog>
  )
}

function QuickView01({ lang = "en", products, onAddToCart, headingLevel = 2, labels, id, className }: QuickView01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const CardHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const [openId, setOpenId] = React.useState<string>()
  const product = products.find((p) => p.id === openId)

  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} title={t.title} headingLevel={headingLevel} className="mb-8 md:mb-10" />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
          {products.map((item) => (
            <li key={item.id} className="flex min-w-0 flex-col gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.images[0].src}
                alt={item.images[0].alt}
                loading="lazy"
                className="aspect-square w-full rounded-xl border border-border object-cover"
              />
              <div className="flex flex-col gap-1">
                <CardHeading className="font-medium text-balance">{item.title}</CardHeading>
                <Price amount={item.price} currency={item.currency} lang={lang} className="font-semibold" />
              </div>
              <Button
                variant="outline"
                size="lg"
                className="h-9 w-full text-sm"
                aria-haspopup="dialog"
                aria-label={t.quickViewOf(item.title)}
                onClick={() => setOpenId(item.id)}
              >
                {t.quickView}
              </Button>
            </li>
          ))}
        </ul>
        {product ? (
          <QuickViewDialog
            product={product}
            open
            onOpenChange={(open) => !open && setOpenId(undefined)}
            lang={lang}
            labels={labels}
            onAddToCart={onAddToCart}
          />
        ) : null}
      </Container>
    </Section>
  )
}

// A neutral stand-in for a product photo, so the demo needs no image files.
const shapes = {
  thobe:
    '<path d="M340 100Q400 150 460 100L570 140L630 540L560 550L520 290V760H280V290L240 550L170 540L230 140Z" fill="oklch(T1 0.03 85)"/><rect x="394" y="135" width="12" height="340" rx="6" fill="oklch(T2 0.03 85)"/>',
  perfume:
    '<rect x="290" y="330" width="220" height="360" rx="28" fill="oklch(T1 0.04 70)"/><rect x="360" y="250" width="80" height="90" fill="oklch(T3 0.04 70)"/><rect x="340" y="160" width="120" height="100" rx="14" fill="oklch(T4 0.03 70)"/><rect x="320" y="440" width="160" height="120" rx="8" fill="oklch(T0 0.02 70)"/>',
  coffee:
    '<path d="M260 200H540L580 700H220Z" fill="oklch(T1 0.05 60)"/><rect x="260" y="170" width="280" height="44" rx="8" fill="oklch(T2 0.05 60)"/><circle cx="400" cy="470" r="100" fill="oklch(T0 0.03 60)"/>',
}

const photo = (shape: keyof typeof shapes, tone: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" fill="oklch(${tone} 0.02 80)"/>${shapes[shape]
      .replace("T0", String(tone))
      .replace("T1", (tone - 0.1).toFixed(2))
      .replace("T2", (tone - 0.2).toFixed(2))
      .replace("T3", (tone - 0.16).toFixed(2))
      .replace("T4", (tone - 0.3).toFixed(2))}</svg>`
  )}`

const colors = (names: [string, string, string][]): SwatchOption[] =>
  names.map(([value, label, color]) => ({ value, label, color }))

const sizes = ["52", "54", "56", "58"].map((s) => ({ value: s, label: s }))

const demo: { en: QuickView01Props; ar: QuickView01Props } = {
  en: {
    lang: "en",
    products: [
      {
        id: "thobe",
        title: "Men's Egyptian cotton thobe",
        brand: "Dar Al Aseel",
        images: [
          { src: photo("thobe", 0.93), alt: "Front of the thobe" },
          { src: photo("thobe", 0.88), alt: "Back of the thobe" },
        ],
        price: 289,
        compareAtPrice: 349,
        rating: { value: 4.7, count: 248 },
        options: [
          {
            id: "color",
            label: "Color",
            items: colors([
              ["white", "White", "oklch(0.98 0 0)"],
              ["cream", "Cream", "oklch(0.9 0.04 85)"],
              ["navy", "Navy", "oklch(0.32 0.06 260)"],
            ]),
          },
          { id: "size", label: "Size", items: sizes, defaultValue: "56" },
        ],
        stock: { status: "low", count: 6 },
        href: "#thobe",
      },
      {
        id: "perfume",
        title: "Oud Al Majlis eau de parfum",
        brand: "Bait Al Oud",
        images: [
          { src: photo("perfume", 0.92), alt: "The bottle, front" },
          { src: photo("perfume", 0.87), alt: "The bottle in its gift box" },
        ],
        price: 459,
        rating: { value: 4.8, count: 612 },
        options: [
          {
            id: "size",
            label: "Size",
            items: [
              { value: "50", label: "50 ml" },
              { value: "100", label: "100 ml" },
            ],
            defaultValue: "100",
          },
        ],
        stock: { status: "in" },
        href: "#perfume",
      },
      {
        id: "coffee",
        title: "Saudi coffee with cardamom and saffron, 250 g",
        images: [
          { src: photo("coffee", 0.92), alt: "The coffee bag, front" },
          { src: photo("coffee", 0.88), alt: "The bag label" },
        ],
        price: 45,
        compareAtPrice: 55,
        rating: { value: 4.9, count: 1284 },
        stock: { status: "in" },
        href: "#coffee",
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    products: [
      {
        id: "thobe",
        title: "ثوب رجالي قطن مصري",
        brand: "دار الأصيل",
        images: [
          { src: photo("thobe", 0.93), alt: "الثوب من الأمام" },
          { src: photo("thobe", 0.88), alt: "الثوب من الخلف" },
        ],
        price: 289,
        compareAtPrice: 349,
        rating: { value: 4.7, count: 248 },
        options: [
          {
            id: "color",
            label: "اللون",
            items: colors([
              ["white", "أبيض", "oklch(0.98 0 0)"],
              ["cream", "كريمي", "oklch(0.9 0.04 85)"],
              ["navy", "كحلي", "oklch(0.32 0.06 260)"],
            ]),
          },
          { id: "size", label: "المقاس", items: sizes, defaultValue: "56" },
        ],
        stock: { status: "low", count: 6 },
        href: "#thobe",
      },
      {
        id: "perfume",
        title: "عطر عود المجلس",
        brand: "بيت العود",
        images: [
          { src: photo("perfume", 0.92), alt: "الزجاجة من الأمام" },
          { src: photo("perfume", 0.87), alt: "الزجاجة في علبة الهدية" },
        ],
        price: 459,
        rating: { value: 4.8, count: 612 },
        options: [
          {
            id: "size",
            label: "الحجم",
            items: [
              { value: "50", label: "50 مل" },
              { value: "100", label: "100 مل" },
            ],
            defaultValue: "100",
          },
        ],
        stock: { status: "in" },
        href: "#perfume",
      },
      {
        id: "coffee",
        title: "قهوة سعودية بالهيل والزعفران، 250 جم",
        images: [
          { src: photo("coffee", 0.92), alt: "كيس القهوة من الأمام" },
          { src: photo("coffee", 0.88), alt: "ملصق الكيس" },
        ],
        price: 45,
        compareAtPrice: 55,
        rating: { value: 4.9, count: 1284 },
        stock: { status: "in" },
        href: "#coffee",
      },
    ],
    labels: labelsAr,
  },
}

export { QuickView01, QuickViewContent, QuickViewDialog, labelsEn, labelsAr, demo }
export type { QuickView01Props, QuickView01Labels, QuickViewProduct, QuickViewSelection, ProductOption }
export default QuickView01

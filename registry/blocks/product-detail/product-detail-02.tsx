"use client"

import * as React from "react"
import { ShoppingCartIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Vat } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"
import { Installments, installmentsLabelsAr } from "@/registry/ui/installments"
import { Price } from "@/registry/ui/price"
import type { GalleryImage } from "@/registry/ui/product-gallery"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"
import { Section } from "@/registry/ui/section"
import { StockIndicator, stockIndicatorLabelsAr, type StockStatus } from "@/registry/ui/stock-indicator"
import { SwatchSelect, swatchSelectLabelsAr, type SwatchOption } from "@/registry/ui/swatch-select"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/registry/ui/table"
import { WishlistButton, wishlistButtonLabelsAr } from "@/registry/ui/wishlist-button"

type ProductOption = {
  id: string
  label: string
  items: SwatchOption[]
  // Defaults to the first option in stock.
  defaultValue?: string
}

type ProductSelection = { options: Record<string, string> }

type ProductDetail02Labels = {
  was: string
  save: (percent: string) => string
  vat: (rate: string, included: boolean) => string
  addToCart: string
  soldOut: string
  specs: string
}

type ProductDetail02Props = BlockBase & {
  lang?: Lang
  // A short pill above the title, such as the collection.
  eyebrow?: string
  title: string
  summary?: string
  images: GalleryImage[]
  price: number
  compareAtPrice?: number
  currency?: Currency
  vat?: Vat
  rating?: { value: number; count: number; href: string }
  options?: ProductOption[]
  stock: { status: StockStatus; count?: number }
  installments?: { count?: number; min?: number; max?: number }
  // ISO date.
  delivery?: { date: string; city?: string }
  wishlisted?: boolean
  specs: { label: string; value: string }[]
  onAddToCart?: (selection: ProductSelection) => void
  onWishlistChange?: (wishlisted: boolean) => void
  labels?: Partial<ProductDetail02Labels>
}

const labelsEn: ProductDetail02Labels = {
  was: "Was",
  save: (percent) => `Save ${percent}`,
  vat: (rate, included) => (included ? `Price includes ${rate} VAT` : `Price excludes ${rate} VAT`),
  addToCart: "Add to cart",
  soldOut: "Sold out",
  specs: "Specifications",
}

const labelsAr: ProductDetail02Labels = {
  was: "السعر قبل الخصم",
  save: (percent) => `وفّر ${percent}`,
  vat: (rate, included) => (included ? `السعر شامل ضريبة القيمة المضافة ${rate}` : `السعر غير شامل ضريبة القيمة المضافة ${rate}`),
  addToCart: "أضف إلى السلة",
  soldOut: "نفدت الكمية",
  specs: "المواصفات",
}

function ProductDetail02({
  lang = "en",
  eyebrow,
  title,
  summary,
  images,
  price,
  compareAtPrice,
  currency = "SAR",
  vat,
  rating,
  options = [],
  stock,
  installments,
  delivery,
  wishlisted,
  specs,
  onAddToCart,
  onWishlistChange,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductDetail02Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const SubHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const [chosen, setChosen] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((o) => [o.id, o.defaultValue ?? o.items.find((i) => !i.outOfStock)?.value ?? ""]))
  )
  const out = stock.status === "out"
  const saving = compareAtPrice && compareAtPrice > price ? 1 - price / compareAtPrice : 0

  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container size="wide" className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="grid min-w-0 grid-cols-2 gap-3 lg:col-span-8 lg:gap-4">
          {images.map((image, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "w-full rounded-xl border border-border object-cover",
                i === 0 || (i === images.length - 1 && images.length % 2 === 0)
                  ? "col-span-2 aspect-[4/3]"
                  : "aspect-square"
              )}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-8 lg:col-span-4">
          <div className="flex flex-col items-start gap-3">
            {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
            <Heading id={`${sid}-heading`} className="text-3xl font-semibold text-balance md:text-4xl">
              {title}
            </Heading>
            {rating ? (
              <a
                href={rating.href}
                className="inline-flex w-fit rounded-md outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Rating
                  value={rating.value}
                  count={rating.count}
                  showValue
                  lang={lang}
                  labels={ar ? ratingLabelsAr : undefined}
                />
              </a>
            ) : null}
            {summary ? <p className="text-muted-foreground">{summary}</p> : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Price amount={price} currency={currency} lang={lang} className="text-3xl font-semibold" />
              {saving > 0 ? (
                <>
                  <span className="text-lg text-muted-foreground">
                    <span className="sr-only">{t.was}</span>
                    <Price amount={compareAtPrice!} currency={currency} lang={lang} className="line-through" />
                  </span>
                  <Badge variant="destructive">{t.save(formatPercent(saving, { lang }, { max: 0 }))}</Badge>
                </>
              ) : null}
            </div>
            {vat ? <p className="text-xs text-muted-foreground">{t.vat(formatPercent(vat.rate, { lang }), vat.included)}</p> : null}
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

          <StockIndicator
            status={stock.status}
            count={stock.count}
            lang={lang}
            labels={ar ? stockIndicatorLabelsAr : undefined}
          />

          <div className="flex gap-3">
            <Button size="lg" className="h-11 flex-1 text-sm" disabled={out} onClick={() => onAddToCart?.({ options: chosen })}>
              <ShoppingCartIcon aria-hidden="true" data-icon="inline-start" />
              {out ? t.soldOut : t.addToCart}
            </Button>
            <WishlistButton
              className="size-11"
              pressed={wishlisted}
              onPressedChange={onWishlistChange}
              labels={ar ? wishlistButtonLabelsAr : undefined}
            />
          </div>

          {installments ? (
            <Installments
              total={price}
              currency={currency}
              showSchedule={false}
              lang={lang}
              labels={ar ? installmentsLabelsAr : undefined}
              {...installments}
            />
          ) : null}

          {delivery ? (
            <DeliveryEstimate
              className="border-t pt-6"
              date={new Date(delivery.date)}
              city={delivery.city ? <span className="font-medium text-foreground">{delivery.city}</span> : undefined}
              lang={lang}
              labels={ar ? deliveryEstimateLabelsAr : undefined}
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <SubHeading className="text-xl font-semibold">{t.specs}</SubHeading>
          <Table>
            <TableBody>
              {specs.map((spec) => (
                <TableRow key={spec.label}>
                  <TableHead scope="row" className="w-1/3 py-3 text-start font-medium text-foreground">
                    {spec.label}
                  </TableHead>
                  <TableCell className="py-3 whitespace-normal text-muted-foreground">{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </Section>
  )
}

// A neutral stand-in for a product photo, so the demo needs no image files.
const photo = (tone: number, zoom = false) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${zoom ? "250 150 300 300" : "0 0 800 800"}"><rect width="800" height="800" fill="oklch(${tone} 0.02 70)"/><rect x="290" y="330" width="220" height="360" rx="28" fill="oklch(${(tone - 0.1).toFixed(2)} 0.04 70)"/><rect x="360" y="250" width="80" height="90" fill="oklch(${(tone - 0.16).toFixed(2)} 0.04 70)"/><rect x="340" y="160" width="120" height="100" rx="14" fill="oklch(${(tone - 0.3).toFixed(2)} 0.03 70)"/><rect x="320" y="440" width="160" height="120" rx="8" fill="oklch(${(tone - 0.02).toFixed(2)} 0.02 70)"/></svg>`
  )}`

const sizes = [
  { value: "50", label: "50 ml" },
  { value: "100", label: "100 ml" },
]

const demo: { en: ProductDetail02Props; ar: ProductDetail02Props } = {
  en: {
    lang: "en",
    eyebrow: "Oud collection",
    title: "Oud Al Majlis eau de parfum",
    summary: "Cambodian oud with amber and a touch of saffron. It stays on your clothes until the next morning.",
    images: [
      { src: photo(0.92), alt: "The bottle, front" },
      { src: photo(0.88, true), alt: "The cap and neck" },
      { src: photo(0.85, true), alt: "The label" },
      { src: photo(0.9), alt: "The bottle in its gift box" },
    ],
    price: 459,
    vat: { rate: 0.15, included: true },
    rating: { value: 4.8, count: 612, href: "#reviews" },
    options: [{ id: "size", label: "Size", items: sizes, defaultValue: "100" }],
    stock: { status: "in" },
    installments: { count: 4, min: 50, max: 5000 },
    delivery: { date: "2026-11-23", city: "Jeddah" },
    specs: [
      { label: "Type", value: "Eau de parfum, 18% oil" },
      { label: "Top notes", value: "Saffron, cardamom" },
      { label: "Heart notes", value: "Cambodian oud, rose" },
      { label: "Base notes", value: "Amber, musk, sandalwood" },
      { label: "Lasts", value: "8 to 10 hours" },
      { label: "Made in", value: "Riyadh, Saudi Arabia" },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "مجموعة العود",
    title: "عطر عود المجلس",
    summary: "عود كمبودي مع العنبر ولمسة زعفران. يبقى على ملابسك إلى صباح اليوم التالي.",
    images: [
      { src: photo(0.92), alt: "الزجاجة من الأمام" },
      { src: photo(0.88, true), alt: "الغطاء والعنق" },
      { src: photo(0.85, true), alt: "ملصق الزجاجة" },
      { src: photo(0.9), alt: "الزجاجة في علبة الهدية" },
    ],
    price: 459,
    vat: { rate: 0.15, included: true },
    rating: { value: 4.8, count: 612, href: "#reviews" },
    options: [{ id: "size", label: "الحجم", items: sizes.map((s) => ({ ...s, label: `${s.value} مل` })), defaultValue: "100" }],
    stock: { status: "in" },
    installments: { count: 4, min: 50, max: 5000 },
    delivery: { date: "2026-11-23", city: "جدة" },
    specs: [
      { label: "النوع", value: "ماء عطر، تركيز الزيت 18%" },
      { label: "النفحات العليا", value: "زعفران، هيل" },
      { label: "نفحات القلب", value: "عود كمبودي، ورد" },
      { label: "نفحات القاعدة", value: "عنبر، مسك، صندل" },
      { label: "مدة الثبات", value: "من 8 إلى 10 ساعات" },
      { label: "بلد الصنع", value: "الرياض، المملكة العربية السعودية" },
    ],
    labels: labelsAr,
  },
}

export { ProductDetail02, labelsEn, labelsAr, demo }
export type { ProductDetail02Props, ProductDetail02Labels, ProductOption, ProductSelection }
export default ProductDetail02

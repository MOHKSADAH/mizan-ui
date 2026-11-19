"use client"

import * as React from "react"
import { ShoppingCartIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Vat } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { carouselLabelsAr } from "@/registry/ui/carousel"
import { Container } from "@/registry/ui/container"
import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"
import { dialogLabelsAr } from "@/registry/ui/dialog"
import { Price } from "@/registry/ui/price"
import { ProductGallery, productGalleryLabelsAr, type GalleryImage } from "@/registry/ui/product-gallery"
import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"
import { Section } from "@/registry/ui/section"
import { StickyActionBar, stickyActionBarLabelsAr } from "@/registry/ui/sticky-action-bar"
import { StockIndicator, stockIndicatorLabelsAr, type StockStatus } from "@/registry/ui/stock-indicator"
import { SwatchSelect, swatchSelectLabelsAr, type SwatchOption } from "@/registry/ui/swatch-select"

type ProductOption = {
  id: string
  label: string
  items: SwatchOption[]
  // Defaults to the first option in stock.
  defaultValue?: string
}

type ProductSelection = { options: Record<string, string>; quantity: number }

type ProductDetail03Labels = {
  save: (percent: string) => string
  vat: (rate: string, included: boolean) => string
  quantity: string
  addToCart: string
  soldOut: string
}

type ProductDetail03Props = BlockBase & {
  lang?: Lang
  title: string
  images: GalleryImage[]
  price: number
  compareAtPrice?: number
  currency?: Currency
  vat?: Vat
  rating?: { value: number; count: number; href: string }
  options?: ProductOption[]
  stock: { status: StockStatus; count?: number }
  // ISO date.
  delivery?: { date: string; city?: string }
  details: { id: string; title: string; content: React.ReactNode }[]
  onAddToCart?: (selection: ProductSelection) => void
  labels?: Partial<ProductDetail03Labels>
}

const labelsEn: ProductDetail03Labels = {
  save: (percent) => `Save ${percent}`,
  vat: (rate, included) => (included ? `Includes ${rate} VAT` : `Excludes ${rate} VAT`),
  quantity: "Quantity",
  addToCart: "Add to cart",
  soldOut: "Sold out",
}

const labelsAr: ProductDetail03Labels = {
  save: (percent) => `وفّر ${percent}`,
  vat: (rate, included) => (included ? `شامل الضريبة ${rate}` : `غير شامل الضريبة ${rate}`),
  quantity: "الكمية",
  addToCart: "أضف إلى السلة",
  soldOut: "نفدت الكمية",
}

// On a phone the add to cart button lives in a sticky bar. From md up the bar hides and the inline button shows.
function ProductDetail03({
  lang = "en",
  title,
  images,
  price,
  compareAtPrice,
  currency = "SAR",
  vat,
  rating,
  options = [],
  stock,
  delivery,
  details,
  onAddToCart,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductDetail03Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [chosen, setChosen] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((o) => [o.id, o.defaultValue ?? o.items.find((i) => !i.outOfStock)?.value ?? ""]))
  )
  const [quantity, setQuantity] = React.useState(1)
  const out = stock.status === "out"
  const saving = compareAtPrice && compareAtPrice > price ? 1 - price / compareAtPrice : 0
  const add = () => onAddToCart?.({ options: chosen, quantity })
  const addLabel = out ? t.soldOut : t.addToCart

  return (
    <Section id={sid} spacing="compact" className={cn(className, "max-md:pb-[calc(var(--sticky-bar-height,0px)+--spacing(6))]")}>
      <Container size="narrow" className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
        <ProductGallery
          zoom
          images={images}
          lang={lang}
          labels={ar ? productGalleryLabelsAr : undefined}
          carouselLabels={ar ? carouselLabelsAr : undefined}
          dialogLabels={ar ? dialogLabelsAr : undefined}
        />
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Heading id={`${sid}-heading`} className="text-xl font-semibold text-balance md:text-2xl">
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
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Price amount={price} currency={currency} lang={lang} className="text-2xl font-semibold" />
            {saving > 0 ? (
              <>
                <Price
                  amount={compareAtPrice!}
                  currency={currency}
                  lang={lang}
                  className="text-base text-muted-foreground line-through"
                />
                <Badge variant="destructive">{t.save(formatPercent(saving, { lang }, { max: 0 }))}</Badge>
              </>
            ) : null}
            {vat ? <span className="w-full text-xs text-muted-foreground">{t.vat(formatPercent(vat.rate, { lang }), vat.included)}</span> : null}
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

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{t.quantity}</span>
              <QuantityStepper
                value={quantity}
                max={stock.status === "low" ? stock.count : undefined}
                onValueChange={setQuantity}
                disabled={out}
                lang={lang}
                labels={ar ? quantityStepperLabelsAr : undefined}
              />
            </div>
            <StockIndicator
              status={stock.status}
              count={stock.count}
              lang={lang}
              labels={ar ? stockIndicatorLabelsAr : undefined}
            />
          </div>

          <Button size="lg" className="h-10 w-full text-sm max-md:hidden" disabled={out} onClick={add}>
            <ShoppingCartIcon aria-hidden="true" data-icon="inline-start" />
            {addLabel}
          </Button>

          {delivery ? (
            <DeliveryEstimate
              date={new Date(delivery.date)}
              city={delivery.city ? <span className="font-medium text-foreground">{delivery.city}</span> : undefined}
              lang={lang}
              labels={ar ? deliveryEstimateLabelsAr : undefined}
            />
          ) : null}

          <Accordion className="border-t">
            {details.map((detail) => (
              <AccordionItem key={detail.id} value={detail.id}>
                <AccordionTrigger className="py-3">{detail.title}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{detail.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
      <StickyActionBar
        price={<Price amount={price * quantity} currency={currency} lang={lang} className="text-lg font-semibold" />}
        action={
          <Button size="lg" className="h-10 px-5 text-sm" disabled={out} onClick={add}>
            <ShoppingCartIcon aria-hidden="true" data-icon="inline-start" />
            {addLabel}
          </Button>
        }
        labels={ar ? stickyActionBarLabelsAr : undefined}
      />
    </Section>
  )
}

// A neutral stand-in for a product photo, so the demo needs no image files.
const photo = (tone: number, zoom = false) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${zoom ? "250 220 300 300" : "0 0 800 800"}"><rect width="800" height="800" fill="oklch(${tone} 0.02 60)"/><path d="M260 200H540L580 700H220Z" fill="oklch(${(tone - 0.12).toFixed(2)} 0.05 60)"/><rect x="260" y="170" width="280" height="44" rx="8" fill="oklch(${(tone - 0.2).toFixed(2)} 0.05 60)"/><circle cx="400" cy="470" r="100" fill="oklch(${tone} 0.03 60)"/></svg>`
  )}`

const weights = [
  { value: "250", label: "250 g" },
  { value: "500", label: "500 g" },
]

const demo: { en: ProductDetail03Props; ar: ProductDetail03Props } = {
  en: {
    lang: "en",
    title: "Saudi coffee with cardamom and saffron, 250 g",
    images: [
      { src: photo(0.92), alt: "The coffee bag, front" },
      { src: photo(0.88, true), alt: "The bag label" },
      { src: photo(0.9), alt: "The coffee in a dallah" },
    ],
    price: 45,
    compareAtPrice: 55,
    vat: { rate: 0.15, included: true },
    rating: { value: 4.9, count: 1284, href: "#reviews" },
    options: [{ id: "weight", label: "Weight", items: weights, defaultValue: "250" }],
    stock: { status: "in" },
    delivery: { date: "2026-11-22", city: "Dammam" },
    details: [
      {
        id: "description",
        title: "Description",
        content: (
          <p>Light roast ground fresh in Riyadh each week, with whole cardamom and Iranian saffron. Ready for the dallah.</p>
        ),
      },
      {
        id: "shipping",
        title: "Shipping and returns",
        content: <p>Free delivery on orders over <bdi>SAR 150</bdi>. An unopened bag can be returned within 7 days.</p>,
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    title: "قهوة سعودية بالهيل والزعفران، 250 جم",
    images: [
      { src: photo(0.92), alt: "كيس القهوة من الأمام" },
      { src: photo(0.88, true), alt: "ملصق الكيس" },
      { src: photo(0.9), alt: "القهوة في الدلّة" },
    ],
    price: 45,
    compareAtPrice: 55,
    vat: { rate: 0.15, included: true },
    rating: { value: 4.9, count: 1284, href: "#reviews" },
    options: [{ id: "weight", label: "الوزن", items: weights.map((w) => ({ ...w, label: `${w.value} جم` })), defaultValue: "250" }],
    stock: { status: "in" },
    delivery: { date: "2026-11-22", city: "الدمام" },
    details: [
      {
        id: "description",
        title: "الوصف",
        content: <p>تحميص خفيف ويُطحن طازجًا في الرياض كل أسبوع، مع هيل كامل وزعفران إيراني. جاهزة للدلّة.</p>,
      },
      {
        id: "shipping",
        title: "الشحن والإرجاع",
        content: <p>توصيل مجاني للطلبات فوق <bdi>150 ر.س</bdi>. يمكن إرجاع الكيس غير المفتوح خلال 7 أيام.</p>,
      },
    ],
    labels: labelsAr,
  },
}

export { ProductDetail03, labelsEn, labelsAr, demo }
export type { ProductDetail03Props, ProductDetail03Labels, ProductOption, ProductSelection }
export default ProductDetail03

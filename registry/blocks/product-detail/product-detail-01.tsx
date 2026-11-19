"use client"

import * as React from "react"
import { ShoppingCartIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Vat } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { carouselLabelsAr } from "@/registry/ui/carousel"
import { Container } from "@/registry/ui/container"
import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"
import { dialogLabelsAr } from "@/registry/ui/dialog"
import { Installments, installmentsLabelsAr } from "@/registry/ui/installments"
import { Price } from "@/registry/ui/price"
import { ProductGallery, productGalleryLabelsAr, type GalleryImage } from "@/registry/ui/product-gallery"
import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"
import { Section } from "@/registry/ui/section"
import { ShareButton, shareButtonLabelsAr } from "@/registry/ui/share-button"
import { StockIndicator, stockIndicatorLabelsAr, type StockStatus } from "@/registry/ui/stock-indicator"
import { SwatchSelect, swatchSelectLabelsAr, type SwatchOption } from "@/registry/ui/swatch-select"
import { WishlistButton, wishlistButtonLabelsAr } from "@/registry/ui/wishlist-button"

type ProductOption = {
  id: string
  label: string
  items: SwatchOption[]
  // Defaults to the first option in stock.
  defaultValue?: string
}

type ProductSelection = { options: Record<string, string>; quantity: number }

type ProductDetail01Labels = {
  was: string
  save: (percent: string) => string
  vat: (rate: string, included: boolean) => string
  quantity: string
  addToCart: string
  buyNow: string
  soldOut: string
}

type ProductDetail01Props = BlockBase & {
  lang?: Lang
  title: string
  brand?: string
  images: GalleryImage[]
  price: number
  // The price before a discount. Shows crossed out with the saving.
  compareAtPrice?: number
  currency?: Currency
  vat?: Vat
  rating?: { value: number; count: number; href: string }
  options?: ProductOption[]
  stock: { status: StockStatus; count?: number }
  installments?: { count?: number; min?: number; max?: number }
  // ISO date. The city and the free shipping threshold are optional.
  delivery?: { date: string; city?: string; freeShippingThreshold?: number }
  shareUrl?: string
  wishlisted?: boolean
  details: { id: string; title: string; content: React.ReactNode }[]
  onAddToCart?: (selection: ProductSelection) => void
  onBuyNow?: (selection: ProductSelection) => void
  onWishlistChange?: (wishlisted: boolean) => void
  labels?: Partial<ProductDetail01Labels>
}

const labelsEn: ProductDetail01Labels = {
  was: "Was",
  save: (percent) => `Save ${percent}`,
  vat: (rate, included) => (included ? `Price includes ${rate} VAT` : `Price excludes ${rate} VAT`),
  quantity: "Quantity",
  addToCart: "Add to cart",
  buyNow: "Buy now",
  soldOut: "Sold out",
}

const labelsAr: ProductDetail01Labels = {
  was: "السعر قبل الخصم",
  save: (percent) => `وفّر ${percent}`,
  vat: (rate, included) => (included ? `السعر شامل ضريبة القيمة المضافة ${rate}` : `السعر غير شامل ضريبة القيمة المضافة ${rate}`),
  quantity: "الكمية",
  addToCart: "أضف إلى السلة",
  buyNow: "اشترِ الآن",
  soldOut: "نفدت الكمية",
}

function ProductDetail01({
  lang = "en",
  title,
  brand,
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
  shareUrl,
  wishlisted,
  details,
  onAddToCart,
  onBuyNow,
  onWishlistChange,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductDetail01Props) {
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
  const selection = { options: chosen, quantity }
  const saving = compareAtPrice && compareAtPrice > price ? 1 - price / compareAtPrice : 0

  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 lg:sticky lg:top-6">
          <ProductGallery
            zoom
            images={images}
            lang={lang}
            labels={ar ? productGalleryLabelsAr : undefined}
            carouselLabels={ar ? carouselLabelsAr : undefined}
            dialogLabels={ar ? dialogLabelsAr : undefined}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              {brand ? <p className="text-sm text-muted-foreground">{brand}</p> : <span />}
              {shareUrl ? (
                <ShareButton
                  url={shareUrl}
                  title={title}
                  variant="ghost"
                  size="sm"
                  labels={ar ? shareButtonLabelsAr : undefined}
                />
              ) : null}
            </div>
            <Heading id={`${sid}-heading`} className="text-2xl font-semibold text-balance md:text-3xl">
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

          {installments ? (
            <Installments
              total={price * quantity}
              currency={currency}
              showSchedule={false}
              lang={lang}
              labels={ar ? installmentsLabelsAr : undefined}
              {...installments}
            />
          ) : null}

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

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button size="lg" className="h-10 flex-1 text-sm" disabled={out} onClick={() => onAddToCart?.(selection)}>
                <ShoppingCartIcon aria-hidden="true" data-icon="inline-start" />
                {out ? t.soldOut : t.addToCart}
              </Button>
              <WishlistButton
                className="size-10"
                pressed={wishlisted}
                onPressedChange={onWishlistChange}
                labels={ar ? wishlistButtonLabelsAr : undefined}
              />
            </div>
            <Button variant="outline" size="lg" className="h-10 w-full text-sm" disabled={out} onClick={() => onBuyNow?.(selection)}>
              {t.buyNow}
            </Button>
          </div>

          {delivery ? (
            <DeliveryEstimate
              className="border-t pt-6"
              date={new Date(delivery.date)}
              city={delivery.city ? <span className="font-medium text-foreground">{delivery.city}</span> : undefined}
              freeShipping={
                delivery.freeShippingThreshold
                  ? { threshold: delivery.freeShippingThreshold, subtotal: price * quantity }
                  : undefined
              }
              currency={currency}
              lang={lang}
              labels={ar ? deliveryEstimateLabelsAr : undefined}
            />
          ) : null}

          <Accordion defaultValue={[details[0]?.id]} className="border-t">
            {details.map((detail) => (
              <AccordionItem key={detail.id} value={detail.id}>
                <AccordionTrigger className="py-4 text-base">{detail.title}</AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">{detail.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  )
}

const Specs = ({ rows }: { rows: [string, string][] }) => (
  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
    {rows.map(([name, value]) => (
      <React.Fragment key={name}>
        <dt className="text-foreground">{name}</dt>
        <dd>{value}</dd>
      </React.Fragment>
    ))}
  </dl>
)

const swatches = [
  ["white", "oklch(0.98 0 0)"],
  ["cream", "oklch(0.9 0.04 85)"],
  ["grey", "oklch(0.72 0 0)"],
  ["navy", "oklch(0.32 0.06 260)"],
] as const

// One color list for both languages: only the labels change.
const colors = (labels: string[]): SwatchOption[] =>
  swatches.map(([value, color], i) => ({ value, label: labels[i], color }))

const sizes = ["52", "54", "56", "58", "60"].map((s) => ({ value: s, label: s, outOfStock: s === "60" }))

const demo: { en: ProductDetail01Props; ar: ProductDetail01Props } = {
  en: {
    lang: "en",
    title: "Men's Egyptian cotton thobe",
    brand: "Dar Al Aseel",
    images: [
      { alt: "Front of the thobe" },
      { alt: "Back of the thobe" },
      { alt: "Collar and placket" },
      { alt: "Close-up of the cotton weave" },
    ],
    price: 289,
    compareAtPrice: 349,
    vat: { rate: 0.15, included: true },
    rating: { value: 4.7, count: 248, href: "#reviews" },
    options: [
      {
        id: "color",
        label: "Color",
        items: colors(["White", "Cream", "Grey", "Navy"]),
      },
      { id: "size", label: "Size", items: sizes, defaultValue: "56" },
    ],
    stock: { status: "low", count: 6 },
    installments: { count: 4, min: 50, max: 5000 },
    delivery: { date: "2026-11-24", city: "Riyadh", freeShippingThreshold: 400 },
    shareUrl: "https://example.com/products/egyptian-cotton-thobe",
    details: [
      {
        id: "description",
        title: "Description",
        content: (
          <p>
            Long-staple Egyptian cotton that stays light in summer and does not crease quickly. A Saudi collar, an inner
            pocket and double-stitched seams, for the office and for every occasion.
          </p>
        ),
      },
      {
        id: "specs",
        title: "Specifications",
        content: (
          <Specs
            rows={[
              ["Fabric", "100% Egyptian cotton"],
              ["Fit", "Regular"],
              ["Collar", "Saudi"],
              ["Care", "Machine wash cold"],
              ["Item code", "TH-2041"],
            ]}
          />
        ),
      },
      {
        id: "shipping",
        title: "Shipping and returns",
        content: (
          <p>
            Free delivery on orders over <bdi>SAR 400</bdi>. It arrives in 2 to 4 working days anywhere in the Kingdom.
            You can return an unworn item in its original packaging within 14 days.
          </p>
        ),
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    title: "ثوب رجالي قطن مصري",
    brand: "دار الأصيل",
    images: [
      { alt: "الثوب من الأمام" },
      { alt: "الثوب من الخلف" },
      { alt: "الياقة والأزرار" },
      { alt: "لقطة قريبة لنسيج القطن" },
    ],
    price: 289,
    compareAtPrice: 349,
    vat: { rate: 0.15, included: true },
    rating: { value: 4.7, count: 248, href: "#reviews" },
    options: [
      {
        id: "color",
        label: "اللون",
        items: colors(["أبيض", "كريمي", "رمادي", "كحلي"]),
      },
      { id: "size", label: "المقاس", items: sizes, defaultValue: "56" },
    ],
    stock: { status: "low", count: 6 },
    installments: { count: 4, min: 50, max: 5000 },
    delivery: { date: "2026-11-24", city: "الرياض", freeShippingThreshold: 400 },
    shareUrl: "https://example.com/products/egyptian-cotton-thobe",
    details: [
      {
        id: "description",
        title: "الوصف",
        content: (
          <p>
            قطن مصري طويل التيلة، خفيف في الصيف وما يتجعّد بسرعة. ياقة سعودية وجيب داخلي وخياطة مزدوجة، تلبسه للدوام
            وللمناسبات.
          </p>
        ),
      },
      {
        id: "specs",
        title: "المواصفات",
        content: (
          <Specs
            rows={[
              ["الخامة", "قطن مصري 100%"],
              ["القصّة", "عادية"],
              ["الياقة", "سعودية"],
              ["الغسيل", "غسالة بماء بارد"],
              ["رمز المنتج", "TH-2041"],
            ]}
          />
        ),
      },
      {
        id: "shipping",
        title: "الشحن والإرجاع",
        content: (
          <p>
            توصيل مجاني للطلبات فوق <bdi>400 ر.س</bdi>، ويصلك خلال 2 إلى 4 أيام عمل داخل المملكة. يمكنك إرجاع المنتج
            خلال 14 يومًا إذا كان غير مستعمل وبعبوته الأصلية.
          </p>
        ),
      },
    ],
    labels: labelsAr,
  },
}

export { ProductDetail01, labelsEn, labelsAr, demo }
export type { ProductDetail01Props, ProductDetail01Labels, ProductOption, ProductSelection }
export default ProductDetail01

"use client"

import * as React from "react"
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel"
import { Container } from "@/registry/ui/container"
import {
  ProductCard,
  ProductCardAction,
  ProductCardBadges,
  ProductCardBody,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
  ProductCardVendor,
} from "@/registry/ui/product-card"
import { Rating, ratingLabelsAr, type RatingLabels } from "@/registry/ui/rating"
import { Section, SectionHeader } from "@/registry/ui/section"
import { WishlistButton, wishlistButtonLabelsAr, type WishlistButtonLabels } from "@/registry/ui/wishlist-button"
import { cn } from "@/registry/lib/utils"

type Product = {
  id: string
  name: string
  vendor?: string
  href: string
  image: { src?: string; alt: string; width?: number; height?: number }
  price: number
  compareAt?: number
  rating?: number
  reviews?: number
  inStock?: boolean
}

type ProductGrid03Labels = {
  viewAll: string
  discount: string
  outOfStock: string
  originalPrice: string
  addToCart: string
  previous: string
  next: string
  wishlist: Partial<WishlistButtonLabels>
  rating: Partial<RatingLabels>
}

type ProductGrid03Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  viewAll?: { href: string }
  products: Product[]
  currency?: Currency
  onAddToCart?: (id: string) => void
  onWishlistChange?: (id: string, saved: boolean) => void
  labels?: Partial<ProductGrid03Labels>
}

const labelsEn: ProductGrid03Labels = {
  viewAll: "View all",
  discount: "{n} off",
  outOfStock: "Out of stock",
  originalPrice: "Original price:",
  addToCart: "Add to cart",
  previous: "Previous products",
  next: "Next products",
  wishlist: {},
  rating: {},
}

const labelsAr: ProductGrid03Labels = {
  viewAll: "عرض الكل",
  discount: "خصم {n}",
  outOfStock: "نفدت الكمية",
  originalPrice: "السعر قبل الخصم:",
  addToCart: "أضف للسلة",
  previous: "المنتجات السابقة",
  next: "المنتجات التالية",
  wishlist: wishlistButtonLabelsAr,
  rating: ratingLabelsAr,
}

const arrow = "hidden sm:inline-flex"

function ProductGrid03({
  lang = "en",
  eyebrow,
  title,
  description,
  viewAll,
  products,
  currency = "SAR",
  onAddToCart,
  onWishlistChange,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductGrid03Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const carouselLabels = { previous: t.previous, next: t.next }
  return (
    <Section id={sid} className={className}>
      <Container>
        <Carousel opts={{ align: "start", slidesToScroll: "auto" }} labels={carouselLabels} aria-labelledby={`${sid}-heading`}>
          <SectionHeader
            id={sid}
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingLevel={headingLevel}
            actions={
              <>
                {viewAll ? (
                  <a href={viewAll.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}>
                    {t.viewAll}
                  </a>
                ) : null}
                <CarouselPrevious className={cn("static size-10", arrow)} />
                <CarouselNext className={cn("static size-10", arrow)} />
              </>
            }
          />
          <CarouselContent>
            {products.map((p) => {
              const titleId = `${sid}-${p.id}`
              const inStock = p.inStock !== false
              return (
                <CarouselItem key={p.id} className="basis-3/5 sm:basis-1/3 lg:basis-1/4">
                  <ProductCard unavailable={!inStock} className="h-full">
                    <ProductCardMedia>
                      <ProductCardImage {...p.image} />
                      <ProductCardBadges>
                        {p.compareAt ? <Badge variant="destructive">{t.discount.replace("{n}", formatPercent(1 - p.price / p.compareAt, { lang }, { max: 0 }))}</Badge> : null}
                        {!inStock ? <Badge variant="secondary">{t.outOfStock}</Badge> : null}
                      </ProductCardBadges>
                      <ProductCardAction>
                        <WishlistButton labels={t.wishlist} onPressedChange={(saved) => onWishlistChange?.(p.id, saved)} />
                      </ProductCardAction>
                    </ProductCardMedia>
                    <ProductCardBody>
                      {p.vendor ? <ProductCardVendor>{p.vendor}</ProductCardVendor> : null}
                      <ProductCardTitle as={ItemHeading} id={titleId} href={p.href}>
                        {p.name}
                      </ProductCardTitle>
                      {p.rating !== undefined ? <Rating value={p.rating} count={p.reviews} lang={lang} labels={t.rating} className="text-xs" /> : null}
                      <ProductCardPrice amount={p.price} compareAt={p.compareAt} currency={currency} lang={lang} compareAtLabel={t.originalPrice} />
                      <ProductCardFooter>
                        <Button variant="outline" size="lg" className="h-10 w-full" disabled={!inStock} aria-describedby={titleId} onClick={() => onAddToCart?.(p.id)}>
                          <ShoppingCartSimpleIcon aria-hidden="true" weight="regular" />
                          {inStock ? t.addToCart : t.outOfStock}
                        </Button>
                      </ProductCardFooter>
                    </ProductCardBody>
                  </ProductCard>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  )
}

const catalog = [
  { id: "oud", price: 520, rating: 4.9, reviews: 342, en: ["Cambodian oud oil, 12 g", "Dar Al Tayeb"], ar: ["دهن عود كمبودي 12 جم", "دار الطيب"] },
  { id: "thobe", price: 279, rating: 4.6, reviews: 410, en: ["Men's summer cotton thobe", "Al Deera Tailors"], ar: ["ثوب رجالي قطن للصيف", "خياط الديرة"] },
  { id: "cups", price: 129, rating: 4.8, reviews: 215, en: ["Arabic coffee cups, set of 6", "Bayt Al Diyafa"], ar: ["فناجين قهوة عربية، طقم 6", "بيت الضيافة"] },
  { id: "tote", price: 389, compareAt: 459, rating: 4.7, reviews: 128, en: ["Handmade leather tote", "Najd Workshop"], ar: ["شنطة جلد يدوية", "مشغل نجد"] },
  { id: "phones", price: 429, rating: 4.6, reviews: 193, en: ["Wireless headphones", "Naghma"], ar: ["سماعات رأس لاسلكية", "نغمة"] },
  { id: "watch", price: 749, compareAt: 899, rating: 4.5, reviews: 86, en: ["Classic watch, leather strap", "Khaleej Time"], ar: ["ساعة كلاسيك بسوار جلد", "ساعات الخليج"] },
] as const

const build = (lang: Lang): ProductGrid03Props => ({
  lang,
  eyebrow: lang === "ar" ? "هذا الأسبوع" : "This week",
  title: lang === "ar" ? "الأكثر مبيعًا" : "Best sellers",
  description: lang === "ar" ? "ما يطلبه عملاؤنا أكثر من غيره، من الرياض إلى جدة والدمام." : "What customers order most, from Riyadh to Jeddah and Dammam.",
  viewAll: { href: "#all" },
  products: catalog.map(({ id, en, ar, ...rest }) => {
    const [name, vendor] = lang === "ar" ? ar : en
    return { ...rest, id, name, vendor, href: `#${id}`, image: { alt: name } }
  }),
  labels: lang === "ar" ? labelsAr : labelsEn,
})

const demo: { en: ProductGrid03Props; ar: ProductGrid03Props } = { en: build("en"), ar: build("ar") }

export { ProductGrid03, labelsEn, labelsAr, demo }
export type { ProductGrid03Props, ProductGrid03Labels, Product }
export default ProductGrid03

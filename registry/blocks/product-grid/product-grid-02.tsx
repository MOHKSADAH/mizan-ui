"use client"

import * as React from "react"
import { ShoppingCartSimpleIcon, TagIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang } from "@/registry/lib/block-types"
import { formatPercent, formatMoneySymbol } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import { FilterChips, filterChipsLabelsAr, type FilterChipsLabels } from "@/registry/ui/filter-chips"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Toggle } from "@/registry/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"
import { WishlistButton, wishlistButtonLabelsAr, type WishlistButtonLabels } from "@/registry/ui/wishlist-button"

type Option = { id: string; label: string }

type Product = {
  id: string
  name: string
  vendor?: string
  href: string
  image: { src: string; alt: string }
  price: number
  compareAt?: number
  rating?: number
  reviews?: number
  category: string
  inStock: boolean
}

type Sort = "featured" | "price-asc" | "price-desc"
type PriceBand = "any" | "low" | "mid" | "high"

type ProductGrid02Labels = {
  toolbar: string
  all: string
  price: string
  priceAny: string
  priceUnder: string
  priceBetween: string
  priceOver: string
  onSale: string
  inStock: string
  sortLabel: string
  sortFeatured: string
  sortPriceAsc: string
  sortPriceDesc: string
  discount: string
  outOfStock: string
  originalPrice: string
  addToCart: string
  emptyTitle: string
  emptyDescription: string
  emptyAction: string
  wishlist: Partial<WishlistButtonLabels>
  rating: Partial<RatingLabels>
  chips: Partial<FilterChipsLabels>
}

type ProductGrid02Props = BlockBase & {
  lang?: Lang
  title: string
  description?: string
  products: Product[]
  categories: Option[]
  currency?: Currency
  // The two prices that split the price filter into low, mid and high bands.
  priceSteps?: [number, number]
  onAddToCart?: (id: string) => void
  onWishlistChange?: (id: string, saved: boolean) => void
  labels?: Partial<ProductGrid02Labels>
}

const labelsEn: ProductGrid02Labels = {
  toolbar: "Product filters",
  all: "All",
  price: "Price",
  priceAny: "Any price",
  priceUnder: "Under {n}",
  priceBetween: "{min} to {max}",
  priceOver: "Over {n}",
  onSale: "On sale",
  inStock: "In stock",
  sortLabel: "Sort by",
  sortFeatured: "Best selling",
  sortPriceAsc: "Price: low to high",
  sortPriceDesc: "Price: high to low",
  discount: "{n} off",
  outOfStock: "Out of stock",
  originalPrice: "Original price:",
  addToCart: "Add to cart",
  emptyTitle: "No products match your filters",
  emptyDescription: "Remove a filter to see more.",
  emptyAction: "Clear filters",
  wishlist: {},
  rating: {},
  chips: {},
}

const labelsAr: ProductGrid02Labels = {
  toolbar: "فلاتر المنتجات",
  all: "الكل",
  price: "السعر",
  priceAny: "كل الأسعار",
  priceUnder: "أقل من {n}",
  priceBetween: "من {min} إلى {max}",
  priceOver: "أكثر من {n}",
  onSale: "عروض وتخفيضات",
  inStock: "متوفر",
  sortLabel: "الترتيب",
  sortFeatured: "الأكثر مبيعًا",
  sortPriceAsc: "السعر: من الأقل",
  sortPriceDesc: "السعر: من الأعلى",
  discount: "خصم {n}",
  outOfStock: "نفدت الكمية",
  originalPrice: "السعر قبل الخصم:",
  addToCart: "أضف للسلة",
  emptyTitle: "لا توجد منتجات تطابق اختيارك",
  emptyDescription: "أزل أحد الفلاتر لعرض المزيد.",
  emptyAction: "مسح الفلاتر",
  wishlist: wishlistButtonLabelsAr,
  rating: ratingLabelsAr,
  chips: filterChipsLabelsAr,
}

const pill = "h-10 rounded-full px-4 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"

type State = { category: string; band: PriceBand; sale: boolean; stock: boolean; sort: Sort }

const initial: State = { category: "all", band: "any", sale: false, stock: false, sort: "featured" }

function ProductGrid02({
  lang = "en",
  title,
  description,
  products,
  categories,
  currency = "SAR",
  priceSteps = [150, 400],
  onAddToCart,
  onWishlistChange,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductGrid02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const [state, setState] = React.useState<State>(initial)
  const [low, high] = priceSteps
  const money = (n: number) => formatMoneySymbol(n, { lang }, { currency })
  const bands = [
    { value: "any", label: t.priceAny },
    { value: "low", label: t.priceUnder.replace("{n}", money(low)) },
    { value: "mid", label: t.priceBetween.replace("{min}", money(low)).replace("{max}", money(high)) },
    { value: "high", label: t.priceOver.replace("{n}", money(high)) },
  ]
  const sorts = [
    { value: "featured", label: t.sortFeatured },
    { value: "price-asc", label: t.sortPriceAsc },
    { value: "price-desc", label: t.sortPriceDesc },
  ]
  const inBand = (price: number) =>
    state.band === "any" || (state.band === "low" ? price < low : state.band === "mid" ? price >= low && price <= high : price > high)
  const matches = products
    .filter((p) => (state.category === "all" || p.category === state.category) && inBand(p.price) && (!state.sale || p.compareAt) && (!state.stock || p.inStock))
    .sort((a, b) => (state.sort === "price-asc" ? a.price - b.price : state.sort === "price-desc" ? b.price - a.price : 0))

  const chips = [
    state.category !== "all" && { id: "category", label: categories.find((c) => c.id === state.category)?.label ?? "" },
    state.band !== "any" && { id: "band", label: bands.find((b) => b.value === state.band)?.label ?? "" },
    state.sale && { id: "sale", label: t.onSale },
    state.stock && { id: "stock", label: t.inStock },
  ].filter((c): c is { id: string; label: string } => Boolean(c))
  const remove = (chip: string) =>
    setState((s) => ({ ...s, ...(chip === "category" ? { category: "all" } : chip === "band" ? { band: "any" } : chip === "sale" ? { sale: false } : { stock: false }) }))
  const clear = () => setState((s) => ({ ...initial, sort: s.sort }))

  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} title={title} description={description} headingLevel={headingLevel} />
        <div role="group" aria-label={t.toolbar} className="mb-6 flex flex-col gap-4">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <ToggleGroup
              variant="outline"
              size="lg"
              className="w-max"
              value={[state.category]}
              onValueChange={(v) => v[0] && setState((s) => ({ ...s, category: v[0] }))}
            >
              {[{ id: "all", label: t.all }, ...categories].map((c) => (
                <ToggleGroupItem key={c.id} value={c.id} className={pill}>
                  {c.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select items={bands} value={state.band} onValueChange={(v) => v && setState((s) => ({ ...s, band: v as PriceBand }))}>
              <SelectTrigger aria-label={t.price} className="h-10 min-w-40 rounded-full px-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bands.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Toggle variant="outline" size="lg" className={pill} pressed={state.sale} onPressedChange={(sale) => setState((s) => ({ ...s, sale }))}>
              {t.onSale}
            </Toggle>
            <Toggle variant="outline" size="lg" className={pill} pressed={state.stock} onPressedChange={(stock) => setState((s) => ({ ...s, stock }))}>
              {t.inStock}
            </Toggle>
            <Select items={sorts} value={state.sort} onValueChange={(v) => v && setState((s) => ({ ...s, sort: v as Sort }))}>
              <SelectTrigger aria-label={t.sortLabel} className="ms-auto h-10 min-w-44 rounded-full px-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sorts.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FilterChips filters={chips} onRemove={remove} onClearAll={clear} resultCount={matches.length} lang={lang} labels={t.chips} />
        </div>
        {matches.length ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {matches.map((p) => {
              const titleId = `${sid}-${p.id}`
              return (
                <li key={p.id}>
                  <ProductCard unavailable={!p.inStock} className="h-full">
                    <ProductCardMedia>
                      <ProductCardImage src={p.image.src} alt={p.image.alt} />
                      <ProductCardBadges>
                        {p.compareAt ? <Badge variant="destructive">{t.discount.replace("{n}", formatPercent(1 - p.price / p.compareAt, { lang }, { max: 0 }))}</Badge> : null}
                        {!p.inStock ? <Badge variant="secondary">{t.outOfStock}</Badge> : null}
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
                      <ProductCardFooter className="justify-between">
                        <ProductCardPrice amount={p.price} compareAt={p.compareAt} currency={currency} lang={lang} compareAtLabel={t.originalPrice} className="flex-col items-start gap-0" />
                        <Button
                          variant="default"
                          size="icon-lg"
                          className="size-10 rounded-full"
                          disabled={!p.inStock}
                          aria-label={t.addToCart}
                          aria-describedby={titleId}
                          onClick={() => onAddToCart?.(p.id)}
                        >
                          <ShoppingCartSimpleIcon aria-hidden="true" weight="regular" />
                        </Button>
                      </ProductCardFooter>
                    </ProductCardBody>
                  </ProductCard>
                </li>
              )
            })}
          </ul>
        ) : (
          <Empty className="border py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TagIcon aria-hidden="true" weight="regular" />
              </EmptyMedia>
              <EmptyTitle>{t.emptyTitle}</EmptyTitle>
              <EmptyDescription>{t.emptyDescription}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="lg" className="h-10" onClick={clear}>
                {t.emptyAction}
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </Container>
    </Section>
  )
}

const catalog = [
  { id: "tote", img: 1, price: 389, compareAt: 459, rating: 4.7, reviews: 128, category: "bags", inStock: true, en: ["Handmade leather tote", "Najd Workshop"], ar: ["شنطة جلد يدوية", "مشغل نجد"] },
  { id: "oud", img: 2, price: 520, rating: 4.9, reviews: 342, category: "fragrance", inStock: true, en: ["Cambodian oud oil, 12 g", "Dar Al Tayeb"], ar: ["دهن عود كمبودي 12 جم", "دار الطيب"] },
  { id: "watch", img: 3, price: 749, compareAt: 899, rating: 4.5, reviews: 86, category: "accessories", inStock: true, en: ["Classic watch, leather strap", "Khaleej Time"], ar: ["ساعة كلاسيك بسوار جلد", "ساعات الخليج"] },
  { id: "cups", img: 4, price: 129, rating: 4.8, reviews: 215, category: "home", inStock: true, en: ["Arabic coffee cups, set of 6", "Bayt Al Diyafa"], ar: ["فناجين قهوة عربية، طقم 6", "بيت الضيافة"] },
  { id: "glasses", img: 5, price: 245, rating: 4.3, reviews: 54, category: "accessories", inStock: true, en: ["Metal frame sunglasses", "Zill"], ar: ["نظارة شمسية بإطار معدني", "ظل"] },
  { id: "thobe", img: 6, price: 279, rating: 4.6, reviews: 410, category: "clothing", inStock: true, en: ["Men's summer cotton thobe", "Al Deera Tailors"], ar: ["ثوب رجالي قطن للصيف", "خياط الديرة"] },
  { id: "cushion", img: 7, price: 89, compareAt: 119, rating: 4.4, reviews: 37, category: "home", inStock: false, en: ["Embroidered majlis cushion", "Sadu House"], ar: ["مخدة مجلس مطرزة", "بيت السدو"] },
  { id: "phones", img: 8, price: 429, rating: 4.6, reviews: 193, category: "electronics", inStock: true, en: ["Wireless headphones", "Naghma"], ar: ["سماعات رأس لاسلكية", "نغمة"] },
] as const

const categoryNames = {
  en: { bags: "Bags", fragrance: "Fragrance", accessories: "Accessories", home: "Home", clothing: "Clothing", electronics: "Electronics" },
  ar: { bags: "الحقائب", fragrance: "العطور", accessories: "الإكسسوارات", home: "المنزل", clothing: "الملابس", electronics: "الإلكترونيات" },
}

const build = (lang: Lang): ProductGrid02Props => ({
  lang,
  title: lang === "ar" ? "تسوّق منتجاتنا" : "Shop our products",
  description: lang === "ar" ? "منتجات مختارة من حرفيين وعلامات سعودية." : "Selected pieces from Saudi makers and brands.",
  products: catalog.map(({ id, img, en, ar, ...rest }) => {
    const [name, vendor] = lang === "ar" ? ar : en
    return { ...rest, id, name, vendor, href: `#${id}`, image: { src: `/examples/shop-${img}.svg`, alt: name } }
  }),
  categories: Object.entries(categoryNames[lang]).map(([id, label]) => ({ id, label })),
  labels: lang === "ar" ? labelsAr : labelsEn,
})

const demo: { en: ProductGrid02Props; ar: ProductGrid02Props } = { en: build("en"), ar: build("ar") }

export { ProductGrid02, labelsEn, labelsAr, demo }
export type { ProductGrid02Props, ProductGrid02Labels, Product, Option }
export default ProductGrid02

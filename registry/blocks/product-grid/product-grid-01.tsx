"use client"

import * as React from "react"
import { FunnelSimpleIcon, ShoppingCartSimpleIcon, TagIcon } from "@phosphor-icons/react"

import type { BlockBase, Currency, Lang, Plural } from "@/registry/lib/block-types"
import { formatNumber, formatPercent, plural } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Container } from "@/registry/ui/container"
import { useDirection } from "@/registry/ui/direction"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import { Label } from "@/registry/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"
import { Price } from "@/registry/ui/price"
import {
  ProductCard,
  ProductCardAction,
  ProductCardBadges,
  ProductCardBody,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardSwatches,
  ProductCardTitle,
  ProductCardVendor,
} from "@/registry/ui/product-card"
import { Rating, ratingLabelsAr, type RatingLabels } from "@/registry/ui/rating"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/ui/sheet"
import { Slider } from "@/registry/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"
import { WishlistButton, wishlistButtonLabelsAr, type WishlistButtonLabels } from "@/registry/ui/wishlist-button"

type Option = { id: string; label: string }
type ColorOption = { id: string; label: string; color: string }

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
  sizes?: string[]
  // Ids from the colors prop.
  colors?: string[]
  stock: "in" | "low" | "out"
}

type Sort = "featured" | "price-asc" | "price-desc" | "rating"

type ProductGrid01Labels = {
  filters: string
  filtersTitle: string
  clearAll: string
  category: string
  price: string
  size: string
  color: string
  availability: string
  inStockOnly: string
  sortLabel: string
  sortFeatured: string
  sortPriceAsc: string
  sortPriceDesc: string
  sortRating: string
  results: Plural
  showResults: Plural
  discount: string
  outOfStock: string
  originalPrice: string
  addToCart: string
  colors: string
  emptyTitle: string
  emptyDescription: string
  emptyAction: string
  close: string
  pagination: string
  previous: string
  next: string
  goToPrevious: string
  goToNext: string
  morePages: string
  page: string
  wishlist: Partial<WishlistButtonLabels>
  rating: Partial<RatingLabels>
}

type ProductGrid01Props = BlockBase & {
  lang?: Lang
  title: string
  description?: string
  products: Product[]
  categories: Option[]
  sizes: string[]
  colors: ColorOption[]
  currency?: Currency
  pageSize?: number
  onAddToCart?: (id: string) => void
  onWishlistChange?: (id: string, saved: boolean) => void
  labels?: Partial<ProductGrid01Labels>
}

const labelsEn: ProductGrid01Labels = {
  filters: "Filters",
  filtersTitle: "Filter products",
  clearAll: "Clear all",
  category: "Category",
  price: "Price",
  size: "Size",
  color: "Color",
  availability: "Availability",
  inStockOnly: "In stock only",
  sortLabel: "Sort by",
  sortFeatured: "Best selling",
  sortPriceAsc: "Price: low to high",
  sortPriceDesc: "Price: high to low",
  sortRating: "Top rated",
  results: (n) => plural(n, { one: "{n} product", other: "{n} products" }, { lang: "en" }),
  showResults: (n) => plural(n, { one: "Show {n} product", other: "Show {n} products" }, { lang: "en" }),
  discount: "{n} off",
  outOfStock: "Out of stock",
  originalPrice: "Original price:",
  addToCart: "Add to cart",
  colors: "Colors",
  emptyTitle: "No products match your filters",
  emptyDescription: "Remove a filter or widen the price range.",
  emptyAction: "Clear filters",
  close: "Close",
  pagination: "Product pages",
  previous: "Previous",
  next: "Next",
  goToPrevious: "Go to previous page",
  goToNext: "Go to next page",
  morePages: "More pages",
  page: "Page {n}",
  wishlist: {},
  rating: {},
}

const labelsAr: ProductGrid01Labels = {
  filters: "تصفية",
  filtersTitle: "تصفية المنتجات",
  clearAll: "مسح الكل",
  category: "القسم",
  price: "السعر",
  size: "المقاس",
  color: "اللون",
  availability: "التوفر",
  inStockOnly: "المتوفر فقط",
  sortLabel: "الترتيب",
  sortFeatured: "الأكثر مبيعًا",
  sortPriceAsc: "السعر: من الأقل",
  sortPriceDesc: "السعر: من الأعلى",
  sortRating: "الأعلى تقييمًا",
  results: (n) =>
    plural(n, { zero: "لا توجد منتجات", one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" }, { lang: "ar" }),
  showResults: (n) =>
    plural(n, { zero: "لا توجد منتجات", one: "عرض منتج واحد", two: "عرض منتجين", few: "عرض {n} منتجات", many: "عرض {n} منتجًا", other: "عرض {n} منتج" }, { lang: "ar" }),
  discount: "خصم {n}",
  outOfStock: "نفدت الكمية",
  originalPrice: "السعر قبل الخصم:",
  addToCart: "أضف للسلة",
  colors: "الألوان",
  emptyTitle: "لا توجد منتجات تطابق اختيارك",
  emptyDescription: "أزل أحد الفلاتر أو وسّع نطاق السعر.",
  emptyAction: "مسح الفلاتر",
  close: "إغلاق",
  pagination: "صفحات المنتجات",
  previous: "السابق",
  next: "التالي",
  goToPrevious: "الانتقال إلى الصفحة السابقة",
  goToNext: "الانتقال إلى الصفحة التالية",
  morePages: "المزيد من الصفحات",
  page: "الصفحة {n}",
  wishlist: wishlistButtonLabelsAr,
  rating: ratingLabelsAr,
}

type State = { categories: string[]; sizes: string[]; colors: string[]; inStock: boolean; price: [number, number]; sort: Sort; page: number }

const toggle = (list: string[], id: string, on: boolean) => (on ? [...list, id] : list.filter((x) => x !== id))

function pageItems(page: number, count: number): (number | "gap")[] {
  const all = Array.from({ length: count }, (_, i) => i + 1)
  if (count <= 7) return all
  return all.flatMap<number | "gap">((p, i) => {
    if (p === 1 || p === count || Math.abs(p - page) <= 1) return [p]
    return i === 1 || i === count - 2 ? ["gap" as const] : []
  })
}

type PanelProps = Pick<ProductGrid01Props, "categories" | "sizes" | "colors" | "products"> & {
  t: ProductGrid01Labels
  lang: Lang
  currency: Currency
  state: State
  bounds: [number, number]
  set: (patch: Partial<State>) => void
}

function FilterPanel({ t, lang, currency, state, bounds, set, categories, sizes, colors, products }: PanelProps) {
  const legend = "mb-3 text-sm font-semibold"
  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className={legend}>{t.category}</legend>
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <Label key={c.id} className="min-h-8 cursor-pointer font-normal">
              <Checkbox checked={state.categories.includes(c.id)} onCheckedChange={(on) => set({ categories: toggle(state.categories, c.id, on) })} />
              {c.label}
              <bdi className="ms-auto text-muted-foreground tabular-nums">{formatNumber(products.filter((p) => p.category === c.id).length, { lang })}</bdi>
            </Label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className={legend}>{t.price}</legend>
        <Slider
          aria-label={t.price}
          min={bounds[0]}
          max={bounds[1]}
          step={10}
          value={state.price}
          onValueChange={(v) => Array.isArray(v) && set({ price: [v[0], v[1]] })}
        />
        <div className="mt-3 flex items-center justify-between text-sm">
          <Price amount={state.price[0]} currency={currency} lang={lang} />
          <Price amount={state.price[1]} currency={currency} lang={lang} />
        </div>
      </fieldset>
      <fieldset>
        <legend className={legend}>{t.size}</legend>
        <ToggleGroup multiple variant="outline" size="lg" className="flex-wrap" value={state.sizes} onValueChange={(sizes) => set({ sizes })}>
          {sizes.map((s) => (
            <ToggleGroupItem key={s} value={s} className="min-w-11">
              {s}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>
      <fieldset>
        <legend className={legend}>{t.color}</legend>
        <ToggleGroup multiple variant="outline" size="lg" className="flex-wrap" value={state.colors} onValueChange={(colors) => set({ colors })}>
          {colors.map((c) => (
            <ToggleGroupItem key={c.id} value={c.id}>
              <span aria-hidden="true" className="size-3.5 rounded-full border border-border" style={{ backgroundColor: c.color }} />
              {c.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>
      <fieldset>
        <legend className={legend}>{t.availability}</legend>
        <Label className="min-h-8 cursor-pointer font-normal">
          <Checkbox checked={state.inStock} onCheckedChange={(inStock) => set({ inStock })} />
          {t.inStockOnly}
        </Label>
      </fieldset>
    </div>
  )
}

const compare: Record<Sort, (a: Product, b: Product) => number> = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
}

function ProductGrid01({
  lang = "en",
  title,
  description,
  products,
  categories,
  sizes,
  colors,
  currency = "SAR",
  pageSize = 6,
  onAddToCart,
  onWishlistChange,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductGrid01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const dir = useDirection()
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const bounds = React.useMemo<[number, number]>(() => {
    const prices = products.map((p) => p.price)
    return [Math.floor(Math.min(...prices) / 10) * 10, Math.ceil(Math.max(...prices) / 10) * 10]
  }, [products])
  const initial: State = { categories: [], sizes: [], colors: [], inStock: false, price: bounds, sort: "featured", page: 1 }
  const [state, setState] = React.useState<State>(initial)
  const set = (patch: Partial<State>) => setState((s) => ({ ...s, page: 1, ...patch }))
  const clear = () => setState(initial)

  const matches = products
    .filter(
      (p) =>
        (!state.categories.length || state.categories.includes(p.category)) &&
        p.price >= state.price[0] &&
        p.price <= state.price[1] &&
        (!state.sizes.length || p.sizes?.some((s) => state.sizes.includes(s))) &&
        (!state.colors.length || p.colors?.some((c) => state.colors.includes(c))) &&
        (!state.inStock || p.stock !== "out"),
    )
    .sort(compare[state.sort])
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize))
  const page = Math.min(state.page, pageCount)
  const visible = matches.slice((page - 1) * pageSize, page * pageSize)
  const active =
    state.categories.length + state.sizes.length + state.colors.length + (state.inStock ? 1 : 0) + (state.price[0] !== bounds[0] || state.price[1] !== bounds[1] ? 1 : 0)
  const panel = { t, lang, currency, state, bounds, set, categories, sizes, colors, products }
  const sorts = [
    { value: "featured", label: t.sortFeatured },
    { value: "price-asc", label: t.sortPriceAsc },
    { value: "price-desc", label: t.sortPriceDesc },
    { value: "rating", label: t.sortRating },
  ]
  const sortId = `${sid}-sort`

  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} title={title} description={description} headingLevel={headingLevel} />
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
          <aside aria-label={t.filtersTitle} className="hidden lg:block">
            <div className="mb-5 flex h-8 items-center justify-between">
              <h3 className="text-base font-semibold">{t.filtersTitle}</h3>
              {active > 0 && (
                <Button variant="ghost" size="sm" onClick={clear}>
                  {t.clearAll}
                </Button>
              )}
            </div>
            <FilterPanel {...panel} />
          </aside>
          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" size="lg" className="h-10 lg:hidden" />}>
                    <FunnelSimpleIcon aria-hidden="true" weight="regular" />
                    {t.filters}
                    {active > 0 && <Badge>{formatNumber(active, { lang })}</Badge>}
                  </SheetTrigger>
                  <SheetContent side={dir === "rtl" ? "right" : "left"} labels={{ close: t.close }}>
                    <SheetHeader>
                      <SheetTitle>{t.filtersTitle}</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-4">
                      <FilterPanel {...panel} />
                    </div>
                    <SheetFooter>
                      <SheetClose render={<Button size="lg" className="h-11 w-full text-base" />}>{t.showResults(matches.length)}</SheetClose>
                      {active > 0 && (
                        <Button variant="ghost" size="lg" className="h-11 w-full text-base" onClick={clear}>
                          {t.clearAll}
                        </Button>
                      )}
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <p role="status" aria-live="polite" className="text-sm whitespace-nowrap text-muted-foreground">
                  {t.results(matches.length)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span id={sortId} className="hidden text-sm text-muted-foreground sm:inline">
                  {t.sortLabel}
                </span>
                <Select items={sorts} value={state.sort} onValueChange={(v) => v && set({ sort: v as Sort })}>
                  <SelectTrigger aria-labelledby={sortId} className="h-10 w-36 sm:w-44">
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
            </div>
            {visible.length ? (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                {visible.map((p) => {
                  const titleId = `${sid}-${p.id}`
                  const swatches = colors.filter((c) => p.colors?.includes(c.id)).map((c) => ({ label: c.label, color: c.color }))
                  return (
                    <li key={p.id}>
                      <ProductCard unavailable={p.stock === "out"} className="h-full">
                        <ProductCardMedia>
                          <ProductCardImage src={p.image.src} alt={p.image.alt} />
                          <ProductCardBadges>
                            {p.compareAt ? (
                              <Badge variant="destructive">{t.discount.replace("{n}", formatPercent(1 - p.price / p.compareAt, { lang }, { max: 0 }))}</Badge>
                            ) : null}
                            {p.stock === "out" ? <Badge variant="secondary">{t.outOfStock}</Badge> : null}
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
                          {swatches.length ? <ProductCardSwatches swatches={swatches} aria-label={t.colors} /> : null}
                          <ProductCardFooter>
                            <Button variant="outline" size="lg" className="h-10 w-full" disabled={p.stock === "out"} aria-describedby={titleId} onClick={() => onAddToCart?.(p.id)}>
                              <ShoppingCartSimpleIcon aria-hidden="true" weight="regular" />
                              {p.stock === "out" ? t.outOfStock : t.addToCart}
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
            {pageCount > 1 && (
              <Pagination labels={{ label: t.pagination }} className="mt-12">
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`#page-${page - 1}`}
                        text={t.previous}
                        labels={{ goToPrevious: t.goToPrevious }}
                        onClick={(e) => {
                          e.preventDefault()
                          set({ page: page - 1 })
                        }}
                      />
                    </PaginationItem>
                  )}
                  {pageItems(page, pageCount).map((item, i) => (
                    <PaginationItem key={item === "gap" ? `gap-${i}` : item}>
                      {item === "gap" ? (
                        <PaginationEllipsis labels={{ morePages: t.morePages }} />
                      ) : (
                        <PaginationLink
                          href={`#page-${item}`}
                          isActive={item === page}
                          aria-label={t.page.replace("{n}", formatNumber(item, { lang }))}
                          onClick={(e) => {
                            e.preventDefault()
                            set({ page: item })
                          }}
                        >
                          <bdi>{formatNumber(item, { lang })}</bdi>
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  {page < pageCount && (
                    <PaginationItem>
                      <PaginationNext
                        href={`#page-${page + 1}`}
                        text={t.next}
                        labels={{ goToNext: t.goToNext }}
                        onClick={(e) => {
                          e.preventDefault()
                          set({ page: page + 1 })
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

const shop = (n: number) => `/examples/shop-${n}.svg`

const catalog = [
  { id: "tote", img: 1, price: 389, compareAt: 459, rating: 4.7, reviews: 128, category: "bags", colors: ["brown", "black"], stock: "in", en: ["Handmade leather tote", "Najd Workshop"], ar: ["شنطة جلد يدوية", "مشغل نجد"] },
  { id: "oud", img: 2, price: 520, rating: 4.9, reviews: 342, category: "fragrance", stock: "in", en: ["Cambodian oud oil, 12 g", "Dar Al Tayeb"], ar: ["دهن عود كمبودي 12 جم", "دار الطيب"] },
  { id: "watch", img: 3, price: 749, compareAt: 899, rating: 4.5, reviews: 86, category: "watches", colors: ["black", "navy"], stock: "in", en: ["Classic watch, leather strap", "Khaleej Time"], ar: ["ساعة كلاسيك بسوار جلد", "ساعات الخليج"] },
  { id: "cups", img: 4, price: 129, rating: 4.8, reviews: 215, category: "home", colors: ["cream"], stock: "in", en: ["Arabic coffee cups, set of 6", "Bayt Al Diyafa"], ar: ["فناجين قهوة عربية، طقم 6", "بيت الضيافة"] },
  { id: "glasses", img: 5, price: 245, rating: 4.3, reviews: 54, category: "eyewear", colors: ["black", "brown"], stock: "low", en: ["Metal frame sunglasses", "Zill"], ar: ["نظارة شمسية بإطار معدني", "ظل"] },
  { id: "thobe", img: 6, price: 279, rating: 4.6, reviews: 410, category: "clothing", sizes: ["S", "M", "L", "XL"], colors: ["white", "cream", "navy"], stock: "in", en: ["Men's summer cotton thobe", "Al Deera Tailors"], ar: ["ثوب رجالي قطن للصيف", "خياط الديرة"] },
  { id: "cushion", img: 7, price: 89, compareAt: 119, rating: 4.4, reviews: 37, category: "home", colors: ["brown", "cream"], stock: "out", en: ["Embroidered majlis cushion", "Sadu House"], ar: ["مخدة مجلس مطرزة", "بيت السدو"] },
  { id: "phones", img: 8, price: 429, rating: 4.6, reviews: 193, category: "electronics", colors: ["black", "white"], stock: "low", en: ["Wireless headphones", "Naghma"], ar: ["سماعات رأس لاسلكية", "نغمة"] },
] as const

const categoryNames = {
  en: { bags: "Bags", fragrance: "Fragrance", watches: "Watches", home: "Home", eyewear: "Eyewear", clothing: "Clothing", electronics: "Electronics" },
  ar: { bags: "الحقائب", fragrance: "العطور", watches: "الساعات", home: "المنزل", eyewear: "النظارات", clothing: "الملابس", electronics: "الإلكترونيات" },
}
const colorNames = {
  en: { black: "Black", brown: "Brown", white: "White", cream: "Cream", navy: "Navy" },
  ar: { black: "أسود", brown: "بني", white: "أبيض", cream: "كريمي", navy: "كحلي" },
}
const colorValues = { black: "oklch(0.25 0 0)", brown: "oklch(0.45 0.07 55)", white: "oklch(0.97 0 0)", cream: "oklch(0.9 0.04 85)", navy: "oklch(0.3 0.08 260)" }

const build = (lang: Lang): ProductGrid01Props => ({
  lang,
  title: lang === "ar" ? "كل المنتجات" : "All products",
  description: lang === "ar" ? "توصيل لجميع مدن المملكة خلال 2 إلى 4 أيام عمل." : "Delivery to every city in the Kingdom in 2 to 4 working days.",
  products: catalog.map(({ id, img, en, ar, ...rest }) => {
    const [name, vendor] = lang === "ar" ? ar : en
    return {
      ...rest,
      id,
      name,
      vendor,
      href: `#${id}`,
      image: { src: shop(img), alt: name },
      colors: "colors" in rest ? [...rest.colors] : undefined,
      sizes: "sizes" in rest ? [...rest.sizes] : undefined,
    }
  }),
  categories: Object.entries(categoryNames[lang]).map(([id, label]) => ({ id, label })),
  sizes: ["S", "M", "L", "XL"],
  colors: Object.entries(colorNames[lang]).map(([id, label]) => ({ id, label, color: colorValues[id as keyof typeof colorValues] })),
  labels: lang === "ar" ? labelsAr : labelsEn,
})

const demo: { en: ProductGrid01Props; ar: ProductGrid01Props } = { en: build("en"), ar: build("ar") }

export { ProductGrid01, labelsEn, labelsAr, demo }
export type { ProductGrid01Props, ProductGrid01Labels, Product, Option, ColorOption }
export default ProductGrid01

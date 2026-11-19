"use client"

import * as React from "react"
import { PencilSimpleLineIcon, SealCheckIcon, ThumbsUpIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { formatDate, formatNumber, plural } from "@/registry/lib/format"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { ImageLightbox, imageLightboxLabelsAr } from "@/registry/ui/image-lightbox"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationLabelsAr,
} from "@/registry/ui/pagination"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"
import { RatingSummary, ratingSummaryLabelsAr } from "@/registry/ui/rating-summary"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

type SortId = "newest" | "highest" | "lowest" | "helpful"

type Review = {
  id: string
  author: string
  city?: string
  rating: number
  // ISO date, formatted with the lang prop.
  date: string
  title?: string
  body: string
  verified?: boolean
  photos?: { src: string; alt: string }[]
  helpful?: number
}

type ProductReviews01Labels = {
  title: string
  writeReview: string
  sortBy: string
  sortNewest: string
  sortHighest: string
  sortLowest: string
  sortHelpful: string
  reviewCount: Plural
  verified: string
  helpful: string
}

type ProductReviews01Props = BlockBase & {
  lang?: Lang
  // The store's totals. They are not computed from `reviews`, which may be one page of many.
  average: number
  distribution: number[]
  count?: number
  reviews: Review[]
  pageSize?: number
  defaultSort?: SortId
  onWriteReview?: () => void
  // Called with the review id when a shopper marks it helpful.
  onHelpful?: (id: string) => void
  labels?: Partial<ProductReviews01Labels>
}

const labelsEn: ProductReviews01Labels = {
  title: "Customer reviews",
  writeReview: "Write a review",
  sortBy: "Sort by",
  sortNewest: "Newest",
  sortHighest: "Highest rated",
  sortLowest: "Lowest rated",
  sortHelpful: "Most helpful",
  reviewCount: (n) => plural(n, { one: "{n} review", other: "{n} reviews" }, { lang: "en" }),
  verified: "Verified purchase",
  helpful: "Helpful",
}

const labelsAr: ProductReviews01Labels = {
  title: "تقييمات العملاء",
  writeReview: "اكتب تقييمك",
  sortBy: "ترتيب حسب",
  sortNewest: "الأحدث",
  sortHighest: "الأعلى تقييمًا",
  sortLowest: "الأقل تقييمًا",
  sortHelpful: "الأكثر فائدة",
  reviewCount: (n) =>
    plural(
      n,
      { zero: "لا تقييمات", one: "تقييم واحد", two: "تقييمان", few: "{n} تقييمات", many: "{n} تقييمًا", other: "{n} تقييم" },
      { lang: "ar" }
    ),
  verified: "مشترٍ موثّق",
  helpful: "مفيد",
}

const sorters: Record<SortId, (a: Review, b: Review) => number> = {
  newest: (a, b) => b.date.localeCompare(a.date),
  highest: (a, b) => b.rating - a.rating || b.date.localeCompare(a.date),
  lowest: (a, b) => a.rating - b.rating || b.date.localeCompare(a.date),
  helpful: (a, b) => (b.helpful ?? 0) - (a.helpful ?? 0),
}

function ProductReviews01({
  lang = "en",
  average,
  distribution,
  count,
  reviews,
  pageSize = 4,
  defaultSort = "newest",
  onWriteReview,
  onHelpful,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductReviews01Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const locale = { lang }
  const uid = React.useId()
  const sid = id ?? uid
  const ReviewHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const [sort, setSort] = React.useState<SortId>(defaultSort)
  const [page, setPage] = React.useState(1)
  const [voted, setVoted] = React.useState<ReadonlySet<string>>(new Set())
  const sorted = React.useMemo(() => [...reviews].sort(sorters[sort]), [reviews, sort])
  const pages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, pages)
  const shown = sorted.slice((current - 1) * pageSize, current * pageSize)
  const sortItems = [
    { value: "newest", label: t.sortNewest },
    { value: "highest", label: t.sortHighest },
    { value: "lowest", label: t.sortLowest },
    { value: "helpful", label: t.sortHelpful },
  ]
  const go = (n: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    if (n >= 1 && n <= pages) setPage(n)
  }

  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          title={t.title}
          headingLevel={headingLevel}
          className="mb-8 md:mb-10"
          actions={
            <Button size="lg" className="h-10 px-4 text-sm" onClick={onWriteReview}>
              <PencilSimpleLineIcon aria-hidden="true" data-icon="inline-start" />
              {t.writeReview}
            </Button>
          }
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <RatingSummary
            className="h-fit lg:sticky lg:top-6 lg:col-span-4 lg:grid-cols-1 lg:gap-6"
            average={average}
            distribution={distribution}
            count={count}
            lang={lang}
            labels={ar ? ratingSummaryLabelsAr : undefined}
          />
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
            <div className="flex items-center justify-between gap-3 border-b pb-4">
              <p className="text-sm text-muted-foreground">{t.reviewCount(reviews.length)}</p>
              <Select
                items={sortItems}
                value={sort}
                onValueChange={(value) => {
                  setSort(value as SortId)
                  setPage(1)
                }}
              >
                <SelectTrigger aria-label={t.sortBy} className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" alignItemWithTrigger={false} dir={ar ? "rtl" : "ltr"}>
                  {sortItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ul className="flex flex-col">
              {shown.map((review) => {
                const on = voted.has(review.id)
                return (
                  <li key={review.id} className="flex flex-col gap-3 border-b py-6 first:pt-0 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{review.author.trim()[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className="font-medium">
                          {review.author}
                          {review.city ? <span className="font-normal text-muted-foreground"> · {review.city}</span> : null}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <Rating value={review.rating} lang={lang} labels={ar ? ratingLabelsAr : undefined} />
                          <time dateTime={review.date}>{formatDate(new Date(review.date), locale, { day: "numeric", month: "long", year: "numeric" })}</time>
                        </div>
                      </div>
                      {review.verified ? (
                        <Badge variant="secondary" className="shrink-0">
                          <SealCheckIcon aria-hidden="true" weight="fill" data-icon="inline-start" />
                          {t.verified}
                        </Badge>
                      ) : null}
                    </div>
                    {review.title ? <ReviewHeading className="font-semibold">{review.title}</ReviewHeading> : null}
                    <p className="text-muted-foreground">{review.body}</p>
                    {review.photos?.length ? (
                      <ImageLightbox
                        className="flex flex-wrap gap-2 [&>li]:w-16"
                        images={review.photos}
                        lang={lang}
                        labels={ar ? imageLightboxLabelsAr : undefined}
                      />
                    ) : null}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit"
                      aria-pressed={on}
                      onClick={() => {
                        if (on) return
                        setVoted((prev) => new Set(prev).add(review.id))
                        onHelpful?.(review.id)
                      }}
                    >
                      <ThumbsUpIcon aria-hidden="true" weight={on ? "fill" : "regular"} data-icon="inline-start" />
                      {t.helpful}
                      <bdi className="tabular-nums">{formatNumber((review.helpful ?? 0) + (on ? 1 : 0), locale)}</bdi>
                    </Button>
                  </li>
                )
              })}
            </ul>

            {pages > 1 ? (
              <Pagination labels={ar ? paginationLabelsAr : undefined}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`#${sid}`}
                      labels={ar ? paginationLabelsAr : undefined}
                      aria-disabled={current === 1}
                      className={current === 1 ? "pointer-events-none opacity-50" : undefined}
                      onClick={go(current - 1)}
                    />
                  </PaginationItem>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <PaginationItem key={n}>
                      <PaginationLink href={`#${sid}`} isActive={n === current} onClick={go(n)}>
                        {formatNumber(n, locale)}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href={`#${sid}`}
                      labels={ar ? paginationLabelsAr : undefined}
                      aria-disabled={current === pages}
                      className={current === pages ? "pointer-events-none opacity-50" : undefined}
                      onClick={go(current + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

const distribution = [5, 2, 1, 0, 0]

const demo: { en: ProductReviews01Props; ar: ProductReviews01Props } = {
  en: {
    lang: "en",
    average: 4.5,
    distribution,
    reviews: [
      {
        id: "r1",
        author: "Nayef Al-Otaibi",
        city: "Riyadh",
        rating: 5,
        date: "2026-11-09",
        title: "Worth every riyal",
        body: "I ordered size 56 and it fit perfectly. The fabric is soft and light, and I wore it all day at work without feeling the heat. The stitching is neat and the buttons are solid.",
        verified: true,
        helpful: 14,
      },
      {
        id: "r2",
        author: "Noura Al-Shammari",
        city: "Hail",
        rating: 5,
        date: "2026-11-04",
        title: "A gift for my dad",
        body: "I bought it as a gift for my father and he loved it. It arrived in two days in neat packaging. I recommend it for anyone looking for a thobe for occasions.",
        verified: true,
        helpful: 9,
      },
      {
        id: "r3",
        author: "Abdullah Al-Ghamdi",
        city: "Jeddah",
        rating: 4,
        date: "2026-10-30",
        title: "Great, but the cream is lighter than the photo",
        body: "The quality is excellent, but the cream is a little lighter than in the photo. If you have an athletic build, take one size up.",
        verified: true,
        helpful: 11,
      },
      {
        id: "r4",
        author: "Fahad Al-Qahtani",
        city: "Abha",
        rating: 5,
        date: "2026-10-28",
        title: "Exactly like the photos",
        body: "The white is exactly as in the photos, not see-through and does not cling. I have washed it three times and nothing has changed.",
        verified: true,
        helpful: 7,
      },
      {
        id: "r5",
        author: "Sultan Al-Mutairi",
        city: "Buraidah",
        rating: 5,
        date: "2026-10-14",
        title: "My favorite thobe for work",
        body: "This is the third thobe I have ordered from this store. The collar stays firm after washing. Delivery to Buraidah took three days.",
        verified: true,
        helpful: 5,
      },
      {
        id: "r6",
        author: "Haifa Al-Harbi",
        city: "Madinah",
        rating: 4,
        date: "2026-11-01",
        title: "Very good",
        body: "Comfortable and light, but the sleeves were too long for me and I had them shortened at the tailor. Everything else is fine.",
        verified: true,
        helpful: 4,
      },
      {
        id: "r7",
        author: "Reem Al-Dosari",
        city: "Dammam",
        rating: 5,
        date: "2026-10-21",
        body: "Excellent fabric and a fair price compared with the shops. I ordered three in different colors.",
        helpful: 3,
      },
      {
        id: "r8",
        author: "Turki Al-Zahrani",
        city: "Taif",
        rating: 3,
        date: "2026-10-18",
        title: "Smaller than I expected",
        body: "Nice fabric, but size 54 was tight at the shoulders. I exchanged it for a 56 and the service was quick, though I wish the size guide were more accurate.",
        verified: true,
        helpful: 8,
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    average: 4.5,
    distribution,
    reviews: [
      {
        id: "r1",
        author: "نايف العتيبي",
        city: "الرياض",
        rating: 5,
        date: "2026-11-09",
        title: "يستاهل كل ريال",
        body: "أخذت مقاس 56 وجاء مضبوط على قياسي. القماش ناعم وخفيف، ولبسته يوم كامل في الدوام وما حسيت بحر. الخياطة مرتبة والأزرار ثابتة.",
        verified: true,
        helpful: 14,
      },
      {
        id: "r2",
        author: "نورة الشمري",
        city: "حائل",
        rating: 5,
        date: "2026-11-04",
        title: "هدية لأبوي",
        body: "اشتريته هدية لوالدي وانبسط فيه. وصلني خلال يومين والتغليف أنيق. أنصح فيه لمن يبحث عن ثوب للمناسبات.",
        verified: true,
        helpful: 9,
      },
      {
        id: "r3",
        author: "عبدالله الغامدي",
        city: "جدة",
        rating: 4,
        date: "2026-10-30",
        title: "ممتاز، بس الكريمي أفتح من الصورة",
        body: "الجودة ممتازة، بس لون الكريمي أفتح شوي من الصورة. أنصح من جسمه رياضي يأخذ مقاس أكبر.",
        verified: true,
        helpful: 11,
      },
      {
        id: "r4",
        author: "فهد القحطاني",
        city: "أبها",
        rating: 5,
        date: "2026-10-28",
        title: "نفس الصور تمامًا",
        body: "اللون الأبيض مثل الصور بالضبط، ما يشف ولا يلزق بالجسم. غسلته ثلاث مرات وما تغيّر عليه شيء.",
        verified: true,
        helpful: 7,
      },
      {
        id: "r5",
        author: "سلطان المطيري",
        city: "بريدة",
        rating: 5,
        date: "2026-10-14",
        title: "ثوب الدوام المفضل عندي",
        body: "هذا ثالث ثوب أطلبه من نفس المتجر. الياقة تبقى ثابتة بعد الغسيل. التوصيل إلى بريدة أخذ ثلاثة أيام.",
        verified: true,
        helpful: 5,
      },
      {
        id: "r6",
        author: "هيفاء الحربي",
        city: "المدينة المنورة",
        rating: 4,
        date: "2026-11-01",
        title: "جيد جدًا",
        body: "مريح وخفيف، لكن الأكمام كانت أطول من اللازم وقصّرتها عند الخياط. وبقية الأمور كلها تمام.",
        verified: true,
        helpful: 4,
      },
      {
        id: "r7",
        author: "ريم الدوسري",
        city: "الدمام",
        rating: 5,
        date: "2026-10-21",
        body: "قماش ممتاز وسعر مناسب مقارنة بالمحلات. طلبت ثلاثة بألوان مختلفة.",
        helpful: 3,
      },
      {
        id: "r8",
        author: "تركي الزهراني",
        city: "الطائف",
        rating: 3,
        date: "2026-10-18",
        title: "أصغر من المتوقع",
        body: "القماش حلو، بس مقاس 54 جاء ضيق عند الأكتاف. استبدلته بـ 56 وكانت الخدمة سريعة، لكن أتمنى يكون جدول المقاسات أدق.",
        verified: true,
        helpful: 8,
      },
    ],
    labels: labelsAr,
  },
}

export { ProductReviews01, labelsEn, labelsAr, demo }
export type { ProductReviews01Props, ProductReviews01Labels, Review, SortId }
export default ProductReviews01

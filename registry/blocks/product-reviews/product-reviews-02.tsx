import * as React from "react"
import { SealCheckIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"
import { Section, SectionHeader } from "@/registry/ui/section"

type Highlight = {
  id: string
  author: string
  city?: string
  rating: number
  title?: string
  body: string
  verified?: boolean
}

type ProductReviews02Labels = {
  title: string
  readAll: Plural
  verified: string
}

type ProductReviews02Props = BlockBase & {
  lang?: Lang
  average: number
  count: number
  // The first review is the lead: it takes the large card.
  reviews: Highlight[]
  allReviewsHref: string
  labels?: Partial<ProductReviews02Labels>
}

const labelsEn: ProductReviews02Labels = {
  title: "What shoppers say",
  readAll: (n) => plural(n, { one: "Read the review", other: "Read all {n} reviews" }, { lang: "en" }),
  verified: "Verified purchase",
}

const labelsAr: ProductReviews02Labels = {
  title: "رأي المشترين",
  readAll: (n) => plural(n, { other: "عرض كل التقييمات ({n})" }, { lang: "ar" }),
  verified: "مشترٍ موثّق",
}

function ProductReviews02({
  lang = "en",
  average,
  count,
  reviews,
  allReviewsHref,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProductReviews02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const CardHeading = `h${headingLevel + 1}` as "h3" | "h4"

  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container>
        <SectionHeader
          id={sid}
          title={t.title}
          headingLevel={headingLevel}
          className="mb-6 md:mb-8"
          description={
            <Rating
              value={average}
              count={count}
              showValue
              lang={lang}
              labels={lang === "ar" ? ratingLabelsAr : undefined}
              className="text-base"
            />
          }
          actions={
            <a href={allReviewsHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4 text-sm")}>
              {t.readAll(count)}
            </a>
          }
        />
        <ul className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {reviews.map((review, i) => {
            const lead = i === 0
            return (
              <li key={review.id} className={cn(lead && "lg:col-span-2 lg:row-span-2")}>
                <Card className={cn("h-full", lead ? "bg-muted/50 md:[--card-spacing:--spacing(8)]" : "md:[--card-spacing:--spacing(5)]")}>
                  <CardContent className="flex h-full flex-col gap-4">
                    <Rating value={review.rating} lang={lang} labels={lang === "ar" ? ratingLabelsAr : undefined} />
                    <div className="flex flex-col gap-2">
                      {review.title ? (
                        <CardHeading className="text-lg font-semibold text-balance md:text-xl">
                          {review.title}
                        </CardHeading>
                      ) : null}
                      <p className={cn("text-muted-foreground", lead ? "text-base md:text-lg" : "line-clamp-4")}>{review.body}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <Avatar>
                        <AvatarFallback>{review.author.trim()[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col text-sm">
                        <span className="font-medium">{review.author}</span>
                        {review.city ? <span className="text-muted-foreground">{review.city}</span> : null}
                      </div>
                      {review.verified ? (
                        <Badge variant="secondary" className="shrink-0">
                          <SealCheckIcon aria-hidden="true" weight="fill" data-icon="inline-start" />
                          {t.verified}
                        </Badge>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

const demo: { en: ProductReviews02Props; ar: ProductReviews02Props } = {
  en: {
    lang: "en",
    average: 4.7,
    count: 248,
    allReviewsHref: "#reviews",
    reviews: [
      {
        id: "h1",
        author: "Nayef Al-Otaibi",
        city: "Riyadh",
        rating: 5,
        title: "Worth every riyal",
        body: "I ordered size 56 and it fit perfectly. The fabric is soft and light, and I wore it all day at work without feeling the heat. The stitching is neat and the buttons are solid.",
        verified: true,
      },
      {
        id: "h2",
        author: "Noura Al-Shammari",
        city: "Hail",
        rating: 5,
        title: "A gift for my dad",
        body: "He loved it. It arrived in two days in neat packaging.",
        verified: true,
      },
      {
        id: "h3",
        author: "Fahad Al-Qahtani",
        city: "Abha",
        rating: 5,
        title: "Exactly like the photos",
        body: "Not see-through and does not cling. I have washed it three times and nothing has changed.",
        verified: true,
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    average: 4.7,
    count: 248,
    allReviewsHref: "#reviews",
    reviews: [
      {
        id: "h1",
        author: "نايف العتيبي",
        city: "الرياض",
        rating: 5,
        title: "يستاهل كل ريال",
        body: "أخذت مقاس 56 وجاء مضبوط على قياسي. القماش ناعم وخفيف، ولبسته يوم كامل في الدوام وما حسيت بحر. الخياطة مرتبة والأزرار ثابتة.",
        verified: true,
      },
      {
        id: "h2",
        author: "نورة الشمري",
        city: "حائل",
        rating: 5,
        title: "هدية لأبوي",
        body: "انبسط فيه كثير. وصلني خلال يومين والتغليف أنيق.",
        verified: true,
      },
      {
        id: "h3",
        author: "فهد القحطاني",
        city: "أبها",
        rating: 5,
        title: "نفس الصور تمامًا",
        body: "ما يشف ولا يلزق بالجسم. غسلته ثلاث مرات وما تغيّر عليه شيء.",
        verified: true,
      },
    ],
    labels: labelsAr,
  },
}

export { ProductReviews02, labelsEn, labelsAr, demo }
export type { ProductReviews02Props, ProductReviews02Labels, Highlight }
export default ProductReviews02

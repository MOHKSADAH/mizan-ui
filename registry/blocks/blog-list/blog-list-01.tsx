import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang, Media, Plural } from "@/registry/lib/block-types"
import { formatDate, formatNumber } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"
import { Section, SectionHeader } from "@/registry/ui/section"

type Post = {
  slug: string
  title: string
  excerpt: string
  cover?: Media | React.ReactNode
  category?: string
  // ISO date, formatted with the lang prop.
  date: string
  readingMinutes?: number
  href?: string
}

type BlogList01Labels = {
  minutesRead: Plural
  pagination: string
  previous: string
  next: string
  goToPrevious: string
  goToNext: string
  morePages: string
}

type BlogList01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  posts: Post[]
  pagination?: { page: number; pageCount: number; hrefFor: (page: number) => string }
  labels?: Partial<BlogList01Labels>
}

const labelsEn: BlogList01Labels = {
  minutesRead: (n) => `${n} min read`,
  pagination: "Blog pages",
  previous: "Previous",
  next: "Next",
  goToPrevious: "Go to previous page",
  goToNext: "Go to next page",
  morePages: "More pages",
}

const labelsAr: BlogList01Labels = {
  minutesRead: (n) => {
    const form = new Intl.PluralRules("ar").select(n)
    const count = formatNumber(n, { lang: "ar" })
    return form === "one" ? "قراءة دقيقة واحدة" : form === "two" ? "قراءة دقيقتين" : form === "few" ? `قراءة ${count} دقائق` : `قراءة ${count} دقيقة`
  },
  pagination: "صفحات المدونة",
  previous: "السابق",
  next: "التالي",
  goToPrevious: "الانتقال إلى الصفحة السابقة",
  goToNext: "الانتقال إلى الصفحة التالية",
  morePages: "المزيد من الصفحات",
}

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function pageItems(page: number, count: number): (number | "gap")[] {
  const all = Array.from({ length: count }, (_, i) => i + 1)
  if (count <= 7) return all
  return all.flatMap<number | "gap">((p, i) => {
    if (p === 1 || p === count || Math.abs(p - page) <= 1) return [p]
    return i === 1 || i === count - 2 ? ["gap" as const] : []
  })
}

function BlogList01({
  lang = "en",
  eyebrow,
  title,
  description,
  posts,
  pagination,
  headingLevel = 2,
  labels,
  id,
  className,
}: BlogList01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card className="relative h-full gap-0 py-0">
                <article className="flex h-full flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    {isMedia(post.cover) ? (
                      <img src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} className="size-full object-cover" />
                    ) : (
                      post.cover
                    )}
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-3 p-(--card-spacing)">
                    {post.category ? <Badge variant="secondary">{post.category}</Badge> : null}
                    <ItemHeading className="text-lg font-semibold">
                      <a href={post.href ?? `#${post.slug}`} className="after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
                        {post.title}
                      </a>
                    </ItemHeading>
                    <p className="line-clamp-3 text-base text-muted-foreground">{post.excerpt}</p>
                    <p className="mt-auto flex flex-wrap gap-x-3 text-sm text-muted-foreground">
                      <time dateTime={post.date}>{formatDate(new Date(post.date), { lang })}</time>
                      {post.readingMinutes ? <span>{t.minutesRead(post.readingMinutes)}</span> : null}
                    </p>
                  </div>
                </article>
              </Card>
            </li>
          ))}
        </ul>
        {pagination ? (
          <Pagination labels={{ label: t.pagination }} className="mt-12">
            <PaginationContent>
              {pagination.page > 1 ? (
                <PaginationItem>
                  <PaginationPrevious
                    href={pagination.hrefFor(pagination.page - 1)}
                    text={t.previous}
                    labels={{ goToPrevious: t.goToPrevious }}
                  />
                </PaginationItem>
              ) : null}
              {pageItems(pagination.page, pagination.pageCount).map((item, i) => (
                <PaginationItem key={item === "gap" ? `gap-${i}` : item}>
                  {item === "gap" ? (
                    <PaginationEllipsis labels={{ morePages: t.morePages }} />
                  ) : (
                    <PaginationLink href={pagination.hrefFor(item)} isActive={item === pagination.page}>
                      <bdi>{formatNumber(item, { lang })}</bdi>
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              {pagination.page < pagination.pageCount ? (
                <PaginationItem>
                  <PaginationNext href={pagination.hrefFor(pagination.page + 1)} text={t.next} labels={{ goToNext: t.goToNext }} />
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        ) : null}
      </Container>
    </Section>
  )
}

const cover = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-12" />
  </div>
)

const hrefFor = (page: number) => `?page=${page}`

const demo: { en: BlogList01Props; ar: BlogList01Props } = {
  en: {
    lang: "en",
    eyebrow: "Blog",
    title: "Ideas for growing your business",
    description: "Practical guides from the Rafid team.",
    posts: [
      { slug: "zatca-phase-two", title: "A practical guide to ZATCA phase two", excerpt: "What changes for your invoices, what to prepare and how to avoid last-minute surprises with the integration phase.", cover, category: "Compliance", date: "2026-11-02", readingMinutes: 6 },
      { slug: "inventory-counts", title: "Count stock without closing the shop", excerpt: "A simple weekly routine that keeps warehouse numbers close to reality without stopping sales.", cover, category: "Operations", date: "2026-10-21", readingMinutes: 4 },
      { slug: "whatsapp-invoices", title: "Send invoices on WhatsApp the right way", excerpt: "How to share invoices and payment reminders with customers while keeping the conversation professional.", cover, category: "Sales", date: "2026-10-08", readingMinutes: 5 },
    ],
    pagination: { page: 1, pageCount: 4, hrefFor },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "المدونة",
    title: "أفكار لتنمية أعمالك",
    description: "أدلة عملية من فريق رافد.",
    posts: [
      { slug: "zatca-phase-two", title: "دليل عملي للمرحلة الثانية من الفوترة الإلكترونية", excerpt: "ما الذي يتغير في فواتيرك، وما الذي عليك تجهيزه، وكيف تتجنب مفاجآت اللحظة الأخيرة في مرحلة الربط.", cover, category: "الامتثال", date: "2026-11-02", readingMinutes: 6 },
      { slug: "inventory-counts", title: "اجرد مخزونك دون إغلاق المتجر", excerpt: "روتين أسبوعي بسيط يبقي أرقام المستودع قريبة من الواقع دون إيقاف المبيعات.", cover, category: "العمليات", date: "2026-10-21", readingMinutes: 4 },
      { slug: "whatsapp-invoices", title: "أرسل فواتيرك عبر واتساب بالطريقة الصحيحة", excerpt: "كيف تشارك الفواتير وتذكيرات السداد مع عملائك مع الحفاظ على احترافية المحادثة.", cover, category: "المبيعات", date: "2026-10-08", readingMinutes: 5 },
    ],
    pagination: { page: 1, pageCount: 4, hrefFor },
    labels: labelsAr,
  },
}

export { BlogList01, labelsEn, labelsAr, demo }
export type { BlogList01Props, BlogList01Labels, Post }
export default BlogList01
